import { Component, Prop, Event, EventEmitter, State, Watch, Element, Host, h, AttachInternals, Method } from '@stencil/core';

import { getInputSearchStyles } from './io-input-search-styles';
import { implicitSubmit } from '../../utils/form/implicit-submit';

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
  private faceErrorMessage = '';

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

  /** Makes the input read-only */
  @Prop({ reflect: true }) readonly = false;

  /** Shows a loading indicator */
  @Prop() loading = false;

  /** Maximum number of characters allowed */
  @Prop() maxLength: number | undefined;

  /** Minimum number of characters required */
  @Prop() minLength: number | undefined;

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

  @State() faceInvalid = false;
  @State() private touched = false;

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
  @Watch('maxLength')
  @Watch('minLength')
  onValidityAffectingPropChange() {
    this.syncFormValue();
  }

  private syncFormValue() {
    this.internals?.setFormValue?.(this.value ?? '');
    const native = this.el?.shadowRoot?.querySelector<HTMLInputElement>('input');
    if (native) {
      if (!native.checkValidity()) {
        this.internals?.setValidity?.(native.validity, native.validationMessage, native);
        this.faceErrorMessage = native.validationMessage;
        this.faceInvalid = this.touched;
      } else {
        this.internals?.setValidity?.({});
        this.faceErrorMessage = '';
        this.faceInvalid = false;
      }
    } else if (this.required && !this.value) {
      this.internals?.setValidity?.({ valueMissing: true }, 'Please fill in this field');
      this.faceErrorMessage = 'Please fill in this field';
      this.faceInvalid = this.touched;
    } else {
      this.internals?.setValidity?.({});
      this.faceErrorMessage = '';
      this.faceInvalid = false;
    }
  }

  private handleInput = (ev: InputEvent) => {
    if (this.disabled || this.readonly) return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    const newValue = (ev.target as HTMLInputElement).value;
    this.value = newValue;
    this.hasValue = newValue.length > 0;
    this.input.emit(ev);
  };

  private handleChange = (ev: Event) => {
    if (this.disabled || this.readonly) return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    const newVal = (ev.target as HTMLInputElement).value;
    this.value = newVal;
    this.syncFormValue();
    this.change.emit(newVal);
  };

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled) return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled) return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    this.touched = true;
    this.syncFormValue();
    this.blur.emit(ev);
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    implicitSubmit(ev, this.internals, { disabled: this.disabled || this.loading, loading: false });
  };

  formResetCallback() {
    this.value = this.defaultValue;
    this.touched = false;
    this.syncFormValue();
    this.faceInvalid = false;
  }

  formDisabledCallback(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  formStateRestoreCallback(state: string | File | FormData | null) {
    if (typeof state === 'string') {
      this.value = state;
    }
  }

  @Method()
  async checkValidity(): Promise<boolean> {
    return this.internals?.checkValidity?.() ?? true;
  }

  @Method()
  async reportValidity(): Promise<boolean> {
    this.touched = true;
    this.syncFormValue();
    return this.internals?.reportValidity?.() ?? true;
  }

  private handleClear = () => {
    if (this.readonly) return;
    this.value = '';
    this.hasValue = false;
    this.clear.emit();
    // Return focus to the input after clearing
    const nativeInput = this.el.shadowRoot?.querySelector<HTMLInputElement>('input');
    nativeInput?.focus();
  };

  render() {
    const { label, name, value, placeholder, required, disabled, readonly, loading, state, message, helperText, hideLabel, size, autocomplete, clearAriaLabel, hasValue, maxLength, minLength } = this;
    const { inputId, errorId, helperId } = this;

    const showError = state === 'error';
    const showSuccess = state === 'success';
    const showWarning = state === 'warning';
    // faceInvalid contributes to showError when there is no consumer-provided error state
    const showFaceOnlyError = this.touched && this.faceInvalid && !showError;
    // Combined error display: either consumer state=error or FACE-triggered error
    const showErrorBlock = showError || showFaceOnlyError;
    // The error message shown: consumer message takes precedence, then native validation message
    const errorMessageToShow = showError && message ? message : (showFaceOnlyError ? this.faceErrorMessage : '');
    const showMessage = showErrorBlock && !!errorMessageToShow;
    const showSuccessMessage = showSuccess && !!message;
    const showWarningMessage = showWarning && !!message;
    const showDescription = !showErrorBlock && !showSuccessMessage && !showWarningMessage && !!helperText;

    const describedBy = [
      showMessage ? errorId : '',
      showSuccessMessage ? errorId : '',
      showWarningMessage ? errorId : '',
      showDescription ? helperId : '',
    ].filter(Boolean).join(' ') || undefined;

    const wrapperClass = [
      'input-wrapper',
      showErrorBlock ? 'input-wrapper--state-error' : '',
      showSuccess ? 'input-wrapper--state-success' : '',
      showWarning ? 'input-wrapper--state-warning' : '',
      disabled ? 'input-wrapper--disabled' : '',
      readonly ? 'input-wrapper--readonly' : '',
    ].filter(Boolean).join(' ');

    const fieldClass = [
      'input-field',
      `input-field--${size}`,
      'input-field--has-prefix',
    ].filter(Boolean).join(' ');

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
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
              disabled={disabled || loading}
              readOnly={readonly}
              aria-readonly={readonly ? 'true' : undefined}
              maxLength={maxLength}
              minLength={minLength}
              autocomplete={autocomplete}
              aria-invalid={(showError || showFaceOnlyError) ? 'true' : undefined}
              aria-describedby={describedBy}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
            />
            {/* Clear button — only visible when there is a value */}
            <button
              type="button"
              class={`search-clear${hasValue ? '' : ' search-clear--hidden'}`}
              aria-label={clearAriaLabel}
              disabled={disabled || loading || undefined}
              onClick={this.handleClear}
              tabIndex={hasValue && !disabled && !loading ? 0 : -1}
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
        {showErrorBlock && (
          <p id={errorId} class={`input-message input-message--error${showMessage ? '' : ' input-error--hidden'}`} role="alert">
            {errorMessageToShow}
          </p>
        )}
        {showSuccess && (
          <p id={errorId} class={`input-message input-message--success${showSuccessMessage ? '' : ' input-error--hidden'}`} role="status">
            {message}
          </p>
        )}
        {showWarning && (
          <p id={errorId} class={`input-message input-message--warning${showWarningMessage ? '' : ' input-error--hidden'}`} role="status">
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
