---
"@iodigital-com/components": minor
---

feat(button-group): add `variant` prop — `primary` (blue fill) and `secondary` (white fill with shadow)

- `variant="primary"` (default): active state uses brand primary blue fill with white text — for navigation tabs and primary selection controls.
- `variant="secondary"`: active state uses white/surface fill with a subtle shadow and dark text — for property selectors, toolbar controls, and dense UI contexts.
- Deprecates `size` prop in favour of `compact` (size was redundant; compact handles all density scaling).
- All theme blocks updated: light, dark, only-light, only-dark.
