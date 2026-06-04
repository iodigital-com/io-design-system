import { defineConfig } from 'vite';

export default defineConfig({
  server: { port: 5176 },
  preview: { port: 5176 },
  optimizeDeps: {
    include: ['@iodigital-com/components'],
  },
});
