---
"@iodigital-com/components": minor
---

feat(io-modal): add `preventTopLayer` prop for React 18 compatibility

Adds a new boolean prop `preventTopLayer` (default `false`) that opens
the native `<dialog>` with `show()` instead of `showModal()`. This
prevents the element from entering the browser top layer and fixes a
React 18 event-delegation incompatibility.

### Background

`showModal()` promotes the `<dialog>` to the browser top layer — a
separate rendering layer that sits above all CSS stacking contexts.
React 18 delegates synthetic events to the root container (`#root`).
Composed click events from shadow-DOM children inside a top-layer dialog
do not reliably bubble to the React root, causing slotted footer buttons
(`slot="footer"`) to appear unclickable.

### Usage

```html
<!-- React 18 / framework wrappers -->
<io-modal open prevent-top-layer heading="Confirm action">
  <p>Are you sure?</p>
  <io-button slot="footer" variant="ghost">Cancel</io-button>
  <io-button slot="footer">Confirm</io-button>
</io-modal>
```

```tsx
// React 18 JSX (components-react wrapper)
<IoModal open={isOpen} preventTopLayer heading="Confirm action">
  <p>Are you sure?</p>
  <IoButton slot="footer" variant="ghost" onClick={onCancel}>Cancel</IoButton>
  <IoButton slot="footer" onClick={onConfirm}>Confirm</IoButton>
</IoModal>
```

When `preventTopLayer` is `true`:
- `show()` is used instead of `showModal()` — dialog stays in normal flow
- The host element becomes the backdrop container (position:fixed, rgba overlay)
- Focus trap, `inert` management, and `dismiss` event all work identically
- Defaults to `false` — no behaviour change for existing consumers
