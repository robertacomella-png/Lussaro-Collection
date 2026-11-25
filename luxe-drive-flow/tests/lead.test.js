import assert from 'node:assert/strict';
import test from 'node:test';

// Lives outside src/pages so Astro does not publish it as /api/lead.test.
// The dashboard URL is set before the endpoint module loads. A static import
// would be hoisted above that assignment.
process.env.DASHBOARD_LEAD_URL = 'https://dashboard.test/api/lead';
delete process.env.RESEND_API_KEY;
delete process.env.META_CAPI_ACCESS_TOKEN;
delete process.env.LEAD_TO_EMAIL;

const { POST } = await import('../src/pages/api/lead.js');

const PRODUCTION = 'rental-dashboard-nu.vercel.app';

function request(body, headers = {}) {
  return new Request('https://www.lussarocollection.com/api/lead', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'user-agent': 'AttributionTest',
      'x-forwarded-for': '203.0.113.5',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

async function withFetch(impl, fn) {
  const previous = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    const target = String(url);
    if (target.includes(PRODUCTION) || target.includes('api.resend.com')) {
      throw new Error(`test tried to reach a production lead destination: ${target.split('?')[0]}`);
    }
    return impl(target, opts);
  };
  try {
    return await fn();
  } finally {
    globalThis.fetch = previous;
  }
}

const leadBody = {
  name: 'Ada Lovelace',
  phone: '3055550199',
  email: 'ada@example.com',
  vehicle: 'Urus',
  source: 'lead_form',
  form_placement: 'LeadForm',
  attribution: {
    first_touch: {
      gclid: 'G'.repeat(250),
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'urus',
      fbc: 'fb.1.1.AbC',
      fbp: 'fb.1.1.Browser',
      landing_page: '/?gclid=TEST',
      referrer: 'https://www.google.com/',
      captured_at: '2026-11-25T18:00:00.000Z',
      email: 'ada@example.com',
    },
    last_touch: {
      gclid: 'LAST',
      utm_source: 'google',
      landing_page: '/fleet?gclid=LAST',
      captured_at: '2026-11-25T19:00:00.000Z',
    },
  },
};

test('a lead with no echoed id returns the id we sent and forwards capped attribution', async () => {
  let dashboardBody;
  const res = await withFetch(async (url, opts) => {
    assert.equal(url, 'https://dashboard.test/api/lead');
    dashboardBody = JSON.parse(opts.body);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }, () => POST({ request: request(leadBody) }));

  const json = await res.json();
  assert.equal(res.status, 200);
  assert.equal(json.ok, true);
  assert.equal(json.dashboard, true);
  assert.equal(json.email, false);
  assert.equal(json.lead_id, dashboardBody.id);
  assert.match(dashboardBody.id, /^[0-9a-f-]{36}$/i);
  assert.equal(dashboardBody.name, 'Ada Lovelace');
  assert.equal(dashboardBody.phone, '3055550199');
  assert.equal(dashboardBody.form_placement, 'LeadForm');
  assert.equal(dashboardBody.attribution.first_touch.gclid.length, 200);
  assert.equal(dashboardBody.attribution.first_touch.email, undefined);
  assert.equal(dashboardBody.attribution.first_touch.fbc, 'fb.1.1.AbC');
  assert.equal(dashboardBody.attribution.first_touch.fbp, 'fb.1.1.Browser');
  assert.equal(dashboardBody.attribution.last_touch.gclid, 'LAST');
  assert.match(dashboardBody.note, /Source: lead_form/);
});

test('an old payload with no attribution still saves and passes back an echoed lead id', async () => {
  const echoed = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
  const res = await withFetch(async () => {
    return new Response(JSON.stringify({ ok: true, lead_id: echoed }), { status: 200 });
  }, () => POST({ request: request({ name: 'Grace', phone: '3055550199', source: 'lead_form' }) }));
  const json = await res.json();
  assert.equal(json.ok, true);
  assert.equal(json.lead_id, echoed);
});

test('a client UUID is reused so the calendar does not open a second lead', async () => {
  const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
  let sent;
  await withFetch(async (_url, opts) => {
    sent = JSON.parse(opts.body);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }, () => POST({ request: request({ ...leadBody, id, form_placement: 'BookingCalendar' }) }));
  assert.equal(sent.id, id);
  assert.equal(sent.form_placement, 'BookingCalendar');
});

test('a rejected dashboard returns 502 and does not invent a lead id', async () => {
  const res = await withFetch(async () => {
    return new Response('no', { status: 500 });
  }, () => POST({ request: request({ name: 'Grace', phone: '3055550199' }) }));
  const json = await res.json();
  assert.equal(res.status, 502);
  assert.equal(json.ok, false);
  assert.equal(json.lead_id, undefined);
});

test('Meta CAPI stays silent without a token and shares event_id when one is set', async () => {
  delete process.env.META_CAPI_ACCESS_TOKEN;
  const silent = [];
  await withFetch(async (url) => {
    silent.push(url);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }, () => POST({ request: request(leadBody) }));
  assert.equal(silent.some((url) => url.includes('graph.facebook.com')), false);

  process.env.META_CAPI_ACCESS_TOKEN = 'test-token-not-real';
  const calls = [];
  try {
    const res = await withFetch(async (url, opts) => {
      calls.push({ url, body: opts.body ? JSON.parse(opts.body) : null });
      if (url.includes('graph.facebook.com')) return new Response('{}', { status: 200 });
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }, () => POST({ request: request(leadBody) }));
    const json = await res.json();
    const graph = calls.find((call) => call.url.includes('graph.facebook.com'));
    const dashboard = calls.find((call) => call.url.includes('dashboard.test'));
    assert.ok(graph);
    assert.equal(graph.body.data[0].event_name, 'Lead');
    assert.equal(graph.body.data[0].event_id, json.lead_id);
    assert.equal(graph.body.data[0].event_id, dashboard.body.id);
    assert.equal(graph.body.data[0].user_data.fbc, 'fb.1.1.AbC');
    assert.equal(JSON.stringify(graph.body).includes('ada@example.com'), false);
    assert.equal(JSON.stringify(graph.body).includes('test-token-not-real'), false);
  } finally {
    delete process.env.META_CAPI_ACCESS_TOKEN;
  }
});
