import { Component, Prop, Event, EventEmitter, State, Element, Host, h, AttachInternals, Watch } from '@stencil/core';

import { getInputSearchStyles } from './io-input-search-styles';

import type { IoFieldState } from '../../utils/field-state';
import type { IoInputSearchSize } from './types';

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
  formAssociated: true,
})
export class IoInputSearch {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;
  private defaultValue = '';

  private inputId!: string;
  private errorId!: string;
  private faceErrorId!: string;
  private helperId!: string;

  /** Mirrors FACE invalidity so the component re-renders when form validation state changes */
  @State() faceInvalid = false;

  /** True after the user has blurred the field at least once — gates eager FACE error display */
  @State() private touched = false;

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
  @Prop({ mutable: true, reflect: true }) disabled = false;

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
    this.faceErrorId = `${base}-face-error`;
    this.helperId = `${base}-helper`;
    this.defaultValue = this.value ?? '';
    this.hasValue = !!this.value;
    this.syncFormValue();
  }

  @Watch('value')
  onValueChange(newVal: string) {
    this.hasValue = !!newVal;
    this.syncFormValue();
  }

  @Watch('required')
  onRequiredChange() { this.syncFormValue(); }

  private syncFormValue() {
    this.internals?.setFormValue?.(this.value ?? '');
    const nativeInput = this.el?.shadowRoot?.querySelector<HTMLInputElement>('input');
    if (nativeInput) {
      if (!nativeInput.checkValidity()) {
        this.internals?.setValidity?.(nativeInput.validity, nativeInput.validationMessage, nativeInput);
        this.faceInvalid = this.touched;
      } else {
        this.internals?.setValidity?.({});
        this.faceInvalid = false;
      }
    } else if (this.required && !this.value) {
      this.internals?.setValidity?.({ valueMissing: true }, 'Please fill in this field');
      this.faceInvalid = this.touched;
    } else {
      this.internals?.setValidity?.({});
      this.faceInvalid = false;
    }
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
    const newVal = (ev.target as HTMLInputElement).value;
    this.value = newVal;
    this.change.emit(newVal);
  };

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.touched = true;
    this.syncFormValue();
    this.blur.emit(ev);
  };

  formResetCallback() {
    this.value = this.defaultValue;
    this.touched = false;
    this.faceInvalid = false;
    this.syncFormValue();
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formStateRestoreCallback(state: string | null) {
    this.value = state ?? '';
    this.syncFormValue();
  }

  private handleClear = () => {
    if (this.disabled) return;
    this.value = '';
    this.hasValue = false;
    this.syncFormValue();
    this.clear.emit();
    const nativeInput = this.el.shadowRoot?.querySelector<HTMLInputElement>('input');
    nativeInput?.focus();
  };

  render() {
    const { label, name, value, placeholder, required, disabled, state, message, helperText, hideLabel, size, autocomplete, clearAriaLabel, hasValue } = this;
    const { inputId, errorId, faceErrorId, helperId } = this;

    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const showMessage = (showError || showSuccess || showWarning) && !!message;
    const showFaceError = this.faceInvalid && state !== 'error' && !message;
    const showDescription = !showMessage && !showFaceError && !!helperText;
    const describedBy = [
      showMessage ? errorId : '',
      showFaceError ? faceErrorId : '',
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
              aria-required={required ? 'true' : undefined}
              aria-invalid={(showError) ? 'true' : undefined}
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
              disabled={disabled || undefined}
              onClick={this.handleClear}
              tabIndex={hasValue && !disabled ? 0 : -1}
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
        {showFaceError && (
          <p id={faceErrorId} class="input-message input-message--error" role="alert">
            Please fill in this field
          </p>
        )}
        <p id={helperId} class={`input-helper${showDescription ? '' : ' input-helper--hidden'}`}>
          {helperText}
        </p>
      </Host>
    );
  }
}
