import type { IoToastVariant } from '../io-toast/types';

const VARIANT_COLORS: Record<IoToastVariant, string> = {
  neutral: 'var(--io-border)',
  success: 'var(--io-color-success)',
  error:   'var(--io-color-error)',
  warning: 'var(--io-color-warning)',
  info:    'var(--io-color-primary)',
};

export function getToastItemStyles(variant: IoToastVariant): string {
  const accentColor = VARIANT_COLORS[variant];

  return `
    :host {
      display: block;
    }

    .toast {
      display: flex;
      align-items: flex-start;
      gap: var(--io-space-3);
      padding: var(--io-space-4);
      background: var(--io-bg-card);
      border: 1px solid var(--io-border);
      border-left: 4px solid ${accentColor};
      border-radius: var(--io-border-radius-sm);
      box-shadow: var(--io-shadow-lg);
      color: var(--io-text-primary);
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      line-height: var(--io-line-height-normal);
      animation: io-toast-in 250ms var(--io-motion-easing-ease-out) both;
    }

    .toast__icon {
      flex-shrink: 0;
      color: ${accentColor};
      margin-top: 1px;
    }

    .toast__text {
      flex: 1;
      color: var(--io-text-primary);
    }

    .toast__close {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border: none;
      background: transparent;
      color: var(--io-text-secondary);
      border-radius: var(--io-border-radius-sm);
      cursor: pointer;
      padding: 0;
      margin-top: -2px;
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
