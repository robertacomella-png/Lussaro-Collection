import assert from 'node:assert/strict';
import test from 'node:test';
import {
  bindContactClickTracking,
  contactClickPayload,
  contactLinkKind,
  ctaPlacement,
  leadEvents,
  legacyCallClickPayload,
  trackLead,
} from './track.js';

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

test('contactLinkKind matches tel, wa.me, api.whatsapp.com and whatsapp:// only', () => {
  const phone = [
    'tel:+16452487305',
    'tel:16452487305',
    'TEL:+1-645-248-7305',
    '  tel:+16452487305  ',
    'tel:+1 645 248 7305',
  ];
  for (const href of phone) assert.equal(contactLinkKind(href), 'phone', href);

  const whatsapp = [
    'https://wa.me/16452487305',
    'https://wa.me/16452487305?text=Hi',
    'http://www.wa.me/16452487305',
    'https://api.whatsapp.com/send?phone=16452487305',
    'https://api.whatsapp.com/send/?phone=16452487305&text=Hi',
    'http://www.api.whatsapp.com/send?phone=16452487305',
    'whatsapp://send?phone=16452487305',
    'WHATSAPP://send?text=Hello',
    '//wa.me/16452487305',
  ];
  for (const href of whatsapp) assert.equal(contactLinkKind(href), 'whatsapp', href);

  const neither = [
    '',
    '   ',
    null,
    undefined,
    12,
    '/fleet',
    '/cars/urus',
    '#book',
    'mailto:hello@lussarocollection.com',
    'sms:+16452487305',
    'telephone:+16452487305',
    'https://lussarocollection.com/contact',
    'https://example.com/wa.me/1',
    'https://notwa.me/16452487305',
    'https://wa.me.evil.com/',
    'https://evil.com/?next=https://wa.me/16452487305',
    'https://api.whatsapp.com.evil.com/send',
    'https://web.whatsapp.com/',
    'https://chat.whatsapp.com/invite',
    'javascript:alert(1)',
  ];
  for (const href of neither) assert.equal(contactLinkKind(href), null, String(href));
});

test('contact click payload names the event and drops anything that is not a campaign id', () => {
  const phone = contactClickPayload('tel:+16452487305', {
    pagePath: '/fleet',
    ctaPlacement: 'footer',
    campaign: {
      gclid: 'gclid-1',
      utm_source: 'google',
      email: 'ada@example.com',
      phone: '+13055550199',
      user_data: { email: 'ada@example.com' },
    },
  });
  assert.equal(phone.event, 'phone_call_click');
  assert.equal(phone.link_url, 'tel:+16452487305');
  assert.equal(phone.page_path, '/fleet');
  assert.equal(phone.cta_placement, 'footer');
  assert.equal(phone.cta_location, 'footer');
  assert.equal(phone.gclid, 'gclid-1');
  assert.equal(phone.utm_source, 'google');
  assert.equal(phone.email, undefined);
  assert.equal(phone.phone, undefined);
  assert.equal(phone.user_data, undefined);

  const wa = contactClickPayload('https://api.whatsapp.com/send?phone=16452487305', {
    pagePath: '/contact',
    ctaPlacement: '  contact_whatsapp  ',
  });
  assert.equal(wa.event, 'whatsapp_click');
  assert.equal(wa.link_url, 'https://api.whatsapp.com/send?phone=16452487305');
  assert.equal(wa.page_path, '/contact');
  assert.equal(wa.cta_placement, 'contact_whatsapp');
  assert.equal(contactClickPayload('/pricing'), null);
  assert.equal(contactClickPayload('tel:+16452487305', { ctaPlacement: 'ada@example.com' }).cta_placement, 'unknown');
});

test('cta placement reads the anchor, then the nearest data-cta ancestor', () => {
  const parent = {
    getAttribute(name) { return name === 'data-cta' ? 'sticky_call' : null; },
  };
  const anchor = {
    getAttribute() { return null; },
    closest(sel) { return sel === '[data-cta]' ? parent : null; },
  };
  assert.equal(ctaPlacement(anchor), 'sticky_call');

  const tagged = {
    getAttribute(name) { return name === 'data-cta' ? 'hero' : null; },
    closest(sel) { return sel === '[data-cta]' ? this : null; },
  };
  assert.equal(ctaPlacement(tagged), 'hero');
  assert.equal(ctaPlacement(null), 'unknown');
});

test('legacy call_click keeps the old fields and ignores a parent data-cta', () => {
  const campaign = {
    gclid: 'gclid-1',
    utm_source: 'google',
    email: 'ada@example.com',
    phone: '+13055550199',
    user_data: { email: 'ada@example.com' },
  };
  const tagged = {
    dataset: { cta: 'hero' },
    getAttribute(name) { return name === 'data-cta' ? 'hero' : null; },
  };
  const legacy = legacyCallClickPayload(tagged, campaign);
  assert.equal(legacy.event, 'call_click');
  assert.equal(legacy.cta_location, 'hero');
  assert.equal(legacy.gclid, 'gclid-1');
  assert.equal(legacy.utm_source, 'google');
  assert.equal(legacy.link_url, undefined);
  assert.equal(legacy.page_path, undefined);
  assert.equal(legacy.cta_placement, undefined);
  assert.equal(legacy.email, undefined);
  assert.equal(legacy.phone, undefined);
  assert.equal(legacy.user_data, undefined);
  assert.deepEqual(Object.keys(legacy).sort(), ['cta_location', 'event', 'gclid', 'utm_source']);

  const parentOnly = {
    getAttribute() { return null; },
  };
  assert.equal(legacyCallClickPayload(parentOnly, {}).cta_location, 'unknown');
  assert.equal(legacyCallClickPayload({ dataset: { cta: '' } }, {}).cta_location, 'unknown');
});

