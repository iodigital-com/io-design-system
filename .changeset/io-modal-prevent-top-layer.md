---
"@iodigital-com/components": major
---

feat(io-modal): `preventTopLayer` defaults to `true` — universal framework compatibility + scroll locking

## What changed

1. **`preventTopLayer` now defaults to `true`**. The modal opens with `show()`
   instead of `showModal()`, and the component manages its own backdrop,
   focus-trap, ESC key, and `inert` management in JavaScript.

2. **Scroll locking added** (`document.body.style.overflow = 'hidden'` on open,
   restored on close). This ensures the page cannot be scrolled behind the modal
   in any mode — matching the Porsche Design System pattern.

3. **Backdrop fade-in animation** added to the `preventTopLayer` CSS path so the
   host overlay animates identically to the native `::backdrop`.

## Breaking change

Any consumer relying on native browser top-layer stacking must opt back in:

```html
<io-modal prevent-top-layer="false" ...>
```

```tsx
<IoModal preventTopLayer={false} ...>
```

## Why `true` is the right default for all consumers

### React 18
`showModal()` promotes `<dialog>` to the browser top layer. React 18
delegates synthetic events to `#root`. Composed click events from
shadow-DOM children inside a top-layer dialog do not bubble to `#root`,
causing slotted `slot="footer"` buttons to be non-clickable.
`preventTopLayer=true` keeps the dialog in normal document flow where
React event delegation works as expected.

### Vue 3 / Angular / Svelte / vanilla
These frameworks attach listeners directly to elements, so `showModal()`
works for them today. With `preventTopLayer=true` they receive identical
behavior — backdrop, focus-trap, ESC, `inert` — without depending on
browser-native top-layer mechanics that vary across engines.

### Feature parity table

| Behavior | `showModal()` | `show()` + component (default) |
|---|---|---|
| Backdrop overlay | Native `::backdrop` | CSS `position:fixed` on host |
| Backdrop animation | `io-backdrop-in` | `io-backdrop-in` |
| Scroll lock | `document.body.style.overflow` | `document.body.style.overflow` |
| Focus trap | Browser-native | JS `setupFocusTrap()` |
| ESC key | Native `cancel` event | `document.keydown` listener |
| Background `inert` | Manual (this component) | Manual (this component) |
| Focus restoration | This component | This component |
| `dismiss` event | Yes | Yes |
| `aria-modal` on dialog | Set by browser | Set explicitly |

Set `preventTopLayer={false}` only when native top-layer stacking is
strictly required (e.g. Popover API elements that must appear below the
modal).

## Migration

Most consumers need **no change**:

```diff
- <IoModal open={isOpen} preventTopLayer heading="Confirm">
+ <IoModal open={isOpen} heading="Confirm">
```

To keep `showModal()` behavior:

```diff
+ <IoModal open={isOpen} preventTopLayer={false} heading="Confirm">
```
