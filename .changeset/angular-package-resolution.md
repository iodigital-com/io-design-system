---
"@iodigital-com/components-angular": patch
---

fix(angular): strengthen wrapper resolution verification for build and publish

Hardens `scripts/verify-angular-build.mjs` to fail fast when required
resolution fields are missing and to reject path traversal/out-of-package
references before checking file existence.

Also wires the same verifier into `@iodigital-com/components-angular`
`prepack` so direct package packing/publishing cannot bypass the check.
