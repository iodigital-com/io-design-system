# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

The `io*` event name prefix is scheduled for removal in the next major release. No action required today — this section documents the migration that will be required when it ships.

### Changed — Planned Breaking events API migration

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

---

## [1.0.0] — 2026-06-02

First official release. 37 components, one token system, React / Vue / Angular / vanilla JS wrappers.

> **Note on versioning** — earlier pre-release builds carried inflated version numbers (1.1.x, 2.x). Those were internal development iterations and have been removed from the registry. `1.0.0` is the single canonical release going forward. Versioning policy: `major` = visual overhaul only; `minor` = new features; `patch` = fixes.

### Added — Components

- `io-banner` — Fixed viewport overlay notification. Card style, slide-in animation, four variants (`info`, `success`, `warning`, `error`), optional heading and dismissible button. Controlled by `open` prop.
- `io-inline-notification` — In-flow inline notification. Same variants as `io-banner`, without fixed positioning or shadow.
- `io-multi-select` — Multi-value select with removable chip display, FACE form association, and ARIA combobox semantics.
- `io-pin-code` — PIN/OTP entry with FACE form association, auto-advance keyboard navigation, and paste distribution.
- `io-popover` — Click-triggered floating content panel with `auto`/`manual` dismiss modes and configurable placement.
- `io-scroller` — Scrollable container with configurable edge fade indicators.
- `io-switch` — FACE toggle with `role="switch"`, keyboard activation, `checked` and `disabled` props.
- `io-tabs-bar` — Standalone tab navigation bar, decoupled from `io-tabs` panels.
- `io-text` — Body copy component rendering `p`, `span`, `div`, `blockquote`, or `time` with token-driven typography.
- `io-heading` — Heading component rendering `h1`–`h6` with visual size decoupled from semantic level.
- `io-breadcrumb` — Breadcrumb navigation with shadow-DOM separator. Default `›`, overridable via `--io-breadcrumb-separator`.
- `io-carousel` — Horizontally scrollable card carousel.

### Added — Props & Features

- `io-modal` — `preventTopLayer` prop (default `true`). Opens with `show()` so React 18 synthetic events work inside the modal. To restore native `showModal()` behaviour: `<io-modal prevent-top-layer="false">`.
- `io-button-group` — `variant` prop (`primary` / `secondary`), `compact` prop for density, directional layout.
- `IoComponentsAngularModule` — Single barrel NgModule for `@iodigital-com/components-angular`. Import once instead of cherry-picking individual classes.

### Changed — BREAKING

- `io-alert` removed and replaced by `io-banner` + `io-inline-notification`. Migrate: use `<io-inline-notification>` for form/section feedback, `<io-banner open>` for page-wide announcements.
- `io-inline-banner` renamed to `io-inline-notification`. Update tag and class name — no behaviour change.
- State/message API on form fields: `error: boolean` + `errorMessage: string` replaced by `state: IoFieldState` + `message: string` across `io-input`, `io-textarea`, `io-select`, `io-checkbox`, `io-radio`, `io-form-field`.

### Changed — Stable Promotions

Promoted from `beta` to `stable`: `io-accordion`, `io-avatar`, `io-badge`, `io-breadcrumb`, `io-button-group`, `io-checkbox-group`, `io-divider`, `io-drawer`, `io-form-field`, `io-progress`, `io-radio-group`, `io-stepper`, `io-table`, `io-tabs-bar`, `io-wordmark`.

---

## [0.0.1] — 2026-03-27

Initial development baseline. Pre-release — APIs were unstable and subject to change before `1.0.0`.

### Added

- 15 Web Components built with Stencil 4: `io-badge`, `io-button`, `io-checkbox`, `io-input`, `io-link`, `io-modal`, `io-radio`, `io-select`, `io-spinner`, `io-tabs`, `io-tag`, `io-textarea`, `io-toast`, `io-tooltip`, plus the design token system, dark mode support, and focus ring architecture.
- Framework wrappers: `@iodigital-com/components-react`, `@iodigital-com/components-vue`, `@iodigital-com/components-angular`.
- Storefront documentation site with five-tab pattern per component: Configurator, Examples, Usage, Accessibility, API.

---

[Unreleased]: https://github.com/iodigital-com/io-design-system/compare/@iodigital-com/components@1.0.0...HEAD
[1.0.0]: https://github.com/iodigital-com/io-design-system/releases/tag/@iodigital-com/components@1.0.0
[0.0.1]: https://github.com/iodigital-com/io-design-system/releases/tag/v0.0.1
