---
"@iodigital-com/components": patch
---

fix(io-input): standardise counter SR wording to "{n} of {max} characters" and remove setTimeout debounce (#921); consolidate three duplicate state-message `<p>` blocks into a single element with role driven by state (#1167); unify FACE/error rendering across io-input-password, io-input-search, and io-input-date by merging faceInvalid into showError and removing the separate double-rendered error block (#922); make reportValidity() set touched=true so FACE errors surface before blur on programmatic calls (#1168); deprecate lowercase `autocomplete` prop on io-input and add canonical camelCase `autoComplete` to io-textarea (#1146).
