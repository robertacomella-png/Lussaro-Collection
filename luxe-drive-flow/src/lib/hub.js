// Shared facts for the brand and category hubs.
//
// Prices, names and offers are derived here so a landing page cannot hardcode
// a rate that has already moved in fleet.js. Display names follow the public
// forms (Mercedes-Maybach, Mercedes-Benz, Huracán), which are not always the
// fleet.js `name` the lead form still submits.

import { cars } from '@/data/cars';
import { rentalTerms, rateForDays } from '@/data/rental-terms';

export const SITE = 'https://www.lussarocollection.com';

const NAMES = {
  'huracan-sto': 'Lamborghini Huracán STO',
  'huracan-evo': 'Lamborghini Huracán EVO',
  'huracan-evo-spyder': 'Lamborghini Huracán EVO Spyder',
  'lamborghini-urus': 'Lamborghini Urus',
  'rolls-royce-cullinan': 'Rolls-Royce Cullinan',
  'mercedes-amg-g63': 'Mercedes-AMG G63',
  'mercedes-s580': 'Mercedes-Benz S580',
  'mercedes-maybach-s580': 'Mercedes-Maybach S580',
  'mercedes-maybach-gls-600': 'Mercedes-Maybach GLS 600',
  sf90: 'Ferrari SF90',
  'porsche-911-turbo-s': 'Porsche 911 Turbo S Cabriolet',
};

const BRANDS = {
  'mercedes-maybach-s580': 'Mercedes-Maybach',
  'mercedes-maybach-gls-600': 'Mercedes-Maybach',
  'mercedes-amg-g63': 'Mercedes-AMG',
};

export const usd = (n) => `$${Number(n).toLocaleString('en-US')}`;

export const carBySlug = (slug) => cars.find((c) => c.slug === slug);

export const publicName = (car) =>
  NAMES[car.slug] ?? (car.name.startsWith(car.make) ? car.name : `${car.make} ${car.name}`);

export const publicBrand = (car) => BRANDS[car.slug] ?? car.make;

export const miamiDelivery = rentalTerms.delivery.find((d) => d.area === 'Miami');
export const fllDelivery = rentalTerms.delivery.find((d) => d.area === 'Fort Lauderdale');

/** 1-day rate, then each multi-day tier. The 3-day deal is already in discountTiers. */
export const rateRows = (car) => {
  const tiers = car.discountTiers ?? rentalTerms.discountTiers;
  return [
    { label: '1 day', perDay: car.price },
    ...tiers.map((t) => ({
      label: `${t.days}+ days`,
      perDay: rateForDays(car.price, t.days, tiers).perDay,
    })),
  ];
};

export const carsInOrder = (slugs) => slugs.map(carBySlug).filter(Boolean);

/** Spyder / Spider / Cabriolet in the name or slug. Coupes do not match. */
export const isOpenTop = (car) => /spyder|spider|cabriolet/i.test(`${car.slug} ${car.name}`);

export const productFor = (car) => {
  const photos = (car.images || []).filter((src) => src && !src.endsWith('.svg'));
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${publicName(car)} Rental — Miami`,
    image: photos.map((src) => (src.startsWith('http') ? src : `${SITE}${src}`)),
    description: `${publicName(car)} rental in Miami, ${usd(car.price)} a day.`,
    brand: { '@type': 'Brand', name: publicBrand(car) },
    sku: `LC-${car.slug.toUpperCase()}`,
    offers: {
      '@type': 'Offer',
      url: `${SITE}/cars/${car.slug}`,
      price: Number(car.price).toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE}/#business` },
    },
  };
};

export const faqPage = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const assertTitle = (label, text) => {
  if (text.length > 60) {
    throw new Error(`${label} title is ${text.length} characters (max 60): ${text}`);
  }
  return text;
};

export const assertMeta = (label, text) => {
  if (text.length < 150 || text.length > 160) {
    throw new Error(`${label} meta description is ${text.length} characters (need 150–160): ${text}`);
  }
  if (!/each way/i.test(text)) {
    throw new Error(`${label} meta description does not price delivery each way: ${text}`);
  }
  return text;
};
