# Storefront Status Governance

This document defines the canonical maturity model for components in the storefront.

## Canonical Status Model

Allowed values are:

- `beta`
- `stable`
- `deprecated`

The source of truth for status is `io-storefront/src/sitemap.ts`.

## Rendering Contract

- `StatusBadge` is the canonical status renderer: `io-storefront/src/components/StatusBadge.tsx`.
- Storefront surfaces must consume status from sitemap-derived metadata.
- Status literals must not be hardcoded in homepage datasets or component page layouts.

## Promotion and Demotion Rubric

### Promote `beta` -> `stable`

A component may be promoted when all are true:

- Unit test baseline is complete: render + event behavior + disabled-state coverage.
- API and prop contracts are explicitly covered by tests.
- No unresolved high-impact accessibility blockers.
- Quality gates pass: `governance:check`, `events:guard`, `build`, `test`, `type-check`, `build:storefront`.
- Recommendation is documented with evidence.

### Demote `stable` -> `beta`

Demote when at least one is true:

- Regressions in API/event behavior without reliable mitigation.
- Significant accessibility blocker discovered and unresolved.
- Governance or quality gates repeatedly fail due to component-level defects.

### Mark `deprecated`

Use only when there is:

- A supported replacement path, and
- A documented migration note, and
- Consumer impact review completed.

## Ownership and Approval Workflow

- Proposal owner: component maintainer or issue assignee.
- Required reviewers:
  - 1 component maintainer
  - 1 storefront/governance reviewer
- Approval artifact:
  - PR description must include recommendation and evidence.
- Final change location:
  - Update status in `io-storefront/src/sitemap.ts` only.

## Tooling Enforcement

Status-model drift is validated by:

- `npm run status-governance:check`
- `npm run governance:check`

The checker ensures:

- Only canonical statuses are used.
- `StatusBadge` remains the canonical renderer.
- Homepage and targeted component layouts do not hardcode status literals.
