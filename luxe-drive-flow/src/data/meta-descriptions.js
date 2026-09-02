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

export const META_DESCRIPTIONS = {
  '/cars/lamborghini-urus':
    'Rent the Lamborghini Urus in Miami: 641 hp, 0-60 in 3.3s, $995/day with 100 miles included. Delivered anywhere in Miami, same-day available.',
  '/cars/mercedes-maybach-gls-600':
    'Rent the Maybach GLS 600 in Miami: chauffeur-grade luxury, 550 hp, $895/day with 100 miles included. Hotel, home or airport delivery.',
  '/cars/mercedes-s580':
    'Rent the Mercedes S580 in Miami from $445/day — our most accessible luxury sedan. 496 hp, 100 miles/day included, delivered across Miami.',
  '/cars/sf90':
    'Rent the Ferrari SF90 in Miami: 986 hp hybrid, 0-60 in 2.5s, $2,195/day. The fastest car in our fleet, delivered to your door.',
  '/cars/huracan-evo':
    'Rent the Lamborghini Huracan EVO in Miami: screaming V10, 602 hp, $1,295/day with 100 miles included. Same-day delivery available.',
  '/cars/mercedes-maybach-s580':
    'Rent the Mercedes-Maybach S580 in Miami: reclining executive rear seats, 496 hp, $895/day with 100 miles included. Chauffeur-grade comfort, delivered.',
  '/cars/huracan-evo-spyder':
    'Rent the Lamborghini Huracan EVO Spyder in Miami: open-top V10, 602 hp, $1,495/day with 100 miles included. Roof down in 17 seconds.',
  '/cars/mercedes-amg-g63':
    'Rent the Mercedes-AMG G63 in Miami: 577 hp twin-turbo V8, $795/day with 100 miles included. Delivered to your hotel, home or airport.',
  '/cars/rolls-royce-cullinan':
    'Rent the Rolls-Royce Cullinan in Miami: 563 hp, effortless presence, $1,495/day with 100 miles included. Delivered anywhere in Miami.',
};

export const descriptionFor = (path) => META_DESCRIPTIONS[path] ?? null;

export default META_DESCRIPTIONS;
