# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Changed — Breaking events API policy (`MAJOR`)

- Canonical event mapping is locked for the `io*` prefix removal migration:
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
- This migration is a hard breaking change and ships only in the next **major** release.
- No dual-emit alias layer is provided.
- Consumers must migrate listeners and wrapper props from `io*` / `onIo*` names to canonical names.

---

## [2.1.0] — 2026-05-26 (Wave XI)

Wave XI: nine new beta components, fifteen stable promotions, and comprehensive API additions.

### Added — New Components

- **`io-alert`** — Inline notification banner with 4 severity variants (info/success/warning/error), optional bold heading, and dismissible button that emits a `dismiss` event. Ships with ARIA live region semantics (`role="alert"` / `role="status"` by variant).
- **`io-multi-select`** — Multi-value select with removable chip display, FACE form association, search/filter mode, and ARIA combobox + `aria-multiselectable="true"` pattern. Deprecates `io-select[multiple]` with migration guidance.
- **`io-pin-code`** — PIN/OTP entry component with FACE form association, auto-advance keyboard navigation, paste distribution across cells, and password-masking mode.
- **`io-popover`** — Click-triggered floating content panel built on the native Popover API + `<dialog>` role fallback. Supports `auto` and `manual` dismiss modes with `placement` positioning.
- **`io-scroller`** — Scrollable container with configurable edge fade indicators. Public CSS custom properties: `--io-scroller-fade-color` and `--io-scroller-fade-size`.
- **`io-switch`** — FACE toggle/switch component with `role="switch"`, keyboard Space/Enter activation, and `checked` + `disabled` props.
- **`io-tabs-bar`** — Standalone tabs navigation bar decoupled from `io-tabs` panels. Renders a `role="tablist"` with `aria-controls` pointing to external panel IDs.
- **`io-text`** — Body copy component rendering `p`, `span`, `div`, `blockquote`, or `time` with token-driven font size (`xs`–`xl`), weight, color, alignment, and optional ellipsis truncation.
- **`io-heading`** — Heading component rendering `h1`–`h6` with token-driven visual size (`sm`–`4xl`) fully decoupled from semantic heading level.

### Added — Props & Slots

- `hideLabel: boolean` — Added to `io-input`, `io-textarea`, `io-select`, `io-checkbox`, `io-radio`. Visually hides the label using `sr-only` while preserving screen-reader accessibility.
- Named slots (`label`, `description`, `message`) — Added to all five form-field components for rich HTML content in labels and messages.
- `form` prop — Added to `io-checkbox`, `io-radio`, `io-select` for out-of-DOM form association.
- `loading` prop — Added to `io-input`, `io-textarea`, `io-select`, `io-checkbox`, `io-radio`.
- `background` and `motion` props — Added to `io-modal` and `io-drawer`.
- `sticky` and `background` props — Added to `io-accordion`.
- `aria` prop — Added to `io-button`, `io-input`, `io-textarea`, `io-select`, `io-modal`, `io-drawer` for custom ARIA attribute injection.
- Named slots (`heading`, `description`, `controls`) — Added to `io-carousel`.
- `totalItems` and `perPage` props — Added to `io-pagination`.
- RTL support — Added to all layout components via logical properties.
- `direction` prop — Added to `io-button-group`.
- `color` prop — Added to `io-divider`.
- `href`, `target`, `rel` props — Added to `io-wordmark` for logo-as-link pattern.

### Changed — Stable Promotions

Promoted from `beta` to `stable`: `io-accordion`, `io-avatar`, `io-badge`, `io-breadcrumb`, `io-breadcrumb-item`, `io-button-group`, `io-checkbox-group`, `io-divider`, `io-drawer`, `io-form-field`, `io-progress`, `io-radio-group`, `io-stepper`, `io-table`, `io-wordmark`.

### Changed — BREAKING

- **State/message API**: `error: boolean` + `errorMessage: string` replaced by `state: IoFieldState` + `message: string` across `io-input`, `io-textarea`, `io-select`, `io-checkbox`, `io-radio`, `io-form-field`. Requires migration — see migration guide in `io-components/CHANGELOG.md#200`.

### Infrastructure

- CSS `@layer` architecture for brand overrides and theming
- Component density system: `compact` / `default` / `comfortable`
- Gradient token system
- Stencil SSR/SSG hydrate output target
- Figma-to-token CI sync workflow

---

## [0.1.0] — 2026-05-01

Wave-C/D: three new components, io-select combobox mode, and storefront accessibility improvements.

### Added — Core (`@iodigital-com/components`)

