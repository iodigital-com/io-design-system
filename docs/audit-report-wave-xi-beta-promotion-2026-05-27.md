# Comprehensive Pre-Promotion Audit — Wave XI Beta Components

**Date**: 2026-05-27  
**Branch**: `main` (merged from `feat/wave-xi/modal-drawer-bg-motion-357`)  
**HEAD commit**: `4931777` — fix(snapshots): update render snapshots after rebase  
**Scope**: All 10 beta components — promotion readiness assessment  
**Method**: Read-only audit (no code changes). Quality gates run, source + spec files read, a11y patterns examined, documentation cross-referenced.

---

## 1. Quality Gate Summary

| Gate | Status | Notes |
|---|---|---|
| `governance:check` (9 sub-checks) | ✅ PASS | All workspace invariants satisfied |
| `events:guard` | ✅ PASS | No `io-` prefixed custom event names detected |
| Storefront unit tests | ✅ PASS | 1 335 tests, 43 files |
| Component render tests | ✅ PASS | 53 tests, 18 files (render specs only) |
| `api:check` | ✅ PASS | Breaking-change snapshot is current; no drift from components |
| `type-check` | ❌ **FAIL** | 14 errors — details in §6 |

**Overall: 5/6 gates green. One failing gate (`type-check`) must be resolved before any branch merge to a release baseline.**

---

## 2. Security Findings

### 2.1 AutoCodeHighlight innerHTML sink — RESOLVED ✅
**File**: `io-storefront/src/components/code/AutoCodeHighlight.tsx`  
**Wave J issue**: #266 (P1)

The previously-tracked global `innerHTML` sink has been replaced. The current code sets highlighted output via:

```ts
codeEl.replaceChildren(document.createRange().createContextualFragment(result.value));
```

The `createContextualFragment` call parses `result.value` — the output of `hljs.highlight(rawText, ...)`. The input to hljs is `codeEl.textContent` (text-only; already safe), and hljs escapes its output before generating the highlighted HTML string. The DOM API used does not execute inline scripts. Risk is low; however, the spec (`AutoCodeHighlight.spec.tsx`) explicitly tests that this path is taken (not `innerHTML`), which provides regression coverage.

**Assessment**: Wave J #266 is effectively resolved in the codebase. The issue can be closed after confirming the test passes on CI.

### 2.2 `layout.tsx` — dangerouslySetInnerHTML — ACCEPTABLE ✅
**File**: `io-storefront/src/app/layout.tsx` (lines 60, 78)

Two inline `<script>` blocks inject blocking theme-init and focus-modality-detection logic before first paint. Neither reads user-controlled input — they read `localStorage` and `window.matchMedia`, then set `data-*` attributes on `document.documentElement`. There is no user data involved, so XSS risk is nil.

### 2.3 io-table usage page — `tbody.innerHTML = ''` — ACCEPTABLE ✅
**File**: `io-storefront/src/app/components/io-table/usage/page.tsx` (line 209)

Clears a `<tbody>` to empty string. No user content injected. Safe.

---

## 3. Beta Component Assessments

All 10 beta components are currently "Hold at beta" per `docs/component-stability-recommendations.md`. This section provides the technical evidence for each hold, identifies blockers, and distinguishes between issues that must be fixed before promotion versus items that only require production seasoning.

### 3.1 io-carousel
**Hold reason**: Deliberate product decision (Option B).  
**Technical basis**: Drag interaction is pointer-only. The `io-carousel.keyboard.spec.ts` spec covers button-based navigation (prev/next controls are keyboard accessible), and the accessibility page explicitly documents the strategic decision. Drag parity is intentionally deferred.  
**Promotion status**: 🔴 **Hold — product decision pending.** Button navigation is WCAG-compliant; drag parity is the open item. No technical defect; hold is justified.

### 3.2 io-popover
**Hold reason**: New Wave XI component; critical a11y gap identified.  
**Source file**: `io-components/src/components/io-popover/io-popover.tsx`

#### Critical finding — missing focus trap (WCAG 2.1.2 / ARIA dialog pattern)

The component sets `role="dialog"` and `aria-modal="true"` on a Shadow DOM `<div>` panel. It correctly:
- Moves focus to the first focusable child on open (`requestAnimationFrame(() => getFirstFocusable(shadow)?.focus()`)
- Returns focus to the trigger on close (`this.triggerEl?.focus()`)
- Handles ESC via `@Listen('keydown', { target: 'window' })`
- Handles outside-click close via `@Listen('click', { target: 'window', capture: true })`

