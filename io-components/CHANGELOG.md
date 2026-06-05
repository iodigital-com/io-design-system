# @iodigital-com/components

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

## 1.0.4

### Patch Changes

- 7526e01: fix(io-modal): hide backdrop div when modal is closed — prevents pointer-event interception

  The `modal__backdrop` div introduced in 1.0.3 was always visible in the shadow
  DOM even when `open=false`, causing it to intercept pointer events on elements
  behind the modal (e.g. the "Add location" button on the Locations page was
  unclickable because the invisible backdrop div covered the whole viewport).

  Fixes:

  - `.modal__backdrop` defaults to `display: none; pointer-events: none`
  - Backdrop and dialog positioning are both scoped to `:host([prevent-top-layer][open=""])`
    so they only apply when the modal is truly open (Stencil sets `open=""` for
    `open=true`, and removes the attribute for `open=false`)

## 1.0.3

### Patch Changes

- 1b4279b: fix(io-modal): render backdrop as shadow DOM div — fixes slot pointer events in React 18

  **Root cause:** When `preventTopLayer=true`, making the `:host` element the
  full-screen backdrop (`position: fixed; inset: 0`) causes the host to intercept
  pointer events on slotted light-DOM children (`slot="footer"` IoButton elements).
  Since slotted content lives in the light DOM at the host level, any click on
  the visual footer area was being captured by the host backdrop before reaching
  the IoButton elements — making Cancel/Save footer buttons unclickable.

  **Fix:** The backdrop is now a
  dedicated `<div class="modal__backdrop">` rendered inside the shadow DOM
  _before_ the `<dialog>`, and the `:host` stays as `display: contents` always.
  This removes the host from the pointer-event path entirely:

  - Host: `display: contents` — never intercepts pointer events
  - `.modal__backdrop`: `position: fixed; inset: 0` — visual backdrop + click-to-close
  - `<dialog>`: `position: fixed; z-index: +1` above backdrop
  - Slotted footer buttons: rendered in dialog footer via slot, pointer events work correctly

## 1.0.2

### Patch Changes

- 17054b4: fix(io-modal): use `[open=""]` selector for backdrop to avoid React 18 false-positive

  React 18 (and other frameworks) may set `open="false"` as a string attribute
  on custom elements rather than removing the attribute. The CSS selector
  `[open]` matches ANY element with the attribute present, regardless of value —
  so `open="false"` was triggering the `preventTopLayer` backdrop overlay even
  when the modal should be closed.

  Changed `:host([prevent-top-layer][open])` to `:host([prevent-top-layer][open=""])`.
  Stencil sets `open=""` (empty string) when the prop is `true` and removes the
  attribute entirely when `false`, so the empty-string value check correctly
  matches only the truly-open state.

## 1.0.1

### Patch Changes

- 0a43fcb: fix(io-modal): default preventTopLayer to true for React 18 compatibility

  `showModal()` promotes `<dialog>` to the browser top layer. React 18 delegates
  synthetic events to `#root`, so click events from shadow-DOM children inside a
  top-layer dialog do not reach React — causing slotted `slot="footer"` buttons
  to be non-clickable.

  `preventTopLayer` now defaults to `true`: the modal opens with `show()` and
  manages its own backdrop, ESC key, focus-trap, scroll lock, and `inert`
  attributes. Behavior is identical for all consumers; React 18 footer buttons
  now work correctly without any code changes.

  Set `preventTopLayer={false}` explicitly only when native top-layer stacking
  is required (e.g. to guarantee the modal appears above Popover API elements).

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

## 1.0.2

### Patch Changes

- b2c1558: Update io-button-group pill style with visual improvements to spacing, border-radius, and button separation for a more polished appearance.

## 1.0.1

### Patch Changes

- fix: export global.css and auto-import from components-react

  Consumers of `@iodigital-com/components-react` now automatically receive all
  `--io-*` CSS custom properties on `:root` without any extra setup. Previously,
  component-level tokens (wordmark sizes, button padding, icon sizes, etc.) were
  undefined in consuming apps because the compiled `app.css` had no export path
  and nothing imported it.

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
