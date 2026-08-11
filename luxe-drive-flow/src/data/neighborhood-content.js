// Per-neighbourhood content for the two location landing pages.
//
// These pages carry the highest fabrication risk on the site, because the
// obvious way to write them is to invent operator experience — named hotels,
// delivery times, handoff routines, "our clients always". None of that is
// knowable from this repo, so none of it is written here.
//
// What the copy is allowed to draw on:
//   - verifiable public geography of the neighbourhood
//   - service-area claims the site already makes
//   - the public Miami event calendar, as demand context only
//   - car-fit reasoning derived from real vehicle attributes in fleet.js
//     and car-content.js (clearance, width, length, turning circle)
//
// Everything is framed as a service offer — "we deliver to" — never as
// history: "we regularly deliver to" would be a claim about past bookings
// that nobody here can substantiate.
//
// `deliveryLogistics` is the owner's field. It is the right place for the
// things only they know: which garages are awkward, where the handoff
// actually happens, what a given building requires. It renders nothing while
// empty, exactly like the car-page owner fields.

export const neighborhoodContent = {
  brickell: {
    deliveryLogistics: '',
  },
  'south-beach': {
    deliveryLogistics: '',
  },
};

export const neighborhoodFor = (key) => neighborhoodContent[key] ?? null;

export default neighborhoodContent;
