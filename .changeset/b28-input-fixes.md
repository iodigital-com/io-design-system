---
"@iodigital-com/components": minor
---

fix(io-input, io-select, io-textarea): align touched-gated FACE error behaviour, consolidate state-message elements, deprecate lowercase autocomplete prop, and add forced-colors HCM fallbacks

- #1168: `reportValidity()` now forces `touched=true` on io-input, io-select, and io-textarea so FACE error UI surfaces before the user has blurred the field, matching native form element behaviour
- #1167: io-input and io-textarea now render a single consolidated `<p>` state-message element instead of three separate elements sharing the same id; prevents duplicate-id violations and ensures `aria-describedby` always points to a visible element
- #1146: The lowercase `autocomplete` prop on io-input is marked `@deprecated` (use `autoComplete`); io-textarea gains the canonical `autoComplete` camelCase prop to match io-input
- #1081: io-input, io-select, and io-textarea now include `@media (forced-colors: active)` blocks — error states use `Highlight` outline, disabled states use `GrayText` with `opacity: 1`
