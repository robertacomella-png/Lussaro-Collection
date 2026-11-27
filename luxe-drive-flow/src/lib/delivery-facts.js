// Facts shared by the MIA, FLL, and Port of Miami delivery pages.
//
// Hours here are the window Robert set for these pages (9:00 AM–8:00 PM daily,
// appointment only). They are not business.js, which still says 09:00–22:00
// for the footer and the sitewide schema. Fees come from rental-terms.js.

import { rentalTerms, rateForDays } from '../data/rental-terms.js';

export const deliveryHoursLabel = '9:00 AM–8:00 PM daily, by appointment only';

export const miamiDelivery = rentalTerms.delivery.find((d) => d.area === 'Miami');
export const fortLauderdaleDelivery = rentalTerms.delivery.find((d) => d.area === 'Fort Lauderdale');

export const returnSentence = 'You return the car to our location, or we pick it up for a fee agreed in your quote. There are no one-way drop-offs anywhere else.';

const usd = (n) => `$${Number(n).toLocaleString('en-US')}`;

// fleet.js `name` is the lead-form option value ("GLS 600 Maybach"). Public
// copy on these pages uses the marque Public Relations specified. Do not change
// fleet.js: that name is also the select value, the slug key, and other pages.
const DISPLAY_NAME = {
  'GLS 600 Maybach': 'Mercedes-Maybach GLS 600',
};

export const displayName = (car) =>
  DISPLAY_NAME[car.name] ?? (car.name.startsWith(car.make) ? car.name : `${car.make} ${car.name}`);

/** Per-day rate at a stated length. Day 1 is the fleet.js price. Longer stays use that price and the car's discount tiers. */
export const dailyRate = (car, days) => rateForDays(car.price, days, car.discountTiers).perDay;

export function suvRateSentence(urus, gls, cullinan, g63) {
  const at = (car, days) => usd(dailyRate(car, days));
  const three = dailyRate(g63, 3) === dailyRate(gls, 3)
    ? `At 3 days the ${displayName(g63)} and the ${displayName(gls)} are both ${at(g63, 3)} a day.`
    : `At 3 days the ${displayName(g63)} is ${at(g63, 3)} a day and the ${displayName(gls)} is ${at(gls, 3)} a day.`;
  return `The 1-day rate is ${at(urus, 1)} for the ${displayName(urus)}, ${at(gls, 1)} for the ${displayName(gls)}, ${at(cullinan, 1)} for the ${displayName(cullinan)}, and ${at(g63, 1)} for the ${displayName(g63)}. ${three} At 5 days the ${displayName(g63)} is ${at(g63, 5)} a day and the ${displayName(gls)} is ${at(gls, 5)} a day. At 7 days the ${displayName(g63)} is ${at(g63, 7)} a day and the ${displayName(gls)} is ${at(gls, 7)} a day.`;
}

export const flightTrackingSentence =
  'We track the flight for a self-drive delivery and for a chauffeur booking.';

export const lateFlightSentence = 'Late-night flight arrivals are handled.';
export const lateShipSentence = 'Late-night ship arrivals are handled.';
