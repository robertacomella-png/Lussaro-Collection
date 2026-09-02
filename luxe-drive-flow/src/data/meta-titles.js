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
  // fleet.js calls it "S580 Maybach"; the marque leads and "Maybach" must stay
  // in the title, since /cars/mercedes-s580 is a different, cheaper car.
  '/cars/mercedes-maybach-s580': 'Mercedes-Maybach S580 Rental Miami | Lussaro',
  // fleet.js calls it "Huracan EVO Spyder"; the marque leads, and "Spyder" is
  // what separates this title from the coupe's in a results page.
  '/cars/huracan-evo-spyder': 'Lamborghini Huracan EVO Spyder Rental Miami | Lussaro',
  // fleet.js calls it "G63"; the marque and AMG lead, and "G-Wagon" is the
  // higher-volume query — but that term already owns /g-wagon-rental-miami, so
  // this title takes the model name and leaves the nickname to that page.
  '/cars/mercedes-amg-g63': 'Mercedes-AMG G63 Rental Miami | Lussaro Collection',
};

export const titleFor = (path) => META_TITLES[path] ?? null;

export default META_TITLES;
