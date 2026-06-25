# Final Audit Coverage Report

**Date:** $(date -u)
**Auditor:** io-ds-full-audit workflow
**Repo:** iodigital-com/io-design-system

## Audit Scope
- 49 io-DS components across 12 audit clusters
- Reference implementation compared (not named in public output)
- GitHub issues created on iodigital-com/io-design-system

## Coverage Status
All clusters: scanned ✓ | API compared ✓ | behavior compared ✓ | a11y checked ✓ | tests checked ✓ | docs checked ✓

## Issues by Cluster
### text-inputs
- [P1] [io-input] API docs claim no content slots despite five slots existing in the component
- [P0] [io-input-date] Missing `step`, `readonly`, `loading`, full FACE validity, and FACE lifecycle callbacks
- [P0] [io-input-password] Missing `readonly`, `loading`, `maxLength`/`minLength`, full FACE validity, and FACE lifecycle callbacks
- [P0] [io-input-search] Missing `readonly`, `loading`, `maxLength`/`minLength`, full FACE validity, and FACE lifecycle callbacks
- [P1] [io-input] Missing `formDisabledCallback` and `formStateRestoreCallback` FACE lifecycle callbacks
- [P1] [io-input-password] Toggle button missing `aria-pressed` attribute
- [P1] [io-textarea] Character counter missing screen-reader live region
- [P0] [io-input-date] FACE validity never set — required date fields bypass constraint validation
- [P2] [io-input] Counter live region announces on every keystroke rather than remaining characters
- [P2] [io-input-password] No `toggle` opt-in prop — visibility toggle is always rendered

### checkbox-radio
- [P0] [io-radio-group] Error message uses aria-live="polite" instead of role="alert"
- [P1] [io-checkbox-group] syncChildren does not propagate required prop to child io-checkbox elements
- [P1] [io-checkbox] Missing @Watch('indeterminate') — native input.indeterminate not reactive to programmatic prop changes
- [P1] [io-checkbox-group] Missing @Watch('required') — runtime required changes do not re-sync children
- [P1] [io-radio-group] Missing formStateRestoreCallback — browser autofill/history state restoration not supported
- [P1] [io-checkbox] FACE spec does not test indeterminate+required edge case — indeterminate should not count as "checked" for form validity
- [P1] [io-checkbox][io-radio-group] a11y specs test raw HTML, not the actual custom element — Shadow DOM ARIA mistakes go undetected
- [P2] [io-checkbox-group] Missing orientation prop — no horizontal layout support
- [P2] [io-checkbox-group] Missing loading prop — no loading overlay pattern
- [P2] [io-radio-group] API docs missing description, loading, and form props

### advanced-selection
- [P0] [io-select] Combobox grouped options: group heading is aria-hidden and no role=group wrapper
- [P0] [io-multi-select] faceInvalid FACE error missing aria-describedby wiring to trigger
- [P1] [io-multi-select] faceInvalid shows eagerly on mount before user interaction (missing touched gate)
- [P1] [io-pin-code] FACE error state has no visible error text when message prop is omitted (WCAG 3.3.1)
- [P1] [io-pin-code] aria-required not set on the group element when required=true
- [P1] [io-select] aria-checked incorrectly set on role=option items in multiple combobox mode
- [P2] [io-select] API documentation missing 5 props, toggle event, and checkValidity/reportValidity methods
- [P2] [io-multi-select] Missing toggle and blur events in API documentation
- [P2] [io-pin-code] Missing loading and form props for async OTP and out-of-DOM form patterns
- [P2] [io-pin-code] API documentation type for length prop shows 4|6 but implementation accepts 3|4|5|6

### controls
- [P1] [io-switch] Missing hideLabel prop for visually hidden but accessible label
- [P2] [io-switch] Missing compact prop for dense layout contexts
- [P1] [io-switch] Accessibility doc incorrectly documents aria-disabled on the input element
- [P1] [io-switch] Missing keyboard interaction spec — Space key toggle not unit-tested
- [P0] [io-segmented-control] Missing label and hideLabel props — group has no accessible name
- [P1] [io-segmented-control] Missing required prop and form validation state
- [P2] [io-segmented-control] Missing compact prop for dense layout support
- [P1] [io-segmented-control] Missing blur event — no focus-leave notification at group level
- [P2] [io-segmented-control] Accessibility page missing keyboard interaction table
- [P1] [io-segmented-control] No individual-segment disabled override — group disables all or none

