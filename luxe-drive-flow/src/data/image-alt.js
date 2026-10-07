// Alt text for the gallery photographs, keyed by image source.
//
// Written from the actual photos, not from filenames — each entry names the
// vehicle and describes the real setting, with a Miami location term only where
// the photo actually shows one.
//
// Scope note: covers /gallery plus the three car photos used on /about. The
// remaining car-page photos have not been reviewed yet and keep their existing
// alt rather than getting guessed-at descriptions here.

const ALT = {
  // --- Hero photo used on /fleet and the landing pages ----------------------
  'https://ik.imagekit.io/8i3ae7fac/cars-14.jpg':
    'Mercedes-Maybach GLS 600 and Lamborghini Urus rentals parked under the Metromover track in downtown Miami',

  // --- Car photos used on /about (viewed before writing) --------------------
  '/cars/ferrari-sf90-rental-miami-front-quarter.jpg':
    'White Ferrari SF90 rental parked on an open deck with the downtown Miami skyline and construction cranes behind',
  '/cars/mercedes-maybach-gls-600-rental-miami-front-quarter.jpg':
    'Black Mercedes-Maybach GLS 600 rental on a palm-lined paver driveway beside the water in Miami',
  '/cars/lamborghini-huracan-evo-rental-miami-front-quarter.jpg':
    'Purple Lamborghini Huracan EVO rental on a rooftop deck with the downtown Miami skyline behind',

  // --- Blog hero (viewed before writing) ------------------------------------
  // No identifiable Miami landmark in frame, so the location is left out per
  // the rule at the top of this file.
  '/cars/lamborghini-urus-rental-miami-front-quarter.jpg':
    'Purple Lamborghini Urus rental parked on a palm-lined side street beside a muraled concrete wall, front three-quarter view',

  '/gallery/gallery-1.jpg':
    'Mercedes-Maybach GLS 600 and Lamborghini Urus rentals parked side by side in downtown Miami, Metromover track overhead',
  '/gallery/gallery-2.jpg':
    'Purple Lamborghini Urus rental on a cobblestone waterfront with the Brickell skyline behind, Miami',
  '/gallery/gallery-3.jpg':
    'Lamborghini Urus rental seen head-on across Biscayne Bay from the Brickell skyline, Miami',
  '/gallery/gallery-4.jpg':
    'Side profile of the Lamborghini Urus rental on a cobblestone promenade opposite the Brickell skyline, Miami',
  '/gallery/gallery-5.jpg':
    'Rear three-quarter view of the Lamborghini Urus rental on a Miami bayfront promenade, condo towers across the water',
  '/gallery/gallery-6.jpg':
    'Lamborghini Urus rental from behind at sunset on a palm-lined Miami waterfront drive',
  '/gallery/gallery-7.jpg':
    'Close-up of the Lamborghini badge and front grille on the purple Lamborghini Urus rental',
  '/gallery/gallery-8.jpg':
    'Low front view of the purple Lamborghini Urus rental on cobblestones under a bright Miami sky',
  '/gallery/gallery-9.jpg':
    'Interior of the Lamborghini Urus rental with quilted leather seats, Lamborghini crest headrests and panoramic sunroof',

  // --- Maybach S580, viewed before writing (for the S580 comparison post) ----
  // The grandstand behind the car is left undescribed beyond "graffitied
  // concrete" on purpose: it looks like a known Miami structure, but naming a
  // landmark we have not confirmed would be asserting something the photo only
  // suggests.
  '/cars/mercedes-maybach-s580-rental-miami-side-profile.jpg':
    'Two-tone Mercedes-Maybach S580 rental in side profile, cream over black with the Maybach monogram on the rear pillar, parked on open concrete in front of a graffitied grandstand and palm trees in Miami',
  // Viewed before writing, for the condition post. No Miami landmark is visible
  // through the glass, so the alt does not claim one.
  '/cars/ferrari-sf90-rental-miami-red-interior.jpg':
    'Red leather and Alcantara seats in the Ferrari SF90 rental, prancing horse headrests, carbon-shell seat backs and red belts, shot through the open driver door',

  '/cars/mercedes-maybach-s580-rental-miami-executive-rear-seats.jpg':
    'Rear cabin of the Mercedes-Maybach S580 rental with the right-hand seat reclined and its calf rest raised, white diamond-quilted leather, loose pillows and a screen on the seatback',
};

// Strip ImageKit transforms / cache-busting params so callers may pass either
// the raw source or a transformed one.
const key = (src) => (typeof src === 'string' ? src.split('?')[0] : '');

export const altFor = (src, fallback = '') => ALT[key(src)] ?? fallback;

export default ALT;
