import { Component, Prop, Event, EventEmitter, Method, Element, Host, Watch, State, AttachInternals, h } from '@stencil/core';

import { getSwitchStyles } from './io-switch-styles';
import { resolveSwitchId, getSwitchWrapperClass, getSwitchTrackClass } from './io-switch-utils';
import { syncFormState } from '../../utils/form/sync-form-state';

import type { IoFieldState } from '../../utils/field-state';
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
  @Prop({ mutable: true, reflect: true }) disabled = false;

  /** Shows a loading spinner and blocks interaction */
  @Prop({ reflect: true }) loading = false;

  /**
   * Validation state of the switch — 'none' | 'error' | 'success' | 'warning'.
   */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

  /** Validation message shown below the switch when state is non-'none' */
  @Prop() message: string | undefined;

  /**
   * @deprecated Use `state="error"` instead. Will be removed in the next minor release.
   * Puts the switch in error state. Emits a console.warn in non-production builds.
   */
  @Prop({ reflect: true }) error = false;

  /**
   * @deprecated Use `message` instead. Will be removed in the next minor release.
   * Error message shown below the switch when error is true.
   */
  @Prop() errorMessage: string | undefined;

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

  /** Compact density — renders a smaller track and thumb for dense UI contexts */
  @Prop({ reflect: true }) compact = false;

  /** Visually hides the label while keeping it accessible to screen readers */
  @Prop() hideLabel = false;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the switch state changes */
  @Event() change!: EventEmitter<IoSwitchChangeDetail>;

  /** Fires when the switch loses focus — use for validation-on-blur patterns */
  @Event() blur!: EventEmitter<FocusEvent>;

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
    const isProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;
    if (!isProd && this.error) {
      console.warn('[io-switch] The "error" prop is deprecated. Use state="error" instead.');
    }
    if (!isProd && this.errorMessage !== undefined) {
      console.warn('[io-switch] The "errorMessage" prop is deprecated. Use the "message" prop instead.');
    }
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
    const isInvalid = this.required && !this.checked;
    const { faceInvalid } = syncFormState(this.internals, null, {
      formValue: this.checked ? this.value : null,
      validity: isInvalid ? { valueMissing: true } : {},
      validationMessage: isInvalid ? 'Please check this switch' : '',
      disabled: this.disabled,
    });
    this.faceInvalid = faceInvalid;
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleChange = (ev: Event) => {
    if (this.disabled || this.loading) return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    const input = ev.target as HTMLInputElement;
    this.checked = input.checked;
    this.change.emit({ checked: input.checked, value: this.value });
  };

  private handleBlur = (ev: FocusEvent): void => {
    if (this.disabled || this.loading) return;
    this.blur.emit(ev);
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, name, value, checked, required, disabled, loading, error, errorMessage, state, message, helperText } = this;
    // Effective state: new `state` prop takes precedence; `error` is deprecated alias
    const effectiveState: IoFieldState = state !== 'none' ? state : (error ? 'error' : 'none');
    // Effective message: new `message` prop takes precedence; `errorMessage` is deprecated alias
    const effectiveMessage = message ?? errorMessage;
    const isError = effectiveState === 'error';

    const inputId = this.fieldId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    // FACE-only error: triggered by FACE but no consumer error state provided
    const showFaceOnlyError = this.faceInvalid && !isError;
    // Single combined error block
    const showErrorBlock = isError || showFaceOnlyError;
    const errorMessageToShow = isError && effectiveMessage ? effectiveMessage : (showFaceOnlyError ? 'Please check this switch' : '');
    const showErrorMessage = showErrorBlock && !!errorMessageToShow;

    const describedBy = [
      !showErrorBlock && helperText ? helperId : null,
      showErrorMessage ? errorId : null,
    ]
      .filter((id): id is string => Boolean(id))
      .join(' ');

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
        <style>{getSwitchStyles()}</style>
        <div class={getSwitchWrapperClass(disabled, isError || this.faceInvalid)}>
          <label class="switch-label" htmlFor={inputId}>
            <span class="switch-control">
              <input
                id={inputId}
                class={`switch-native${loading ? ' switch-native--loading' : ''}`}
                type="checkbox"
                role="switch"
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                required={required}
                aria-invalid={(isError || this.faceInvalid) ? 'true' : undefined}
                aria-describedby={describedBy || undefined}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <span
                class={getSwitchTrackClass(checked)}
                aria-hidden="true"
              >
                <span class="switch-thumb" aria-hidden="true" />
                {loading && (
                  <span class="switch-loading-overlay" aria-hidden="true">
                    <io-spinner size="sm" />
                  </span>
                )}
              </span>
            </span>
            <span class={this.hideLabel ? 'switch-text switch-text--sr-only' : 'switch-text'}>
              {label}
              {required && (
                <span class="switch-required" aria-hidden="true">
                  {' *'}
                </span>
              )}
            </span>
          </label>
        </div>
        {showErrorBlock && (
          <p id={errorId} class="switch-error" role="alert">
            {errorMessageToShow}
          </p>
        )}
        {!showErrorBlock && helperText && (
          <p id={helperId} class="switch-helper">
            {helperText}
          </p>
        )}
      </Host>
    );
  }
}
