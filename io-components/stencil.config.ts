/**
 * stencil.config.ts — The Engine Room
 * ====================================
 * Compiler configuration for @io-digital/components.
 *
 * Output targets:
 *   dist                  → lazy-loaded NPM pkg (bundled apps / vite / webpack)
 *   dist-custom-elements  → tree-shakeable per-component build (framework wrappers)
 *   loader                → CDN <script type="module"> entry, chunk self-resolution
 *   www                   → local dev server
 *
 * Framework wrapper packages are generated automatically by the proxy output targets.
 * Each proxy package declares @io-digital/components as a peer dependency and lives in a
 * sibling directory (../io-components-react, etc.).
 */

import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";
import { vueOutputTarget } from "@stencil/vue-output-target";
import { angularOutputTarget } from "@stencil/angular-output-target";

export const config: Config = {
  // ──────────────────────────────────────────────────────────────
  // Core identity
  // ──────────────────────────────────────────────────────────────

  /**
   * `namespace` controls the bundled output file names:
   *   dist/io-components/io-components.esm.js
   *   loader/index.js      (registers <io-*> lazy loaders)
   */
  namespace: "io-components",

  /**
   * Async task queue: renders are batched per microtask.
   * Prevents unnecessary double-renders on rapid prop changes.
   */
  taskQueue: "async",

  // ──────────────────────────────────────────────────────────────
  // Global stylesheet — injected into <head>, NOT into Shadow DOM.
  // This is where :root CSS Custom Properties (design tokens) live.
  // Components reference these via var(--io-*) which crosses the
  // Shadow DOM boundary through CSS inheritance.
  // ──────────────────────────────────────────────────────────────
  globalStyle: "src/global/app.css",
  globalScript: "src/global/app.ts",

  // ──────────────────────────────────────────────────────────────
  // Output Targets
  // ──────────────────────────────────────────────────────────────
  outputTargets: [
    /**
     * TARGET 1: dist
     * ─────────────
     * Lazy-loaded NPM package. Stencil splits each component into its own
     * chunk. The loader fetches chunks on first element encounter in DOM.
     */
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },

    /**
     * TARGET 2: dist-custom-elements
     * ────────────────────────────────
     * Tree-shakeable build. One file per component. No auto-registration.
     * Framework wrapper packages import from here via componentCorePackage.
     *
     * customElementsExportBehavior: 'auto-define-custom-elements'
     *   Each module self-registers on import — used by the React/Vue/Angular
     *   proxy packages so consumers don't need a separate defineCustomElements() call.
     */
    {
      type: "dist-custom-elements",
      dir: "dist-custom-elements",
      customElementsExportBehavior: "auto-define-custom-elements",
      externalRuntime: false,
      includeGlobalScripts: false,
    },

    /**
     * TARGET 3: www
     * ─────────────
     * Local development server output. Stencil serves this at http://localhost:3333.
     */
    {
      type: "www",
      serviceWorker: null,
    },

    // ──────────────────────────────────────────────────────────
    // Framework Wrapper Auto-generation
    // ──────────────────────────────────────────────────────────

    /**
     * React proxy target.
     * Generates forwardRef wrappers + event prop name mapping.
     * Output path: ../io-components-react/src/components.ts
     */
    reactOutputTarget({
      componentCorePackage: "@io-digital/components",
      proxiesFile: "../io-components-react/src/components.ts",
      includeDefineCustomElements: true,
    }),

    /**
     * Vue proxy target.
     * Generates defineComponent wrappers with v-model support.
     * Output path: ../io-components-vue/src/components.ts
     */
    vueOutputTarget({
      componentCorePackage: "@io-digital/components",
      proxiesFile: "../io-components-vue/src/components.ts",
    }),

    /**
     * Angular proxy target.
     * Generates @Directive proxies + NgModule.
     * Output path: ../io-components-angular/src/directives/proxies.ts
     */
    angularOutputTarget({
      componentCorePackage: "@io-digital/components",
      outputType: "component",
      directivesProxyFile:
        "../io-components-angular/src/directives/proxies.ts",
      directivesArrayFile:
        "../io-components-angular/src/directives/index.ts",
    }),
  ],

  // ──────────────────────────────────────────────────────────────
  // Bundle grouping — components that must be co-loaded.
  // ──────────────────────────────────────────────────────────────
  bundles: [
    // { components: ['io-select', 'io-select-option'] },
    // { components: ['io-tabs', 'io-tabs-item'] },
  ],

  // ──────────────────────────────────────────────────────────────
  // Build performance
  // ──────────────────────────────────────────────────────────────
  enableCache: true,

  // ──────────────────────────────────────────────────────────────
  // Testing
  // ──────────────────────────────────────────────────────────────
  testing: {
    browserHeadless: "new",
  },
};