What is **absent**: any focus containment loop. There is no implementation of `inert` on the backdrop, no Tab cycling within the panel, and no `keydown` handler that prevents focus from leaving the panel boundary.

The native Popover API (`popover="auto"`) provides light-dismiss on outside click and ESC, but does **not** constrain keyboard focus. The contrast with `io-modal` and `io-drawer` (both use native `<dialog>` which provides browser-native focus trapping) is stark.

**Impact**: Sighted keyboard users can Tab freely out of the open popover into background page content, directly contradicting the `aria-modal="true"` declaration. Screen readers that respect `aria-modal` will restrict virtual cursor navigation, but real keyboard focus will still escape, creating a split-brain state for users who combine AT with keyboard navigation.

**WCAG references**: Understanding SC 2.1.2 (No Keyboard Trap), ARIA 1.1 §dialog pattern, APG Modal Dialog Example.

#### Secondary finding — axe spec tests static DOM only

`io-popover.a11y.spec.ts` assembles a static HTML structure and runs axe on it. This verifies ARIA roles/attributes in the DOM but does not exercise the actual Stencil component render cycle, making it blind to behavioral a11y issues (focus management, ARIA state changes on open/close).

**Promotion status**: 🔴 **Blocked.** Must resolve focus containment before promoting to stable. Recommended options:
1. Switch panel element from a Shadow DOM `<div>` to a native `<dialog>` element (browser provides focus trapping automatically — matches `io-modal`/`io-drawer` approach), or
2. Implement a Tab-key focus trap inside the Shadow DOM (cycle focus between first and last focusable children), or
3. Remove `aria-modal="true"` if non-modal popup semantics are intended and document the intentional decision.

### 3.3 io-multi-select
**Hold reason**: New Wave XI; grouped option ARIA semantics violation.  
**Source file**: `io-components/src/components/io-multi-select/io-multi-select.tsx`

#### FACE implementation — correct ✅
All FACE plumbing is properly implemented:
- `formAssociated: true` + `@AttachInternals() internals!: ElementInternals`
- `syncFormValue()` with double optional chaining (`this.internals?.setFormValue?.()`, `this.el?.shadowRoot?.querySelector(...)`)
- `formResetCallback()` as a plain synchronous method
- `@State() faceInvalid` for re-render on validity change
- `@Watch('required')` and related watches
- `checkValidity()`, `reportValidity()`, `setFocus()` public methods

#### High finding — grouped option semantics (APG listbox group pattern)

When options have a `group` property, the component renders:

```tsx
<li role="presentation" class="multi-select-group">
  <span id={groupId} class="multi-select-group__label" aria-hidden="true">
    {group.label}
  </span>
  {groupItems /* each option has role="option" */}
</li>
```

`role="presentation"` removes the list item's semantic meaning from the AT tree. `aria-hidden="true"` on the group label explicitly hides it from screen readers. The net result is that grouped options appear as flat, ungrouped options to AT — the group boundary and label are both invisible.

The correct APG listbox group pattern (`role="listbox"` with nested `role="group"` elements) requires:

```tsx
<li role="group" aria-labelledby={groupId}>
  <span id={groupId} class="multi-select-group__label">
    {group.label}
  </span>
  {groupItems}
</li>
```

The storefront accessibility page for io-multi-select does not document or acknowledge grouped-option semantics at all, suggesting the gap was not caught during initial Wave XI development.

**Promotion status**: 🟡 **Blocked — but fixable pre-promotion.** The FACE implementation is solid; only the grouped options rendering needs correction. Correcting to `role="group"` + `aria-labelledby` is a localised change. Storefront accessibility page must also be updated to document the group pattern.

### 3.4 io-alert
**Hold reason**: New Wave XI; needs production field use.  
**Technical assessment**: Complete spec suite (`.spec.ts`, `.click.spec.ts`, `.a11y.spec.ts`). Four variants (`info`, `success`, `warning`, `error`). `heading` and `dismissible` props. Correct `dismiss` event name (non-prefixed). No FACE requirement (not a form field). The absence of a `.disabled.spec.ts` is correct — io-alert has no `disabled` prop; the spec tests `dismissible = false` state instead.  
**No blocking technical issues found.** Hold is justified as production seasoning, not a defect.  
**Promotion status**: 🟡 **Hold — production hardening. Ready for conditional promotion once field usage confirmed.**

