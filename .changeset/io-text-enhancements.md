---
"@iodigital-com/components": minor
---

feat(io-text): add hyphens prop and extend type unions (#650)

- Add `IoTextHyphens = 'none' | 'manual' | 'auto' | 'inherit'` type (default: 'inherit')
- When hyphens is 'auto' or 'manual', set `overflowWrap: 'break-word'` inline style
- Add 'inherit' to `IoTextSize` union; when size === 'inherit', emit `fontSize: 'inherit'` (not a token)
- Add 'info' to `IoTextColor` union, mapping to `var(--io-color-info)` in resolveColor()
- Extend `IoTextTag` union with 'address' | 'figcaption' | 'cite' | 'legend' (semantic HTML support)
- Add comprehensive test coverage for all new values and combinations
