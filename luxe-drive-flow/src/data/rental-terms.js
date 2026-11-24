// Commercial rental terms — the single source for deposit, mileage,
// cancellation, delivery and insurance facts.
//
// /terms states these in full; the car pages and /fleet quote the same values
// from here, so the fine print under a booking button can never disagree with
// the Terms of Service.
//
// Changing a number here changes it everywhere at once. That is the point.

export const rentalTerms = {
  // Maintained manually — bump when the terms actually change.
  lastUpdated: '2026-08-10',

  // Lowered from 21 to 19 on the owner's instruction, 20 Oct 2026, and from 19
  // to 18 on the owner's instruction, 15 Nov 2026, both site-wide. Every page
  // derives from this, /terms included, so the legal page cannot contradict
  // the rest of the site.
  minimumAge: 18,

  // Taxes and fees, as a share of the rental subtotal after any multi-day
  // discount. Set at 10% on the owner's instruction, 15 Nov 2026. The car-page
  // estimate reads it from here; deposit is never included in the base.
  taxesAndFeesRate: 0.1,

  // Chauffeur service is priced by the hour, not by the day, and is the one
  // rate that does not come from fleet.js.
  chauffeurHourly: { amount: 250, display: '$250' },

  // Flat across the fleet, per the owner's stated policy. Note this replaces
  // earlier site copy that said deposits "vary by vehicle".
  deposit: {
    amount: 1000,
    display: '$1,000',
    perVehicle: true,
    note: 'Returned after the vehicle is inspected on return, less any applicable deductions.',
  },

  // Multi-day discount tiers. Previously a component-local TIERS constant in
  // BookingCalendar.jsx; moved here so the booking calculator, /pricing and the
  // /fleet FAQ all quote the same ladder. A car may still override via
  // `discountTiers` on its fleet.js entry.
  discountTiers: [
    { days: 3, pct: 15 },
    { days: 5, pct: 20 },
    { days: 7, pct: 25 },
  ],

  mileage: {
    includedPerDay: 100,
    // The allowance is POOLED across the rental, not capped per day: a 3-day
    // rental is 300 miles total, spendable however the renter likes. Only the
    // total recorded at return is assessed.
    pooled: true,
    allowanceNote:
      'Mileage is pooled across the rental rather than capped daily — a three-day rental is 300 miles in total, and you can use them however you like. Only the total at return is counted.',
    // Set 20 Oct 2026 on the owner's approval. He supplied $5 in August and
    // added "for now", so treat it as the current rate rather than a permanent
    // one — if it moves, it moves here and /terms, /pricing, every car page and
    // /maybach-rental-miami follow in the same build.
    //
    // Publishing it is a conversion decision as much as a legal one: the top
    // competitor on this term states "$5 per additional mile" above the fold,
    // and a page that cannot answer "what if I go over?" loses the click that
    // was paid for.
    overagePerMile: 5,
  },

  cancellation: {
    // Owner's stated policy: no refunds within 5 days of the rental start.
    noRefundWithinDays: 5,
    summary: 'Cancellations made within 5 days of the rental start date are non-refundable.',
  },

  // THESE FEES ARE ONE WAY. Delivery at the start of the rental and collection
  // at the end are charged separately, and collection is normally the same
  // figure as delivery — so a Miami booking needing both is about $250, not
  // $125.
  //
  // The site previously said the opposite — "charged once per rental, not per
  // journey" — on seven pages including /terms and /pricing, which understated
  // the real cost by half. Every page now reads the strings below instead of
  // restating the policy in its own words, so this cannot drift again.
  delivery: [
    { area: 'Miami', fee: 125, display: '$125' },
    { area: 'Fort Lauderdale', fee: 175, display: '$175' },
  ],

  collection: {
    // Owner's stated policy: collection is *usually* the same as delivery.
    // "Usually" is doing real work there, so nothing on the site quotes a
    // round-trip total as a fixed price — the copy says "typically" and points
    // at the quote, which is where the actual figure is agreed.
    typicallySameAsDelivery: true,
    summary:
      'Delivery and collection are charged separately. Collection is typically the same fee as delivery, and both are confirmed in your quote before you book.',
  },

  insurance: {
    summary:
      'Renters must carry their own insurance that covers the rental vehicle. If you do not have qualifying coverage, we can sell you a daily policy at the time of booking.',
  },
};

/**
 * "$125 in Miami, $175 in Fort Lauderdale"
 *
 * The bare fees, with no indication that they are one way. Prefer
 * `deliveryEachWaySummary` in body copy — this is kept for the places that
 * already say "each way" in the surrounding sentence, so the phrase is not
 * printed twice.
 */
export const deliverySummary = rentalTerms.delivery
  .map((d) => `${d.display} in ${d.area}`)
  .join(', ');

/** "$125 in Miami, $175 in Fort Lauderdale, each way" — the safe default. */
export const deliveryEachWaySummary = `${deliverySummary}, each way`;

/**
 * "about $250 in Miami, about $350 in Fort Lauderdale" — delivery plus
 * collection. Hedged deliberately: collection is only *usually* the same as
 * delivery, so this is an illustration of the round trip and never a quote.
 */
export const roundTripSummary = rentalTerms.delivery
  .map((d) => `about $${(d.fee * 2).toLocaleString('en-US')} in ${d.area}`)
  .join(', ');

/** One-line fine print reused under booking CTAs. */
export const termsSummary = [
  `Must be ${rentalTerms.minimumAge}+ with a valid driver's license and qualifying insurance.`,
  `${rentalTerms.deposit.display} refundable security deposit.`,
  `${rentalTerms.mileage.includedPerDay} miles per day included.`,
].join(' ');

/**
 * "every car has its own 3-day rate, then 20% off at 5+ days and 25% at 7+"
 *
 * Reworded 23 Nov 2026 (owner-approved edit to this locked file). Each car now
 * carries a 3-Day Deal typed in Keystatic (three-day-deals.json), so the 3+ day
 * saving differs car to car and the old "15% off at 3+ days" was no longer
 * true. The first tier's pct still applies to any car whose deal box is empty.
 */
export const discountSummary = (() => {
  const [first, ...rest] = rentalTerms.discountTiers;
  const later = rest.map((t, i) => (i === 0 ? `${t.pct}% off at ${t.days}+ days` : `${t.pct}% at ${t.days}+`));
  const tail = later.length > 1 ? `${later.slice(0, -1).join(', ')} and ${later.at(-1)}` : later.join('');
  return `every car has its own ${first.days}-day rate${tail ? `, then ${tail}` : ''}`;
})();

/** Nightly rate for a given car at a given length of stay. */
export const rateForDays = (price, days, tiers = rentalTerms.discountTiers) => {
  const pct = tiers.reduce((acc, t) => (days >= t.days ? t.pct : acc), 0);
  return { pct, perDay: Math.round(price * (1 - pct / 100)) };
};

export default rentalTerms;
