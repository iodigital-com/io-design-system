---
"@iodigital-com/components": minor
---

feat(forms): description/warning parity, readOnly normalization, aria prop bags

- **io-multi-select** (#910): add `warning` state, `helperText` prop, and `description` prop for parity with io-select
- **io-select** (#918): add `slot="selected"` inside the combobox trigger so consumers can render custom selected-value UI
- **io-input, io-input-password, io-input-search, io-input-date** (#919): normalize `readOnly` prop to camelCase (was `readonly` — breaking for direct attribute binding, but correct Stencil convention)
- **io-input** (#927): add `description` prop for a persistent supplementary text paragraph below the field
- **io-input-password, io-input-search, io-input-date** (#943): add `aria` prop bag (`Record<string, string>`) to inject custom ARIA attributes onto the native `<input>` element via `applyAriaProp()`
