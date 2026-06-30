/**
 * io-multi-select CSS-in-JS style generator.
 *
 * Returns a <style> string injected into the Shadow DOM.
 * ALL values reference var(--io-*) — never hardcoded.
 *
 * GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *   Add new tokens to src/global/app.css first, then reference them.
 */
export function getMultiSelectStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* Hide slotted io-option and io-optgroup — parsed as data in componentDidLoad */
    ::slotted(io-option),
    ::slotted(io-optgroup),
    ::slotted(option),
    ::slotted(optgroup) {
      display: none !important;
    }

    /* ── Wrapper ───────────────────────────────────────────────── */

    .multi-select-wrapper {
      position: relative;
      padding-top: var(--io-space-6);
    }

    .multi-select-wrapper--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    /* ── Label ─────────────────────────────────────────────────── */

    .multi-select-label {
      position: absolute;
      top: var(--io-space-1);
      left: 0;
      font-size: var(--io-label-font-size);
      font-weight: var(--io-label-font-weight);
      color: var(--io-text-secondary);
      pointer-events: none;
    }

    .multi-select-required {
      color: var(--io-color-error);
    }

    /* Collapse the label space entirely when hideLabel=true */
    :host([hide-label]) .multi-select-wrapper {
      padding-top: 0;
    }

    /* ── Chips row (selected value chips above the trigger line) ── */

    .multi-select-chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--io-space-1);
      margin-bottom: var(--io-space-1);
      min-height: 0;
    }

    .multi-select-chips:empty {
      display: none;
    }

    .multi-select-chip {
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-1);
      padding: 0 var(--io-space-2);
      height: var(--io-multi-select-chip-height, 24px);
      background: var(--io-color-primary-bg);
      color: var(--io-color-primary);
      border-radius: var(--io-border-radius-pill);
      font-size: var(--io-font-size-xs);
      font-family: var(--io-font-primary);
      font-weight: var(--io-font-weight-medium);
      white-space: nowrap;
      max-width: var(--io-multi-select-chip-max-width, 160px);
    }

    .multi-select-chip__label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .multi-select-chip__remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      /* WCAG 2.5.8: minimum 24x24px touch target */
      min-width: 24px;
      min-height: 24px;
      width: var(--io-multi-select-chip-remove-size, 24px);
      height: var(--io-multi-select-chip-remove-size, 24px);
      padding: 0;
      margin: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--io-color-primary);
      cursor: pointer;
      font-size: var(--io-font-size-xs);
      line-height: 1;
      transition: background-color var(--io-motion-fast);
    }

    .multi-select-chip__remove:hover {
      background: var(--io-color-primary-muted);
    }

    .multi-select-chip__remove:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Trigger row (combobox + optional clear button) ───────── */

    .multi-select-trigger-row {
      display: flex;
      align-items: stretch;
    }

    /* ── Trigger button ────────────────────────────────────────── */

    .multi-select-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      min-width: 0;
      background: transparent;
      border: none;
      border-bottom: var(--io-input-border-width) solid var(--io-text-primary);
      border-radius: 0;
      padding: var(--io-spacing-component-y) var(--io-select-padding-right, 1.6rem) var(--io-spacing-component-y) 0;
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      cursor: pointer;
      text-align: left;
      min-height: var(--io-touch-target-min);
      transition: border-bottom-width var(--io-motion-fast);
    }

    .multi-select-trigger:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    .multi-select-trigger[aria-expanded="true"] {
      border-bottom-width: var(--io-input-border-width-focus);
    }

    .multi-select-wrapper--error .multi-select-trigger {
      border-bottom-color: var(--io-border-error);
      border-bottom-width: var(--io-multi-select-border-error-width);
    }

    .multi-select-wrapper--success .multi-select-trigger {
      border-bottom-color: var(--io-color-success);
    }

    .multi-select-wrapper--warning .multi-select-trigger {
      border-bottom-color: var(--io-color-state-warning);
    }

    .multi-select-wrapper--error .multi-select-trigger__clear {
      border-bottom-color: var(--io-border-error);
    }

    .multi-select-wrapper--success .multi-select-trigger__clear {
      border-bottom-color: var(--io-color-success);
    }

    .multi-select-wrapper--warning .multi-select-trigger__clear {
      border-bottom-color: var(--io-color-state-warning);
    }

    .multi-select-trigger__text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .multi-select-trigger__placeholder {
      color: var(--io-text-secondary);
    }

    /* ── Inline clear button inside trigger (#1111) ──────────── */

    .multi-select-trigger__clear {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      /* WCAG 2.5.8: 44×44 minimum touch target */
      min-width: var(--io-touch-target-min);
      min-height: var(--io-touch-target-min);
      width: var(--io-multi-select-trigger-clear-size, var(--io-touch-target-min));
      height: var(--io-multi-select-trigger-clear-size, var(--io-touch-target-min));
      padding: 0;
      margin: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--io-text-secondary);
      cursor: pointer;
      transition: background-color var(--io-motion-fast), color var(--io-motion-fast);
    }

    .multi-select-trigger__clear:hover {
      background: var(--io-option-hover-bg);
      color: var(--io-text-primary);
    }

    .multi-select-trigger__clear:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Chevron — rotates 180° when open (#1075) ──────────────── */


    .multi-select-trigger__chevron {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      color: var(--io-text-secondary);
      transition: transform var(--io-motion-base);
    }

    .multi-select-trigger[aria-expanded="true"] .multi-select-trigger__chevron {
      transform: rotate(180deg);
    }

    /* ── Dropdown ──────────────────────────────────────────────── */

    .multi-select-dropdown {
      display: none;
      position: fixed;
      z-index: var(--io-combobox-z);
      background: var(--io-surface-elevated, var(--io-color-white));
      border: var(--io-input-border-width) solid var(--io-border);
      border-radius: var(--io-border-radius-sm);
      box-shadow: var(--io-shadow-md);
      overflow: hidden;
    }

    .multi-select-dropdown[data-open="true"] {
      display: block;
    }

    /* ── Filter input ──────────────────────────────────────────── */

    .multi-select-filter {
      padding: var(--io-space-2) var(--io-space-3);
      border-bottom: var(--io-input-border-width) solid var(--io-border);
    }

    .multi-select-filter__input {
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

    .multi-select-filter__input:focus {
      border-bottom-color: var(--io-border-focus);
    }

    /* ── Listbox ───────────────────────────────────────────────── */

    .multi-select-listbox {
      list-style: none;
      margin: 0;
      padding: var(--io-space-1) 0;
      max-height: var(--io-combobox-max-height);
      overflow-y: auto;
    }

    .multi-select-empty {
      padding: var(--io-space-3);
      color: var(--io-text-secondary);
      font-size: var(--io-font-size-sm);
      font-style: italic;
      list-style: none;
    }

    /* ── Option items ──────────────────────────────────────────── */

    .multi-select-option {
      display: flex;
      align-items: center;
      gap: var(--io-space-3);
      min-height: var(--io-combobox-option-height);
      padding: var(--io-space-2) var(--io-space-3);
      cursor: pointer;
      color: var(--io-text-primary);
      font-size: var(--io-font-size-sm);
      list-style: none;
      transition: background-color var(--io-motion-fast), color var(--io-motion-fast);
    }

    .multi-select-option--focused,
    .multi-select-option:hover {
      background-color: var(--io-option-hover-bg);
    }

    .multi-select-option--selected {
      color: var(--io-color-primary);
      font-weight: var(--io-font-weight-semibold);
    }

    .multi-select-option--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
      cursor: default;
    }

    .multi-select-option__label {
      flex: 1;
    }

    /* Checkbox indicator (WCAG 1.4.11: --io-border-interactive for non-text contrast) */
    .multi-select-option__checkbox {
      flex-shrink: 0;
      width: var(--io-icon-size-md);
      height: var(--io-icon-size-md);
      border: var(--io-checkbox-border-width) solid var(--io-border-interactive);
      border-radius: var(--io-border-radius-xs);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color var(--io-motion-fast), border-color var(--io-motion-fast);
    }

    .multi-select-option--selected .multi-select-option__checkbox {
      background-color: var(--io-color-primary);
      border-color: var(--io-color-primary);
      color: var(--io-color-white);
    }

    /* ── Group ───────────────────────────────────────────────── */

    .multi-select-group__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    /* ── Group heading ─────────────────────────────────────────── */

    .multi-select-group__label {
      display: block;
      padding: var(--io-space-2) var(--io-space-3) var(--io-space-1);
      font-size: var(--io-font-size-xs);
      font-weight: var(--io-font-weight-semibold);
      color: var(--io-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* ── Footer actions (select all / clear all) ────────────────── */

    .multi-select-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--io-space-3);
      padding: var(--io-space-2) var(--io-space-3);
      border-top: var(--io-input-border-width) solid var(--io-border);
    }

    .multi-select-clear-btn,
    .multi-select-select-all-btn {
      background: none;
      border: none;
      padding: 0;
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-xs);
      color: var(--io-color-primary);
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .multi-select-clear-btn:focus-visible,
    .multi-select-select-all-btn:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
      border-radius: var(--io-border-radius-xs);
    }

    /* ── maxSelections helper text ─────────────────────────────── */

    .multi-select-limit-text {
      padding: var(--io-space-1) var(--io-space-3);
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
      text-align: right;
    }

    /* ── Message text (error / success / warning / helper) ─────── */

    .multi-select-message {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    .multi-select-wrapper--error ~ .multi-select-message,
    .multi-select-message--error {
      color: var(--io-color-error);
    }

    .multi-select-message--success {
      color: var(--io-color-success);
    }

    .multi-select-message--warning {
      color: var(--io-color-state-warning);
    }

    .multi-select-message--limit {
      color: var(--io-text-secondary);
    }

    /* ── Helper text / description slot ────────────────────────── */

    .multi-select-description {
      display: block;
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    .multi-select-description--persistent {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    .multi-select-description__slot--hidden {
      display: none;
    }

    /* ── Reduced-motion overrides ──────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .multi-select-trigger,
      .multi-select-trigger__chevron,
      .multi-select-trigger__clear,
      .multi-select-option,
      .multi-select-option__checkbox,
      .multi-select-chip__remove { transition: none; }
    }
  `;
}
