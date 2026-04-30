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
      cursor: not-allowed;
      pointer-events: none;
      opacity: var(--io-button-group-disabled-opacity);
    }

    /* Hide declarative io-button children — they are parsed at load time and
       re-rendered as internal shadow buttons. The slot element itself is kept
       in the render tree to suppress Stencil's unrendered-slot warnings. */
    ::slotted(*) {
      display: none;
    }

    /* ── Container ──────────────────────────────────────── */

    .group {
      display: inline-flex;
      align-items: stretch;
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
      background: var(--io-button-group-bg);
      color: var(--io-button-group-color);
      border: var(--io-button-group-border-width) solid var(--io-button-group-border-color);
      cursor: pointer;
      white-space: nowrap;
      position: relative;
      transition: var(--io-button-group-transition);
      -webkit-font-smoothing: antialiased;
    }

    /* Border collapse — adjacent buttons share a single border line */
    .group-btn + .group-btn {
      margin-left: calc(-1 * var(--io-button-group-border-width));
    }

    /* Corner radius — outer corners only */
    .group-btn:first-of-type {
      border-radius:
        var(--io-button-group-border-radius)
        0
        0
        var(--io-button-group-border-radius);
    }

    .group-btn:last-of-type {
      border-radius:
        0
        var(--io-button-group-border-radius)
        var(--io-button-group-border-radius)
        0;
    }

    /* Single-item group gets full radius */
    .group-btn:only-of-type {
      border-radius: var(--io-button-group-border-radius);
    }

    /* ── Active state ────────────────────────────────────── */

    .group-btn--active {
      background: var(--io-button-group-active-bg);
      color: var(--io-button-group-active-color);
      border-color: var(--io-button-group-active-border);
      /* z-index: 1 is intentional — raises active button above adjacent siblings so
         the shared border (collapsed via negative margin) renders on both sides of
         the active item. These are local stacking values within the inline-flex group
         context, not semantic page-level z-indices, so component tokens are not used. */
      z-index: 1;
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
      z-index: 2; /* must paint above z-index:1 active button — see note on .group-btn--active */
    }

    /* ── Reduced motion ──────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .group-btn { transition: none; }
    }
  `;
}