test('a tel tap pushes phone_call_click first, then call_click from the anchor only', () => {
  const layer = [];
  const parent = {
    getAttribute(name) { return name === 'data-cta' ? 'sticky_call' : null; },
  };
  const anchor = {
    getAttribute(name) {
      if (name === 'href') return 'tel:+16452487305';
      return null;
    },
    closest(sel) { return sel === '[data-cta]' ? parent : null; },
  };
  const listeners = [];
  const mock = {
    location: { pathname: '/cars/lamborghini-urus' },
    dataLayer: layer,
    lcCampaignFields() { return { gclid: 'abc', email: 'ada@example.com' }; },
    document: {
      addEventListener(type, fn) { listeners.push({ type, fn }); },
    },
  };
  const previous = globalThis.window;
  globalThis.window = mock;
  try {
    bindContactClickTracking();
    listeners[0].fn({
      target: { closest(sel) { return sel === 'a[href]' ? anchor : null; } },
    });
    assert.equal(layer.length, 2);
    assert.equal(layer[0].event, 'phone_call_click');
    assert.equal(layer[0].cta_placement, 'sticky_call');
    assert.equal(layer[0].link_url, 'tel:+16452487305');
    assert.equal(layer[0].page_path, '/cars/lamborghini-urus');
    assert.equal(layer[1].event, 'call_click');
    assert.equal(layer[1].cta_location, 'unknown');
    assert.equal(layer[1].gclid, 'abc');
    assert.equal(layer[1].email, undefined);
    assert.equal(layer[1].link_url, undefined);
    assert.equal(layer[1].page_path, undefined);
    assert.equal(layer[1].cta_placement, undefined);
  } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
});

test('the contact listener ignores gtag, never blocks the click, and doubles only tel taps', () => {
  const layer = [];
  const gtagCalls = [];
  let prevented = false;
  const anchor = {
    getAttribute(name) {
      if (name === 'href') return 'https://api.whatsapp.com/send?phone=16452487305&text=Hi';
      if (name === 'data-cta') return 'footer';
      return null;
    },
    closest(sel) { return sel === '[data-cta]' ? this : null; },
  };
  const child = {
    closest(sel) { return sel === 'a[href]' ? anchor : null; },
  };
  const phone = {
    getAttribute(name) {
      if (name === 'href') return 'tel:+16452487305';
      return null;
    },
    closest() { return null; },
  };
  const listeners = [];
  const mock = {
    location: { pathname: '/fleet' },
    dataLayer: layer,
    gtag(...args) { gtagCalls.push(args); },
    lcCampaignFields() {
      return { gclid: 'abc', email: 'ada@example.com', phone: '+13055550199' };
    },
    document: {
      addEventListener(type, fn) { listeners.push({ type, fn }); },
    },
  };
  const previous = globalThis.window;
  globalThis.window = mock;
  try {
    bindContactClickTracking();
    bindContactClickTracking();
    assert.equal(listeners.length, 1);
    assert.equal(listeners[0].type, 'click');

    listeners[0].fn({
      target: child,
      preventDefault() { prevented = true; },
    });
    listeners[0].fn({
      target: { closest(sel) { return sel === 'a[href]' ? phone : null; } },
      preventDefault() { prevented = true; },
    });
    listeners[0].fn({
      target: {
        closest() {
          return {
            getAttribute() { return '/pricing'; },
            closest() { return null; },
          };
        },
      },
      preventDefault() { prevented = true; },
    });
    assert.doesNotThrow(() => listeners[0].fn({ get target() { throw new Error('boom'); } }));

    assert.equal(layer.length, 3);
    assert.equal(layer[0].event, 'whatsapp_click');
    assert.equal(layer[0].link_url, 'https://api.whatsapp.com/send?phone=16452487305&text=Hi');
    assert.equal(layer[0].page_path, '/fleet');
    assert.equal(layer[0].cta_placement, 'footer');
    assert.equal(layer[0].gclid, 'abc');
    assert.equal(layer[0].email, undefined);
    assert.equal(layer[0].phone, undefined);
    assert.equal(layer[0].user_data, undefined);
    assert.equal(layer.filter((entry) => entry.event === 'call_click' && entry !== layer[2]).length, 0);
    assert.equal(layer[1].event, 'phone_call_click');
    assert.equal(layer[1].link_url, 'tel:+16452487305');
    assert.equal(layer[1].cta_placement, 'unknown');
    assert.equal(layer[1].page_path, '/fleet');
    assert.equal(layer[2].event, 'call_click');
    assert.equal(layer[2].cta_location, 'unknown');
    assert.equal(layer[2].gclid, 'abc');
    assert.equal(layer[2].link_url, undefined);
    assert.equal(layer[2].page_path, undefined);
    assert.equal(layer[2].cta_placement, undefined);
    assert.equal(layer[2].email, undefined);
    assert.equal(layer[2].phone, undefined);
    assert.equal(gtagCalls.length, 0);
    assert.equal(prevented, false);
  } finally {
    if (previous === undefined) delete globalThis.window;
    else globalThis.window = previous;
  }
});
