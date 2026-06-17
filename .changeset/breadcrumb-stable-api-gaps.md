---
'@io-digital/components': minor
---

feat(io-breadcrumb): close beta-to-stable API/a11y gaps (#627)

- `io-breadcrumb`: add `label` prop (default `'Breadcrumb'`) bound to `aria-label` on the nav landmark — fixes WCAG 2.4.6 localisation and multi-breadcrumb-per-page violations
- `io-breadcrumb-item`: add `target` prop; when `'_blank'`, auto-applies `rel="noopener noreferrer"` (WCAG 3.2.2)
- `io-breadcrumb-item`: add `itemLabel` prop for accessible name override on icon-only or supplemented items (WCAG 4.1.2)
- `io-breadcrumb-item`: fix focus ring — add `box-shadow: 0 0 0 4px var(--io-focus-outer)` alongside the existing outline to match the system-wide WCAG 2.4.11 focus pattern
- `io-breadcrumb-item`: align separator default from `'›'` to `'/'` to match storefront API documentation
- `app.css`: add global tokens `--io-breadcrumb-separator`, `--io-breadcrumb-font-size`, `--io-breadcrumb-item-color`, `--io-breadcrumb-current-color`, `--io-breadcrumb-separator-color` for per-instance theming without specificity hacks
- Storefront: update API, Usage, Accessibility, Examples pages; add i18n and target=_blank stories
