/// <reference types="vitest" />

import * as path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    root: path.resolve(__dirname),
    setupFiles: ['tests/unit/config/vitest.setup.ts'],
    include: ['src/**/*.spec.ts', 'tests/**/*.spec.ts'],
    exclude: ['dist', 'node_modules', 'www', '**/*.e2e.ts'],
    globals: true,
    clearMocks: true,
    restoreMocks: true,
    alias: {
      '@stencil/core': path.resolve(__dirname, 'tests/unit/mocks/stencil-decorator.mocks.ts'),
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
