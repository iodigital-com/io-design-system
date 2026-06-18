import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';

import { getInputDateStyles } from './io-input-date-styles';

import type { IoFieldState } from '../../utils/field-state';
import type { IoInputDateSize } from './types';

let idCounter = 0;

/**
 * io-input-date
 * ==============
 * Date input using the native browser date picker with min/max constraints.
 * Follows the same underline-only visual pattern as io-input.
 * The label is permanently floated because type=date always shows a value
 * placeholder (dd/mm/yyyy) in the field area.
 *
 * @example
 * <io-input-date label="Birth date" name="dob" min="1900-01-01" max="2026-12-31" />
 */
@Component({
  tag: 'io-input-date',
  shadow: { delegatesFocus: true },
})
export class IoInputDate {
  @Element() el!: HTMLElement;

  private inputId!: string;
  private errorId!: string;
  private helperId!: string;

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Input name */
  @Prop() name: string | undefined;

  /** Current value (YYYY-MM-DD format) */
  @Prop({ mutable: true }) value = '';

  /** Marks the input as required */
  @Prop() required = false;

  /** Disables the input */
  @Prop({ reflect: true }) disabled = false;

  /** Validation state */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

  /** Validation message shown below the input */
  @Prop() message = '';

  /** Helper text shown below the input when no error */
  @Prop() helperText: string | undefined;

  /** Visually hides the label while keeping it accessible */
  @Prop({ reflect: true }) hideLabel = false;

  /** Minimum selectable date (YYYY-MM-DD) */
  @Prop() min: string | undefined;

  /** Maximum selectable date (YYYY-MM-DD) */
  @Prop() max: string | undefined;

  /** Field size aligned to io-button scale */
  @Prop({ reflect: true }) size: IoInputDateSize = 'md';

  @Event() input!: EventEmitter<InputEvent>;
  @Event() change!: EventEmitter<string>;
  @Event() focus!: EventEmitter<FocusEvent>;
  @Event() blur!: EventEmitter<FocusEvent>;

  componentWillLoad() {
    const uid = Math.random().toString(36).slice(2);
    const base = this.name ? `io-input-date-${this.name.replace(/[^a-z0-9_-]+/gi, '-')}-${uid}` : `io-input-date-${uid}`;
    this.inputId = base;
    this.errorId = `${base}-error`;
    this.helperId = `${base}-helper`;
    idCounter++;
  }

  private handleInput = (ev: InputEvent) => {
    if (this.disabled) return;
    this.value = (ev.target as HTMLInputElement).value;
    this.input.emit(ev);
  };

  private handleChange = (ev: Event) => {
    if (this.disabled) return;
    this.change.emit((ev.target as HTMLInputElement).value);
  };

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.blur.emit(ev);
  };

  render() {
    const { label, name, value, required, disabled, state, message, helperText, hideLabel, size, min, max } = this;
    const { inputId, errorId, helperId } = this;

    const showError = state === 'error';
    const showSuccess = state === 'success';
    const showWarning = state === 'warning';
    const showMessage = (showError || showSuccess || showWarning) && !!message;
    const showDescription = !showMessage && !!helperText;
    const describedBy = [
      showMessage ? errorId : '',
      showDescription ? helperId : '',
    ].filter(Boolean).join(' ') || undefined;

    const wrapperClass = [
      'input-wrapper',
      showError ? 'input-wrapper--state-error' : '',
      showSuccess ? 'input-wrapper--state-success' : '',
      showWarning ? 'input-wrapper--state-warning' : '',
      disabled ? 'input-wrapper--disabled' : '',
    ].filter(Boolean).join(' ');

    const fieldClass = [
      'input-field',
      `input-field--${size}`,
      'input-field--has-suffix',
    ].filter(Boolean).join(' ');

    return (
      <Host>
        <style>{getInputDateStyles()}</style>
        <div class={wrapperClass}>
          <div class="input-field-row">
            <input
              id={inputId}
              class={fieldClass}
              type="date"
              name={name}
              value={value}
              required={required}
              disabled={disabled}
              min={min}
              max={max}
              aria-invalid={showError ? 'true' : undefined}
              aria-describedby={describedBy}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {/* Calendar icon — decorative */}
            <span class="date-suffix" aria-hidden="true">
              <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </span>
            {showError && (
              <div class="input-state-icon input-state-icon--error" aria-hidden="true">
                <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="8" y2="12" />
                  <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
              </div>
            )}
            {showSuccess && (
              <div class="input-state-icon input-state-icon--success" aria-hidden="true">
                <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
            )}
            {showWarning && (
              <div class="input-state-icon input-state-icon--warning" aria-hidden="true">
                <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
            )}
          </div>
          {/* Label is permanently floated — date inputs always show a value placeholder */}
          <label htmlFor={inputId} class={hideLabel ? 'input-label input-label--sr-only' : 'input-label input-label--date-float'}>
            {label}
            {required && <span class="input-required" aria-hidden="true"> *</span>}
          </label>
        </div>
        {showError && (
          <p id={errorId} class={`input-message input-message--error${showMessage ? '' : ' input-error--hidden'}`} role="alert">
            {message}
          </p>
        )}
        {showSuccess && (
          <p id={errorId} class={`input-message input-message--success${showMessage ? '' : ' input-error--hidden'}`} role="status">
            {message}
          </p>
        )}
        {showWarning && (
          <p id={errorId} class={`input-message input-message--warning${showMessage ? '' : ' input-error--hidden'}`} role="status">
            {message}
          </p>
        )}
        <p id={helperId} class={`input-helper${showDescription ? '' : ' input-helper--hidden'}`}>
          {helperText}
        </p>
      </Host>
    );
  }
}
