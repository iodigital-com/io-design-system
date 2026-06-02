---
"@iodigital-com/components-angular": patch
---

fix(angular): add explicit resolution fields to root package.json

Adds `main`, `module`, `types`, and `exports` to the root `package.json`
pointing to the ng-packagr dist output. This ensures both published
consumers (via `publishConfig.directory`) and local workspace consumers
(via `file:` symlinks) always resolve the correct compiled entry point —
eliminating the fallback to raw TypeScript source that caused
`InvalidCharacterError: createElementNS '[object Object]'` in Angular 21.

Also adds `scripts/verify-angular-build.mjs` which is run automatically
after every `build:wrapper:angular` invocation, checking that all fields
in `package.json` resolve to real files in `dist/`. This makes resolution
breakage impossible to miss in CI.
