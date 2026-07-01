export function getInputStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* io brand: underline-only field - no box, no radius, no fill */
    .input-wrapper {
      position: relative;
      padding-top: var(--io-space-6);
    }

    .input-wrapper--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    .input-wrapper--loading {
      pointer-events: none;
    }

    /* Loading spinner slot — replaces suffix slot content */
    .input-slot--loading {
      display: flex;
      align-items: center;
    }

    /* Readonly: full opacity, still tabbable, cursor indicates non-editable */
    .input-wrapper--readonly .input-field {
      cursor: default;
      border-bottom-style: dashed;
    }

    /* Flex row wrapping prefix slot, input, suffix slot, and error icon */
    .input-field-row {
      position: relative;
      display: flex;
      align-items: center;
      gap: var(--io-space-2);
    }

    /* Prefix / suffix slot containers — zero-width when empty, expand when slotted */
    .input-slot {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      color: var(--io-text-secondary);
    }

    /* Hide slot containers when no nodes are assigned — driven by @State hasPrefix/hasSuffix */
    .input-slot--hidden {
      display: none;
    }

    /* Token-driven padding added to input when a slot is populated */
    .input-field--has-prefix {
      padding-left: var(--io-space-2);
    }

    .input-field--has-suffix {
      padding-right: var(--io-space-2);
    }

    /* Label: absolutely positioned over the padding-top area; floats up on value */
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

    /* Float label when input has a value.
       Using :has() because the input is now nested inside .input-field-row
       and can't use the sibling combinator (~) to reach .input-label.
       :has() baseline 2023 — supported in all modern browsers. */
    .input-wrapper:has(.input-field:not(:placeholder-shown)) .input-label,
    .input-wrapper:has(.input-field:focus) .input-label {
      top: 0;
      font-size: var(--io-label-font-size-float);
    }

    /* Visually hide label while keeping it accessible to screen readers */
    .input-label--sr-only {
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
    :host([hide-label]) .input-wrapper {
      padding-top: 0;
    }

    .input-required {
      color: var(--io-color-error);
    }

    /* Border lives on the input itself, matching the source */
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
      border-bottom-width: var(--io-input-border-error-width);
    }

    .input-wrapper--state-success .input-field {
      border-bottom-color: var(--io-color-state-success);
    }

    .input-wrapper--state-warning .input-field {
      border-bottom-color: var(--io-color-state-warning);
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

    .input-counter {
      display: flex;
      justify-content: flex-end;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
      margin-top: var(--io-space-1);
    }

    /* Visually hidden sr-only live region for counter — announced by screen readers */
    .input-counter-sr {
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

    .input-wrapper__loading {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .input-field,
      .input-label { transition: none; }
    }

    /* ── Stepper variant (type=number) ──────────────────────────── */

    /* Hide native browser spin buttons when stepper prop is used */
    :host([stepper]) .input-field {
      -moz-appearance: textfield;
      appearance: textfield;
    }

    :host([stepper]) .input-field::-webkit-inner-spin-button,
    :host([stepper]) .input-field::-webkit-outer-spin-button {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }

    .input-stepper {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      gap: 0;
    }

    .input-stepper__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-space-5);
      height: var(--io-space-3);
      padding: 0;
      border: none;
      background: transparent;
      color: var(--io-text-secondary);
      cursor: pointer;
      transition: color var(--io-motion-fast);
    }

    .input-stepper__btn:hover:not(:disabled) {
      color: var(--io-text-primary);
    }

    .input-stepper__btn:disabled {
      opacity: var(--io-state-disabled-opacity);
      cursor: not-allowed;
    }

    /* ── Indicator icon ─────────────────────────────────────────── */

    .input-indicator-icon {
      flex-shrink: 0;
      color: var(--io-text-secondary);
    }

    /* ── Compact variant ─────────────────────────────────────── */

    /* Compact: reduces field height and vertical padding for dense layouts.
       Uses the compact density token (--io-space-1 = 4px) to override the default
       (--io-spacing-component-y = 8px) without relying on the global density selector. */
    :host([compact]) .input-field {
      padding-top: var(--io-space-1);
      padding-bottom: var(--io-space-1);
    }

    :host([compact]) .input-field--sm {
      height: calc(var(--io-size-input-sm) - var(--io-space-2));
    }

    :host([compact]) .input-field--md {
      height: calc(var(--io-size-input-md) - var(--io-space-2));
    }

    :host([compact]) .input-field--lg {
      height: calc(var(--io-size-input-lg) - var(--io-space-2));
    }

    /* ── RTL support ─────────────────────────────────────────── */

    /* Mirror the label anchor: left → right in RTL */
    :host-context([dir="rtl"]) .input-label {
      left: auto;
      right: 0;
    }

    /* Swap prefix padding to right side in RTL (prefix renders on right) */
    :host-context([dir="rtl"]) .input-field--has-prefix {
      padding-left: 0;
      padding-right: var(--io-space-2);
    }

    /* Swap suffix padding to left side in RTL (suffix renders on left) */
    :host-context([dir="rtl"]) .input-field--has-suffix {
      padding-right: 0;
      padding-left: var(--io-space-2);
    }

    /* Mirror error icon position: right → left in RTL */
    :host-context([dir="rtl"]) .input-error-icon {
      right: auto;
      left: 0;
    }

    /* Reverse the flex row so prefix/suffix slots visually swap positions — inherit direction from host context */
    :host-context([dir="rtl"]) .input-field-row {
      direction: inherit;
    }

    /* ============================================================
       FORCED COLORS (issue #1120 — WCAG 1.4.1 / 1.4.11 / 2.4.7)
       ============================================================ */

    @media (forced-colors: active) {
      .input-field {
        border: 1px solid ButtonText;
        color: ButtonText;
        background: Field;
      }

      .input-field:focus,
      .input-field:focus-visible {
        outline: 2px solid Highlight;
        outline-offset: 1px;
        box-shadow: none;
      }

      :host([disabled]) .input-field {
        color: GrayText;
        border-color: GrayText;
      }
    }
  `;
}
