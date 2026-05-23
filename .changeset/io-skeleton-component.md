---
"@io-digital/components": minor
---

feat(io-skeleton): new component — animated loading placeholder

Adds `io-skeleton`, an animated shimmer placeholder for use while async content loads.

- 4 shape variants: `text`, `circular`, `rectangular`, `rounded`
- Configurable `width`, `height`, `animated`, and `label` props
- `role="img"` + `aria-label` semantics — avoids live region noise in list contexts
- `prefers-reduced-motion` handled automatically via CSS media query
- Token-driven: `--io-skeleton-bg`, `--io-skeleton-duration`, `--io-skeleton-border-radius-text`, `--io-skeleton-border-radius-rounded`
- Dark mode override for `--io-skeleton-bg` via `[data-theme="dark"]`
- Full storefront pages: configurator, examples, usage, accessibility, API
