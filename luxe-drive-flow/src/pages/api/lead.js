import { Resend } from 'resend';
import { clientLeadId, dashboardAttribution, resolveLeadId } from '../../lib/attribution.js';
import { sendMetaLead } from '../../lib/meta-capi.js';

// Server endpoint — runs as a Vercel serverless function (not prerendered).
//
// Every website lead comes through here: the car-page booking card, the ad
// funnels' request card and the contact/lead form.
//
// WHERE A LEAD GOES (fixed 20 Nov 2026):
//   1. The Rental Dashboard (rental-dashboard-nu.vercel.app/api/lead) — the
//      system of record. This is where leads went until 2 Oct 2026, when the
//      availability calendar (which posted to the dashboard itself) was hidden
//      and the booking card that replaced it posted only here. This endpoint
//      then only emailed — and with no RESEND_API_KEY on Vercel it emailed
//      nothing, logged the lead to a short-lived function log and told the
//      customer it had worked. Leads were lost from 2 Oct to 20 Nov 2026.
//   2. Email via Resend, when RESEND_API_KEY is set. A second copy, never the
//      only one.
//
// The customer is told "received" ONLY if at least one of the two actually
// accepted the lead. Otherwise they get an error pointing them at WhatsApp,
// rather than a false success that loses the booking.
export const prerender = false;

// Override only for a non-production preview test. Unset, this stays the live CRM.
const DASHBOARD_LEAD_URL = process.env.DASHBOARD_LEAD_URL || 'https://rental-dashboard-nu.vercel.app/api/lead';
const serverEnv = import.meta.env || {};
const TO = process.env.LEAD_TO_EMAIL || serverEnv.LEAD_TO_EMAIL || 'robert.a.comella@gmail.com';
const KEY = process.env.RESEND_API_KEY || serverEnv.RESEND_API_KEY;
const SITE = 'https://www.lussarocollection.com';

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const clean = (v) => (typeof v === 'string' ? v.trim() : '');
const isoDate = (v) => (/^\d{4}-\d{2}-\d{2}$/.test(clean(v)) ? clean(v) : null);

const CAMPAIGN_BRIEF = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function touchBrief(touch, label) {
  if (!touch) return '';
  const parts = CAMPAIGN_BRIEF.filter((key) => touch[key]).map((key) => `${key}=${touch[key]}`);
  return parts.length ? `${label}: ${parts.join(', ')}` : '';
}

function clientAddress(request) {
  const xff = request.headers.get('x-forwarded-for') || '';
  const first = xff.split(',')[0].trim();
  return first || request.headers.get('x-real-ip') || '';
}

function eventSourceUrl(landing, request) {
  if (typeof landing === 'string' && landing.startsWith('/')) return `${SITE}${landing}`.slice(0, 2000);
  const referer = request.headers.get('referer');
  if (referer) return referer.slice(0, 2000);
  return `${SITE}/`;
}

async function toDashboard(lead) {
  try {
    const res = await fetch(DASHBOARD_LEAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    const text = await res.text().catch(() => '');
    if (!res.ok) {
      console.error('[lead] dashboard rejected', res.status, text.slice(0, 200));
      return { ok: false, body: null };
    }
    let body = {};
    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      body = {};
    }
    return { ok: true, body };
  } catch (err) {
    console.error('[lead] dashboard unreachable', err && err.name);
    return { ok: false, body: null };
  }
}

