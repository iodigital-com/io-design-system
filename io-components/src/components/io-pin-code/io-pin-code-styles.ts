/**
 * io-pin-code CSS-in-JS style generator.
 *
 * Returns a <style> string for the pin-code component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * Token classification:
 *   --io-pin-code-slot-size          public-api
 *   --io-pin-code-slot-radius        public-api
 *   --io-pin-code-slot-border-width  public-api
 *   --io-pin-code-gap                public-api
 *   --io-pin-code-font-size          public-api
 */
export function getPinCodeStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    :host([disabled]) {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    /* ── Label ──────────────────────────────────────────── */

    .pin-code__label {
      display: block;
      font-size: var(--io-label-font-size, var(--io-font-size-sm));
      font-weight: var(--io-label-font-weight, 500);
      color: var(--io-text-secondary);
      margin-bottom: var(--io-space-2);
    }

    .pin-code__required {
      color: var(--io-color-error);
    }

    /* ── Digit slot row ─────────────────────────────────── */

    .pin-code__slots {
      display: flex;
      gap: var(--io-pin-code-gap, var(--io-space-2));
      align-items: center;
    }

    /* ── Individual digit input ──────────────────────────── */

    .pin-code__slot {
      width: var(--io-pin-code-slot-size, 3rem);
      height: var(--io-pin-code-slot-size, 3rem);
      min-width: var(--io-touch-target-min);
      min-height: var(--io-touch-target-min);
      text-align: center;
      font-family: var(--io-font-primary);
      font-size: var(--io-pin-code-font-size, var(--io-font-size-xl));
      font-weight: 600;
      color: var(--io-text-primary);
      background: transparent;
      border: var(--io-pin-code-slot-border-width, 1.5px) solid var(--io-border-interactive);
      border-radius: var(--io-pin-code-slot-radius, var(--io-border-radius-sm));
      outline: none;
      cursor: text;
      caret-color: var(--io-color-primary);
      transition: border-color var(--io-motion-fast), border-width var(--io-motion-fast);
      box-sizing: border-box;
      padding: 0;
    }

    /* Focus state */
    .pin-code__slot:focus {
      border-color: var(--io-color-primary);
      border-width: 2px;
      box-shadow: var(--io-focus-ring-active);
    }

    /* Filled state */
    .pin-code__slot--filled {
      border-color: var(--io-text-primary);
    }

    /* Error state */
    .pin-code__slot--error {
      border-color: var(--io-border-error);
      border-width: var(--io-pin-code-slot-border-error-width, 2px);
    }

    /* Success state */
    .pin-code__slot--success {
      border-color: var(--io-color-success);
    }

    /* Warning state */
    .pin-code__slot--warning {
      border-color: var(--io-color-warning);
    }

    /* ── Message text ────────────────────────────────────── */

    .pin-code__message {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-sm);
      color: var(--io-text-secondary);
      font-family: var(--io-font-primary);
    }

    .pin-code__message--error {
      color: var(--io-color-error);
    }

    .pin-code__message--success {
      color: var(--io-color-success);
    }

    .pin-code__message--warning {
      color: var(--io-color-warning);
    }

    /* Respect prefers-reduced-motion */
    @media (prefers-reduced-motion: reduce) {
      .pin-code__slot {
        transition: none;
      }
    }
  `;
}
