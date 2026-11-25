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
// Visible copy says the verified count with a plus ("25+"), so the sentence
// stays true as new reviews arrive and does not print a lower round number.
// Structured data must use `reviewCount` exactly — never the plus label.

export const googleRating = {
  rating: 4.8,
  reviewCount: 25,
  checked: '2026-11-25',
};

/** "25+" for 25, "9" under ten. The plus is a floor, not a round-down. */
export const googleCountLabel = (n = googleRating.reviewCount) =>
  n < 10 ? String(n) : `${n}+`;

/** "4.8" */
export const googleRatingLabel = googleRating.rating.toFixed(1);

export default googleRating;
