# Lussaro Collection

Marketing and lead-generation website for Lussaro Collection — Miami luxury and exotic car rentals. Bookings are handled via WhatsApp.

## Tech stack

- **Vite** + **React 18** (JavaScript/JSX)
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **Framer Motion** for animations
- **React Router** for client-side routing
- Deployed on **Vercel**

## Local development

**Prerequisites:** Node.js 18+ and npm.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173. (Vite's log level is set to `error`, so it won't print the URL banner.)

## Available scripts

- `npm run dev` — start the dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run lint:fix` — fix lint issues
- `npm run typecheck` — type-check with the jsconfig

## Project structure

- `src/pages/` — route pages (Home, Gallery, Terms, Privacy, and SEO landing pages)
- `src/components/` — section components + the shadcn `ui/` library
- `src/data/fleet.js` — the vehicle fleet data
- `src/lib/` — helpers (SEO meta, image URLs, utils)
- `public/` — static assets (images, sitemap, robots, manifest)

## Deployment

Pushes to the default branch deploy automatically via Vercel. `vercel.json` rewrites all routes to `index.html` for the SPA.
