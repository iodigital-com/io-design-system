# Token Naming Conventions

This document defines canonical naming and alias rules between token paths in `docs/tokens.json` and runtime CSS custom properties in `io-components/src/global/app.css`.

## Canonical Rule

- Token path remains canonical for semantics (for example `color.semantic.red`).
- Runtime CSS variable remains canonical for compatibility where it already exists.
- Alias CSS variables MAY be introduced for discoverability and convergence.

## Alias Rule

- Alias variables must be one-way references to canonical vars.
- Required form: `--alias-var: var(--canonical-var);`
- Canonical vars must not reference aliases.

## Mapping Source

- Mapping source of truth for naming convergence checks is `docs/token-cssvar-naming-map.json`.
- Every mapping row must include:
  - `tokenPath`
  - `canonicalCssVar`
  - `aliasCssVar`
  - `status`

## Governance

- `scripts/check-token-cssvar-naming.cjs` validates mapping integrity.
- `scripts/check-token-runtime-reconciliation.cjs` validates full runtime coverage for `io-components/src/global/app.css`.
- The check runs in `npm run governance:check`.

## Runtime Reconciliation Scope (#111)

- Machine-readable source of truth for runtime variable reconciliation is `docs/token-runtime-reconciliation.json`.
- Every runtime `--io-*` custom property name declared in `io-components/src/global/app.css` must have exactly one reconciliation row.
- Allowed `disposition` values are:
  - `documented`
  - `aliased`
  - `removed`
- `aliased` entries must match `docs/token-cssvar-naming-map.json` and resolve to `var(--canonical)` as effective declarations.
- The checker fails on:
  - runtime vars missing reconciliation rows
  - stale reconciliation rows for vars no longer declared
  - duplicate runtime var rows
  - invalid disposition/schema metadata

## Current Scope (#113)

This phase intentionally scopes to known naming divergences and explicit aliases only. Full token coverage reconciliation is tracked separately.
