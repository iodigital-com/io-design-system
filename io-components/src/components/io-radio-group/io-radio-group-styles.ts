/**
 * io-radio-group CSS-in-JS style generator.
 *
 * Returns a <style> string for the radio-group component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getRadioGroupStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Wrapper ────────────────────────────────────────────── */

    .radio-group__wrapper {
      position: relative;
    }

    /* ── Fieldset reset ─────────────────────────────────────── */

    .radio-group {
      border: none;
      margin: 0;
      padding: 0;
    }

    .radio-group:disabled,
    :host([disabled]) .radio-group {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    /* ── Legend ─────────────────────────────────────────────── */

    .radio-group__legend {
      display: block;
      font-size: var(--io-font-size-sm, 14px);
      font-weight: var(--io-font-weight-medium, 500);
      color: var(--io-text-primary);
      line-height: var(--io-line-height-normal);
      margin-bottom: var(--io-space-1, 4px);
      padding: 0;
    }

    /* ── Helper text ────────────────────────────────────────── */

    .radio-group__helper {
      display: block;
      font-size: var(--io-font-size-xs, 12px);
      color: var(--io-text-secondary);
      line-height: var(--io-line-height-normal);
      margin-bottom: var(--io-space-2, 8px);
    }

    /* ── Options container ──────────────────────────────────── */

    .radio-group__options {
      display: flex;
      flex-direction: column;
      gap: var(--io-space-1, 4px);
    }

    :host([orientation='horizontal']) .radio-group__options {
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--io-space-4, 16px);
    }

    /* ── Loading overlay ────────────────────────────────────── */

    .radio-group__loading-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--io-overlay-loading-bg);
      border-radius: var(--io-border-radius-sm);
    }

    /* ── Error state ────────────────────────────────────────── */

    .radio-group--error .radio-group__legend {
      color: var(--io-color-error);
    }

    /* ── Error message ──────────────────────────────────────── */

    .radio-group__error {
      display: block;
      font-size: var(--io-font-size-xs, 12px);
      color: var(--io-color-error);
      line-height: var(--io-line-height-normal);
      margin-top: var(--io-space-1, 4px);
    }
  `;
}
