import assert from 'node:assert/strict';
import test from 'node:test';
import {
  COOKIE_MAX_AGE,
  STORAGE_KEY,
  campaignFields,
  captureAttribution,
  cookieAttributes,
  dashboardAttribution,
  leadAttribution,
  resolveLeadId,
  sanitizeTouch,
  toE164,
  withAttribution,
} from './attribution.js';

const T1 = '2026-11-25T18:00:00.000Z';
const T2 = '2026-11-25T19:00:00.000Z';
const T3 = '2026-11-25T20:00:00.000Z';

function memoryEnv({ url, referrer = '', cookies = '', now = T1, protocol }) {
  const u = new URL(url);
  const store = new Map();
  let cookieStr = cookies;
  const writes = [];
  return {
    location: {
      pathname: u.pathname,
      search: u.search,
      protocol: protocol || u.protocol,
    },
    referrer,
    nowMs: Date.parse(now),
    iso: now,
    getCookieString: () => cookieStr,
    setCookie(name, encodedValue, attributes) {
      writes.push({ name, encodedValue, attributes });
      const kept = cookieStr
        .split(';')
        .map((part) => part.trim())
        .filter((part) => part && !part.startsWith(`${name}=`));
      kept.push(`${name}=${encodedValue}`);
      cookieStr = kept.join('; ');
    },
    storage: {
      getItem: (key) => (store.has(key) ? store.get(key) : null),
      setItem: (key, value) => store.set(key, String(value)),
    },
    writes,
    localRaw: () => store.get(STORAGE_KEY) || '',
  };
}

test('first touch is written once and a bare page does not replace last touch', () => {
  const env = memoryEnv({
    url: 'https://www.lussarocollection.com/lamborghini-urus-rental-miami?gclid=TEST&utm_source=google&utm_medium=cpc&utm_campaign=urus',
    referrer: 'https://www.google.com/',
    now: T1,
  });
  captureAttribution(env);

  env.location = { pathname: '/fleet', search: '', protocol: 'https:' };
  env.referrer = 'https://www.lussarocollection.com/lamborghini-urus-rental-miami';
  env.iso = T2;
  env.nowMs = Date.parse(T2);
  const second = captureAttribution(env);

  assert.equal(second.first_touch.gclid, 'TEST');
  assert.equal(second.first_touch.utm_campaign, 'urus');
  assert.equal(second.first_touch.captured_at, T1);
  assert.equal(second.first_touch.landing_page, '/lamborghini-urus-rental-miami?gclid=TEST&utm_source=google&utm_medium=cpc&utm_campaign=urus');
  assert.equal(second.last_touch.gclid, 'TEST');
  assert.equal(second.last_touch.captured_at, T1);
  assert.equal(second.last_touch.landing_page, second.first_touch.landing_page);
  assert.equal(second.last_touch.referrer, 'https://www.google.com/');
});

test('a new click id moves last touch and leaves first touch', () => {
  const env = memoryEnv({
    url: 'https://www.lussarocollection.com/?gclid=FIRST&utm_source=google&utm_medium=cpc',
    now: T1,
  });
  captureAttribution(env);

  env.location = {
    pathname: '/fleet',
    search: '?gclid=SECOND&utm_source=google&utm_medium=cpc&utm_campaign=fleet',
    protocol: 'https:',
  };
  env.iso = T2;
  env.nowMs = Date.parse(T2);
  const next = captureAttribution(env);

  assert.equal(next.first_touch.gclid, 'FIRST');
  assert.equal(next.first_touch.captured_at, T1);
  assert.equal(next.last_touch.gclid, 'SECOND');
  assert.equal(next.last_touch.utm_campaign, 'fleet');
  assert.equal(next.last_touch.captured_at, T2);
  assert.equal(next.last_touch.landing_page, '/fleet?gclid=SECOND&utm_source=google&utm_medium=cpc&utm_campaign=fleet');
});

