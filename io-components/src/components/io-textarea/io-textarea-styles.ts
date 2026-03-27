/**
 * io-textarea CSS-in-JS style generator.
 *
 * Returns a <style> string for the textarea component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getTextareaStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Wrapper ────────────────────────────────────────── */

    .textarea-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--io-space-1);
    }

    .textarea-wrapper--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    /* ── Label ──────────────────────────────────────────── */

    .textarea-label {
      font-size: var(--io-label-font-size);
      font-weight: var(--io-label-font-weight);
      color: var(--io-text-secondary);
    }

    .textarea-required {
      color: var(--io-color-error);
    }

    /* ── Textarea field ─────────────────────────────────── */

    .textarea-field {
      width: 100%;
      background: transparent;
      border: var(--io-input-border-width) solid var(--io-border);
      border-radius: var(--io-border-radius-sm);
      padding: var(--io-space-3) var(--io-space-4);
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      line-height: var(--io-line-height-relaxed);
      outline: none;
      box-sizing: border-box;
      transition: border-color var(--io-motion-fast), box-shadow var(--io-motion-fast);
    }

    .textarea-field::placeholder {
      color: var(--io-text-secondary);
    }

    .textarea-field:focus {
      border-color: var(--io-border-focus);
    }

    .textarea-field:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    .textarea-wrapper--error .textarea-field {
      border-color: var(--io-border-error);
    }

    .textarea-wrapper--error .textarea-field:focus-visible {
      border-color: var(--io-border-error);
      box-shadow: var(--io-focus-ring-active);
    }

    /* Resize variants */
    .textarea-field--resize-none     { resize: none; }
    .textarea-field--resize-vertical { resize: vertical; }
    .textarea-field--resize-auto     { resize: none; overflow: hidden; }

    /* ── Helper / error ─────────────────────────────────── */

    .textarea-error {
      margin: 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-color-error);
    }

    .textarea-helper {
      margin: 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    @media (prefers-reduced-motion: reduce) {
      .textarea-field { transition: none; }
    }
  `;
}
