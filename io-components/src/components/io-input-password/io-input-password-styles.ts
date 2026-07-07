import { getSrOnlyStyles } from '../../utils/sr-only';

export function getInputPasswordStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    .input-wrapper {
      position: relative;
      padding-top: var(--io-space-6);
    }

    .input-wrapper--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    .input-field-row {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--io-space-2);
    }

    /* Label: absolutely positioned in the padding-top area */
    .input-label {
      position: absolute;
      top: var(--io-space-1);
      left: 0;
      font-size: var(--io-label-font-size);
      font-weight: var(--io-label-font-weight);
      color: var(--io-text-secondary);
      pointer-events: none;
      transition: top var(--io-motion-base), font-size var(--io-motion-base);
    }

    /* Float label when input has a value or is focused */
    .input-wrapper:has(.input-field:not(:placeholder-shown)) .input-label,
    .input-wrapper:has(.input-field:focus) .input-label {
      top: 0;
      font-size: var(--io-label-font-size-float);
    }

    /* Visually hide label while keeping it accessible */
    .input-label--sr-only {
      ${getSrOnlyStyles()}
    }

    :host([hide-label]) .input-wrapper {
      padding-top: 0;
    }

    .input-required {
      color: var(--io-color-error);
    }

    .input-field {
      display: block;
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: var(--io-input-border-width) solid var(--io-text-primary);
      border-radius: 0;
      padding: var(--io-spacing-component-y) var(--io-input-padding-right) var(--io-spacing-component-y) 0;
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      outline: none;
      box-sizing: border-box;
      min-height: var(--io-touch-target-min);
      transition: border-bottom-width var(--io-motion-fast), margin-top var(--io-motion-fast);
    }

    .input-field--sm {
      height: var(--io-size-input-sm);
      min-height: var(--io-size-input-sm);
      font-size: var(--io-font-size-xs);
    }

    .input-field--md {
      height: var(--io-size-input-md);
      min-height: var(--io-size-input-md);
    }

    .input-field--lg {
      height: var(--io-size-input-lg);
      min-height: var(--io-size-input-lg);
      font-size: var(--io-font-size-base);
    }

    .input-field:focus {
      border-bottom-width: var(--io-input-border-width-focus);
      margin-top: var(--io-field-focus-offset-y);
    }

    .input-field:focus-visible {
      outline: none;
      box-shadow: none;
    }

    .input-wrapper--state-error .input-field {
      border-bottom-color: var(--io-border-error);
      border-bottom-width: var(--io-input-password-border-error-width);
    }

    .input-wrapper--state-success .input-field {
      border-bottom-color: var(--io-color-state-success);
    }

    .input-wrapper--state-warning .input-field {
      border-bottom-color: var(--io-color-state-warning);
    }

    /* Toggle button in suffix position */
    .password-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background: transparent;
      border: none;
      padding: var(--io-space-1);
      cursor: pointer;
      color: var(--io-text-secondary);
      line-height: 0;
      border-radius: var(--io-border-radius-sm);
      transition: color var(--io-motion-base);
      min-width: var(--io-touch-target-min);
      min-height: var(--io-touch-target-min);
    }

    .password-toggle:hover {
      color: var(--io-text-primary);
    }

    .password-toggle:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    .input-state-icon {
      position: absolute;
      bottom: var(--io-space-4);
      right: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
    }

    .input-state-icon--error {
      color: var(--io-color-state-error, var(--io-color-error));
    }

    .input-state-icon--success {
      color: var(--io-color-state-success);
    }

    .input-state-icon--warning {
      color: var(--io-color-state-warning);
    }

    .input-message {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
    }

    .input-message--error {
      color: var(--io-color-state-error, var(--io-color-error));
    }

    .input-message--success {
      color: var(--io-color-state-success);
    }

    .input-message--warning {
      color: var(--io-color-state-warning);
    }

    .input-error--hidden {
      display: none;
    }

    .input-helper {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    .input-helper--hidden {
      display: none;
    }

    .input-label__slot--hidden,
    .input-message__slot--hidden,
    .input-description__slot--hidden {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .input-field,
      .input-label { transition: none; }
    }

    :host-context([dir="rtl"]) .input-label {
      left: auto;
      right: 0;
    }
  `;
}
