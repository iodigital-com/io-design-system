---
'@iodigital-com/components': patch
---

refactor(io-input,io-modal): extract shared input-base and dialog-utils helpers

Introduces two internal utility modules with no public API changes:

- `src/utils/input-base.tsx` — shared state icons, wrapper class builder, describedBy builder, and below-field message tree used by io-input, io-input-password, io-input-search, and io-input-date.
- `src/utils/dialog-utils.ts` — shared focusable element query, scroll lock, inert sibling management, and focus trap attach/detach used by io-modal, io-drawer, io-flyout, and io-sheet.

No component props, events, slots, or behaviors were changed.
