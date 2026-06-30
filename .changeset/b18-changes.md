---
"@iodigital-com/components": patch
---

Add implicit form submission on Enter key for all io form-field inputs. Creates a shared `implicitSubmit` utility in `utils/form/implicit-submit.ts` that walks the associated form's submit controls (native and `io-button[type=submit]`) and wires it into `io-input`, `io-input-password`, `io-input-search`, `io-input-date`, and `io-pin-code` via `onKeyDown`. Textarea supports Ctrl+Enter for submission while plain Enter continues to insert newlines.
