/**
 * io-form-field CSS-in-JS style generator.
 *
 * Returns a <style> string for the form-field component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getFormFieldStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: var(--io-space-1, 4px);
    }

    /* ── Label ──────────────────────────────────────────────── */

    .form-field__label {
      display: block;
      font-size: var(--io-font-size-sm, 14px);
      font-weight: var(--io-font-weight-medium, 500);
      color: var(--io-text-primary);
      line-height: var(--io-line-height-normal);
    }

    .form-field__label--required::after {
      content: ' *';
      color: var(--io-color-error);
    }

    /* ── Control slot ───────────────────────────────────────── */

    .form-field__control {
      display: block;
    }

    /* ── Helper / message ────────────────────────────── */

    .form-field__helper {
      display: block;
      margin-top: var(--io-space-1, 4px);
      font-size: var(--io-font-size-xs, 12px);
      color: var(--io-text-secondary);
      line-height: var(--io-line-height-normal);
    }

    .form-field__message {
      display: block;
      margin-top: var(--io-space-1, 4px);
      font-size: var(--io-font-size-xs, 12px);
      line-height: var(--io-line-height-normal);
    }

    .form-field__message--error {
      color: var(--io-color-state-error);
    }

    .form-field__message--success {
      color: var(--io-color-state-success);
    }

    .form-field__message--warning {
      color: var(--io-color-state-warning);
    }
  `;
}
