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

    /* Hide slotted io-option and io-optgroup — they are parsed as data in
       componentDidLoad and re-rendered as internal option/group elements */
    ::slotted(io-option),
    ::slotted(io-optgroup) {
      display: none !important;
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

    .select-field--sm {
      height: var(--io-size-input-sm);
      min-height: var(--io-size-input-sm);
      font-size: var(--io-font-size-xs);
    }

    .select-field--md {
      height: var(--io-size-input-md);
      min-height: var(--io-size-input-md);
    }

    .select-field--lg {
      height: var(--io-size-input-lg);
      min-height: var(--io-size-input-lg);
      font-size: var(--io-font-size-base);
    }

    .select-field:focus {
      border-bottom-width: var(--io-input-border-width-focus);
      margin-top: var(--io-field-focus-offset-y);
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
      bottom: calc(var(--io-input-padding-y) + var(--io-select-chevron-offset-y));
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

    /* ── Combobox (custom mode) ──────────────────────────── */

    .select-wrapper--custom {
      position: relative;
    }

    .combobox-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      text-align: left;
      min-height: var(--io-touch-target-min);
      transition: border-bottom-width var(--io-motion-fast);
    }

    .combobox-trigger--sm { height: var(--io-size-input-sm); font-size: var(--io-font-size-xs); }
    .combobox-trigger--md { height: var(--io-size-input-md); }
    .combobox-trigger--lg { height: var(--io-size-input-lg); font-size: var(--io-font-size-base); }

    .combobox-trigger:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    .combobox-trigger[aria-expanded="true"] {
      border-bottom-width: var(--io-input-border-width-focus);
    }

    .combobox-trigger__text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .combobox-trigger__placeholder {
      color: var(--io-text-secondary);
    }

    .combobox-trigger__chevron {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      color: var(--io-text-secondary);
      transition: transform var(--io-motion-fast);
    }

    .combobox-trigger[aria-expanded="true"] .combobox-trigger__chevron {
      transform: rotate(180deg);
    }

    .combobox-dropdown {
      display: none;
      position: absolute;
      z-index: var(--io-combobox-z);
      background: var(--io-surface-elevated, var(--io-color-white));
      border: var(--io-input-border-width) solid var(--io-border);
      border-radius: var(--io-border-radius-sm);
      box-shadow: var(--io-shadow-md);
      overflow: hidden;
    }

    .combobox-dropdown[data-open="true"] {
      display: block;
    }

    .combobox-listbox {
      list-style: none;
      margin: 0;
      padding: var(--io-space-1) 0;
      max-height: var(--io-combobox-max-height);
      overflow-y: auto;
    }

    .combobox-filter {
      padding: var(--io-space-2) var(--io-space-3);
      border-bottom: var(--io-input-border-width) solid var(--io-border);
    }

    .combobox-filter__input {
      width: 100%;
      box-sizing: border-box;
      border: none;
      border-bottom: var(--io-input-border-width) solid var(--io-border);
      padding: var(--io-space-1) 0;
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      background: transparent;
      outline: none;
      min-height: var(--io-combobox-filter-height);
    }

    .combobox-filter__input:focus {
      border-bottom-color: var(--io-border-focus);
    }

    .combobox-empty {
      list-style: none;
      padding: var(--io-space-3);
      color: var(--io-text-secondary);
      font-size: var(--io-font-size-sm);
      font-style: italic;
    }

    /* ── Option items (rendered as <li> in shadow DOM) ────── */

    .combobox-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--io-space-2);
      min-height: var(--io-combobox-option-height);
      padding: var(--io-space-2) var(--io-space-3);
      cursor: pointer;
      color: var(--io-text-primary);
      font-size: var(--io-font-size-sm);
      list-style: none;
      transition: background-color var(--io-motion-fast), color var(--io-motion-fast);
    }

    .combobox-option--focused,
    .combobox-option:hover {
      background-color: var(--io-color-grey-1);
    }

    .combobox-option--selected {
      color: var(--io-color-primary);
      font-weight: var(--io-font-weight-semibold);
    }

    .combobox-option--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
      cursor: default;
    }

    .combobox-option--multiple {
      justify-content: flex-start;
      gap: var(--io-space-3);
    }

    .combobox-option__label {
      flex: 1;
    }

    .combobox-option__check {
      flex-shrink: 0;
      display: flex;
      color: var(--io-color-primary);
    }

    .combobox-option__checkbox {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      border: var(--io-checkbox-border-width) solid var(--io-border);
      border-radius: var(--io-border-radius-xs);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color var(--io-motion-fast), border-color var(--io-motion-fast);
    }

    .combobox-option--selected .combobox-option__checkbox {
      background-color: var(--io-color-primary);
      border-color: var(--io-color-primary);
    }

    @media (prefers-reduced-motion: reduce) {
      .select-field { transition: none; }
      .combobox-trigger,
      .combobox-trigger__chevron { transition: none; }
      .combobox-option,
      .combobox-option__checkbox { transition: none; }
    }
  `;
}
