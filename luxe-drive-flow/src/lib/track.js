import { CAMPAIGN_KEYS, toE164 } from './attribution.js';

// Conversion tracking — push standardized events into the GTM dataLayer.
// Map these to the Meta Pixel (and any other tags) inside the GTM UI, so the
// site code never needs to change when pixels/tags change.
//
// Standard events:
//   whatsapp_click     — any WhatsApp CTA (wa.me, api.whatsapp.com, whatsapp://)
//   phone_call_click   — any tap-to-call CTA (tel:)
//   call_click         — the same tel: tap, with the pre-cleanup payload.
//                        Temporary. See the TODO in bindContactClickTracking.
//   lead_submit        — contact/lead form submission (also reported to the
//                        OpenAI Pixel as lead_created; see trackLead below)
//   generate_lead      — the same successful submit, once, for GA4 / Google Ads.
//                        transaction_id and event_id are the lead id. Email and
//                        phone ride on this event only, for Google enhanced
//                        conversions. Map them to the Google tag, not to Meta.
//   view_vehicle       — opened a car's detail/modal
//
// GTM-5J937M8K is the only sender. It already loads GA4 (G-2EMLW6DB41),
// Google Ads (AW-765254274) and the Meta pixel. This module never calls
// gtag(): once the container maps phone_call_click and whatsapp_click to GA4
// event tags, a direct gtag hit would count the same tap twice.

function browserWindow() {
  return globalThis.window;
}

export function track(event, data = {}) {
  const w = browserWindow();
  if (!w) return;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data });
}

export const trackWhatsApp = (location, extra = {}) =>
  track('whatsapp_click', { cta_location: location, cta_placement: location, ...extra });

export const trackCall = (location, extra = {}) =>
  track('phone_call_click', { cta_location: location, cta_placement: location, ...extra });

function defaultUuid() {
  const c = globalThis.crypto;
  if (c && typeof c.randomUUID === 'function') return c.randomUUID();
  return `lead-${Date.now()}`;
}

// Two events from one successful submit. lead_submit keeps its existing
// shape (no email, no phone). generate_lead carries the shared id and, only
// there, the enhanced-conversion user_data.
export function leadEvents(extra = {}, uuid = defaultUuid) {
  const source = extra && typeof extra === 'object' ? extra : {};
  const rest = { ...source };
  const lead_id = rest.lead_id;
  const email = rest.email;
  const phone = rest.phone;
  delete rest.lead_id;
  delete rest.email;
  delete rest.phone;
  delete rest.user_data;
  const id = (typeof lead_id === 'string' && lead_id.trim()) || uuid();
  const user = {};
  const em = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (em) user.email = em;
  const ph = toE164(phone);
  if (ph) user.phone_number = ph;
  const generate = { event: 'generate_lead', transaction_id: id, event_id: id };
  if (Object.keys(user).length) generate.user_data = user;
  return {
    lead_submit: { event: 'lead_submit', ...rest },
    generate_lead: generate,
  };
}

// A successful lead-form submit is the conversion, so the OpenAI Pixel's
// lead_created fires from here rather than from the component — this module is
// where every conversion event in the site is defined.
//
// window.oaiq is the queueing stub installed in Layout.astro's <head>: calls
// made before its SDK finishes loading are replayed, not dropped. Guarded all
// the same, so a blocked or stripped inline script degrades to the dataLayer
// push alone instead of throwing inside the form's submit handler.
export const trackLead = (extra = {}) => {
  try {
    const events = leadEvents(extra);
    const { event: leadEvent, ...leadData } = events.lead_submit;
    track(leadEvent, leadData);
    const w = browserWindow();
    if (w && typeof w.oaiq === 'function') {
      w.oaiq('measure', 'lead_created', { type: 'customer_action' });
    }
    const { event: genEvent, ...genData } = events.generate_lead;
    track(genEvent, genData);
    // GTM keeps dataLayer values across events. Drop user_data after the
    // Google tag has seen this push so a later whatsapp_click or
    // phone_call_click does not inherit the email and phone.
    if (genData.user_data && w) {
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ user_data: undefined });
    }
  } catch {
    // The lead already saved. Tracking must not turn that into an error.
  }
};

export const trackViewVehicle = (name) => track('view_vehicle', { vehicle: name });

const WHATSAPP_HOSTS = new Set([
  'wa.me',
  'www.wa.me',
  'api.whatsapp.com',
  'www.api.whatsapp.com',
]);

// tel: and whatsapp: are matched on the scheme so a space in the number, or a
// URL parser quirk, cannot drop them. http(s) links are matched on the host
// only — a wa.me string buried in another site's query is not a WhatsApp tap.
export function contactLinkKind(href) {
  if (typeof href !== 'string') return null;
  const raw = href.trim();
  if (!raw) return null;
  if (/^tel:/i.test(raw)) return 'phone';
  if (/^whatsapp:/i.test(raw)) return 'whatsapp';
  try {
    const url = new URL(raw, 'https://lussarocollection.com');
    const protocol = url.protocol.toLowerCase();
    if (protocol === 'tel:') return 'phone';
    if (protocol === 'whatsapp:') return 'whatsapp';
    if (protocol !== 'http:' && protocol !== 'https:') return null;
    const host = url.hostname.replace(/\.$/, '').toLowerCase();
    if (WHATSAPP_HOSTS.has(host)) return 'whatsapp';
    return null;
  } catch {
    return null;
  }
}