### overlays
- [P1] [io-modal] Accessibility docs claim showModal() handles focus trapping — component uses custom trap instead
- [P0] [io-sheet] focus trap uses shadowRoot.activeElement which violates the anti-regression rule
- [P1] [io-sheet] missing motionVisibleEnd / motionHiddenEnd events and scroll-lock cleanup on rapid re-open
- [P1] [io-drawer] missing inert management for background content leaves screen reader virtual cursor unrestricted
- [P1] [io-flyout] close button aria-label is a bare 'Close' with no context — fails WCAG 4.1.2
- [P1] [io-flyout] no accessible name warning in componentWillLoad only checks heading prop — misses aria prop and host attribute
- [P1] [io-sheet] missing accessible name validation in componentWillLoad
- [P2] [io-flyout] backdrop token uses --io-drawer-backdrop instead of a flyout-scoped token
- [P2] [io-drawer] / [io-flyout] overlap — io-drawer placement=bottom and io-sheet serve nearly identical use cases without clear documentation guidance
- [P2] [io-modal] API page missing documentation for description, background, aria, preventTopLayer, and motionVisibleEnd/motionHiddenEnd

### notifications
- [P1] [io-toast-item] Missing io-toast-item.a11y.spec.ts — interactive component has no axe-core test
- [P1] [io-toast-item] Close button touch target is 24 px — below the 44×44 px io-DS minimum (WCAG 2.5.8)
- [P1] [io-inline-notification] a11y spec `renderToHTML` uses role="status" for `warning` variant but component uses role="alert"
- [P1] [io-toast] Storefront accessibility doc documents aria-atomic as "false" but component sets aria-atomic="true"
- [P1] [io-banner] Accessibility keyboard table missing Escape key dismiss row (WCAG 2.1.2)
- [P1] [io-banner] [io-inline-notification] Dismiss button min-width/height is 24 px (io-space-6) not 44 px — accessibility docs claim otherwise
- [P2] [io-banner] [io-inline-notification] Accessibility docs incorrectly document `warning` variant as role="status" — component uses role="alert"
- [P2] [io-banner] Accessibility doc incorrectly states host element always carries the ARIA role — role is on the conditionally-rendered inner div
- [P2] [io-inline-notification] API docs missing `headingTag` and `label` props
- [P2] [io-banner] No `action` / `actionLabel` CTA prop — dismissible banners cannot surface a call-to-action

### popups
- [P2] [io-popover] `description` prop missing from storefront API table
- [P1] [io-popover] `placement="auto"` documented as smart viewport detection but always resolves to `bottom`
- [P2] [io-popover] No `open` event emitted when panel opens — only `dismiss` is available
- [P1] [io-popover] Panel does not reposition on scroll or window resize while open
- [P2] [io-tooltip] `io-tooltip-styles.ts` is dead code — `shadow: false` component never applies it
- [P1] [io-tooltip] `--io-tooltip-hide-delay` CSS token documented but does not exist
- [P1] [io-tooltip] Accessibility page missing WCAG 1.4.13 (Content on Hover or Focus) compliance card
- [P2] [io-tooltip] Accessibility keyboard table omits pointer/hover interaction entries
- [P2] [io-popover] `placement="auto"` has no test for viewport-aware direction selection
- [P1] [io-popover] No `aria-label` fallback prop when `label` is intentionally absent

### navigation
- [P1] [io-tabs-bar] Active tab not scrolled into view on activation or resize
- [P2] [io-tabs] Programmatic activeTabIndex change does not emit update event — contract undocumented
- [P2] [io-tabs-bar] compact prop missing from storefront API documentation
- [P2] [io-pagination] showLastPage prop is missing — no direct link to last page
- [P2] [io-pagination] Event detail previousPage field missing from storefront API docs
- [P1] [io-stepper] ariaLabel prop and stepChange event are absent from storefront API documentation
- [P1] [io-stepper] Storefront accessibility docs describe the stepper as non-interactive — incorrect
- [P2] [io-breadcrumb] No maxItems / collapse behavior for long breadcrumb trails
- [P2] [io-tabs-bar] aria-labelledby prop is missing — cannot reference an existing DOM heading as tablist label
- [P2] [io-tabs] Animated sliding indicator bar is missing — only a static CSS border-bottom transition is used

