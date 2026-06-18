import { Component, Prop, Event, EventEmitter, State, Element, Host, h } from '@stencil/core';

import { getInputSearchStyles } from './io-input-search-styles';

import type { IoFieldState } from '../../utils/field-state';
import type { IoInputSearchSize } from './types';

let idCounter = 0;

/**
 * io-input-search
 * ================
 * Search input with a magnifier prefix icon and a clear button that appears
 * when the field has a value. Suppresses the browser's native clear button.
 *
 * @example
 * <io-input-search label="Search" name="q" placeholder="Search products…" />
 */
@Component({
  tag: 'io-input-search',
  shadow: { delegatesFocus: true },
})
export class IoInputSearch {
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
  @Prop({ reflect: true }) size: IoInputSearchSize = 'md';

  /** Native autocomplete attribute */
  @Prop() autocomplete = 'off';

  /** Accessible label for the clear button */
  @Prop() clearAriaLabel = 'Clear search';

  /** Tracks whether the clear button should be visible */
  @State() private hasValue = false;

  @Event() input!: EventEmitter<InputEvent>;
  @Event() change!: EventEmitter<string>;
  @Event() focus!: EventEmitter<FocusEvent>;
  @Event() blur!: EventEmitter<FocusEvent>;
  /** Fired when the user clicks the clear button */
  @Event() clear!: EventEmitter<void>;

  componentWillLoad() {
    const uid = Math.random().toString(36).slice(2);
    const base = this.name ? `io-input-search-${this.name.replace(/[^a-z0-9_-]+/gi, '-')}-${uid}` : `io-input-search-${uid}`;
    this.inputId = base;
    this.errorId = `${base}-error`;
    this.helperId = `${base}-helper`;
    this.hasValue = !!this.value;
    idCounter++;
  }

  private handleInput = (ev: InputEvent) => {
    if (this.disabled) return;
    const newValue = (ev.target as HTMLInputElement).value;
    this.value = newValue;
    this.hasValue = newValue.length > 0;
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

  private handleClear = () => {
    this.value = '';
    this.hasValue = false;
    this.clear.emit();
    // Return focus to the input after clearing
    const nativeInput = this.el.shadowRoot?.querySelector<HTMLInputElement>('input');
    nativeInput?.focus();
  };

  render() {
    const { label, name, value, placeholder, required, disabled, state, message, helperText, hideLabel, size, autocomplete, clearAriaLabel, hasValue } = this;
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
      'input-field--has-prefix',
    ].filter(Boolean).join(' ');

    return (
      <Host>
        <style>{getInputSearchStyles()}</style>
        <div class={wrapperClass}>
          <div class="input-field-row">
            {/* Magnifier prefix icon — always visible */}
            <span class="search-prefix" aria-hidden="true">
              <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              id={inputId}
              class={fieldClass}
              type="search"
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
            {/* Clear button — only visible when there is a value */}
            <button
              type="button"
              class={`search-clear${hasValue ? '' : ' search-clear--hidden'}`}
              aria-label={clearAriaLabel}
              onClick={this.handleClear}
              tabIndex={hasValue ? 0 : -1}
            >
              <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
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
          <label htmlFor={inputId} class={hideLabel ? 'input-label input-label--sr-only' : `input-label input-label--has-prefix`}>
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
