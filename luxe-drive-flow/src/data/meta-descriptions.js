// Hand-written meta descriptions, keyed by no-trailing-slash pathname.
//
// This replaces the generated description on car pages, which concatenated a
// boilerplate stem with `car.description.slice(0, 110)` and clipped mid-word —
// "...Glide t" was live on the Maybach page.
//
// Only live routes are listed. The nine cars here are the current fleet; there
// is deliberately no entry for huracan-sto, which left the fleet in June. The
// G63 left at the same time and has since returned.
//
// cars/[slug].astro looks these up by slug. Static pages set their own
// description prop on <Layout> and are not duplicated here.
//
// THE DATA NOW LIVES IN `meta.json`, alongside the title for the same path, so
// the two are edited together and cannot drift apart. That file is what the CMS
// edits. This module is unchanged as an API — it still exports
// META_DESCRIPTIONS and descriptionFor, so no page had to be touched.

import data from './meta.json';

const entries = data.entries;

export const META_DESCRIPTIONS = Object.fromEntries(
  entries.filter((e) => e.description).map((e) => [e.path, e.description]),
);

export const descriptionFor = (path) => META_DESCRIPTIONS[path] ?? null;

export default META_DESCRIPTIONS;
