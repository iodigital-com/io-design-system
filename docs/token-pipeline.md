# Token Pipeline Architecture

This document describes the Figma → token → code CI pipeline introduced in issue #218.  It covers the workflow structure, extension points for wiring up a real Figma integration, and the expected token file format.

---

## Overview

```
Figma source of truth
        │
        │  (manual export or Figma Tokens / Style Dictionary webhook)
        ▼
tokens.json  ◄─────────── Extension point A (see below)
        │
        │  npm run governance:check
        ▼
Governance validation jobs
        │
        │  (all checks pass)
        ▼
npm run build
        │
        ▼
Pull request opened against main
        │
        │  PR quality gates (pr.yml) run on the sync branch
        ▼
Human review + approval (Design Ops / maintainers)
        │
        ▼
Merge to main → release.yml → npm publish
```

The GitHub Actions workflow at `.github/workflows/sync-tokens.yml` automates everything from governance validation through PR creation.  The only manual steps are the Figma export (until a webhook is configured) and the human review before merge.

---

## Workflow file

**Path:** `.github/workflows/sync-tokens.yml`

### Triggers

| Trigger | When to use |
|---------|------------|
| `workflow_dispatch` | Manual run from the GitHub Actions tab |
| `repository_dispatch` with `event-type: tokens-sync` | Automated trigger from an external CI step or webhook |

Both triggers accept an optional `branch_name` field.  When omitted the workflow generates `chore/tokens-sync-<YYYYMMDD>`.

### Jobs

```
validate ──► build ──► create-pr
```

| Job | Runs on | Purpose |
|-----|---------|---------|
| `validate` | `ubuntu-latest` | Runs every governance script.  Failure blocks the pipeline. |
| `build` | `ubuntu-latest` | Builds Stencil components and verifies asset sync. |
| `create-pr` | `ubuntu-latest` | Pushes the sync branch and opens (or updates) a PR against `main`. |

---

## Governance scripts

The `validate` job runs these scripts in order.  Each script exits non-zero on failure, immediately stopping the workflow before any PR is opened.

| Script | Checks |
|--------|--------|
| `check-token-cssvar-naming.cjs` | All `--io-*` variables follow the naming convention map in `docs/token-cssvar-naming-map.json` |
| `check-token-runtime-reconciliation.cjs` | Every `var(--io-*)` call in component `-styles.ts` files is documented in `docs/token-runtime-reconciliation.json` |
| `check-token-doc-coverage.cjs` | Every token leaf in `docs/tokens.json` maps to either an implemented or deprecated artifact |
| `check-style-literals.cjs` | No hardcoded hex, pixel, or radius values appear in component style files |
| `check-storefront-status-governance.cjs` | Component status values (`Stable`, `Beta`, `Internal`) match the governance rubric |
| `check-dark-mode-tokens.cjs` | Every semantic token that references a light-only primitive has a `[data-theme="dark"]` override |
| `check-public-css-api.cjs` | The public CSS custom property surface matches the committed snapshot in `docs/public-css-api.json` |
| `check-no-io-prefixed-events.cjs` | No custom event names carry the legacy `io` prefix |
| `agency-validate-governance.cjs` | Workspace topology invariants (package names, exports, workspace structure) |

Run them all locally before triggering the workflow:

```bash
npm run governance:check
```

---

## Token file format

Design tokens are stored in `io-components/src/global/app.css` as CSS custom properties on `:root`.  The three-tier hierarchy must be preserved:

```css
/* Tier 1 — Brand primitives  (never referenced directly by components) */
:root {
  --io-color-primary-raw: 0, 0, 210;
  --io-color-primary: #0000D2;
}

/* Tier 2 — Semantic aliases  (what components reference) */
:root {
  --io-color-action: var(--io-color-primary);
}

/* Tier 3 — Component tokens  (consumer override API) */
:root {
  --io-button-bg: var(--io-color-action);
}
```

### Naming rules

| Category | Pattern | Example |
|----------|---------|---------|
| Color primitives | `--io-color-{name}` | `--io-color-primary` |
| Spacing scale | `--io-space-{n}` | `--io-space-4` (= 16 px) |
| Typography | `--io-font-{prop}` | `--io-font-primary` |
| Borders | `--io-border-{variant}` | `--io-border-interactive` |
| Motion | `--io-motion-{name}` | `--io-motion-base` |
| Component | `--io-{component}-{prop}` | `--io-button-bg` |

Full naming rules: `docs/token-naming-conventions.md`

### JSON token file (`docs/tokens.json`)

When a token toolchain (Style Dictionary, Token Studio, etc.) generates JSON output, it must match the schema expected by `check-token-doc-coverage.cjs`.  The schema is:

```jsonc
{
  "$schema": "../docs/tokens.schema.json",
  "color": {
    "primary": {
      "$value": "#0000D2",
      "$type": "color",
      "$description": "Energetic Blue — primary brand colour"
    }
  },
  "space": {
    "4": {
      "$value": "16px",
      "$type": "dimension"
    }
  }
}
```