test('a direct visit is stored, then an ad click updates only last touch', () => {
  const env = memoryEnv({
    url: 'https://www.lussarocollection.com/',
    referrer: 'https://www.bing.com/',
    now: T1,
  });
  const first = captureAttribution(env);
  assert.equal(first.first_touch.landing_page, '/');
  assert.equal(first.first_touch.referrer, 'https://www.bing.com/');
  assert.equal(first.first_touch.gclid, undefined);
  assert.equal(first.last_touch.captured_at, T1);

  env.location = { pathname: '/fleet', search: '?msclkid=MSCLK&utm_source=bing', protocol: 'https:' };
  env.iso = T2;
  env.nowMs = Date.parse(T2);
  const next = captureAttribution(env);
  assert.equal(next.first_touch.msclkid, undefined);
  assert.equal(next.first_touch.captured_at, T1);
  assert.equal(next.last_touch.msclkid, 'MSCLK');
  assert.equal(next.last_touch.utm_source, 'bing');
});

test('empty campaign params do not count as a new last touch', () => {
  const env = memoryEnv({
    url: 'https://www.lussarocollection.com/?gclid=TEST&utm_source=google',
    now: T1,
  });
  captureAttribution(env);
  env.location = { pathname: '/cars/urus', search: '?gclid=&utm_source=', protocol: 'https:' };
  env.iso = T2;
  env.nowMs = Date.parse(T2);
  const next = captureAttribution(env);
  assert.equal(next.last_touch.gclid, 'TEST');
  assert.equal(next.last_touch.captured_at, T1);
  assert.equal(next.last_touch.landing_page, '/?gclid=TEST&utm_source=google');
});

test('captures every click id and utm, and drops anything else', () => {
  const env = memoryEnv({
    url: 'https://www.lussarocollection.com/fleet?gclid=g&gbraid=gb&wbraid=wb&fbclid=fb&msclkid=ms&utm_source=s&utm_medium=m&utm_campaign=c&utm_term=t&utm_content=n&utm_extra=no&email=secret@example.com',
    now: T1,
  });
  const stored = captureAttribution(env);
  assert.deepEqual(
    {
      gclid: stored.first_touch.gclid,
      gbraid: stored.first_touch.gbraid,
      wbraid: stored.first_touch.wbraid,
      fbclid: stored.first_touch.fbclid,
      msclkid: stored.first_touch.msclkid,
      utm_source: stored.first_touch.utm_source,
      utm_medium: stored.first_touch.utm_medium,
      utm_campaign: stored.first_touch.utm_campaign,
      utm_term: stored.first_touch.utm_term,
      utm_content: stored.first_touch.utm_content,
    },
    { gclid: 'g', gbraid: 'gb', wbraid: 'wb', fbclid: 'fb', msclkid: 'ms', utm_source: 's', utm_medium: 'm', utm_campaign: 'c', utm_term: 't', utm_content: 'n' },
  );
  assert.equal(stored.first_touch.utm_extra, undefined);
  assert.equal(stored.first_touch.email, undefined);
});

test('fbc comes from the _fbc cookie, otherwise fb.1.<ms>.<fbclid>', () => {
  const fromCookie = memoryEnv({
    url: 'https://www.lussarocollection.com/?fbclid=FROMURL',
    cookies: '_fbc=fb.1.1.FromCookie; _fbp=fb.1.1.Browser',
    now: T1,
  });
  const cookieTouch = captureAttribution(fromCookie);
  assert.equal(cookieTouch.first_touch.fbc, 'fb.1.1.FromCookie');
  assert.equal(cookieTouch.first_touch.fbp, 'fb.1.1.Browser');

  const built = memoryEnv({
    url: 'https://www.lussarocollection.com/?fbclid=AbC',
    now: T1,
  });
  const builtTouch = captureAttribution(built);
  assert.equal(builtTouch.first_touch.fbc, `fb.1.${Date.parse(T1)}.AbC`);
  assert.equal(builtTouch.first_touch.fbp, undefined);
});

