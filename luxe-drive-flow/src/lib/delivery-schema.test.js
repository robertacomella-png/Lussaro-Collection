import assert from 'node:assert/strict';
import test from 'node:test';
import { rentalTerms } from '../data/rental-terms.js';
import { miamiDelivery, fortLauderdaleDelivery } from './delivery-facts.js';
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
