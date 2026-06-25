import type { IoToastVariant } from '../io-toast/types';

const VARIANT_BG: Record<IoToastVariant, string> = {
  neutral: 'var(--io-bg-card)',
  success: 'var(--io-color-success-soft)',
  error:   'var(--io-color-error-soft)',
  warning: 'var(--io-color-warning-soft)',
  info:    'var(--io-color-info-soft)',
};

const VARIANT_ICON: Record<IoToastVariant, string> = {
  neutral: 'var(--io-text-secondary)',
  success: 'var(--io-color-success)',
  error:   'var(--io-color-error)',
  warning: 'var(--io-color-warning)',
  info:    'var(--io-color-info)',
};

export function getToastItemStyles(variant: IoToastVariant): string {
  const bgColor = VARIANT_BG[variant];
  const iconColor = VARIANT_ICON[variant];

  return `
    :host {
      display: block;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: var(--io-space-3);
      padding: var(--io-space-4);
      background: ${bgColor};
      backdrop-filter: blur(var(--io-toast-item-blur, 12px));
      -webkit-backdrop-filter: blur(var(--io-toast-item-blur, 12px));
      border-radius: var(--io-border-radius-sm);
      box-shadow: var(--io-shadow-lg);
      color: var(--io-text-primary);
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      line-height: var(--io-line-height-normal);
      animation: io-toast-in var(--io-toast-item-enter-duration) var(--io-motion-easing-ease-out) both;
    }

    .toast__icon {
      flex-shrink: 0;
      color: ${iconColor};
      margin-top: var(--io-toast-item-icon-offset-top);
    }

    .toast__text {
      flex: 1;
      color: var(--io-text-primary);
    }

    .toast__action {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      border: none;
      background: transparent;
      color: var(--io-color-primary);
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      font-weight: var(--io-font-weight-semibold);
      line-height: var(--io-line-height-normal);
      text-decoration: underline;
      cursor: pointer;
      padding: 0;
      border-radius: var(--io-border-radius-sm);
      transition: color var(--io-motion-fast);
    }

    .toast__action:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    @media (hover: hover) and (pointer: fine) {
      .toast__action:hover {
        color: var(--io-color-primary-hover, var(--io-color-primary));
        text-decoration: none;
      }
    }

    .toast__close {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-toast-item-close-size);
      height: var(--io-toast-item-close-size);
      min-width: var(--io-touch-target-min);
      min-height: var(--io-touch-target-min);
      border: none;
      background: transparent;
      color: var(--io-text-secondary);
      border-radius: var(--io-border-radius-sm);
      cursor: pointer;
      padding: 0;
      margin-top: var(--io-toast-item-close-offset-top);
      transition: color var(--io-motion-fast), background-color var(--io-motion-fast);
    }

    .toast__close:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    @keyframes io-toast-in {
      from {
        opacity: 0;
        transform: translateX(calc(100% + var(--io-space-6)));
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @media (hover: hover) and (pointer: fine) {
      .toast__close:hover {
        color: var(--io-text-primary);
        background-color: var(--io-state-hover);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .toast {
        animation: none;
      }
    }
  `;
}
