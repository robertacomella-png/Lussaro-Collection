// BreadcrumbList JSON-LD, built once from the current route.
//
// Layout.astro calls this for every page, so no page carries its own copy of
// the markup. Car pages pass their vehicle name through Layout's
// `breadcrumbName` prop, since that value lives in fleet.js rather than in the
// route; every other trail is derived from the pathname alone.

const SITE = 'https://www.lussarocollection.com';

// Labels are keyed by route. Title-casing the slug automatically would get most
// of these right but mangle the ones carrying hyphenated brand names or an
// acronym ("G Wagon", "Rolls Royce", "Suv"), so they are stated explicitly.
const LABELS = {
  '/about': 'About',
  '/contact': 'Contact',
  '/pricing': 'Pricing & Policies',
  '/gallery': 'Gallery',
  '/chauffeur-service-miami': 'Chauffeur Service Miami',
  '/exotic-car-rental-miami': 'Exotic Car Rental Miami',
  '/lamborghini-rental-miami': 'Lamborghini Rental Miami',
  '/g-wagon-rental-miami': 'G-Wagon Rental Miami',
  '/luxury-suv-rental-miami': 'Luxury SUV Rental Miami',
  '/rolls-royce-rental-miami': 'Rolls-Royce Rental Miami',
  '/exotic-car-rental-brickell': 'Exotic Car Rental Brickell',
  '/exotic-car-rental-south-beach': 'Exotic Car Rental South Beach',
};

// The site standardizes breadcrumb item URLs on the no-trailing-slash form.
// `build.format: 'directory'` hands us "/fleet/", so strip it; the `(.)` guard
// keeps the homepage as "/".
export const normalizePath = (pathname) => pathname.replace(/(.)\/$/, '$1');

const url = (path) => `${SITE}${path === '/' ? '/' : path}`;

const HOME = { name: 'Home', path: '/' };
const FLEET = { name: 'Fleet', path: '/fleet' };

/**
 * Returns a BreadcrumbList for the given route, or null for routes that should
 * not carry one (the homepage itself, /fleet, /terms, /privacy, /404).
 *
 * @param {string} pathname  Astro.url.pathname
 * @param {string} [leafName] final crumb label, for routes whose name is not
 *                            derivable from the path (i.e. car pages)
 */
export const breadcrumbFor = (pathname, leafName) => {
  const path = normalizePath(pathname);

  let trail;
  if (path.startsWith('/cars/')) {
    // Home > Fleet > <car>. Without a name from fleet.js we cannot label the
    // leaf honestly, so emit nothing rather than guess from the slug.
    if (!leafName) return null;
    trail = [HOME, FLEET, { name: leafName, path }];
  } else if (LABELS[path]) {
    trail = [HOME, { name: LABELS[path], path }];
  } else {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: url(crumb.path),
    })),
  };
};
