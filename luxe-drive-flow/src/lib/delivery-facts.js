// Facts shared by the MIA, FLL, and Port of Miami delivery pages.
//
// Hours here are the window Robert set for these pages (9:00 AM–8:00 PM daily,
// appointment only). They are not business.js, which still says 09:00–22:00
// for the footer and the sitewide schema. Fees come from rental-terms.js.

import { addressLine } from '../data/business.js';
import { rentalTerms } from '../data/rental-terms.js';

export const deliveryHoursLabel = '9:00 AM–8:00 PM daily, by appointment only';

export const miamiDelivery = rentalTerms.delivery.find((d) => d.area === 'Miami');
export const fortLauderdaleDelivery = rentalTerms.delivery.find((d) => d.area === 'Fort Lauderdale');

export const returnSentence = `You return the car to our location at ${addressLine}, or we pick it up. The pickup fee is agreed in your quote. There are no one-way drop-offs anywhere else.`;

export const flightTrackingSentence =
  'We track the flight for a self-drive delivery and for a chauffeur booking.';

export const lateFlightSentence = 'Late-night flight arrivals are handled.';
export const lateShipSentence = 'Late-night ship arrivals are handled.';
