# Component Stability Recommendations (Issues #96, #99, #100, #101)

This document records evidence-backed stability recommendations for remaining beta components in the beta-to-stable epic.

## Validation Evidence

Commands run for this initiative:

- `npm run governance:check`
- `npm run test`
- `npm run build:quality-gates`

Additional targeted evidence:

- Pagination interaction, boundary, accessibility, and invalid-prop guard assertions:
  - `io-components/src/components/io-pagination/io-pagination.spec.ts`
  - `io-components/src/components/io-pagination/io-pagination.click.spec.ts`
  - `io-components/src/components/io-pagination/io-pagination.disabled.spec.ts`
- Carousel navigation synchronization and keyboard/button accessibility assertions:
  - `io-components/src/components/io-carousel/io-carousel.spec.ts`
  - `io-components/src/components/io-carousel/io-carousel.keyboard.spec.ts`
- Carousel documented keyboard strategy decision:
  - `io-storefront/src/app/components/io-carousel/accessibility/page.tsx`

## Recommendation Matrix

| Component | Current Status | Evidence Collected | Recommendation | Rationale |
|---|---|---|---|---|
| `io-pagination` | `stable` ✅ (promoted) | Expanded event, boundary, range/ellipsis, aria, and invalid-prop coverage in component specs | **Promoted to `stable`** | Promotion executed — status updated in `io-storefront/src/sitemap.ts` |
| `io-carousel` | `beta` | Expanded navigation/rewind/sync tests and keyboard button contract coverage; explicit accessibility strategy documented | **Hold at beta** | Drag remains pointer-only by deliberate decision (Option B). Button navigation is accessible, but drag parity is intentionally deferred |
| `io-accordion` | `stable` ✅ (promoted) | Full spec suite: `.spec.ts`, `.click.spec.ts`, `.disabled.spec.ts`, `.a11y.spec.ts`; `io-accordion-utils.spec.ts` and `io-accordion.render.spec.ts` added in PR #375 (size prop) expanded coverage beyond the baseline that originally triggered the hold | **Promoted to `stable`** | Hold condition closed — utils and render specs added in PR #375 provide promotion-readiness coverage; status updated in `io-storefront/src/sitemap.ts` |
| `io-button-group` | `stable` ✅ (promoted) | Full spec suite: `.spec.ts`, `.click.spec.ts`, `.disabled.spec.ts`, `.a11y.spec.ts`, `io-button-group-utils.spec.ts`, `.keyboard.spec.ts`, `.lifecycle.spec.ts` | **Promoted to `stable`** | Promotion executed — comprehensive spec coverage including utils, keyboard, and lifecycle; status updated in `io-storefront/src/sitemap.ts` |
| `io-divider` | `stable` ✅ (promoted) | Full spec suite: `.spec.ts`, `.click.spec.ts`, `.disabled.spec.ts`, `.a11y.spec.ts` | **Promoted to `stable`** | Promotion executed — full standard spec coverage present; status updated in `io-storefront/src/sitemap.ts` |
| `io-form-field` | `stable` ✅ (promoted) | All 5 storefront pages complete; `.a11y.spec.ts`, `.lifecycle.spec.ts`, `.spec.ts` all present and passing; `IoFormFieldSlotName` union type added in `types.ts`; governance and quality gates green | **Promoted to `stable`** | PR #374 — `IoFormFieldSlotName` type added for tooling consistency; a11y validation complete; status updated in `io-storefront/src/sitemap.ts` |
| `io-avatar` | `stable` ✅ (promoted) | `io-avatar.spec.ts`, `io-avatar.a11y.spec.ts` (uses `renderAndCheckA11y`); `io-avatar.click.spec.ts` and `io-avatar.disabled.spec.ts` added in PR #391; hardcoded px/font-size/border-radius replaced with `var(--io-avatar-*)` tokens in PR #391 | **Promoted to `stable`** | All spec files complete, styles fully tokenised, no open critical bugs |
| `io-breadcrumb` | `stable` ✅ (promoted) | `io-breadcrumb.spec.ts`, `io-breadcrumb.a11y.spec.ts`; `io-breadcrumb.click.spec.ts` and `io-breadcrumb.disabled.spec.ts` added in PR #392; hardcoded hex fallbacks and bare `px` values removed from `io-breadcrumb-styles.ts` and `io-breadcrumb-item-styles.ts` in PR #392 | **Promoted to `stable`** | All spec files complete, styles fully tokenised, no open critical bugs |
| `io-breadcrumb-item` | `stable` ✅ (promoted) | Sub-component of `io-breadcrumb`; promoted together as part of breadcrumb stable promotion in PR #392 | **Promoted to `stable`** | Travels with parent `io-breadcrumb` — shared fix PR covers styles and tests |
| `io-checkbox-group` | `stable` ✅ (promoted) | `io-checkbox-group.spec.ts`, `io-checkbox-group.a11y.spec.ts`; `io-checkbox-group.click.spec.ts` (change event + disabled guard) and `io-checkbox-group.disabled.spec.ts` (syncChildren propagation) added in PR #388; naked px fallbacks removed from `io-checkbox-group-styles.ts` in PR #388 | **Promoted to `stable`** | All spec files complete, styles fully tokenised, no open critical bugs |
| `io-drawer` | `stable` ✅ (promoted) | `io-drawer.spec.ts`, `io-drawer.click.spec.ts`, `io-drawer.a11y.spec.ts`, `io-drawer.lifecycle.spec.ts`; width tokens (`--io-drawer-width-sm/md/lg`) and `--io-backdrop` added to `app.css` in PR #389; hardcoded `320px`/`480px`/`640px` and `rgba(0,0,0,0.5)` replaced in PR #389 | **Promoted to `stable`** | All spec files complete, styles fully tokenised, no open critical bugs |
| `io-progress` | `stable` ✅ (promoted) | Full spec suite: `.spec.ts`, `.a11y.spec.ts`, `io-progress-utils.spec.ts` | **Promoted to `stable`** | Promotion executed — spec coverage including utils spec; status updated in `io-storefront/src/sitemap.ts` |
| `io-radio-group` | `stable` ✅ (promoted) | `io-radio-group.spec.ts`, `io-radio-group.a11y.spec.ts`; `io-radio-group.click.spec.ts` (change event + disabled guard) and `io-radio-group.disabled.spec.ts` (syncChildren propagation) added in PR #388; styles already fully tokenised | **Promoted to `stable`** | All spec files complete, styles fully tokenised, no open critical bugs |
| `io-stepper` | `stable` ✅ (promoted) | `io-stepper.spec.ts`, `io-stepper.a11y.spec.ts`; `--io-stepper-circle-size`, `--io-stepper-connector-thickness`, `--io-stepper-connector-offset` tokens added to `app.css`; hardcoded `2rem`/`1rem`/`2px` values replaced in PR #393 | **Promoted to `stable`** | All spec files complete, styles fully tokenised, no open critical bugs |
| `io-table` | `stable` ✅ (promoted) | `io-table.spec.ts` plus sub-component specs (`io-table-head-cell`, `io-table-head-row`, `io-table-body-row` each have `.spec.ts`, `.click.spec.ts`, `.a11y.spec.ts`); `io-table.click.spec.ts` added in PR #388 documenting delegation pattern; styles token-only | **Promoted to `stable`** | All spec files complete, delegation-pattern documented, styles fully tokenised, no open critical bugs |
| `io-wordmark` | `stable` ✅ (promoted) | `io-wordmark.spec.ts`, `io-wordmark.a11y.spec.ts`; `--io-wordmark-size-md/lg/xl` and `--io-wordmark-letter-spacing` tokens added to `app.css`; bare `px`/`em` values replaced in `io-wordmark-styles.ts` in PR #389 | **Promoted to `stable`** | All spec files complete, styles fully tokenised, no open critical bugs |
| `io-alert` | `beta` | `.spec.ts`, `.click.spec.ts`, `.a11y.spec.ts` suite complete; 4 variants; dismissible button event | **Hold at beta** | New in Wave XI; needs production hardening |
| `io-multi-select` | `beta` | Full FACE suite: `.spec.ts`, `.click.spec.ts`, `.disabled.spec.ts`, `.a11y.spec.ts`, `.face.spec.ts`; filter mode; chip removal | **Hold at beta** | New in Wave XI; complex interaction model; needs field use |
| `io-pin-code` | `beta` | Full FACE suite; keyboard nav; paste distribution; password masking | **Hold at beta** | New in Wave XI; needs production hardening |
| `io-popover` | `beta` | `.spec.ts`, `.click.spec.ts`, `.a11y.spec.ts`, utils spec; Popover API + dialog role | **Hold at beta** | New in Wave XI; Popover API still gaining browser support |
| `io-scroller` | `beta` | `.spec.ts`, `.a11y.spec.ts`; edge fade indicators | **Hold at beta** | New in Wave XI; needs production hardening |
| `io-switch` | `beta` | Full FACE suite; role=switch; keyboard nav | **Hold at beta** | New in Wave XI; needs production hardening |
| `io-tabs-bar` | `stable` | `.spec.ts`, `.click.spec.ts`, `.a11y.spec.ts`; standalone navigation | **Promote to stable** | Wave J audit: no P0/P1 blockers found; click.spec added (#474); aria-controls requirement documented (#478); all quality gates pass |
| `io-text` | `beta` | `.spec.ts`, `.a11y.spec.ts`; token-driven typography | **Hold at beta** | New in Wave XI; needs production hardening |
| `io-heading` | `beta` | `.spec.ts`, `.a11y.spec.ts`; decoupled visual/semantic size | **Hold at beta** | New in Wave XI; needs production hardening |

## Notes

- Status changes must follow the rubric in `docs/storefront-status-governance.md`.
- Any status transition must be updated in `io-storefront/src/sitemap.ts` and reviewed via governance checks.
