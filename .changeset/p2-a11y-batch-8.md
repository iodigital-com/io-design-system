---
"@iodigital-com/components": minor
---

Batch 8 a11y improvements (#838, #848, #867):

- io-tabs-bar: add `labelledBy` prop for `aria-labelledby` support when an external heading labels the tab group (#838)
- io-input: include character counter live region ID in `aria-describedby` so screen readers announce count on focus and on change (#848)
- io-carousel: add `skipLabel` prop and visually-hidden skip link as first focusable element, allowing keyboard users to bypass the carousel (#867)
