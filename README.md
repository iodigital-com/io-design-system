# io Design System

io Design System is iO Digital's cross-framework component platform.

It provides one source of truth for UI components using Stencil Web Components, then generates framework wrappers for React, Vue, and Angular. This repository also contains a private storefront used for internal documentation, usage examples, API reference, and design-token visibility.

## What This Repository Does

This repository is responsible for all of the following:

1. Building and testing production web components under the io namespace.
2. Generating wrapper libraries so product teams can consume the same components in React, Vue, and Angular.
3. Maintaining a static Next.js documentation storefront for component docs and examples.
4. Enforcing governance and quality gates for API surface, design tokens, bundle size, accessibility, and release hygiene.
5. Publishing versioned packages under the io-digital scope to GitHub Packages.

## Repository Contents

| Package/Area | Name | Purpose | Published |
|---|---|---|---|
| Stencil core | @io-digital/components | Source of truth for all components and tokens | Yes |
| React wrappers | @io-digital/components-react | Auto-generated React wrappers around core components | Yes |
| Vue wrappers | @io-digital/components-vue | Auto-generated Vue wrappers around core components | Yes |
| Angular wrappers | @io-digital/components-angular | Auto-generated Angular wrappers around core components | Yes |
| Storefront | @io-digital/storefront | Internal docs/playground site | No (private) |
| Scripts | scripts/ | Governance checks, sync helpers, automation | N/A |
| Docs artifacts | docs/ | API snapshots, governance docs, token docs | N/A |

## Component Catalog

Current component set (22):

- io-accordion
- io-badge
- io-button
- io-button-group
- io-carousel
- io-checkbox
- io-divider
- io-input
- io-link
- io-modal
- io-optgroup
- io-option
- io-pagination
- io-radio
- io-select
- io-spinner
- io-tabs
- io-tag
- io-textarea
- io-toast
- io-toast-item
- io-tooltip

Component status (Stable or Beta) is governed in storefront status docs and rendered in the component pages.

## Technology Stack

- Stencil 4 for web component authoring.
- TypeScript (strict patterns).
- Vitest for unit and render coverage.
- Next.js 16 for internal storefront docs.
- npm workspaces for monorepo orchestration.
- GitHub Packages for scoped distribution.
- GitHub Actions for release automation.

## Browser Support

This system targets modern evergreen browsers:

- Chrome (latest)
- Edge (latest)
- Firefox (latest)
- Safari (latest)

Internet Explorer and other legacy browsers are out of scope.

## Architecture and Source-of-Truth Rules

1. All component behavior changes must happen in the Stencil core under io-components/src/components.
2. React, Vue, and Angular wrappers are generated outputs and should not be hand-maintained.
3. Design token ownership is in io-components/src/global/app.css.
4. Storefront remains static-export compatible and consumes generated assets/types.
5. Public events use canonical names only. io-prefixed public event names are blocked.

## Quick Start (Local Development)

### Prerequisites

- Node 20 or newer.
- npm (bundled with Node).

### Install

```bash
git clone https://github.com/iodigital-com/io-design-system.git
cd io-design-system
npm ci
```

### Run local dev

```bash
npm run dev
```

This starts Stencil watch mode and the storefront. The storefront is available at http://localhost:3000.

## Repository Structure

```text
io-design-system/
  io-components/                  # Stencil core package (source of truth)
    src/components/               # Component implementations
    src/global/app.css            # Global design tokens
    src/global/app.ts             # Global app behavior
  io-components-react/            # Generated React wrappers
  io-components-vue/              # Generated Vue wrappers
  io-components-angular/          # Generated Angular wrappers
  io-storefront/                  # Private Next.js docs site
  docs/                           # API snapshots, token docs, governance docs
  scripts/                        # Tooling, governance checks, sync automation
  .github/workflows/              # CI and release workflows
```

## Command Reference

All commands below run from repository root unless stated otherwise.

### Daily development commands

```bash
npm run dev
npm run build
npm run test
npm run type-check
npm run lint
```

### Granular build commands

```bash
npm run build:components
npm run build:wrapper:react
npm run build:wrapper:vue
npm run build:wrapper:angular
npm run build:wrappers
npm run build:storefront
npm run build:storefront:release
```

### Governance and safety checks

