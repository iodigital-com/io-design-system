---
"@iodigital-com/components": minor
---

feat(io-input): inputMode prop, pattern prop, compact prop, counter a11y live region (#643)

**New features:**
- `inputMode` prop (`IoInputMode | undefined`) — wired to native `inputmode` attribute, hints the virtual keyboard type on mobile. Values: `'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'`.
- `pattern` prop (`string | undefined`) — wired to native `pattern` attribute for regex-based input validation. Triggers `@Watch('pattern')` → `syncFormValue()` so FACE validity is re-evaluated when the constraint changes.
- `compact` prop (`@Prop({ reflect: true }) compact = false`) — dense layout mode that reduces field height by ~8px and vertical padding to `var(--io-space-1)` (4px) via `:host([compact])` CSS selector.
- `input-counter-sr` visually-hidden `<span aria-live="polite" aria-atomic="true">` — announces character count changes to screen readers when `counter=true`. The existing visual counter div retains `aria-hidden="true"`.

**Type exports:**
- `IoInputMode` type union exported from `types.ts`.
