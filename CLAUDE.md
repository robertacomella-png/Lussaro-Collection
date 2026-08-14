# Lussaro Collection

Marketing and lead-generation site for **Lussaro Collection** — Miami luxury and exotic car rentals. The site exists to do one thing: turn a visitor into a WhatsApp message, a phone call, or a lead-form submission. Every design and copy decision serves that.

**The app lives in `luxe-drive-flow/`, not at the repo root.** All commands below run from there.

---

# Tech Stack

- **Framework:** Astro 5 (`.astro` pages) with React 18 islands (`.jsx`)
- **Language:** JavaScript, not TypeScript. Do not introduce `.ts`/`.tsx` files.
- **Styling:** Tailwind CSS via `postcss.config.js` — *not* `@astrojs/tailwind`, to avoid double-processing. shadcn/ui lives in `src/components/ui/`.
- **Motion:** Framer Motion, GSAP, and a CSS `.reveal` scroll layer defined in `Layout.astro`
- **3D/AR:** three.js — GLB for the web viewer, USDZ for iOS Quick Look
- **Email:** Resend, via the one server endpoint
- **Deploy:** Vercel (`@astrojs/vercel`). `npm run build` → intermediate `dist/`, deployable `.vercel/output/`
- **Alias:** `@/` → `src/`

## Rendering — do NOT break these

- Every page is **prerendered at build time**. The only server-rendered file is `src/pages/api/lead.js` (`export const prerender = false`).
- Don't add `prerender = false` to a page, or new API routes, without asking.
- `src/pages/cars/[slug].astro` builds from `getStaticPaths()` over `cars`. Any new dynamic route needs the same.
- React components are islands. Pick the cheapest directive that works: `client:visible` below the fold, `client:idle` for deferred extras (the homepage 3D viewer), `client:load` only when it must be interactive on first paint. `client:load` on something large is a real Core Web Vitals regression.
- `<ClientRouter />` gives SPA-style view transitions. Scripts that must survive navigation listen for `astro:page-load` / `astro:after-swap`, never `DOMContentLoaded`.
- **The view-transition swap replaces `<html>` attributes from the incoming server-rendered document.** Anything set on `<html>` at runtime — the `js` class is the live example — must be re-applied on `astro:after-swap` or it silently disappears on the first in-site navigation.
- Progressive enhancement keys off `html.js` (set inline in `<head>`), not `<noscript>` duplication. The booking-calendar fallback on car pages depends on this.

---

# Single Sources of Truth

Change these in one place. Never hardcode a second copy.

| Thing | Where |
|---|---|
| Business identity — name, address, **phone**, hours | `src/data/business.js` |
| Vehicles, pricing, specs, photos | `src/data/fleet.js` |
| Slugs, 3D models, discount tiers | `src/data/cars.js` (derived from `fleet.js`) |
| Per-car editorial copy | `src/data/car-content.js` |
| Title / description overrides | `src/data/meta-titles.js`, `src/data/meta-descriptions.js` |
| Image alt text | `src/data/image-alt.js` |
| Reviews, rental terms, booking steps, neighbourhood copy | `src/data/reviews.js`, `rental-terms.js`, `booking-steps.js`, `neighborhood-content.js` |
| Site URL, default meta, canonical | `src/layouts/Layout.astro` |
| Organization / LocalBusiness JSON-LD | `src/components/SchemaOrg.astro` |
| Breadcrumb trails | `src/lib/breadcrumbs.js` |
| Image transforms | `src/lib/imageKit.js` |
| Tracking events | `src/lib/track.js` |

**The phone number lives only in `business.js`.** Every `tel:` and `wa.me` link, the footer NAP block, and the JSON-LD all read from it. Do not paste a number into a component — the whole point is that visible NAP and structured data cannot drift, and both must keep matching the Google Business Profile exactly.

`price` in `fleet.js` is **per day, USD**. `wasPrice` is optional and drives the strike-through. `priceRange` in the schema is derived from the fleet at build time, so repricing a car updates it automatically.

Availability and booking records come from an external rental dashboard at `https://rental-dashboard-nu.vercel.app` (`/api/book`, `/api/lead`), called client-side from `BookingCalendar.jsx`. A car only gets real availability blocking if its `dashboardId` is filled in; blank is valid and degrades to name-only bookings.

