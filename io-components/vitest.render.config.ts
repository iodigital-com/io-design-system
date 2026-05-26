import * as path from 'node:path';

import { defineVitestConfig } from '@stencil/vitest/config';

export default defineVitestConfig({
  stencilConfig: path.resolve(__dirname, 'stencil.config.ts'),
  test: {
    root: path.resolve(__dirname),
    environment: 'stencil',
    setupFiles: ['tests/render/vitest.setup.ts'],
    include: ['src/**/*.render.spec.tsx'],
    exclude: ['dist', 'node_modules', 'www', '**/*.e2e.ts'],
    globals: true,
    clearMocks: true,
    restoreMocks: false,
  },
});