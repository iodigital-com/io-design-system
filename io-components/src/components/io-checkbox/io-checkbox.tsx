import { Component, Prop, Event, EventEmitter, Method, Element, Host, Watch, AttachInternals, h } from '@stencil/core';

import { getCheckboxStyles } from './io-checkbox-styles';
import { resolveCheckboxId, getCheckboxWrapperClass, getCheckboxCustomClass } from './io-checkbox-utils';

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

  /** Puts the checkbox in error state */
  @Prop({ reflect: true }) error = false;

  /** Error message shown below the checkbox */
  @Prop() errorMessage: string | undefined;

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

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

  // ── Private ───────────────────────────────────────────────────

  private fallbackId!: string;
  private fieldId!: string;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.fieldId = resolveCheckboxId(this.name, this.fallbackId);
    this.syncFormValue();
  }

  @Watch('checked')
  onCheckedChange() {
    this.syncFormValue();
  }

  private syncFormValue() {
    // Unchecked checkbox: null = excluded from FormData (matches native checkbox behaviour)
    this.internals?.setFormValue?.(this.checked ? this.value : null);
    if (this.required && !this.checked) {
      this.internals?.setValidity?.({ valueMissing: true }, 'Please check this box');
    } else {
      this.internals?.setValidity?.({});
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
    const { label, name, value, checked, indeterminate, required, disabled, error, errorMessage, helperText } = this;
    const inputId = this.fieldId;
    const errorId = `${inputId}-error`;

    return (
      <Host>
        <style>{getCheckboxStyles()}</style>
        <div class={getCheckboxWrapperClass(disabled, error)}>
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
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error && errorMessage ? errorId : undefined}
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
        {error && errorMessage && (
          <p id={errorId} class="checkbox-error" role="alert">
            {errorMessage}
          </p>
        )}
        {!error && helperText && <p class="checkbox-helper">{helperText}</p>}
      </Host>
    );
  }
}
