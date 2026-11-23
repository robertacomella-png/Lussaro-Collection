import { Resend } from 'resend';

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

const DASHBOARD_LEAD_URL = 'https://rental-dashboard-nu.vercel.app/api/lead';
const TO = process.env.LEAD_TO_EMAIL || import.meta.env.LEAD_TO_EMAIL || 'robert.a.comella@gmail.com';
const KEY = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const clean = (v) => (typeof v === 'string' ? v.trim() : '');
const isoDate = (v) => (/^\d{4}-\d{2}-\d{2}$/.test(clean(v)) ? clean(v) : null);

async function toDashboard(lead) {
  try {
    const res = await fetch(DASHBOARD_LEAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error('[lead] dashboard rejected', res.status, await res.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (err) {
    console.error('[lead] dashboard unreachable', err);
    return false;
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

  const lines = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    email && `Email: ${email}`,
    vehicle && `Vehicle: ${vehicle}`,
    dates && `Dates: ${dates}`,
    message && `Message: ${message}`,
    `Source: ${source}`,
  ].filter(Boolean);

  // Always in the function log too, so a lead is recoverable for a while
  // even in the worst case.
  console.log('[lead]\n' + lines.join('\n'));

  // Same shape the availability calendar used to send, so the dashboard reads
  // it exactly as it read those leads.
  const dashboardOk = await toDashboard({
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    vehicle_id: vehicleId,
    start_date: startDate,
    end_date: endDate,
    note: [vehicle && `Car: ${vehicle}`, dates && `Dates: ${dates}`, message, `Source: ${source}`]
      .filter(Boolean)
      .join(' · '),
  });
  const emailOk = await toEmail({ name, email, vehicle, lines });

  if (!dashboardOk && !emailOk) {
    return json({ ok: false, error: 'We could not send your request. Please message us on WhatsApp instead.' }, 502);
  }
  return json({ ok: true, dashboard: dashboardOk, email: emailOk });
}
