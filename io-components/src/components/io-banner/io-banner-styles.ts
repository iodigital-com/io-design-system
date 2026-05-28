export function getBannerStyles(): string {
  return `
    :host {
      display: none;
      font-family: var(--io-font-primary);
      width: 100%;
    }

    :host([open]) {
      display: block;
    }

    .banner {
      display: flex;
      align-items: flex-start;
      gap: var(--io-space-3);
      padding: var(--io-space-4) var(--io-space-4);
      border-left: 4px solid transparent;
      font-size: var(--io-font-size-sm);
      line-height: var(--io-line-height-normal);
      width: 100%;
      box-sizing: border-box;
    }

    .banner__icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin-top: 1px;
    }

    .banner__icon svg {
      width: 20px;
      height: 20px;
    }

    .banner__body {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--io-space-1);
    }

    .banner__heading {
      display: block;
      font-weight: var(--io-font-weight-semibold);
      color: inherit;
    }

    .banner__content {
      color: inherit;
    }

    .banner__dismiss {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-touch-target-min);
      height: var(--io-touch-target-min);
      min-width: var(--io-touch-target-min);
      min-height: var(--io-touch-target-min);
      padding: 0;
      background: transparent;
      border: none;
      cursor: pointer;
      color: inherit;
      opacity: 0.7;
      transition: opacity var(--io-motion-fast), background-color var(--io-motion-fast);
      margin-top: -2px;
    }

    .banner__dismiss:hover {
      opacity: 1;
      background-color: color-mix(in srgb, currentColor 10%, transparent);
    }

    .banner__dismiss:focus-visible {
      box-shadow: var(--io-focus-ring-active);
      outline: none;
    }

    .banner__dismiss svg {
      width: 16px;
      height: 16px;
      pointer-events: none;
    }

    /* Variant: info */
    .banner--info {
      background-color: var(--io-color-info-soft);
      color: var(--io-color-info);
      border-color: var(--io-color-info);
    }

    /* Variant: success */
    .banner--success {
      background-color: var(--io-color-success-soft);
      color: var(--io-color-success);
      border-color: var(--io-color-success);
    }

    /* Variant: warning */
    .banner--warning {
      background-color: var(--io-color-warning-soft);
      color: var(--io-color-warning);
      border-color: var(--io-color-warning);
    }

    /* Variant: error */
    .banner--error {
      background-color: var(--io-color-error-soft);
      color: var(--io-color-error);
      border-color: var(--io-color-error);
    }

    @media (prefers-reduced-motion: reduce) {
      .banner__dismiss { transition: none; }
    }
  `;
}
