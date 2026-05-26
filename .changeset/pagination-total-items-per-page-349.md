---
'@io-digital/components': minor
---

feat(io-pagination): add totalItems and perPage props for data-driven page count derivation

- `totalItems?: number` prop — total number of items in the dataset
- `perPage?: number` prop — items shown per page
- When both `totalItems` and `perPage` are provided, the component derives `totalPages` internally via `Math.ceil(totalItems / perPage)`, eliminating boilerplate arithmetic in consumers
- `totalItems + perPage` (Pattern B) takes precedence over an explicit `totalPages` prop (Pattern A) when both are set
- `totalPages` prop remains fully supported for backward compatibility — no breaking change
- Edge cases guarded: `totalItems = 0` → 1 page; `perPage <= 0` treated as 1 to prevent division by zero
- Dev warning logged when only one of `totalItems` / `perPage` is provided (incomplete Pattern B)
- `@Watch('totalItems')` and `@Watch('perPage')` clamp the current page when the computed total shrinks
- `types.ts` updated with `IoPaginationPageCountInput` JSDoc showing both API patterns
- Storefront API page updated with both patterns shown in properties table and code examples
