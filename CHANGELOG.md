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

## [2.0.0] — 2026-06-02

`io-modal` React 18 compatibility and Angular barrel module. First release with full framework parity across React, Vue, Angular, and vanilla JS.

### Changed — BREAKING

- `io-modal` — `preventTopLayer` now defaults to `true`. Opens with `show()` instead of `showModal()`, manages its own backdrop, focus-trap, ESC key, and `inert` in JavaScript. Fixes slotted footer buttons being unclickable in React 18. To keep `showModal()` behaviour: `<io-modal prevent-top-layer="false">`.

### Added

- `IoComponentsAngularModule` — Single barrel NgModule that registers all iO DS Angular proxy components. Import once instead of cherry-picking individual classes. Works for standalone (Angular v17+) and NgModule-based apps. Build migrated to ng-packagr for Ivy compatibility.

---

## [1.1.1] — 2026-05-28

`io-button-group` alignment and accessibility fixes.

### Fixed

- `io-button-group` — Pixel-perfect height alignment (42px container / 32px button), correct border-radius formula, accessible label (removed `aria-hidden` from label span), compact mode corrections. Removed dead `:host([size])` CSS blocks and stale `--io-button-group-hover-bg` token.

---

## [1.1.0] — 2026-05-27

`io-button-group` visual variants and density improvements.

### Added

- `io-button-group` — `variant` prop with `primary` (brand blue fill, default) and `secondary` (white fill with shadow) modes. Deprecates `size` prop in favour of `compact` for density scaling.

---

## [1.0.2] — 2026-05-27

`io-button-group` visual polish.

### Fixed

- `io-button-group` — Improved pill-style spacing, border-radius, and button separation.

---

## [1.0.1] — 2026-05-27

React wrapper CSS auto-import fix.

### Fixed

- `@iodigital-com/components-react` — `global.css` is now automatically imported, so all `--io-*` CSS custom properties are available on `:root` without any extra setup in consuming apps.

---

## [1.0.0] — 2026-05-28

First public release. 37 components, one token system, React / Vue / Angular / vanilla JS wrappers.

### Added

- `io-banner` — Fixed viewport overlay notification. Card style, slide-in animation, four variants (`info`, `success`, `warning`, `error`), optional heading and dismissible button. Controlled by `open` prop.
- `io-inline-notification` — In-flow inline notification. Same variants as `io-banner`, without fixed positioning or shadow. Consumer mounts/unmounts to control visibility.
- `io-multi-select` — Multi-value select with removable chip display, FACE form association, and ARIA combobox semantics.
- `io-pin-code` — PIN/OTP entry with FACE form association, auto-advance keyboard navigation, and paste distribution across cells.
- `io-popover` — Click-triggered floating content panel with `auto` and `manual` dismiss modes and configurable placement.
- `io-scroller` — Scrollable container with configurable edge fade indicators via `--io-scroller-fade-color` and `--io-scroller-fade-size`.
- `io-switch` — FACE toggle with `role="switch"`, keyboard Space/Enter activation, `checked` and `disabled` props.
- `io-tabs-bar` — Standalone tab navigation bar with `role="tablist"` and `aria-controls`, decoupled from `io-tabs` panels.
- `io-text` — Body copy component. Renders `p`, `span`, `div`, `blockquote`, or `time` with token-driven font size (`xs`–`xl`), weight, colour, and optional ellipsis truncation.
- `io-heading` — Heading component. Renders `h1`–`h6` with visual size fully decoupled from semantic heading level.
- `io-breadcrumb` — Breadcrumb navigation with shadow-DOM separator. Default separator `›`, overridable via `--io-breadcrumb-separator`.
- `io-carousel` — Horizontally scrollable card carousel with named slots (`heading`, `description`, `controls`).

### Changed — BREAKING

- `io-alert` removed and replaced by `io-banner` + `io-inline-notification`. Migrate: use `<io-inline-notification>` for form/section feedback, `<io-banner open>` for page-wide announcements.
- `io-inline-banner` renamed to `io-inline-notification`. Update tag and class name — no behaviour change.
- State/message API on form fields: `error: boolean` + `errorMessage: string` replaced by `state: IoFieldState` + `message: string` across `io-input`, `io-textarea`, `io-select`, `io-checkbox`, `io-radio`, `io-form-field`.

### Changed

- Stable promotions from `beta`: `io-accordion`, `io-avatar`, `io-badge`, `io-breadcrumb`, `io-button-group`, `io-checkbox-group`, `io-divider`, `io-drawer`, `io-form-field`, `io-progress`, `io-radio-group`, `io-stepper`, `io-table`, `io-tabs-bar`, `io-wordmark`.

---

## [0.0.1] — 2026-03-27

Initial development baseline. Pre-release — APIs were unstable and subject to change before `1.0.0`.

### Added

- 15 Web Components built with Stencil 4: `io-badge`, `io-button`, `io-checkbox`, `io-input`, `io-link`, `io-modal`, `io-radio`, `io-select`, `io-spinner`, `io-tabs`, `io-tag`, `io-textarea`, `io-toast`, `io-tooltip`, plus the design token system, dark mode support, and focus ring architecture.
- Framework wrappers: `@iodigital-com/components-react`, `@iodigital-com/components-vue`, `@iodigital-com/components-angular`.
- Storefront documentation site with five-tab pattern per component: Configurator, Examples, Usage, Accessibility, API.

---

[Unreleased]: https://github.com/iodigital-com/io-design-system/compare/@iodigital-com/components@2.0.0...HEAD
[2.0.0]: https://github.com/iodigital-com/io-design-system/compare/@iodigital-com/components@1.1.1...@iodigital-com/components@2.0.0
[1.1.1]: https://github.com/iodigital-com/io-design-system/compare/@iodigital-com/components@1.1.0...@iodigital-com/components@1.1.1
[1.1.0]: https://github.com/iodigital-com/io-design-system/compare/@iodigital-com/components@1.0.2...@iodigital-com/components@1.1.0
[1.0.2]: https://github.com/iodigital-com/io-design-system/compare/@iodigital-com/components@1.0.1...@iodigital-com/components@1.0.2
[1.0.1]: https://github.com/iodigital-com/io-design-system/compare/@iodigital-com/components@1.0.0...@iodigital-com/components@1.0.1
[1.0.0]: https://github.com/iodigital-com/io-design-system/releases/tag/@iodigital-com/components@1.0.0
[0.0.1]: https://github.com/iodigital-com/io-design-system/releases/tag/v0.0.1
