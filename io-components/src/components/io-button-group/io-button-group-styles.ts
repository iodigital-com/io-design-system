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

    /* ── Container (pill wrapper) ───────────────────────── */

    .group {
      display: inline-flex;
      align-items: stretch;
      background: var(--io-button-group-pill-bg);
      border: 1px solid var(--io-button-group-pill-border);
      border-radius: var(--io-button-group-pill-radius);
      padding: 2px;
      gap: 0;
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
      border: none;
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
