# @iodigital-com/components

## 1.9.1

### Patch Changes

- 374190b: fix(io-ai-tag): replace custom 4-point star SVG with Lucide `sparkles` icon via `<io-icon>`; add `sparkles` to icon set

## 1.9.0

### Minor Changes

- 33d2496: feat: add io-grid, io-link-tile, io-button-tile, and io-app-shell components

  - **io-grid**: 12-column responsive CSS Grid layout primitive with four fluid gap presets (none/sm/md/lg) driven by clamp() tokens, align and justify props, and companion io-grid-item with colSpan/rowSpan/colStart support. Uses shadow: false (light DOM) so consumers can style children without Shadow DOM boundaries. New tokens: --io-grid-columns, --io-grid-gap-{none,sm,md,lg}, --io-container-{narrow,basic,wide}-max.

  - **io-link-tile**: Media tile primitive with an embedded full-surface anchor. Bundles media (img/picture/video), overlay label/description, optional gradient, four aspect ratio presets (1/1, 4/3, 3/4, 16/9), and header/footer named slots. Focus delegates from host to the anchor via delegatesFocus.

  - **io-button-tile**: Sibling to io-link-tile for action-triggered tiles. Renders a full-surface button instead of an anchor, with disabled/loading states, aria-busy support, and tileClick event emission.

  - **io-app-shell**: Full-page application shell with sticky header (header-start/title/header-end slots), collapsible sidebar-start (focus trap + scroll lock on mobile overlay), optional sidebar-end panel, main content area with skip-to-main link (WCAG 2.4.1), footer, and background media slot. Matches io-flyout patterns for focus management.

- 9160877: feat: add io-ai-tag, io-button-pure, and io-flag components

  - io-ai-tag: EU AI Act disclosure badge with abbreviation/generated/modified variants, EN + NL i18n, and <abbr> semantics
  - io-button-pure: link-styled inline action button inheriting font-size, with active/underline/stretch/alignLabel props
  - io-flag: country flag indicator for international UI covering 40 ISO 3166-1 alpha-2 codes (EU + key regions), lazy-loaded from flagcdn.com