- **`io-button-group`** — Segmented single or multi-select control. Horizontal button strip with shared borders, brand-blue active state, and full `radiogroup` / `checkbox` ARIA semantics. Supports `value`, `type`, and `size` props. (#247)
- **`io-divider`** — Token-based visual separator between content sections. Supports horizontal and vertical orientations, plus a labelled variant for "or" / "and" patterns. (#248)

### Changed — Core (`@iodigital-com/components`)

- **`io-select`** — Custom combobox mode added via `combobox` prop. Full ARIA `listbox` semantics with keyboard-navigable filtered list, multi-select via `multiple`, and option groups via `<io-optgroup>`. (#246)

### Changed — Storefront (private)

- Tailwind `fontFamily.sans` now resolves via the `--font-manrope` CSS variable set by `next/font/google`, applying optimised Manrope subsetting site-wide. (#250)
- Mobile navigation drawer: keyboard focus trap (Tab / Shift+Tab cycles within the active `aria-modal` drawer) and body scroll lock (`overflow: hidden`) added. (#250)

---

## [0.0.1] — 2026-03-27

Initial development baseline. All packages are pre-release (`0.0.x`). APIs are unstable and subject to change before `1.0.0`.

### Added — Core (`@iodigital-com/components`)

**15 Web Components built with Stencil 4:**

- **`io-badge`** — Status and category label. Nine variants mapping to io Digital's semantic and brand colour palette.
- **`io-button`** — Primary interaction component. Three variants (`solid`, `ghost`, `link`), ten brand colours, four sizes (`sm`, `md`, `lg`, `xl`). Supports `href`, `loading`, `disabled`, `arrow`, and `full-width`.
- **`io-checkbox`** — Custom checkbox with built-in label, `indeterminate` state, helper text, and error state. Emits `ioChange` with `{ checked, value }`.
- **`io-input`** — Single-line text entry. Underline-only design with 1px→5px border focus transition. Built-in label, helper text, character count, and error state.
- **`io-link`** — Inline and standalone hyperlink. Three colour options, external link support, animated underline on hover.
- **`io-modal`** — Accessible modal built on the native `<dialog>` element — focus trapping and ESC support are built-in. Three sizes. `show()` / `hide()` methods.
- **`io-radio`** — Custom radio button with built-in label, helper text, and error state. Emits `ioChange`.
- **`io-select`** — Dropdown selection with underline design, matching `io-input`. Options passed as `IoSelectOption[]`.
- **`io-spinner`** — CSS-based loading indicator. Three sizes, three colour modes including `current` to inherit parent colour. `role="status"` with `aria-label`.
- **`io-tabs`** — Tab navigation with roving tabindex keyboard support and full ARIA tab role semantics (`tablist` / `tab` / `tabpanel`). Emits `ioChange` with active tab value.
- **`io-tag`** — Toggleable filter chip or removable label. Renders as `<button>` with `aria-pressed`. Emits `ioToggle` and `ioRemove`.
- **`io-textarea`** — Multi-line text entry with label, helper text, character count, error state, and three resize modes (`none`, `vertical`, `auto`).
- **`io-toast`** — Time-limited feedback notifications. Singleton container with `addToast()` method API. Queues messages and displays one at a time. Auto-dismisses after 6 s by default.
- **`io-tooltip`** — Contextual help on hover or focus. Positioned automatically using `@floating-ui/dom` (flip + shift + offset). Four placement options.

**Design token system:**
- 13 token categories defined as CSS custom properties on `:root`: brand colours, semantic roles, typography, spacing, shadows, motion, z-index, breakpoints, form states, and storefront shell aliases.
- Dark mode support via `[data-theme="dark"]` attribute.
- Focus ring architecture: JS modality tracker (`focus-visible.ts`) + `--io-focus-ring-active` CSS custom property — keyboard-only focus rings that work reliably inside Shadow DOM.

**Framework output targets:**
- `dist` — Lazy-loaded bundle with auto-defined custom elements.
- `dist-custom-elements` — Tree-shakeable per-component build with auto-registration on import.

### Added — Framework wrappers

- **`@iodigital-com/components-react`** — Typed React 18+ component wrappers. Auto-generated by Stencil React output target.
- **`@iodigital-com/components-vue`** — Typed Vue 3.4+ component wrappers. Auto-generated by Stencil Vue output target.
- **`@iodigital-com/components-angular`** — Angular 17–20 directive wrappers. Auto-generated by Stencil Angular output target.

### Added — Storefront (private)

- Documentation site built with Next.js 16, React 19, and Tailwind CSS 4.
- Five-tab documentation pattern per component: **Configurator**, **Examples**, **Usage**, **Accessibility**, **API**.
- Live component configurator with prop controls and real-time code output in four frameworks (HTML, React, Angular, Vue).
- Design token reference pages (Colours, Typography, Spacing, Grid, Motion, Focus, Border Radius).
- Framework integration guides (Vanilla JS, Next.js, React, Angular, Vue).
- Sidebar navigation with alphabetical component ordering — Introduction pinned to top.

### Added — Monorepo tooling

- npm workspaces monorepo with five packages.
- `npm run build:quality-gates` — single command for the full gate sequence (governance check → build → test → type-check → storefront build).
- `npm run governance:check` — validates workspace topology and curated file integrity.

---

[Unreleased]: https://github.com/io-digital/io-design-system/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/io-digital/io-design-system/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/io-digital/io-design-system/releases/tag/v0.0.1
