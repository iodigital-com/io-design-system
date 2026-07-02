/**
 * io-button-pure CSS-in-JS style generator.
 *
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * io-button-pure is a link-styled inline action button that:
 * - inherits font-size from its parent (use size='inherit')
 * - supports underline, active, stretch, and alignLabel props
 * - is distinct from io-button variant='link' which is sized independently
 */
export function getButtonPureStyles(): string {
  return `
    :host {
      display: inline-flex;
      font-family: var(--io-font-primary);
    }

    :host([stretch]) {
      width: 100%;
    }

    /* ── Base ──────────────────────────────────────────────── */

    .btn-pure {
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-1);
      padding: 0;
      margin: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--io-button-pure-color, var(--io-color-primary));
      font-family: inherit;
      font-size: inherit;
      font-weight: var(--io-font-weight-medium);
      line-height: inherit;
      text-decoration: none;
      text-underline-offset: var(--io-button-pure-underline-offset, 2px);
      transition: color var(--io-motion-fast), text-decoration-color var(--io-motion-fast);
      -webkit-font-smoothing: antialiased;
    }

    /* ── Alignment ─────────────────────────────────────────── */

    .btn-pure--align-start {
      flex-direction: row;
    }

    .btn-pure--align-end {
      flex-direction: row-reverse;
    }

    /* ── Stretch ───────────────────────────────────────────── */

    .btn-pure--stretch {
      width: 100%;
      justify-content: space-between;
    }

    /* ── Underline ─────────────────────────────────────────── */

    .btn-pure--underline {
      text-decoration: underline;
      text-decoration-color: var(--io-button-pure-underline-color, currentColor);
    }

    /* ── Active / pressed ──────────────────────────────────── */

    .btn-pure--active {
      color: var(--io-button-pure-active-color, var(--io-color-primary-active));
    }

    /* ── Hover ─────────────────────────────────────────────── */

    @media (hover: hover) and (pointer: fine) {
      .btn-pure:not(.btn-pure--disabled):hover {
        color: var(--io-button-pure-hover-color, var(--io-color-primary-hover));
        text-decoration: underline;
        text-decoration-color: var(--io-button-pure-underline-color, currentColor);
      }
    }

    /* ── Disabled ──────────────────────────────────────────── */

    .btn-pure--disabled {
      opacity: var(--io-state-disabled-opacity);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Focus visible ─────────────────────────────────────── */

    .btn-pure:focus-visible {
      outline: none;
      border-radius: var(--io-border-radius-xs);
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Reduced motion ────────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .btn-pure {
        transition: none;
      }
    }
  `;
}
