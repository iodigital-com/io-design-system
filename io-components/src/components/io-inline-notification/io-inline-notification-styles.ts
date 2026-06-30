import type { IoInlineNotificationVariant } from './types';

const VARIANT_BG: Record<IoInlineNotificationVariant, string> = {
  info:    'var(--io-color-info-soft)',
  success: 'var(--io-color-success-soft)',
  warning: 'var(--io-color-warning-soft)',
  error:   'var(--io-color-error-soft)',
};

export function getInlineNotificationStyles(variant: IoInlineNotificationVariant): string {
  const bgColor = VARIANT_BG[variant];

  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    .inline-notification {
      display: flex;
      align-items: flex-start;
      gap: var(--io-space-3);
      padding: var(--io-space-4);

      background: ${bgColor};
      border: 1px solid transparent;
      border-radius: var(--io-border-radius-sm);

      font-size: var(--io-font-size-sm);
      line-height: var(--io-line-height-normal);
      color: var(--io-text-primary);
    }

    .inline-notification__icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-icon-size-md);
      height: var(--io-icon-size-md);
      color: var(--inline-notification-icon-color);
    }

    .inline-notification__body {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--io-space-1);
    }

    .inline-notification__heading {
      display: block;
      font-weight: var(--io-font-weight-semibold);
      color: var(--io-text-primary);
    }

    .inline-notification__heading--hidden {
      display: none;
    }

    .inline-notification__content {
      color: var(--io-text-primary);
    }

    .inline-notification__content--empty {
      display: none;
    }

    .inline-notification__actions {
      display: flex;
      align-items: center;
      gap: var(--io-space-2);
      margin-top: var(--io-space-1);
    }

    /* Variants — set border accent + icon color only */
    .inline-notification--info {
      border-color: var(--io-color-info);
      --inline-notification-icon-color: var(--io-color-info);
    }

    .inline-notification--success {
      border-color: var(--io-color-success);
      --inline-notification-icon-color: var(--io-color-success);
    }

    .inline-notification--warning {
      border-color: var(--io-color-warning);
      --inline-notification-icon-color: var(--io-color-warning);
    }

    .inline-notification--error {
      border-color: var(--io-color-error);
      --inline-notification-icon-color: var(--io-color-error);
    }
  `;
}
