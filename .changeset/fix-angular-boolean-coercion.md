---
"@io-digital/components": patch
---

fix(io-button): add reflect: true to hideLabel prop so Angular static attribute pattern works correctly

fix(io-input,io-select,io-textarea,io-multi-select,io-pin-code,io-button): coerce empty-string to true for boolean props in Angular proxy, fixing hideLabel and other boolean props when used as static attributes
