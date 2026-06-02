---
"@iodigital-com/components-angular": minor
---

Add `IoComponentsAngularModule` barrel module and migrate build to ng-packagr

**New export:** `IoComponentsAngularModule` — a single NgModule that registers all 50 iO DS Angular proxy components. Import it once instead of cherry-picking individual component classes.

```ts
// Before
import { IoButton, IoButtonGroup, IoInput } from '@iodigital-com/components-angular'

// After
import { IoComponentsAngularModule } from '@iodigital-com/components-angular'
```

Works for standalone components (Angular v17+) and NgModule-based apps.

**Build:** Migrated from `tsc` to `ng-packagr` so all proxy classes now emit Angular Ivy `ɵcmp` metadata — eliminating `NG6003` errors when using the module in consumer apps.

**Peer dependencies:** Removed `<21.0.0` upper cap — now supports Angular 17 and above.
