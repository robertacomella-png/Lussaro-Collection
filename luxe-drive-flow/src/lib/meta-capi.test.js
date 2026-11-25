import assert from 'node:assert/strict';
import test from 'node:test';
import { META_CAPI_TIMEOUT_MS, buildMetaLeadPayload, sendMetaLead, sha256 } from './meta-capi.js';

test('the Lead payload shares event_id and hashes email and phone', async () => {
  const payload = await buildMetaLeadPayload({
    eventId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
    email: ' Ada@Example.com ',
    phone: '3055550199',
    eventSourceUrl: 'https://www.lussarocollection.com/?gclid=TEST',
    ip: '203.0.113.5',
    userAgent: 'TestAgent',
    fbc: 'fb.1.1.AbC',
    fbp: 'fb.1.1.Browser',
    eventTime: 1700000000,
  });
  const event = payload.data[0];
  assert.equal(event.event_name, 'Lead');
  assert.equal(event.event_id, 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee');
  assert.equal(event.action_source, 'website');
  assert.equal(event.event_time, 1700000000);
  assert.deepEqual(event.user_data.em, [await sha256('ada@example.com')]);
  assert.deepEqual(event.user_data.ph, [await sha256('13055550199')]);
  assert.equal(event.user_data.fbc, 'fb.1.1.AbC');
  assert.equal(event.user_data.fbp, 'fb.1.1.Browser');
  assert.equal(JSON.stringify(payload).includes('Ada@Example.com'), false);
  assert.equal(JSON.stringify(payload).includes('3055550199'), false);
});

test('sendMetaLead does not call the network unless the access token is set', async () => {
  let calls = 0;
  const result = await sendMetaLead(
    { eventId: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', email: 'ada@example.com' },
    {},
    () => { calls += 1; },
  );
  assert.deepEqual(result, { skipped: true });
  assert.equal(calls, 0);
});

test('a configured token posts one Lead and a test event code stays out of the body unless set', async () => {
  const seen = [];
  const fetchImpl = async (url, opts) => {
    seen.push({ url, body: JSON.parse(opts.body) });
    return new Response('{}', { status: 200 });
  };
  const eventId = 'ffffffff-ffff-4fff-8fff-ffffffffffff';
  const result = await sendMetaLead(
    { eventId, email: 'ada@example.com', fbc: 'fb.1.1.AbC' },
    { META_CAPI_ACCESS_TOKEN: 'test-token-not-real' },
    fetchImpl,
  );
  assert.deepEqual(result, { ok: true });
  assert.equal(seen.length, 1);
  assert.match(seen[0].url, /graph\.facebook\.com\/v21\.0\/1310954347642915\/events\?access_token=/);
  assert.equal(seen[0].body.data[0].event_id, eventId);
  assert.equal(seen[0].body.data[0].event_name, 'Lead');
  assert.equal(seen[0].body.test_event_code, undefined);
  assert.equal(JSON.stringify(seen[0].body).includes('test-token-not-real'), false);

  seen.length = 0;
  await sendMetaLead(
    { eventId },
    { META_CAPI_ACCESS_TOKEN: 'test-token-not-real', META_CAPI_TEST_EVENT_CODE: 'TEST123' },
    fetchImpl,
  );
  assert.equal(seen[0].body.test_event_code, 'TEST123');
  assert.equal(seen[0].body.data[0].event_id, eventId);
});

test('the Graph call aborts within 3 seconds and a failure does not log the token', async () => {
  const limits = [];
  const originalTimeout = AbortSignal.timeout;
  AbortSignal.timeout = (ms) => {
    limits.push(ms);
    return originalTimeout.call(AbortSignal, ms);
  };
  const errors = [];
  const originalError = console.error;
  console.error = (...args) => { errors.push(args.map(String).join(' ')); };
  try {
    const result = await sendMetaLead(
      { eventId: 'ffffffff-ffff-4fff-8fff-ffffffffffff', email: 'ada@example.com', phone: '+13055550199' },
      { META_CAPI_ACCESS_TOKEN: 'test-token-not-real' },
      async () => {
        throw new Error('network https://graph.facebook.com/events?access_token=test-token-not-real ada@example.com');
      },
    );
    assert.deepEqual(result, { ok: false });
  } finally {
    AbortSignal.timeout = originalTimeout;
    console.error = originalError;
  }
  assert.deepEqual(limits, [META_CAPI_TIMEOUT_MS]);
  assert.ok(META_CAPI_TIMEOUT_MS <= 3000);
  assert.equal(errors.some((line) => line.includes('test-token-not-real') || line.includes('ada@example.com')), false);
});
