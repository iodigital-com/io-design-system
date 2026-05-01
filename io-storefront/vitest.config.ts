/// <reference types="vitest" />

import path from 'node:path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    // Default environment for .spec.ts files (pure-function / utility tests).
    // Component tests (.spec.tsx) declare `@vitest-environment jsdom` inline.
    environment: 'node',
    include: ['src/**/*.spec.ts', 'src/**/*.spec.tsx'],
  },
});
