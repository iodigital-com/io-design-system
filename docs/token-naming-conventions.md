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
- `scripts/check-token-doc-coverage.cjs` validates that every leaf token in `docs/tokens.json` is classified as implemented or deprecated.
- These checks run in `npm run governance:check`.

## Token Coverage Scope (#112)

- Implemented token mappings are tracked in `docs/token-cssvar-implemented-map.json`.
- Deprecated/docs-only token entries are tracked in `docs/token-deprecated-unused.json`.
- Every leaf token path in `docs/tokens.json` must appear in exactly one of those two artifacts.
- Deprecated/docs-only entries must include explicit rationale and `reviewAfter` date.

## Literal Exception Policy (#108/#109)

- Approved remaining style literals are tracked in `docs/style-literal-allowlist.json`.
- Every allowlist entry must include file path, literal, rationale, and `reviewAfter` date.
- Exceptions are temporary and must be reviewed or removed by the specified date.

## Dark Theme Token Model (#110)

- Dark theme source values are documented in `docs/tokens.json` under `color.dark.*`.
- Runtime variables in `io-components/src/global/app.css` expose those values as `--io-color-dark-*` variables.
- `[data-theme="dark"]` semantic aliases (`--io-bg-*`, `--io-text-*`, `--io-border-*`, `--io-accent*`) must resolve via `var(--io-color-dark-*)` references, not raw literals.

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
  - entry integrity violations (`tokenPath`, `canonicalCssVar`, `documentationScope` constraints)
  - alias consistency mismatches with `docs/token-cssvar-naming-map.json`

## Current Scope (#113)

Issue #113 remains scoped to naming divergences and explicit alias integrity in `docs/token-cssvar-naming-map.json`.
Issue #111 adds full reconciliation coverage for runtime `--io-*` declarations in `io-components/src/global/app.css` via `docs/token-runtime-reconciliation.json`.
Broader semantic token harmonization beyond runtime declarations remains tracked separately.
