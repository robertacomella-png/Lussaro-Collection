import { Resend } from 'resend';

// Server endpoint — runs as a Vercel serverless function (not prerendered).
export const prerender = false;

const TO = process.env.LEAD_TO_EMAIL || import.meta.env.LEAD_TO_EMAIL || 'robert.a.comella@gmail.com';
const KEY = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST({ request }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  const name = (data.name || '').trim();
  const phone = (data.phone || '').trim();
  const email = (data.email || '').trim();
  const vehicle = (data.vehicle || '').trim();
  const dates = (data.dates || '').trim();
  const message = (data.message || '').trim();

  if (!name || !phone) {
    return json({ ok: false, error: 'Name and phone are required.' }, 400);
  }

  const lines = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    email && `Email: ${email}`,
    vehicle && `Vehicle: ${vehicle}`,
    dates && `Dates: ${dates}`,
    message && `Message: ${message}`,
  ].filter(Boolean);

  // No API key yet (e.g. local dev) — log and succeed so the flow still works.
  if (!KEY) {
    console.log('[lead] (RESEND_API_KEY not set — not emailed)\n' + lines.join('\n'));
    return json({ ok: true, note: 'logged' });
  }

  try {
    const resend = new Resend(KEY);
    await resend.emails.send({
      from: 'Lussaro Leads <onboarding@resend.dev>',
      to: TO,
      replyTo: email || undefined,
      subject: `New lead — ${name}${vehicle ? ` (${vehicle})` : ''}`,
      text: lines.join('\n'),
    });
    return json({ ok: true });
  } catch (err) {
    console.error('[lead] send failed', err);
    return json({ ok: false, error: 'Could not send. Please WhatsApp us instead.' }, 500);
  }
}
