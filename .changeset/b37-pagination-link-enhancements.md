---
"@iodigital-com/components": minor
---

feat(io-pagination): add showRange, perPageOptions, and showPageJump props; sr-only live region already present

- `showRange` displays "Showing X–Y of N" range indicator with aria-live polite announcement
- `perPageOptions` renders a per-page selector before the prev arrow; selecting emits `change` with new `perPage`
- `showPageJump` renders a "Go to page" input that emits `change` on Enter after validating the target page
- `IoPaginationIntl` extended with `perPageLabel`, `goToPageLabel`, `range`, and `of` keys for localisation
- `IoPaginationChangeDetail` extended with optional `perPage` discriminant for per-page change events

feat(io-link): add `active` prop for current-nav-item styling and `underline` prop to decouple underline from variant

- `active=true` applies brand-blue active visual treatment, defaults `aria-current` to `'page'` (overridable via `ariaCurrent`)
- `underline` prop (`'always' | 'hover' | 'none'`) overrides variant-driven underline state when set
- New token `--io-link-active-underline-color` registered as public-api in `docs/public-css-api.json`

feat(io-link-pure): add new component for icon+label tertiary CTA links

- `alignLabel: 'start' | 'end'` controls icon position relative to label
- `stretch` fills container width, pushing label and icon to opposite ends
- `active` renders with visual treatment and `aria-current='page'`
- `size: 'xs' | 'sm' | 'md'` text size variants
- `hideLabel` renders icon-only with the slot text as `aria-label`
- Renders as `<a>` with href, falls back to `<button>` without
- Full storefront (5 tabs), stories spec, governance, and a11y spec included
- New token `--io-link-pure-active-color` registered as public-api
