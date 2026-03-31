# io Design System

The io Design System is iO's cross-framework UI component library.

It is built with Stencil Web Components at the core, plus generated wrappers for React, Vue, and Angular. The repository also includes a Next.js storefront used for component documentation, usage examples, and token reference.

## What this repo includes

- `@io-digital/components`: framework-agnostic Web Components (source of truth)
- `@io-digital/components-react`: React wrappers
- `@io-digital/components-vue`: Vue wrappers
- `@io-digital/components-angular`: Angular wrappers
- `io-storefront`: internal docs site and playground
- Token scraping/generation scripts for docs under `scripts/`

## Component catalog

Current component set (18):

- `io-accordion`
- `io-badge`
- `io-button`
- `io-carousel`
- `io-checkbox`
- `io-input`
- `io-link`
- `io-modal`
- `io-pagination`
- `io-radio`
- `io-select`
- `io-spinner`
- `io-tabs`
- `io-tag`
- `io-textarea`
- `io-toast`
- `io-toast-item`
- `io-tooltip`

### Component maturity

Component status is documented in the storefront navigation and individual component pages.

- `Stable`: ready for broad production usage
- `Beta`: usable, but API or behavior may still evolve

If you are integrating this library in a production product, prefer stable components first and treat beta components as opt-in.

## Browser support

This library targets modern evergreen browsers:

- Chrome (latest)
- Edge (latest)
- Firefox (latest)
- Safari (latest)

Legacy browsers (for example Internet Explorer) are not supported.

## Versioning and releases

This repository follows Semantic Versioning:

- `MAJOR`: breaking API/event/behavior changes
- `MINOR`: backward-compatible features
- `PATCH`: backward-compatible fixes

Conventional Commits are used to keep release intent explicit (`feat`, `fix`, `refactor`, `docs`, `test`, `chore`).

## Local setup

### Prerequisites

- Node.js `>= 20.0.0`
- npm (comes with Node)

### Install

```bash
git clone https://github.com/iodigital-com/io-design-system.git
cd io-design-system
npm ci
```

### Run locally

```bash
npm run dev
```

This starts the Stencil component dev workflow and the storefront app. The storefront is available on `http://localhost:3000`.

## Useful root scripts

### Core workflows

```bash
npm run dev
npm run build
npm run test
npm run type-check
npm run build:storefront
```

### Quality gates

```bash
npm run governance:check
npm run events:guard
npm run build:quality-gates
```

`build:quality-gates` runs:

1. `governance:check`
2. `events:guard`
3. `build`
4. `test`
5. `type-check`
6. `build:storefront`

### Build granularity

```bash
npm run build:components
npm run build:wrappers
npm run build:storefront:release
```

### Token scraping/generation (docs)

```bash
npm run tokens:scrape
npm run tokens:scrape:resume
npm run tokens:merge
npm run tokens:html
npm run tokens:sync
```

These scripts update:

- `docs/tokens.live.json` (raw scrape)
- `docs/tokens.json` (merged docs token data)
- `docs/token.json` (mirror for compatibility)
- `docs/index.html` (generated docs sections)

## Event model (canonical names)

This codebase uses canonical DOM event names.

All public component events follow native/canonical naming only.

Examples:

- `input`
- `change`
- `focus`
- `blur`
- `open`
- `close`
- `click`
- `toggle`
- `remove`
- `dismiss`

No `io*` event prefixes are part of the event API.

## Using the packages

### Web Components (vanilla)

```bash
npm install @io-digital/components
```

```js
import { defineCustomElements } from '@io-digital/components/loader';
defineCustomElements();
```

```html
<link rel="stylesheet" href="node_modules/@io-digital/components/dist/io-components/io-components.css" />
<script type="module" src="node_modules/@io-digital/components/dist/io-components/io-components.esm.js"></script>

<io-button variant="solid" color="blue" size="md">Get started</io-button>
```

### React

```bash
npm install @io-digital/components @io-digital/components-react
```

```tsx
import { IoButton } from '@io-digital/components-react';

export default function App() {
  return <IoButton variant="solid" color="blue" size="md">Get started</IoButton>;
}
```

### Vue

```bash
npm install @io-digital/components @io-digital/components-vue
```

```vue
<script setup>
import { IoButton } from '@io-digital/components-vue';
</script>

<template>
  <IoButton variant="solid" color="blue" size="md">Get started</IoButton>
</template>
```