async function toEmail({ name, email, vehicle, lines }) {
  if (!KEY) return false;
  try {
    const resend = new Resend(KEY);
    // Resend v6 RETURNS errors rather than throwing them. The old code never
    // looked, so a rejected email still counted as sent.
    const { error } = await resend.emails.send({
      from: 'Lussaro Leads <onboarding@resend.dev>',
      to: TO,
      replyTo: email || undefined,
      subject: `New lead — ${name}${vehicle ? ` (${vehicle})` : ''}`,
      text: lines.join('\n'),
    });
    if (error) {
      console.error('[lead] email rejected', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[lead] email failed', err);
    return false;
  }
}

export async function POST({ request }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  const name = clean(data.name);
  const phone = clean(data.phone);
  const email = clean(data.email);
  const vehicle = clean(data.vehicle);
  const dates = clean(data.dates);
  const message = clean(data.message);
  const source = clean(data.source) || 'website';
  const startDate = isoDate(data.start_date);
  const endDate = isoDate(data.end_date) || startDate;
  const vehicleId = clean(data.vehicle_id) || null;

  if (!name || !phone) {
    return json({ ok: false, error: 'Name and phone are required.' }, 400);
  }

  // Server backstop for contact details (23 Nov 2026). Deliberately looser
  // than QuoteDialog's checks so no existing form loses a real lead: any
  // phone needs 7–15 digits, any email given must be well-formed, and the
  // quote form — which asks for email — must send one.
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15 || /^(\d)\1+$/.test(phoneDigits)) {
    return json({ ok: false, error: 'Please enter a valid phone number.' }, 400);
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }
  if (!email && /^(home_hero|quote_dialog)$/.test(source)) {
    return json({ ok: false, error: 'Please add your email.' }, 400);
  }

  const forwarded = dashboardAttribution(data);
  const attrLine = forwarded.attribution
    ? [
        touchBrief(forwarded.attribution.first_touch, 'First touch'),
        touchBrief(forwarded.attribution.last_touch, 'Last touch'),
      ].filter(Boolean).join(' | ')
    : '';

  const lines = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    email && `Email: ${email}`,
    vehicle && `Vehicle: ${vehicle}`,
    dates && `Dates: ${dates}`,
    message && `Message: ${message}`,
    `Source: ${source}`,
    forwarded.form_placement && `Form: ${forwarded.form_placement}`,
    attrLine,
  ].filter(Boolean);

  // Always in the function log too, so a lead is recoverable for a while
  // even in the worst case.
  console.log('[lead]\n' + lines.join('\n'));

  // Same shape the availability calendar used to send, plus the attribution
  // snapshot. The live dashboard ignores fields it does not read; once its
  // lead API stores them, this is the payload it accepts. A client UUID is
  // reused when the caller already has one (the dormant calendar), so the
  // two writes update one row.
  const sentId = clientLeadId(data.id) || crypto.randomUUID();
  const dashboard = await toDashboard({
    id: sentId,
    name,
    email,
    phone,
    vehicle_id: vehicleId,
    start_date: startDate,
    end_date: endDate,
    note: [vehicle && `Car: ${vehicle}`, dates && `Dates: ${dates}`, message, `Source: ${source}`]
      .filter(Boolean)
      .join(' · '),
    ...forwarded,
  });
  const emailOk = await toEmail({ name, email, vehicle, lines });

  if (!dashboard.ok && !emailOk) {
    return json({ ok: false, error: 'We could not send your request. Please message us on WhatsApp instead.' }, 502);
  }

  const leadId = resolveLeadId({ dashboardOk: dashboard.ok, body: dashboard.body, sentId });

  // Meta CAPI is a no-op until META_CAPI_ACCESS_TOKEN is set. It never
  // changes the response, and it shares leadId with the browser event.
  if (leadId && dashboard.ok) {
    const last = forwarded.attribution?.last_touch || {};
    const first = forwarded.attribution?.first_touch || {};
    try {
      await sendMetaLead({
        eventId: leadId,
        email,
        phone,
        fbc: last.fbc || first.fbc || '',
        fbp: last.fbp || first.fbp || '',
        eventSourceUrl: eventSourceUrl(last.landing_page || first.landing_page || '', request),
        ip: clientAddress(request),
        userAgent: request.headers.get('user-agent') || '',
      });
    } catch {
      // Already swallowed inside sendMetaLead. Keep the lead response.
    }
  }

  return json({
    ok: true,
    dashboard: dashboard.ok,
    email: emailOk,
    ...(leadId ? { lead_id: leadId } : {}),
  });
}