test('a later _fbp fills an existing touch without moving the ad click', () => {
  const env = memoryEnv({
    url: 'https://www.lussarocollection.com/?gclid=TEST&utm_source=google',
    now: T1,
  });
  captureAttribution(env);
  env.location = { pathname: '/fleet', search: '', protocol: 'https:' };
  env.iso = T2;
  env.nowMs = Date.parse(T2);
  const existing = env.writes.at(-1);
  env.getCookieString = () => `${STORAGE_KEY}=${existing.encodedValue}; _fbp=fb.1.2.Pixel`;
  const next = captureAttribution(env);
  assert.equal(next.last_touch.gclid, 'TEST');
  assert.equal(next.last_touch.captured_at, T1);
  assert.equal(next.last_touch.landing_page, '/?gclid=TEST&utm_source=google');
  assert.equal(next.first_touch.fbp, 'fb.1.2.Pixel');
  assert.equal(next.last_touch.fbp, 'fb.1.2.Pixel');
});

test('an existing fbc is not replaced by a different cookie on a page with no campaign', () => {
  const env = memoryEnv({
    url: 'https://www.lussarocollection.com/?fbclid=AbC',
    now: T1,
  });
  captureAttribution(env);
  const encoded = env.writes.at(-1).encodedValue;
  env.location = { pathname: '/about', search: '', protocol: 'https:' };
  env.iso = T2;
  env.nowMs = Date.parse(T2);
  env.getCookieString = () => `${STORAGE_KEY}=${encoded}; _fbc=fb.1.9.Different`;
  const next = captureAttribution(env);
  assert.equal(next.first_touch.fbc, `fb.1.${Date.parse(T1)}.AbC`);
  assert.equal(next.last_touch.fbclid, 'AbC');
  assert.equal(next.last_touch.captured_at, T1);
});

test('stores in localStorage and a first-party Lax cookie for 90 days', () => {
  const env = memoryEnv({
    url: 'https://www.lussarocollection.com/?gclid=TEST',
    now: T1,
  });
  captureAttribution(env);
  const saved = JSON.parse(env.localRaw());
  assert.equal(saved.first_touch.gclid, 'TEST');
  const write = env.writes.at(-1);
  assert.equal(write.name, STORAGE_KEY);
  assert.equal(write.attributes, `Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure`);
  assert.equal(COOKIE_MAX_AGE, 7776000);
  assert.match(decodeURIComponent(write.encodedValue), /TEST/);

  const http = memoryEnv({
    url: 'http://localhost:4321/?gclid=TEST',
    now: T1,
  });
  captureAttribution(http);
  assert.equal(http.writes.at(-1).attributes, `Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`);
  assert.equal(cookieAttributes('http:').includes('Secure'), false);
});

test('the cookie keeps an older first touch when localStorage was cleared', () => {
  const seeded = {
    first_touch: { gclid: 'ORIGINAL', landing_page: '/old', captured_at: T1 },
    last_touch: { gclid: 'ORIGINAL', landing_page: '/old', captured_at: T1 },
  };
  const env = memoryEnv({
    url: 'https://www.lussarocollection.com/fleet?gclid=NEWER&utm_source=google',
    cookies: `${STORAGE_KEY}=${encodeURIComponent(JSON.stringify(seeded))}`,
    now: T3,
  });
  const next = captureAttribution(env);
  assert.equal(next.first_touch.gclid, 'ORIGINAL');
  assert.equal(next.first_touch.captured_at, T1);
  assert.equal(next.last_touch.gclid, 'NEWER');
  assert.equal(next.last_touch.captured_at, T3);
});

