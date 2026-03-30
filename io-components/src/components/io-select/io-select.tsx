import { Component, Prop, Event, EventEmitter, Method, Element, Host, h } from '@stencil/core';
import type { IoSelectOption } from './types';
import { getSelectStyles } from './io-select-styles';

/**
 * io-select
 * ==========
 * Styled native select with floating label — companion to io-input.
 * Uses the same underline-only visual language (border expands 1px → 5px on focus).
 *
 * @example
 * <io-select label="Country" :options="[{ label: 'Netherlands', value: 'nl' }]" />
 * <io-select label="Role" placeholder="Choose a role" required error error-message="Required" />
 */
@Component({
  tag: 'io-select',
  shadow: { delegatesFocus: true },
})
export class IoSelect {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Input name */
  @Prop() name: string | undefined;

  /** Selected value */
  @Prop({ mutable: true }) value = '';

  /** Placeholder option shown when no value is selected */
  @Prop() placeholder: string | undefined;

  /** List of options */
  @Prop() options: IoSelectOption[] = [];

  /** Marks the field as required */
  @Prop() required = false;

  /** Disables the select */
  @Prop({ reflect: true }) disabled = false;

  /** Puts the select in error state */
  @Prop({ reflect: true }) error = false;

  /** Error message shown below */
  @Prop() errorMessage: string | undefined;

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the selected value changes. Payload is the new string value. */
  @Event() change!: EventEmitter<string>;

  /** Fires when the select gains focus */
  @Event() focus!: EventEmitter<FocusEvent>;

  /** Fires when the select loses focus */
  @Event() blur!: EventEmitter<FocusEvent>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the select */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const select = this.el.shadowRoot?.querySelector<HTMLSelectElement>('select');
    select?.focus(options);
  }

  // ── Private ───────────────────────────────────────────────────

  private fieldId!: string;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.fieldId = `io-select-${this.name || Math.random().toString(36).slice(2)}`;
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleChange = (ev: Event) => {
    this.value = (ev.target as HTMLSelectElement).value;
    this.change.emit(this.value);
  };

  private handleFocus = (ev: FocusEvent) => {
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    this.blur.emit(ev);
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, name, value, placeholder, options, required, disabled, error, errorMessage, helperText } = this;
    const selectId = this.fieldId;
    const errorId = `${selectId}-error`;

    return (
      <Host>
        <style>{getSelectStyles()}</style>
        <div class={`select-wrapper${error ? ' select-wrapper--error' : ''}${disabled ? ' select-wrapper--disabled' : ''}`}>
          <select
            id={selectId}
            class="select-field"
            name={name}
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error && errorMessage ? errorId : undefined}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            {placeholder && (
              <option value="" disabled selected={value === ''}>
                {placeholder}
              </option>
            )}
            {options.map(opt => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled} selected={opt.value === value}>
                {opt.label}
              </option>
            ))}
          </select>
          <label htmlFor={selectId} class="select-label">
            {label}
            {required && (
              <span class="select-required" aria-hidden="true">
                {' *'}
              </span>
            )}
          </label>
          <span class="select-chevron" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
        {error && errorMessage && (
          <p id={errorId} class="select-error" role="alert">
            {errorMessage}
          </p>
        )}
        {!error && helperText && <p class="select-helper">{helperText}</p>}
      </Host>
    );
  }
}
