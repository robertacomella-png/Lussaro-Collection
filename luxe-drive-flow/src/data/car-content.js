// Per-car editorial content, keyed by slug.
//
// `useCases` and `goodToKnow` are reasoned from each car's own attributes in
// fleet.js and from public, model-level fact. Every factual claim here was put
// through an independent research pass and then an adversarial fact-check
// before being written; anything the check could not confirm was dropped.
//
// Rules this file follows, deliberately:
//   - Guidance, never invented customer history. No "our clients love", no
//     claims about how often a car books.
//   - Seat counts are NOT asserted for cars sold in both 4- and 5-seat rear
//     layouts (the Urus, GLS 600, S580 and Cullinan all are). Those pages say
//     what is certain and leave the rest to the owner.
//
// `realMoment`, `operatorNotes` and `deliveryNotes` are for the owner. They are
// the only place first-hand experience belongs, because only the owner has it.
// Each renders nothing while empty, so a blank field costs nothing.
//
// NOTE: src/data/reviews.js still does not exist. Once real Google reviews are
// in, any that name a car may be quoted here with attribution — that is the
// only customer voice permitted on these pages.

export const carContent = {
  'lamborghini-urus': {
    useCases: `The Urus is the one to take when you want the Lamborghini without giving anything up. It is an SUV, so the hotel ramps and speed bumps that make a low supercar a liability are simply not the problem they would otherwise be, and the boot swallows several large cases — around 616 litres behind the rear seats. That covers the airport run, the group heading out to dinner, and the week where you only want to hire one car. Underneath it is still a twin-turbo V8 driving all four wheels, so none of that practicality costs you the drama.`,
    goodToKnow: [
      'Adaptive air suspension with adjustable ride height — worth raising for steep driveways and ramps, since at its lowest setting ground clearance is only about 6.2 inches.',
      'The boot is genuinely usable: around 616 litres behind the rear seats and roughly 1,596 with them folded. If the car has the optional four-seat rear layout, that drops to about 574.',
      'Pure petrol twin-turbo V8 — no hybrid system and no electric-only mode. It takes premium fuel and returns mid-teens mpg.',
      'All-wheel drive on every Urus ever built; there has never been a rear-drive version.',
      'It is wide: about 79 inches across the body and nearly 86 with the mirrors out, so older Miami garages and narrow valet lanes need care.',
      'The rear seat varies by car — the standard layout is a three-place folding bench, but a four-seat version with two individual rear seats was a factory option.',
      'Drive modes sit on the centre tunnel: Strada for normal roads, Sport and Corsa for a sharper throttle and exhaust, Neve for low grip.',
    ],
    faqQuestion: 'Will the Lamborghini Urus fit in a tight Miami garage?',
    faqAnswer:
      'Usually, but measure first. The Urus is about 79 inches across the body and close to 86 with the mirrors folded out, which is wide enough to make older Miami parking structures, narrow gates and valet lanes tight. Folding the mirrors buys you most of that difference on the way in.',
    siblings: ['huracan-evo', 'mercedes-maybach-gls-600'],
    category: { href: '/luxury-suv-rental-miami', label: 'Luxury SUV rental in Miami' },
    realMoment: '',
    operatorNotes: '',
    deliveryNotes: '',
  },

  'mercedes-s580': {
    useCases: `The S580 is the quiet one, and that is precisely its job. It is the most affordable car we run at $445 a day, and the one to take when the occasion rewards arriving well rather than arriving loudly — a client meeting in Brickell, a wedding where you are not the couple, an airport run where a calm cabin beats a loud exhaust. The 4.0-litre V8 and air suspension mean it is quick and unruffled rather than theatrical. If you want the car to make an impression without making a scene, this is it.`,
    goodToKnow: [
      'Standard AIRMATIC air suspension with adjustable ride height — the smoothest car in the fleet over Miami road joints.',
      'The V8 has 48-volt mild-hybrid assist, which never needs charging and cannot drive on electricity alone.',
      'US cars are long-wheelbase only, at roughly 208 inches — plan for that in tight garages and parallel spots.',
      'The boot is about 12.9 cubic feet, which is modest for a car this size. Fine for luggage, tighter than the exterior suggests.',
      'Premium unleaded only, 91 octane or higher.',
    ],
    faqQuestion: 'Does the Mercedes-Benz S580 need charging?',
    faqAnswer:
      'No. It is a 48-volt mild hybrid, not a plug-in. The electrical system assists the 4.0-litre V8 and recovers energy under braking, but it never runs on electricity alone and there is nothing to plug in. Fill it with premium unleaded, 91 octane or higher, and treat it exactly like any petrol car.',
    siblings: ['mercedes-maybach-gls-600', 'rolls-royce-cullinan'],
    category: { href: '/exotic-car-rental-miami', label: 'Exotic car rental in Miami' },
    realMoment: '',
    operatorNotes: '',
    deliveryNotes: '',
  },

  'mercedes-maybach-gls-600': {
    useCases: `The Maybach GLS 600 is the one to book when the passengers matter more than the driver. The back is the point: two reclining executive seats with powered leg and foot rests, and running boards that slide out as the door opens so nobody has to climb. That makes it the right call for airport collections, moving a client or a family in genuine comfort, or an evening where somebody else takes the wheel. It is a two-row car, so treat it as a four-seater with an exceptional back seat rather than a people carrier.`,
    goodToKnow: [
      'Two rows only — unlike the standard GLS there is no third row, so plan for four or five people, never seven.',
      'The rear executive seats recline with powered leg and foot rests.',
      'Power running boards extend automatically when a door opens, which makes getting in and out easy in a dress or a suit.',
      'The boot is modest for the size — around 18 cubic feet — and the rear seats do not fold, so bulky loads are out.',
      'Big footprint: roughly 205 inches long, 72 inches tall, over 6,000 lb, with about a 41-foot turning circle.',
      'Premium fuel, and thirsty with it — EPA rates it around 15 mpg city and 20 highway.',
    ],
    faqQuestion: 'How many people can the Maybach GLS 600 carry?',
    faqAnswer:
      'Four in comfort. Unlike the standard GLS there is no third row, so this is a two-row car built around its back seat rather than a seven-seater. The rear executive chairs recline with powered leg rests. Tell us your party size and we will confirm the exact rear layout of the car before you book.',
    siblings: ['rolls-royce-cullinan', 'mercedes-s580'],
    category: { href: '/luxury-suv-rental-miami', label: 'Luxury SUV rental in Miami' },
    realMoment: '',
    operatorNotes: '',
    deliveryNotes: '',
  },

  'sf90': {
    useCases: `The SF90 is the fastest thing we run and the most single-minded. Two seats, a fixed roof, and a plug-in hybrid V8 making 986 hp — it is built for the drive itself, for arriving somewhere that deserves it, and for being photographed. It is not built for luggage or passengers. Book it for an evening, a shoot, or a day where the car is the occasion, and book something else for the airport run. The eDrive mode also lets you leave silently, which is worth more in a residential street than it sounds.`,
    goodToKnow: [
      'Plug-in hybrid with a silent electric-only eDrive mode — roughly 16 miles of EV range, usable up to about 84 mph.',
      'You never have to charge it. The V8 replenishes the battery as you drive; plugging in is optional.',
      'Very low at the front. Take steep driveways, ramps and speed bumps slowly and at an angle.',
      'Storage is a front compartment of about 74 litres and nothing else — pack soft bags, and do not count on a hard suitcase fitting.',
      'Fixed-roof coupe. The open-top car is the separate SF90 Spider.',
      'Top speed 211 mph, with 0–124 mph in 6.7 seconds.',
    ],
    faqQuestion: 'Do I need to charge the Ferrari SF90?',
    faqAnswer:
      'No. It is a plug-in hybrid, but the V8 recharges the battery as you drive, so plugging in is entirely optional. What the battery gives you is eDrive: a silent electric-only mode good for around 16 miles, which is useful for leaving a hotel or a residential street without waking anyone.',
    siblings: ['huracan-evo', 'lamborghini-urus'],
    category: { href: '/exotic-car-rental-miami', label: 'Exotic car rental in Miami' },
    realMoment: '',
    operatorNotes: '',
    deliveryNotes: '',
  },

  'huracan-evo': {
    useCases: `The Huracan EVO is the pure one — a naturally aspirated V10 with no hybrid assistance and no quiet mode, which is exactly the point of it. Two seats, a small front boot, and a noise from cold start that carries down the block. That makes it right for an evening out, a photo or video shoot, or a weekend where the drive is the plan. It is the wrong car for luggage or a group. If you want the same theatre with room for people and cases, look at the Urus.`,
    goodToKnow: [
      'Strictly two seats — driver plus one passenger is the hard maximum, with no rear bench.',
      'Luggage goes in a small front trunk and nowhere else. Plan on about one carry-on plus a soft bag.',
      'Very low front splitter. Take steep driveways, ramps and speed bumps slowly and at an angle; a nose lift is an option on these cars, not standard.',
      'Conventional front-hinged doors — the scissor doors people expect are on the Aventador and Revuelto, not the Huracan.',
      'Naturally aspirated V10 with no hybrid system and no electric mode, so there is no such thing as a silent departure.',
    ],
    faqQuestion: 'Can I take luggage in the Lamborghini Huracan EVO?',
    faqAnswer:
      'Only a little. There is a small front trunk and no rear cargo area at all, so plan on roughly one carry-on plus a soft bag between two people. If you are heading straight from the airport with full-size cases, book the Urus and we will deliver the Huracan to you afterwards instead.',
    siblings: ['sf90', 'lamborghini-urus'],
    category: { href: '/lamborghini-rental-miami', label: 'Lamborghini rental in Miami' },
    realMoment: '',
    operatorNotes: '',
    deliveryNotes: '',
  },

  'rolls-royce-cullinan': {
    useCases: `The Cullinan is the one for arrivals that are the event — weddings, anniversaries, the dinner you want remembered. Rear-hinged coach doors open backwards so you step out facing forward rather than clambering, and all four doors close at the touch of a button. Underneath sits a 6.75-litre twin-turbo V12 that is quieter at speed than most cars are parked. It also happens to be practical, with about 21 cubic feet behind the rear seats, though the boot is not the reason to choose it.`,
    goodToKnow: [
      'The rear doors are rear-hinged coach doors, and all four close powered at the touch of a button.',
      'A two-piece powered tailgate — Rolls-Royce calls it The Clasp — with roughly 21 cubic feet behind the rear seats.',
      'Four-wheel steering is standard, which helps, but it is still very large: about 17.5 feet long and around 85 inches wide including mirrors.',
      'An umbrella stows inside the door and is dried by built-in blowers when you put it back.',
      'Premium fuel only, and EPA-rated at about 12 mpg city and 20 highway.',
    ],
    faqQuestion: 'How do the Rolls-Royce Cullinan coach doors work?',
    faqAnswer:
      'The rear doors are hinged at the back, so they open away from you and you step out facing forward instead of twisting. All four doors then close under power at the touch of a button, so nobody has to reach out and pull. It is the detail that makes an arrival feel considered.',
    siblings: ['mercedes-maybach-gls-600', 'mercedes-s580'],
    category: { href: '/rolls-royce-rental-miami', label: 'Rolls-Royce rental in Miami' },
    realMoment: '',
    operatorNotes: '',
    deliveryNotes: '',
  },
};

export const contentFor = (slug) => carContent[slug] ?? null;

export default carContent;
