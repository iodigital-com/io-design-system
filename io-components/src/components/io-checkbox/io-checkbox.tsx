import { Component, Prop, Event, EventEmitter, Listen, Method, Element, Host, Watch, State, AttachInternals, h } from '@stencil/core';

import { getCheckboxStyles } from './io-checkbox-styles';
import { resolveCheckboxId, getCheckboxWrapperClass, getCheckboxCustomClass } from './io-checkbox-utils';

import type { IoFieldState } from '../../utils/field-state';
import type { IoCheckboxBlurEventDetail, IoCheckboxChangeDetail } from './types';

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

  /** Value submitted with the form when checked — matches native HTML checkbox default (RFC 1866) */
  @Prop() value = 'on';

  /** Checked state */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Indeterminate state — renders a dash instead of a checkmark */
  @Prop({ mutable: true }) indeterminate = false;

  /** Marks the field as required */
  @Prop() required = false;

  /** Disables the checkbox */
  @Prop({ mutable: true, reflect: true }) disabled = false;

  /** Validation state — controls border color and message color */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

  /** Validation message shown below the checkbox (used for error, success, and warning states) */
  @Prop() message = '';

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

  /** Shows a loading spinner replacing the checkbox visual and disables interaction */
  @Prop({ reflect: true }) loading = false;

  /** Associates this field with a <form> element by ID — enables out-of-DOM form participation */
  @Prop({ reflect: true }) form?: string;

  /** Visually hides the label while keeping it accessible to screen readers */
  @Prop({ reflect: true }) hideLabel = false;

  /** Dense layout mode — reduces checkbox size and label gap */
  @Prop({ reflect: true }) compact = false;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the checked state changes */
  @Event({ bubbles: true, composed: true }) change!: EventEmitter<IoCheckboxChangeDetail>;

  /** Fires when the inner input loses focus — required by form libraries for touched/dirty tracking */
  @Event({ bubbles: false, composed: true }) blur!: EventEmitter<IoCheckboxBlurEventDetail>;

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

  @State() private hasLabelSlot = false;
  @State() private hasDescriptionSlot = false;
  @State() private hasMessageSlot = false;

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
    if (this.hideLabel && !this.label) {
      console.warn('[io-checkbox] hideLabel=true requires a non-empty label for accessibility.');
    }
  }

  connectedCallback() {
    const hasLabelProp = this.label?.trim();
    const hasAriaLabel = this.el.getAttribute('aria-label')?.trim();
    const hasAriaLabelledBy = this.el.getAttribute('aria-labelledby')?.trim();
    const hasLabelSlot = !!this.el.querySelector('[slot="label"]');
    if (!hasLabelProp && !hasAriaLabel && !hasAriaLabelledBy && !hasLabelSlot) {
      console.error(`[io-checkbox] Missing accessible label. Provide label prop, aria-label, aria-labelledby, or slot="label".`);
    }
  }

  componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return newVal !== oldVal;
  }

  formResetCallback() {
    this.checked = this.defaultChecked;
    this.indeterminate = false;
    this.syncFormValue();
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formStateRestoreCallback(state: string | null) {
    this.checked = state !== null;
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

  @Watch('indeterminate')
  onIndeterminateChange() {
    this.syncFormValue();
  }

  private syncFormValue() {
    // Unchecked checkbox: null = excluded from FormData (matches native checkbox behaviour)
    // Indeterminate state does not affect form value or validity — only checked/unchecked matters.
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

  private handleLabelSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasLabelSlot = slot.assignedElements().length > 0;
  };

  private handleDescriptionSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasDescriptionSlot = slot.assignedElements().length > 0;
  };

  private handleMessageSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasMessageSlot = slot.assignedElements().length > 0;
  };

  // ── Handlers ─────────────────────────────────────────────────

  private handleChange = (ev: Event) => {
    if (this.disabled || this.loading) return;
    const input = ev.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    this.change.emit({ checked: input.checked, value: this.value });
  };

  private onBlur = (ev: FocusEvent) => {
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    this.blur.emit(ev);
  };

  @Listen('keydown')
  handleKeydown(ev: KeyboardEvent) {
    if ((ev.key === ' ' || ev.key === 'Spacebar') && (this.disabled || this.loading)) {
      ev.preventDefault();
    }
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, name, value, checked, indeterminate, required, disabled, loading, state, message, helperText, form, hideLabel, hasLabelSlot, hasDescriptionSlot, hasMessageSlot } = this;
    const isDisabled = disabled || loading;
    const inputId = this.fieldId;
    const messageId = `${inputId}-message`;
    const helperId = `${inputId}-helper`;
    const faceErrorId = `${inputId}-face-error`;

    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const hasState = showError || showSuccess || showWarning;
    const showFaceError = this.faceInvalid && state !== 'error';
    const showMessage = showError && (hasMessageSlot || message);

    const describedBy = [
      !hasState && !showFaceError && (hasDescriptionSlot || helperText) ? helperId : null,
      hasState && (hasMessageSlot || message) ? messageId : null,
      showFaceError ? faceErrorId : null,
    ]
      .filter((id): id is string => Boolean(id))
      .join(' ');

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
        <style>{getCheckboxStyles()}</style>
        <div class={getCheckboxWrapperClass(isDisabled, showError, showSuccess, showWarning, loading)}>
          <label class="checkbox-label" htmlFor={inputId}>
            <span class="checkbox-control">
              <input
                id={inputId}
                class="checkbox-native"
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                disabled={isDisabled}
                required={required}
                form={form}
                aria-invalid={showError ? 'true' : undefined}
                aria-disabled={loading ? 'true' : undefined}
                aria-describedby={describedBy || undefined}
                onChange={this.handleChange}
                onBlur={this.onBlur}
              />
              {loading ? (
                <span class="checkbox-custom-spinner" aria-hidden="true">
                  <io-spinner size="sm" />
                </span>
              ) : (
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
              )}
            </span>
            <span class={hideLabel ? 'checkbox-text checkbox-text--sr-only' : 'checkbox-text'}>
              <span class={hasLabelSlot ? 'checkbox-label__slot' : 'checkbox-label__slot checkbox-label__slot--hidden'}>
                <slot name="label" onSlotchange={this.handleLabelSlotChange} />
              </span>
              {!hasLabelSlot && label}
              {required && (
                <span class="checkbox-required" aria-hidden="true">
                  {' *'}
                </span>
              )}
            </span>
          </label>
        </div>
        {showError && (
          <p id={messageId} class={`checkbox-message checkbox-message--error${showMessage ? '' : ' checkbox-message--hidden'}`} role="alert">
            <span class={hasMessageSlot ? 'checkbox-message__slot' : 'checkbox-message__slot checkbox-message__slot--hidden'}>
              <slot name="message" onSlotchange={this.handleMessageSlotChange} />
            </span>
            {!hasMessageSlot && message}
          </p>
        )}
        {(showSuccess || showWarning) && message && (
          <p id={messageId} class={`checkbox-message checkbox-message--${showSuccess ? 'success' : 'warning'}`} role="status">
            {message}
          </p>
        )}
        {showFaceError && (
          <p id={faceErrorId} class="checkbox-message checkbox-message--error" role="alert">
            Please check this box
          </p>
        )}
        {!hasState && !this.faceInvalid && (
          <p id={helperId} class={`checkbox-helper${hasDescriptionSlot || helperText ? '' : ' checkbox-helper--hidden'}`}>
            <span class={hasDescriptionSlot ? 'checkbox-description__slot' : 'checkbox-description__slot checkbox-description__slot--hidden'}>
              <slot name="description" onSlotchange={this.handleDescriptionSlotChange} />
            </span>
            {!hasDescriptionSlot && helperText}
          </p>
        )}
      </Host>
    );
  }
}
