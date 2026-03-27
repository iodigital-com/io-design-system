/**
 * io-select CSS-in-JS style generator.
 *
 * Returns a <style> string for the select component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getSelectStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* io brand: underline-only style — matches io-input */
    .select-wrapper {
      position: relative;
      padding-top: var(--io-space-6);
    }

    .select-wrapper--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    /* Label: absolutely positioned in the padding-top area */
    .select-label {
      position: absolute;
      top: var(--io-space-1);
      left: 0;
      font-size: var(--io-label-font-size);
      font-weight: var(--io-label-font-weight);
      color: var(--io-text-secondary);
      pointer-events: none;
    }

    .select-required {
      color: var(--io-color-error);
    }

    /* Native select — appearance reset, underline border */
    .select-field {
      display: block;
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: var(--io-input-border-width) solid var(--io-text-primary);
      border-radius: 0;
      padding: var(--io-input-padding-y) var(--io-select-padding-right) var(--io-input-padding-y) 0;
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      cursor: pointer;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
      min-height: var(--io-touch-target-min);
      transition: border-bottom-width var(--io-motion-fast), margin-top var(--io-motion-fast);
    }

    .select-field:focus {
      border-bottom-width: var(--io-input-border-width-focus);
      margin-top: -2px;
    }

    .select-field:focus-visible {
      outline: none;
      box-shadow: none;
    }

    .select-wrapper--error .select-field {
      border-bottom-color: var(--io-border-error);
    }

    /* Chevron icon */
    .select-chevron {
      position: absolute;
      bottom: calc(var(--io-input-padding-y) + 2px);
      right: 0;
      pointer-events: none;
      color: var(--io-text-secondary);
      display: flex;
      align-items: center;
    }

    /* ── Helper / error ─────────────────────────────────── */

    .select-error {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-color-error);
    }

    .select-helper {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    @media (prefers-reduced-motion: reduce) {
      .select-field { transition: none; }
    }
  `;
}
