# @iodigital-com/components

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