test('a storage failure does not throw and the form payload still posts', () => {
  const env = {
    location: { pathname: '/fleet', search: '?gclid=TEST', protocol: 'https:' },
    referrer: '',
    nowMs: Date.parse(T1),
    iso: T1,
    getCookieString() { throw new Error('blocked'); },
    setCookie() { throw new Error('blocked'); },
    storage: {
      getItem() { throw new Error('blocked'); },
      setItem() { throw new Error('blocked'); },
    },
  };
  assert.doesNotThrow(() => captureAttribution(env));
  const payload = withAttribution({ name: 'Ada', phone: '3055550199', source: 'lead_form' }, 'LeadForm', env);
  assert.equal(payload.name, 'Ada');
  assert.equal(payload.phone, '3055550199');
  assert.equal(payload.form_placement, 'LeadForm');
});

test('lead payload is the two touches plus the form placement', () => {
  const env = memoryEnv({
    url: 'https://www.lussarocollection.com/?gclid=TEST&utm_source=google',
    now: T1,
  });
  captureAttribution(env);
  const extra = leadAttribution('QuoteDialog', env);
  assert.equal(extra.form_placement, 'QuoteDialog');
  assert.equal(extra.attribution.first_touch.gclid, 'TEST');
  assert.equal(extra.attribution.last_touch.utm_source, 'google');
  assert.deepEqual(Object.keys(extra.attribution).sort(), ['first_touch', 'last_touch']);
});

test('click events receive campaign fields and never email or phone', () => {
  const fields = campaignFields({
    first_touch: { gclid: 'FIRST', utm_source: 'google', fbp: 'fb.1.1.x', captured_at: T1 },
    last_touch: { gclid: 'LAST', utm_campaign: 'urus', fbc: 'fb.1.1.y', landing_page: '/secret', captured_at: T2 },
  });
  assert.deepEqual(fields, { gclid: 'LAST', utm_campaign: 'urus' });
});

test('server sanitizer caps length, drops empties and unknown keys, and keeps the placement allowlist', () => {
  const forwarded = dashboardAttribution({
    form_placement: 'VehicleBookingCard',
    attribution: {
      first_touch: {
        gclid: ` ${'G'.repeat(250)} `,
        utm_source: 'google',
        email: 'ada@example.com',
        captured_at: 'yesterday',
        landing_page: '/fleet',
      },
      last_touch: { utm_medium: '', fbclid: 'fb', captured_at: T2 },
      other: { gclid: 'nope' },
    },
  });
  assert.equal(forwarded.form_placement, 'VehicleBookingCard');
  assert.equal(forwarded.attribution.first_touch.gclid.length, 200);
  assert.equal(forwarded.attribution.first_touch.utm_source, 'google');
  assert.equal(forwarded.attribution.first_touch.email, undefined);
  assert.equal(forwarded.attribution.first_touch.captured_at, undefined);
  assert.equal(forwarded.attribution.last_touch.utm_medium, undefined);
  assert.equal(forwarded.attribution.last_touch.fbclid, 'fb');
  assert.equal(forwarded.attribution.other, undefined);
  assert.deepEqual(dashboardAttribution({ form_placement: 'home_hero' }), {});
  assert.deepEqual(dashboardAttribution(undefined), {});
  assert.equal(sanitizeTouch({ gclid: 12 }) , undefined);
});

test('lead id prefers the dashboard echo, then the id we sent, and nothing when the save failed', () => {
  const sent = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
  const echoed = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
  assert.equal(resolveLeadId({ dashboardOk: true, body: { lead_id: echoed }, sentId: sent }), echoed);
  assert.equal(resolveLeadId({ dashboardOk: true, body: { ok: true }, sentId: sent }), sent);
  assert.equal(resolveLeadId({ dashboardOk: true, body: { lead_id: 'not-a-uuid' }, sentId: sent }), sent);
  assert.equal(resolveLeadId({ dashboardOk: false, body: { lead_id: echoed }, sentId: sent }), '');
});

test('phone numbers for enhanced conversions are E.164', () => {
  assert.equal(toE164('3055550199'), '+13055550199');
  assert.equal(toE164('+1 (305) 555-0199'), '+13055550199');
  assert.equal(toE164('+447911123456'), '+447911123456');
  assert.equal(toE164('123'), '');
  assert.equal(toE164(''), '');
});
