---
"@io-digital/components": minor
---

feat(io-tag): add `label` prop for contextual remove button accessible name

Adds a `label` string prop to `io-tag`. When `removable` is `true`, the remove
button's `aria-label` is set to `"Remove ${label}"` instead of the generic `"Remove"`,
so screen reader users can identify which tag will be removed (WCAG 2.4.6, 4.1.2).

Also fixes the remove button touch target to meet the 44×44 px minimum
(WCAG 2.5.5) by adding `min-height` to `.tag-group` and `min-width` / `min-height`
to `.tag__remove` via `var(--io-touch-target-min)`.
