/**
 * io-fieldset CSS-in-JS style generator.
 *
 * Returns a <style> string for the fieldset component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getFieldsetStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Fieldset reset ─────────────────────────────────────── */

    .fieldset {
      border: none;
      margin: 0;
      padding: 0;
    }

    /* ── Legend ─────────────────────────────────────────────── */

    .fieldset__legend {
      display: block;
      font-size: var(--io-font-size-sm);
      font-weight: var(--io-font-weight-medium);
      color: var(--io-fieldset-legend-color);
      line-height: var(--io-line-height-normal);
      margin-bottom: var(--io-space-1);
      padding: 0;
    }

    /* ── Required indicator ─────────────────────────────────── */

    .fieldset__required {
      color: var(--io-color-error);
    }

    /* ── Body / slot wrapper ────────────────────────────────── */

    .fieldset__body {
      display: flex;
      flex-direction: column;
      gap: var(--io-fieldset-gap);
    }

    /* ── Error state: legend color ──────────────────────────── */

    :host([error]) .fieldset__legend {
      color: var(--io-fieldset-error-color);
    }

    /* ── Error message ──────────────────────────────────────── */

    .fieldset__error {
      display: block;
      font-size: var(--io-font-size-xs);
      color: var(--io-fieldset-error-color);
      line-height: var(--io-line-height-normal);
      margin-top: var(--io-space-1);
    }

    /* ── WCAG 1.4.1 — error border non-color indicator ──────── */
    /* Applied to the fieldset element itself when error is set  */

    :host([error]) .fieldset {
      border-left: var(--io-fieldset-border-error-width) solid var(--io-fieldset-error-color);
      padding-left: var(--io-space-2);
    }

    /* ── Windows High Contrast Mode (forced-colors) ─────────── */

    @media (forced-colors: active) {
      .fieldset__error {
        color: ButtonText;
      }

      :host([error]) .fieldset {
        border-left-color: ButtonText;
      }
    }
  `;
}
