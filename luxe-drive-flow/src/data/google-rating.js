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
// The count is shown as the stored total with a plus ("25+"). Rounding down
// to the nearest ten would still print "20+" at 25, so the stored count is
// what the badge shows.

export const googleRating = {
  rating: 4.8,
  reviewCount: 25,
  checked: '2026-11-15',
};

/** "25+" for 25. Under ten there is nothing to add, so exact. */
export const googleCountLabel = (n = googleRating.reviewCount) =>
  n < 10 ? String(n) : `${n}+`;

/** "4.8" */
export const googleRatingLabel = googleRating.rating.toFixed(1);

export default googleRating;