```bash
npm run governance:check
npm run events:guard
npm run api:check
npm run sync:stencil-assets:check
npm run token-naming:check
npm run token-runtime:check
npm run token-doc-coverage:check
npm run style-literals:check
npm run status-governance:check
```

### Quality and compliance checks

```bash
npm run size
npm run lighthouse:ci
npm run security:audit
npm run type-coverage
```

### Full gate command

```bash
npm run build:quality-gates
```

This runs the complete release-grade sequence:

1. governance:check
2. events:guard
3. lint
4. build
5. api:check
6. sync:stencil-assets:check
7. size
8. test
9. type-coverage
10. type-check
11. build:storefront
12. lighthouse:ci
13. security:audit

### Token documentation pipeline

```bash
npm run tokens:scrape
npm run tokens:scrape:resume
npm run tokens:merge
npm run tokens:html
npm run tokens:sync
```

These generate and synchronize token docs artifacts under docs/.

## How To Consume The Design System

Packages are published to GitHub Packages under the io-digital scope.

### Consumer .npmrc setup

Create project-level .npmrc:

```ini
@io-digital:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
always-auth=true
```

### Install packages

Install core only (vanilla web components):

```bash
npm install @io-digital/components
```

Install with framework wrappers:

```bash
npm install @io-digital/components @io-digital/components-react
npm install @io-digital/components @io-digital/components-vue
npm install @io-digital/components @io-digital/components-angular
```

### Vanilla usage

```ts
import { defineCustomElements } from '@io-digital/components/loader';

defineCustomElements();
```

```html
<io-button variant="solid" color="blue" size="md">Get started</io-button>
```

### React usage

```tsx
import { IoButton } from '@io-digital/components-react';

export function Example() {
  return <IoButton variant="solid" color="blue" size="md">Get started</IoButton>;
}
```

### Vue usage

```vue
<script setup lang="ts">
import { IoButton } from '@io-digital/components-vue';
</script>

<template>
  <IoButton variant="solid" color="blue" size="md">Get started</IoButton>
</template>
```

### Angular usage

```ts
import { NgModule } from '@angular/core';
import { IoComponentsAngularModule } from '@io-digital/components-angular';

@NgModule({
  imports: [IoComponentsAngularModule],
})
export class AppModule {}
```

### SSR and hydration guidance

In SSR apps (for example Next.js or Nuxt):

1. Register custom elements in browser/client context only.
2. Avoid direct DOM access during server render.
3. Use hydration-safe defaults for controlled values.

If hydration mismatch appears, validate client-only registration before debugging component internals.

## Theming and Tokens

The theming API is CSS custom properties under the io prefix.

- Public API: --io-* custom properties.
- Token source of truth: io-components/src/global/app.css.
- Do not rely on internal class names or internal DOM shape as public contract.

## Event Model

Public events follow canonical/native naming.

Examples:

- click
- input
- change
- focus
- blur
- open
- close
- dismiss

io-prefixed custom event names are intentionally not part of public API and are guarded by events:guard.

## Accessibility Commitments

The system targets WCAG AA baseline for shipped components.

Every component change should preserve:

1. Keyboard accessibility.
2. Visible focus indicators.
3. Correct semantic role/ARIA behavior.
4. Contrast compliance.
5. Reduced motion compatibility where relevant.

## Opening an Issue

Use the structured issue templates to route your request correctly:

| What you need | Template to use |
|---|---|
| Something is broken (wrong behaviour, crash, visual regression, a11y failure) | **Bug Report** |
| Propose a new component, prop, token, or storefront section | **Feature Request** |
| Ask how to use a component or token correctly | **Implementation Question** |

