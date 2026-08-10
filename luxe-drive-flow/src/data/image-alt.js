// Alt text for the gallery photographs, keyed by image source.
//
// Written from the actual photos, not from filenames — each entry names the
// vehicle and describes the real setting, with a Miami location term only where
// the photo actually shows one.
//
// Scope note: this currently covers /gallery only. The car-page photos were
// replaced wholesale (new /cars/*.jpg sets for the Urus, Maybach, S580, SF90 and
// Huracan EVO) and have not been reviewed yet, so they keep their existing alt
// rather than getting guessed-at descriptions here.

const ALT = {
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
};

// Strip ImageKit transforms / cache-busting params so callers may pass either
// the raw source or a transformed one.
const key = (src) => (typeof src === 'string' ? src.split('?')[0] : '');

export const altFor = (src, fallback = '') => ALT[key(src)] ?? fallback;

export default ALT;
