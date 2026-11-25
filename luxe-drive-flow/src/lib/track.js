import { toE164 } from './attribution.js';

// Conversion tracking — push standardized events into the GTM dataLayer.
// Map these to the Meta Pixel (and any other tags) inside the GTM UI, so the
// site code never needs to change when pixels/tags change.
//
// Standard events:
//   whatsapp_click  — any WhatsApp CTA
//   call_click      — any tap-to-call CTA
//   lead_submit     — contact/lead form submission (also reported to the
//                     OpenAI Pixel as lead_created; see trackLead below)
//   generate_lead   — the same successful submit, once, for GA4 / Google Ads.
//                     transaction_id and event_id are the lead id. Email and
//                     phone ride on this event only, for Google enhanced
//                     conversions. Map them to the Google tag, not to Meta.
//   view_vehicle    — opened a car's detail/modal
//
// There is no gtag.js on the site. GTM already loads the Ads and GA4 tags.

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
  track('whatsapp_click', { cta_location: location, ...extra });

export const trackCall = (location, extra = {}) =>
  track('call_click', { cta_location: location, ...extra });

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
    // Google tag has seen this push so a later whatsapp_click or call_click
    // does not inherit the email and phone.
    if (genData.user_data && w) {
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ user_data: undefined });
    }
  } catch {
    // The lead already saved. Tracking must not turn that into an error.
  }
};

export const trackViewVehicle = (name) => track('view_vehicle', { vehicle: name });
