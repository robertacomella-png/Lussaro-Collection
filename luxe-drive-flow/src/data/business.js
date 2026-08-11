// Single source of truth for business identity — name, address, contact, hours.
//
// Everything that states who or where the business is reads from here: the
// footer NAP block, the Organization/LocalBusiness JSON-LD in SchemaOrg.astro,
// and every tel:/WhatsApp link on the site. The point is that the visible NAP
// and the structured data cannot drift apart, because there is only one copy.
//
// If any of this changes, change it here and nowhere else — and keep it matching
// the Google Business Profile exactly, since NAP consistency is what ties the
// site to the GBP listing.

export const business = {
  legalName: 'Lussaro Collection LLC',
  brandName: 'Lussaro Collection',

  // Address
  street: '900 Biscayne Blvd',
  city: 'Miami',
  region: 'FL',
  postalCode: '33132',
  country: 'US',

  // Phone. `phone` is the E.164 form for tel:/wa.me links; the display forms are
  // for visible copy. `phoneDisplayShort` exists because the CTA buttons render
  // "Call (645) 248-7305" and prefixing +1 there would change button widths.
  phone: '+16452487305',
  phoneDisplay: '+1 (645) 248-7305',
  phoneDisplayShort: '(645) 248-7305',

  // No business mailbox yet — info@lussarocollection.com is not set up, so the
  // site publishes no email rather than a bouncing address. To add it later,
  // set this string: the footer NAP and the JSON-LD both pick it up
  // automatically, and neither renders anything while it is null.
  email: null,

  // Mon–Sun 09:00–22:00, stated per day so the schema can group them and the
  // footer can summarise. Matches the Google Business Profile.
  hours: [
    { day: 'Monday', opens: '09:00', closes: '22:00' },
    { day: 'Tuesday', opens: '09:00', closes: '22:00' },
    { day: 'Wednesday', opens: '09:00', closes: '22:00' },
    { day: 'Thursday', opens: '09:00', closes: '22:00' },
    { day: 'Friday', opens: '09:00', closes: '22:00' },
    { day: 'Saturday', opens: '09:00', closes: '22:00' },
    { day: 'Sunday', opens: '09:00', closes: '22:00' },
  ],

  whatsapp: 'https://wa.me/16452487305',
  instagram: 'https://instagram.com/lussarocollection',
  googleMaps: 'https://maps.app.goo.gl/9nEuwbuyZzhGTQscA',
  googleReviewLink: 'https://share.google/uKrh3moHgWOoEmRA',
};

// --- derived helpers, so consumers don't re-implement formatting -------------

export const telHref = `tel:${business.phone}`;
export const mailHref = business.email ? `mailto:${business.email}` : null;

/** "900 Biscayne Blvd, Miami, FL 33132" */
export const addressLine = `${business.street}, ${business.city}, ${business.region} ${business.postalCode}`;

/**
 * The address as a schema.org PostalAddress. Both JSON-LD nodes that carry an
 * address (#org and #business) import this rather than restating the fields, so
 * the two can never disagree.
 */
export const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: business.street,
  addressLocality: business.city,
  addressRegion: business.region,
  postalCode: business.postalCode,
  addressCountry: business.country,
};

/** "Mon–Sun 09:00–22:00" when every day is identical, else a per-day list. */
export const hoursSummary = (() => {
  const { opens, closes } = business.hours[0];
  const uniform = business.hours.every((h) => h.opens === opens && h.closes === closes);
  return uniform
    ? `Mon–Sun ${opens}–${closes}`
    : business.hours.map((h) => `${h.day.slice(0, 3)} ${h.opens}–${h.closes}`).join(', ');
})();

/** WhatsApp deep link with an optional prefilled message. */
export const whatsappWith = (message) =>
  message ? `${business.whatsapp}?text=${encodeURIComponent(message)}` : business.whatsapp;

export default business;
