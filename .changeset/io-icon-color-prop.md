---
"@iodigital-com/components": minor
---

feat(io-icon): add color prop mapped to semantic design tokens

Adds a `color` prop to `io-icon` with values: `primary`, `contrast-high`,
`contrast-medium`, `success`, `warning`, `error`, `info`, `inherit` (default).

When set, the component inlines `--io-icon-color` on the host element which
the Shadow DOM `color` property resolves via `var(--io-icon-color, currentColor)`.
This removes the need for wrapper-level CSS while keeping the prop fully
token-driven and overrideable. Closes #641.
