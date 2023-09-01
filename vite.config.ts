import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
