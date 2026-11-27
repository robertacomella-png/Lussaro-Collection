import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fleet } from '../data/fleet.js';
import { rentalTerms, rateForDays } from '../data/rental-terms.js';
import { dailyRate, miamiDelivery, fortLauderdaleDelivery, returnSentence, suvRateSentence } from './delivery-facts.js';
import { deliveryBusinessSchema, deliveryHoursSpec } from './delivery-schema.js';

const miami = rentalTerms.delivery.find((d) => d.area === 'Miami');
const fll = rentalTerms.delivery.find((d) => d.area === 'Fort Lauderdale');

test('delivery pages use 09:00–20:00 every day, not the sitewide 22:00 close', () => {
  assert.equal(deliveryHoursSpec.opens, '09:00');
  assert.equal(deliveryHoursSpec.closes, '20:00');
  assert.equal(deliveryHoursSpec.dayOfWeek.length, 7);
  assert.equal(JSON.stringify(deliveryHoursSpec).includes('22:00'), false);
});

test('MIA and Port delivery offers use the Miami fee from rental-terms', () => {
  assert.equal(miamiDelivery.fee, miami.fee);
  assert.equal(miamiDelivery.display, miami.display);
  const schema = deliveryBusinessSchema({
    pageUrl: 'https://www.lussarocollection.com/luxury-car-rental-miami-airport',
    areaServed: { '@type': 'Airport', name: 'Miami International Airport', iataCode: 'MIA' },
    description: 'Delivery to Miami International Airport.',
    deliveryOffer: {
      name: 'Delivery to Miami International Airport',
      price: miamiDelivery.fee,
      description: `Local Miami rate, ${miamiDelivery.display} each way.`,
    },
  });
  const offer = schema.makesOffer.find((o) => o.name.startsWith('Delivery'));
  assert.equal(offer.price, 125);
  assert.equal(offer.price, miami.fee);
});

test('FLL delivery offer uses the Fort Lauderdale fee and does not say local', () => {
  assert.equal(fortLauderdaleDelivery.fee, fll.fee);
  const schema = deliveryBusinessSchema({
    pageUrl: 'https://www.lussarocollection.com/luxury-car-rental-fll',
    areaServed: {
      '@type': 'Airport',
      name: 'Fort Lauderdale-Hollywood International Airport',
      iataCode: 'FLL',
    },
    description: `Delivery to Fort Lauderdale-Hollywood International Airport is ${fortLauderdaleDelivery.display} each way.`,
    deliveryOffer: {
      name: 'Delivery to Fort Lauderdale-Hollywood International Airport',
      price: fortLauderdaleDelivery.fee,
      description: `${fortLauderdaleDelivery.display} each way. Published Fort Lauderdale delivery fee, charged in addition to the daily rate.`,
    },
  });
  const json = JSON.stringify(schema);
  const offer = schema.makesOffer.find((o) => o.name.startsWith('Delivery'));
  assert.equal(offer.price, 175);
  assert.equal(offer.price, fll.fee);
  assert.equal(/\blocal\b/i.test(json), false);
  assert.equal(json.includes('22:00'), false);
});

test('return copy names no street and no pickup amount', () => {
  assert.match(returnSentence, /return the car to our location, or we pick it up for a fee agreed in your quote/);
  assert.match(returnSentence, /no one-way drop-offs anywhere else/);
  assert.equal(returnSentence.includes('Biscayne'), false);
  assert.equal(/\$\d/.test(returnSentence), false);
});

test('G63 and GLS 600 rates are stated per length from the fleet price', () => {
  const deals = JSON.parse(readFileSync(new URL('../data/three-day-deals.json', import.meta.url), 'utf8'));
  const withDeal = (price, tiers, deal) => {
    const dealPct = (1 - deal / price) * 100;
    return tiers.map((t, i) => (i === 0 ? { ...t, pct: dealPct } : { ...t, pct: Math.max(t.pct, Math.ceil(dealPct)) }));
  };
  const car = (name) => {
    const raw = fleet.find((c) => c.name === name);
    const slug = name === 'G63' ? 'mercedes-amg-g63' : 'mercedes-maybach-gls-600';
    return { ...raw, discountTiers: withDeal(raw.price, rentalTerms.discountTiers, deals[slug]) };
  };
  const g63 = car('G63');
  const gls = car('GLS 600 Maybach');
  assert.equal(dailyRate(g63, 1), g63.price);
  assert.equal(dailyRate(gls, 1), gls.price);
  assert.equal(dailyRate(g63, 3), 745);
  assert.equal(dailyRate(gls, 3), 745);
  assert.equal(dailyRate(g63, 5), 636);
  assert.equal(dailyRate(gls, 5), 716);
  assert.equal(dailyRate(g63, 7), 596);
  assert.equal(dailyRate(gls, 7), 671);
  assert.equal(rateForDays(g63.price, 5, g63.discountTiers).perDay, 636);
  const sentence = suvRateSentence(
    { ...g63, name: 'Lamborghini Urus', make: 'Lamborghini', price: 995, discountTiers: rentalTerms.discountTiers },
    gls,
    { name: 'Cullinan', make: 'Rolls-Royce', price: 1295, discountTiers: rentalTerms.discountTiers },
    g63,
  );
  assert.match(sentence, /At 3 days the Mercedes-Benz G63 and the Mercedes-Benz GLS 600 Maybach are both \$745 a day/);
  assert.match(sentence, /At 5 days the Mercedes-Benz G63 is \$636 a day and the Mercedes-Benz GLS 600 Maybach is \$716 a day/);
  assert.match(sentence, /At 7 days the Mercedes-Benz G63 is \$596 a day and the Mercedes-Benz GLS 600 Maybach is \$671 a day/);
  assert.equal(sentence.includes('From 3 days'), false);
});
