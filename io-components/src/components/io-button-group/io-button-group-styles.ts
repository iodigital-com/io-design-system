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
      font-weight: var(--io-font-weight-semibold);
      line-height: var(--io-line-height-normal);
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
      box-shadow: var(--io-button-group-active-shadow);
      /* Only change border color — width is already 1px from .group-btn baseline,
         so no layout shift occurs when a button becomes active. */
      border-color: var(--io-button-group-active-border);
    }

    /* ── Hover (pointer devices only — hover guard) ─────── */

    @media (hover: hover) and (pointer: fine) {
      .group-btn:not(.group-btn--active):not(.group-btn--disabled):not(:disabled):hover {
        background: var(--io-button-group-hover-bg);
      }
    }

    /* ── Disabled ────────────────────────────────────────── */

    .group-btn--disabled,
    .group-btn:disabled {
      opacity: var(--io-button-group-disabled-opacity);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Focus visible ───────────────────────────────────── */

    .group-btn:focus {
      outline: none;
    }

    .group-btn:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
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
    }

    /* ── Compact + column interaction ────────────────────── */
    /* When compact and direction="column" are combined, the .group gets
       flex-direction: column and width: 100% from the direction rule below.
       The compact pill-padding (1px) is intentionally preserved in vertical layout;
       full-width stacked buttons look correct with the reduced pill gap.
       No additional overrides are needed — this rule documents the intentional
       cascade so a future reorder does not silently break the combination. */
    :host([compact][direction="column"]) .group {}

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