---

# Brand & Design

Premium, restrained, expensive-looking. The palette was **rebranded from gold to the logo red in Aug 2026** — sampled from `public/favicon.png`, not guessed. The full rationale, with measured contrast ratios, is the comment block at the top of `src/index.css`. Read it before changing a colour.

| Token | Hex | Role |
|---|---|---|
| **Brand red** | `#ff1516` | The logo's field colour. Accent text on dark, the wordmark, one hero word, the city in each car `<h1>`, stars, small badges, calendar selection. |
| **Ink red** | `#e00e10` | Same hue darkened to clear 4.5:1 on white. **Required for red text on white sections**, and for the Call button fill with white text. |
| **Deep red** | `#c40c0e` | Call button hover. |
| **White** | `#ffffff` | The logo's mark colour. Primary button fill with black text ("See Cars & Prices", "Explore in 3D"); those hover to red. Also the light section ground. |
| **Near-black** | `#0a0a0a` | Page ground. `#0f0f0f` for raised cards. |

**Two button roles: WHITE = primary/browse, RED = call.** Call buttons were green until Aug 2026. The only green left is the small WhatsApp indicator dots (`#25D366`, `#1f7a3f`) — that green is WhatsApp's own mark, not ours.

There is no gold anywhere. If you see `#c9a96e`, it's a stale placeholder SVG under `public/cars/`, not live design.

**Typography:** `font-display` = Sora (headings), `font-sans` = Inter (body).

## Liquid glass

The nav is floating pills — each carries its own frosted fill so the glass follows the shape rather than sitting on a slab. The material is one recipe; reuse it verbatim rather than inventing a variant:

```
bg-white/[0.12] backdrop-blur-2xl backdrop-saturate-[180%] backdrop-brightness-[0.78]
ring-1 ring-white/20
shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(255,255,255,0.06),0_10px_40px_rgba(0,0,0,0.28)]
```

The inset specular top edge is what reads as a lens rather than a tint — don't drop it. Glass also appears in `BookingCalendar`, `CarGallery`, `FleetModal`, `GalleryView`, `Car3DViewer`, `fleet.astro` and `chauffeur-service-miami.astro`.

A single `#nav-pill` element slides and resizes behind the active nav item and follows hover, so the highlight travels instead of six backgrounds cross-fading.

Two hard-won layout constraints in the nav, both found by measuring: the pill group needs an explicit `md:h-[88px]` (absolute positioning leaves nothing in flow), and anything anchored with `right:100%` must be sized `w-max` — with zero available width by spec, WebKit clamps and truncates where Chromium is generous. **WebKit is part of the test loop.**

No emoji. No second accent colour. No generic purple/blue gradients. Animations stay subtle and respect `prefers-reduced-motion`.

---

# Accessibility — measured, not assumed

The site was brought to WCAG AA in Aug 2026. These floors are not style preferences:

- **Secondary text on black: minimum `white/50`** (5.32:1). `white/30`, `/35`, `/40` and `/45` all fail. Do not reach for a lighter step for "hierarchy".
- **Dark text on white: minimum `#0a0a0a/60`** (5.25:1).
- **Red text on white must be `#e00e10`**, never `#ff1516` (3.91:1, fails).
- Every form control carries an explicit `aria-label`. A placeholder is only a fallback name and vanishes once someone types — the lead form's unlabelled `<select>` was the single cause of a 1/2 Agentic Browsing score.
- Decorative glyphs (the `|` between hero stats) get `aria-hidden`.
- Icon-only controls need `aria-label` and `title`. A bare phone glyph announces nothing.

Verify against the **rendered DOM**, compositing translucent layers down to an opaque background — not by reading source. That approach is what caught two whole classes of failure a source read had missed.

**Two known, deliberate trade-offs** — don't "fix" them without raising it:
1. The nav glass dims its backdrop only ~5%, so nav text over the bright hero sits near 2:1. `brightness(0.40)` measured 5.98:1 and was rejected as too dark; `brightness(0.50)` is the middle at 4.24:1 if it needs revisiting.
2. The mobile wordmark is `#ff1516` over glass at 4.23:1. Left as-is because it is the brand mark; that call belongs to the owner.