### Angular

```bash
npm install @io-digital/components @io-digital/components-angular
```

```ts
import { IoComponentsAngularModule } from '@io-digital/components-angular';

@NgModule({
  imports: [IoComponentsAngularModule],
})
export class AppModule {}
```

## SSR and framework guidance

When using wrappers in SSR frameworks (for example Next.js or Nuxt), ensure custom elements are defined on the client runtime.

- Load Web Component definitions only in browser contexts.
- Avoid directly touching DOM APIs during server rendering.
- Keep hydration-safe defaults for controlled component values.

If a framework integration has rendering mismatches, validate client-only registration first before debugging component internals.

## Theming contract

Public theming API:

- CSS custom properties (`--io-*`) exposed by the component styles

Internal implementation details (DOM shape, private class names, internal animation timings) are not part of the public contract and may change between versions.

## Accessibility baseline

The design system aims for WCAG AA as a baseline for shipped components.

For contributors, every component change should preserve:

- keyboard accessibility
- visible focus states
- semantic labeling/ARIA behavior
- contrast requirements

Run component tests and storefront validation before merging accessibility-impacting changes.

## Repository structure

```text
io-design-system/
  io-components/           # Stencil core package
  io-components-react/     # React wrappers
  io-components-vue/       # Vue wrappers
  io-components-angular/   # Angular wrappers
  io-storefront/           # Next.js docs/playground
  docs/                    # Token docs and generated HTML
  scripts/                 # Governance, scrape, and build utilities
```

## Contributor quickstart

If you want to contribute quickly, this is the shortest path:

1. Fork the repository and clone your fork.
2. Create a feature branch from `main`.
3. Install dependencies and run local dev.
4. Make focused changes with tests.
5. Run quality gates.
6. Open a PR with clear scope and screenshots/evidence when relevant.

Suggested workflow:

```bash
git checkout -b feat/your-change-name
npm ci
npm run dev
```

Before opening a PR, run:

```bash
npm run build:quality-gates
```

## Contributing

Please also read [CONTRIBUTING.md](./CONTRIBUTING.md) for full project rules.

### What to include in each PR

- concise summary of behavior change
- testing evidence (command output, screenshots, or notes)
- accessibility impact note for UI changes
- migration note when behavior or events change

### Definition of done

A contribution is considered ready when:

- all required quality gates pass
- component behavior is covered by tests
- storefront docs/examples are updated when API/UX changes
- no `io*` event regressions are introduced (canonical names only)
- naming and token conventions are respected

### Component contribution checklist

For Stencil components in `io-components/src/components`:

- use tokens (`var(--io-*)`) instead of hardcoded values
- keep IDs generated in lifecycle methods, not in render
- keep custom events canonical (no `io`-prefixed event names)
- add/update render, interaction, and disabled-state tests

### Storefront contribution checklist

For docs pages in `io-storefront/src/app/components`:

- use shared primitives for Usage and Accessibility tabs
- keep examples executable and aligned with live component API
- update sitemap/type registrations when adding new components

### Commit style

Use Conventional Commits:

- `feat(scope): ...`
- `fix(scope): ...`
- `docs(scope): ...`
- `test(scope): ...`
- `refactor(scope): ...`
- `chore(scope): ...`

## Security

Please do not disclose security issues in public issues.

Report vulnerabilities privately to repository maintainers through your standard internal security/contact process.

## Roadmap

Near-term focus areas typically include:

- component hardening and API consistency
- accessibility and documentation coverage
- cross-framework wrapper quality
- design token governance

For active roadmap items, check open issues and pull requests.

## FAQ

### Which package should I install first?

Always start with `@io-digital/components`. If you use a framework, add its wrapper package as well.

### Is `io-storefront` published to npm?

No. `io-storefront` is the documentation/playground app and stays in-repo.

### How do I validate my change before opening a PR?

Run the full gate:

```bash
npm run build:quality-gates
```

### Where should I add new design values?

Add new tokens in `io-components/src/global/app.css` first, then consume them in component styles via `var(--io-*)`.

### What is the quickest way to work on a component and docs together?

Run `npm run dev`, implement in `io-components/src/components`, and verify behavior in the matching `io-storefront/src/app/components` pages.

## License

MIT - Copyright (c) io Digital
