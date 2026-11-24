import { fleet } from "./fleet";
import { rentalTerms } from "./rental-terms";
import DEALS from "./three-day-deals.json";

// 3-Day Deals (owner-typed, via Keystatic → three-day-deals.json). A deal is
// the per-day price for a rental of 3+ days. It is folded into the car's
// discount ladder rather than bolted on beside it, so every place that already
// prices a multi-day rental — the booking calculator, the car-page estimate,
// /pricing, the funnels and the car-page FAQ — charges exactly the typed
// figure with no second code path. The first tier's pct becomes whatever
// percentage lands on that price (it may be fractional; display rounds it).
// Longer tiers never cost more per day than the deal: they keep their own
// discount or the deal's, whichever is deeper, rounded up to a whole percent.
// A deal at or above the 1-day price is ignored.
const withDeal = (price, tiers, deal) => {
  if (!(deal > 0 && deal < price)) return null;
  const dealPct = (1 - deal / price) * 100;
  return tiers.map((t, i) =>
    i === 0 ? { ...t, pct: dealPct } : { ...t, pct: Math.max(t.pct, Math.ceil(dealPct)) },
  );
};

export const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// SEO-friendly slug overrides (descriptive + keyword-rich).
const SLUGS = {
  "G63": "mercedes-amg-g63",
  "Cullinan": "rolls-royce-cullinan",
  "GLS 600 Maybach": "mercedes-maybach-gls-600",
  "S580": "mercedes-s580",
  "S580 Maybach": "mercedes-maybach-s580",
  "911 Turbo S Cabriolet": "porsche-911-turbo-s",
};

// 3D showpieces (by slug): GLB for the web viewer, USDZ for iOS AR, and a poster
// shown while the model loads. Add a car here to give it the 3D/AR section.
const MODELS = {
  "lamborghini-urus": { model: "/models/urus.glb", usdz: "/models/urus.usdz" },
  sf90: { model: "/models/sf90.glb", usdz: "/models/sf90.usdz", poster: "/cars/ferrari-sf90-rental-miami-front-quarter.jpg" },
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
    ...(withDeal(c.price, DISCOUNTS[slug] || rentalTerms.discountTiers, DEALS[slug])
      ? {
          discountTiers: withDeal(c.price, DISCOUNTS[slug] || rentalTerms.discountTiers, DEALS[slug]),
          threeDayDeal: DEALS[slug],
        }
      : {}),
    // Per-car terms. fleet.js may set a numeric `deposit` or `minimumAge` for a
    // car that differs from the fleet (the Huracan STO does); everything else
    // inherits rental-terms.js. Always present, so a page can read
    // car.deposit.display and car.minimumAge without checking.
    deposit: c.deposit
      ? { ...rentalTerms.deposit, amount: c.deposit, display: `$${c.deposit.toLocaleString("en-US")}` }
      : rentalTerms.deposit,
    depositDiffers: Boolean(c.deposit && c.deposit !== rentalTerms.deposit.amount),
    minimumAge: c.minimumAge ?? rentalTerms.minimumAge,
  };
});

export const getCar = (slug) => cars.find((c) => c.slug === slug);

// --- Cars whose terms differ from the fleet ----------------------------------
//
// Pages that say "the same deposit on every car" or "the minimum on every car"
// append these, so the claim stays true when a car carries its own terms. Both
// are DERIVED from fleet.js: when no car differs they are '' and every such
// sentence renders exactly as it did before the exception existed.
const fullName = (c) => (c.name.startsWith(c.make) ? c.name : `${c.make} ${c.name}`);
const joinAnd = (xs) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs.at(-1)}`);

/** "the Lamborghini Huracan STO at $2,000", or '' */
export const depositException = joinAnd(
  cars.filter((c) => c.depositDiffers).map((c) => `the ${fullName(c)} at ${c.deposit.display}`),
);

/** "the Lamborghini Huracan STO, which requires 21", or '' */
export const ageException = joinAnd(
  cars
    .filter((c) => c.minimumAge !== rentalTerms.minimumAge)
    .map((c) => `the ${fullName(c)}, which requires ${c.minimumAge}`),
);