Create a new issue at: [github.com/iodigital-com/io-design-system/issues/new/choose](https://github.com/iodigital-com/io-design-system/issues/new/choose)

Blank / freeform issues are disabled — all issues must use a template so we can triage efficiently.

### Choosing the right scope

| Area | Scope label |
|---|---|
| Web component source code | `io-component` |
| Documentation storefront | `io-storefront` |
| Design tokens / CSS custom properties | `tokens` |
| React / Vue / Angular wrapper package | `wrappers` |
| Governance scripts or CI | `chore` |

---

## Contributing Workflow

For full details, see CONTRIBUTING.md. High-level path:

1. Create a branch from main.
2. Build and test locally.
3. Make focused component/storefront changes.
4. Regenerate generated outputs when API changes.
5. Run full gates.
6. Open PR with test evidence and migration notes if needed.

Suggested start:

```bash
git checkout -b feat/your-change
npm ci
npm run dev
```

Before PR:

```bash
npm run build:quality-gates
```

## Adding a New Component

High-level checklist:

1. Create io-components/src/components/io-name with implementation, styles, types, and tests.
2. Add full storefront docs pages under io-storefront/src/app/components/io-name.
3. Build core and sync storefront generated types/assets.
4. Register new component in storefront sitemap.
5. Re-run tests and full quality gates.

Generated files and wrappers must not be hand-maintained.

## API Surface Governance and Breaking Changes

This repo tracks public API contracts using docs/api-surface.json.

- Use npm run api:check to detect unapproved API breaks.
- Use npm run api:snapshot to intentionally update baseline when breaking change is approved.

SemVer policy:

- MAJOR: breaking API/event/behavior changes.
- MINOR: backward-compatible features.
- PATCH: backward-compatible fixes.

Conventional commits are expected for clarity in release intent.

## Release and Publishing

### Registry

All publishable packages target:

- https://npm.pkg.github.com
- scope: @io-digital

### Release workflow

Automated publishing is handled by .github/workflows/release-packages.yml.

Supported tag triggers:

- release/components/v*
- release/components-react/v*
- release/components-vue/v*
- release/components-angular/v*

Manual workflow_dispatch also supports package selection and dry-run mode.

### Publish preconditions

1. Version in package.json matches release tag version for tag-based releases.
2. Full quality-gate job passes.
3. Target version does not already exist in registry.
4. Publish environment approvals (if configured) are satisfied.

### Local maintainer publish flow

If doing a local/manual publish:

```bash
npm ci
npm run build:quality-gates

npm publish --workspace @io-digital/components --registry https://npm.pkg.github.com
npm publish --workspace @io-digital/components-react --registry https://npm.pkg.github.com
npm publish --workspace @io-digital/components-vue --registry https://npm.pkg.github.com
npm publish --workspace @io-digital/components-angular --registry https://npm.pkg.github.com
```

Publish core first, then wrappers.

### Maintainer token setup

Example user-level .npmrc:

```ini
@io-digital:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GH_PACKAGES_TOKEN}
always-auth=true
```

Token scopes:

- read:packages
- write:packages
- repo when org policy requires repository-scoped access

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| 401 Unauthorized when install/publish | Missing or invalid token | Confirm token value and scopes, then retry |
| 404 for @io-digital package | Registry scope mapping missing or package/version not published | Verify .npmrc mapping and run npm view against GitHub registry |
| Wrapper install warnings | Core-wrapper version mismatch | Align versions and reinstall dependencies |
| CI release skips publish | Version already exists | Bump version and rerun release |
| Storefront type drift check fails | Generated files outdated | Run build:components and sync:stencil-assets |

Useful checks:

```bash
npm config get @io-digital:registry
npm view @io-digital/components versions --registry https://npm.pkg.github.com
npm ls @io-digital/components
```

## Security and Governance Notes

1. Do not commit package tokens or credentials.
2. Use runtime environment variables for npm auth.
3. Keep release automation under review with least-privilege permissions.
4. Run governance and audit scripts before publishing.

## Additional Docs

- CONTRIBUTING.md for implementation and PR rules.
- AGENTS.md for architecture boundaries and agent guidance.
- docs/agency-agents/README.md for AI workflow and governance context.
- docs/component-stability-recommendations.md for stability posture.
- docs/storefront-status-governance.md for status governance rubric.

If you are new to the repo, start with this README, then move to CONTRIBUTING.md before opening your first PR.

## FAQ

### Which package should I install first?

Always start with @io-digital/components. If you use a framework, add its wrapper package as well.

### Is io-storefront published to npm?

No. io-storefront is the documentation/playground app and stays in-repo.

### How do I validate my change before opening a PR?

Run the full gate:

```bash
npm run build:quality-gates
```

### Where should I add new design values?

Add new tokens in io-components/src/global/app.css first, then consume them in component styles via var(--io-*).

### What is the quickest way to work on a component and docs together?

Run npm run dev, implement in io-components/src/components, and verify behavior in the matching io-storefront/src/app/components pages.

## License

MIT
