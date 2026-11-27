// First-touch and last-touch ad attribution.
//
// Captured in the browser on each page view (including after an Astro view
// transition) and sent with every lead. First touch is written once. Last
// touch moves only when the URL actually carries a click id or a UTM, so a
// later page with no campaign parameters cannot replace an ad click with a
// direct visit. Storage is localStorage plus a first-party JS cookie. There
// is no server-set cookie.
//
// Every public function swallows its own errors. A tracking failure must
// never block a form submit.

export const STORAGE_KEY = 'lc_attr';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 90;
const COOKIE_BUDGET = 3800;

export const TOUCH_KEYS = Object.freeze([
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'fbc',
  'fbp',
  'msclkid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'landing_page',
  'referrer',
  'captured_at',
]);

// Click ids and UTMs are what make a page view a new last touch. fbc and fbp
// are Meta match keys, not a new campaign, so they never move last touch on
// their own.
export const CAMPAIGN_KEYS = Object.freeze([
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
]);

export const FORM_PLACEMENTS = Object.freeze([
  'QuoteDialog',
  'LeadForm',
  'VehicleBookingCard',
  'BookingRequestCard',
  'BookingCalendar',
]);

const MAX = {
  gclid: 200,
  gbraid: 200,
  wbraid: 200,
  fbclid: 200,
  // fb.1.<ms>.<fbclid> is longer than the click id it wraps.
  fbc: 512,
  fbp: 512,
  msclkid: 200,
  utm_source: 200,
  utm_medium: 200,
  utm_campaign: 200,
  utm_term: 200,
  utm_content: 200,
  landing_page: 2000,
  referrer: 2000,
  captured_at: 40,
};

const ISO_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Survives a storage failure for the rest of this page session, so a form
// submitted after a blocked cookie still carries the touch just captured.
let sessionStore = null;

function clip(value, max) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export function sanitizeTouch(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return undefined;
  const out = {};
  for (const key of TOUCH_KEYS) {
    const value = clip(input[key], MAX[key]);
    if (!value) continue;
    if (key === 'captured_at' && !ISO_RE.test(value)) continue;
    out[key] = value;
  }
  return Object.keys(out).length ? out : undefined;
}

export function sanitizeAttribution(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return undefined;
  const first_touch = sanitizeTouch(input.first_touch);
  const last_touch = sanitizeTouch(input.last_touch);
  if (!first_touch && !last_touch) return undefined;
  const out = {};
  if (first_touch) out.first_touch = first_touch;
  if (last_touch) out.last_touch = last_touch;
  return out;
}

export function sanitizeFormPlacement(value) {
  const v = typeof value === 'string' ? value.trim() : '';
  return FORM_PLACEMENTS.includes(v) ? v : '';
}

// Fields the dashboard body gains. Unknown keys and over-long values are
// dropped here so a bad client cannot stuff the lead row.
export function dashboardAttribution(data) {
  const out = {};
  const attribution = sanitizeAttribution(data && data.attribution);
  const form_placement = sanitizeFormPlacement(data && data.form_placement);
  if (attribution) out.attribution = attribution;
  if (form_placement) out.form_placement = form_placement;
  return out;
}

export function clientLeadId(value) {
  const v = typeof value === 'string' ? value.trim() : '';
  return UUID_RE.test(v) ? v : '';
}

// The id the browser and a later server event must share. Prefer the id the
// dashboard echoes. When it accepts the lead and returns none (production
// today), the id we sent is the row id. When the dashboard did not accept
// the lead, return '' so the browser mints its own and nothing is pretended.
export function resolveLeadId({ dashboardOk, body, sentId }) {
  if (!dashboardOk) return '';
  const echoed = body && typeof body.lead_id === 'string' ? body.lead_id.trim() : '';
  if (UUID_RE.test(echoed)) return echoed;
  return clientLeadId(sentId);
}

