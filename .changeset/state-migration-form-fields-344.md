---
"@io-digital/components": major
"@io-digital/components-react": major
"@io-digital/components-vue": major
"@io-digital/components-angular": major
---

**BREAKING CHANGE**: Migrate form-field validation from `error: boolean` + `errorMessage: string` to `state: IoFieldState` + `message: string` across 6 form-field components (io-input, io-textarea, io-select, io-checkbox, io-radio, io-form-field).

### Migration guide

Replace:
```html
<io-input error error-message="Required" />
<io-select error error-message="Please select" />
<io-textarea error error-message="Required" />
<io-checkbox error error-message="Required" />
<io-radio error error-message="Please select" />
<io-form-field error error-message="Invalid" />
```

With:
```html
<io-input state="error" message="Required" />
<io-select state="error" message="Please select" />
<io-textarea state="error" message="Required" />
<io-checkbox state="error" message="Required" />
<io-radio state="error" message="Please select" />
<io-form-field state="error" message="Invalid" />
```

The new `state` prop also accepts `"success"` and `"warning"` values for richer validation feedback.
