---
"@iodigital-com/components": patch
---

fix(tokens): remove hardcoded hex fallbacks from component styles

Strips the terminal hex fallback values (e.g. `#FFFFFF`, `#000000`, `#0000D2`,
`#1a7f4b`, `#b45309`, `#e5e5e5`, `#666`, `#999`, `#111`) from all `var(--io-*, #hex)`
and `var(--io-*, var(--io-alias, #hex))` patterns across io-form-field, io-input,
io-radio, io-select, io-stepper, io-textarea, and io-wordmark styles.

The CSS custom property references are kept as-is (bare `var(--io-token)` with no
fallback), relying on the design-token definitions always being present at runtime.
Also renames `--io-border-radius-full` → `--io-border-radius-pill` in io-stepper
to align with the current token name.
