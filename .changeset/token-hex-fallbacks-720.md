---
"@iodigital-com/components": patch
---

fix(tokens): remove hardcoded hex fallbacks from component styles

Strips the terminal hex fallback values from all `var(--io-*, #hex)` patterns across
io-form-field, io-input, io-radio, io-select, io-stepper, io-textarea, and io-wordmark
styles. Uses bare `var(--io-token)` references, relying on design-token definitions
always being present at runtime. Also renames `--io-border-radius-full` →
`--io-border-radius-pill` in io-stepper to align with the current token name.
