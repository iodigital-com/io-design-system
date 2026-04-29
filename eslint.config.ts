import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

const jsxA11yRecommendedWarn = Object.fromEntries(
  Object.entries(jsxA11y.flatConfigs.recommended.rules).map(([ruleName]) => [ruleName, 'warn']),
);

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/dist-custom-elements/**',
      '**/loader/**',
      '**/.next/**',
      '**/www/**',
      'io-storefront/public/stencil/**',
      'io-storefront/out/**',
      '**/coverage/**',
      '**/playwright-report/**',
      '**/test-results/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommended],
    plugins: {
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ['io-components/src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  // Stencil component TSX files: `h` is the JSX factory — consumed by compiler, not at runtime.
  // jsx-a11y rules are `warn` here to surface issues without blocking PRs during Wave-B a11y remediation.
  // Wave-B (#213) will upgrade these to `error` once existing violations are fixed.
  {
    files: ['io-components/src/components/**/*.tsx'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...jsxA11yRecommendedWarn,
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^h$' }],
      // Ban console.log/debug/info (debug spam); allow console.warn/error for diagnostic messaging
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  // Component source .ts files (non-TSX): enforce no-console
  {
    files: ['io-components/src/**/*.ts'],
    ignores: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  // Test/spec files: `any` is often necessary for mocking; relax the strict rule.
  // ban-ts-comment is also relaxed here (test scaffolding may need @ts-ignore in jsdom context).
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  {
    files: ['scripts/**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
);
