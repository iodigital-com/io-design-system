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

    /* ── Wrapper — io brand: underline-only, floating label ── */

    .textarea-wrapper {
      position: relative;
      padding-top: var(--io-space-6);
    }

    .textarea-wrapper--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    /* ── Label — floats above field when textarea has content ── */

    .textarea-label {
      position: absolute;
      top: var(--io-space-1);
      left: 0;
      font-size: var(--io-label-font-size);
      font-weight: var(--io-label-font-weight);
      color: var(--io-text-secondary);
      pointer-events: none;
      transition: top var(--io-motion-base), font-size var(--io-motion-base);
    }

    /* Float label when textarea has a value (textarea must precede label in DOM) */
    .textarea-field:not(:placeholder-shown) ~ .textarea-label {
      top: 0;
      font-size: var(--io-label-font-size-float);
    }

    .textarea-required {
      color: var(--io-color-error);
    }

    /* ── Textarea field — underline only, no box border ─── */

    .textarea-field {
      display: block;
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: var(--io-input-border-width) solid var(--io-text-primary);
      border-radius: 0;
      padding: var(--io-input-padding-y) var(--io-input-padding-right) var(--io-input-padding-y) 0;
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      line-height: var(--io-line-height-relaxed);
      outline: none;
      box-sizing: border-box;
      transition: border-bottom-width var(--io-motion-fast), margin-top var(--io-motion-fast);
    }

    .textarea-field::placeholder {
      color: transparent;
    }

    .textarea-field:focus {
      border-bottom-width: var(--io-input-border-width-focus);
      margin-top: -2px;
    }

    .textarea-field:focus-visible {
      outline: none;
      box-shadow: none;
    }

    .textarea-wrapper--error .textarea-field {
      border-bottom-color: var(--io-border-error);
    }

    /* Resize variants */
    .textarea-field--resize-none     { resize: none; }
    .textarea-field--resize-vertical { resize: vertical; }
    .textarea-field--resize-auto     { resize: none; overflow: hidden; }

    /* ── Helper / error ─────────────────────────────────── */

    .textarea-error {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-color-error);
    }

    .textarea-helper {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    @media (prefers-reduced-motion: reduce) {
      .textarea-field,
      .textarea-label { transition: none; }
    }
  `;
}
