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

## 1.1.1

### Patch Changes

- b664fd8: fix(button-group): pixel-perfect alignment, label a11y, compact mode, and API cleanup

  - Exact 42px container / 32px button height matching PageHeader reference
  - Border radius 12px container / 8px inner (optical inset formula)
  - Hover: text color change only — no background (matches reference)
  - Compact mode: 4px×6px padding, 12px font, 16.8px line-height, no button border
  - Primary variant: solid blue active state; Secondary variant: white fill + shadow
  - Label: font-size/weight/color aligned to form-system standard (io-input parity)
  - Fix: removed aria-hidden from label span — aria-labelledby association now works
  - Fix: removed dead :host([size]) CSS blocks
  - Fix: wired --io-button-group-btn-radius-compact into compact block
  - Fix: removed stale --io-button-group-hover-bg token

## 1.1.0

### Minor Changes

- 5de8182: feat(button-group): add `variant` prop — `primary` (blue fill) and `secondary` (white fill with shadow)

  - `variant="primary"` (default): active state uses brand primary blue fill with white text — for navigation tabs and primary selection controls.
  - `variant="secondary"`: active state uses white/surface fill with a subtle shadow and dark text — for property selectors, toolbar controls, and dense UI contexts.
  - Deprecates `size` prop in favour of `compact` (size was redundant; compact handles all density scaling).
  - All theme blocks updated: light, dark, only-light, only-dark.

### Patch Changes

