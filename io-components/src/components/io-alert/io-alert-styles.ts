export function getAlertStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    .alert {
      display: flex;
      align-items: flex-start;
      gap: var(--io-space-3);
      padding: var(--io-space-4);
      border-radius: var(--io-border-radius-sm);
      border: 1px solid transparent;
      font-size: var(--io-font-size-sm);
      line-height: var(--io-line-height-normal);
    }

    .alert__icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin-top: 1px;
    }

    .alert__icon svg {
      width: 20px;
      height: 20px;
    }

    .alert__body {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--io-space-1);
    }

    .alert__heading {
      display: block;
      font-weight: var(--io-font-weight-semibold);
      color: inherit;
    }

    .alert__content {
      color: inherit;
    }

    .alert__dismiss {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: var(--io-touch-target-min);
      min-height: var(--io-touch-target-min);
      padding: 0;
      background: transparent;
      border: none;
      border-radius: var(--io-border-radius-sm);
      cursor: pointer;
      color: inherit;
      opacity: 0.7;
      transition: opacity var(--io-motion-fast), background-color var(--io-motion-fast);
      margin-top: -2px;
    }

    .alert__dismiss:hover {
      opacity: 1;
      background-color: color-mix(in srgb, currentColor 10%, transparent);
    }

    .alert__dismiss:focus-visible {
      box-shadow: var(--io-focus-ring-active);
      outline: none;
    }

    .alert__dismiss svg {
      width: 16px;
      height: 16px;
      pointer-events: none;
    }

    /* Variant: info */
    .alert--info {
      background-color: var(--io-color-info-soft);
      color: var(--io-color-info);
      border-color: color-mix(in srgb, var(--io-color-info) 30%, transparent);
    }

    /* Variant: success */
    .alert--success {
      background-color: var(--io-color-success-soft);
      color: var(--io-color-success);
      border-color: color-mix(in srgb, var(--io-color-success) 30%, transparent);
    }

    /* Variant: warning */
    .alert--warning {
      background-color: var(--io-color-warning-soft);
      color: var(--io-color-warning);
      border-color: color-mix(in srgb, var(--io-color-warning) 30%, transparent);
    }

    /* Variant: error */
    .alert--error {
      background-color: var(--io-color-error-soft);
      color: var(--io-color-error);
      border-color: color-mix(in srgb, var(--io-color-error) 30%, transparent);
    }

    @media (prefers-reduced-motion: reduce) {
      .alert__dismiss { transition: none; }
    }
  `;
}
