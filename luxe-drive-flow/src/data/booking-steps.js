// The three-step booking explainer, shared by /fleet and /contact so the two
// recaps cannot drift apart. Chauffeur service has its own distinct steps and
// deliberately does not use these.
import { rentalTerms } from './rental-terms.js';

const miamiDelivery = rentalTerms.delivery.find((d) => d.area === 'Miami');

export const bookingSteps = [
  { n: '1', t: 'Message us', d: "Tap WhatsApp or call. Tell us the car and dates and we'll confirm availability." },
  { n: '2', t: 'We deliver', d: `Delivery from ${miamiDelivery.display} each way — hotel, home, or airport.` },
  { n: '3', t: 'You drive', d: 'Keys in hand, full orientation, 24/7 support. Just enjoy the road.' },
];

export default bookingSteps;
