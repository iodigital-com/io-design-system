---
"@io-digital/components": minor
---

feat(io-wordmark): add variant, color props and official brand SVG assets

- Adds `variant: 'text' | 'mark' | 'lockup'` prop (default `'text'` — backwards-compatible)
- Adds `color: 'blue' | 'black' | 'white' | 'beige'` prop (default `'blue'`)
- `variant="mark"` renders the official geometric iO mark SVG (viewBox 0 0 881 599) with `fill="currentColor"`
- `variant="lockup"` renders the full iO Digital brand lockup SVG (viewBox 0 0 1500 1500) with `fill="currentColor"`
- `variant="text"` preserves existing Manrope web-font wordmark behaviour; `mono` / `href` / `target` / `rel` props still apply
- New CSS tokens: `--io-wordmark-mark-height-{sm|md|lg|xl}` and `--io-wordmark-lockup-height-{sm|md|lg|xl}`
- New brand token: `--io-color-beige` (#e1cfbf) for mark-only beige colour variant
- Brand source assets committed to `brand/mark/` and `brand/wordmark/` (moved from `docs/`)
- Static copies in `io-storefront/public/brand/` for Next.js static serving