- ec09f1f: fix(button-group): restore primary blue active state to match storefront reference style

  - Active button background reverted to var(--io-color-primary) (#0000D2) across all theme blocks
  - Active button text restored to white for contrast on blue background
  - Active border updated to match primary color
  - Syncs components-angular, components-react, components-vue to version parity with components

## 1.0.0

### Major Changes

- 7926d0b: **io-banner** redesigned as a fixed viewport overlay: `position: fixed`, card-style appearance (white background, 1px colored border, border-radius, drop shadow), and a slide-in entry animation. No more thick left accent border.

  **io-inline-banner renamed to io-inline-notification** (breaking rename): the tag `io-inline-banner` is removed and replaced by `io-inline-notification`. Update all usages — no behaviour change, only the tag name and class name differ.

  **io-inline-notification** also adopts the same card-style design as io-banner (without fixed positioning or shadow).

- 23b1318: **BREAKING:** Removed `io-alert` and replaced it with two purpose-built components.

  - **Removed:** `io-alert` — the single component that mixed page-level and inline use cases
  - **Added:** `io-banner` — full-width page-level notification strip controlled by an `open` prop. Dismissing automatically sets `open=false`.
  - **Added:** `io-inline-banner` — inline content-level notification that fits within the document flow. Consumer controls visibility by mounting/unmounting.

  Both new components share the same four severity variants (`info`, `success`, `warning`, `error`), optional `heading`, optional `dismissible` button with auto-resolved `dismissLabel`, and the same ARIA live region strategy as the removed `io-alert`.

  **Migration:**

  - Replace `<io-alert>` with `<io-inline-banner>` for form-level and section-level feedback.
  - Use `<io-banner open>` for page-wide announcements, maintenance notices, and persistent system messages.

### Patch Changes

- 1a2957c: io-banner: remove empty slot space when no body content is provided; simplify dismiss button to inline icon style (no touch-target padding)
- 4f58a77: fix(io-breadcrumb): render separator in item shadow DOM, fix broken slotchange query, add chevron default

  The separator was never visible because `handleSlotChange` queried slotted items via the shadow DOM `ol` — slotted (light DOM) children are not reachable that way. Separators are now rendered inside each `io-breadcrumb-item`'s shadow DOM as a `<span class="breadcrumb__separator" aria-hidden="true">` that is hidden when `current=true`. The RTL `scaleX(-1)` flip moves to `io-breadcrumb-item-styles`. Default separator character updated from `/` to `›`; overridable via `--io-breadcrumb-separator`. The storefront configurator and examples pages are centered and scrubbed of pre-release migration notes.

- b70f179: io-inline-notification: remove empty slot space when no body content is provided; simplify dismiss button to inline icon style (no touch-target padding)

## 3.0.0

### Major Changes

- f9afc34: **BREAKING**: Remove `variant="text"` from `io-wordmark`.

  The typographic web-font wordmark variant has been removed. The `IoWordmarkVariant` type is now `'mark' | 'lockup'` and the default variant changes from `'text'` to `'mark'`.

  The following props are also removed as they were exclusive to the text variant:

  - `mono`
  - `href`
  - `target`
  - `rel`

  **Migration:**

  | Before                           | After                                                        |
  | -------------------------------- | ------------------------------------------------------------ |
  | `<io-wordmark />`                | `<io-wordmark variant="mark" />`                             |
  | `<io-wordmark variant="text" />` | `<io-wordmark variant="mark" />`                             |
  | `<io-wordmark href="/" />`       | Use a native `<a>` wrapping `<io-wordmark variant="mark" />` |
  | `<io-wordmark mono />`           | Use `color="black"` or `color="white"` for consistent colour |

  Use `variant="lockup"` for any placement that requires the official brand name alongside the mark.

### Minor Changes

- 0605dc4: feat(io-wordmark): add variant, color props and official brand SVG assets

  - Adds `variant: 'text' | 'mark' | 'lockup'` prop (default `'text'` — backwards-compatible)
  - Adds `color: 'blue' | 'black' | 'white' | 'beige'` prop (default `'blue'`)
  - `variant="mark"` renders the official geometric iO mark SVG (viewBox 0 0 881 599) with `fill="currentColor"`
  - `variant="lockup"` renders the full iO Digital brand lockup SVG (viewBox 0 0 1500 1500) with `fill="currentColor"`
  - `variant="text"` preserves existing Manrope web-font wordmark behaviour; `mono` / `href` / `target` / `rel` props still apply
  - New CSS tokens: `--io-wordmark-mark-height-{sm|md|lg|xl}` and `--io-wordmark-lockup-height-{sm|md|lg|xl}`
  - New brand token: `--io-color-beige` (#e1cfbf) for mark-only beige colour variant
  - Brand source assets committed to `brand/mark/` and `brand/wordmark/` (moved from `docs/`)
  - Static copies in `io-storefront/public/brand/` for Next.js static serving

- 6be0216: feat(io-modal,io-drawer): add background prop and motion lifecycle events (#357)

  - Adds `background: 'canvas' | 'surface' | 'elevated'` prop to `io-modal` and `io-drawer` (default `'canvas'`). Maps to `--io-bg-page`, `--io-bg-surface`, and `--io-bg-raised` tokens respectively.
  - Adds `motionVisibleEnd` event emitted after the open animation/transition completes (`transitionend` on the panel element).
  - Adds `motionHiddenEnd` event emitted after the close animation/transition completes.
  - Transition listener is attached in `componentDidLoad` and cleaned up in `disconnectedCallback`.

- f234ead: chore: promote 9 beta components to stable (Wave XIII)

  Wave XIII audit confirms all quality gates pass and no P0/P1 blockers exist for:
  io-alert, io-carousel, io-heading, io-multi-select, io-pin-code, io-popover,
  io-scroller, io-switch, io-text.

  Evidence per component:

  - io-alert: complete spec suite (spec, click, disabled, a11y); all WCAG AA tests pass
  - io-carousel: complete spec suite + keyboard, lifecycle, render, utils; drag-parity deferred by design
  - io-heading: spec + a11y; non-interactive component — click/disabled specs do not apply
  - io-multi-select: complete spec suite (spec, click, disabled, a11y, face); FACE form association verified
  - io-pin-code: complete spec suite (spec, click, disabled, a11y, face); FACE form association verified
  - io-popover: spec + click + a11y; no disabled prop exists by design (popover has no disabled state)
  - io-scroller: spec + a11y; non-interactive container — click/disabled specs do not apply
  - io-switch: complete spec suite (spec, click, disabled, a11y, face, watch); FACE form association verified
  - io-text: spec + a11y; non-interactive passive element — click/disabled specs do not apply

  Storefront documentation expanded:

  - io-carousel/usage: added slides-per-page, performance, mobile/touch, keyboard-access sections
  - io-popover/usage: added placement/positioning, dismiss-behaviour, advanced-patterns sections
  - io-popover/examples: added actions-menu and close-on-outside-click examples
  - io-multi-select/examples: added pre-selected, required, maxDisplay, disabled examples
  - io-heading/usage: added colour, alignment, size-vs-tag sections
  - io-switch/usage: added form-integration and grouping sections

### Patch Changes

- e7d2b32: chore(io-tabs-bar): promote to stable (#481)

  Wave J audit found no P0/P1 blockers. All quality gates pass. click.spec.ts added (#474),
  aria-controls documented as WCAG 4.1.2 requirement (#478). Promoting from beta to stable.

## 2.1.1

### Patch Changes

- Wave XII UI audit fixes: io-button md padding (density token), io-breadcrumb spacing, io-multi-select fixed dropdown positioning, io-table striped/bordered/compact props, io-popover viewport coordinate fix, density token hierarchy (compact<default<comfortable).

## 2.1.0

### Minor Changes

- 33baa52: feat(io-input, io-textarea, io-select, io-checkbox, io-radio): add label, description, and message named slots

  All five form-field components now expose three named slots — `label`, `description`, and `message` — that allow rich HTML content (icons, badges, links, formatted text) to be embedded in the label, helper text, and error message areas respectively.

  Slot content overrides the corresponding prop (`label`, `helperText`, `errorMessage`) when provided. The prop value is retained as a fallback when no slot content is present, ensuring full backward compatibility.

  Key implementation details:

  - Slot occupancy is tracked via `@State` boolean flags driven by `slotchange` events — never via CSS `:empty`
  - `aria-describedby` IDs remain stable in the DOM; elements are hidden via CSS class when no content is present
  - `onSlotchange` is wired directly on `<slot>` elements (not via `@Listen`)
  - All slot containers use CSS class toggling with `display: none` for show/hide

## 1.0.0

### Major Changes

- b8b0289: **BREAKING CHANGE**: Migrate form-field validation from `error: boolean` + `errorMessage: string` to `state: IoFieldState` + `message: string` across 6 form-field components (io-input, io-textarea, io-select, io-checkbox, io-radio, io-form-field).

  ### Migration guide

  Replace:

  ```html
  <io-input error error-message="Required" />
  <io-select error error-message="Please select" />
  <io-textarea error error-message="Required" />
  <io-checkbox error error-message="Required" />
  <io-radio error error-message="Please select" />
  <io-form-field error error-message="Invalid" />
  ```

  With:

  ```html
  <io-input state="error" message="Required" />
  <io-select state="error" message="Please select" />
  <io-textarea state="error" message="Required" />
  <io-checkbox state="error" message="Required" />
  <io-radio state="error" message="Please select" />
  <io-form-field state="error" message="Invalid" />
  ```

  The new `state` prop also accepts `"success"` and `"warning"` values for richer validation feedback.

### Minor Changes

- b98110b: feat(io-accordion): add sticky and background props

  - `background: 'transparent' | 'surface' | 'canvas'` prop (default `transparent`) — applies `var(--io-bg-surface)` or `var(--io-bg-page)` fill to the accordion host element
  - `sticky: boolean` prop (default `false`) — when `true`, the accordion trigger becomes `position: sticky; top: 0` using `var(--io-z-sticky)` to stay visible while scrolling through long expanded content
  - Dev warning when `sticky=true` with `background="transparent"` since a transparent sticky header causes content bleed-through
  - Both props use `@Prop({ reflect: true })` so they drive `:host([prop])` CSS selectors

- 6bd52a4: feat(components): add `aria` prop for custom ARIA attribute injection

  Adds `aria?: Record<string, string>` prop to `io-button`, `io-input`, `io-textarea`, `io-select`, `io-modal`, and `io-drawer`.

  - Keys may omit or include the `aria-` prefix — both forms normalised: `{ controls: 'panel' }` → `aria-controls="panel"`
  - Keys with `aria-` prefix pass through as-is: `{ 'aria-controls': 'panel' }` → `aria-controls="panel"`
  - Unknown keys are logged as `console.warn` in non-production environments
  - Applied via `@Watch('aria')` handler — no wasted render cycles
  - On `io-select`: applies to `<select>` in native mode, to `<button>` trigger in custom combobox mode
  - On `io-modal` and `io-drawer`: applies to the native `<dialog>` element
  - Shared implementation via `applyAriaProp` utility in `src/utils/aria-prop.ts`

- f85a80d: feat(io-carousel): add heading, description, and controls named slots

  - `heading` slot — rendered above the slide track; when occupied, the carousel region switches from `aria-label` to `aria-labelledby` pointing to a stable generated ID, preserving the semantic label relationship
  - `description` slot — rendered below the heading and above the slide track; hidden via CSS class (NOT `:empty`) when no slot content is assigned
  - `controls` slot — rendered inside `.carousel-wrap` adjacent to the navigation buttons; intended for pagination dots, thumbnails, or other custom indicators
  - Each slot is detected via `onSlotchange` wired directly on `<slot name="...">` (NOT `@Listen('slotchange')`)
  - Slot occupancy tracked by `@State() hasHeadingSlot`, `hasDescriptionSlot`, `hasControlsSlot` — containers hidden via CSS modifier classes, not `:empty`
  - `headingId` generated in `componentWillLoad()` for stable `aria-labelledby` binding
  - `label` prop remains supported; used as `aria-label` when the heading slot is empty

- 948b5f6: feat(io-divider): add `color` prop (`subtle` | `default` | `strong`) for three-tier contrast levels using design tokens; `subtle` uses `rgba(--io-border-rgb, 0.5)`, `default` maps to `--io-border`, `strong` maps to `--io-border-hover`

  feat(io-wordmark): add `href`, `target`, `rel` props for logo-as-link pattern; when `href` is set the wordmark renders as an `<a>` element with `aria-label` and focus-visible ring; `delegatesFocus: true` set unconditionally

  Closes #359, Closes #367

- 23f145f: feat(io-drawer): add bottom-sheet behavior for placement=bottom

  When `placement="bottom"`, the drawer now renders as a mobile-optimised bottom
  sheet:

  - Drag handle bar rendered at the top of the panel (32px × 4px, 2px border-radius,
    `var(--io-border-hover)` color) with `aria-hidden="true"`
  - `max-height: 85vh` constraint so the panel does not full-screen
  - Top corners rounded with `var(--io-border-radius-lg) var(--io-border-radius-lg) 0 0`
  - Swipe-down gesture on the handle closes the drawer (threshold: 80px downward
    movement via `touchstart`/`touchmove`/`touchend`)
  - Touch listeners are attached in `show()` and removed in `close()` — not in
    `connectedCallback` — so they only fire while the drawer is open
  - `closeOnBackdrop` remains fully functional in sheet mode
  - No behavioural changes to `left`, `right`, or `top` placement

- 1f5f215: feat(io-checkbox,io-radio,io-select): add form prop for out-of-DOM form association

  Adds a `form?: string` prop to io-checkbox, io-radio, and io-select. Setting `form` to the ID of a `<form>` element allows the field to participate in form submission and validation even when it lives outside the form's DOM subtree — matching native HTML `<input form="...">` behaviour.

- ab8a49f: feat(forms): add hideLabel prop to visually hide labels while preserving accessibility

  - `hideLabel: boolean` prop (default `false`) added to `io-input`, `io-textarea`, `io-select`, `io-checkbox`, and `io-radio`
  - When `hideLabel=true`, the label text is rendered but visually hidden using the sr-only technique (`position: absolute; width: 1px; height: 1px; ...`)
  - Screen readers and assistive technologies continue to read the label — no accessibility regression
  - Dev console warning emitted when `hideLabel=true` and `label` is an empty string, prompting developers to always supply a meaningful accessible label
  - `label` prop remains required for accessibility on all components
  - Uses `@Prop({ reflect: true })` so `:host([hide-label])` CSS selectors are available for external styling

- 2442aa0: feat(io-input): add `minLength`, `spellCheck`, `autoComplete`, `loading`, `counter`, `form` props; `loading` shows an `io-spinner` and suppresses `input`/`change` events; `counter` renders a live character count when `maxLength` is set; `minLength` wired to FACE validity via `@Watch`

  feat(io-textarea): add `readOnly`, `minLength`, `spellCheck`, `loading`, `counter`, `form`, `wrap` props; `readOnly` maps to native `readonly` + `aria-readonly="true"` + dashed-border visual state; all other props mirror io-input semantics; `wrap` forwarded as native `wrap` attribute

  Closes #347, Closes #362

- 69770f2: feat(io-alert): add io-alert component with info/success/warning/error variants, optional heading, and dismissible button
- 1a4d170: feat(io-button-group): add direction prop (row|column) for vertical layout support
- a7bea5d: feat(io-form-field): add IoFormFieldSlotName union type + promote to stable
- 6cc5ad3: feat(io-multi-select): new multi-select dropdown component with removable chips, FACE form participation, search filter, and ARIA combobox/listbox pattern
- a40c393: feat(io-pin-code): new PIN/OTP entry component with FACE form-association, keyboard navigation, paste distribution, and password masking
- 975d787: feat(io-popover): implement click-triggered floating content panel (#345)

  Adds the io-popover web component — a click-triggered floating panel with
  accessible dialog semantics (role="dialog", aria-modal="true").

  Features:

  - placement prop: 'top' | 'bottom' | 'left' | 'right' | 'auto' (default 'bottom')
  - open prop: mutable, reflects to attribute
  - closeOnClickOutside prop (default true)
  - label prop: accessible name via aria-labelledby
  - dismiss event: emitted on Escape key or outside click
  - trigger named slot: activating element with auto-managed aria-expanded
  - default slot: popover panel body content
  - Native Popover API (showPopover/hidePopover) with manual fallback positioning
  - Focus management: first focusable element on open, trigger on close
  - Token-first styling: --io-z-dropdown, --io-shadow-md, --io-border-radius-md, --io-bg-surface
  - Full storefront pages: configurator, examples, usage, accessibility, API

- 75803fd: feat(io-scroller): new scrollable container component with edge fade indicators

  - New `io-scroller` component under `io-components/src/components/io-scroller/`
  - Shadow DOM with `delegatesFocus: true`
  - Props: `orientation: 'horizontal' | 'vertical'` (default `'horizontal'`), `showScrollbar: boolean` (default `false`), `label: string | undefined`
  - Gradient fade indicators appear at each edge when scrollable content exists in that direction; hide automatically when scrolled to the edge
  - `IntersectionObserver` on sentinel elements for efficient edge detection with scroll event listener fallback
  - WCAG 2.1 AA: `role="region"` with `aria-label` on the scroll container; keyboard focusable with `tabindex="0"`
  - Respects `prefers-reduced-motion` — sets `scroll-behavior: auto` when reduced motion is preferred
  - Two public CSS custom properties: `--io-scroller-fade-color` (defaults to `var(--io-bg-page)`) and `--io-scroller-fade-size` (defaults to `var(--io-space-6, 24px)`)
  - Full storefront documentation: configurator, examples, usage, accessibility, and API pages

- 0e54181: feat(io-switch): FACE toggle/switch component with role=switch and keyboard nav (#342)

  Adds the `io-switch` web component — a form-associated toggle switch with:

  - `role="switch"` on the interactive element with `aria-checked` state
  - FACE pattern: `formAssociated: true`, double optional-chaining on all `internals` calls
  - `formResetCallback()` restores initial checked state
  - `syncFormValue()` submits value when on, null when off
  - Required validity via `setValidity({ valueMissing: true })`
  - Space toggles; Enter not intercepted (preserves form submit)
  - Token-driven pill track + animated thumb with `var(--io-motion-fast)` transition
  - Error state: track uses `var(--io-color-error)` when `error=true` or `faceInvalid=true`
  - Focus ring via `var(--io-focus-ring-active)` on track
  - New CSS tokens: `--io-switch-track-width/height/radius`, `--io-switch-thumb-size/radius/offset-off/offset-on`

- 6b211e4: feat(io-tabs-bar): new standalone tab navigation bar component (#365)

  New `io-tabs-bar` component for router-driven tab navigation patterns:

  - Renders a `role="tablist"` tab strip with the same visual style as `io-tabs`
  - Props: `activeTabIndex` (mutable, reflect, default `0`) and `label` (aria-label for the tablist)
  - Event: `update` emitting `{ activeTabIndex: number }` — identical API to `io-tabs`
  - Default slot accepts `<button>` elements; component applies `role="tab"`, `aria-selected`, and roving `tabindex` automatically
  - Full keyboard navigation: Arrow Left/Right (with wrap), Home, End, Enter, Space; disabled buttons skipped
  - Shadow DOM with `delegatesFocus: true`
  - No panel management — consumers own content via their router outlet
  - WCAG 2.1 AA compliant; axe-core smoke tested
  - Registered in `IoTagNames`, `components.d.ts`, and `sitemap.ts`
  - All 5 storefront pages: Configurator, Examples, Usage, Accessibility, API

- a5897bf: feat(io-text, io-heading): add typography primitive components (#346)

  Adds two new light DOM typography primitives:

  - **io-text**: Body copy component rendering `p`, `span`, `div`, `blockquote`, or `time` with token-driven font size (`xs`–`xl`), weight (`regular`–`bold`), color (8 semantic values), alignment, and optional single-line ellipsis truncation.

  - **io-heading**: Heading component rendering `h1`–`h6` with token-driven font size (`sm`–`4xl`), weight (`regular`/`semibold`/`bold`), color (`primary`/`secondary`/`inherit`), alignment, and optional ellipsis. Visual size is fully decoupled from semantic heading level. Logs a dev warning and falls back to `h2` if the required `tag` prop is omitted.

  Both components use **light DOM** (no Shadow DOM) intentionally — typography primitives must be fully stylable from outside.

- e1d51e9: feat(form-fields): add loading prop to io-input, io-textarea, io-select, io-checkbox, io-radio (#353)

  When `loading=true`:

  - The field is disabled for interaction (`isDisabled = disabled || loading`)
  - A spinner (`<io-spinner size="sm">`) is shown in a component-specific position
  - `aria-busy="true"` is set on the host element
  - The wrapper gets a `*--loading` modifier class (`pointer-events: none`)

  Spinner placement per component:

  - `io-input`: replaces the suffix slot
  - `io-textarea`: absolute-positioned at top-right of the field
  - `io-select`: replaces the chevron icon (both native and combobox modes)
  - `io-checkbox`: replaces the checkbox control
  - `io-radio`: replaces the radio control

- 002632e: feat(tokens): add [data-theme="only-dark"] and [data-theme="only-light"] locked-theme CSS selectors

  - `[data-theme="only-dark"]` — applies all dark-mode token overrides to any element subtree regardless of the page-level `[data-theme]`
  - `[data-theme="only-light"]` — applies all light-mode token values to any element subtree regardless of page theme
  - Both selectors cascade to all children (same inheritance as standard `[data-theme="dark"]`)
  - Both selectors work on any element, not just `<html>`
  - Positioned after `[data-theme="dark|light"]` in source order so they win the cascade at equal specificity without needing `!important`
  - No new `--io-*` token names introduced — selectors reuse existing variable names
  - Documented in `docs/token-naming-conventions.md` under the Locked-Theme Selectors section
  - Storefront theming page (`/developing/theming`) updated with live demo and code example

- 0fa9232: feat(io-modal,io-drawer): add background prop and motion lifecycle events (#357)

  - Adds `background: 'canvas' | 'surface' | 'elevated'` prop to `io-modal` and `io-drawer` (default `'canvas'`). Maps to `--io-bg-page`, `--io-bg-surface`, and `--io-bg-raised` tokens respectively.
  - Adds `motionVisibleEnd` event emitted after the open animation/transition completes (`transitionend` on the panel element).
  - Adds `motionHiddenEnd` event emitted after the close animation/transition completes.
  - Transition listener is attached in `componentDidLoad` and cleaned up in `disconnectedCallback`.

- b21d1db: feat(io-pagination): add totalItems and perPage props for data-driven page count derivation

  - `totalItems?: number` prop — total number of items in the dataset
  - `perPage?: number` prop — items shown per page
  - When both `totalItems` and `perPage` are provided, the component derives `totalPages` internally via `Math.ceil(totalItems / perPage)`, eliminating boilerplate arithmetic in consumers
  - `totalItems + perPage` (Pattern B) takes precedence over an explicit `totalPages` prop (Pattern A) when both are set
  - `totalPages` prop remains fully supported for backward compatibility — no breaking change
  - Edge cases guarded: `totalItems = 0` → 1 page; `perPage <= 0` treated as 1 to prevent division by zero
  - Dev warning logged when only one of `totalItems` / `perPage` is provided (incomplete Pattern B)
  - `@Watch('totalItems')` and `@Watch('perPage')` clamp the current page when the computed total shrinks
  - `types.ts` updated with `IoPaginationPageCountInput` JSDoc showing both API patterns
  - Storefront API page updated with both patterns shown in properties table and code examples

- adca2e7: feat(a11y): add RTL support to io-button, io-breadcrumb, and io-input

  - `io-button`: arrow icons (`forward`, `back`) flip direction in RTL via `:host-context([dir="rtl"])` + `scaleX(-1)`; hover animation shift direction reverses; link variant underline anchors from the right edge
  - `io-breadcrumb`: separator glyph (e.g. `›` chevron) mirrors via `scaleX(-1)` in RTL; `ol` element gets `direction: rtl` for correct visual order
  - `io-input`: label anchor mirrors from `left: 0` to `right: 0` in RTL; prefix/suffix slot padding swaps sides; error icon mirrors from right to left; `input-field-row` gets `direction: rtl` so prefix/suffix positions swap automatically
  - All RTL rules use `:host-context([dir="rtl"])` to traverse the Shadow DOM boundary and respond to `dir="rtl"` on any ancestor element

### Patch Changes

- 5b2747b: chore(io-drawer, io-wordmark): tokenize hardcoded styles and promote to stable

  - io-drawer: replace hardcoded 320px/480px/640px widths with `--io-drawer-width-sm/md/lg` tokens; replace raw `rgba(0,0,0,0.5)` backdrop with `--io-drawer-backdrop` token; promote sitemap status to stable
  - io-wordmark: replace hardcoded 20px/28px/40px font sizes with `--io-wordmark-font-size-md/lg/xl` tokens; replace hardcoded `-0.01em` letter-spacing with `--io-wordmark-letter-spacing` token; promote sitemap status to stable

  Closes #381
  Closes #386

- 2806c50: chore(io-avatar): replace hardcoded px sizes, font-weight, and border-radius with --io-avatar-\* CSS custom properties. Adds 13 new tokens to app.css (size scale xs–xl, font-size scale xs–xl, font-weight, border-radius, icon-size). Adds io-avatar.click.spec.ts and io-avatar.disabled.spec.ts. Unblocks beta→stable promotion (#376).

## 1.3.0

### Minor Changes

- b137696: feat(io-breadcrumb): migrate to declarative slot-based API with io-breadcrumb-item sub-component (#320)

  **Breaking change**: The `items` (JSON string), `separator`, and `maxVisible` props have been removed from `io-breadcrumb`.

  **Migration guide**:

  Before (deprecated):

  ```html
  <io-breadcrumb
    items='[{"label":"Home","href":"/"},{"label":"Current"}]'
  ></io-breadcrumb>
  ```

  After (current):

  ```html
  <io-breadcrumb>
    <io-breadcrumb-item href="/">Home</io-breadcrumb-item>
    <io-breadcrumb-item current>Current</io-breadcrumb-item>
  </io-breadcrumb>
  ```

  **What changed**:

  - `io-breadcrumb` now accepts `io-breadcrumb-item` sub-components via its default slot
  - Separators are inserted programmatically via `slotchange` — no manual separator markup needed
  - The last item automatically receives `aria-current="page"` if no item has `current` set explicitly
  - Separator character customizable via `--io-breadcrumb-separator` CSS custom property (default `'/'`)
  - New `io-breadcrumb-item` sub-component: `href` prop renders `<a>`, `current` prop renders `<span aria-current="page">`

- 562ec5c: feat(wave-x): add io-form-field, io-radio-group, and io-checkbox-group compound components (#196)

  `io-form-field` — wraps a single slotted form control (io-input, io-select, io-textarea, io-checkbox, io-radio) and auto-wires label/id, aria-describedby, and aria-invalid accessibility attributes.

  `io-radio-group` — renders a semantic fieldset/legend around slotted io-radio children, propagates the name prop and checked state, and emits a group-level change event with the selected value.

  `io-checkbox-group` — renders a semantic fieldset/legend around slotted io-checkbox children, propagates the name and disabled props, and emits a group-level change event with all currently checked values.

- 64d8ab5: feat(tokens): dark mode token overrides for all components (#175)

  - Adds `[data-theme="dark"]` overrides in `app.css` for component-level tokens that used light-only primitives: `--io-color-primary`, `--io-focus-inner`, `--io-focus-outer`, `--io-surface-elevated`, `--io-option-hover-bg`, `--io-button-group-bg/color/border-color`, `--io-skeleton-bg`
  - Adds new semantic tokens `--io-surface-elevated` and `--io-option-hover-bg` to `:root` with light-mode defaults
  - Adds dark-mode source primitives: `--io-color-dark-primary` (#4d4dff — WCAG AA on dark bg) and `--io-color-dark-focus-inner` (#ff9eb5 — 9.5:1 vs dark bg)
  - Replaces hardcoded `--io-color-grey-1` in `io-option-styles.ts` and `io-select-styles.ts` with `--io-option-hover-bg` so dark mode hover propagates through Shadow DOM
  - Adds `scripts/check-dark-mode-tokens.cjs` governance script (runs in `governance:check`) that validates every light-primitive token has a dark override
  - Adds dark/light preview toggle to the `Playground` component in the storefront — scoped to the preview div so docs remain light while components preview dark

- 19f89ab: feat(io-accordion): add size prop (sm/md/lg) — controls trigger padding and heading font size via design tokens
- cab5c52: feat(io-avatar): add avatar component with initials fallback and image support
- cab5c52: feat(io-breadcrumb): add breadcrumb navigation component
- 31ab2a3: feat(io-button-group): add `size` prop that propagates to all slotted `io-button` children

  The `size` prop (`'sm' | 'md' | 'lg'`, default `'md'`) is reflected to the host attribute.
  Size is propagated via `assignedElements({ flatten: true })` both on `slotchange` (via
  `onSlotchange` directly on the `<slot>` JSX element) and on `@Watch('size')` changes.

- 5574cdd: feat(io-drawer): add slide-out drawer overlay component
- cab5c52: feat(io-progress): add linear progress bar component
- 6a16027: feat(io-stepper): add multi-step process indicator component with horizontal and vertical orientations
- 1166ab5: remove io-file-upload component
- b137696: fix(wave-xi): standardize error prop naming across io-form-field, io-checkbox-group, io-radio-group (#328)

  **Breaking change for Beta consumers:**

  `io-form-field`:

  - Renamed prop `errorText` → `errorMessage` (aligns with io-input/io-checkbox standard)
  - Renamed prop `invalid` → `error` (aligns with io-input/io-checkbox standard)

  `io-checkbox-group`:

  - Renamed prop `invalid` → `error`
  - Added new prop `errorMessage: string | undefined` — renders an accessible error paragraph below the group when `error=true` and `errorMessage` is non-empty

  `io-radio-group`:

  - Renamed prop `invalid` → `error`
  - Added new prop `errorMessage: string | undefined` — renders an accessible error paragraph below the group when `error=true` and `errorMessage` is non-empty

  All three components now follow the same convention as stable components `io-input` and `io-checkbox`: `error: boolean` + `errorMessage: string | undefined`.

- 8663948: feat(io-table): rewrite to declarative slot-based sub-component architecture (#326)

  **Breaking change**: The JSON data-prop API (`columns`, `rows`, `sortable`, `selectable`, `sortKey`, `sortDirection`) has been removed from `io-table`.

  **Migration guide**:

  Before (deprecated):

  ```html
  <io-table
    caption="Team members"
    sortable
    selectable
    .columns="[{ key: 'name', label: 'Name', sortable: true }]"
    .rows="[{ name: 'Alice', role: 'Admin' }]"
  ></io-table>
  ```

  After (current):

  ```html
  <io-table caption="Team members">
    <io-table-head>
      <io-table-head-row selectable select-all-checked="false">
        <io-table-head-cell sortable sort-key="name" sort-direction="none"
          >Name</io-table-head-cell
        >
        <io-table-head-cell sortable sort-key="role" sort-direction="none"
          >Role</io-table-head-cell
        >
      </io-table-head-row>
    </io-table-head>
    <io-table-body>
      <io-table-body-row selectable selected="false">
        <io-table-body-cell>Alice</io-table-body-cell>
        <io-table-body-cell>Admin</io-table-body-cell>
      </io-table-body-row>
    </io-table-body>
  </io-table>
  ```

  **What changed**:

  - `io-table` is now a layout shell with four props: `caption`, `captionHidden`, `sticky`, `size`
  - Six new sub-components added: `io-table-head`, `io-table-head-row`, `io-table-head-cell`, `io-table-body`, `io-table-body-row`, `io-table-body-cell`
  - All sub-components use `shadow: false` + `display: contents` to preserve the CSS table model (fixes Chrome Bug #869308)
  - Sort state is consumer-controlled: `io-table-head-cell` emits `sort` with `{ key, direction }` — update `sort-direction` prop from your handler
  - Row selection is consumer-controlled: `io-table-body-row` emits `select` with `{ selected: boolean }`, `io-table-head-row` emits `selectAll` with `{ checked: boolean }`
  - `--io-table-row-selected-bg` token added (light: `--io-color-primary-muted`, dark: `--io-color-dark-accent-bg`)
  - `io-table-head-cell` correctly emits `aria-sort="none"` on sortable-but-unsorted columns (WAI-ARIA 1.2 compliance)
  - `io-table-body-cell` supports `colspan` and `rowspan` for merged cells

- e2000a1: feat(io-toast): add `position` prop supporting 6 placement variants (top-start, top-center, top-end, bottom-start, bottom-center, bottom-end); `persistent` flag + error-variant toasts no longer auto-dismiss; ARIA role switches to `alertdialog`/`assertive` for persistent toasts

  feat(io-tabs): add `gap` between icon and label children via `--io-tabs-icon-gap` token; new `--io-tabs-icon-size` token; `applyAriaToButtons` strips badge text (`[data-slot="badge"]`) from computed aria-label

### Patch Changes

- 360cc93: fix(io-checkbox,io-radio): FACE form reset + :invalid support

  - `formResetCallback()` restores `defaultChecked` so form.reset() works correctly
  - `@State() faceInvalid` tracks FACE invalidity; `aria-invalid` now reflects both the explicit `error` prop and form validation state (WCAG 4.1.3)
  - Error border gains `border-width: 2px` as a non-color indicator (WCAG 1.4.1)
  - New `:host(:invalid)` CSS rule mirrors the prop-driven error style via browser FACE pseudo-class
  - `io-radio.formResetCallback` includes mutual exclusion guard to prevent multiple radios checking after reset

- 7094392: fix(io-carousel): change update event from bubbles:false to bubbles:true, composed:true so React/Vue/Angular wrapper listeners receive it reliably
- 74bb10f: chore(io-skeleton): remove io-skeleton component

  Removes `io-skeleton` from `@iodigital-com/components`. Product pages implement their own skeleton layouts using standard HTML and CSS — a dedicated component is unnecessary.

  Note: `io-skeleton` was in beta status. Beta components do not carry semver guarantees — removal is treated as a patch-level change per project policy.

  - Deleted `io-skeleton` Stencil component and all associated files
  - Removed `--io-skeleton-*` CSS tokens and `@keyframes io-skeleton-pulse` from global tokens
  - Removed `getSkeletonStyle` utility from `@iodigital-com/components/styles`
  - Removed storefront pages (configurator, examples, usage, accessibility, API)
  - Updated governance docs, public CSS API registry, and reconciliation manifests

## 1.2.0

### Minor Changes

- 477e2b5: feat(io-tag): add `label` prop for contextual remove button accessible name

  Adds a `label` string prop to `io-tag`. When `removable` is `true`, the remove
  button's `aria-label` is set to `"Remove ${label}"` instead of the generic `"Remove"`,
  so screen reader users can identify which tag will be removed (WCAG 2.4.6, 4.1.2).

  Also fixes the remove button touch target to meet the 44×44 px minimum
  (WCAG 2.5.5) by adding `min-height` to `.tag-group` and `min-width` / `min-height`
  to `.tag__remove` via `var(--io-touch-target-min)`.

## 1.1.0

### Minor Changes

- d077906: feat(wave-i): modal open/close methods, input readonly+slots, FACE form integration, axe-core a11y testing

  - `io-modal`: add programmatic `show()` and `close()` `@Method`s (#164)
  - `io-input`: add `readonly` prop and `prefix`/`suffix` named slots (#165)
  - `io-input`, `io-textarea`, `io-select`, `io-checkbox`, `io-radio`: implement form-associated custom elements (FACE) — values now participate in native `<form>` submit and `FormData` (#166)
  - `io-*`: WCAG 1.4.11 audit — introduce `--io-border-interactive` (#767676) token; fix failing contrast on `io-checkbox`, `io-radio`, and `io-select`/`io-option` checkbox indicators (#230)