- bc8011b: Add io-product-tile commerce primitive, dialog shared utilities, io-icon SVG sprite deduplication, and BreakpointCustomizable responsive props for io-button.

  - feat(io-product-tile): new commerce primitive with heading, price, sale price, like button, image slot, and accessible sr-only price labels (issue #1097)
  - refactor(io-modal): extract shared dialog utils (scroll-lock, focus-trap, backdrop-click, inert, transition-end) to utils/dialog/ (issue #959)
  - perf(io-icon): add SVG sprite deduplication via shared <symbol> + <use> pattern to reduce DOM clones (issue #1040)
  - feat(io-button): add BreakpointCustomizable<T> type for size, hideLabel, and iconPosition props with @media CSS generation (issue #1056)

- a924818: feat(io-fieldset): add generic fieldset primitive for grouping mixed controls
- 21c8342: feat(io-input): add indicator prop for type-specific visual affordances

  Adds an `indicator` prop to `io-input` that renders a leading Lucide icon in the prefix area. Pass any valid `IoIconName` string (e.g. `"mail"`, `"phone"`, `"link"`) to show a decorative, aria-hidden icon before the input value. The `TYPE_ICON_MAP` also enables boolean-style usage where `true` auto-selects the icon based on `type` (email→mail, tel→phone, url→link).

  New CSS custom properties for consumer overrides:

  - `--io-input-indicator-color` (default: `var(--io-text-secondary)`)
  - `--io-input-indicator-size` (default: `1.25rem`)

- d4de04a: feat(io-text-list-item): add child component for io-text-list

  New `io-text-list-item` component for slot-based content projection into list items.
  Renders with `shadow: false` to preserve native list semantics and carries
  `role="listitem"` automatically. Logs a console warning when used outside
  `io-text-list`. Plain `<li>` children remain fully supported alongside this component.

### Patch Changes

- dc84733: Remove stale JSDoc deprecation annotations and console.warn from public component APIs. io-button no longer emits a deprecation warning for `iconOnly`. All prop descriptions are neutral v1 language.

## 1.8.0

### Minor Changes

- bbc4ccc: feat(io-accordion): add keyboard navigation, defaultExpanded coordination, summary slots, frosted background, and indent prop

  - #1087: ArrowDown/ArrowUp moves focus between sibling accordion headers; Home/End jump to first/last; disabled headers are skipped
  - #1066: When multiple siblings have `defaultExpanded=true` and `allowMultiple=false`, only the first in DOM order remains open after mount
  - #1042: New `summary`, `summary-before`, and `summary-after` slots — `summary-before`/`summary-after` render outside the trigger button so interactive children (edit/delete buttons) remain independently operable
  - #1029: New `frosted` value for the `background` prop — applies `backdrop-filter: blur(12px)` for legibility over image/video backdrops; customisable via `--io-accordion-bg-frosted`
  - #1023: New `indent` boolean prop — indents panel content to align with the summary text column past the expand/collapse icon; customisable via `--io-accordion-indent`

- 0dbcc87: Split motion tokens into separate duration (--io-duration-xs/sm/md/lg/xl) and easing (--io-ease-in/out/in-out) scales. Added getTransition/getAnimation/getEnterTransform composition helpers in src/utils/motion.ts that wrap durations with --io-transition-duration/--io-animation-duration override hooks for consumer and test control. Added a single global @media (prefers-reduced-motion: reduce) block in app.css that collapses all duration tokens to 0ms, removing the need for per-component media blocks. Replaced the single --io-motion-entrance-offset-y token with four directional variants (--io-motion-entrance-offset-up/down/start/end). Migrated io-button, io-modal, and io-spinner styles to the new token scale. Added --io-spinner-duration public token. Vitest setup now injects 0s motion overrides globally for deterministic specs. Legacy composed tokens (--io-motion-fast, --io-motion-base, etc.) are kept as deprecated aliases for one release cycle.
- 618daaa: feat(io-select, io-multi-select): add typeahead letter search (#930), PageUp/PageDown navigation (#938), native Popover API migration with autoUpdate (#945), value prop widened to string | number | null (#942), icon/description metadata on options (#928), event-based child registration replacing setTimeout SSR hack (#963, #920)
- 5629a44: fix(io-drawer, io-modal): restore focus to trigger element on close (WCAG 2.4.3); include slotted footer elements in modal focus trap (#1091, #972)

  - io-drawer: capture `focusTrigger` before `showModal()` on open; restore via `.focus()` on close
  - io-modal: `setupFocusTrap()` now collects slotted light-DOM children via `slot.assignedElements({ flatten: true })` in addition to shadow-DOM focusables, so slot="footer" buttons are reachable by Tab

- 7957c20: Add shared utility helpers, global CSS utilities, and new tokens.

  - **sr-only utility** (#1082): new `getSrOnlyStyles()` helper in `utils/sr-only.ts` centralises the visually-hidden pattern; 12 component style files refactored to consume it; global `.io-sr-only` class added to `app.css`.
  - **control-size scale** (#1119): new `--io-control-size-{xs,sm,md,lg,xl}` canonical token scale (24–64px); `--io-touch-target-min-size` duplicate removed; multi-select chip, stepper circle, and pin-code slot tokens now reference the scale.
  - **utility classes** (#1095, #1144): new `.io-focus-visible`, `.io-skeleton` (with shimmer keyframe and reduced-motion path), `.io-prose-heading-{xs–xl}`, and `.io-prose-text-{xs–xl}` global utility classes in `app.css`; skeleton tokens `--io-skeleton-duration`, `--io-skeleton-bg-start`, `--io-skeleton-bg-end` added with dark-mode overrides.
  - **top-layer controller** (#1150): new `utils/top-layer-controller.ts` — `createTopLayerController()` defers overlay close until exit transition finishes; feature-detects `transition-behavior: allow-discrete`; reduces-motion path is synchronous; fully unit-tested.
  - **animateBar helper** (#1160): new `utils/animate-bar.ts` — `animateBar()` JS-driven Web Animations API helper for sliding tab indicators, segmented-control thumbs, and moving markers; reduced-motion path snaps instantly; fully unit-tested.

- 305e816: feat(io-button): B27 enhancements — press feedback, token transitions, download prop, deprecate iconOnly, iconSource sizing, loading-finished announcement

  - #1134 Add `scale(0.98)` `:active` press feedback on `.btn`; skipped under `prefers-reduced-motion`. Transition uses new `--io-duration-xs`/`--io-ease-out` tokens. translateY remains prohibited; scale is a separate primitive.
  - #1153 Replace all hardcoded `500ms`/`150ms` values in `io-button-styles.ts` and `--io-button-group-transition` in `app.css` with new split duration/easing tokens (`--io-duration-xs`, `--io-duration-lg`, `--io-ease-snappy`, `--io-ease-standard`, `--io-ease-out`).
  - #1101 Add `min-width`/`min-height: var(--io-button-sm-icon-only-min, 24px)` to `.btn--sm.btn--icon-only` so the sm icon-only button cannot be CSS-overridden below the WCAG 2.5.5 AA floor of 24px.
  - #1065 Add `download` prop for anchor mode (`boolean true` → empty attribute, `string` → filename suggestion). Auto-set `rel="noopener noreferrer"` when `target="_blank"` and no `rel` is provided, matching `io-wordmark`.
  - #1047 Deprecate `iconOnly` prop with a `console.warn` pointing to `hideLabel`. `hideLabel=true` + icon/iconSource now renders a square icon-only layout with an sr-only label span. `hideLabel=true` without any icon emits `console.error`.
  - #1043 Size `iconSource` raw-SVG wrapper (`.btn__icon-wrap`) via `data-size` attribute so it matches `io-icon`'s size map at each button size, unifying visual sizing.
  - #1110 Replace the transient live-region pattern with a stable `loadingAnnouncement` state (`'loading'` | `'finished'` | `'idle'`). Screen readers now hear 'Loading' on start and 'Loading finished' once after `loading` transitions `true→false`. Re-run cycles correctly announce both states.

  New tokens registered in `docs/public-css-api.json` and `docs/token-runtime-reconciliation.json`:
  `--io-button-sm-icon-only-min`, `--io-duration-xs`, `--io-duration-sm`, `--io-duration-md`, `--io-duration-lg`, `--io-ease-standard`, `--io-ease-out`, `--io-ease-snappy`

- 79a0061: fix(io-input, io-select, io-textarea): align touched-gated FACE error behaviour, consolidate state-message elements, deprecate lowercase autocomplete prop, and add forced-colors HCM fallbacks

  - #1168: `reportValidity()` now forces `touched=true` on io-input, io-select, and io-textarea so FACE error UI surfaces before the user has blurred the field, matching native form element behaviour
  - #1167: io-input and io-textarea now render a single consolidated `<p>` state-message element instead of three separate elements sharing the same id; prevents duplicate-id violations and ensures `aria-describedby` always points to a visible element
  - #1146: The lowercase `autocomplete` prop on io-input is marked `@deprecated` (use `autoComplete`); io-textarea gains the canonical `autoComplete` camelCase prop to match io-input
  - #1081: io-input, io-select, and io-textarea now include `@media (forced-colors: active)` blocks — error states use `Highlight` outline, disabled states use `GrayText` with `opacity: 1`

- fdb9d24: feat(io-segmented-control): align fieldset semantics, reconcile ARIA roles, add validation surface, noWrap scroll mode, and columns prop

  - #1080 — wraps segments in an inner `<fieldset role="radiogroup">` with `<legend>` to align group semantics with io-radio-group; removes `role="group"` from Host
  - #1084 — moves `role="radio"` and `aria-checked` from the Host onto the inner `<button>` in io-segment to prevent screen-reader double-announcement
  - #1074 — adds `required`, `error`, and `errorMessage` props with FACE validity wiring (`valueMissing`), `role="alert"` error message, and `--io-segmented-control-border-error-width` token (WCAG 1.4.1)
  - #1072 — adds `noWrap` prop that wraps the slot in `<io-scroller>` for horizontal scroll on many segments
  - #1063 — adds `columns` prop (`'auto' | number`) that switches the bar from flex to CSS grid for equal-width segment cells

- 65a0f81: fix: P1 component bug fixes — spinner token, ESC handler scoping, popover window listener cleanup, pagination Space scroll, event propagation (#1128, #995, #993, #957, #925, #935)

  - io-spinner: replace hardcoded `0.7s`/`1500ms` with `--io-spinner-duration` and `--io-spinner-duration-reduced` tokens registered in `docs/public-css-api.json`
  - io-flyout, io-sheet: move ESC handler from `@Listen('keydown', {target:'document'})` to `<Host onKeyDown>` — no longer fires for every keystroke when closed
  - io-popover: replace 4 always-on `@Listen({target:'window'})` decorators with `attachWindowListeners()`/`detachWindowListeners()` called on open/close — zero window listeners while closed
  - io-pagination: add `onKeyDown` Space-key `preventDefault` on all page buttons — prevents viewport scroll on Space activation
  - io-checkbox, io-switch: call `ev.stopPropagation()` + `ev.stopImmediatePropagation()` in `handleChange` — prevents double-fire via native + custom events
  - io-input, io-input-password, io-input-search, io-input-date, io-textarea: same stop-propagation in all four event handlers (input, change, focus, blur)

- 090c630: feat(io-multi-select): expose trigger-level clear-all button, typeahead search, chevron rotation, maxSelections cap, select-all affordance, and PageUp/PageDown navigation

  - #1111 — inline "Clear selection" icon button in the trigger when `selectedValues.length > 0`; `stopPropagation` prevents dropdown toggle; `aria-label="Clear selection"` + 44×44 touch target
  - #1077 — typeahead character search while dropdown is open (filter mode excluded); 500ms buffer reset; cycles through matches; skips disabled options
  - #1075 — chevron already rotated 180° via `[aria-expanded="true"]` CSS rule (existing); prefers-reduced-motion guard in styles
  - #1070 — `maxSelections` prop; blocks selection past cap and emits `limitreached` event with `{ max, attempted }`; unselected options receive `aria-disabled="true"` at cap; helper text "X of Y selected" rendered in dropdown
  - #1069 — `selectAll` prop (default `false`); "Select all" button in dropdown footer; respects active filter (selects filtered subset only); respects `maxSelections` cap
  - #1053 — `PageDown`/`PageUp` keys jump `activeIndex` by 10 (bounded by option count)

- 9b2f6d5: feat(io-icon): expand size scale to 11 steps, add contrast-higher/lower colors, and document 507-icon registry

  - IoIconSize now includes 2xs (8px) and 2xl–5xl (40–80px), totaling 11 steps: 2xs | xs | sm | md | lg | xl | 2xl | 3xl | 4xl | 5xl | inherit
  - New CSS tokens added to app.css: --io-icon-size-2xs through --io-icon-size-5xl
  - IoIconColor adds contrast-higher (--io-text-contrast-higher → #000000) and contrast-lower (--io-text-contrast-lower → #C4C4C4), completing the 5-stop neutral ramp
  - New semantic tokens --io-text-contrast-higher and --io-text-contrast-lower with full dark-mode overrides
  - io-icon-styles.ts updated with all new size and fixed-width CSS rules
  - Storefront configurator propDefinitions updated to expose all 11 sizes and 10 color options
  - iconStorySizes story updated to render all 10 numeric size steps
  - Icon registry already at 507 Lucide glyphs (exceeds the ~150 target from #1058)
  - All new tokens registered in docs/public-css-api.json and docs/token-runtime-reconciliation.json

  Closes #1067, #1058, #1073

- 4a80ad7: fix(io-toast-item): mark decorative variant icon with aria-hidden=true to prevent double-announcement by screen readers

  feat(io-toast): add --io-toast-position-offset and --io-toast-stack-gap public CSS tokens for consumer fine-tuning of corner spacing

  feat(io-toast-item): add showProgress prop rendering a countdown progress bar that pauses on hover/focus-within and respects prefers-reduced-motion

  feat(io-toast): support multi-action toasts via actions array on IoToastMessage; backward-compatible with existing actionLabel/actionHref API

  feat(io-banner): add named heading slot for rich title content (inline links, interpolated text); falls back to heading prop

  refactor(io-banner): replace four inline SVG paths with io-icon using shared getNotificationIconName utility

  refactor(io-banner): compose io-button for action and dismiss controls; remove bespoke .banner**action and .banner**dismiss CSS

  feat(io-inline-notification): add named heading slot for rich title content

  refactor(io-inline-notification): replace four inline SVG paths with io-icon using shared getNotificationIconName utility

  refactor(io-inline-notification): compose io-button for dismiss control; remove bespoke raw button with inline SVG

- d6b2c8f: feat(overlays): add two-phase enter/exit transitions, fullscreen modal, sheet background/dismiss props, flyout sticky footer, and banner responsive position

  - **#1137** — Replace keyframe animations with CSS property transitions across io-modal, io-sheet, io-drawer (via shared tokens), io-flyout. Enter uses longer duration + ease-in (decelerate); exit uses shorter duration + ease-out (accelerate). `prefers-reduced-motion` collapses both phases to 0ms. New tokens: `--io-duration-overlay-enter`, `--io-duration-overlay-exit`, `--io-ease-overlay-enter`, `--io-ease-overlay-exit`, `--io-motion-entrance-offset-down`.
  - **#976** — `io-modal` gains `fullscreen: boolean = false` prop. When true, the modal fills the full viewport at or below `--io-modal-fullscreen-breakpoint` (default 640px) and centers on larger screens.
  - **#965** — `io-sheet` adds `dismissButton: boolean = true` (controls × button and ESC dismissal) and `disableBackdropClick: boolean = false` (controls backdrop-click dismissal) props. The `dismissible` prop is deprecated but remains functional for one minor version.
  - **#974** — `io-sheet` adds `background: 'canvas' | 'surface' | 'elevated' = 'canvas'` prop matching sibling overlay APIs.
  - **#989** — `io-flyout` adds `footerBehavior: 'sticky' | 'fixed' = 'sticky'` prop with IntersectionObserver-driven scroll shadow, and a `sub-footer` slot for secondary content rendered after the main footer. New token: `--io-flyout-sticky-top`.
  - **#1002** — `io-banner` gains responsive `position` prop (accepts `{ base, s, m, l }` breakpoint object; defaults to `{ base: 'bottom', s: 'top' }`). Banner renders inside `<div popover="manual">` to escape z-index stacking races with native top-layer elements.

- 80543ba: feat(io-pagination): add showRange, perPageOptions, and showPageJump props; sr-only live region already present

  - `showRange` displays "Showing X–Y of N" range indicator with aria-live polite announcement
  - `perPageOptions` renders a per-page selector before the prev arrow; selecting emits `change` with new `perPage`
  - `showPageJump` renders a "Go to page" input that emits `change` on Enter after validating the target page
  - `IoPaginationIntl` extended with `perPageLabel`, `goToPageLabel`, `range`, and `of` keys for localisation
  - `IoPaginationChangeDetail` extended with optional `perPage` discriminant for per-page change events

  feat(io-link): add `active` prop for current-nav-item styling and `underline` prop to decouple underline from variant

  - `active=true` applies brand-blue active visual treatment, defaults `aria-current` to `'page'` (overridable via `ariaCurrent`)
  - `underline` prop (`'always' | 'hover' | 'none'`) overrides variant-driven underline state when set
  - New token `--io-link-active-underline-color` registered as public-api in `docs/public-css-api.json`

  feat(io-link-pure): add new component for icon+label tertiary CTA links

  - `alignLabel: 'start' | 'end'` controls icon position relative to label
  - `stretch` fills container width, pushing label and icon to opposite ends
  - `active` renders with visual treatment and `aria-current='page'`
  - `size: 'xs' | 'sm' | 'md'` text size variants
  - `hideLabel` renders icon-only with the slot text as `aria-label`
  - Renders as `<a>` with href, falls back to `<button>` without
  - Full storefront (5 tabs), stories spec, governance, and a11y spec included
  - New token `--io-link-pure-active-color` registered as public-api

- 9bbd069: feat(io-stepper, io-breadcrumb): B38 batch enhancements

  io-stepper / io-step:

  - #955: Add `error` status variant to `IoStepStatus` union with red X-mark icon and `--io-step-error-color` token
  - #962: Add `description` named slot to `io-step` for secondary text under the step label, with `--io-step-description-color` token
  - #964: Add horizontal scroll with active-step centering via `scrollIntoView` on load, step change, and ResizeObserver; cap child count at 9 with console.error guard
  - #970: Complete vertical orientation layout — circle left, label-group to the right, connector as a vertical line; horizontal layout is now scrollable with hidden scrollbars
  - #973: Log `console.error` in `componentWillLoad` when `status="current"` and `disabled=true` are both set (contradictory, current step must remain focusable)

  io-breadcrumb:

  - #969: Add opt-in `seo` prop (default `false`) that renders a `<script type="application/ld+json">` BreadcrumbList graph; re-generates on slotchange; SSG-safe
  - #960: Replace inline-expand ellipsis behavior with an `io-popover` menu listing hidden items as links; ellipsis button gains `aria-haspopup="menu"` and `aria-expanded` state; no layout shift on open/close

- e50b330: feat(io-input-date): add showPicker() trigger button with support detection (#956). Renders an interactive calendar button (Chromium 99+, Safari 16+, Firefox 101+) that opens the native date picker via `HTMLInputElement.showPicker()`. Falls back to the existing decorative SVG icon on unsupported browsers. Adds `pickerLabel` prop (default 'Open date picker') for i18n. Adds `--io-input-date-trigger-color` and `--io-input-date-trigger-bg-hover` public CSS API tokens.

  fix(io-switch): add formStateRestoreCallback for bfcache restore support (#952). Mirrors the io-checkbox implementation — restores checked state from previously-submitted form data on back-forward cache restoration. Also adds an aria-live polite loading announcement region that fires on the first transition into loading state, giving screen-reader users feedback when `loading=true` is set.

- 966143b: feat(motion): add scale-in animation for checkbox icon and radio dot, motion utility getTransition(), and progress transition override token

  - io-checkbox: `.checkbox-icon` now scales from 0 to 1 on check/uncheck via `var(--io-duration-xs) var(--io-ease-out)` (120ms ease-out cubic-bezier). Indeterminate icon also animates. Respects `prefers-reduced-motion`.
  - io-radio: `.radio-dot` transition updated from `--io-motion-fast` to `--io-duration-xs var(--io-ease-out)` for consistent micro-interaction timing across form controls. Respects `prefers-reduced-motion`.
  - global: adds `--io-duration-xs` (120ms) duration primitive and `--io-ease-out` (alias for `--io-motion-easing-ease-out`) for readable micro-interaction CSS.
  - motion utility: new `getTransition(property, duration?, easing?)` helper in `src/utils/motion.ts` — centralises transition shorthands so components reference tokens rather than inline values.
  - io-progress: fill-width transition routed through `--io-progress-transition-duration` public-api token (defaults to `var(--io-motion-base)`). Consumers can override or set to `0s` to disable. Indeterminate animation duration uses `var(--io-motion-extra-slow)`.
  - docs: `[data-theme="only-dark|only-light"]` block in app.css annotated with future `light-dark()` simplification path (#1132). Storefront theming page already documents per-subtree theme overrides.

- c3657d4: feat(io-table): add hideLabel and multiline to io-table-head-cell (#1035)

  - `hideLabel` prop: visually hides the column label via sr-only while preserving it for screen readers — enables accessible select-all header cells
  - `multiline` prop: drops `white-space: nowrap` to allow header text wrapping in fixed-layout tables

  feat(io-table): add selectionState prop to io-table-head-row (#1055)

  - `selectionState: 'none' | 'some' | 'all'` — tri-state convenience prop that drives both checked and indeterminate states from a single, clearly-named value
  - Existing `selectAllChecked` / `selectAllIndeterminate` props continue to work as a fallback when `selectionState` is not provided

  feat(io-table): add empty-state slot and loading overlay (#1051)

  - `empty` named slot: rendered automatically when `io-table-body` has no `io-table-body-row` children (detected via slotchange)
  - `loading` named slot + `loading` prop: absolutely-positioned overlay with `aria-busy="true"` on the scroll wrapper
  - New public-api tokens: `--io-table-empty-min-height`, `--io-table-loading-bg`

  feat(io-scroller): add sticky indicator and ARIA pass-through (#1038)

  - `sticky` prop: switches indicator buttons to `position: sticky` during long scrolls
  - `scrollRole` prop: forwards a custom ARIA role to the scroll container (e.g. `"tablist"`)
  - `scrollAriaOrientation` prop: overrides the derived `aria-orientation` attribute
  - `scrollAriaLabel` prop: overrides the auto-generated aria-label
  - New public-api token: `--io-scroller-indicator-sticky-offset`

  docs(io-table): document tri-state sort and full-word direction values (#1044)

  - `IoTableSortDirection` JSDoc explains tri-state cycling and ARIA-aligned full-word values (ascending/descending/none)
  - `IoTableSortDetail` JSDoc documents the `key` naming rationale
  - Accessibility tab: new "Tri-state sort" section with design rationale and best practices

- 02e697d: feat(io-heading, io-text, io-divider): B42 typography and layout enhancements

  **io-heading:**

  - Add `5xl` (36px) and `6xl` (48px) hero-scale sizes to `IoHeadingSize` (#1037)
  - Infer semantic heading tag from size when `tag` prop is omitted (6xl/5xl/4xl→h1, 3xl/2xl→h2, xl→h3, lg→h4, md→h5, sm→h6); downgrade to `div` when a heading ancestor is detected to prevent illegal nesting (#1036)
  - Downgrade console.error to console.warn (dev-only) for missing `tag` prop
  - Support responsive breakpoint sizes via breakpoint object: `size='{"base":"2xl","l":"5xl"}'` (#1032)

  **io-text:**

  - Add `address`, `figcaption`, `cite`, and `legend` to `IoTextTag` union (#1020)
  - Guard against illegal self-nesting: `blockquote`, `address`, `p` downgrade to `div` when nested inside the same element type (#1036)
  - Support responsive breakpoint sizes: `size='{"base":"sm","l":"lg"}'` (#1032)

  **io-divider:**

  - Support responsive orientation via breakpoint object: `orientation='{"base":"horizontal","l":"vertical"}'` (#1033)

  **io-storefront:**

  - Update io-text usage page with role-based color model documentation vs contrast-tier systems, semantic tag selection guide (#1027)
  - Update io-heading configurator and API docs for new sizes and tag inference
  - Add `textStorySemanticTags` example story for new io-text tag values

- f4e384d: feat(io-segment): add iconSource prop for custom SVG glyphs, hideLabel prop for icon-only dense toolbars, and badge slot for secondary numeric context

  feat(io-wordmark): add badge variant for square brand-mark contexts (app icons, avatars, watermarks); fix size=inherit to respect host CSS height via height:100%

  refactor(io-button-group): add toolbar type for independent-action clusters with no selection model, individual tabIndex per button, and no roving tabindex navigation

  Closes #1068 Closes #958 Closes #950 Closes #1054 Closes #1048 Closes #1039

- 4c1e789: feat(io-tooltip): add theme, max-width, delay tokens, long-press support, WCAG 1.4.13

  - Add `theme: 'dark' | 'light'` prop — light theme renders white background with primary text, suitable for use on dark surfaces
  - Add `--io-tooltip-max-width` token (default 20rem) — consumer override for panel width
  - Add `--io-tooltip-bg` and `--io-tooltip-color` public-api tokens for dark theme colors
  - Add `--io-tooltip-show-delay` (default 500ms) and `--io-tooltip-hide-delay` (default 150ms) tokens — read at runtime by the attribute engine
  - Touch device long-press support: `pointerdown` + 500ms fires show; `pointerup` before timer cancels; tap-outside dismisses
  - Esc dismisses any active tooltip including touch-triggered ones
  - Hover show is now delayed via `--io-tooltip-show-delay` (prevents tooltip flash on rapid mouse movement)
  - All new tokens registered in `docs/public-css-api.json` and `docs/token-runtime-reconciliation.json` with dark mode overrides

  feat(io-progress): add circular and step shape variants

  - Add `shape: 'linear' | 'circular' | 'step'` prop (default `'linear'` — existing behavior unchanged)
  - Circular variant renders SVG track + fill rings with `stroke-dasharray` bound to percentage; supports all existing `color`, `size`, `animated`, `indeterminate`, `showLabel` props
  - Step variant renders segmented bar where `max - min` segments are derived from range; filled segments use existing color tokens
  - New public-api tokens: `--io-progress-circle-size-{sm,md,lg}` and `--io-progress-circle-thickness`
  - All new tokens registered in `docs/public-css-api.json` and `docs/token-runtime-reconciliation.json`

- f8c6f7b: feat(form): add isParentGroupRequired utility, LoadingMessage live-region primitive, and prefers-contrast media query

  - `is-parent-group-required.ts`: new utility that returns true when a host element is a direct child of an `io-checkbox-group` or `io-radio-group` that is `required`. Used by `io-checkbox` and `io-radio` to suppress their own required asterisk (`*`) when the parent group already shows the indicator — prevents duplicate visual markers and double AT announcements (closes #1155)
  - `LoadingMessage`: new shared functional component rendering a polite `role="status"` live-region that announces `'Loading'` on entry and `'Loading finished'` on exit. Wired into `io-button` and `io-input` with localizable `loadingDescription` and `loadingFinishedDescription` props. Replaces the inline live-region in `io-button` and adds equivalent coverage to `io-input`. Addresses WCAG SC 4.1.3 Status Messages gap (closes #1157, closes #1046)
  - `app.css`: adds `@media (prefers-contrast: more)` block overriding `--io-border-interactive`, `--io-border`, `--io-focus-inner`, and `--io-focus-outer` to maximum-contrast values for users who request more contrast via OS/browser preferences — WCAG SC 1.4.6 AAA (closes #1126)

- 40902f7: B49: io-multi-select a11y chips fix, io-input stepper + indicator + counter SR fix, io-radio blur event

  - fix(io-multi-select): chip remove buttons use tabIndex=-1 to preserve combobox tab order; chips container gets role=group; Backspace on trigger removes last chip (#937)
  - feat(io-input): add stepper prop — renders custom +/- buttons for type=number and suppresses native spin buttons; scroll-wheel value changes always suppressed for number inputs (#929)
  - feat(io-radio): add blur event (EventEmitter<FocusEvent>) for parity with io-checkbox and io-switch (#933)
  - feat(io-input): add indicator prop (IoIconName) — renders a Lucide icon in the prefix area (#934)
  - fix(io-input): counter SR live region now reads "X of Y characters" instead of "X characters remaining"; debounce removed so updates are immediate (#921)

- 07131e4: feat(forms): description/warning parity, readOnly normalization, aria prop bags

  - **io-multi-select** (#910): add `warning` state, `helperText` prop, and `description` prop for parity with io-select
  - **io-select** (#918): add `slot="selected"` inside the combobox trigger so consumers can render custom selected-value UI
  - **io-input, io-input-password, io-input-search, io-input-date** (#919): normalize `readOnly` prop to camelCase (was `readonly` — breaking for direct attribute binding, but correct Stencil convention)
  - **io-input** (#927): add `description` prop for a persistent supplementary text paragraph below the field
  - **io-input-password, io-input-search, io-input-date** (#943): add `aria` prop bag (`Record<string, string>`) to inject custom ARIA attributes onto the native `<input>` element via `applyAriaProp()`

- fbefce9: feat(io-carousel): add responsive `slidesPerPage` breakpoint map and accurate pagination

  `slidesPerPage` now accepts a responsive breakpoint map `{ sm?, md?, lg?, xl? }` that is resolved at runtime via `matchMedia`. Each key corresponds to a min-width breakpoint (sm=640px, md=768px, lg=1024px, xl=1280px); the largest matching key wins. When no key matches the viewport, the value falls back to `1`.

  Pagination dots now reflect the actual number of pages (`ceil(totalSlides / slidesPerPage)`) rather than the raw slide count, and each dot navigates to the start of its corresponding page.

  When `slidesPerPage` is a number > 1, slotted slides are automatically sized to fill exactly `1/N` of the visible track width via a new `--io-carousel-slides-per-page` internal CSS custom property.

- 289b603: feat(io-button): add BreakpointCustomizable responsive support for size, hideLabel, and iconPosition props

  Consumers can now pass a responsive breakpoint map to `size`, `hideLabel`, and `iconPosition` instead of a fixed scalar value:

  ```html
  <!-- Icon-only on mobile, full button on large+ viewports -->
  <io-button .hideLabel={{ base: 'true', l: 'false' }} icon="menu" label="Menu">Menu</io-button>

  <!-- Small on mobile, large on desktop -->
  <io-button .size={{ base: 'sm', l: 'lg' }}>Get started</io-button>
  ```

  The `BreakpointCustomizable<T>` utility type and `resolveBreakpoint()` function are now exported from `@iodigital-com/components/utils/breakpoint` for use in custom wrapper scenarios.

  Resolution is static (reads on each render, no live viewport subscription). The `IoButtonIconPosition` named type is now exported from the types module.

- 50d4122: feat(io-carousel): add intl prop, trimSpace/edgeFade/focusOnCenterSlide layout props, and fix aria-live WCAG SC 2.2.2

  - **#1030 (WCAG SC 2.2.2):** `aria-live` attribute on the slide announcement region is now always `polite`. During autoplay the region content is kept empty (silent) instead of toggling `aria-live` to `off`, which violated SC 4.1.3 and SC 2.2.2.
  - **#1041 (intl):** New `@Prop() intl?: Partial<IoCarouselIntl>` — provide any subset of `{ prev, next, label, skip }` to override the individual string props for localisation. Individual props remain backward-compatible.
  - **#1031 (layout):** Three new layout props:
    - `trimSpace: 'start' | 'end' | 'both' | 'none'` (default `'none'`) — trims the blank gap before the first or after the last slide.
    - `edgeFade: boolean` (default `false`) — adds a CSS gradient fade at the carousel track edges. Width is configurable via `--io-carousel-edge-fade-width` (default `64px`).
    - `focusOnCenterSlide: boolean` (default `false`) — centers the active slide in the visible track viewport when scrolling.

- b664998: feat(io-icon): deduplicate SVG rendering via document-level sprite

  Each unique icon name is now injected once as a `<symbol>` in a hidden
  `<svg id="io-icon-sprite">` appended to `document.body`. Every `io-icon`
  instance references its symbol via `<use href="#io-icon-{name}">` instead
  of stamping the full SVG path data inline. This eliminates redundant DOM
  nodes when the same icon is used multiple times on a page.

  - `injectIconSprite()` in `global/app.ts` pre-injects all symbols at library
    init time (guards against SSR with `typeof document` check)
  - `ensureIconSymbol(name)` provides a lazy per-icon fallback for edge cases
  - `iconSource` (custom SVG URL) path is unchanged — still renders inline
  - Accessibility is preserved: decorative icons carry `aria-hidden="true"`,
    labelled icons carry `role="img"` + `aria-label` on the outer `<svg>`

- c0bd69f: io-input: extract shared StateIcon functional component and add indicator prop rendering

  - Extract `StateIcon` functional component to `common/state-icon/StateIcon.tsx` to eliminate duplicated SVG markup across io-input, io-input-password, io-input-search, io-input-date
  - Wire the existing `indicator?: IoIconName` prop to render a leading icon in the input prefix area; when `indicator` is set to `true` (boolean), an icon is auto-selected based on `type` (email→mail, tel→phone, url→link)
  - Add `--io-input-indicator-color` and `--io-input-indicator-size` CSS custom properties as consumer override points
  - Fix malformed `.input-indicator-icon` CSS rule in io-input-styles.ts

- 6541e48: **io-checkbox** (#917): Refactor indeterminate input tracking to use an element ref (`nativeInputEl`) instead of `componentDidRender` shadow root query. Eliminates a repeated DOM query on every render cycle. Internal implementation improvement — no API change.

  **io-select** (#914): Add `options-status` slot to the custom combobox listbox for async loading and error states. When content is slotted, the "No options" empty state is suppressed and the slot container is shown with `aria-live="polite"` for screen reader announcements. Usage: `<span slot="options-status">Loading...</span>`.

  **io-switch** (#946): Add `alignLabel` prop (`'start' | 'end'`, default `'end'`) and `stretch` prop (`boolean`, default `false`). `alignLabel="start"` places the label before the toggle (row-reverse); `stretch=true` fills the available width with the toggle pushed to the opposite side — useful for settings list rows.

- e21dc3b: fix(global): add prefers-color-scheme fallback, color-scheme to :root, and forced-colors focus-ring support

  - Resolves #1118: `@media (prefers-color-scheme: dark)` block mirrors `[data-theme="dark"]` so consumers without a theme JS switcher get dark tokens automatically when the OS is in dark mode
  - Resolves #1133: `color-scheme: light dark` added to `:root` so native UI elements (scrollbars, form controls) adapt to the active scheme
  - Resolves #1103: `@media (forced-colors: active)` redefines `--io-shadow-focus-ring` to use `ButtonText`/`ButtonFace` system colours so the focus ring remains visible in Windows High Contrast Mode (WCAG 2.4.7, 1.4.11)

- d6789a4: feat(io-input-password, io-input-search, io-input-date): add spellCheck prop and label/description/message slots (#913, #931)

  - Add `spellCheck?: boolean` prop to io-input-password, io-input-search, and io-input-date, passed through to the native `<input spellcheck>` attribute (matching io-input's existing spellCheck prop)
  - Add `slot="label"`, `slot="description"`, and `slot="message"` slots to all three components, following the same pattern as io-input
    - `slot="label"` renders inside the `<label>` element for rich label markup
    - `slot="description"` replaces the plain-text `helperText` prop when rich content is needed
    - `slot="message"` replaces the plain-text `message` prop in error/success/warning states
  - Slot presence is tracked via `onSlotchange` on each `<slot>` element (not `@Listen`)

- 2d9faba: feat(io-option, io-multi-select): add icon prop + slot to io-option (#1057), add filterable/filterPlaceholder props to io-multi-select (#1061)

  **io-option — Issue #1057:**

  - Add `@Prop() icon?: string` — when set, renders an `<io-icon>` before the label text
  - Add default slot support — slotted rich HTML content replaces the `label` prop display
  - Update `IoOptionConnectDetail` type to include `icon?: string`
  - Example: `<io-option value="us" icon="flag-us">United States</io-option>`

  **io-multi-select — Issue #1061:**

  - Add `@Prop() filterable = false` — shows a search input at the top of the dropdown for client-side filtering (preferred name; `filter` retained for backward compatibility)
  - Add `@Prop() filterPlaceholder = 'Search...'` — placeholder text for the filter input
  - Add `--io-multi-select-filter-height` CSS custom property (component-scoped override for the filter input height, defaults to `--io-combobox-filter-height`)
  - The filter input is aria-labeled ("Filter options"), keyboard-accessible (Tab into filter, Arrow keys to options), and announces its controls via `aria-controls` pointing to the listbox

- fecd46a: Remove deprecated props, variants, and aliases from 14 components:

  - io-badge: remove legacy color variants (beige, blue, dark, orange, rouge, outline) and DEPRECATED_BADGE_COLOR_MAP
  - io-checkbox-group: remove deprecated boolean error/errorMessage props (use state/message)
  - io-radio-group: remove deprecated boolean error/errorMessage props (use state/message)
  - io-flyout: remove left/right position aliases (use start/end), add top/bottom positions
  - io-multi-select: remove deprecated filter prop (use filterable)
  - io-spinner: remove deprecated aria object prop (use aria-label on host)
  - io-switch: remove deprecated boolean error/errorMessage props (use state/message)
  - io-tag: remove deprecated removable prop, color prop, and IoTagColor type
  - io-tag-dismissible: define IoTagDismissibleVariant type (replaces re-export of removed IoTagColor)
  - io-table-head-row: remove deprecated selectAllChecked/selectAllIndeterminate props (use selectionState)
  - io-textarea: remove deprecated lowercase autocomplete prop (use autoComplete)
  - io-input: remove deprecated lowercase autocomplete prop (use autoComplete)
  - io-toast-item: remove deprecated actionLabel/actionHref props (use actions array)
  - io-toast: remove deprecated getCurrent() method from IoToastManagerClass (use getVisible())

- c67abe1: feat(io-tag, io-badge, io-tag-dismissible): semantic variant API, appearance modifier, icon props, optional label

  - io-tag and io-badge: introduce semantic `variant` prop (`neutral | primary | info | success | warning | error | subtle`) replacing brand-colour `color` names; `color` is still accepted with a dev-mode deprecation warning
  - io-tag and io-badge: add `appearance` prop (`soft | solid | frosted`) for fill-style control; frosted applies `backdrop-filter: blur` over a translucent fill
  - io-tag and io-badge: add `icon` (IoIconName) and `iconSource` (custom SVG URL) props for leading icons; matches io-tag-dismissible API
  - io-tag: deprecate `removable` prop with dev-mode console.warn pointing to `<io-tag-dismissible>`; removable still works for backwards compatibility
  - io-tag-dismissible: make `label` prop optional; when omitted, the default slot is rendered as chip content and the dismiss button aria-label falls back to slot text content then 'Remove'

### Patch Changes

- 0dbcc87: fix(io-input): standardise counter SR wording to "{n} of {max} characters" and remove setTimeout debounce (#921); consolidate three duplicate state-message `<p>` blocks into a single element with role driven by state (#1167); unify FACE/error rendering across io-input-password, io-input-search, and io-input-date by merging faceInvalid into showError and removing the separate double-rendered error block (#922); make reportValidity() set touched=true so FACE errors surface before blur on programmatic calls (#1168); deprecate lowercase `autocomplete` prop on io-input and add canonical camelCase `autoComplete` to io-textarea (#1146).
- ad3db67: Add automatic dark-mode via `@media (prefers-color-scheme: dark)` and `.io-scheme-*` utility classes; add missing dark-mode overrides for overlays, shadows, and primary tints; fix `--io-focus-inner` contrast on solid buttons via `outline + outline-offset`; replace primitive token references in io-tag, io-tag-dismissible, io-badge, io-pagination, and io-sheet with semantic tokens that flip in dark mode; add `@media (forced-colors: active)` blocks to io-button, io-input, io-checkbox, io-radio, io-select, io-tag, and io-badge for WCAG 1.4.1 / 1.4.11 Windows High Contrast Mode support.
- 7f5ebeb: Add WCAG 1.4.1 error border-width tokens for all form-field components (io-input, io-textarea, io-select, io-multi-select, io-switch, io-input-date, io-input-search, io-input-password). Each error state now pairs border-color change with border-width change via a component-scoped token, satisfying the non-color-only indicator requirement. Introduces per-component typed CSS-variable constant files (css-variables.ts) for io-button, io-toast, io-toast-item, and io-modal; marks naming-convergence alias tokens as deprecated in public-css-api.json with replacedBy metadata; generates docs/tokens-meta.json from public-css-api.json for storefront auto-generation; and documents the per-component css-variables.ts pattern in CONTRIBUTING.md.
- ded681f: Add fluid spacing scale (2xs–2xl via clamp), extended radius tokens (2xl/3xl/4xl + full alias), fluid clamp-based typography scale (lg–7xl), dynamic ex-based line-height token, system-wide density contract tokens, and structured color palette JSON primitive. Migrates io-heading and io-text to --io-line-height-dynamic; deprecates --io-space-14/15 orphan steps and --io-border-radius-pill in favour of --io-border-radius-full.
- 92613b1: feat(tokens): add blur-frosted primitives, gradient-stop sequences, color state variants (medium/low/frosted), breakpoint JS exports, shadow elevation refactor, font-weight scale reduction, and CSS light-dark() support. Adds --io-blur-frosted (32px) with scale (sm/md/lg), 16-step fade-black/fade-white gradient stop sequences, 16 semantic state color variants across error/success/warning/info, bare-number breakpoints.ts module for JS callers, monotonic shadow scale (sm/md/lg with xl/2xl backward-compat aliases), deprecated font-weight tokens reclassified as internal, and @supports color-scheme: light dark declaration in :root.
- e5aa9d1: refactor(forms): extract shared FACE utilities — syncFormState, StateMessage, Required, IO_FIELD_STATES

  - **#1141** Add `src/utils/form/sync-form-state.ts` — centralises ElementInternals wiring across all 8 form components. Fixes the `disabled=true` invalid-form-control-not-focusable browser error by skipping `setValidity` for disabled fields. Refactored: io-input, io-textarea, io-checkbox, io-radio, io-select, io-switch, io-multi-select, io-pin-code.
  - **#1151** Add `src/components/common/state-message/StateMessage.tsx` — shared functional component for error/success/warning message rendering. `role="alert"` for error, `role="status"` for success/warning. Adopted by io-input, io-textarea, io-checkbox, io-radio, io-select.
  - **#1143** Add `src/components/common/required/Required.tsx` — shared functional component for the required asterisk indicator (`aria-hidden="true"`). CSS class unified to `.io-required` across all form components.
  - **#1171** Add `IO_FIELD_STATES` runtime constant to `src/utils/field-state.ts` and mirror to `io-storefront/src/utils/field-state.ts`. Storefront stories for io-input, io-textarea, io-checkbox, io-radio, io-select, io-input-search, io-input-password, io-input-date, io-pin-code now use `[...IO_FIELD_STATES]` instead of literal arrays.
  - **#1140** Document warning state semantics with JSDoc in `field-state.ts`: warning is advisory-only, never affects FACE validity, uses `role="status"` (polite). Add `field-state.spec.ts` locking the FACE/role contract.

- 2da75db: Add implicit form submission on Enter key for all io form-field inputs. Creates a shared `implicitSubmit` utility in `utils/form/implicit-submit.ts` that walks the associated form's submit controls (native and `io-button[type=submit]`) and wires it into `io-input`, `io-input-password`, `io-input-search`, `io-input-date`, and `io-pin-code` via `onKeyDown`. Textarea supports Ctrl+Enter for submission while plain Enter continues to insert newlines.
- ee7f201: fix(io-multi-select): improve ARIA semantics, keyboard UX, and field-state parity

  - Trigger `aria-label` now summarises selection (e.g. "Label: A, B") so screen readers announce selections without relying on chip DOM order (#937)
  - Typeahead: single printable keypress while listbox is open jumps to first matching option; buffer resets after 500 ms (#1077)
  - Chevron rotates 180° when dropdown opens, respects `prefers-reduced-motion` (#1075)
  - Inline "Clear selection" button placed as sibling of trigger (44×44 px, keyboard-accessible) so users can clear without opening the dropdown (#1111)
  - Add `maxSelections` prop; blocks additions beyond the cap and emits `limitreached` event with `{ max, attempted }`; over-limit unselected options rendered `aria-disabled` (#1070)
  - Add `description`, `helperText`, and `warning` state props for parity with `io-select` (#910)

- 598179a: fix(io-radio, io-checkbox, io-radio-group, io-checkbox-group): formStateRestoreCallback for io-radio (#1159); AOM ariaLabelledByElements external label support for io-checkbox, io-radio, io-switch (#1164); aria-labelledby wired to fieldset legend in both groups (#1154); presentational-only contract documented and locked for io-checkbox-group (#1162); state/message API added to io-radio-group and io-checkbox-group matching Wave-XI form standard (#1152); io-radio mutual-exclusion scoped to ancestor io-radio-group to prevent cross-group interference (#941).
- edcd804: fix(io-pin-code): Enter now submits parent form via requestSubmit(); Dead/Process keys recover via blur-rAF-focus; SMS autofill distributes bulk input across all slots. feat(io-pin-code): add `mode` prop ('numeric'|'alphanumeric'), extend `length` range to 1-8, add `description` prop (renders between label and slots, wired into aria-describedby), and add `validationMessage` prop for customising the required-field error string.
- 76c7b82: fix(io-toast, io-banner): live region mounts, focus restore, stacked dismiss, dismiss double-emit

  io-toast: host role is now always "status" (never mutates to alertdialog); a separate always-mounted role="alert" assertive region is populated only for persistent/error toasts, preventing screen-reader live-region re-registration. The toast manager now shows up to 3 toasts simultaneously with independent auto-dismiss timers, and exposes `dismiss(id?)`, `dismissAll()`, and `getQueue()` on both the manager and the io-toast element.

  io-banner: the inner live-region wrapper is now always present in the DOM and toggled via aria-hidden + CSS display:none (fixes NVDA/JAWS first-open missed announcement). Focus management refactored: opener element is captured on open and restored on dismiss (WCAG 2.4.3). Focus moves to the dismiss button whenever open && dismissible transitions become true (including runtime toggles). A \_dismissing guard prevents duplicate dismiss events from rapid Escape presses; an exit animation plays before open is set to false.

- 0786922: fix(io-tabs-bar): use navigation semantics for anchor children (#978); anchor-only children now render inside a `<nav>` landmark with `aria-current="page"` instead of `role="tablist"` + `aria-selected`. Add ResizeObserver to re-center the active tab on container resize (#968). Add edge-fade CSS mask with IntersectionObserver sentinels to signal overflow (#961). Add `--io-tabs-bar-fade-size` and `--io-tabs-bar-fade-color` public tokens. Add new `io-tab-panel` sub-component that auto-wires ARIA contracts when used inside `io-tabs`, eliminating manual `panelIds` management (#953). Add `closeable` prop and `tabClose` event to `io-tabs` for dismissible tabs with accessible close buttons (#949).
- f1acbe5: fix(io-spinner, io-progress): ARIA and animation improvements. io-progress now sets aria-busy="true" in indeterminate mode and throttles aria-valuenow to integer-only changes to reduce screen reader verbosity; indeterminate animation replaced with a two-stage primary/secondary keyframe pattern that eliminates the gap between cycles, controlled by the new --io-progress-indeterminate-duration token. io-spinner migrates from a CSS-border ring to a two-circle SVG (track + arc) for smoother rendering and forced-colors support; adds a context prop (inline|blocking) to switch between role="status" and role="alert"; expands size scale to include xs and xl; exposes --io-spinner-size, --io-spinner-color, --io-spinner-track-color, and --io-spinner-duration CSS variable overrides; deprecates the aria object prop in favor of native host attributes.
- 33ae708: fix(io-modal): use target-based backdrop detection instead of coordinate check (#991)

  fix(io-modal,io-flyout,io-sheet): refcount scroll lock across stacked overlays (#966)

  fix(io-modal,io-drawer): defer dialog.close() until fade-out transition completes on Safari/Firefox (#975)

- 851ea11: fix(io-modal): native dialog top-layer inertness, extended focus trap selector, deterministic auto-focus, user-initiated dismiss event semantics, and narrowed aria prop type for io-modal and io-drawer.
- 774df65: refactor(io-input,io-modal): extract shared input-base and dialog-utils helpers

  Introduces two internal utility modules with no public API changes:

  - `src/utils/input-base.tsx` — shared state icons, wrapper class builder, describedBy builder, and below-field message tree used by io-input, io-input-password, io-input-search, and io-input-date.
  - `src/utils/dialog-utils.ts` — shared focusable element query, scroll lock, inert sibling management, and focus trap attach/detach used by io-modal, io-drawer, io-flyout, and io-sheet.

  No component props, events, slots, or behaviors were changed.

- 0f2a763: fix(overlays): add backdrop prop to io-modal (#983), add logical start/end RTL position to io-flyout (#981), guard inaccessible swipe-only close path in io-drawer (#1098), implement swipe-to-dismiss on io-sheet drag handle via shared util (#982), and add --io-motion-overlay-duration token with prefers-reduced-motion override across all four overlay components (#1019).
- 02a8ea8: fix(io-popover): adopt @floating-ui/dom for viewport-aware positioning with flip, shift, and autoUpdate; add directional arrow indicator via new `arrow` prop and `--io-popover-arrow-size` token; mirror `aria-controls` and `aria-expanded` onto inner shadow-DOM focusables of custom-element triggers while preserving consumer-set `aria-haspopup`; move focus into panel only when opened by keyboard (Enter/Space) per WCAG 3.2.1.
- ab82d28: Fix form and notification live-region and accessibility correctness (#1094, #1092, #941, #1024, #1076). Error live-regions in io-input, io-checkbox, io-radio, and io-textarea are now permanently mounted with aria-describedby pre-established before any error occurs. io-checkbox and io-radio gain a ::after pseudo-element extending the hit zone to 24 px minimum (WCAG 2.5.8). io-radio mutual exclusion is now scoped to the nearest io-radio-group, preventing cross-group interference when two groups share the same name. io-inline-notification moves role/aria-live off the Host element onto the inner div with a variant-keyed remount so severity changes are re-announced. io-banner keeps its live-region wrapper permanently mounted, toggling visibility via aria-hidden and display:none so the first-open announcement is reliable across NVDA, JAWS, and VoiceOver.
- 1a566e1: Unify form error API and fix state consistency across form components. Adds `state`+`message` props to `io-checkbox-group`, `io-radio-group`, and `io-switch` (deprecating `error`/`errorMessage`). Fixes `io-checkbox-group` to preserve per-child state when group state is `'none'`. Extends `io-checkbox-group` aria denylist with `aria-required` and `role`. Removes double error `<p>` rendering from `io-input-password`, `io-input-search`, and `io-input-date`. Makes `name` prop optional (non-null-asserted) on `io-radio-group` and `io-checkbox-group`, emitting a `console.error` when omitted.
- 604dcf4: fix: resolve post-parity release blockers

  - Remove internal reference terms from component source, JSDoc, and storefront pages
  - Delete dead CSS selectors in io-modal-styles (backdrop shading block, CSS-var-in-@media fullscreen breakpoint)
  - Remove orphaned public-css-api.json token entry for removed CSS var
  - Fix io-modal focus trap to resolve slotted elements via assignedElements({ flatten: true })
  - Fix io-multi-select nested button structure (button > button is invalid HTML5)
  - Add @State faceInvalid to io-radio-group for WCAG 4.1.3 re-render on validation change
  - Set shadow: { delegatesFocus: true } on io-toast and io-segmented-control (was shadow: true)
  - Fix io-banner double keydown listener (connectedCallback registers, componentWillLoad was redundant)
  - Simplify io-progress aria-valuenow to pure inline integer rounding (removes @State mutation in render)

## 1.7.0

### Minor Changes

- d125be7: Remove `compact` prop from `io-button`. The compact density variant is not part of the iO button specification. Use the `size` prop (`sm`, `md`, `lg`) for button density control.

## 1.6.0

### Minor Changes

- e2faf01: feat(io-carousel): add autoplay with play/pause control (WCAG 2.2.2)
- 6951a70: feat(io-text-list): add new list typography primitive component
- 309e897: feat(a11y): full FACE lifecycle and new props for io-input-date, io-input-search, io-input-password, io-multi-select

  - io-input-date: add full FACE validity (syncFormValue + @Watch + formResetCallback), readonly, loading, step props; add checkValidity/reportValidity methods; gate faceInvalid on touched; add FACE error element with aria-describedby (WCAG 3.3.1)
  - io-input-search: add full FACE validity lifecycle, readonly, loading, maxLength, minLength props; gate faceInvalid on touched; add FACE error element (WCAG 3.3.1)
  - io-input-password: add full FACE validity lifecycle, readonly, loading, maxLength, minLength props; gate faceInvalid on touched; add FACE error element (WCAG 3.3.1)
  - io-multi-select: wire aria-describedby on combobox trigger to include face-error id when faceInvalid is active, so screen readers can announce FACE validation errors (WCAG 3.3.1, WCAG 4.1.2)

- f0a064d: fix(a11y): correct selection component semantics (#839 #856 #859)

  - io-select: remove aria-hidden="true" from combobox group heading span; wrap group options in `<ul role="group" aria-labelledby>` so grouped listbox items are programmatically associated (WCAG 1.3.1)
  - io-radio-group: replace aria-live="polite" with role="alert" aria-atomic="true" on the error paragraph so screen readers announce validation errors immediately (WCAG 4.1.3)
  - io-segmented-control: add `label` and `hideLabel` props; wire `aria-label` to the `role="group"` Host element; log console.error when label is absent (WCAG 4.1.2)

- b37a650: fix(a11y): FACE validity, error association, and lifecycle callbacks for io-input-date, io-input-password, io-input-search, io-multi-select

  - io-input-date: add full `syncFormValue()` with native validity derivation, `faceInvalid`/`touched` states, `@Watch` decorators for `value`/`required`/`min`/`max`, `formDisabledCallback`, `formStateRestoreCallback`; update render for `showFaceError` + `aria-describedby` wiring (closes #817, #845)
  - io-input-password: add `maxLength`/`minLength` props, full FACE validity pattern matching io-input gold standard, `formDisabledCallback`, `formStateRestoreCallback` (closes #835)
  - io-input-search: add full FACE validity pattern, fix clear button firing when `disabled=true` (closes #841)
  - io-multi-select: wire `aria-describedby` on trigger to include `faceErrorId` when `faceInvalid=true` and no external message (closes #840)

- cabed24: Batch 8 a11y improvements (#838, #848, #867):

  - io-tabs-bar: add `labelledBy` prop for `aria-labelledby` support when an external heading labels the tab group (#838)
  - io-input: include character counter live region ID in `aria-describedby` so screen readers announce count on focus and on change (#848)
  - io-carousel: add `skipLabel` prop and visually-hidden skip link as first focusable element, allowing keyboard users to bypass the carousel (#867)

- d4960b8: P2 batch 6: additive props — io-pagination showLastPage (#832), io-input-password toggle (#851), io-table layout (#869)
- bee1f38: Add orientation and loading props to io-checkbox-group (#830, #833); add actionLabel, actionIcon, actionLoading props and action event to io-banner (#842)
- 7d6846f: Batch 9 complex feature improvements (#827, #836, #847):

  - io-pin-code: add `loading` prop (disables inputs, shows spinner, sets `aria-busy="true"`) and `form` prop (out-of-DOM form association via ElementInternals) (#827)
  - io-breadcrumb: add `maxItems` prop — collapses long breadcrumb trails into first item + expand button + last items; expand button has descriptive `aria-label` for screen readers (WCAG 1.3.1) (#836)
  - io-tabs-bar: add animated sliding `.indicator` element driven by Web Animations API; respects `prefers-reduced-motion`; replaces static `border-bottom-color` transition (#847)

- f59f85b: P2 batch 5 — runtime/docs fixes: flyout backdrop token (#875), popover open event (#849), tabs update contract (#829)

  - io-flyout: replace cross-component `--io-drawer-backdrop` with scoped `--io-flyout-backdrop` token
  - io-popover: add `open` event emitted when panel transitions to open state (symmetric with `dismiss`)
  - io-tabs: document that `update` fires only on user interaction, never on programmatic `activeTabIndex` changes

- e61a928: Fix remaining issues: io-segmented-control per-segment disabled state; io-textarea counter sr-only live region; io-input-password aria-pressed on toggle; io-input formDisabledCallback + formStateRestoreCallback; io-switch hideLabel prop; fix slot docs for io-input and io-textarea; fix aria-disabled doc error for io-switch.
- a45b20d: Remove `compact` prop from `io-button`. The compact density variant is not part of the iO button specification. Use the `size` prop (`sm`, `md`, `lg`) for button density control.

### Patch Changes

- 7de3ee8: fix(a11y): keyboard navigation and focus trap fixes for io-scroller, io-table, io-tag, and io-sheet

  - io-scroller: implement Arrow key keyboard handlers on the scrollable region (WCAG 2.1.1)
  - io-table: add tabIndex=0 to scroll wrapper so keyboard users can reach overflowed content (WCAG 2.1.1)
  - io-tag: replace disabled attribute with aria-disabled to keep disabled tags in tab order (WCAG 2.1.1)
  - io-sheet: simplify focus trap to use document.activeElement exclusively — shadowRoot.activeElement returns the slot host, not the focused node, causing incorrect Tab wrap behaviour (WCAG 2.1.2)

- ecc544e: fix(a11y): small component accessibility fixes — label warnings, aria-label attribute mapping, indeterminate @Watch, and 44 px touch targets

  - io-progress: add componentWillLoad console.error when neither label nor labelledBy is provided (WCAG 4.1.2)
  - io-link: add componentWillLoad console.error when href prop is absent (WCAG 4.1.2)
  - io-checkbox: add @Watch('indeterminate') to call syncFormValue() on programmatic indeterminate changes
  - io-badge: change ariaLabel prop from string | null to string | undefined with attribute: 'aria-label' so aria-label HTML attribute is correctly mapped (matches io-wordmark pattern)
  - io-banner: dismiss button min-width and min-height raised from --io-space-6 (24 px) to --io-touch-target-min (44 px) (WCAG 2.5.8)
  - io-inline-notification: same dismiss button touch-target fix as io-banner

- 09ef9b0: fix(a11y): remove invalid aria-checked from io-select option role, add missing-label warning to io-button-group, move aria-label to host element in io-badge, add aria-required to io-pin-code group role, enforce WCAG 2.5.8 touch target on io-toast-item close button
- 61db49c: fix(p1-a11y): accessible name warnings, slide roles, FACE error text, indeterminate live region
- c04ea7f: fix(p1-face): sync form control state — required propagation, formStateRestoreCallback, FACE edge cases

  - io-checkbox-group: add @Watch('required') so runtime required changes re-sync children (#771)
  - io-checkbox-group: propagate required prop to child io-checkbox elements in syncChildren (#804)
  - io-radio-group: add formStateRestoreCallback for browser autofill and history state restore (#778)
  - io-checkbox: add comment clarifying indeterminate + required = valueMissing; add FACE spec coverage (#794)

- a9b5aa9: fix(p1-aria): io-link ariaCurrent prop, external icon, io-flyout closeLabel and accessible name warning

  - io-link: add `ariaCurrent` prop forwarding `aria-current` to the anchor for active nav links (#791)
  - io-link: auto-render `external-link` icon when `external=true` and no explicit icon is set (#821)
  - io-flyout: add `closeLabel` prop (default `'Close flyout'`) for contextual close button label (#816)
  - io-flyout: fix `componentWillLoad` warning — suppress when host `aria-label` is already set (#820)

- 0935ed6: fix(p1-a11y): disabled prop for io-tag-dismissible, popover scroll/resize reposition, tabs-bar active tab scroll into view, sheet transition events + scroll-lock cleanup, drawer inert management

## 1.5.0

### Minor Changes

- 58362b0: feat(io-accordion): compact prop, alignMarker prop, grid animation, CSS tokens, a11y fixes (#629)

  - Replace max-height transition with grid-template-rows 0fr→1fr animation — panel expands to true content height with no fixed cap
  - Add `compact` boolean prop (`@Prop({ reflect: true })`) for dense-UI contexts — reduces trigger padding and font size independent of the `size` preset
  - Add `alignMarker: 'start' | 'end'` prop (default `'end'`) — places expand/collapse icon before the title when `start`, via `order: -1` CSS
  - Remove native `disabled` attribute from trigger button; keep only `aria-disabled` — button stays focusable, screen readers announce it as unavailable (WCAG 4.1.2)
  - Add `visibility: hidden` on collapsed panel as fallback for browsers without full `inert` support (WCAG 2.1.1)
  - Add CSS token overrides: `--io-accordion-border-color` (divider), `--io-accordion-py` / `--io-accordion-px` (trigger padding), `--io-accordion-summary-top` (sticky top offset)
  - Panel inner gets `min-height: 0` required for grid-template-rows collapse
  - Storefront API page, stories, and story specs updated; all tests pass

- 4e3ad33: feat(io-avatar): add `role` prop and fix ARIA role/label logic (#626)

  - Add `IoAvatarRole = 'img' | 'presentation' | 'none'` type
  - Add `@Prop() role?: IoAvatarRole` — auto-computed from rendering mode when omitted
  - Default: `role="presentation"` when image is visible (img alt carries accessible name); `role="img"` for initials and icon-only modes
  - `aria-label` set only when `role="img"`: initials → `name`, icon → `alt || name || 'User avatar'`
  - Add `--io-avatar-icon-size: var(--io-icon-size-md)` token to app.css (fixes undefined token in styles)
  - Update storefront API, accessibility pages and stories

- 03f3c96: feat(io-banner): Escape key dismiss, focus management, warning→assertive, position prop (#628)

  - Escape key dismisses open+dismissible banner (WCAG 2.1.2)
  - Focus moves to dismiss button on open (WCAG 2.4.3); keydown listener lifecycle-managed via Watch/connectedCallback/disconnectedCallback
  - `warning` variant now uses `role="alert"` (assertive) alongside `error` (SC 4.1.3)
  - Dismiss button gets `min-width/height: 24px` (WCAG 2.5.8)
  - New `position: 'top' | 'bottom'` prop with flipped entry animation for bottom
  - New `headingTag: IoBannerHeadingTag` prop (default 'h5') for semantic heading (WCAG 1.3.1)
  - New `description?: string` prop renders a `<p>` below the heading
  - CSS token overrides: `--io-banner-max-w`, `--io-banner-top`, `--io-banner-bottom`, `--io-banner-inset-x`, `--io-banner-z-index`
  - Storefront API page and stories updated; 44 component + 18 storefront tests pass

- a94b542: feat(io-breadcrumb): close beta-to-stable API/a11y gaps (#627)

  - `io-breadcrumb`: add `label` prop (default `'Breadcrumb'`) bound to `aria-label` on the nav landmark — fixes WCAG 2.4.6 localisation and multi-breadcrumb-per-page violations
  - `io-breadcrumb-item`: add `target` prop; when `'_blank'`, auto-applies `rel="noopener noreferrer"` (WCAG 3.2.2)
  - `io-breadcrumb-item`: add `itemLabel` prop for accessible name override on icon-only or supplemented items (WCAG 4.1.2)
  - `io-breadcrumb-item`: fix focus ring — add `box-shadow: 0 0 0 4px var(--io-focus-outer)` alongside the existing outline to match the system-wide WCAG 2.4.11 focus pattern
  - `io-breadcrumb-item`: align separator default from `'›'` to `'/'` to match storefront API documentation
  - `app.css`: add global tokens `--io-breadcrumb-separator`, `--io-breadcrumb-font-size`, `--io-breadcrumb-item-color`, `--io-breadcrumb-current-color`, `--io-breadcrumb-separator-color` for per-instance theming without specificity hacks
  - Storefront: update API, Usage, Accessibility, Examples pages; add i18n and target=\_blank stories

- 93df2a7: feat(io-carousel): heading, description, pagination, and alignHeader props

  - heading?: string rendered above slide track
  - description?: string rendered below heading
  - pagination: boolean — dot indicators synced with active slide
  - alignHeader: "left" | "center"
  - Exports IoCarouselAlignHeader type

- 807abd3: feat(io-checkbox): blur event, compact prop, formStateRestoreCallback, aria-disabled on loading, value default 'on', CSS tokens, keydown guard (#630)

  **New features:**

  - `blur` event (`EventEmitter<FocusEvent>`, bubbles: false, composed: true) — enables form library touched/dirty tracking. Native blur is stopped before re-emitting via the EventEmitter.
  - `compact` prop (`@Prop({ reflect: true }) compact = false`) — dense layout mode scaling checkbox to 75% size with smaller label font via internal `--_io-checkbox-scaling` token.
  - `formStateRestoreCallback` — FACE contract implementation enabling browser bfcache restore and autofill for checkboxes.
  - `@Listen('keydown')` guard — prevents Space key from toggling when `disabled` or `loading`.

  **Bug fixes / alignment:**

  - Default `value` changed from `''` to `'on'` to match native HTML checkbox default (RFC 1866 §8.1.2).
  - `aria-disabled="true"` added to the native input when `loading=true` (WCAG SC 4.1.2). The native input is now always kept in the DOM when loading — only the visual is swapped via conditional rendering — preventing stale `ref` issues in form libraries.

  **CSS tokens:**

  - `--io-checkbox-border-color` — consumer override for resting/hover border colour.
  - `--io-checkbox-background-color` — consumer override for checked/indeterminate fill colour.
  - `--io-checkbox-icon-color` — consumer override for checkmark/dash icon colour independent of fill.
  - Removed hardcoded hex fallbacks for `success`/`warning` border and message colours; now uses `--io-color-success` / `--io-color-warning` tokens unconditionally.

- 971b5a8: feat(io-select, io-textarea, io-radio-group, io-popover): add description prop for supplementary field context
- f953e9e: feat(io-sheet): add bottom sheet overlay component
- 6d8730d: feat(io-input-password, io-input-search, io-input-date): add specialized input type components
- 3e5e774: Added `lg` size variant and `ariaLabel` prop to io-badge component. The `lg` size provides larger spacing and font sizing suitable for prominent badges, and `ariaLabel` provides accessible labeling for icon-only or abbreviated badges. Partially addresses #631 (size and labeling; contrast issues remain open).
- bb769f9: feat(io-button): compact prop, typed ARIA attributes, disabled anchor focusability

  - Adds `compact` prop — reduces vertical padding via `--io-button-padding-y-compact` token without changing the size classification
  - Types `aria` prop as `Partial<Record<IoButtonAriaAttribute, string>>` for compile-time guidance on semantically-relevant ARIA attributes (exports `IO_BUTTON_ARIA_ATTRIBUTES` const)
  - Fixes WCAG 2.4.3: disabled/loading anchor-as-button now retains `tabIndex=0` so keyboard users can discover it

- e7d7e48: fix(io-carousel): boundary disabled states, previousIndex in update event (#639)

  - WCAG 4.1.2: prev/next buttons disabled at boundaries when rewind=false
  - Contextual aria-labels at boundaries for rewind=true
  - IoCarouselUpdateDetail now includes previousIndex

- 1f14dfd: fix(io-checkbox-group): required indicator, role=alert, syncChildren bug, aria prop (#633)

  - WCAG 1.3.1/4.1.2: required prop now renders visual indicator (\*) in legend (aria-hidden) so screen readers hear the label naturally
  - WCAG 4.1.3: error message changed from aria-live="polite" to role="alert" + aria-atomic="true" for immediate screen reader announcement
  - Fixes syncChildren bug: re-enabling group now unconditionally assigns disabled to children (was guarded by `if (this.disabled)` preventing re-enable propagation)
  - Propagates error state to child io-checkbox elements via syncChildren (error=true → state="error", error=false → state="none")
  - Adds @Watch('error') to re-sync children when error prop changes
  - Adds aria escape-hatch prop spread onto fieldset via applyAriaProp utility

- 702dc06: feat(io-drawer): add `dismissButton` prop, fix `dismiss` event to fire only on user-initiated closes, add dev-time console.error when no accessible label is supplied
- 9e83bdb: feat(io-heading): add inverse/brand colors, apply line-height and tracking tokens

  - Adds `inverse` and `brand` to `IoHeadingColor` type union
    - `inverse` maps to `--io-text-inverse` (use on dark surfaces)
    - `brand` maps to `--io-color-primary`
  - Applies `--io-line-height-heading` (1.2) to all heading sizes
  - Applies `--io-heading-tracking-*` letter-spacing tokens for xl–4xl sizes (negative tracking for display headings)
  - Updates storefront propDefinitions, API docs, and adds a Colors example section

- 21f6734: feat(io-icon): add color prop mapped to semantic design tokens

  Adds a `color` prop to `io-icon` with values: `primary`, `contrast-high`,
  `contrast-medium`, `success`, `warning`, `error`, `info`, `inherit` (default).

  When set, the component inlines `--io-icon-color` on the host element which
  the Shadow DOM `color` property resolves via `var(--io-icon-color, currentColor)`.
  This removes the need for wrapper-level CSS while keeping colors token-driven.
  External CSS cannot override the inline style; use the `color` prop to change
  the icon color. Closes #641.

- d6679b5: feat(io-inline-notification): headingTag prop, warning ARIA role fix, dismiss touch target (#638)

  - Adds headingTag prop (defaults to 'h5') replacing non-semantic <strong> for correct document outline
  - Fixes WCAG 4.1.3: warning variant now uses role="alert"/aria-live="assertive" (was role="status"/polite)
  - Fixes WCAG 2.5.8: dismiss button minimum touch target increased to 24×24px

- c70b6df: feat(io-input): inputMode prop, pattern prop, compact prop, counter a11y live region (#643)

  **New features:**

  - `inputMode` prop (`IoInputMode | undefined`) — wired to native `inputmode` attribute, hints the virtual keyboard type on mobile. Values: `'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'`.
  - `pattern` prop (`string | undefined`) — wired to native `pattern` attribute for regex-based input validation. Triggers `@Watch('pattern')` → `syncFormValue()` so FACE validity is re-evaluated when the constraint changes.
  - `compact` prop (`@Prop({ reflect: true }) compact = false`) — dense layout mode that reduces field height by ~8px and vertical padding to `var(--io-space-1)` (4px) via `:host([compact])` CSS selector.
  - `input-counter-sr` visually-hidden `<span aria-live="polite" aria-atomic="true">` — announces character count changes to screen readers when `counter=true`. The existing visual counter div retains `aria-hidden="true"`.

  **Type exports:**

  - `IoInputMode` type union exported from `types.ts`.

- 780df89: feat(io-link): add `icon`, `iconSource`, and `hideLabel` props; fix disabled `tabIndex`

  - `icon` (IoIconName): renders a leading `io-icon` with `aria-hidden="true"` before the label slot
  - `iconSource` (string): renders a custom inline SVG with `aria-hidden="true"` before the label slot
  - `hideLabel` (boolean): visually hides the label span (screen-reader accessible) for icon-only links
  - Disabled anchor now uses `tabIndex={0}` instead of `tabIndex={-1}` so keyboard users can still focus the element; `aria-disabled="true"` continues to block navigation (WCAG 2.1.1)

- f3feb16: feat(io-modal): add `dismissButton` prop and WCAG 4.1.2 accessible-name warning (#646)

  - Add `@Prop() dismissButton = true` — when `false`, hides the built-in close (×) button and suppresses ESC-key / native cancel-event dismissal; enables confirmation-style dialogs where the user must explicitly choose an action
  - Add dev-time `console.error` in `componentWillLoad()` when no accessible name is provided (`heading`, `aria-label`, or `aria-labelledby`) to enforce WCAG 4.1.2 dialog labelling requirement

- 1978525: fix(io-multi-select): auto-placement bug, chip touch targets, blur/toggle events, formStateRestoreCallback (#649)

  - CRITICAL: fixes dropdownDirection=auto always resolving to bottom-start (flip middleware now active for auto; pinned directions use new getMultiSelectPinnedMiddleware without flip)
  - WCAG 2.5.8: chip remove buttons now have 24x24px minimum touch target (min-width/min-height)
  - Adds blur event for touched/dirty form tracking (emitted from trigger onBlur when dropdown is closed)
  - Adds toggle event signalling dropdown open/close state changes
  - Adds formStateRestoreCallback for browser form state restoration (supports FormData and comma-separated string)

- 38d961e: feat(io-pagination): intl prop for i18n, type=button safety fix, previousPage in change event (#645)

  - Adds `intl` prop (IoPaginationIntl) for localizing nav/page/prev/next labels
  - Adds `type="button"` to all pagination buttons to prevent accidental form submission
  - Extends IoPaginationChangeDetail with `previousPage: number`

- 7d2ac3f: feat(io-progress): add labelledBy, valueText, min/max, and indeterminate props

  Adds ARIA enhancements and flexible range support:

  - `labelledBy` prop: aria-labelledby support (takes precedence over label)
  - `valueText` prop: aria-valuetext for custom descriptions (e.g., "3 of 5 steps")
  - `min`/`max` props: support custom numeric ranges with auto-calculated percentage
  - `indeterminate` prop: shimmer animation when state is unknown (omits aria-valuenow per ARIA spec)

  Includes new `computePercentage()` utility for normalized range calculations and `@keyframes io-progress-indeterminate` animation.

- 7f5dc27: feat(io-radio-group): roving tabindex, FACE, required propagation, aria-required (#653 #648)

  - WCAG 2.1.1: Implements ARIA APG roving tabindex keyboard navigation (Arrow keys, Home, End)
  - Fixes syncChildren bug: re-enabling group now correctly un-disables children
  - Adds formAssociated/FACE with formResetCallback and formDisabledCallback
  - Propagates required from group to children in syncChildren
  - Adds aria-required on fieldset for WCAG 4.1.2

- 485d556: feat(io-scroller): clickable scroll arrows, conditional tabIndex, compact prop (#644)

  - Adds clickable prev/next indicator buttons for pointer user navigation
  - WCAG 2.4.3: tabIndex on scroll region is now conditional (only added when content overflows)
  - Adds compact prop for dense layout contexts

- f31b9f8: feat(io-select): formStateRestoreCallback, toggle event (#662)

  - Adds `formStateRestoreCallback` for browser-native form state restore/autofill
  - Adds `toggle` event (`IoSelectToggleDetail = { open: boolean }`) fired when dropdown opens/closes

- 4d75a9f: feat(io-stepper): button wrapper, stepChange event, ariaLabel, warning state, disabled step (#656)

  - WCAG 2.1.1/4.1.2: io-step now renders inner <button> for keyboard accessibility
  - Adds stepChange event on io-stepper for consumer navigation callbacks
  - Adds ariaLabel prop on io-stepper for i18n override of nav landmark
  - Adds warning status to IoStepStatus for multi-step validation feedback
  - Adds disabled prop to io-step for blocking navigation during async operations

- aa2da77: feat(io-switch): loading prop, hover state, forced-colors HCM, blur event (#654)

  - Adds `loading` prop: blocks interaction, shows spinner overlay, sets `aria-busy="true"` on Host
  - Adds hover visual state on track via `var(--io-border-hover)` / `var(--io-color-primary-hover)` (WCAG 1.4.11)
  - Adds forced-colors / Windows High Contrast Mode support via `@media (forced-colors: active)` (WCAG 1.4.11)
  - Adds `blur` event (`EventEmitter<FocusEvent>`) for validation-on-blur patterns

- fcddd06: feat(io-table): aggregated sortChange event, ARIA APG sort-button, labelled scroll region (#664)

  - `io-table` now emits a non-bubbling `sortChange` event (detail: `{ key, direction }`) that aggregates the bubbling `sort` events from all `io-table-head-cell` children — consumers attach one listener on `io-table` instead of one per column across shadow-DOM boundaries
  - `io-table-head-cell` sortable columns now render a `<button type="button">` inside the `<th>` (ARIA APG sort-button pattern); `aria-sort` stays on the `<th>` (columnheader); keyboard activation (Enter/Space) is handled natively by the browser — custom `handleKeyDown` removed
  - `io-table` scroll wrapper (`role="region"`) now always carries `aria-label` equal to the `caption` value when provided, giving the landmark an accessible name (WCAG 1.3.1)

- 4f7362a: feat(io-tabs-bar): anchor support, compact prop, forced-colors HCM (#659)

  - Adds native <button> and <a> element support for tab and navigation tab patterns
  - Adds compact prop for dense layout contexts
  - Adds forced-colors / Windows High Contrast Mode support (WCAG 1.4.11)

- e195b8c: feat(io-tabs): add size, compact, labelledby, and panelIds props

  - `size: IoTabsSize` ('small' | 'medium') — controls tab button font-size via CSS class
  - `compact: boolean` — reduces tab button padding using density tokens (reflects to host attribute)
  - `labelledby?: string` — renders aria-labelledby on the tablist div for WCAG 4.1.2 compliance
  - `panelIds?: string[]` — maps 1:1 to slotted buttons; sets aria-controls on each button for full ARIA tabs pattern

- 7f897d2: feat(io-text): add hyphens prop and extend type unions (#650)

  - Add `IoTextHyphens = 'none' | 'manual' | 'auto' | 'inherit'` type (default: 'inherit')
  - When hyphens is 'auto' or 'manual', set `overflowWrap: 'break-word'` inline style
  - Add 'inherit' to `IoTextSize` union; when size === 'inherit', emit `fontSize: 'inherit'` (not a token)
  - Add 'info' to `IoTextColor` union, mapping to `var(--io-color-info)` in resolveColor()
  - Extend `IoTextTag` union with 'address' | 'figcaption' | 'cite' | 'legend' (semantic HTML support)
  - Add comprehensive test coverage for all new values and combinations

- c4fd3c7: fix(io-textarea): restore focus ring, add formDisabledCallback, extend resize type (#658)

  - Fixes WCAG 2.4.11: textarea :focus-visible now applies --io-focus-ring-active (was zeroing box-shadow)
  - Adds formDisabledCallback for fieldset-level disable propagation (FACE contract)
  - Adds formStateRestoreCallback for browser session restore / autocomplete (FACE contract)
  - Extends IoTextareaResize to include 'horizontal' and 'both' values

- bd05212: feat: add io-flyout component

  Side-anchored flyout panel. open/show()/close(), position left|right, heading prop.
  Focus trap, Escape to close, backdrop dismiss. role=dialog, aria-modal (WCAG 4.1.2).

- 89990cb: feat: add io-segmented-control and io-segment components

  FACE-compliant exclusive-selection component with unified bar styling.
  role=group / role=radio, roving tabindex keyboard navigation.

- d00e9fd: feat: add io-tag-dismissible component

  Tag with built-in dismiss button. 24x24px touch target (WCAG 2.5.8).
  aria-label="Remove {label}". Delete/Backspace keyboard dismiss.

- 2ea30f9: feat(io-radio-group, io-textarea): add loading prop with spinner overlay

  loading: boolean (default false) — shows io-spinner overlay, sets aria-busy, blocks interaction.

- 5930d0b: feat(io-spinner): aria prop, inherit size, forced-colors support (#647)

  - Add `aria` prop: `Partial<Record<'aria-label'|'aria-describedby'|'aria-live'|'aria-atomic', string>>` — spreads ARIA attrs onto Host; `aria['aria-label']` takes precedence over the `label` prop
  - Add `'inherit'` to `IoSpinnerSize` union — renders `1em × 1em`, scales with parent `font-size`
  - Add `@media (forced-colors: active)` CSS rule: `border-color: Canvas; border-top-color: ButtonText` so the spinning arc remains visible in Windows High Contrast Mode

- b951776: feat(io-spinner): add label prop for accessible name

  Adds label prop (default: "Loading") wired to aria-label on host.
  Spinner is now WCAG-compliant out-of-the-box without external wrapper.

- 5bd4f16: feat(io-toast): action/CTA API for io-toast-item, position prop reflect (#661)

  **New features:**

  - `actionLabel?: string` prop on `io-toast-item` — when set, renders a secondary call-to-action beside the notification text.
  - `actionHref?: string` prop on `io-toast-item` — when set alongside `actionLabel`, renders the CTA as an `<a href>` anchor; when omitted the CTA is a `<button>` that emits the `action` event.
  - `@Event({ bubbles: false }) action: EventEmitter<void>` on `io-toast-item` — fires when the action button (not link) is clicked.
  - `actionLabel` and `actionHref` added to `IoToastMessage` interface and passed through `io-toast` to `io-toast-item` automatically.

  **Bug fixes:**

  - `position` prop on `io-toast` changed from `@Prop()` to `@Prop({ reflect: true })` so CSS `:host([position='...'])` selectors work correctly for consumer style overrides.

- 2e4b0b5: fix(io-tooltip): WCAG 1.4.13 hoverable tooltip panel and 12 floating-ui placement variants (#663)

  **Bug fixes (WCAG 1.4.13 — hoverable):**

  - Removed `pointer-events: none` from the global tooltip overlay (`.io-tooltip-overlay` in `app.css`) and the shadow CSS (`io-tooltip-styles.ts`). The tooltip panel is now interactive so users can move the pointer into it to read or copy content.
  - Added a 150 ms hide-delay (`scheduleHide()`) after `pointerout` from the trigger, giving the pointer time to travel onto the panel without the tooltip disappearing.
  - If the pointer enters the tooltip panel (`pointerover` on the overlay element), any pending hide timer is cancelled immediately.

  **New features:**

  - `IoTooltipPlacement` type extended from 4 → 12 variants, matching all floating-ui placement strings:
    `top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end`
  - `isPlacement()` guard updated to recognise all 12 values; invalid attribute values still fall back to `'top'`.

### Patch Changes

- bcd2e1a: fix(io-button): add align-self: flex-start to host to prevent flex stretch

  When io-button is placed in a flex container with taller siblings, the default
  flex align-items: stretch causes the :host element to stretch vertically. Adding
  align-self: flex-start to the :host CSS block prevents this unwanted stretching
  while preserving inline-flex layout. Fixes #624.

- 9bfdb07: fix(io-button): implicit Enter-key form submission now works from sibling text inputs

  `<io-button type="submit">` now participates in the browser's implicit form submission algorithm. Pressing Enter in a sibling `<input>` (text, email, password, search, tel, url, number) correctly submits the associated form — matching native `<button type="submit">` behaviour.

  **Root cause**: the browser's implicit submission algorithm only traverses light DOM for native `<button>` elements. The `<button type="submit">` inside io-button's shadow root was invisible to this algorithm despite `formAssociated: true` being set.

  **Fix**: adds a `keydown` listener on the associated form that calls `form.requestSubmit()` when Enter is pressed in a text-like input and this button is the first `io-button[type="submit"]` in the form.

  Guards added:

  - Only the first `io-button[type="submit"]` in the form triggers submission (matches native "default button" semantics)
  - `textarea` Enter is intentionally excluded (inserts newline, not submit)
  - Non-text input types excluded (checkbox, radio, file, image, range, color, submit, reset, button)
  - `ev.isComposing` guard for IME input
  - `disabled` and `loading` states respected
  - Listener is cleaned up in `disconnectedCallback` and `formAssociatedCallback`
  - `@Watch('type')` and `@Watch('href')` reattach the listener on runtime prop changes

- 72cddb1: fix(io-button-group): define missing gap token, unique label IDs (#640)

  - Defines --io-button-group-btn-gap token in app.css (was referenced but undefined — silent layout collapse)
  - Fixes WCAG 4.1.1: label IDs are now unique per instance using an idCounter pattern

- 45a2237: fix(io-divider): add aria-label on labeled variant, default slot support, and forced-colors visibility

  - Set aria-label on the labeled divider separator element for better WCAG 4.1.2 label exposure
  - Add default slot support as alternative to label prop for rich separator content
  - Add @State() hasSlotContent to track when slot has content
  - Add onSlotchange handler directly on <slot> element to update slot state
  - Render slot content when present, falls back to label prop text
  - Add @media (forced-colors: active) rule in styles to ensure divider visibility in Windows High Contrast Mode
  - All divider variants (horizontal, vertical, labeled) now use ButtonText color in forced-colors mode
  - Add 11 new tests for aria-label, slot handling, and forced-colors support

- 9506ff5: fix(io-popover): disconnectedCallback cleanup, aria-haspopup on trigger (#652)

  - Fixes memory leak: disconnectedCallback now removes panelEl keydown listener via detachFocusTrap
  - Adds aria-haspopup="dialog" to trigger (including inner shadow DOM button for custom elements) for WCAG 4.1.2 compliance

- a4e49c3: fix(io-drawer): tokenise drag handle dimensions

  Adds --io-border-radius-2xs: 2px. Uses --io-space-8 and --io-space-1 for handle dimensions.

- 1235f98: fix(tokens): remove hardcoded hex fallbacks from component styles

  Strips the terminal hex fallback values (e.g. `#FFFFFF`, `#000000`, `#0000D2`,
  `#1a7f4b`, `#b45309`, `#e5e5e5`, `#666`, `#999`, `#111`) from all `var(--io-*, #hex)`
  and `var(--io-*, var(--io-alias, #hex))` patterns across io-form-field, io-input,
  io-radio, io-select, io-stepper, io-textarea, and io-wordmark styles.

  The CSS custom property references are kept as-is (bare `var(--io-token)` with no
  fallback), relying on the design-token definitions always being present at runtime.
  Also renames `--io-border-radius-full` → `--io-border-radius-pill` in io-stepper
  to align with the current token name.

- 8fa5573: fix(io-input): replace -2px focus offset with var(--io-field-focus-offset-y) token
- 79448ae: fix(io-modal): tokenise backdrop blur and entrance animation offset

  Adds --io-backdrop-blur: 4px and --io-motion-entrance-offset-y: 12px tokens.

- 728bc4f: fix(io-spinner): tokenise border-width per size variant

  Adds --io-spinner-border-width-{sm|md|lg} tokens. Replaces 1.5px/2px/3px.

- e6911da: fix(io-tabs): tokenise active tab indicator height

  Adds --io-tabs-indicator-height: 2px token. Replaces hardcoded 2px border-bottom.

## 1.4.0

### Minor Changes

- 266b813: feat(io-icon): add 52 new Lucide 0.577 icons — download (3), upload (3), list-_ (17), grid-2x2/grid-3x2 (4), map-_ (12), calendar-\* (13)
- 15955c9: feat(io-inline-notification): add per-variant soft background colours matching Toast

  feat(io-inline-notification): add actionLabel, actionIcon, actionLoading props and action event for inline call-to-action button

- e2f26f1: feat(io-pagination): add compact prop for dense UI contexts — reduces button height from 48px to 32px

## 1.3.2

### Patch Changes

- f1c0bb4: fix(io-button): add reflect: true to hideLabel prop so Angular static attribute pattern works correctly

  fix(io-input,io-select,io-textarea,io-multi-select,io-pin-code,io-button): coerce empty-string to true for boolean props in Angular proxy, fixing hideLabel and other boolean props when used as static attributes

## 1.3.1

### Patch Changes

- d665b6d: fix(io-button-group): compact mode border-radius and icon size (#604, #605)

  **Border-radius (#604):** `--io-button-group-btn-radius-compact` was hardcoded to `12px` — the same radius as the pill container — making each button look like an individual pill. Changed to `calc(var(--io-button-group-pill-radius) - var(--io-button-group-pill-padding-compact))` (10px), matching the optical-inset pattern used by normal mode.

  **Icon size (#605):** Icon size inside the group button was hardcoded to `"sm"` regardless of the `compact` prop. Compact buttons have a 24px visual height; `sm` icons were oversized relative to the container. Changed to `size={compact ? 'xs' : 'sm'}` so compact mode renders 12px icons.

## 1.3.0

### Minor Changes

- c402b71: fix(io-button-group): correct type default, compact padding, icon support, label alignment

  - **#598** — `type` prop now defaults to `'single'` (was `'multiple'`). The storefront, configurator, and API docs all documented `'single'` as the default; the component was incorrect.
  - **#599** — `--io-button-group-padding-x-compact` changed from `6px` to `var(--io-space-3)` (12px), matching the existing dark-theme override value and removing visual cramping in compact mode.
  - **#600** — Icon support added: pass `icon="icon-name"` on child `<io-button>` elements to render a Lucide icon before the label. The icon name is extracted during slot parsing (reading the JS property first, falling back to the attribute) and forwarded to an internal `<io-icon size="sm">` element. Text-only groups are unaffected.
  - **#602** — Label misalignment fixed: `flex-direction: column` baked into `:host` CSS permanently so the label always stacks above the group. Previously a conditional `<Host style={...}>` was fragile and failed to apply when `compact` prop changed.

## 1.2.0

### Minor Changes

- 3ad0687: feat(hideLabel): add hideLabel prop to IoInput, IoSelect, IoTextarea, IoPinCode, IoMultiSelect, IoButtonGroup

  When `hideLabel={true}` the label area is visually removed and all vertical space it
  occupied collapses — no gap, no reserved height above the component.

  - **IoInput / IoTextarea / IoSelect / IoButtonGroup**: existing `hideLabel` prop now fully
    collapses the wrapper `padding-top` via `:host([hide-label])` CSS rules; the `sr-only`
    label stays in the DOM so `<label for>` association remains intact for screen readers.
  - **IoPinCode**: new `hideLabel` prop — hides the label `<span>` and sets `aria-label` on
    the group Host so screen readers still receive an accessible name.
  - **IoMultiSelect**: new `hideLabel` prop — hides the `<label>` element and switches both
    the combobox trigger and listbox from `aria-labelledby` to `aria-label` when hidden.
  - All six components emit a `console.warn` when `hideLabel=true` and no `label` is provided.
  - Storefront configurators for all six components now expose `hideLabel` as a boolean toggle.

### Patch Changes

- 2002d5a: fix(io-input, io-select, io-textarea, io-pin-code): suppress eager FACE error state before user interaction

  Required fields no longer show error state on mount. `faceInvalid` is now gated behind an internal `touched` flag that is set on the first blur event. Consumers who need immediate validation can still drive error state via the `state="error"` prop. `touched` resets on form reset.

- 1946227: fix(io-button): scale icon size with button size prop

  Icon rendered by `renderIcon()` was hardcoded to `size="sm"` regardless
  of the button's `size` prop. Adds `ICON_SIZE_MAP` (sm→sm, md→sm, lg→md,
  xl→lg) so icon-only and regular icon-bearing buttons are visually balanced
  at all four sizes.

- c97cfd0: fix(io-modal): hide footer divider when footer slot is empty

  `modal__footer` rendered unconditionally, showing a top-border divider over
  nothing when no `slot="footer"` content was slotted. Adds `@State hasFooterSlot`
  driven by `slotchange` + `componentDidLoad` init, toggling `.modal__footer--hidden`
  (display:none) so the footer and its border only appear when content is present.

## 1.1.0

### Minor Changes

- 19a4a0e: feat(io-icon): expand registry to 455 icons; add fixedWidth, inherit size, CSS var override

  Expands `ICON_NODES` in `src/utils/icons.ts` from 51 to **455 icons** across 27 categories. All icons pre-extracted from `lucide@^0.577.0` — no runtime import. `IoIconName` union auto-expands.

  **New component features**

  - `fixedWidth` prop — forces host width to match icon size for consistent column alignment in nav menus and icon lists
  - `size="inherit"` — scales icon to match parent `font-size`; useful for inline-with-text usage
  - `--io-icon-size` CSS variable — per-instance size override without a prop change

  **New icon categories (350 icons)**

  Accessibility, Accounts & Access, Arrows, Buildings, Charts, Design, Development, Files, Finance, Layout, Mail, Multimedia, Navigation, Notifications, Photography, Security, Text, Time & Calendar, Transportation, Travel, Weather

  **WYSIWYG editor icons (48 icons)**

  Form actions (save, pen-line, trash, …), text formatting (bold, italic, code, …), headings (h1–h6), block structure (list, quote, indent, …), insert (link, image, table, …), table operations, history & alignment (undo-2, align-left, …)

- 56cdfbb: fix(io-button): form integration, ghost colors, loading icon, icon-only, and configurator gaps

  - Add `formAssociated: true` + FACE integration (`name`, `form` props, `internals.form.requestSubmit/reset` on click, `componentWillLoad` value sync)
  - Add loading a11y: visually-hidden live region + `aria-describedby` announces loading state to screen readers (WCAG 4.1.3)
  - Add `componentShouldUpdate` guard to prevent unnecessary re-renders on unchanged props
  - Add dev-mode prop validation warnings for invalid `variant`, `color`, `size` values
  - Fix ghost variant missing borders for orange, pink, rouge, yellow, beige colors
  - Fix loading state: icon and custom SVG now fade to opacity 0 alongside label/arrow
  - Fix icon-only mode: respects `icon`/`iconSource` prop; falls back to iO brand arrow (not hardcoded ×)
  - Add `link` variant to Configurator prop definitions
  - Expand ghost story to all 9 colors
  - Refs: #581, #582, #583, #584, #585

## 1.0.1

### Patch Changes

- dacc075: fix(io-input,io-textarea): error state visual polish + message/helperText consistency

  **io-input + io-textarea — border fix**
  Remove `border-bottom-width: var(--io-input-border-error-width)` /
  `var(--io-textarea-border-error-width)`. Both tokens were undefined,
  causing the browser to fall back to `medium` (3px). Error border now
  matches success/warning (1px default).

  **io-input — message class fix**
  Error message `<p>` was using class `input-error` (no typography rules).
  Changed to `input-message input-message--error` — consistent with the
  CSS that was already in place.

  **io-input — success/warning now show message prop**
  `message` prop previously only rendered in error state. Success and
  warning states now render the message with appropriate colour
  (`input-message--success` / `input-message--warning`) and ARIA role
  (`role="status"`).

  **io-input — message replaces helperText when active**
  When a validation state is active and a `message` is provided, the
  `message` is shown instead of `helperText`. When no `message` is set,
  `helperText` falls back as the visible description. This matches the
  Material 3 / Carbon / Fluent pattern of a single description slot
  that switches between helper and validation copy.

  **io-input — Lucide state icons**
  Replaced custom 14×14 filled SVG paths with Lucide stroke icons:
  `circle-alert` (error), `circle-check` (success), `triangle-alert`
  (warning). Consistent with Lucide icon language used elsewhere in
  the product.

## 1.0.0

### Major Changes

- 34d86da: feat(io-modal): `preventTopLayer` defaults to `true` — universal framework compatibility + scroll locking

  ## What changed

  1. **`preventTopLayer` now defaults to `true`**. The modal opens with `show()`
     instead of `showModal()`, and the component manages its own backdrop,
     focus-trap, ESC key, and `inert` management in JavaScript.

  2. **Scroll locking added** (`document.body.style.overflow = 'hidden'` on open,
     restored on close). This ensures the page cannot be scrolled behind the modal
     in any mode.

  3. **Backdrop fade-in animation** added to the `preventTopLayer` CSS path so the
     host overlay animates identically to the native `::backdrop`.

  ## Breaking change

  Any consumer relying on native browser top-layer stacking must opt back in:

  ```html
  <io-modal prevent-top-layer="false" ...></io-modal>
  ```

  ```tsx
  <IoModal preventTopLayer={false} ...>
  ```

  ## Why `true` is the right default for all consumers

  ### React 18

  `showModal()` promotes `<dialog>` to the browser top layer. React 18
  delegates synthetic events to `#root`. Composed click events from
  shadow-DOM children inside a top-layer dialog do not bubble to `#root`,
  causing slotted `slot="footer"` buttons to be non-clickable.
  `preventTopLayer=true` keeps the dialog in normal document flow where
  React event delegation works as expected.

  ### Vue 3 / Angular / Svelte / vanilla

  These frameworks attach listeners directly to elements, so `showModal()`
  works for them today. With `preventTopLayer=true` they receive identical
  behavior — backdrop, focus-trap, ESC, `inert` — without depending on
  browser-native top-layer mechanics that vary across engines.

  ### Feature parity table

  | Behavior               | `showModal()`                  | `show()` + component (default) |
  | ---------------------- | ------------------------------ | ------------------------------ |
  | Backdrop overlay       | Native `::backdrop`            | CSS `position:fixed` on host   |
  | Backdrop animation     | `io-backdrop-in`               | `io-backdrop-in`               |
  | Scroll lock            | `document.body.style.overflow` | `document.body.style.overflow` |
  | Focus trap             | Browser-native                 | JS `setupFocusTrap()`          |
  | ESC key                | Native `cancel` event          | `document.keydown` listener    |
  | Background `inert`     | Manual (this component)        | Manual (this component)        |
  | Focus restoration      | This component                 | This component                 |
  | `dismiss` event        | Yes                            | Yes                            |
  | `aria-modal` on dialog | Set by browser                 | Set explicitly                 |

  Set `preventTopLayer={false}` only when native top-layer stacking is
  strictly required (e.g. Popover API elements that must appear below the
  modal).

  ## Migration

  Most consumers need **no change**:

  ```diff
  - <IoModal open={isOpen} preventTopLayer heading="Confirm">
  + <IoModal open={isOpen} heading="Confirm">
  ```

  To keep `showModal()` behavior:

  ```diff
  + <IoModal open={isOpen} preventTopLayer={false} heading="Confirm">
  ```
