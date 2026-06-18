---
"@iodigital-com/components": minor
---

fix(io-textarea): restore focus ring, add formDisabledCallback, extend resize type (#658)

- Fixes WCAG 2.4.11: textarea :focus-visible now applies --io-focus-ring-active (was zeroing box-shadow)
- Adds formDisabledCallback for fieldset-level disable propagation (FACE contract)
- Adds formStateRestoreCallback for browser session restore / autocomplete (FACE contract)
- Extends IoTextareaResize to include 'horizontal' and 'both' values
