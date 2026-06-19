# io Design System — Claude Instructions

Stencil 4 Web Component library for iO Digital. Published as `@iodigital-com/components`.
Auto-generates React, Vue, Angular wrappers. Docs site: Next.js 15 static export.

## Read these rule files

Detailed rules live in `.claude/rules/`. Read the relevant file before acting on any task.

| File | When to read |
|---|---|
| `.claude/rules/00-north-star.md` | Every session — anti-slop contract, model assignment |
| `.claude/rules/10-never-do-list.md` | Any component or storefront change — hard anti-drift guards |
| `.claude/rules/20-component-authoring.md` | Creating or modifying Stencil components |
| `.claude/rules/30-testing.md` | Writing or fixing specs |
| `.claude/rules/40-storefront.md` | Storefront pages, stories, configurators |
| `.claude/rules/50-git-and-changesets.md` | Commits, PRs, changesets |
| `.claude/rules/60-agent-orchestration.md` | When to spawn which subagent |

Full governance reference: `AGENTS.md` (canonical, more detailed than this file).

## Quick reference

### Commands
```bash
npm run dev                   # Stencil watch + storefront localhost:3000
npm run build                 # Core + all wrappers
npm run test                  # Vitest
npm run governance:check      # Run before every commit
npm run build:quality-gates   # Full CI pipeline
npm run changeset:add         # Required for published-package changes
```

### Token inventory
- Primary: `--io-color-primary: #0000D2`
- Font: `--io-font-primary: 'Manrope', sans-serif`
- Focus: `--io-focus-inner: #7D0034` / `--io-focus-outer: #FFE4EE`
- WCAG 1.4.11 border: `--io-border-interactive: #767676`
- Spacing: `--io-space-1`=4px → `--io-space-4`=16px

### Component inventory (39 beta)
io-accordion, io-avatar, io-badge, io-banner, io-breadcrumb, io-button, io-button-group,
io-carousel, io-checkbox, io-checkbox-group, io-divider, io-drawer, io-heading, io-icon,
io-inline-notification, io-input, io-link, io-modal, io-multi-select, io-pagination,
io-pin-code, io-popover, io-progress, io-radio, io-radio-group, io-scroller, io-select,
io-spinner, io-stepper, io-switch, io-table, io-tabs, io-tabs-bar, io-tag, io-text,
io-textarea, io-toast, io-tooltip, io-wordmark

### Project-local agents
`.claude/agents/io-component-author` · `io-storefront-author` · `io-code-reviewer` · `io-a11y-auditor` · `io-minimal-change` · `io-reality-checker`