### layout
- [P1] [io-accordion] Docs claim native `disabled` is set on trigger button — source only sets `aria-disabled`
- [P0] [io-scroller] Keyboard arrow/Home/End scroll handlers documented but not implemented
- [P2] [io-table] `striped` and `bordered` props absent from storefront API documentation
- [P0] [io-table] Horizontal scroll wrapper missing `tabIndex` — keyboard users cannot scroll overflowing tables
- [P1] [io-carousel] Slotted slides lack `aria-roledescription="slide"` and `role="group"` — screen reader users receive no slide identity feedback
- [P1] [io-carousel] Missing `autoplay` prop with pause-on-hover and pause-on-focus — WCAG 2.2.2
- [P2] [io-carousel] No skip link — keyboard users must Tab through all slide content
- [P2] [io-table] Missing `layout` prop for CSS `table-layout` algorithm selection
- [P1] [io-accordion] `disabled` trigger should use native `disabled` attribute or document the intentional `aria-disabled`-only pattern
- [P1] [io-table] `striped` and `bordered` props missing from storefront configurator and usage documentation

### typography
- [P1] [io-link] External links do not auto-render a visual indicator icon when `external=true`
- [P1] [io-link] Missing `aria-current` prop for active navigation link state
- [P1] [io-link] No test verifies the rendered `aria-label` value for external links
- [P2] [io-heading] Missing `hyphens` prop — io-text has it but io-heading does not
- [P2] [io-heading] Missing `medium` font weight — io-text supports `weight="medium"` but io-heading does not
- [P2] [io-text] A11y spec tests native HTML elements, not the `io-text` custom element
- [P1] [io-link] Usage docs incorrectly state `href` is required and no-href scenario is unsupported — omitting `href` produces a broken non-focusable anchor
- [P1] [io-text-list] Missing component — no styled semantic list primitive exists in io-DS
- [P2] [io-link] Storefront docs claim `external=true` sets `target="_blank"` — consumers must set both separately
- [P1] [io-heading] Usage docs describe per-tag default sizes but the component does not implement this behaviour

### actions
- [P0] [io-tag] disabled prop uses native HTML disabled instead of aria-disabled — removes element from tab order
- [P1] [io-tag] API page documents incorrect default color values — only 3 of 10 colors listed
- [P1] [io-tag-dismissible] Missing disabled prop — no way to prevent dismiss in read-only contexts
- [P1] [io-button] API page missing 8 documented props — hideLabel, icon, iconSource, iconPosition, compact, name, value, form, aria
- [P2] [io-button-group] API page incorrectly states label is applied via aria-label — actual implementation uses aria-labelledby
- [P1] [io-tag-dismissible] API page documents variant default as 'neutral' but component default is 'default'
- [P1] [io-button] a11y spec tests a plain <button> element, not the io-button component
- [P2] [io-tag-dismissible] Missing io-tag-dismissible.disabled.spec.ts — no disabled-state spec file
- [P2] [io-tag] io-tag has no compact prop — missing density option present on comparable components
- [P1] [io-button] io-button-group label=undefined renders no aria-labelledby — group has no accessible name

### feedback-media
- [P1] [io-icon] Missing io-icon.a11y.spec.ts — a11y spec required for interactive components
- [P1] [io-wordmark] API docs omit href and target props
- [P2] [io-icon] API docs omit fixedWidth prop and 'inherit' size value
- [P1] [io-progress] Missing componentWillLoad label warning for unlabelled progressbar
- [P2] [io-spinner] shadow: true should be shadow: { delegatesFocus: true } per convention
- [P1] [io-badge] aria-label placed on inner span, not on Host — breaks accessible name computation
- [P2] [io-avatar] Missing loading="lazy" on img element
- [P1] [io-progress] Indeterminate state missing prefers-reduced-motion fallback announcement for screen readers
- [P1] [io-badge] ariaLabel prop naming violates io-DS attribute convention for aria props
- [P2] [io-avatar] Missing keyboard interaction section in accessibility page

## Safety Confirmation
- No GitHub issues contain reference design system name ✓
- io-DS branding, tokens, themes not modified ✓
