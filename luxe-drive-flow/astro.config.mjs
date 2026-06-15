import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import path from 'node:path';

// Tailwind is handled via the existing postcss.config.js (tailwindcss + autoprefixer),
// so we don't use @astrojs/tailwind to avoid double-processing.
// https://astro.build/config
export default defineConfig({
  site: 'https://www.lussarocollection.com',
  devToolbar: { enabled: false },
  redirects: { '/home': '/' },
  integrations: [
    react(),
    sitemap({ changefreq: 'weekly', priority: 0.7, lastmod: new Date() }),
  ],
  adapter: vercel(),
  vite: {
    resolve: {
      alias: { '@': path.resolve('./src') },
    },
  },
});
