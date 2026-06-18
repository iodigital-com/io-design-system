---
"@iodigital-com/components": minor
---

feat(io-heading): add inverse/brand colors, apply line-height and tracking tokens

- Adds `inverse` and `brand` to `IoHeadingColor` type union
  - `inverse` maps to `--io-text-inverse` (use on dark surfaces)
  - `brand` maps to `--io-color-primary`
- Applies `--io-line-height-heading` (1.2) to all heading sizes
- Applies `--io-heading-tracking-*` letter-spacing tokens for xl–4xl sizes (negative tracking for display headings)
- Updates storefront propDefinitions, API docs, and adds a Colors example section
