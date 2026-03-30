# io Design System

A component library for io Digital products — 15 production-ready Web Components built with [Stencil](https://stenciljs.com/) and shipped as standard custom elements. Works with React, Angular, Vue, or plain HTML with no framework lock-in.

---

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [`@io-digital/components`](./io-components) | Core Web Components (framework-agnostic) | `0.0.1` |
| [`@io-digital/components-react`](./io-components-react) | React 18+ typed wrappers | `0.0.1` |
| [`@io-digital/components-vue`](./io-components-vue) | Vue 3.4+ typed wrappers | `0.0.1` |
| [`@io-digital/components-angular`](./io-components-angular) | Angular 17–20 typed wrappers | `0.0.1` |

The storefront ([`io-storefront`](./io-storefront)) is a private Next.js documentation site — it is not published to npm.

---

## Components

| Component | Tag | Description |
|-----------|-----|-------------|
| Badge | `io-badge` | Status and category labels. Nine semantic variants. |
| Button | `io-button` | Primary interactions. Three variants, ten brand colours, four sizes. |
| Checkbox | `io-checkbox` | Binary selection with indeterminate state. |
| Input | `io-input` | Single-line text entry with label, helper text, and error state. |
| Link | `io-link` | Inline and standalone hyperlink with animated underline. |
| Modal | `io-modal` | Native `<dialog>` with focus trapping and ESC support. |
| Radio | `io-radio` | Single-select radio with label and error state. |
| Select | `io-select` | Dropdown with label, placeholder, and error state. |
| Spinner | `io-spinner` | Loading indicator in three sizes and colour modes. |
| Tabs | `io-tabs` | Tab navigation with keyboard support and ARIA roles. |
| Tag | `io-tag` | Toggleable filter chip or removable label. |
| Textarea | `io-textarea` | Multi-line text entry with character count and resize modes. |
| Toast | `io-toast` | Time-limited feedback notifications via `addToast()`. |
| Tooltip | `io-tooltip` | Contextual help on hover or focus, auto-positioned. |

---

## Quick start

### Event migration policy (breaking)

The `io*` custom-event prefix has been removed in favor of canonical event names.
This is a **major-version** breaking change with **no dual-emit alias layer**.

Canonical mapping:

- `ioInput` → `input`
- `ioChange` → `change`
- `ioFocus` → `focus`
- `ioBlur` → `blur`
- `ioOpen` → `open`
- `ioClose` → `close`
- `ioClick` → `click`
- `ioToggle` → `toggle`
- `ioRemove` → `remove`
- `ioToastDismiss` → `dismiss`

Wrapper/event binding examples:

- React: `onIoChange` → `onChange`, `onIoClick` → `onClick`
- Angular: `(ioChange)` → `(change)`, `(ioClick)` → `(click)`
- Vue: `@io-change` → `@change`, `@io-click` → `@click`
- Vanilla DOM: `addEventListener('ioChange', ...)` → `addEventListener('change', ...)`

### Vanilla HTML / CDN

```html
<link rel="stylesheet" href="node_modules/@io-digital/components/dist/io-components/io-components.css">
<script type="module" src="node_modules/@io-digital/components/dist/io-components/io-components.esm.js"></script>

<io-button variant="solid" color="blue" size="md">Get started</io-button>
```

### npm install

```bash
npm install @io-digital/components
```

```js
import { defineCustomElements } from '@io-digital/components/loader';
defineCustomElements();
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
// app.module.ts
import { IoComponentsAngularModule } from '@io-digital/components-angular';

@NgModule({
  imports: [IoComponentsAngularModule],
})
export class AppModule {}
```

```html
<io-button variant="solid" color="blue" size="md">Get started</io-button>
```

---

## Design tokens

All visual values are CSS custom properties on `:root`. Import the stylesheet to access them:

```css
@import '@io-digital/components/dist/io-components/io-components.css';
```

Token categories: brand colours, semantic roles, typography, spacing, shadows, motion, z-index, breakpoints, and form states. See the [Styles section](http://localhost:3000/styles) in the storefront for the full reference.

---

## Repository structure

```
io-design-system/
├── io-components/           # @io-digital/components — Stencil core
│   ├── src/components/      # Component source (one directory per component)
│   ├── src/global/app.css   # Design tokens (CSS custom properties on :root)
│   └── stencil.config.ts    # Build config + framework output targets
├── io-storefront/           # Private documentation site (Next.js + Tailwind)
├── io-components-react/     # @io-digital/components-react
├── io-components-vue/       # @io-digital/components-vue
└── io-components-angular/   # @io-digital/components-angular
```

---

## Development

**Requirements:** Node >= 20.0.0

```bash
# Install dependencies from repo root
npm ci

# Start Stencil dev server + storefront concurrently
npm run dev

# Run tests
npm run test

# Type-check all packages
npm run type-check

# Full quality-gate sequence (governance → build → test → type-check → storefront build)
npm run build:quality-gates
```

The storefront runs at `http://localhost:3000` and hot-reloads alongside the Stencil build.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full contributor guide — including how to add new components, the commit convention, and the pull request checklist.

---

## License

MIT — © io Digital
