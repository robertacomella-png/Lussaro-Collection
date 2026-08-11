// Hand-written <title> overrides, keyed by no-trailing-slash pathname.
//
// cars/[slug].astro generates `${car.name} Rental Miami | Lussaro Collection`
// for every car, which is fine for most of them but runs long or reads oddly
// for a few. Anything listed here wins; everything else keeps the generated
// title.
//
// Only live routes. No huracan-sto or mercedes-amg-g63 — both left the fleet
// in June, and a title override for a non-existent page is dead weight.

export const META_TITLES = {
  // "GLS 600 Maybach Rental Miami" reads backwards; the marque leads.
  '/cars/mercedes-maybach-gls-600': 'Mercedes-Maybach GLS 600 Rental Miami | Lussaro',
  // fleet.js calls it "S580"; spell out the marque for search.
  '/cars/mercedes-s580': 'Mercedes-Benz S580 Rental Miami | Lussaro Collection',
  // fleet.js calls it "SF90".
  '/cars/sf90': 'Ferrari SF90 Rental Miami | Lussaro Collection',
  // fleet.js calls it "Cullinan".
  '/cars/rolls-royce-cullinan': 'Rolls-Royce Cullinan Rental Miami | Lussaro',
  // fleet.js calls it "Huracan EVO".
  '/cars/huracan-evo': 'Lamborghini Huracan EVO Rental Miami | Lussaro',
};

export const titleFor = (path) => META_TITLES[path] ?? null;

export default META_TITLES;
