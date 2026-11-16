// The rating and review count shown on the Google Business Profile.
//
// This is NOT derived from reviews.js. That file holds the handful of reviews
// transcribed word for word for the site to quote; Google holds more than that,
// and the headline figure has to be Google's own, or the badge on a car page
// would disagree with the listing a customer checks next.
//
// Nothing fetches this automatically, so it has to be updated by hand: open the
// profile, read the two numbers, change them here and bump `checked`. Every car
// page reads from this file.
//
// The count is shown rounded DOWN to the nearest ten ("20+"), on the owner's
// instruction (15 Nov 2026), so the badge does not go stale each time a new
// review lands. Rounding down keeps "20+" true until the real count passes 30.

export const googleRating = {
  rating: 4.8,
  reviewCount: 24,
  checked: '2026-11-15',
};

/** "20+" for 24, "10+" for 17. Under ten there is nothing to round, so exact. */
export const googleCountLabel = (n = googleRating.reviewCount) =>
  n < 10 ? String(n) : `${Math.floor(n / 10) * 10}+`;

/** "4.8" */
export const googleRatingLabel = googleRating.rating.toFixed(1);

export default googleRating;