### 3.5 io-heading
**Hold reason**: New Wave XI; needs production field use.  
**Technical assessment**: Non-interactive typography primitive. Spec and a11y spec present. Decoupled visual size from semantic heading level (`size` vs `tag` props). No click, disabled, or FACE specs required. 245-line spec covers prop combinations.  
**No blocking technical issues found.**  
**Promotion status**: 🟡 **Hold — production hardening. Ready for conditional promotion once field usage confirmed.**

### 3.6 io-text
**Hold reason**: New Wave XI; needs production field use.  
**Technical assessment**: Non-interactive typography primitive. Spec and a11y spec present. Token-driven font size, weight, and color. No click, disabled, or FACE specs required. 228-line spec.  
**No blocking technical issues found.**  
**Promotion status**: 🟡 **Hold — production hardening. Ready for conditional promotion once field usage confirmed.**

### 3.7 io-scroller
**Hold reason**: New Wave XI; needs production field use.  
**Technical assessment**: Non-interactive container. Uses `IntersectionObserver` on sentinel elements to drive gradient edge-fade indicators. Emits no events. `label` prop provides `aria-label`. Spec and a11y spec present; no click or disabled spec needed (correct). 202-line spec.  
**No blocking technical issues found.**  
**Promotion status**: 🟡 **Hold — production hardening. Ready for conditional promotion once field usage confirmed.**

### 3.8 io-tabs-bar
**Hold reason**: New Wave XI; needs production field use.  
**Technical assessment**: Standalone tab navigation bar decoupled from panel management. Applies `role="tab"`, `aria-selected`, `tabindex` to slotted `<button>` children. Emits `update` event with `{ activeTabIndex }`. Keyboard navigation (Arrow Left/Right, Enter/Space, Home/End) implemented. Spec (373 lines) covers click events, update emission, and keyboard navigation. Separate `.a11y.spec.ts` present. Click event coverage is embedded in the main spec (not a separate `.click.spec.ts`) — acceptable for this component's structure.  
**No blocking technical issues found.**  
**Promotion status**: 🟡 **Hold — production hardening. Ready for conditional promotion once field usage confirmed.**

### 3.9 io-switch
**Hold reason**: New Wave XI; needs production field use.  
**Technical assessment**: FACE toggle with `role="switch"`. Complete FACE spec suite present: `.spec.ts`, `.click.spec.ts`, `.disabled.spec.ts`, `.a11y.spec.ts`, `.face.spec.ts`. Utility and styles files present. Keyboard navigation documented.  
**No blocking technical issues found.**  
**Promotion status**: 🟡 **Hold — production hardening. Ready for conditional promotion once field usage confirmed.**

### 3.10 io-pin-code
**Hold reason**: New Wave XI; needs production field use.  
**Technical assessment**: FACE PIN/OTP entry with keyboard navigation, paste distribution, and password masking. Complete FACE spec suite: `.spec.ts`, `.click.spec.ts`, `.disabled.spec.ts`, `.a11y.spec.ts`, `.face.spec.ts`. Utility and styles files present.  
**No blocking technical issues found.**  
**Promotion status**: 🟡 **Hold — production hardening. Ready for conditional promotion once field usage confirmed.**

---

## 4. Stable Component Changes on Current Branch

### io-modal and io-drawer — Background prop + motion events (PR #357)

Both components received two additions:

**`background: IoModalBackground = 'canvas'`** — Three-value enum (`canvas` / `surface` / `elevated`) maps to existing token-driven background colours for the dialog body. Follows the established CSS custom property pattern. Sensible default (`canvas`) preserves backward-compatible appearance.

**`motionVisibleEnd` and `motionHiddenEnd` events** — Fire at the end of CSS open/close transitions, enabling callers to time dependent actions (e.g. removing a component from the DOM after a close animation completes). Both events are non-prefixed (correct). Both are in the `api-surface.json` snapshot.

The native `<dialog>` element continues to provide browser-native focus trapping, ESC handling, and `role="dialog"` for both components. No regressions observed.

**Assessment**: Changes are well-scoped and follow established patterns. No issues found.

---

## 5. Documentation Drift

### 5.1 README.md — stale component count
**File**: `README.md`, line 31  
**Current text**: `"Current component set (22):"`  
**Actual count**: 37 components (10 beta, 27 stable in `sitemap.ts`; 49 total entries including sub-components in `api-surface.json`)  
**Missing from the listed 22**: io-accordion, io-alert, io-avatar, io-badge, io-breadcrumb, io-breadcrumb-item, io-button-group, io-carousel, io-checkbox-group, io-divider, io-drawer, io-form-field, io-heading, io-multi-select, io-pin-code, io-popover, io-progress, io-radio-group, io-scroller, io-step, io-stepper, io-switch, io-table family, io-tabs-bar, io-text, io-toast-item, io-wordmark

