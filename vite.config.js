import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // If deploying to a custom domain (yourdomain.com), keep base as '/'.
  // If deploying to username.github.io/repo-name (no custom domain), change to '/repo-name/'.
  base: '/',

  build: {
    chunkSizeWarningLimit: 700, // react-syntax-highlighter is ~630 kB min; it's isolated and cached
    rollupOptions: {
      output: {
        manualChunks: {
          // Split heavy syntax-highlighter into its own chunk so it's lazy-loaded
          'syntax-highlighter': ['react-syntax-highlighter'],
          // Split React runtime separately for long-term caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