See `docs/tokens.json` for the current live token set.

---

## Extension points

The workflow is structured as a skeleton.  The `create-pr` job contains a clearly marked placeholder step labelled **"Placeholder: apply token changes"** that you replace when wiring up a real Figma integration.

### Extension point A — Figma Tokens / Token Studio export

Replace the placeholder step with a step that runs the Token Studio CLI or the Style Dictionary transform:

```yaml
- name: Export tokens from Figma Tokens (Token Studio)
  run: |
    npx token-studio-sd --config sd.config.json
    # Outputs updated io-components/src/global/app.css and docs/tokens.json
```

Commit the changes before the `create-pr` step pushes them.

### Extension point B — Style Dictionary transform

```yaml
- name: Transform raw Figma JSON to CSS custom properties
  run: |
    npx style-dictionary build --config style-dictionary.config.json
```

### Extension point C — Figma REST API download

```yaml
- name: Download token variables from Figma
  env:
    FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}
    FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
  run: node scripts/figma-export-tokens.mjs
```

Store `FIGMA_ACCESS_TOKEN` and `FIGMA_FILE_KEY` as GitHub repository secrets.

### Extension point D — Automated PR trigger from Figma webhook

Configure a Figma plugin or outgoing webhook to send a `repository_dispatch` event when a design file is published:

```bash
# Example: call from your webhook handler
gh api repos/{owner}/{repo}/dispatches \
  --method POST \
  --field event_type=tokens-sync \
  --field client_payload='{"branch_name":"chore/tokens-sync-auto"}'
```

---

## Secrets and environment variables

| Secret / Variable | Purpose | Required for |
|-------------------|---------|-------------|
| `GITHUB_TOKEN` | Built-in token used to open PRs and post comments | All runs (provided automatically) |
| `FIGMA_ACCESS_TOKEN` | Figma personal access token for REST API export | Extension point C |
| `FIGMA_FILE_KEY` | Figma file identifier for token export | Extension point C |

---

## Extending the governance checks

To add a new token invariant:

1. Write a new script in `scripts/check-{invariant}.cjs`.  The script must exit `0` on success and non-zero on failure, printing a human-readable error to `stdout`.
2. Add the script call to the `governance:check` npm script in `package.json`.
3. Add a step to the `validate` job in `.github/workflows/sync-tokens.yml` mirroring the existing pattern.
4. Document the check in the governance scripts table in this file and in `CONTRIBUTING.md`.

---

## PR review process

Token PRs opened by the workflow are labelled with `tokens-sync` (when the label exists in the repository).  The following approval policy applies:

| Condition | Action |
|-----------|--------|
| All governance checks passed | PR is opened and the standard `pr.yml` quality gates run |
| Any governance check failed | Workflow fails — no PR is opened |
| PR contains only `docs/last-token-sync.json` | Skeleton marker — safe to merge to verify pipeline end-to-end |
| PR contains changes to `io-components/src/global/app.css` | Requires Design Ops or `@io-design-system/maintainers` approval |

---

## Troubleshooting

### Governance check fails locally but passes in CI (or vice versa)

- Ensure you are running `npm ci` and not `npm install` — a dirty `node_modules` can cause script resolution differences.
- Regenerate derived files: `npm run build:components && npm run sync:stencil-assets`.

### The workflow opens a PR with no token changes

This is expected behaviour for the skeleton implementation.  The `docs/last-token-sync.json` marker ensures the PR always has a diff so the end-to-end pipeline can be verified.  Once a real Figma integration is wired in via the extension points above, the PR will contain actual token file changes.

### A governance script fails with "token not found in reconciliation table"

Run `npm run token-runtime:check` locally for the full error message, then add the missing token to `docs/token-runtime-reconciliation.json` following the existing schema.

### Dark-mode check fails after adding a new semantic token

Any semantic Tier 2 / Tier 3 token that resolves to a light-only primitive (e.g. a raw `#ffffff` or `--io-color-white`) needs a `[data-theme="dark"]` override in `io-components/src/global/app.css`.

---

## Related files

| File | Purpose |
|------|---------|
| `.github/workflows/sync-tokens.yml` | The Figma Token Sync workflow |
| `.github/workflows/pr.yml` | PR quality gates that run on the sync branch |
| `io-components/src/global/app.css` | Authoritative CSS custom property definitions |
| `docs/tokens.json` | Token registry consumed by governance scripts |
| `docs/token-runtime-reconciliation.json` | Maps every runtime `var(--io-*)` to its definition |
| `docs/token-naming-conventions.md` | Human-readable naming rules |
| `docs/public-css-api.json` | Committed snapshot of the public CSS API surface |
| `scripts/check-token-*.cjs` | Individual token governance scripts |
| `CONTRIBUTING.md#token-pipeline` | Contributor-facing summary of this pipeline |
