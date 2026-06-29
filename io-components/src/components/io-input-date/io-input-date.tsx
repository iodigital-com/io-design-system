import { Component, Prop, Event, EventEmitter, State, Watch, Element, Host, h, AttachInternals, Method } from '@stencil/core';

import { getInputDateStyles } from './io-input-date-styles';
import { implicitSubmit } from '../../utils/form/implicit-submit';

import type { IoFieldState } from '../../utils/field-state';
import type { IoInputDateSize } from './types';

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
  formAssociated: true,
})
export class IoInputDate {
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

  /** Current value (YYYY-MM-DD format) */
  @Prop({ mutable: true }) value = '';

  /** Marks the input as required */
  @Prop() required = false;

  /** Disables the input */
  @Prop({ reflect: true }) disabled = false;

  /** Makes the input read-only */
  @Prop({ reflect: true }) readonly = false;

  /** Shows a loading indicator */
  @Prop() loading = false;

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

  /** Step in days (or "any") */
  @Prop() step: string | undefined;

  /** Field size aligned to io-button scale */
  @Prop({ reflect: true }) size: IoInputDateSize = 'md';

  @State() faceInvalid = false;
  @State() private touched = false;

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
    this.defaultValue = this.value ?? '';
    this.syncFormValue();
  }

  @Watch('value')
  @Watch('required')
  @Watch('min')
  @Watch('max')
  @Watch('step')
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

  render() {
    const { label, name, value, required, disabled, readonly, loading, state, message, helperText, hideLabel, size, min, max, step } = this;
    const { inputId, errorId, helperId } = this;

    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const showMessage = (showError || showSuccess || showWarning) && !!message;
    const showDescription = !showMessage && !!helperText;

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
      'input-field--has-suffix',
    ].filter(Boolean).join(' ');

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
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
              disabled={disabled || loading}
              readOnly={readonly}
              aria-readonly={readonly ? 'true' : undefined}
              min={min}
              max={max}
              step={step}
              aria-invalid={showError ? 'true' : undefined}
              aria-describedby={describedBy}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
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
