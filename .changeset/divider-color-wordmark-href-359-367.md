---
'@io-digital/components': minor
---

feat(io-divider): add `color` prop (`subtle` | `default` | `strong`) for three-tier contrast levels using design tokens; `subtle` uses `rgba(--io-border-rgb, 0.5)`, `default` maps to `--io-border`, `strong` maps to `--io-border-hover`

feat(io-wordmark): add `href`, `target`, `rel` props for logo-as-link pattern; when `href` is set the wordmark renders as an `<a>` element with `aria-label` and focus-visible ring; `delegatesFocus: true` set unconditionally

Closes #359, Closes #367