// Google enhanced conversions want E.164. US 10-digit numbers get +1 because
// this site takes Miami bookings. Anything already marked with + is kept.
export function toE164(phone) {
  if (typeof phone !== 'string') return '';
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return '';
  if (trimmed.startsWith('+')) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return `+${digits}`;
}

export function readCookieValue(cookieString, name) {
  if (!cookieString) return '';
  for (const part of String(cookieString).split(';')) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    if (trimmed.slice(0, eq) !== name) continue;
    const raw = trimmed.slice(eq + 1);
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }
  return '';
}

export function cookieAttributes(protocol) {
  const secure = protocol === 'https:' ? '; Secure' : '';
  return `Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

function emptyStore() {
  return { first_touch: undefined, last_touch: undefined };
}

function parseStored(raw) {
  if (!raw) return emptyStore();
  try {
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return emptyStore();
    return {
      first_touch: sanitizeTouch(data.first_touch),
      last_touch: sanitizeTouch(data.last_touch),
    };
  } catch {
    return emptyStore();
  }
}

function earlier(a, b) {
  if (!a?.captured_at) return b;
  if (!b?.captured_at) return a;
  return a.captured_at <= b.captured_at ? a : b;
}

function later(a, b) {
  if (!a?.captured_at) return b;
  if (!b?.captured_at) return a;
  return a.captured_at >= b.captured_at ? a : b;
}

// `a` wins a timestamp tie, so callers pass localStorage first. The cookie
// copy may have shortened URLs; the full copy should win when both exist.
function mergeStores(a, b) {
  return {
    first_touch: earlier(a?.first_touch, b?.first_touch),
    last_touch: later(a?.last_touch, b?.last_touch),
  };
}

function fillMeta(touch, incoming) {
  const out = { ...touch };
  if (!out.fbp && incoming.fbp) out.fbp = incoming.fbp;
  if (!out.fbc && incoming.fbc) out.fbc = incoming.fbc;
  return out;
}

function applyTouch(prev, incoming, hasCampaign) {
  const firstMissing = !prev.first_touch?.captured_at;
  const lastMissing = !prev.last_touch?.captured_at;
  return {
    first_touch: firstMissing ? incoming : fillMeta(prev.first_touch, incoming),
    last_touch: lastMissing || hasCampaign ? incoming : fillMeta(prev.last_touch, incoming),
  };
}

function shrinkUrls(stored, max) {
  const cut = (touch) => {
    if (!touch) return touch;
    const out = { ...touch };
    if (!max) {
      delete out.landing_page;
      delete out.referrer;
    } else {
      if (out.landing_page) out.landing_page = out.landing_page.slice(0, max);
      if (out.referrer) out.referrer = out.referrer.slice(0, max);
    }
    return out;
  };
  return { first_touch: cut(stored.first_touch), last_touch: cut(stored.last_touch) };
}

function forCookie(stored) {
  let json = JSON.stringify(stored);
  if (encodeURIComponent(json).length <= COOKIE_BUDGET) return json;
  json = JSON.stringify(shrinkUrls(stored, 180));
  if (encodeURIComponent(json).length <= COOKIE_BUDGET) return json;
  return JSON.stringify(shrinkUrls(stored, 0));
}

function liveEnv() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;
  const now = new Date();
  return {
    location: window.location,
    referrer: document.referrer || '',
    nowMs: now.getTime(),
    iso: now.toISOString(),
    getCookieString: () => document.cookie || '',
    setCookie: (name, encodedValue, attributes) => {
      document.cookie = `${name}=${encodedValue}; ${attributes}`;
    },
    storage: window.localStorage,
  };
}

function touchFromEnv(env) {
  const params = new URLSearchParams(env.location?.search || '');
  const cookies = env.getCookieString();
  const touch = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = clip(params.get(key) || '', MAX[key]);
    if (value) touch[key] = value;
  }
  const fbcCookie = clip(readCookieValue(cookies, '_fbc'), MAX.fbc);
  const fbcBuilt = touch.fbclid ? clip(`fb.1.${env.nowMs}.${touch.fbclid}`, MAX.fbc) : '';
  const fbc = fbcCookie || fbcBuilt;
  if (fbc) touch.fbc = fbc;
  const fbp = clip(readCookieValue(cookies, '_fbp'), MAX.fbp);
  if (fbp) touch.fbp = fbp;
  const landing = clip(`${env.location?.pathname || '/'}${env.location?.search || ''}`, MAX.landing_page);
  if (landing) touch.landing_page = landing;
  const referrer = clip(env.referrer || '', MAX.referrer);
  if (referrer) touch.referrer = referrer;
  touch.captured_at = env.iso;
  return touch;
}

function campaignInUrl(env) {
  const params = new URLSearchParams(env.location?.search || '');
  return CAMPAIGN_KEYS.some((key) => clip(params.get(key) || '', MAX[key]));
}

function readStore(env) {
  let local = emptyStore();
  try {
    local = parseStored(env.storage?.getItem?.(STORAGE_KEY));
  } catch {
    local = emptyStore();
  }
  let cookie = emptyStore();
  try {
    cookie = parseStored(readCookieValue(env.getCookieString(), STORAGE_KEY));
  } catch {
    cookie = emptyStore();
  }
  return mergeStores(local, cookie);
}

function persist(env, stored) {
  try {
    env.storage?.setItem?.(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Private mode and quota failures still leave the cookie and the session copy.
  }
  try {
    env.setCookie(STORAGE_KEY, encodeURIComponent(forCookie(stored)), cookieAttributes(env.location?.protocol));
  } catch {
    // A blocked cookie is not a failed lead.
  }
}

export function captureAttribution(env) {
  try {
    const resolved = env || liveEnv();
    if (!resolved?.location || typeof resolved.getCookieString !== 'function') return emptyStore();
    const incoming = touchFromEnv(resolved);
    if (!ISO_RE.test(incoming.captured_at || '')) return emptyStore();
    const next = applyTouch(readStore(resolved), incoming, campaignInUrl(resolved));
    persist(resolved, next);
    if (!env) sessionStore = next;
    return next;
  } catch {
    return emptyStore();
  }
}

export function readAttribution(env) {
  try {
    const resolved = env || liveEnv();
    const stored = resolved ? readStore(resolved) : emptyStore();
    const merged = !env && sessionStore ? mergeStores(stored, sessionStore) : stored;
    return {
      first_touch: sanitizeTouch(merged.first_touch),
      last_touch: sanitizeTouch(merged.last_touch),
    };
  } catch {
    return emptyStore();
  }
}

export function leadAttribution(placement, env) {
  try {
    const stored = readAttribution(env);
    const attribution = {};
    if (stored.first_touch) attribution.first_touch = stored.first_touch;
    if (stored.last_touch) attribution.last_touch = stored.last_touch;
    const out = {};
    if (placement) out.form_placement = placement;
    if (attribution.first_touch || attribution.last_touch) out.attribution = attribution;
    return out;
  } catch {
    return placement ? { form_placement: placement } : {};
  }
}

export function withAttribution(payload, placement, env) {
  const base = payload && typeof payload === 'object' ? { ...payload } : {};
  try {
    const extra = leadAttribution(placement, env);
    if (extra.form_placement) base.form_placement = extra.form_placement;
    if (extra.attribution) base.attribution = extra.attribution;
  } catch {
    // The lead itself still posts.
  }
  return base;
}

// Click ids and UTMs for whatsapp_click / phone_call_click. Never email or phone.
export function campaignFields(stored) {
  try {
    const data = stored || readAttribution();
    const last = data.last_touch || {};
    const first = data.first_touch || {};
    const source = CAMPAIGN_KEYS.some((key) => last[key]) ? last : first;
    const out = {};
    for (const key of CAMPAIGN_KEYS) if (source[key]) out[key] = source[key];
    return out;
  } catch {
    return {};
  }
}
