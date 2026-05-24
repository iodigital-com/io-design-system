---
'@io-digital/components': minor
---

fix(wave-xi): standardize error prop naming across io-form-field, io-checkbox-group, io-radio-group (#328)

**Breaking change for Beta consumers:**

`io-form-field`:
- Renamed prop `errorText` → `errorMessage` (aligns with io-input/io-checkbox standard)
- Renamed prop `invalid` → `error` (aligns with io-input/io-checkbox standard)

`io-checkbox-group`:
- Renamed prop `invalid` → `error`
- Added new prop `errorMessage: string | undefined` — renders an accessible error paragraph below the group when `error=true` and `errorMessage` is non-empty

`io-radio-group`:
- Renamed prop `invalid` → `error`
- Added new prop `errorMessage: string | undefined` — renders an accessible error paragraph below the group when `error=true` and `errorMessage` is non-empty

All three components now follow the same convention as stable components `io-input` and `io-checkbox`: `error: boolean` + `errorMessage: string | undefined`.
