import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // Set to '/repo-name/' when deploying to username.github.io/repo-name.
  // Change back to '/' if you later point a custom domain at the site.
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
