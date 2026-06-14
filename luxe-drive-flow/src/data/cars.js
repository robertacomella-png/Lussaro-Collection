import { fleet } from "./fleet";

export const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// SEO-friendly slug overrides (descriptive + keyword-rich).
const SLUGS = {
  "G63": "mercedes-amg-g63",
  "Cullinan": "rolls-royce-cullinan",
  "GLS 600 Maybach": "mercedes-maybach-gls-600",
};

// Enriched fleet: slug for routing + the 3D model for each car.
// Only the Urus is a real 3D showpiece; every other car uses real photography
// (more trustworthy for a rental). Add a GLB here later to make any car 3D.
export const cars = fleet.map((c) => ({
  ...c,
  slug: SLUGS[c.name] || slugify(c.name),
  model: /urus/i.test(c.name) ? "/models/urus.glb" : null,
}));

export const getCar = (slug) => cars.find((c) => c.slug === slug);
