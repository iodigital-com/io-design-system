/**
 * io-textarea CSS-in-JS style generator.
 *
 * Returns a <style> string for the textarea component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * GOVERNANCE: Do not hardcode colors, spacing, or radii here.
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

    /* Readonly: full opacity, still tabbable, cursor indicates non-editable */
    .textarea-wrapper--readonly .textarea-field {
      cursor: default;
      border-bottom-style: dashed;
    }

    /* Loading spinner positioned in bottom-right of wrapper */
    .textarea-wrapper__loading {
      position: absolute;
      bottom: var(--io-space-2);
      right: 0;
      display: flex;
      align-items: center;
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

    /* Visually hide label while keeping it accessible to screen readers */
    .textarea-label--sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    /* Collapse the label space entirely when hideLabel=true */
    :host([hide-label]) .textarea-wrapper {
      padding-top: 0;
    }

    .io-required {
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

    .textarea-field--sm {
      min-height: var(--io-size-input-sm);
      font-size: var(--io-font-size-xs);
      line-height: var(--io-line-height-base);
      padding-top: var(--io-space-1);
      padding-bottom: var(--io-space-1);
    }

    .textarea-field--md {
      min-height: var(--io-size-input-md);
      font-size: var(--io-font-size-sm);
      line-height: var(--io-line-height-relaxed);
    }

    .textarea-field--lg {
      min-height: var(--io-size-input-lg);
      font-size: var(--io-font-size-base);
      line-height: var(--io-line-height-relaxed);
      padding-top: var(--io-space-3);
      padding-bottom: var(--io-space-3);
    }

    .textarea-field::placeholder {
      color: transparent;
    }

    .textarea-field:focus {
      border-bottom-width: var(--io-input-border-width-focus);
      margin-top: var(--io-field-focus-offset-y);
    }

    .textarea-field:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    .textarea-wrapper--state-error .textarea-field {
      border-bottom-color: var(--io-border-error);
      border-bottom-width: var(--io-textarea-border-error-width);
    }

    .textarea-wrapper--state-success .textarea-field {
      border-bottom-color: var(--io-color-state-success);
    }

    .textarea-wrapper--state-warning .textarea-field {
      border-bottom-color: var(--io-color-state-warning);
    }

    /* Resize variants */
    .textarea-field--resize-none       { resize: none; }
    .textarea-field--resize-vertical   { resize: vertical; }
    .textarea-field--resize-horizontal { resize: horizontal; }
    .textarea-field--resize-both       { resize: both; }
    .textarea-field--resize-auto       { resize: none; overflow: hidden; }

    /* ── Helper / state messages ─────────────────────────── */

    .textarea-message {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
    }

    .textarea-message--error {
      color: var(--io-color-state-error, var(--io-color-error));
    }

    .textarea-message--success {
      color: var(--io-color-state-success);
    }

    .textarea-message--warning {
      color: var(--io-color-state-warning);
    }

    .textarea-error--hidden,
    .textarea-message--hidden {
      display: none;
    }

    .textarea-helper {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    .textarea-helper--hidden {
      display: none;
    }

    .textarea-description {
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
      margin: var(--io-space-1) 0 0;
    }

    .textarea-label__slot--hidden,
    .textarea-message__slot--hidden,
    .textarea-description__slot--hidden {
      display: none;
    }

    .textarea-counter {
      display: flex;
      justify-content: flex-end;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
      margin-top: var(--io-space-1);
    }

    .textarea-counter-sr {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .textarea-field,
      .textarea-label { transition: none; }
    }

    /* ── Forced Colors (High Contrast Mode) ─────────────────────
       In HCM the browser strips custom colors so error/success/warning
       state changes (border-color only) become invisible. */
    @media (forced-colors: active) {
      /* Error: thick Highlight outline */
      .textarea-wrapper--state-error .textarea-field {
        outline: 2px solid Highlight;
        outline-offset: 2px;
        border-bottom-color: Highlight;
      }

      /* Disabled: GrayText + full opacity */
      .textarea-wrapper--disabled {
        opacity: 1;
      }
      .textarea-wrapper--disabled .textarea-field {
        border-bottom-color: GrayText;
        color: GrayText;
      }
    }
  `;
}
