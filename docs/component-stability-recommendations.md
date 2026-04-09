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
| `io-pagination` | `beta` | Expanded event, boundary, range/ellipsis, aria, and invalid-prop coverage in component specs | **Promote candidate** (eligible for `stable`) | Behavior and accessibility expectations are now explicitly asserted with guard coverage and passing gates |
| `io-carousel` | `beta` | Expanded navigation/rewind/sync tests and keyboard button contract coverage; explicit accessibility strategy documented | **Hold at beta** | Drag remains pointer-only by deliberate decision (Option B). Button navigation is accessible, but drag parity is intentionally deferred |
| `io-accordion` | `beta` | Existing baseline tests and status governance alignment checks | **Hold at beta** | No dedicated promotion-readiness expansion was completed in this batch; keep status until follow-up validation closes |

## Notes

- Status changes must follow the rubric in `docs/storefront-status-governance.md`.
- Any status transition must be updated in `io-storefront/src/sitemap.ts` and reviewed via governance checks.
