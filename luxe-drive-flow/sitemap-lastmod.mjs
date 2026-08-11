// Per-page <lastmod> for the sitemap, derived from git history.
//
// The config previously used `lastmod: new Date()`, which stamped every URL
// with the build time — telling crawlers all 18 pages changed simultaneously,
// on every deploy. Google discounts lastmod once it learns not to trust it, so
// each page's date comes from the last commit that actually touched its source.
//
// This needs full git history. Vercel clones shallow by default; if a file was
// not touched within the fetched depth, git returns nothing and we fall back to
// the build time — warning once, so it degrades loudly rather than silently.

import { execFileSync } from 'node:child_process';

const cache = new Map();

const commitDate = (file) => {
  if (cache.has(file)) return cache.get(file);
  let iso = null;
  try {
    iso =
      execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim() || null;
  } catch {
    iso = null;
  }
  cache.set(file, iso);
  return iso;
};

// Which sources decide a page's content. Car pages are data-driven, so the
// fleet data counts as much as the template that renders it.
const sourcesFor = (pathname) => {
  const p = pathname.replace(/^\/+|\/+$/g, '');
  if (p === '') return ['src/pages/index.astro'];
  if (p.startsWith('cars/')) {
    return ['src/pages/cars/[slug].astro', 'src/data/fleet.js', 'src/data/cars.js'];
  }
  // /reviews changes when a review is added, not when its template is touched.
  if (p === 'reviews') return ['src/pages/reviews.astro', 'src/data/reviews.js'];
  return [`src/pages/${p}.astro`];
};

let warned = false;

export const lastmodFor = (url, fallback) => {
  const dates = sourcesFor(new URL(url).pathname).map(commitDate).filter(Boolean);

  if (!dates.length) {
    if (!warned) {
      warned = true;
      console.warn(
        '[sitemap] No git dates available (shallow clone?) — using build time for lastmod.'
      );
    }
    return fallback;
  }

  // Newest of the sources that shape the page. Compare as timestamps: %cI
  // carries a UTC offset, so raw string sorting would misorder across zones.
  const newest = dates.reduce((a, b) => (Date.parse(b) > Date.parse(a) ? b : a));
  return new Date(newest).toISOString();
};
