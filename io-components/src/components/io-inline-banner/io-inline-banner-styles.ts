export function getInlineBannerStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    .inline-banner {
      display: flex;
      align-items: flex-start;
      gap: var(--io-space-3);
      padding: var(--io-space-4);
      border-radius: var(--io-border-radius-sm);
      border-left: var(--io-space-1) solid transparent;
      font-size: var(--io-font-size-sm);
      line-height: var(--io-line-height-normal);
    }

    .inline-banner__icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-icon-size-md);
      height: var(--io-icon-size-md);
    }

    .inline-banner__icon svg {
      width: var(--io-icon-size-md);
      height: var(--io-icon-size-md);
    }

    .inline-banner__body {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--io-space-1);
    }

    .inline-banner__heading {
      display: block;
      font-weight: var(--io-font-weight-semibold);
      color: inherit;
    }

    .inline-banner__content {
      color: inherit;
    }

    .inline-banner__dismiss {
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

    .inline-banner__dismiss:hover {
      opacity: 1;
      background-color: color-mix(in srgb, currentColor 10%, transparent);
    }

    .inline-banner__dismiss:focus-visible {
      box-shadow: var(--io-focus-ring-active);
      outline: none;
    }

    .inline-banner__dismiss svg {
      width: 16px;
      height: 16px;
      pointer-events: none;
    }

    /* Variant: info */
    .inline-banner--info {
      background-color: var(--io-color-info-soft);
      color: var(--io-color-info);
      border-color: var(--io-color-info);
    }

    /* Variant: success */
    .inline-banner--success {
      background-color: var(--io-color-success-soft);
      color: var(--io-color-success);
      border-color: var(--io-color-success);
    }

    /* Variant: warning */
    .inline-banner--warning {
      background-color: var(--io-color-warning-soft);
      color: var(--io-color-warning);
      border-color: var(--io-color-warning);
    }

    /* Variant: error */
    .inline-banner--error {
      background-color: var(--io-color-error-soft);
      color: var(--io-color-error);
      border-color: var(--io-color-error);
    }

    @media (prefers-reduced-motion: reduce) {
      .inline-banner__dismiss { transition: none; }
    }
  `;
}
