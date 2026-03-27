# Curated Agency Agents for IO Design System

This folder is the Curated source of truth for AI governance in `io-design-system`.

## Managed Files

- `curated-io-design-system.json`: exactly 9 curated agent source paths for this project.
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

## Governance Gate

Run:

```bash
npm run governance:check
```

The gate verifies:

1. Workspace topology and dependency invariants are preserved.
2. Curated governance files and installer script are present and valid.
3. Deprecated local skill/config paths have been removed.
4. Legacy references to `.claude/skills` and `ui-ux-pro-max` are absent.

## CI Status

CI is intentionally disabled in this migration phase. Run local quality gates before contributing:

```bash
npm run governance:check
npm run build
npm run test
npm run type-check
npm run build:storefront
```
