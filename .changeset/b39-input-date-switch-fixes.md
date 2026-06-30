---
"@iodigital-com/components": minor
---

feat(io-input-date): add showPicker() trigger button with support detection (#956). Renders an interactive calendar button (Chromium 99+, Safari 16+, Firefox 101+) that opens the native date picker via `HTMLInputElement.showPicker()`. Falls back to the existing decorative SVG icon on unsupported browsers. Adds `pickerLabel` prop (default 'Open date picker') for i18n. Adds `--io-input-date-trigger-color` and `--io-input-date-trigger-bg-hover` public CSS API tokens.

fix(io-switch): add formStateRestoreCallback for bfcache restore support (#952). Mirrors the io-checkbox implementation — restores checked state from previously-submitted form data on back-forward cache restoration. Also adds an aria-live polite loading announcement region that fires on the first transition into loading state, giving screen-reader users feedback when `loading=true` is set.
