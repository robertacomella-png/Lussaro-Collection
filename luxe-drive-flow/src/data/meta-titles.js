// Hand-written <title> overrides, keyed by no-trailing-slash pathname.
//
// cars/[slug].astro generates `${car.name} Rental Miami | Lussaro Collection`
// for every car, which is fine for most of them but runs long or reads oddly
// for a few. Anything listed here wins; everything else keeps the generated
// title.
//
// Only live routes. No huracan-sto — it left the fleet in June, and a title
// override for a non-existent page is dead weight. The G63 DID return, so it
// has an entry again.
//
// THE DATA NOW LIVES IN `meta.json`, one entry per path carrying title,
// description and the note explaining the choice. That file is what the CMS
// edits, so an SEO agency can change a title without touching code — and the
// reasoning that used to sit in a code comment travels with the entry, visible
// to whoever changes it next.
//
// This module is unchanged as an API: it still exports META_TITLES and
// titleFor, so no page had to be touched in the move.

import data from './meta.json';

const entries = data.entries;

export const META_TITLES = Object.fromEntries(
  entries.filter((e) => e.title).map((e) => [e.path, e.title]),
);

export const titleFor = (path) => META_TITLES[path] ?? null;

export default META_TITLES;
