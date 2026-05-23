---
"@io-digital/components": patch
---

chore(io-skeleton): remove io-skeleton component

Removes `io-skeleton` from `@io-digital/components`. Product pages implement their own skeleton layouts using standard HTML and CSS — a dedicated component is unnecessary.

- Deleted `io-skeleton` Stencil component and all associated files
- Removed `--io-skeleton-*` CSS tokens and `@keyframes io-skeleton-pulse` from global tokens
- Removed `getSkeletonStyle` utility from `@io-digital/components/styles`
- Removed storefront pages (configurator, examples, usage, accessibility, API)
- Updated governance docs, public CSS API registry, and reconciliation manifests
