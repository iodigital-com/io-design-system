# Curated Agency Agents for IO Design System

This folder is the Curated source of truth for AI governance in `io-design-system`.

## Managed Files

- `curated-io-design-system.json`: exactly 9 curated agent source paths for this project.
- `curated-io-design-system-copilot.json`: exactly 12 high-signal daily default source paths for repo-local GitHub Copilot agents.
- `curated-io-design-system-copilot-extended.json`: exactly 14 on-demand extended source paths for repo-local GitHub Copilot agents.
- `ADAPTATION_LAYER.md`: io-specific behavioral guardrails for agent sessions.

## Install Curated Claude Agents

Install the managed set into `~/.claude/agents`:

```bash
npm run agents:install:claude
```

Optional:

```bash
node scripts/install-curated-agency-claude.cjs --ref main
node scripts/install-curated-agency-claude.cjs --dry-run
```

The installer:

1. Reads `curated-io-design-system.json`.
2. Pulls only those upstream sources from `msitarzewski/agency-agents`.
3. Replaces managed `io-ds-*.md` files deterministically.

## Sync Repo-Local GitHub Copilot Agents

Sync the high-signal daily default set into `.github/agents`:

```bash
npm run agents:sync:copilot
```

Optional:

```bash
node scripts/sync-curated-agency-copilot.cjs --ref main
node scripts/sync-curated-agency-copilot.cjs --dry-run
```

The Copilot sync:

1. Reads `curated-io-design-system-copilot.json`.
2. Pulls only the curated upstream sources from `msitarzewski/agency-agents`.
3. Prepends `ADAPTATION_LAYER.md` guardrails into each managed profile.
4. Replaces managed `io-ds-*.md` files in `.github/agents` deterministically.

## Sync Extended On-Demand GitHub Copilot Agents

Sync the extended on-demand set into `.github/agents` alongside the daily default:

```bash
npm run agents:sync:copilot-extended
```

Optional:

```bash
node scripts/sync-curated-agency-copilot-extended.cjs --ref main
node scripts/sync-curated-agency-copilot-extended.cjs --dry-run
```

Extended agents are prefixed `io-ds-ext-` and coexist with daily `io-ds-` agents in `.github/agents`.

## Verify Copilot Agent Drift

Verify `.github/agents` matches the curated daily manifest exactly (also enforced by `governance:check`):

```bash
npm run agents:check:copilot-drift
```

Verify extended agents match the extended manifest:

```bash
npm run agents:check:copilot-extended-drift
```

Both drift checks validate source ordering, destination mapping, and sha256 file hashes against their respective managed manifests.

## Governance Gate

Run:

```bash
npm run governance:check
```

The gate verifies:

1. Workspace topology and dependency invariants are preserved.
2. Curated governance files and installer script are present and valid.
3. Copilot curated files and sync script are present and valid.
4. Deprecated local skill/config paths have been removed.
5. Legacy references to `.claude/skills` and `ui-ux-pro-max` are absent.

## CI Status

CI is active — the `pr.yml` workflow enforces all quality gates on every PR targeting `main`.
Run local quality gates before contributing:

```bash
npm run governance:check
npm run build
npm run test
npm run type-check
npm run build:storefront
```
