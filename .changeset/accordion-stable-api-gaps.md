---
"@iodigital-com/components": minor
---

feat(io-accordion): compact prop, alignMarker prop, grid animation, CSS tokens, a11y fixes (#629)

- Replace max-height transition with grid-template-rows 0fr→1fr animation — panel expands to true content height with no fixed cap
- Add `compact` boolean prop (`@Prop({ reflect: true })`) for dense-UI contexts — reduces trigger padding and font size independent of the `size` preset
- Add `alignMarker: 'start' | 'end'` prop (default `'end'`) — places expand/collapse icon before the title when `start`, via `order: -1` CSS
- Remove native `disabled` attribute from trigger button; keep only `aria-disabled` — button stays focusable, screen readers announce it as unavailable (WCAG 4.1.2)
- Add `visibility: hidden` on collapsed panel as fallback for browsers without full `inert` support (WCAG 2.1.1)
- Add CSS token overrides: `--io-accordion-border-color` (divider), `--io-accordion-py` / `--io-accordion-px` (trigger padding), `--io-accordion-summary-top` (sticky top offset)
- Panel inner gets `min-height: 0` required for grid-template-rows collapse
- Storefront API page, stories, and story specs updated; all tests pass
