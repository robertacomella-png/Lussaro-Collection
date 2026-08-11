// Real Google reviews, transcribed verbatim from the Google Business Profile.
//
// RULES FOR THIS FILE — the whole point of it is that it is not written by us:
//
//   1. `text` is copied character-for-character from Google. Do not fix spelling,
//      punctuation, capitalisation or grammar, do not trim, do not "tighten".
//      If a reviewer wrote "In miami" with a lowercase m, it stays that way.
//   2. `name` keeps the reviewer's own capitalisation ("demarcus king",
//      "Tirth shah") because that is how it appears on their Google account.
//   3. Never add a review that was not left on Google. Never invent one, and
//      never paraphrase a compliment someone paid over WhatsApp into one.
//   4. `car` is only set where the review itself names the vehicle. Review 4
//      says "Lamborghini" without saying which, so that is all it claims here —
//      we do not resolve it to the Urus or the Huracan.
//
// `month` is the review's month on Google as YYYY-MM. It is deliberately only
// month-precision: the page renders a relative label ("3 months ago") from it,
// recomputed at build time, so it stays roughly current across deploys without
// claiming a precision we do not have.

export const reviews = [
  {
    name: 'Kiarash Vaezzadeh-Naderi',
    rating: 5,
    month: '2026-05',
    car: 'GLS 600 Maybach',
    text: `Had an amazing experience renting from them. Went down with family for the weekend & wanted to experience Miami properly so we got the Lussaro Maybach! Super professional, quick to respond to me & very helpful throughout the process. The car was awesome! Smooth and easy process from start to finish, highly recommend!`,
  },
  {
    name: 'Gregory Capo',
    rating: 5,
    month: '2026-05',
    car: null,
    text: `Robert hooked it up for me last minute needed something quick for a dinner event that I was going to in Palm Beach. Car was ready within the hour spotless and awesome service. Recommend`,
  },
  {
    name: 'demarcus king',
    rating: 5,
    month: '2026-06',
    car: null,
    text: `Amazing customer service from owner Robert. The car was beautiful and definitely one of the biggest highlight for my son's special day. Would definitely use this service again.`,
  },
  {
    name: 'Shaf Irfan',
    rating: 5,
    month: '2026-07',
    car: 'Lamborghini',
    text: `My experience with them was absolutely flawless from start to finish. They are easily the top choice for Supercar rental In miami providing pristine vehicles and exceptional customer support. Driving their Lamborghini was a highlight of my trip, and the booking process was transparent and efficient. I highly recommend their team to anyone looking for a premium driving experience`,
  },
  {
    name: 'Tirth shah',
    rating: 5,
    month: '2026-05',
    car: 'GLS 600 Maybach',
    text: `I was in Miami for the weekend and needed a last minute rental since my original one fell through due to bad customer service and negligence. That's when Lussaro stepped in and got me sorted in a beautiful Maybach truck. It was the most seamless and professional experience. I have surely found my new go-to spot every time I'm in the 305. HIGHLY recommend Rob and the team at Lussaro!`,
  },
];

/** How many reviews, and their average — both derived, never hand-typed. */
export const reviewCount = reviews.length;
export const averageRating =
  Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10;

/**
 * "3 months ago" from a YYYY-MM string, counted in whole calendar months
 * against the build date. Month-precision in, month-precision out.
 */
export const relativeMonth = (month, now = new Date()) => {
  const [y, m] = month.split('-').map(Number);
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  if (months <= 0) return 'this month';
  if (months === 1) return 'a month ago';
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return years === 1 ? 'a year ago' : `${years} years ago`;
};

export default reviews;
