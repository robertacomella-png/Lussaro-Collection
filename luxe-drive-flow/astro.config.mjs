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
  // Bind the dev server to all interfaces (0.0.0.0) so other devices on the
  // same Wi-Fi (e.g. an iPad) can open the preview. Port stays 4321.
  server: { host: true, port: 4321 },
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
