---
"@iodigital-com/components": minor
---

feat(io-progress): add labelledBy, valueText, min/max, and indeterminate props

Adds ARIA enhancements and flexible range support:
- `labelledBy` prop: aria-labelledby support (takes precedence over label)
- `valueText` prop: aria-valuetext for custom descriptions (e.g., "3 of 5 steps")
- `min`/`max` props: support custom numeric ranges with auto-calculated percentage
- `indeterminate` prop: shimmer animation when state is unknown (omits aria-valuenow per ARIA spec)

Includes new `computePercentage()` utility for normalized range calculations and `@keyframes io-progress-indeterminate` animation.
