import { Component, Prop, Event, EventEmitter, State, Watch, Element, Host, h, AttachInternals, Method } from '@stencil/core';

import { getInputPasswordStyles } from './io-input-password-styles';
import { implicitSubmit } from '../../utils/form/implicit-submit';

import type { IoFieldState } from '../../utils/field-state';
import type { IoInputPasswordSize } from './types';

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
  formAssociated: true,
})
export class IoInputPassword {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;
  private defaultValue = '';

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
  @Prop({ reflect: true }) size: IoInputPasswordSize = 'md';

  /** Native autocomplete attribute */
  @Prop() autocomplete = 'current-password';

  /** When false, hides the show/hide password toggle button */
  @Prop() toggle = true;

  /** Whether the password is currently visible as plain text */
  @State() showPassword = false;

  @State() faceInvalid = false;
  @State() private touched = false;

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
    this.defaultValue = this.value ?? '';
    this.syncFormValue();
  }

  @Watch('value')
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
    if (this.disabled || this.readonly) return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    this.value = (ev.target as HTMLInputElement).value;
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

  private toggleVisibility = () => {
    this.showPassword = !this.showPassword;
  };

  render() {
    const { label, name, value, placeholder, required, disabled, readonly, loading, state, message, helperText, hideLabel, size, autocomplete, showPassword, maxLength, minLength, toggle } = this;
    const { inputId, errorId, helperId } = this;

    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
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
      readonly ? 'input-wrapper--readonly' : '',
    ].filter(Boolean).join(' ');

    const fieldClass = [
      'input-field',
      `input-field--${size}`,
    ].filter(Boolean).join(' ');

    const toggleLabel = showPassword ? 'Hide password' : 'Show password';
    const inputType = showPassword ? 'text' : 'password';

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
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
              disabled={disabled || loading}
              readOnly={readonly}
              aria-readonly={readonly ? 'true' : undefined}
              maxLength={maxLength}
              minLength={minLength}
              autocomplete={autocomplete}
              aria-invalid={showError ? 'true' : undefined}
              aria-describedby={describedBy}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
            />
            {toggle && (
              <button
                type="button"
                class="password-toggle"
                aria-label={toggleLabel}
                aria-pressed={String(showPassword)}
                disabled={loading || undefined}
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
            )}
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
        {(showError || showSuccess || showWarning) && (
          <p
            id={errorId}
            class={[
              'input-message',
              showError ? 'input-message--error' : showSuccess ? 'input-message--success' : 'input-message--warning',
              showMessage ? '' : 'input-error--hidden',
            ].filter(Boolean).join(' ')}
            role={showError ? 'alert' : 'status'}
          >
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
