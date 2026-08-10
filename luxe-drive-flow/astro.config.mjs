import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
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
  integrations: [
    react(),
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
  },
});
