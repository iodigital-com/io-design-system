---
"@iodigital-com/components": minor
---

Remove redundant `compact` prop from `io-tag`, `io-tabs`, and `io-accordion` — each already has a `size` prop. `io-tabs` and `io-accordion` gain a new `compact`/`xs` size tier respectively to preserve the density level `compact` provided; `io-tag`'s `compact` had no meaningful visual difference from `size="sm"` and is removed with no replacement tier. Remove the unused `IoSheetBackground` type export from `io-sheet`.
