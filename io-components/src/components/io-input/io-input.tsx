import { Component, Prop, Event, EventEmitter, Method, State, Element, Host, Watch, AttachInternals, h } from '@stencil/core';

import { getInputStyles } from './io-input-styles';
import { resolveInputId } from './io-input-utils';

import type { IoFieldState } from '../../utils/field-state';
import type { IoInputType, IoInputSize } from './types';

/**
 * io-input
 * =========
 * Text input with static label above the field.
 * Border expands from 1px → 5px on focus (io brand interaction).
 * The label never moves — it is always visible above the input.
 *
 * @example
 * <io-input label="Email address" type="email" name="email" required />
 * <io-input label="Search" type="search" placeholder="Search..." />
 */
@Component({
  tag: 'io-input',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class IoInput {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  private fallbackId!: string;
  private inputId!: string;
  private defaultValue = '';

  @State() private hasPrefix = false;
  @State() private hasSuffix = false;

  /** Tracks FACE form validation invalidity so aria-invalid reflects both error prop and form state */
  @State() faceInvalid = false;

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Input type */
  @Prop() type: IoInputType = 'text';

  /** Field size aligned to io-button scale */
  @Prop({ reflect: true }) size: IoInputSize = 'md';

  /** Input name */
  @Prop() name: string | undefined;

  /** Current value */
  @Prop({ mutable: true }) value = '';

  /** Placeholder — shown when no value and label is resting */
  @Prop() placeholder: string | undefined;

  /** Marks the input as required */
  @Prop() required = false;

  /** Makes the field read-only — value is not editable but the field stays in tab order */
  @Prop({ reflect: true }) readonly = false;

  /** Disables the input */
  @Prop({ reflect: true }) disabled = false;

  /** Validation state — controls border color, icon, and message color */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

  /** Validation message shown below the input (used for error, success, and warning states) */
  @Prop() message = '';

  /** Helper text shown below the input (replaces error when no error) */
  @Prop() helperText: string | undefined;

  /** Max length */
  @Prop() maxLength: number | undefined;

  /** Native minimum value (date/time/number) */
  @Prop() min: string | number | undefined;

  /** Native maximum value (date/time/number) */
  @Prop() max: string | number | undefined;

  /** Native step value (date/time/number) */
  @Prop() step: string | number | undefined;

  /** Autocomplete attribute */
  @Prop() autocomplete: string | undefined;

  @Event() input!: EventEmitter<InputEvent>;
  @Event() change!: EventEmitter<string>;
  @Event() focus!: EventEmitter<FocusEvent>;
  @Event() blur!: EventEmitter<FocusEvent>;

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.inputId = resolveInputId(this.name, this.fallbackId);
    this.defaultValue = this.value ?? '';
    this.syncFormValue();
  }

  formResetCallback() {
    this.value = this.defaultValue;
    this.syncFormValue();
    this.faceInvalid = false;
  }

  @Watch('value')
  onValueChange() {
    this.syncFormValue();
  }

  @Watch('required')
  onRequiredChange() {
    this.syncFormValue();
  }

  @Watch('maxLength')
  onMaxLengthChange() {
    this.syncFormValue();
  }

  @Watch('min')
  onMinChange() {
    this.syncFormValue();
  }

  @Watch('max')
  onMaxChange() {
    this.syncFormValue();
  }

  @Watch('step')
  onStepChange() {
    this.syncFormValue();
  }

  private syncFormValue() {
    this.internals?.setFormValue?.(this.value ?? '');
    // Derive validity from the native <input> when available so constraints like
    // maxLength, min, max, step, and typeMismatch are reflected automatically.
    // Falls back to required-only check before the shadow root exists.
    const nativeInput = this.el?.shadowRoot?.querySelector<HTMLInputElement>('input');
    if (nativeInput) {
      if (!nativeInput.checkValidity()) {
        this.internals?.setValidity?.(nativeInput.validity, nativeInput.validationMessage, nativeInput);
        this.faceInvalid = true;
      } else {
        this.internals?.setValidity?.({});
        this.faceInvalid = false;
      }
    } else if (this.required && !this.value) {
      this.internals?.setValidity?.({ valueMissing: true }, 'Please fill in this field');
      this.faceInvalid = true;
    } else {
      this.internals?.setValidity?.({});
      this.faceInvalid = false;
    }
  }

  handleSlotChange(ev: Event) {
    const slot = ev.target as HTMLSlotElement;
    const hasNodes = slot.assignedNodes({ flatten: true }).length > 0;
    if (slot.name === 'prefix') this.hasPrefix = hasNodes;
    if (slot.name === 'suffix') this.hasSuffix = hasNodes;
  }

  @Watch('name')
  nameChanged(newName: string | undefined) {
    this.inputId = resolveInputId(newName, this.fallbackId);
  }

  private getInputIds() {
    const inputId = this.inputId;
    return {
      inputId,
      errorId: `${inputId}-error`,
      helperId: `${inputId}-helper`,
    };
  }

  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const input = this.el.shadowRoot?.querySelector<HTMLInputElement>('input');
    input?.focus(options);
  }

  /** Check validity without showing browser validation UI. Returns true if valid. */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.internals?.checkValidity?.() ?? true;
  }

  /** Check validity and show browser validation UI if invalid. Returns true if valid. */
  @Method()
  async reportValidity(): Promise<boolean> {
    return this.internals?.reportValidity?.() ?? true;
  }

  private handleInput = (ev: InputEvent) => {
    if (this.disabled) {
      return;
    }
    this.value = (ev.target as HTMLInputElement).value;
    this.input.emit(ev);
  };

  private handleChange = (ev: Event) => {
    if (this.disabled) {
      return;
    }
    this.change.emit((ev.target as HTMLInputElement).value);
  };

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled) {
      return;
    }
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled) {
      return;
    }
    this.blur.emit(ev);
  };

  render() {
    const { label, type, name, value, placeholder, required, readonly, disabled, state, message, helperText, maxLength, min, max, step, autocomplete, size, hasPrefix, hasSuffix } = this;
    const { inputId, errorId, helperId } = this.getInputIds();

    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const hasState = showError || showSuccess || showWarning;

    const messageId = errorId;
    const describedBy = [
      hasState && message ? messageId : '',
      !hasState && helperText ? helperId : '',
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
      hasPrefix ? 'input-field--has-prefix' : '',
      hasSuffix ? 'input-field--has-suffix' : '',
    ].filter(Boolean).join(' ');

    return (
      <Host>
        <style>{getInputStyles()}</style>
        <div class={wrapperClass}>
          {/* Flex row: prefix slot, input, suffix slot, state icon */}
          <div class="input-field-row">
            <span class={`input-slot input-slot--prefix${hasPrefix ? '' : ' input-slot--hidden'}`}>
              <slot name="prefix" onSlotchange={this.handleSlotChange} />
            </span>
            <input
              id={inputId}
              class={fieldClass}
              type={type}
              name={name}
              value={value}
              placeholder={placeholder ?? ' '}
              required={required}
              readOnly={readonly}
              disabled={disabled}
              maxLength={maxLength}
              min={min}
              max={max}
              step={step}
              autocomplete={autocomplete}
              aria-invalid={showError ? 'true' : undefined}
              aria-readonly={readonly ? 'true' : undefined}
              aria-describedby={describedBy}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            <span class={`input-slot input-slot--suffix${hasSuffix ? '' : ' input-slot--hidden'}`}>
              <slot name="suffix" onSlotchange={this.handleSlotChange} />
            </span>
            {showError && (
              <div class="input-state-icon input-state-icon--error" aria-hidden="true">
                <svg width="1.5rem" height="1.5rem" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 3.667a.667.667 0 0 0-.667.666V7a.667.667 0 1 0 1.334 0V4.333A.667.667 0 0 0 7 3.667Zm.613 5.746a.507.507 0 0 0-.06-.12l-.08-.1a.667.667 0 0 0-.726-.14.767.767 0 0 0-.22.14.667.667 0 0 0-.14.727.6.6 0 0 0 .36.36.626.626 0 0 0 .506 0 .6.6 0 0 0 .36-.36.667.667 0 0 0 .054-.253.907.907 0 0 0 0-.134.427.427 0 0 0-.054-.12ZM7 .333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 7 .333Zm0 12A5.334 5.334 0 1 1 7 1.666a5.334 5.334 0 0 1 0 10.667Z" fill="currentColor" />
                </svg>
              </div>
            )}
            {showSuccess && (
              <div class="input-state-icon input-state-icon--success" aria-hidden="true">
                <svg width="1.5rem" height="1.5rem" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 .333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 7 .333Zm3.14 5.14-3.667 3.667a.667.667 0 0 1-.946 0L3.86 7.473a.669.669 0 0 1 .947-.946l2.193 2.193 3.193-3.193a.669.669 0 0 1 .947.946Z" fill="currentColor" />
                </svg>
              </div>
            )}
            {showWarning && (
              <div class="input-state-icon input-state-icon--warning" aria-hidden="true">
                <svg width="1.5rem" height="1.5rem" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.253 10.667 8.12 1.667a1.333 1.333 0 0 0-2.24 0L.747 10.667A1.333 1.333 0 0 0 1.88 12.667h10.24a1.333 1.333 0 0 0 1.133-2Zm-6.92-5.334a.667.667 0 0 1 1.334 0V8a.667.667 0 0 1-1.334 0V5.333Zm.667 5.334a.667.667 0 1 1 0-1.334.667.667 0 0 1 0 1.334Z" fill="currentColor" />
                </svg>
              </div>
            )}
          </div>
          {/* Label sits outside the row so it can use absolute positioning
              within the wrapper for the floating-label effect */}
          <label htmlFor={inputId} class="input-label">
            {label}
            {required && <span class="input-required" aria-hidden="true"> *</span>}
          </label>
        </div>
        {hasState && message && (
          <p id={messageId} class={`input-message input-message--${showError ? 'error' : showSuccess ? 'success' : 'warning'}`} role="alert">{message}</p>
        )}
        {!hasState && helperText && (
          <p id={helperId} class="input-helper">{helperText}</p>
        )}
      </Host>
    );
  }
}