---

# Conversion Tracking — required on every CTA

Every WhatsApp and tap-to-call link **must** carry `data-cta="<location>"`. `Layout.astro` has a global click listener that reads it and pushes `whatsapp_click` / `call_click` into the GTM dataLayer; a CTA without it reports as `unknown` and the Meta Pixel data goes soft.

Standard events (`src/lib/track.js`): `whatsapp_click`, `call_click`, `lead_submit`, `view_vehicle`. Map tags in the GTM UI, never in site code.

Two more rules the layout enforces:
- Any inline Call button gets `data-call-inline`, so the floating sticky Call pills hide while it's on screen. Two call buttons must never stack.
- Links to `/cars/*` set a sessionStorage breadcrumb so the "‹ Collection" back link does a real `history.back()` with restored scroll.

---

# SEO

## Automatic — don't hand-roll these
- **Canonical** is derived from the path in `Layout.astro`.
- **Organization + LocalBusiness JSON-LD** is emitted on every page by `SchemaOrg.astro` as a single `@graph`. Never add a second business entity to a page — two competing entities are worse than none.
- **BreadcrumbList** is built per route by `lib/breadcrumbs.js`. A page carries no breadcrumb markup of its own; car pages just pass `breadcrumbName` to `Layout` because that label lives in `fleet.js`, not the route. New routes get a label in the `LABELS` map.
- **Sitemap** comes from `@astrojs/sitemap` with per-page `lastmod` derived from git (`sitemap-lastmod.mjs`). `/sitemap.xml` redirects to `/sitemap-index.xml`.
- **Internal links use `SmartLink.astro`**, which renders a self-referencing link as a `<span aria-current="page">` instead. Nav and footer render on every page; without it each page links to itself.

## Per page
- Pass `title` and `description` to `Layout.astro`. Titles end with `| Lussaro Collection`, ~60 chars; descriptions 150–160. Hand-written overrides go in `meta-titles.js` / `meta-descriptions.js` keyed by no-trailing-slash pathname — only for live routes.
- One `<h1>`, containing the target keyword.
- Pass extra schema via the `schema` prop (object or array). Car pages pass `Car` + `Offer`; the chauffeur page passes `Service` + `FAQPage`.
- Prices in schema must match `fleet.js`. A mismatch is both a rich-result risk and a lie to customers.

## SEO landing pages
Use `LandingLayout.astro` — it supplies hero, fleet grid, lead form and CTA band, and slots your prose into a `prose` block. Props: `title`, `description`, `h1`, `intro`, optional `match` (keywords filtering the fleet grid) and `ctaTitle`.

Each needs 700–1200 words of genuinely useful copy, `<h2>`/`<h3>` structure, and 2–4 internal links to sibling pages or `/fleet`. **Check `src/pages/` before creating a new one** — don't cannibalise a keyword an existing page already targets.

Current set: `exotic-car-rental-miami`, `best-exotic-car-rental-miami`, `exotic-car-rental-brickell`, `exotic-car-rental-south-beach`, `lamborghini-rental-miami`, `rolls-royce-rental-miami`, `g-wagon-rental-miami`, `luxury-suv-rental-miami`, `chauffeur-service-miami`. Plus `about`, `contact`, `pricing`, `reviews`, `gallery`, `fleet`, `privacy`, `terms`.

---

# Copy Voice

Lussaro sells arrival and status, not spec sheets. Short, confident, concrete sentences. Lead with what the customer gets.

**Never use:** unlock, leverage, seamless, world-class, elevate, "in today's fast-paced world", "we're thrilled", exclamation marks, emoji.

**Rules:**
- Start with the answer. Context after.
- Use real numbers from `fleet.js` — actual price, horsepower, 0–60. Never round or invent.
- Name real places: South Beach, Brickell, Ocean Drive, Collins Avenue.
- One clear CTA per section. WhatsApp primary, Call secondary.
- No fake urgency, no invented reviews, no unverifiable claims ("Miami's #1").
- **No invented customer history.** No "our clients love", no claims about how often a car books. `car-content.js` holds this line deliberately — guidance only.
- **Don't assert facts the research can't confirm.** Seat counts are omitted for cars sold in both 4- and 5-seat rear layouts (Urus, GLS 600, S580, Cullinan). Say what's certain; leave the rest to the owner.
- `realMoment`, `operatorNotes` and `deliveryNotes` in `car-content.js` are **owner-only fields** — first-hand experience belongs there and nowhere else. Each renders nothing while empty. Do not fill them in.

