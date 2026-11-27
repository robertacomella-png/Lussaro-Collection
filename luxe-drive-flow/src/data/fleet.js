// dashboardId = the "Website ID" shown on each vehicle card in the Rental
// Dashboard (Fleet). Paste it here to link a car → enables real availability
// + proper booking records. Leave "" to keep a car unlinked for now (it still
// works: bookings come through by car name, just without availability blocking).
export const fleet = [
  {
    id: 1,
    name: "Lamborghini Urus",
    dashboardId: "",
    make: "Lamborghini",
    year: 2019,
    // One rate, one allowance (owner's call, Oct 2026). The reduced 50-mile
    // tier is withdrawn, so there is no `mileageUpgrade` and `miles` is 100 —
    // those two always move together, or the page quotes a rate against an
    // allowance it does not buy. No sale price: the
    // $995 rate is permanent (owner, 23 Nov 2026), so no strike-through or OFF badge.
    price: 995,
    power: 641,
    miles: 100,
    // Owner-confirmed per car. `seatsNote` is the layout qualifier where the
    // count alone would overstate it (a 4+1 bench is not four equal seats);
    // the spec card renders it small under the number, and omits it when absent.
    seats: 5,
    doors: 4,
    drivetrain: 'All-wheel drive · 4.0L twin-turbo V8',
    zeroToSixty: "3.3s",
    description:
      "The Lamborghini Urus is pure Miami energy—fast, bold, and built to dominate the streets. With supercar performance in an SUV, it delivers explosive power and head-turning style wherever you go. From South Beach to Brickell, this is how you stand out and own the road.",

    images: [
      "/cars/lamborghini-urus-rental-miami-front-quarter.jpg",
      "/cars/lamborghini-urus-rental-miami-front-garage.jpg",
      "/cars/lamborghini-urus-rental-miami-rooftop-rear.jpg",
      "/cars/lamborghini-urus-rental-miami-downtown-skyline.jpg",
      "/cars/lamborghini-urus-rental-miami-front-skyline.jpg",
      "/cars/lamborghini-urus-rental-miami-rear-palms.jpg",
    ],
  },
  {
    id: 2,
    name: "GLS 600 Maybach",
    dashboardId: "71d29a72-b904-4318-80e5-0c133d2cb665",
    make: "Mercedes-Benz",
    year: 2023,
    price: 895,
    // Daily policy we can sell a renter who has no qualifying coverage of their
    // own. Owner's figures, 20 Oct 2026, for the Maybachs specifically. The
    // band moves with driver age, which is why it is a range and never a single
    // number in copy. references/stats.md records the wider fleet range.
    insurancePerDay: { from: 199, to: 399 },
    power: 550,
    miles: 100,
    seats: 4,
    doors: 4,
    drivetrain: 'All-wheel drive · 4.0L twin-turbo V8',
    zeroToSixty: "4.6s",
    description:
      "The Mercedes-Maybach GLS 600 is Miami luxury at its finest—effortless, bold, and impossible to ignore. Glide through the city in total comfort with a whisper-smooth ride and a handcrafted interior that feels like a private jet on wheels. Whether it’s a night in Brickell or a pull-up in South Beach, this is how you make an entrance.",

    images: [
      "/cars/mercedes-maybach-gls-600-rental-miami-front-quarter.jpg",
      "/cars/mercedes-maybach-gls-600-rental-miami-side-skyline.jpg",
      "/cars/mercedes-maybach-gls-600-rental-miami-rear-executive-seats.jpg",
      "/cars/mercedes-maybach-gls-600-rental-miami-rear-cabin-tray-tables.jpg",
      "/cars/mercedes-maybach-gls-600-rental-miami-side-palms.jpg",
      "/cars/mercedes-maybach-gls-600-rental-miami-rear-quarter.jpg",
      "/cars/mercedes-maybach-gls-600-rental-miami-gls-600-badge.jpg",
      "/cars/mercedes-maybach-gls-600-rental-miami-maybach-badge.jpg",
      "/cars/mercedes-maybach-gls-600-rental-miami-wheel.jpg",
    ],
  },
  {
    id: 8,
    name: "S580",
    dashboardId: "",
    make: "Mercedes-Benz",
    year: 2023,
    price: 445,
    power: 496,
    miles: 100,
    seats: 5,
    seatsNote: '4+1',
    doors: 4,
    drivetrain: 'All-wheel drive · 4.0L twin-turbo V8 with 48-volt mild-hybrid assist',
    zeroToSixty: "4.4s",
    description:
      "The Mercedes-Benz S580 is Miami sophistication at its peak—smooth, commanding, and first-class in every detail. With its whisper-quiet V8 and a cabin built like a five-star suite, every drive feels like arriving somewhere important. From Brickell business to South Beach nights, this is how you show up polished.",

    images: [
      "/cars/mercedes-s580-rental-miami-front-quarter.jpg",
      "/cars/mercedes-s580-rental-miami-side-profile.jpg",
      "/cars/mercedes-s580-rental-miami-front.jpg",
      "/cars/mercedes-s580-rental-miami-side-palms.jpg",
      "/cars/mercedes-s580-rental-miami-rear.jpg",
      "/cars/mercedes-s580-rental-miami-interior.jpg",
      "/cars/mercedes-s580-rental-miami-dashboard.jpg",
      "/cars/mercedes-s580-rental-miami-front-seats.jpg",
      "/cars/mercedes-s580-rental-miami-door-panel.jpg",
      "/cars/mercedes-s580-rental-miami-rear-seats.jpg",
      "/cars/mercedes-s580-rental-miami-rear-cabin.jpg",
      "/cars/mercedes-s580-rental-miami-drivers-seat.jpg",
      "/cars/mercedes-s580-rental-miami-wheel.jpg",
    ],
  },
  {
    id: 10,
    name: "Huracan STO",
    dashboardId: "",
    make: "Lamborghini",
    year: 2023,
    // Regular price, no offer: no wasPrice, so no strike-through or OFF badge.
    // Owner's rate, 15 Nov 2026. The STO was last listed until June 2026 at
    // $1,695 under the same slug (huracan-sto), so its URL comes back as-is.
    price: 1495,
    // Owner's terms for this car only, 15 Nov 2026: a $2,000 deposit and a
    // minimum age of 21, against the fleet's $1,000 and 18 in rental-terms.js.
    // cars.js turns these into the per-car `deposit` and `minimumAge` the car
    // page reads; a car without them gets the fleet defaults.
    deposit: 2000,
    minimumAge: 21,
    // Lamborghini's published figures: 640 CV (631 hp), 0-62 mph in 3.0s.
    // Rear-wheel drive only, like the EVO RWD — not the 631 hp AWD EVO, which
    // shares the horsepower figure but nothing else.
    power: 631,
    miles: 100,
    seats: 2,
    doors: 2,
    drivetrain: 'Rear-wheel drive · 5.2L naturally aspirated V10',
    zeroToSixty: "3.0s",
    description:
      "The Lamborghini Huracán STO is the race car Lamborghini made road legal—631 hp from a naturally aspirated V10, rear-wheel drive, and a roof scoop and fixed rear wing taken straight from the Super Trofeo series. In Miami it is the loudest arrival on Ocean Drive and the one Huracán nobody mistakes for another.",

    // Owner's photos, 15 Nov 2026. Exteriors first, then the cabin. After
    // adding or replacing any, run `npm run optimize:images`.
    images: [
      "/cars/lamborghini-huracan-sto-rental-miami-front-quarter.jpg",
      "/cars/lamborghini-huracan-sto-rental-miami-side-profile.jpg",
      "/cars/lamborghini-huracan-sto-rental-miami-front.jpg",
      "/cars/lamborghini-huracan-sto-rental-miami-rear.jpg",
      "/cars/lamborghini-huracan-sto-rental-miami-steering-wheel.jpg",
      "/cars/lamborghini-huracan-sto-rental-miami-instrument-cluster.jpg",
    ],
  },
  {
    id: 6,
    name: "Cullinan",
    dashboardId: "",
    make: "Rolls-Royce",
    year: 2023,
    price: 1295,
    power: 563,
    miles: 100,
    seats: 5,
    seatsNote: '4+1',
    doors: 4,
    drivetrain: 'All-wheel drive · 6.75L twin-turbo V12',
    zeroToSixty: "4.9s",
    description:
      "The Rolls-Royce Cullinan is the pinnacle of Miami luxury—effortless, commanding, and unmistakably elite. With its whisper-quiet ride and handcrafted interior, every drive feels like a private experience. Whether you’re arriving in South Beach or gliding through the city, this is how you move with true presence.",

    // Real photography at last — this car ran on a placeholder SVG until now.
    // These are 1024px sources rather than the ~2000px the rest of the fleet
    // uses, so optimize-images caps the "1200" variant at 1024 (it runs
    // withoutEnlargement, so nothing is upscaled and nothing looks stretched —
    // just slightly less sharp than the other cars on a high-DPI screen).
    // Re-run the optimizer if larger originals turn up.
    images: [
      "/cars/rolls-royce-cullinan-rental-miami-front-quarter.jpg",
      "/cars/rolls-royce-cullinan-rental-miami-side-profile.jpg",
      "/cars/rolls-royce-cullinan-rental-miami-rear-quarter.jpg",
      "/cars/rolls-royce-cullinan-rental-miami-coach-door-open.jpg",
      "/cars/rolls-royce-cullinan-rental-miami-orange-interior.jpg",
      "/cars/rolls-royce-cullinan-rental-miami-interior.jpg",
      "/cars/rolls-royce-cullinan-rental-miami-starlight-headliner.jpg",
      "/cars/rolls-royce-cullinan-rental-miami-front-seats.jpg",
      "/cars/rolls-royce-cullinan-rental-miami-dashboard.jpg",
      "/cars/rolls-royce-cullinan-rental-miami-rear-screen.jpg",
    ],
  },
  {
    id: 9,
    name: "Huracan EVO Spyder",
    dashboardId: "",
    make: "Lamborghini",
    year: 2023,
    price: 1295,
    // The rear-wheel-drive Spyder, same 602 hp V10 as our coupe. The AWD EVO
    // makes 631 hp and 3.1s — do not mix the two sets of figures. Dropping the
    // roof costs about two tenths against the coupe's 3.3s.
    power: 602,
    miles: 100,
    seats: 2,
    doors: 2,
    drivetrain: 'Rear-wheel drive · 5.2L naturally aspirated V10',
    zeroToSixty: "3.5s",
    description:
      "The Lamborghini Huracán EVO Spyder is Miami with the roof down—open air, a screaming V10, and nothing between you and Ocean Drive. Drop the top in seventeen seconds and the whole city hears you coming. This is the one to book when the drive itself is the plan.",

    images: [
      "/cars/lamborghini-huracan-evo-spyder-rental-miami-front-quarter.jpg",
      "/cars/lamborghini-huracan-evo-spyder-rental-miami-roof-down.jpg",
      "/cars/lamborghini-huracan-evo-spyder-rental-miami-rear-quarter.jpg",
      "/cars/lamborghini-huracan-evo-spyder-rental-miami-orange-interior.jpg",
      "/cars/lamborghini-huracan-evo-spyder-rental-miami-dashboard.jpg",
      "/cars/lamborghini-huracan-evo-spyder-rental-miami-seats.jpg",
    ],
  },
  {
    id: 5,
    name: "G63",
    dashboardId: "",
    make: "Mercedes-Benz",
    year: 2023,
    price: 795,
    power: 577,
    miles: 100,
    seats: 5,
    doors: 4,
    drivetrain: 'All-wheel drive · 4.0L twin-turbo V8',
    // Mercedes' own figure for the 577 hp G 63. The entry this restores said
    // 4.2s, which is a road-test number rather than the published one.
    zeroToSixty: "4.5s",
    description:
      "The Mercedes-AMG G63 is pure Miami presence—bold, powerful, and impossible to ignore. With its iconic design and roaring twin-turbo V8, it delivers luxury and performance in one statement package. Whether you’re cruising South Beach or pulling up anywhere in the city, this is how you stand out without trying.",

    images: [
      "/cars/mercedes-amg-g63-rental-miami-front-quarter.jpg",
      "/cars/mercedes-amg-g63-rental-miami-rear-quarter.jpg",
      "/cars/mercedes-amg-g63-rental-miami-dashboard.jpg",
      "/cars/mercedes-amg-g63-rental-miami-red-interior.jpg",
      "/cars/mercedes-amg-g63-rental-miami-cockpit.jpg",
      "/cars/mercedes-amg-g63-rental-miami-interior.jpg",
      "/cars/mercedes-amg-g63-rental-miami-door-detail.jpg",
    ],
  },
  {
    id: 7,
    name: "SF90",
    dashboardId: "",
    make: "Ferrari",
    year: 2023,
    price: 2495,
    power: 986,
    miles: 100,
    seats: 2,
    doors: 2,
    drivetrain: 'All-wheel-drive plug-in hybrid · 4.0L twin-turbo V8 with three electric motors',
    zeroToSixty: "2.5s",
    description:
      "The Ferrari SF90 is Miami’s ultimate statement—nearly 1,000 hybrid horsepower, scissor-fast acceleration, and presence that stops the street. From Ocean Drive to Brickell, this is the supercar that turns every arrival into an event.",

    images: [
      "/cars/ferrari-sf90-rental-miami-front-quarter.jpg",
      "/cars/ferrari-sf90-rental-miami-front-angle.jpg",
      "/cars/ferrari-sf90-rental-miami-side-profile.jpg",
      "/cars/ferrari-sf90-rental-miami-front-high.jpg",
      "/cars/ferrari-sf90-rental-miami-dashboard.jpg",
      "/cars/ferrari-sf90-rental-miami-red-interior.jpg",
      "/cars/ferrari-sf90-rental-miami-rear-quarter.jpg",
      "/cars/ferrari-sf90-rental-miami-front.jpg",
      "/cars/ferrari-sf90-rental-miami-arrival.jpg",
    ],
  },
  {
    id: 3,
    name: "Huracan EVO",
    dashboardId: "",
    make: "Lamborghini",
    year: 2023,
    price: 1195,
    // Owner-confirmed as the rear-wheel-drive EVO, not the AWD car: 602 hp and
    // 3.3s to 60. The 650 hp / 3.2s previously listed here matched no Huracán
    // EVO variant Lamborghini ever sold.
    power: 602,
    miles: 100,
    seats: 2,
    doors: 2,
    drivetrain: 'Rear-wheel drive · 5.2L naturally aspirated V10',
    zeroToSixty: "3.3s",
    description:
      "The Lamborghini Huracán EVO is built for Miami—loud, fast, and impossible to miss. With its screaming V10 and razor-sharp handling, it delivers pure adrenaline every time you hit the gas. Whether you’re cruising Ocean Drive or making a statement in Brickell, this is how you turn every head in the city.",

    images: [
      "/cars/lamborghini-huracan-evo-rental-miami-front-quarter.jpg",
      "/cars/lamborghini-huracan-evo-rental-miami-front.jpg",
      "/cars/lamborghini-huracan-evo-rental-miami-side-profile.jpg",
      "/cars/lamborghini-huracan-evo-rental-miami-rear.jpg",
      "/cars/lamborghini-huracan-evo-rental-miami-dashboard.jpg",
      "/cars/lamborghini-huracan-evo-rental-miami-interior.jpg",
      "/cars/lamborghini-huracan-evo-rental-miami-downtown-skyline.jpg",
    ],
  },
  {
    id: 4,
    // NOT the S580 above. That is the standard Mercedes-Benz S-Class at $399;
    // this is the Mercedes-Maybach S580 — longer wheelbase, four seats, and its
    // own slug (mercedes-maybach-s580, set in cars.js). Keep the two distinct
    // in copy as well as in data, or the pages start cannibalising each other.
    name: "S580 Maybach",
    dashboardId: "",
    make: "Mercedes-Benz",
    year: 2023,
    price: 895,
    // Daily policy we can sell a renter who has no qualifying coverage of their
    // own. Owner's figures, 20 Oct 2026, for the Maybachs specifically. The
    // band moves with driver age, which is why it is a range and never a single
    // number in copy. references/stats.md records the wider fleet range.
    insurancePerDay: { from: 199, to: 399 },
    power: 496,
    miles: 100,
    // Four, not five. The rear is a pair of executive seats either side of a
    // fixed console, so a middle rear seat does not exist on this car.
    seats: 4,
    doors: 4,
    drivetrain: 'All-wheel drive · 4.0L twin-turbo V8 with 48-volt mild-hybrid assist',
    // Mercedes' figure for the Maybach S 580 4MATIC. The standard S580 above is
    // quicker at 4.4s — this car is longer and heavier.
    zeroToSixty: "4.8s",
    description:
      "The Mercedes-Maybach S580 is the back seat everything else is measured against—silent, stretched, and finished like a suite. Recline, close the curtains and let Miami slide past behind double-glazed glass. This is the one to book when arriving rested matters more than doing the driving.",

    images: [
      "/cars/mercedes-maybach-s580-rental-miami-front-quarter.jpg",
      "/cars/mercedes-maybach-s580-rental-miami-side-profile.jpg",
      "/cars/mercedes-maybach-s580-rental-miami-rear-quarter.jpg",
      "/cars/mercedes-maybach-s580-rental-miami-executive-rear-seats.jpg",
      "/cars/mercedes-maybach-s580-rental-miami-rear-screens.jpg",
      "/cars/mercedes-maybach-s580-rental-miami-rear-console.jpg",
      "/cars/mercedes-maybach-s580-rental-miami-front-seats.jpg",
      "/cars/mercedes-maybach-s580-rental-miami-panoramic-roof.jpg",
    ],
  },
  {
    id: 11,
    name: "911 Turbo S Cabriolet",
    dashboardId: "",
    make: "Porsche",
    year: 2023,
    // Regular price, owner's rate, 15 Nov 2026. No wasPrice, so no
    // strike-through. Fleet-standard deposit and age (no override here).
    price: 1295,
    // Porsche's published figures for the 2023 911 Turbo S Cabriolet: 640 hp,
    // 0-60 mph in 2.7s (the coupe is 2.6s; do not borrow it).
    power: 640,
    miles: 100,
    // 2+2: two full seats and two small rear seats. The note keeps the card
    // from implying four equal seats.
    seats: 4,
    seatsNote: "2+2",
    doors: 2,
    drivetrain: 'All-wheel drive · 3.7L twin-turbo flat-six',
    zeroToSixty: "2.7s",
    description:
      "The Porsche 911 Turbo S Cabriolet is the quickest open car we run—640 hp, all-wheel drive and 2.7 seconds to 60, with a roof that folds away in seconds. It is the supercar you can drive every day of the trip, from Brickell to South Beach, without ever wishing for something more comfortable.",

    // Owner's photos, 15 Nov 2026. The last four arrived at 540px wide, so
    // they are sharp on a phone and soft on a large desktop screen; replace
    // them with full-size originals when available.
    images: [
      "/cars/porsche-911-turbo-s-cabriolet-rental-miami-front-quarter.jpg",
      "/cars/porsche-911-turbo-s-cabriolet-rental-miami-side-profile.jpg",
      "/cars/porsche-911-turbo-s-cabriolet-rental-miami-front.jpg",
      "/cars/porsche-911-turbo-s-cabriolet-rental-miami-rear-quarter.jpg",
      "/cars/porsche-911-turbo-s-cabriolet-rental-miami-rear.jpg",
      "/cars/porsche-911-turbo-s-cabriolet-rental-miami-cockpit.jpg",
      "/cars/porsche-911-turbo-s-cabriolet-rental-miami-interior-overhead.jpg",
    ],
  },
];
