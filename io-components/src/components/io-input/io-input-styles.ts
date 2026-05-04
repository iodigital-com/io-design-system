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

    /* Hide slot containers when no nodes are assigned (set via @State hasPrefix/hasSuffix) */
    .input-slot:not(:has(slot[name] ~ *)):empty {
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
      padding: var(--io-input-padding-y) var(--io-input-padding-right) var(--io-input-padding-y) 0;
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
      margin-top: -2px;
    }

    .input-field:focus-visible {
      outline: none;
      box-shadow: none;
    }

    .input-wrapper--error .input-field {
      border-bottom-color: var(--io-border-error);
    }

    .input-error-icon {
      position: absolute;
      bottom: var(--io-space-4);
      right: 0;
      pointer-events: none;
      color: var(--io-color-error);
      display: flex;
      align-items: center;
    }

    .input-error {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-color-error);
    }

    .input-helper {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    @media (prefers-reduced-motion: reduce) {
      .input-field,
      .input-label { transition: none; }
    }
  `;
}
