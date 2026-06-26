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
    year: 2023,
    price: 995,
    power: 641,
    miles: 100,
    zeroToSixty: "3.3s",
    description:
      "The Lamborghini Urus is pure Miami energy—fast, bold, and built to dominate the streets. With supercar performance in an SUV, it delivers explosive power and head-turning style wherever you go. From South Beach to Brickell, this is how you stand out and own the road.",

    images: [
      "/cars/urus-3317.jpg",
      "/cars/urus-40.jpg",
      "/cars/urus-6.jpg",
      "/cars/urus-7.jpg",
      "https://ik.imagekit.io/8i3ae7fac/IMG_2643%203.jpg",
      "https://ik.imagekit.io/8i3ae7fac/IMG_2670%203.jpg",
    ],
  },

  {
    id: 2,
    name: "GLS 600 Maybach",
    dashboardId: "71d29a72-b904-4318-80e5-0c133d2cb665",
    make: "Mercedes-Benz",
    year: 2023,
    price: 895,
    power: 550,
    miles: 100,
    zeroToSixty: "4.6s",
    description:
      "The Mercedes-Maybach GLS 600 is Miami luxury at its finest—effortless, bold, and impossible to ignore. Glide through the city in total comfort with a whisper-smooth ride and a handcrafted interior that feels like a private jet on wheels. Whether it’s a night in Brickell or a pull-up in South Beach, this is how you make an entrance.",

    images: [
      "/cars/maybach-1.jpg",
      "/cars/maybach-35.jpg",
      "/cars/maybach-29.jpg",
      "/cars/maybach-30.jpg",
      "/cars/maybach-37.jpg",
      "/cars/maybach-36.jpg",
      "/cars/maybach-34.jpg",
      "/cars/maybach-33.jpg",
      "/cars/maybach-31.jpg",
    ],
  },
  {
    id: 7,
    name: "SF90",
    dashboardId: "",
    make: "Ferrari",
    year: 2023,
    price: 1995,
    power: 986,
    miles: 100,
    zeroToSixty: "2.5s",
    description:
      "The Ferrari SF90 is Miami’s ultimate statement—nearly 1,000 hybrid horsepower, scissor-fast acceleration, and presence that stops the street. From Ocean Drive to Brickell, this is the supercar that turns every arrival into an event.",

    images: [
      "/cars/sf90-0.jpg",
      "/cars/sf90-1.jpg",
      "/cars/sf90-2.jpg",
      "/cars/sf90-3.jpg",
      "/cars/sf90-4.jpg",
      "/cars/sf90-5.jpg",
      "/cars/sf90-6.jpg",
      "/cars/sf90-7.jpg",
      "/cars/sf90-8.jpg",
    ],
  },
  {
    id: 3,
    name: "Huracan EVO",
    dashboardId: "",
    make: "Lamborghini",
    year: 2023,
    price: 1295,
    power: 650,
    miles: 100,
    zeroToSixty: "3.2s",
    description:
      "The Lamborghini Huracán EVO is built for Miami—loud, fast, and impossible to miss. With its screaming V10 and razor-sharp handling, it delivers pure adrenaline every time you hit the gas. Whether you’re cruising Ocean Drive or making a statement in Brickell, this is how you turn every head in the city.",

    images: [
      "/cars/huracan-evo-placeholder.svg",
    ],
  },
  {
    id: 6,
    name: "Cullinan",
    dashboardId: "",
    // Hidden from the homepage "Collection" grid only; its detail/SEO pages stay live.
    hideOnHome: true,
    make: "Rolls-Royce",
    year: 2022,
    price: 1495,
    power: 563,
    miles: 100,
    zeroToSixty: "4.9s",
    description:
      "The Rolls-Royce Cullinan is the pinnacle of Miami luxury—effortless, commanding, and unmistakably elite. With its whisper-quiet ride and handcrafted interior, every drive feels like a private experience. Whether you’re arriving in South Beach or gliding through the city, this is how you move with true presence.",

    images: [
      "/cars/cullinan-placeholder.svg",
    ],
  },
];
