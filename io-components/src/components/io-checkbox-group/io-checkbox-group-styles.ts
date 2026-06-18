/**
 * io-checkbox-group CSS-in-JS style generator.
 *
 * Returns a <style> string for the checkbox-group component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getCheckboxGroupStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Fieldset reset ─────────────────────────────────────── */

    .checkbox-group {
      border: none;
      margin: 0;
      padding: 0;
    }

    .checkbox-group:disabled,
    :host([disabled]) .checkbox-group {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    /* ── Legend ─────────────────────────────────────────────── */

    .checkbox-group__legend {
      display: block;
      font-size: var(--io-font-size-sm);
      font-weight: var(--io-font-weight-medium);
      color: var(--io-text-primary);
      line-height: var(--io-line-height-normal);
      margin-bottom: var(--io-space-1);
      padding: 0;
    }

    /* ── Helper text ────────────────────────────────────────── */

    .checkbox-group__helper {
      display: block;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
      line-height: var(--io-line-height-normal);
      margin-bottom: var(--io-space-2);
    }

    /* ── Options container ──────────────────────────────────── */

    .checkbox-group__options {
      display: flex;
      flex-direction: column;
      gap: var(--io-space-1);
    }

    /* ── Required indicator ─────────────────────────────────── */

    .checkbox-group__required {
      color: var(--io-color-error);
      margin-inline-start: var(--io-space-1);
    }

    /* ── Error state ────────────────────────────────────────── */

    .checkbox-group--error .checkbox-group__legend {
      color: var(--io-color-error);
    }

    /* ── Error message ──────────────────────────────────────── */

    .checkbox-group__error {
      display: block;
      font-size: var(--io-font-size-xs);
      color: var(--io-color-error);
      line-height: var(--io-line-height-normal);
      margin-top: var(--io-space-1);
    }
  `;
}
