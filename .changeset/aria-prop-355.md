---
'@io-digital/components': minor
---

feat(components): add `aria` prop for custom ARIA attribute injection

Adds `aria?: Record<string, string>` prop to `io-button`, `io-input`, `io-textarea`, `io-select`, `io-modal`, and `io-drawer`.

- Keys may omit or include the `aria-` prefix — both forms normalised: `{ controls: 'panel' }` → `aria-controls="panel"`
- Keys with `aria-` prefix pass through as-is: `{ 'aria-controls': 'panel' }` → `aria-controls="panel"`
- Unknown keys are logged as `console.warn` in non-production environments
- Applied via `@Watch('aria')` handler — no wasted render cycles
- On `io-select`: applies to `<select>` in native mode, to `<button>` trigger in custom combobox mode
- On `io-modal` and `io-drawer`: applies to the native `<dialog>` element
- Shared implementation via `applyAriaProp` utility in `src/utils/aria-prop.ts`