Before shipping copy, reread and cut anything that reads as generated: tricolon padding ("performance, prestige, and concierge-level service"), "not just X, but Y", empty superlatives, paragraphs that add nothing.

---

# Images

- Local photos under `/cars` and `/gallery` have pre-generated WebP variants in an `opt/` subfolder. `getImageKitSrc` / `getImageKitSrcSet` route to them automatically; ImageKit-hosted URLs get `?tr=` params; everything else falls back to `getRemoteWebpSrc`.
- Adding photos means running `npm run optimize:images` — without the `opt/` variants there is no resizing, no WebP and no srcset.
- Always set `width`/`height` or an aspect ratio. CLS on a photo-heavy page is the easiest score to lose.
- Alt text lives in `src/data/image-alt.js`.

---

# Development Rules

**Rule 1 — Read first.** Read this file before acting. Read the file you're about to change before changing it. The `src/index.css` palette block and the commit messages on `git log` carry reasoning that isn't repeated anywhere else.

**Rule 2 — Define before you build.** Anything beyond a small edit gets a short plan and approval first.

**Rule 3 — Look before you create.** Check `src/components/`, `src/data/` and `src/pages/` for something that already does the job. `src/components/ui/` is the full shadcn set — don't rebuild a dialog, carousel or form primitive.

**Rule 4 — Test before you respond.** Run `npm run build`. Never say "done" on a failing build.

**Rule 5 — Measure, don't eyeball.** Contrast, layout widths and cross-browser behaviour get verified against the rendered DOM. Every hard bug in this codebase's history was found by measuring and missed by looking.

**Core Rule — do exactly what is asked. Nothing more, nothing less.**

- One component per file. Shared components in `src/components/<domain>/`.
- Don't add a top-level folder without asking. Don't touch `src/components/ui/` — vendored shadcn.
- Don't commit or push unless asked.

---

# Running It

```bash
cd luxe-drive-flow
npm install
npm run dev             # http://localhost:4321, bound to 0.0.0.0 for phone/iPad testing
npm run build           # → dist/ and .vercel/output/
npm run preview
npm run check           # astro check
npm run lint
npm run optimize:images # regenerate opt/ WebP variants after adding photos
npm run make:favicon
```

Env (`.env.local`, see `.env.example`): `RESEND_API_KEY` for the lead endpoint, `LEAD_TO_EMAIL` for the destination.

---

# Testing

Before calling anything done:

1. `npm run build` completes clean.
2. **View source** on any changed page: content is in the HTML, JSON-LD is present and valid, exactly one business entity.
3. **Mobile at 390px** — majority-mobile audience. Check the sticky CTA doesn't collide with an inline Call button.
4. **WebKit**, not just Chromium. The nav has already shipped a bug that only Safari showed.
5. **Contrast** on any new colour, computed from resolved styles against the composited background.
6. **CTAs** — every new WhatsApp/Call link has `data-cta`, and the prefilled WhatsApp message reads correctly.
7. **Copy** — reread against the voice rules and cut anything that reads as generated.

Lighthouse Best Practices tops out in the low 90s while GTM and the Meta Pixel are in place: `csp-xss` and Trusted Types both need per-request nonces, which a static build cannot mint. That is a known ceiling, not a regression to chase.

---

# Known Gaps

- **`luxe-drive-flow/README.md` is stale** — it still describes the pre-migration Vite + React Router SPA (port 5173, `npm run typecheck`, SPA rewrites in `vercel.json`). None of that is true.
- A few banned words survive in page copy: `index.astro`, `fleet.astro`, `chauffeur-service-miami.astro`. Fix them when you're in those files for another reason. `reviews.js` also contains some — those are **real customer quotes and must not be edited**.
- Repo root holds loose `gallery-*.jpg` files and a `.DS_Store` that aren't part of the build.