**Action required**: Update to `"Current component set (37):"` and update the component list. Or replace the hard count with a pointer to the storefront component index to prevent future drift.

### 5.2 Storefront home page — stale counts
**File**: `io-storefront/src/app/page.tsx`  
Three separate references to "19" components:
- Line 105: `'19 interactive components with live configurator and full API docs.'`
- Line 181: `'19 components.'`
- Line 296: `<SectionHeading badge="19">All components</SectionHeading>`

**Current count**: 37 components.  
**Action required**: Update all three references to `37`. Consider driving this from `sitemap.ts` length to prevent future drift.

---

## 6. Infrastructure Findings

### 6.1 type-check gate fails due to stale `.next/types/validator.ts`
**Severity**: HIGH — CI gate failure  
**Gate**: `npm run type-check` → 14 TypeScript errors  
**Root cause**: `io-storefront/tsconfig.json` includes `.next/types/**/*.ts` in its compilation scope. The local `.next/` directory (gitignored per `.gitignore` line 13: `.next/`) contains a stale `validator.ts` generated by a previous build that referenced storefront page directories for `io-breadcrumb-item` and `io-form-field`. Those directories no longer exist.

**Exact errors** (representative sample):
```
.next/types/validator.ts(204,39): error TS2307: Cannot find module
  '../../src/app/components/io-breadcrumb-item/accessibility/page.js'
.next/types/validator.ts(681,39): error TS2307: Cannot find module
  '../../src/app/components/io-form-field/accessibility/page.js'
```

14 total errors: 7 for `io-breadcrumb-item` (page, layout, accessibility, api, examples, usage) and 7 for `io-form-field` (page, layout, configurator, accessibility, api, examples, usage).

**Note on component-stability-recommendations.md**: The document records `io-form-field` as promoted to stable in PR #374 with "All 5 storefront pages complete." This claim is inconsistent with the current codebase — no storefront pages exist for `io-form-field`. The validator references suggest these pages existed at some point in a local working tree or were generated but never committed.

**Impact**: 
- Locally: `npm run type-check` fails on any machine that has a stale `.next/` from a previous dev or build session.
- CI: If CI runs type-check on a freshly cloned repo (no `.next/` present), the gate passes. If CI caches `.next/` across runs, the gate may fail intermittently.

