import { Component, Prop, Event, EventEmitter, Method, Element, Host, Watch, State, AttachInternals, h } from '@stencil/core';

import { getCheckboxStyles } from './io-checkbox-styles';
import { resolveCheckboxId, getCheckboxWrapperClass, getCheckboxCustomClass } from './io-checkbox-utils';

import type { IoFieldState } from '../../utils/field-state';
import type { IoCheckboxChangeDetail } from './types';

/**
 * io-checkbox
 * ============
 * Custom-styled checkbox with label, helper text, and error state.
 * Supports indeterminate state for partial multi-select scenarios.
 *
 * @example
 * <io-checkbox label="Accept terms" name="terms" />
 * <io-checkbox label="All locations" indeterminate />
 * <io-checkbox label="Required field" required error error-message="This field is required" />
 */
@Component({
  tag: 'io-checkbox',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class IoCheckbox {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  // ── Props ─────────────────────────────────────────────────────

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Input name */
  @Prop() name: string | undefined;

  /** Value submitted with the form */
  @Prop() value = '';

  /** Checked state */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Indeterminate state — renders a dash instead of a checkmark */
  @Prop({ mutable: true }) indeterminate = false;

  /** Marks the field as required */
  @Prop() required = false;

  /** Disables the checkbox */
  @Prop({ reflect: true }) disabled = false;

  /** Validation state — controls border color and message color */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

  /** Validation message shown below the checkbox (used for error, success, and warning states) */
  @Prop() message = '';

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

  /** Associates this field with a <form> element by ID — enables out-of-DOM form participation */
  @Prop({ reflect: true }) form?: string;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the checked state changes */
  @Event() change!: EventEmitter<IoCheckboxChangeDetail>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the checkbox */
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

  // ── State ─────────────────────────────────────────────────────

  /** Tracks FACE form validation invalidity so aria-invalid reflects both error prop and form state */
  @State() faceInvalid = false;

  // ── Private ───────────────────────────────────────────────────

  private fallbackId!: string;
  private fieldId!: string;
  private defaultChecked = false;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.fieldId = resolveCheckboxId(this.name, this.fallbackId);
    this.defaultChecked = this.checked;
    this.syncFormValue();
  }

  formResetCallback() {
    this.checked = this.defaultChecked;
    this.indeterminate = false;
    this.syncFormValue();
  }

  @Watch('checked')
  onCheckedChange() {
    this.syncFormValue();
  }

  @Watch('value')
  onValueChange() {
    this.syncFormValue();
  }

  @Watch('required')
  onRequiredChange() {
    this.syncFormValue();
  }

  private syncFormValue() {
    // Unchecked checkbox: null = excluded from FormData (matches native checkbox behaviour)
    this.internals?.setFormValue?.(this.checked ? this.value : null);
    if (this.required && !this.checked) {
      this.internals?.setValidity?.({ valueMissing: true }, 'Please check this box');
      this.faceInvalid = true;
    } else {
      this.internals?.setValidity?.({});
      this.faceInvalid = false;
    }
  }

  componentDidRender() {
    // indeterminate is a JS-only property, not an HTML attribute
    const input = this.el.shadowRoot?.querySelector<HTMLInputElement>('input');
    if (input) input.indeterminate = this.indeterminate;
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleChange = (ev: Event) => {
    if (this.disabled) return;
    const input = ev.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    this.change.emit({ checked: input.checked, value: this.value });
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, name, value, checked, indeterminate, required, disabled, state, message, helperText, form } = this;
    const inputId = this.fieldId;
    const messageId = `${inputId}-message`;
    const helperId = `${inputId}-helper`;
    const faceErrorId = `${inputId}-face-error`;

    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const hasState = showError || showSuccess || showWarning;
    const showFaceError = this.faceInvalid && state !== 'error';

    const describedBy = [
      !hasState && !showFaceError && helperText ? helperId : null,
      hasState && message ? messageId : null,
      showFaceError ? faceErrorId : null,
    ]
      .filter((id): id is string => Boolean(id))
      .join(' ');

    return (
      <Host>
        <style>{getCheckboxStyles()}</style>
        <div class={getCheckboxWrapperClass(disabled, showError, showSuccess, showWarning)}>
          <label class="checkbox-label" htmlFor={inputId}>
            <span class="checkbox-control">
              <input
                id={inputId}
                class="checkbox-native"
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                required={required}
                form={form}
                aria-invalid={showError ? 'true' : undefined}
                aria-describedby={describedBy || undefined}
                onChange={this.handleChange}
              />
              <span
                class={getCheckboxCustomClass(checked, indeterminate)}
                aria-hidden="true"
              >
                {checked && !indeterminate && (
                  <svg class="checkbox-icon" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                    <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                )}
                {indeterminate && (
                  <svg class="checkbox-icon" viewBox="0 0 10 2" fill="none" aria-hidden="true">
                    <path d="M1 1H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                )}
              </span>
            </span>
            <span class="checkbox-text">
              {label}
              {required && (
                <span class="checkbox-required" aria-hidden="true">
                  {' *'}
                </span>
              )}
            </span>
          </label>
        </div>
        {hasState && message && (
          <p id={messageId} class={`checkbox-message checkbox-message--${showError ? 'error' : showSuccess ? 'success' : 'warning'}`} role={showError ? 'alert' : 'status'}>
            {message}
          </p>
        )}
        {showFaceError && (
          <p id={faceErrorId} class="checkbox-message checkbox-message--error" role="alert">
            Please check this box
          </p>
        )}
        {!hasState && !this.faceInvalid && helperText && (
          <p id={helperId} class="checkbox-helper">
            {helperText}
          </p>
        )}
      </Host>
    );
  }
}
