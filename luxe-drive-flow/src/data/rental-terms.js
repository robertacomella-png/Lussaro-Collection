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

  minimumAge: 21,

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
    // NOT SET: the per-mile overage rate has never been supplied. While this is
    // null, /terms states the included allowance and says the overage rate is
    // disclosed in the rental agreement, rather than publishing a figure nobody
    // has confirmed. Set `overagePerMile` (a number) and the pages will state it.
    overagePerMile: null,
  },

  cancellation: {
    // Owner's stated policy: no refunds within 5 days of the rental start.
    noRefundWithinDays: 5,
    summary: 'Cancellations made within 5 days of the rental start date are non-refundable.',
  },

  delivery: [
    { area: 'Miami', fee: 125, display: '$125' },
    { area: 'Fort Lauderdale', fee: 175, display: '$175' },
  ],

  insurance: {
    summary:
      'Renters must carry their own insurance that covers the rental vehicle. If you do not have qualifying coverage, we can sell you a daily policy at the time of booking.',
  },
};

/** "$125 in Miami, $175 in Fort Lauderdale" */
export const deliverySummary = rentalTerms.delivery
  .map((d) => `${d.display} in ${d.area}`)
  .join(', ');

/** One-line fine print reused under booking CTAs. */
export const termsSummary = [
  `Must be ${rentalTerms.minimumAge}+ with a valid driver's license and qualifying insurance.`,
  `${rentalTerms.deposit.display} refundable security deposit.`,
  `${rentalTerms.mileage.includedPerDay} miles per day included.`,
].join(' ');

/** "15% off at 3+ days, 20% at 5+, 25% at 7+" */
export const discountSummary = rentalTerms.discountTiers
  .map((t, i) => (i === 0 ? `${t.pct}% off at ${t.days}+ days` : `${t.pct}% at ${t.days}+`))
  .join(', ');

/** Nightly rate for a given car at a given length of stay. */
export const rateForDays = (price, days, tiers = rentalTerms.discountTiers) => {
  const pct = tiers.reduce((acc, t) => (days >= t.days ? t.pct : acc), 0);
  return { pct, perDay: Math.round(price * (1 - pct / 100)) };
};

export default rentalTerms;
