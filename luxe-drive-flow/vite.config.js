import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'vendor-motion';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('react-router-dom')) {
              return 'vendor-router';
            }
            if (id.includes('moment') || id.includes('date-fns') || id.includes('lodash')) {
              return 'vendor-utils';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});