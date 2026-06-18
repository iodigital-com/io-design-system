import { Component, Prop, Event, EventEmitter, State, Element, Host, h } from '@stencil/core';

import { getInputPasswordStyles } from './io-input-password-styles';

import type { IoFieldState } from '../../utils/field-state';
import type { IoInputPasswordSize } from './types';

let idCounter = 0;

/**
 * io-input-password
 * ==================
 * Password input with a toggle button (eye/eye-off) in the suffix position.
 * Follows the same underline-only visual pattern as io-input.
 *
 * @example
 * <io-input-password label="Password" name="password" required />
 */
@Component({
  tag: 'io-input-password',
  shadow: { delegatesFocus: true },
})
export class IoInputPassword {
  @Element() el!: HTMLElement;

  private inputId!: string;
  private errorId!: string;
  private helperId!: string;

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Input name */
  @Prop() name: string | undefined;

  /** Current value */
  @Prop({ mutable: true }) value = '';

  /** Placeholder text */
  @Prop() placeholder: string | undefined;

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

  /** Field size aligned to io-button scale */
  @Prop({ reflect: true }) size: IoInputPasswordSize = 'md';

  /** Native autocomplete attribute */
  @Prop() autocomplete = 'current-password';

  /** Whether the password is currently visible as plain text */
  @State() showPassword = false;

  @Event() input!: EventEmitter<InputEvent>;
  @Event() change!: EventEmitter<string>;
  @Event() focus!: EventEmitter<FocusEvent>;
  @Event() blur!: EventEmitter<FocusEvent>;

  componentWillLoad() {
    const uid = Math.random().toString(36).slice(2);
    const base = this.name ? `io-input-password-${this.name.replace(/[^a-z0-9_-]+/gi, '-')}-${uid}` : `io-input-password-${uid}`;
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

  private toggleVisibility = () => {
    this.showPassword = !this.showPassword;
  };

  render() {
    const { label, name, value, placeholder, required, disabled, state, message, helperText, hideLabel, size, autocomplete, showPassword } = this;
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
    ].filter(Boolean).join(' ');

    const toggleLabel = showPassword ? 'Hide password' : 'Show password';
    const inputType = showPassword ? 'text' : 'password';

    return (
      <Host>
        <style>{getInputPasswordStyles()}</style>
        <div class={wrapperClass}>
          <div class="input-field-row">
            <input
              id={inputId}
              class={fieldClass}
              type={inputType}
              name={name}
              value={value}
              placeholder={placeholder ?? ' '}
              required={required}
              disabled={disabled}
              autocomplete={autocomplete}
              aria-invalid={showError ? 'true' : undefined}
              aria-describedby={describedBy}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <button
              type="button"
              class="password-toggle"
              aria-label={toggleLabel}
              onClick={this.toggleVisibility}
              tabIndex={0}
            >
              {showPassword ? (
                /* eye-off icon */
                <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </svg>
              ) : (
                /* eye icon */
                <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
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
          <label htmlFor={inputId} class={hideLabel ? 'input-label input-label--sr-only' : 'input-label'}>
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
