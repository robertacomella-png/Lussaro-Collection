// Server-side Meta Conversions API Lead event.
//
// Inert unless META_CAPI_ACCESS_TOKEN is set in the server environment. The
// site does not set that variable. When it is set, this sends one Lead event
// whose event_id is the same id the browser puts on generate_lead, so a later
// Pixel Lead and this CAPI Lead deduplicate.
//
// Pixel 1310954347642915. Nothing here loads a second browser pixel.

import { toE164 } from './attribution.js';

export const META_PIXEL_ID = '1310954347642915';
export const META_GRAPH_VERSION = 'v21.0';
// The lead response must not wait on Meta. Three seconds is the ceiling.
export const META_CAPI_TIMEOUT_MS = 3000;

function tokenFrom(env) {
  const token = env && env.META_CAPI_ACCESS_TOKEN;
  return typeof token === 'string' ? token.trim() : '';
}

export function metaCapiConfigured(env = process.env) {
  return tokenFrom(env).length > 0;
}

export async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function buildMetaLeadPayload({
  eventId,
  email,
  phone,
  eventSourceUrl,
  ip,
  userAgent,
  fbc,
  fbp,
  testEventCode,
  eventTime = Math.floor(Date.now() / 1000),
}) {
  const user_data = {};
  const em = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (em) user_data.em = [await sha256(em)];
  const e164 = toE164(phone);
  if (e164) user_data.ph = [await sha256(e164.replace(/\D/g, ''))];
  if (fbc) user_data.fbc = fbc;
  if (fbp) user_data.fbp = fbp;
  if (ip) user_data.client_ip_address = ip;
  if (userAgent) user_data.client_user_agent = userAgent;

  const event = {
    event_name: 'Lead',
    event_time: eventTime,
    event_id: eventId,
    action_source: 'website',
    user_data,
  };
  if (eventSourceUrl) event.event_source_url = eventSourceUrl;

  const body = { data: [event] };
  if (testEventCode) body.test_event_code = testEventCode;
  return body;
}

export async function sendMetaLead(args, env = process.env, fetchImpl = fetch) {
  const token = tokenFrom(env);
  if (!token || !args?.eventId) return { skipped: true };
  try {
    const testCode = typeof env.META_CAPI_TEST_EVENT_CODE === 'string'
      ? env.META_CAPI_TEST_EVENT_CODE.trim()
      : '';
    const payload = await buildMetaLeadPayload({ ...args, testEventCode: testCode });
    const url = `https://graph.facebook.com/${META_GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`;
    const res = await fetchImpl(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(META_CAPI_TIMEOUT_MS),
    });
    if (!res.ok) {
      // Status only. The URL carries the token, and the body carries hashes.
      console.error('[lead] meta capi rejected', res.status);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    // err.message can include the request URL, which holds the token.
    console.error('[lead] meta capi failed', err && err.name ? err.name : 'error');
    return { ok: false };
  }
}