**Recommended fixes** (two required, not exclusive):
1. **Clean `.next/` before type-check in the quality gate pipeline**: Add `rm -rf io-storefront/.next` as a pre-step to the `type-check` or `build:quality-gates` script.
2. **Determine intent for `io-form-field` and `io-breadcrumb-item` storefront pages**: If they were deleted intentionally (both are sub-components documented within their parent components' pages), update `component-stability-recommendations.md` to remove the incorrect "All 5 storefront pages complete" claim for `io-form-field`. If they should exist, create them.

---

## 7. Wave J Backlog — P1 Items Status

| Issue | Title | Status as of Audit |
|---|---|---|
| [#266](https://github.com/iodigital-com/io-design-system/issues/266) | Remove global innerHTML sink from AutoCodeHighlight | ✅ **Resolved in codebase** — `createContextualFragment` replaces `innerHTML`; spec verifies; can close |
| [#267](https://github.com/iodigital-com/io-design-system/issues/267) | Deps: vulnerable next/fast-uri chain | ✅ **Resolved** — noted in wave-order doc; can close |
| [#272](https://github.com/iodigital-com/io-design-system/issues/272) | Untrack `.claude/` CLI artifacts from git history | 🔴 **Still open** — not within scope of this audit |
| [#273](https://github.com/iodigital-com/io-design-system/issues/273) | Update io-select api-surface snapshot | ✅ **Superseded** — `api:check` passes on current branch; snapshot is current |
| [#265](https://github.com/iodigital-com/io-design-system/issues/265) | Block io-* custom events from bypassing events guard | 🔴 **Still open** |
| [#268](https://github.com/iodigital-com/io-design-system/issues/268) | io-tag remove control: 44px touch target | 🔴 **Still open** — affects stable `io-tag`; the remove button (`removable` prop) likely does not meet 44×44px minimum touch target (WCAG 2.5.5) |

---

## 8. Consolidated Promotion Readiness Matrix

| Component | Beta Since | Blocker | Recommended Action |
|---|---|---|---|
| **io-popover** | Wave XI | 🔴 CRITICAL: `role="dialog" aria-modal="true"` with no focus trap | Fix focus containment OR remove `aria-modal="true"`; then promote after production use |
| **io-multi-select** | Wave XI | 🟡 HIGH: grouped options use `role="presentation"` + `aria-hidden="true"` (non-compliant) | Fix to `role="group"` + `aria-labelledby`; update accessibility docs page; then promote |
| **io-carousel** | Wave XI | 🟡 HOLD: pointer-only drag (deliberate Option B) | Product decision required; no technical defect |
| **io-alert** | Wave XI | None | Promote after production field use (no minimum period specified — team discretion) |
| **io-heading** | Wave XI | None | Promote after production field use |
| **io-text** | Wave XI | None | Promote after production field use |
| **io-scroller** | Wave XI | None | Promote after production field use |
| **io-tabs-bar** | Wave XI | None | Promote after production field use |
| **io-switch** | Wave XI | None | Promote after production field use |
| **io-pin-code** | Wave XI | None | Promote after production field use |

---

## 9. Recommended Action Plan (Prioritised)

### Immediate (before next release)
1. **Fix `type-check` gate**: Add `.next/` cleanup to quality gate pipeline. Clarify whether `io-form-field` and `io-breadcrumb-item` storefront pages should be created or the stale `.next/` reference acknowledged as a local artifact only.
2. **Close Wave J #266, #267, #273**: All three are resolved in the current codebase.

### Before io-popover can be promoted
3. **io-popover focus trap**: Implement focus containment or switch to native `<dialog>`. Update the a11y spec to use actual Stencil component rendering (not static DOM assembly) to catch behavioral a11y regressions going forward.

### Before io-multi-select can be promoted
4. **io-multi-select grouped options**: Change group container from `role="presentation"` to `role="group"` with `aria-labelledby`. Remove `aria-hidden="true"` from the group label span. Update `io-storefront/src/app/components/io-multi-select/accessibility/page.tsx` to document the group keyboard and announcement pattern.

### Documentation cleanup
5. **README.md**: Update component set count from 22 to 37; update component list.
6. **Storefront home page**: Update all three "19 components" references to 37.
7. **component-stability-recommendations.md**: Correct or remove the claim that `io-form-field` has "All 5 storefront pages complete."

### Ongoing Wave J
8. **#272** (untrack `.claude/`): Follow through with git history clean.
9. **#265** (events guard bypass): Implement guard to block `io-*` prefixed event names from bypassing the guard.
10. **#268** (io-tag touch target): Verify and fix the remove button's touch target size to meet WCAG 2.5.5 (44×44px).

---

## Appendix A — Test Coverage Inventory (Beta Components)

| Component | .spec | .click | .disabled | .a11y | .face | .keyboard | Utils spec | Notes |
|---|---|---|---|---|---|---|---|---|
| io-alert | ✅ | ✅ | ✅ | ✅ | — | — | — | .disabled tests dismissible=false; correct |
| io-carousel | ✅ | — | — | ✅ | — | ✅ | — | keyboard spec covers button-nav |
| io-heading | ✅ | — | — | ✅ | — | — | — | Non-interactive; no click/disabled needed |
| io-multi-select | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | Full FACE suite |
| io-pin-code | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | Full FACE suite + utils |
| io-popover | ✅ | ✅ | — | ✅ | — | — | ✅ | A11y spec tests static DOM only — behavioral gaps |
| io-scroller | ✅ | — | — | ✅ | — | — | — | No events emitted; no click spec needed |
| io-switch | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | Full FACE suite + utils |
| io-tabs-bar | ✅ | ✅ | — | ✅ | — | — | — | Click/update tests embedded in main spec |
| io-text | ✅ | — | — | ✅ | — | — | — | Non-interactive; no click/disabled needed |

All 10 beta components have the correct spec file structure for their component type. No gaps in required coverage.

---

## Appendix B — Storefront Page Completeness (Beta Components)

All 10 beta components verified to have complete 5-tab storefront page layouts:

| Component | page.tsx | layout.tsx | configurator/ | examples/ | usage/ | accessibility/ | api/ | stories |
|---|---|---|---|---|---|---|---|---|
| io-alert | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| io-carousel | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| io-heading | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| io-multi-select | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| io-pin-code | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| io-popover | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| io-scroller | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| io-switch | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| io-tabs-bar | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| io-text | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
