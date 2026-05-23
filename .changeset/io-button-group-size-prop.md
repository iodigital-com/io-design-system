---
'@io-digital/components': minor
---

feat(io-button-group): add `size` prop that propagates to all slotted `io-button` children

The `size` prop (`'sm' | 'md' | 'lg'`, default `'md'`) is reflected to the host attribute.
Size is propagated via `assignedElements({ flatten: true })` both on `slotchange` (via
`onSlotchange` directly on the `<slot>` JSX element) and on `@Watch('size')` changes.
