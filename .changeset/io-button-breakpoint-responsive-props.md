---
'@iodigital-com/components': minor
---

feat(io-button): add BreakpointCustomizable responsive support for size, hideLabel, and iconPosition props

Consumers can now pass a responsive breakpoint map to `size`, `hideLabel`, and `iconPosition` instead of a fixed scalar value:

```html
<!-- Icon-only on mobile, full button on large+ viewports -->
<io-button .hideLabel={{ base: 'true', l: 'false' }} icon="menu" label="Menu">Menu</io-button>

<!-- Small on mobile, large on desktop -->
<io-button .size={{ base: 'sm', l: 'lg' }}>Get started</io-button>
```

The `BreakpointCustomizable<T>` utility type and `resolveBreakpoint()` function are now exported from `@iodigital-com/components/utils/breakpoint` for use in custom wrapper scenarios.

Resolution is static (reads on each render, no live viewport subscription). The `IoButtonIconPosition` named type is now exported from the types module.
