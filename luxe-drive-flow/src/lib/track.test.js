import assert from 'node:assert/strict';
import test from 'node:test';
import { leadEvents, trackLead } from './track.js';

test('generate_lead uses the lead id for both ids and keeps email and phone off lead_submit', () => {
  const id = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
  const events = leadEvents({
    vehicle: 'Urus',
    lead_source: 'car_booking_card',
    has_dates: true,
    lead_id: id,
    email: ' Ada@Example.com ',
    phone: '3055550199',
    user_data: { email: 'should-not-pass' },
  });

  assert.equal(events.lead_submit.event, 'lead_submit');
  assert.equal(events.lead_submit.vehicle, 'Urus');
  assert.equal(events.lead_submit.lead_source, 'car_booking_card');
  assert.equal(events.lead_submit.has_dates, true);
  assert.equal(events.lead_submit.email, undefined);
  assert.equal(events.lead_submit.phone, undefined);
  assert.equal(events.lead_submit.lead_id, undefined);
  assert.equal(events.lead_submit.user_data, undefined);

  assert.equal(events.generate_lead.event, 'generate_lead');
  assert.equal(events.generate_lead.transaction_id, id);
  assert.equal(events.generate_lead.event_id, id);
  assert.deepEqual(events.generate_lead.user_data, {
    email: 'ada@example.com',
    phone_number: '+13055550199',
  });
  assert.equal(events.generate_lead.vehicle, undefined);
});

test('a missing lead id falls back to one client id shared by both fields', () => {
  const events = leadEvents({ vehicle: 'Cullinan' }, () => 'client-uuid');
  assert.equal(events.generate_lead.transaction_id, 'client-uuid');
  assert.equal(events.generate_lead.event_id, 'client-uuid');
  assert.equal(events.generate_lead.user_data, undefined);
});

test('trackLead dataLayer contains one generate_lead and then drops user_data', () => {
  const layer = [];
  const calls = [];
  const previous = globalThis.window;
  const mock = {
    dataLayer: layer,
    oaiq(method, name, payload) { calls.push({ method, name, payload }); },
  };
  globalThis.window = mock;
  try {
    trackLead({
      vehicle: 'Urus',
      lead_id: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      email: 'ada@example.com',
      phone: '+13055550199',
    });
    assert.equal(layer.filter((entry) => entry.event === 'generate_lead').length, 1);
    assert.equal(layer.filter((entry) => entry.event === 'lead_submit').length, 1);
    const lead = layer.find((entry) => entry.event === 'lead_submit');
    const generated = layer.find((entry) => entry.event === 'generate_lead');
    assert.equal(lead.email, undefined);
    assert.equal(lead.phone, undefined);
    assert.equal(generated.transaction_id, 'dddddddd-dddd-4ddd-8ddd-dddddddddddd');
    assert.equal(generated.event_id, generated.transaction_id);
    assert.equal(generated.user_data.email, 'ada@example.com');
    assert.equal(layer.at(-1).user_data, undefined);
    assert.equal(layer.at(-1).event, undefined);
    assert.deepEqual(calls, [{ method: 'measure', name: 'lead_created', payload: { type: 'customer_action' } }]);
  } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
});
