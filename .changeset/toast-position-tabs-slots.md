---
'@io-digital/components': minor
---

feat(io-toast): add `position` prop supporting 6 placement variants (top-start, top-center, top-end, bottom-start, bottom-center, bottom-end); `persistent` flag + error-variant toasts no longer auto-dismiss; ARIA role switches to `alertdialog`/`assertive` for persistent toasts

feat(io-tabs): add `gap` between icon and label children via `--io-tabs-icon-gap` token; new `--io-tabs-icon-size` token; `applyAriaToButtons` strips badge text (`[data-slot="badge"]`) from computed aria-label
