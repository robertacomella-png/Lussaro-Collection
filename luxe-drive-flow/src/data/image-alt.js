// Alt text for the gallery photographs, keyed by image source.
//
// Written from the actual photos, not from filenames — each entry names the
// vehicle and describes the real setting, with a Miami location term only where
// the photo actually shows one.
//
// Scope: every photo on the site, as of 15 Nov 2026. Car pages, fleet cards,
// the fleet modal and the blogs all read from here; a photo added without an
// entry falls back to "<car> rental in Miami" until one is written.

const ALT = {
  // --- Hero photo used on /fleet and the landing pages ----------------------
  'https://ik.imagekit.io/8i3ae7fac/cars-14.jpg':
    'Mercedes-Maybach GLS 600 and Lamborghini Urus rentals parked under the Metromover track in downtown Miami',

  // --- Huracan STO (viewed before writing, 15 Nov 2026) ---------------------
  // Waterfront with palms, but nothing in frame identifies the city, so no
  // Miami location term.
  '/cars/lamborghini-huracan-sto-rental-miami-front-quarter.jpg':
    'Matte black Lamborghini Huracan STO rental with red trim, STO livery and a fixed rear wing, parked on pavers beside the water between two palm trees',
  '/cars/lamborghini-huracan-sto-rental-miami-side-profile.jpg':
    'Side profile of the matte black Lamborghini Huracan STO rental, showing the roof scoop, rear wing, red side skirts and STO door graphic, with the water behind',
  '/cars/lamborghini-huracan-sto-rental-miami-front.jpg':
    'Head-on view of the Lamborghini Huracan STO rental, matte black with a red front splitter, parked facing the camera with the water behind',
  '/cars/lamborghini-huracan-sto-rental-miami-rear.jpg':
    'Rear of the Lamborghini Huracan STO rental: twin exhausts, red diffuser and STO lettering under a wide rear wing with red endplates',
  '/cars/lamborghini-huracan-sto-rental-miami-steering-wheel.jpg':
    'Alcantara steering wheel of the Lamborghini Huracan STO with red stitching, a red centre stripe and the drive-mode switch below the hub',
  '/cars/lamborghini-huracan-sto-rental-miami-instrument-cluster.jpg':
    'Digital instrument cluster of the Lamborghini Huracan STO showing the tachometer and the STO drive-mode badge',

  // --- Porsche 911 Turbo S Cabriolet (viewed before writing, 15 Nov 2026) ---
  '/cars/porsche-911-turbo-s-cabriolet-rental-miami-front-quarter.jpg':
    'White Porsche 911 Turbo S Cabriolet rental with the roof down and a red interior, parked by the water with the downtown Miami skyline behind',
  '/cars/porsche-911-turbo-s-cabriolet-rental-miami-side-profile.jpg':
    'Side profile of the white Porsche 911 Turbo S Cabriolet rental, roof down, showing the rear wing, yellow brake calipers and red cabin',
  '/cars/porsche-911-turbo-s-cabriolet-rental-miami-front.jpg':
    'Head-on view of the white Porsche 911 Turbo S Cabriolet rental with the roof down and red seats, in an empty lot in front of a concrete grandstand',
  '/cars/porsche-911-turbo-s-cabriolet-rental-miami-rear-quarter.jpg':
    'Rear three-quarter view of the white Porsche 911 Turbo S Cabriolet rental with its rear wing raised and roof down',
  '/cars/porsche-911-turbo-s-cabriolet-rental-miami-rear.jpg':
    'Rear of the Porsche 911 Turbo S Cabriolet rental: full-width light bar, Porsche lettering and twin exhausts',
  '/cars/porsche-911-turbo-s-cabriolet-rental-miami-cockpit.jpg':
    'Red leather cockpit of the Porsche 911 Turbo S Cabriolet, with the steering wheel, digital gauges and center console',
  '/cars/porsche-911-turbo-s-cabriolet-rental-miami-interior-overhead.jpg':
    'Overhead view into the red interior of the Porsche 911 Turbo S Cabriolet with the roof down, showing both front seats and the dashboard',

  // --- Every remaining car-page photo (viewed before writing, 15 Nov 2026) ---
  // Miami is named only where the frame shows the downtown skyline.
  '/cars/ferrari-sf90-rental-miami-arrival.jpg':
    'White Ferrari SF90 rental parked at the curb outside a glass-fronted building lined with trees',
  '/cars/ferrari-sf90-rental-miami-dashboard.jpg':
    'Cockpit of the Ferrari SF90 rental: steering wheel, digital display and red leather seats seen through the open door',
  '/cars/ferrari-sf90-rental-miami-front-angle.jpg':
    'White Ferrari SF90 rental on an open deck with downtown Miami high-rises and a construction crane behind',
  '/cars/ferrari-sf90-rental-miami-front-high.jpg':
    'Elevated head-on view of the white Ferrari SF90 rental on a concrete deck',
  '/cars/ferrari-sf90-rental-miami-front.jpg':
    'Head-on view of the white Ferrari SF90 rental, low and wide, with city towers behind',
  '/cars/ferrari-sf90-rental-miami-rear-quarter.jpg':
    'Rear three-quarter view of the white Ferrari SF90 rental showing its tail lights and rear haunches',
  '/cars/ferrari-sf90-rental-miami-side-profile.jpg':
    'Side profile of the white Ferrari SF90 rental on a concrete deck with downtown towers and clouds behind',
  '/cars/lamborghini-huracan-evo-rental-miami-dashboard.jpg':
    'Steering wheel, digital gauges and black and white interior of the Lamborghini Huracan EVO rental',
  '/cars/lamborghini-huracan-evo-rental-miami-downtown-skyline.jpg':
    'Purple Lamborghini Huracan EVO rental on an open deck below downtown Miami high-rises and a curved white arch under construction',
  '/cars/lamborghini-huracan-evo-rental-miami-front.jpg':
    'Head-on view of the purple Lamborghini Huracan EVO rental, low and wide, on a concrete deck',
  '/cars/lamborghini-huracan-evo-rental-miami-interior.jpg':
    "Driver's seat and door of the purple Lamborghini Huracan EVO rental, black and white leather interior",
  '/cars/lamborghini-huracan-evo-rental-miami-rear.jpg':
    'Rear view of the purple Lamborghini Huracan EVO rental showing its tail lights and exhausts',
  '/cars/lamborghini-huracan-evo-rental-miami-side-profile.jpg':
    'Side profile of the purple Lamborghini Huracan EVO rental with city towers behind',
  '/cars/lamborghini-huracan-evo-spyder-rental-miami-dashboard.jpg':
    'Dashboard and orange and black seats of the green Lamborghini Huracan EVO Spyder rental',
  '/cars/lamborghini-huracan-evo-spyder-rental-miami-front-quarter.jpg':
    'Green Lamborghini Huracan EVO Spyder rental with the roof down on a rooftop lot beside a large building mural',
  '/cars/lamborghini-huracan-evo-spyder-rental-miami-orange-interior.jpg':
    'Orange and black interior of the Lamborghini Huracan EVO Spyder rental seen from above with the roof down',
  '/cars/lamborghini-huracan-evo-spyder-rental-miami-rear-quarter.jpg':
    'Rear three-quarter view of the green Lamborghini Huracan EVO Spyder rental with the roof down among city buildings',
  '/cars/lamborghini-huracan-evo-spyder-rental-miami-roof-down.jpg':
    'Side view of the green Lamborghini Huracan EVO Spyder rental with the roof down, parked on a city rooftop',
  '/cars/lamborghini-huracan-evo-spyder-rental-miami-seats.jpg':
    'Orange and black sport seats of the Lamborghini Huracan EVO Spyder rental with Huracan EVO stitched into the backrest',
  '/cars/lamborghini-urus-rental-miami-downtown-skyline.jpg':
    'Purple Lamborghini Urus rental by the water with the downtown Miami skyline across the bay',
  '/cars/lamborghini-urus-rental-miami-front-garage.jpg':
    'Purple Lamborghini Urus rental in a parking garage, front three-quarter view with the headlights on',
  '/cars/lamborghini-urus-rental-miami-rooftop-rear.jpg':
    'Purple Lamborghini Urus rental on an open rooftop with the downtown Miami skyline in the distance',
  '/cars/lamborghini-urus-rental-miami-front-skyline.jpg':
    'Head-on view of the purple Lamborghini Urus rental on cobblestones with downtown Miami towers behind',
  '/cars/lamborghini-urus-rental-miami-rear-palms.jpg':
    'Rear view of the purple Lamborghini Urus rental on a cobblestone street lined with palm trees',
  '/cars/mercedes-amg-g63-rental-miami-cockpit.jpg':
    'Cockpit of the Mercedes-AMG G63 rental: AMG steering wheel, widescreen digital display and center console',
  '/cars/mercedes-amg-g63-rental-miami-dashboard.jpg':
    'Dashboard of the Mercedes-AMG G63 rental seen from the rear seat, with red leather front seats',
  '/cars/mercedes-amg-g63-rental-miami-door-detail.jpg':
    "Open driver's door of the Mercedes-AMG G63 rental showing red quilted leather trim, with a city skyline across the water",
  '/cars/mercedes-amg-g63-rental-miami-front-quarter.jpg':
    'Matte gray Mercedes-AMG G63 rental parked in front of a concrete grandstand, front three-quarter view',
  '/cars/mercedes-amg-g63-rental-miami-interior.jpg':
    'Red leather and carbon interior of the Mercedes-AMG G63 rental with the AMG steering wheel and digital display',
  '/cars/mercedes-amg-g63-rental-miami-rear-quarter.jpg':
    'Rear three-quarter view of the gray Mercedes-AMG G63 rental with its spare wheel, in front of a concrete grandstand',
  '/cars/mercedes-amg-g63-rental-miami-red-interior.jpg':
    'Red quilted leather front seats of the Mercedes-AMG G63 rental',
  '/cars/mercedes-maybach-gls-600-rental-miami-gls-600-badge.jpg':
    'GLS 600 badge beside the tail light of the black Mercedes-Maybach GLS 600 rental',
  '/cars/mercedes-maybach-gls-600-rental-miami-maybach-badge.jpg':
    'Maybach script above the tail light of the black Mercedes-Maybach GLS 600 rental',
  '/cars/mercedes-maybach-gls-600-rental-miami-rear-cabin-tray-tables.jpg':
    'Rear cabin of the Mercedes-Maybach GLS 600 rental with fold-out tray tables and the dashboard beyond',
  '/cars/mercedes-maybach-gls-600-rental-miami-rear-executive-seats.jpg':
    'Rear executive seats of the Mercedes-Maybach GLS 600 rental with tray tables and center console',
  '/cars/mercedes-maybach-gls-600-rental-miami-rear-quarter.jpg':
    'Black Mercedes-Maybach GLS 600 rental from a low rear three-quarter angle, palms and clouds behind',
  '/cars/mercedes-maybach-gls-600-rental-miami-side-skyline.jpg':
    'Black Mercedes-Maybach GLS 600 rental in side profile on pavers with the downtown Miami skyline across the water',
  '/cars/mercedes-maybach-gls-600-rental-miami-wheel.jpg':
    'Multi-spoke Maybach wheel on the black Mercedes-Maybach GLS 600 rental',
  '/cars/mercedes-maybach-s580-rental-miami-front-quarter.jpg':
    'Two-tone white and black Mercedes-Maybach S580 rental in front of a concrete grandstand, front three-quarter view',
  '/cars/mercedes-maybach-s580-rental-miami-front-seats.jpg':
    'Cream quilted leather front seats of the Mercedes-Maybach S580 rental with ambient lighting',
  '/cars/mercedes-maybach-s580-rental-miami-panoramic-roof.jpg':
    'Panoramic glass roof of the Mercedes-Maybach S580 rental seen from the rear seat',
  '/cars/mercedes-maybach-s580-rental-miami-rear-console.jpg':
    'Rear center console of the Mercedes-Maybach S580 rental between cream leather executive seats',
  '/cars/mercedes-maybach-s580-rental-miami-rear-quarter.jpg':
    'Rear three-quarter view of the two-tone Mercedes-Maybach S580 rental in front of a concrete grandstand',
  '/cars/mercedes-maybach-s580-rental-miami-rear-screens.jpg':
    'Rear-seat screens and cream leather cabin of the Mercedes-Maybach S580 rental',
  '/cars/mercedes-s580-rental-miami-dashboard.jpg':
    'Dashboard of the Mercedes-Benz S580 rental: steering wheel, digital cluster and portrait touchscreen, with palms and water ahead',
  '/cars/mercedes-s580-rental-miami-door-panel.jpg':
    'Black quilted door panel and seat controls in the Mercedes-Benz S580 rental',
  '/cars/mercedes-s580-rental-miami-drivers-seat.jpg':
    "Driver's seat and dashboard of the black Mercedes-Benz S580 rental seen through the open door",
  '/cars/mercedes-s580-rental-miami-front-quarter.jpg':
    'Black Mercedes-Benz S580 rental on a waterfront paver lot, front three-quarter view',
  '/cars/mercedes-s580-rental-miami-front-seats.jpg':
    'Black quilted leather seats of the Mercedes-Benz S580 rental seen through the open rear door',
  '/cars/mercedes-s580-rental-miami-front.jpg':
    'Head-on view of the black Mercedes-Benz S580 rental on pavers with the water behind',
  '/cars/mercedes-s580-rental-miami-interior.jpg':
    'Black and white quilted leather interior of the Mercedes-Benz S580 rental, looking forward from the rear seat',
  '/cars/mercedes-s580-rental-miami-rear-cabin.jpg':
    'Black quilted rear seats of the Mercedes-Benz S580 rental with pillow headrests and fold-down armrest',
  '/cars/mercedes-s580-rental-miami-rear-seats.jpg':
    'Rear seat of the Mercedes-Benz S580 rental in black quilted leather',
  '/cars/mercedes-s580-rental-miami-rear.jpg':
    'Rear of the black Mercedes-Benz S580 rental parked by the water',
  '/cars/mercedes-s580-rental-miami-side-palms.jpg':
    'Side profile of the black Mercedes-Benz S580 rental between two palm trees on a waterfront lot',
  '/cars/mercedes-s580-rental-miami-side-profile.jpg':
    'Black Mercedes-Benz S580 rental in side profile on pavers beside the water',
  '/cars/mercedes-s580-rental-miami-wheel.jpg':
    'Multi-spoke wheel on the black Mercedes-Benz S580 rental',
  '/cars/rolls-royce-cullinan-rental-miami-coach-door-open.jpg':
    'Black Rolls-Royce Cullinan rental with its rear coach door open to an orange leather interior, the downtown Miami skyline behind at sunset',
  '/cars/rolls-royce-cullinan-rental-miami-dashboard.jpg':
    'Dashboard and steering wheel of the Rolls-Royce Cullinan rental with orange leather trim',
  '/cars/rolls-royce-cullinan-rental-miami-front-quarter.jpg':
    'Black Rolls-Royce Cullinan rental at sunset with the downtown Miami skyline behind',
  '/cars/rolls-royce-cullinan-rental-miami-front-seats.jpg':
    'Orange leather front seats of the Rolls-Royce Cullinan rental seen through the open door',
  '/cars/rolls-royce-cullinan-rental-miami-interior.jpg':
    'Orange leather cabin of the Rolls-Royce Cullinan rental, looking forward from the rear seats under the starlight headliner',
  '/cars/rolls-royce-cullinan-rental-miami-orange-interior.jpg':
    'Black Rolls-Royce Cullinan rental with both doors open, showing the orange leather front and rear seats',
  '/cars/rolls-royce-cullinan-rental-miami-rear-quarter.jpg':
    'Rear three-quarter view of the black Rolls-Royce Cullinan rental at sunset with the downtown Miami skyline behind',
  '/cars/rolls-royce-cullinan-rental-miami-rear-screen.jpg':
    'Rear-seat screen set into the orange leather seatback of the Rolls-Royce Cullinan rental',
  '/cars/rolls-royce-cullinan-rental-miami-side-profile.jpg':
    'Black Rolls-Royce Cullinan rental in side profile with the downtown Miami skyline at sunset',
  '/cars/rolls-royce-cullinan-rental-miami-starlight-headliner.jpg':
    'Starlight headliner above the orange leather seats of the Rolls-Royce Cullinan rental',

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

  // --- Maybach landing-page hero (viewed before writing) --------------------
  // The skyline across the water is named because it is plainly in frame; the
  // district is not, since downtown and Brickell are not separable from here.
  '/cars/mercedes-maybach-gls-600-rental-miami-side-palms.jpg':
    'Black Mercedes-Maybach GLS 600 rental in side profile on a cobblestone promenade, wind-bent palms and the downtown Miami skyline across the water behind',

  '/gallery/mercedes-maybach-gls-600-lamborghini-urus-rental-miami-metromover.jpg':
    'Mercedes-Maybach GLS 600 and Lamborghini Urus rentals parked side by side in downtown Miami, Metromover track overhead',
  '/gallery/lamborghini-urus-rental-miami-brickell-cobblestones.jpg':
    'Purple Lamborghini Urus rental on a cobblestone waterfront with the Brickell skyline behind, Miami',
  '/gallery/lamborghini-urus-rental-miami-biscayne-bay-head-on.jpg':
    'Lamborghini Urus rental seen head-on across Biscayne Bay from the Brickell skyline, Miami',
  '/gallery/lamborghini-urus-rental-miami-brickell-side-profile.jpg':
    'Side profile of the Lamborghini Urus rental on a cobblestone promenade opposite the Brickell skyline, Miami',
  '/gallery/lamborghini-urus-rental-miami-bayfront-rear-quarter.jpg':
    'Rear three-quarter view of the Lamborghini Urus rental on a Miami bayfront promenade, condo towers across the water',
  '/gallery/lamborghini-urus-rental-miami-sunset-waterfront.jpg':
    'Lamborghini Urus rental from behind at sunset on a palm-lined Miami waterfront drive',
  '/gallery/lamborghini-urus-rental-miami-badge-grille.jpg':
    'Close-up of the Lamborghini badge and front grille on the purple Lamborghini Urus rental',
  '/gallery/lamborghini-urus-rental-miami-low-front.jpg':
    'Low front view of the purple Lamborghini Urus rental on cobblestones under a bright Miami sky',
  '/gallery/lamborghini-urus-rental-miami-quilted-interior.jpg':
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

/** "Mercedes-Benz S580" for S580; leaves "Lamborghini Urus" alone. */
export const carFullName = (c) => (c.name.startsWith(c.make) ? c.name : `${c.make} ${c.name}`);

export default ALT;
