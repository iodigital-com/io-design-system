/**
 * io-button-group CSS-in-JS style generator.
 *
 * Returns a <style> string for the button group component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getButtonGroupStyles(): string {
  return `
    :host {
      display: inline-flex;
      font-family: var(--io-font-primary);
    }

    :host([disabled]) {
      /* cursor: not-allowed is NOT set here — pointer-events: none prevents the
         host from entering the hit-test zone, so any cursor style on :host would
         never render. The not-allowed cursor is handled by .group-btn--disabled. */
      pointer-events: none;
      opacity: var(--io-button-group-disabled-opacity);
    }

    /* Hide declarative io-button children — they are parsed at load time and
       re-rendered as internal shadow buttons. The slot element itself is kept
       in the render tree to suppress Stencil's unrendered-slot warnings. */
    ::slotted(*) {
      display: none;
    }

    /* ── Container (pill wrapper) ───────────────────────── */

    .group {
      display: inline-flex;
      align-items: stretch;
      background: var(--io-button-group-pill-bg);
      border: 1px solid var(--io-button-group-pill-border);
      border-radius: var(--io-button-group-pill-radius);
      padding: var(--io-button-group-pill-padding);
      gap: var(--io-button-group-btn-gap);
    }

    /* ── Individual button ──────────────────────────────── */

    .group-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: var(--io-button-group-min-height);
      padding: var(--io-button-group-padding-y) var(--io-button-group-padding-x);
      font-family: var(--io-font-primary);
      font-size: var(--io-button-group-font-size);
      font-weight: var(--io-font-weight-medium);
      line-height: 20px;       /* absolute px — immune to rem/font-size context; 5+20+5+1+1=32px button → 42px container */
      background: transparent;
      color: var(--io-button-group-color);
      /* Transparent border (not none) keeps layout stable when active state toggles border color */
      border: 1px solid transparent;
      border-radius: var(--io-button-group-btn-radius);
      cursor: pointer;
      white-space: nowrap;
      position: relative;
      transition: var(--io-button-group-transition);
      -webkit-font-smoothing: antialiased;
    }

    /* ── Active state ────────────────────────────────────── */

    .group-btn--active {
      background: var(--io-button-group-active-bg);
      color: var(--io-button-group-active-color);
      font-weight: var(--io-font-weight-semibold);
      box-shadow: var(--io-button-group-active-shadow);
      /* Only change border color — width is already 1px from .group-btn baseline,
         so no layout shift occurs when a button becomes active. */
      border-color: var(--io-button-group-active-border);
    }

    /* ── Hover (pointer devices only — hover guard) ─────── */

    @media (hover: hover) and (pointer: fine) {
      .group-btn:not(.group-btn--active):not(.group-btn--disabled):not(:disabled):hover {
        color: var(--io-text-primary);
      }
    }

    /* ── Disabled ────────────────────────────────────────── */

    .group-btn--disabled,
    .group-btn:disabled {
      opacity: var(--io-button-group-disabled-opacity);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Prevent double-opacity compounding when the whole group is disabled.
       :host([disabled]) already sets opacity on the host element; each child
       button must not also apply its own opacity layer (0.5 × 0.5 = 0.25). */
    :host([disabled]) .group-btn--disabled,
    :host([disabled]) .group-btn:disabled {
      opacity: 1;
    }

    /* ── Focus visible ───────────────────────────────────── */

    .group-btn:focus {
      outline: none;
    }

    .group-btn:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active, var(--io-shadow-focus-ring));
      z-index: 1;
    }

    /* ── Reduced motion ──────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .group-btn { transition: none; }
    }

    /* ── Size variants ───────────────────────────────────── */
    /* Note: size variants and [compact] share equal specificity
       (:host([attr]) .group-btn). compact is intentionally declared after these
       size blocks so it wins via source order when both attributes are present.
       See the compact block below for the authoritative comment. */

    :host([size="sm"]) .group-btn {
      min-height: var(--io-button-group-min-height-sm);
      padding: var(--io-button-group-padding-y-sm) var(--io-button-group-padding-x-sm);
      font-size: var(--io-button-group-font-size-sm);
    }

    :host([size="lg"]) .group-btn {
      min-height: var(--io-button-group-min-height-lg);
      padding: var(--io-button-group-padding-y-lg) var(--io-button-group-padding-x-lg);
      font-size: var(--io-button-group-font-size-lg);
    }

    /* ── Compact variant ─────────────────────────────────── */
    /* compact intentionally follows size variant rules — equal specificity means
       source order wins, so compact always overrides size padding and min-height.
       If size="lg" and compact are combined, compact dimensions take effect. */

    :host([compact]) .group {
      padding: var(--io-button-group-pill-padding-compact);
    }

    :host([compact]) .group-btn {
      min-height: var(--io-button-group-min-height-compact);
      padding: var(--io-button-group-padding-y-compact) var(--io-button-group-padding-x-compact);
      font-size: var(--io-button-group-font-size-compact);
      line-height: 16.8px;    /* absolute px — matches sidebar compact button baseline */
      border: none;           /* compact buttons have no border (matches sidebar no-border style) */
      /* WCAG 2.5.5 touch-target mitigation: compact visual height is 24px which
         is below the 44×44 px minimum. Expand the invisible hit area via a
         ::before pseudo-element so pointer-device contexts remain unaffected. */
      position: relative;
    }

    :host([compact]) .group-btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 44px;
      transform: translateY(-50%);
    }

    /* ── Compact active state ─────────────────────────────── */
    /* Active state color is controlled by the variant prop, not compact.
       Use variant="secondary" with compact for the white-fill active style. */

    /* ── Compact + column interaction ────────────────────── */
    /* When compact and direction="column" are combined, the .group gets
       flex-direction: column and width: 100% from the direction rule below.
       The compact pill-padding (1px) is intentionally preserved in vertical layout;
       full-width stacked buttons look correct with the reduced pill gap.
       No additional overrides are needed — this rule documents the intentional
       cascade so a future reorder does not silently break the combination. */
    :host([compact][direction="column"]) .group {}
    /* ── Variant: secondary (white active, neutral) ──────── */
    /* Use variant="secondary" for property selectors, toolbar controls, and
       any context where a neutral white-fill active state is preferred over
       the brand primary blue. Compact mode pairs naturally with secondary. */

    :host([variant="secondary"]) .group-btn--active {
      background: var(--io-button-group-secondary-active-bg);
      color: var(--io-button-group-secondary-active-color);
      box-shadow: var(--io-button-group-secondary-active-shadow);
      border-color: transparent;
      font-weight: var(--io-font-weight-medium);
    }

    @media (hover: hover) and (pointer: fine) {
      :host([variant="secondary"]) .group-btn:not(.group-btn--active):not(.group-btn--disabled):not(:disabled):hover {
        color: var(--io-text-primary);
      }
    }



    /* ── Column (vertical) direction ────────────────────── */

    :host([direction="column"]) {
      display: flex;
      flex-direction: column;
    }

    :host([direction="column"]) .group {
      flex-direction: column;
      width: 100%;
    }

    :host([direction="column"]) .group-btn {
      width: 100%;
      justify-content: center;
    }
  `;
}
