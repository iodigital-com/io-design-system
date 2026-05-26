---
'@io-digital/components': minor
---

feat(io-scroller): new scrollable container component with edge fade indicators

- New `io-scroller` component under `io-components/src/components/io-scroller/`
- Shadow DOM with `delegatesFocus: true`
- Props: `orientation: 'horizontal' | 'vertical'` (default `'horizontal'`), `showScrollbar: boolean` (default `false`), `label: string | undefined`
- Gradient fade indicators appear at each edge when scrollable content exists in that direction; hide automatically when scrolled to the edge
- `IntersectionObserver` on sentinel elements for efficient edge detection with scroll event listener fallback
- WCAG 2.1 AA: `role="region"` with `aria-label` on the scroll container; keyboard focusable with `tabindex="0"`
- Respects `prefers-reduced-motion` — sets `scroll-behavior: auto` when reduced motion is preferred
- Two public CSS custom properties: `--io-scroller-fade-color` (defaults to `var(--io-bg-page)`) and `--io-scroller-fade-size` (defaults to `var(--io-space-6, 24px)`)
- Full storefront documentation: configurator, examples, usage, accessibility, and API pages
