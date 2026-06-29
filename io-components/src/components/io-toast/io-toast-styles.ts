export function getToastStyles(): string {
  return `
    /* Assertive live region: visually hidden but present in the accessibility tree */
    .toast__assertive-region {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    :host {
      display: flex;
      flex-direction: column;
      gap: var(--io-space-2);
      position: fixed;
      z-index: var(--io-z-toast);
      width: var(--io-toast-max-width);
      max-width: calc(100vw - 2 * var(--io-space-6));

      /* Default: bottom-end */
      bottom: var(--io-space-6);
      right: var(--io-space-6);
    }

    /* ── Position variants ──────────────────────────────────── */

    :host([data-position="top-start"]) {
      top: var(--io-space-6);
      left: var(--io-space-6);
      bottom: auto;
      right: auto;
    }

    :host([data-position="top-center"]) {
      top: var(--io-space-6);
      left: 50%;
      transform: translateX(-50%);
      bottom: auto;
      right: auto;
    }

    :host([data-position="top-end"]) {
      top: var(--io-space-6);
      right: var(--io-space-6);
      bottom: auto;
      left: auto;
    }

    :host([data-position="bottom-start"]) {
      bottom: var(--io-space-6);
      left: var(--io-space-6);
      right: auto;
    }

    :host([data-position="bottom-center"]) {
      bottom: var(--io-space-6);
      left: 50%;
      transform: translateX(-50%);
      right: auto;
    }

    :host([data-position="bottom-end"]) {
      bottom: var(--io-space-6);
      right: var(--io-space-6);
      left: auto;
    }

    /* ── Mobile override — full-width strip at the bottom ───── */

    @media (max-width: 480px) {
      :host {
        left: var(--io-space-4) !important;
        right: var(--io-space-4) !important;
        bottom: var(--io-space-4) !important;
        top: auto !important;
        width: auto !important;
        transform: none !important;
      }
    }
  `;
}
