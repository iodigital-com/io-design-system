---
"@iodigital-com/components": patch
---

Add WCAG 1.4.1 error border-width tokens for all form-field components (io-input, io-textarea, io-select, io-multi-select, io-switch, io-input-date, io-input-search, io-input-password). Each error state now pairs border-color change with border-width change via a component-scoped token, satisfying the non-color-only indicator requirement. Introduces per-component typed CSS-variable constant files (css-variables.ts) for io-button, io-toast, io-toast-item, and io-modal; marks naming-convergence alias tokens as deprecated in public-css-api.json with replacedBy metadata; generates docs/tokens-meta.json from public-css-api.json for storefront auto-generation; and documents the per-component css-variables.ts pattern in CONTRIBUTING.md.
