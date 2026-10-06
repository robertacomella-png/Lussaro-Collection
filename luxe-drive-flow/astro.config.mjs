import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import path from 'node:path';
import { lastmodFor } from './sitemap-lastmod.mjs';

// Fallback only — real dates come from git, per page. See sitemap-lastmod.mjs.
const buildDate = new Date().toISOString();

// Tailwind is handled via the existing postcss.config.js (tailwindcss + autoprefixer),
// so we don't use @astrojs/tailwind to avoid double-processing.
// https://astro.build/config
export default defineConfig({
  site: 'https://www.lussarocollection.com',
  devToolbar: { enabled: false },
  // Bind the dev server to all interfaces (0.0.0.0) so other devices on the
  // same Wi-Fi (e.g. an iPad) can open the preview. Port stays 4321.
  server: { host: true, port: 4321 },
  // Crawlers and SEO tools probe /sitemap.xml first, but @astrojs/sitemap only
  // emits sitemap-index.xml — point one at the other rather than duplicating.
  redirects: { '/home': '/', '/sitemap.xml': '/sitemap-index.xml' },
  // Keystatic's API route imports `getSecret` from `astro:env/server`, and that
  // virtual module only exists once an env schema is declared — without this
  // the admin shell renders but every save fails on an unresolved import.
  // All three are optional because local storage needs none of them; they are
  // what GitHub storage will read when the agency gets logins.
  env: {
    schema: {
      KEYSTATIC_GITHUB_CLIENT_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      KEYSTATIC_GITHUB_CLIENT_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      KEYSTATIC_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  integrations: [
    react(),
    // Keystatic injects its own server-rendered routes for /keystatic and its
    // API. Astro 5 dropped `hybrid`, so the site stays output: 'static' and
    // only those routes are server-rendered — the 21 public pages are still
    // prerendered, which is the one thing that must not change here.
    //
    // LOCAL ONLY, deliberately. `storage: { kind: 'local' }` writes through the
    // filesystem, which is read-only on Vercel, so a deployed /keystatic would
    // be an unauthenticated admin route that cannot even save. Shipping that to
    // a public domain is not worth the zero upside.
    //
    // To hand it to an agency: switch keystatic.config.js to
    // `storage: { kind: 'github', repo: '...' }`, set up the GitHub App so each
    // save is a commit attributed to the editor, then drop this guard.
    ...(process.env.NODE_ENV === 'production' ? [] : [keystatic()]),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      serialize: (item) => ({ ...item, lastmod: lastmodFor(item.url, buildDate) }),
    }),
  ],
  adapter: vercel(),
  vite: {
    resolve: {
      alias: { '@': path.resolve('./src') },
    },
    // Keystatic's API module imports `astro:env/server`, a virtual module Astro
    // resolves at build time. Vite's dependency pre-bundler runs esbuild before
    // that resolution exists, so it fails on the import. Excluding the packages
    // from pre-bundling leaves them to Astro, which can resolve it.
    optimizeDeps: { exclude: ['@keystatic/astro', '@keystatic/core'] },
  },
});
