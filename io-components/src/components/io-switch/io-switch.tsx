import { Component, Prop, Event, EventEmitter, Method, Element, Host, Watch, State, AttachInternals, h } from '@stencil/core';

import { getSwitchStyles } from './io-switch-styles';
import { resolveSwitchId, getSwitchWrapperClass, getSwitchTrackClass } from './io-switch-utils';

import type { IoSwitchChangeDetail } from './types';

/**
 * io-switch
 * =========
 * Toggle/switch form-associated component with role="switch" and keyboard navigation.
 * Mirrors io-checkbox FACE internals — same formAssociated pattern.
 *
 * @example
 * <io-switch label="Enable notifications" name="notifications" />
 * <io-switch label="Dark mode" checked />
 * <io-switch label="Required setting" required error error-message="This field is required" />
 */
@Component({
  tag: 'io-switch',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class IoSwitch {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  // ── Props ─────────────────────────────────────────────────────

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Input name */
  @Prop() name: string | undefined;

  /** Value submitted with the form */
  @Prop() value = 'on';

  /** Checked/toggled state */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Marks the field as required */
  @Prop() required = false;

  /** Disables the switch */
  @Prop({ reflect: true }) disabled = false;

  /** Puts the switch in error state */
  @Prop({ reflect: true }) error = false;

  /** Error message shown below the switch */
  @Prop() errorMessage: string | undefined;

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the switch state changes */
  @Event() change!: EventEmitter<IoSwitchChangeDetail>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the switch */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const input = this.el?.shadowRoot?.querySelector<HTMLInputElement>('input');
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
    this.fieldId = resolveSwitchId(this.name, this.fallbackId);
    this.defaultChecked = this.checked;
    this.syncFormValue();
  }

  formResetCallback() {
    this.checked = this.defaultChecked;
    this.faceInvalid = false;
    this.syncFormValue();
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
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
    // Unchecked switch: null = excluded from FormData (matches native checkbox behaviour)
    this.internals?.setFormValue?.(this.checked ? this.value : null);
    if (this.required && !this.checked) {
      this.internals?.setValidity?.({ valueMissing: true }, 'Please check this switch');
      this.faceInvalid = true;
    } else {
      this.internals?.setValidity?.({});
      this.faceInvalid = false;
    }
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleChange = (ev: Event) => {
    if (this.disabled) return;
    const input = ev.target as HTMLInputElement;
    this.checked = input.checked;
    this.change.emit({ checked: input.checked, value: this.value });
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, name, value, checked, required, disabled, error, errorMessage, helperText } = this;
    const inputId = this.fieldId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const faceErrorId = `${inputId}-face-error`;
    const showFaceError = this.faceInvalid && !error;
    const describedBy = [
      !error && !showFaceError && helperText ? helperId : null,
      error && errorMessage ? errorId : null,
      showFaceError ? faceErrorId : null,
    ]
      .filter((id): id is string => Boolean(id))
      .join(' ');

    return (
      <Host>
        <style>{getSwitchStyles()}</style>
        <div class={getSwitchWrapperClass(disabled, error || this.faceInvalid)}>
          <label class="switch-label" htmlFor={inputId}>
            <span class="switch-control">
              <input
                id={inputId}
                class="switch-native"
                type="checkbox"
                role="switch"
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                required={required}
                aria-invalid={(error || this.faceInvalid) ? 'true' : undefined}
                aria-describedby={describedBy || undefined}
                onChange={this.handleChange}
              />
              <span
                class={getSwitchTrackClass(checked)}
                aria-hidden="true"
              >
                <span class="switch-thumb" aria-hidden="true" />
              </span>
            </span>
            <span class="switch-text">
              {label}
              {required && (
                <span class="switch-required" aria-hidden="true">
                  {' *'}
                </span>
              )}
            </span>
          </label>
        </div>
        {error && errorMessage && (
          <p id={errorId} class="switch-error" role="alert">
            {errorMessage}
          </p>
        )}
        {showFaceError && (
          <p id={faceErrorId} class="switch-error" role="alert">
            Please check this switch
          </p>
        )}
        {!error && !this.faceInvalid && helperText && (
          <p id={helperId} class="switch-helper">
            {helperText}
          </p>
        )}
      </Host>
    );
  }
}
