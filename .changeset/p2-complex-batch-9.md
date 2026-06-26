---
"@iodigital-com/components": minor
---

Batch 9 complex feature improvements (#827, #836, #847):

- io-pin-code: add `loading` prop (disables inputs, shows spinner, sets `aria-busy="true"`) and `form` prop (out-of-DOM form association via ElementInternals) (#827)
- io-breadcrumb: add `maxItems` prop — collapses long breadcrumb trails into first item + expand button + last items; expand button has descriptive `aria-label` for screen readers (WCAG 1.3.1) (#836)
- io-tabs-bar: add animated sliding `.indicator` element driven by Web Animations API; respects `prefers-reduced-motion`; replaces static `border-bottom-color` transition (#847)