// data-cta is a short placement token. Anything that looks like an email or a
// phone number is dropped — click events carry no PII.
function cleanPlacement(raw) {
  if (typeof raw !== 'string') return 'unknown';
  const value = raw.trim();
  if (!value || value.length > 80) return 'unknown';
  if (value.includes('@') || /\d{7,}/.test(value)) return 'unknown';
  return value;
}

// The anchor's own data-cta, otherwise the nearest ancestor that has one.
export function ctaPlacement(el) {
  try {
    if (!el || typeof el.closest !== 'function') return 'unknown';
    const node = el.closest('[data-cta]');
    const raw = node && typeof node.getAttribute === 'function' ? node.getAttribute('data-cta') : '';
    return cleanPlacement(raw);
  } catch {
    return 'unknown';
  }
}

function campaignParams(campaign) {
  const out = {};
  if (!campaign || typeof campaign !== 'object') return out;
  for (const key of CAMPAIGN_KEYS) {
    const value = campaign[key];
    if (typeof value === 'string' && value) out[key] = value;
  }
  return out;
}

// Fields on every contact click. cta_location mirrors cta_placement so a GTM
// variable already reading the old key keeps resolving. Campaign click ids are
// copied from an allow-list; email, phone and user_data are never accepted.
export function contactClickPayload(href, {
  pagePath = '/',
  ctaPlacement: placement = 'unknown',
  campaign,
} = {}) {
  const kind = contactLinkKind(href);
  if (!kind) return null;
  const cta_placement = cleanPlacement(placement);
  return {
    event: kind === 'phone' ? 'phone_call_click' : 'whatsapp_click',
    link_url: href.trim(),
    page_path: typeof pagePath === 'string' && pagePath ? pagePath : '/',
    cta_placement,
    cta_location: cta_placement,
    ...campaignParams(campaign),
  };
}

// The payload Layout.astro pushed before this cleanup: cta_location from the
// anchor's own data-cta (no ancestor walk), plus stored click ids and UTMs.
// No link_url, page_path, or cta_placement.
export function legacyCallClickPayload(anchor, campaign) {
  let cta_location = 'unknown';
  try {
    const fromDataset = anchor && anchor.dataset ? anchor.dataset.cta : undefined;
    const raw = typeof fromDataset === 'string'
      ? fromDataset
      : (anchor && typeof anchor.getAttribute === 'function' ? anchor.getAttribute('data-cta') : '');
    cta_location = raw || 'unknown';
  } catch {
    cta_location = 'unknown';
  }
  return {
    event: 'call_click',
    cta_location,
    ...campaignParams(campaign),
  };
}

function clickAnchor(target) {
  let node = target;
  if (node && node.nodeType === 3) node = node.parentElement || node.parentNode;
  if (!node || typeof node.closest !== 'function') return null;
  return node.closest('a[href]');
}

function pagePathOf(win) {
  try {
    const path = win && win.location && win.location.pathname;
    return typeof path === 'string' && path ? path : '/';
  } catch {
    return '/';
  }
}

function storedCampaign(win) {
  try {
    if (!win || typeof win.lcCampaignFields !== 'function') return {};
    return win.lcCampaignFields() || {};
  } catch {
    return {};
  }
}

// One document-level listener for every tel: and WhatsApp link, including
// ones rendered later by an island. Bound once so view transitions do not
// stack handlers. Never calls preventDefault and never lets an error out.
export function bindContactClickTracking(win = browserWindow()) {
  if (!win || !win.document || win.__lcContactClickBound) return;
  win.__lcContactClickBound = true;
  win.document.addEventListener('click', (event) => {
    try {
      const anchor = clickAnchor(event && event.target);
      if (!anchor || typeof anchor.getAttribute !== 'function') return;
      const href = anchor.getAttribute('href') || '';
      const campaign = storedCampaign(win);
      const payload = contactClickPayload(href, {
        pagePath: pagePathOf(win),
        ctaPlacement: ctaPlacement(anchor),
        campaign,
      });
      if (!payload) return;
      const { event: eventName, ...data } = payload;
      track(eventName, data);
      // TODO: remove this second push once GTM-5J937M8K is republished with
      // the phone_call_click trigger and the Google Ads "Phone call lead"
      // conversion is moved off call_click. The container change lands after
      // this code, so a tel: tap still has to emit the old event or that
      // conversion goes dark in the gap. WhatsApp taps do not double-push.
      if (eventName === 'phone_call_click') {
        const legacy = legacyCallClickPayload(anchor, campaign);
        const { event: legacyName, ...legacyData } = legacy;
        track(legacyName, legacyData);
      }
    } catch {
      // The tap still navigates. Tracking must not turn it into an error.
    }
  });
}
