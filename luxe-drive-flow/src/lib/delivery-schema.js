// Page-level AutoRental for the delivery landing pages.
//
// Opening hours are 09:00–20:00, every day, appointment only, the same window
// as business.js. The description repeats business.hoursSummary. Delivery
// prices are passed in from rental-terms.js.

import { business, postalAddress } from '../data/business.js';
import { fleet } from '../data/fleet.js';
import { deliveryHoursLabel } from './delivery-facts.js';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const prices = fleet.map((c) => c.price).filter((n) => Number.isFinite(n));
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

export const deliveryPriceRange = `$${minPrice.toLocaleString('en-US')}–$${maxPrice.toLocaleString('en-US')} per day`;

export const deliveryHoursSpec = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: DAYS,
  opens: '09:00',
  closes: '20:00',
};

/**
 * @param {object} args
 * @param {string} args.pageUrl
 * @param {object} args.areaServed
 * @param {string} args.description
 * @param {{ name: string, price: number, description: string }} args.deliveryOffer
 */
export function deliveryBusinessSchema({ pageUrl, areaServed, description, deliveryOffer }) {
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoRental', 'LocalBusiness'],
    '@id': `${pageUrl}#delivery`,
    name: business.brandName,
    legalName: business.legalName,
    url: 'https://www.lussarocollection.com',
    telephone: business.phone,
    image: 'https://www.lussarocollection.com/preview.png',
    address: postalAddress,
    areaServed,
    priceRange: deliveryPriceRange,
    currenciesAccepted: 'USD',
    description: `${description} ${deliveryHoursLabel}.`,
    openingHoursSpecification: [deliveryHoursSpec],
    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Daily rental',
        priceCurrency: 'USD',
        description: 'Daily rental rate before delivery. Delivery is a separate charge.',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          minPrice,
          maxPrice,
        },
      },
      {
        '@type': 'Offer',
        name: deliveryOffer.name,
        price: deliveryOffer.price,
        priceCurrency: 'USD',
        description: deliveryOffer.description,
      },
    ],
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
