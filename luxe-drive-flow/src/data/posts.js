// The blog index. One entry per published post, newest first.
//
// Posts are hand-built .astro pages rather than a content collection, so there
// is nothing for the hub to glob — this registry is what makes a post findable.
// A post missing from here is invisible: it stays out of /blog, nothing links
// to it, and it lives on sitemap crumbs alone. That is exactly how
// /blog/how-much-is-a-lamborghini-rental sat orphaned from August to October
// 2026, with zero internal links pointing at it.
//
// REGISTERING A NEW POST IS A STEP IN THE BLOG SKILL. Publishing without it
// gets you a page nobody can reach.
//
// `excerpt` is for the card on /blog. It is not the meta description — that
// lives on the post itself, computed from live fleet data so the figures can
// never go stale.

export const posts = [
  {
    slug: 'mercedes-s580-vs-maybach-s580-rental-miami',
    title: 'Mercedes S580 vs Maybach S580: Which to Rent',
    excerpt:
      'Two cars, one badge, several hundred dollars a day between them. The engine is the same in both — the difference is entirely in the back seat, and it only matters if someone is sitting there.',
    published: '2026-10-06',
    updated: '2026-10-06',
    hero: '/cars/mercedes-maybach-s580-rental-miami-side-profile.jpg',
    cluster: 'Comparison',
    readingMinutes: 6,
    // Car pages that should link to this post. This is the other half of the
    // cluster: posts link out to the money pages, and the money pages have to
    // link back or every post stays an island.
    relatedCars: ['mercedes-s580', 'mercedes-maybach-s580'],
  },
  {
    slug: 'how-much-is-a-lamborghini-rental',
    title: 'How Much Is a Lamborghini Rental? Miami Rates',
    excerpt:
      'What a Lamborghini actually costs to rent in Miami — day rates for the Urus and the Huracán EVO, what the deposit covers, and the mileage included before anything is added.',
    published: '2026-08-14',
    updated: '2026-08-14',
    // Keyed in image-alt.js, so the card and the post share one alt string.
    hero: '/cars/lamborghini-urus-rental-miami-front-quarter.jpg',
    cluster: 'Lamborghini',
    readingMinutes: 9,
    relatedCars: ['lamborghini-urus', 'huracan-evo', 'huracan-evo-spyder'],
  },
];

/** Newest first. Sorted here so every consumer gets the same order. */
export const postsByDate = [...posts].sort((a, b) => b.published.localeCompare(a.published));

export const postPath = (post) => `/blog/${post.slug}`;

export const postBySlug = (slug) => posts.find((p) => p.slug === slug) ?? null;

/** Posts that should surface on a given car page, newest first. */
export const postsForCar = (carSlug) =>
  postsByDate.filter((p) => (p.relatedCars ?? []).includes(carSlug));

/** "August 14, 2026" — matches the dateline the posts themselves print. */
export const formatPostDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export default posts;
