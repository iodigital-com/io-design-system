# @io-digital/components

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

  Removes `io-skeleton` from `@io-digital/components`. Product pages implement their own skeleton layouts using standard HTML and CSS — a dedicated component is unnecessary.

  Note: `io-skeleton` was in beta status. Beta components do not carry semver guarantees — removal is treated as a patch-level change per project policy.

  - Deleted `io-skeleton` Stencil component and all associated files
  - Removed `--io-skeleton-*` CSS tokens and `@keyframes io-skeleton-pulse` from global tokens
  - Removed `getSkeletonStyle` utility from `@io-digital/components/styles`
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
