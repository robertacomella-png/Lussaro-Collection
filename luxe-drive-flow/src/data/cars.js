import { fleet } from "./fleet";

export const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// SEO-friendly slug overrides (descriptive + keyword-rich).
const SLUGS = {
  "G63": "mercedes-amg-g63",
  "Cullinan": "rolls-royce-cullinan",
  "GLS 600 Maybach": "mercedes-maybach-gls-600",
};

// 3D showpieces (by slug): GLB for the web viewer, USDZ for iOS AR, and a poster
// shown while the model loads. Add a car here to give it the 3D/AR section.
const MODELS = {
  "lamborghini-urus": { model: "/models/urus.glb", usdz: "/models/urus.usdz" },
  sf90: { model: "/models/sf90.glb", usdz: "/models/sf90.usdz", poster: "/cars/sf90-0.jpg" },
};

// Per-car multi-day discount tiers (by slug). Omit a car to use the default
// tiers in BookingCalendar (3+ days 15%, 5+ days 20%, 7+ days 25%).
const DISCOUNTS = {
  sf90: [
    { days: 3, pct: 10 },
    { days: 5, pct: 15 },
    { days: 7, pct: 20 },
  ],
};

// Enriched fleet: slug for routing + optional 3D model/AR + discounts per car.
export const cars = fleet.map((c) => {
  const slug = SLUGS[c.name] || slugify(c.name);
  const m = MODELS[slug] || {};
  return {
    ...c,
    slug,
    model: m.model || null,
    usdz: m.usdz || null,
    ...(m.poster ? { poster: m.poster } : {}),
    ...(DISCOUNTS[slug] ? { discountTiers: DISCOUNTS[slug] } : {}),
  };
});

export const getCar = (slug) => cars.find((c) => c.slug === slug);
