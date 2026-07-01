import { Component, Prop, Event, EventEmitter, State, Watch, Element, Host, h, AttachInternals, Method } from '@stencil/core';

import { getInputDateStyles } from './io-input-date-styles';
import { hasShowPickerSupport } from '../../utils/has-show-picker-support';
import { implicitSubmit } from '../../utils/form/implicit-submit';
import { applyAriaProp } from '../../utils/aria-prop';
import {
  renderErrorIcon,
  renderSuccessIcon,
  renderWarningIcon,
  buildInputWrapperClass,
  buildInputDescribedBy,
} from '../../utils/input-base';

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
  private faceErrorMessage = '';
  private nativeInputEl: HTMLInputElement | null = null;

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
  @Prop({ reflect: true }) readOnly = false;

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

  /**
   * Accessible label for the calendar trigger button.
   * Defaults to 'Open date picker'. Override for localisation.
   */
  @Prop() pickerLabel = 'Open date picker';

  /**
   * Custom ARIA attributes to inject onto the native `<input>` element.
   * Keys may omit or include the `aria-` prefix — both forms are accepted.
   *
   * @example
   * <io-input-date .aria={{ describedby: 'date-hint' }} label="Birth date" />
   */
  @Prop() aria?: Record<string, string>;

  /** Native spellcheck attribute — passed through as-is */
  @Prop() spellCheck: boolean | undefined;

  @State() faceInvalid = false;
  @State() private touched = false;
  @State() private showPickerSupported = false;
  @State() private hasLabelSlot = false;
  @State() private hasDescriptionSlot = false;
  @State() private hasMessageSlot = false;

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
    this.showPickerSupported = hasShowPickerSupport();
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

  @Watch('aria')
  onAriaChange() {
    applyAriaProp(this.aria, this.nativeInputEl ?? null);
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
    if (this.disabled || this.readOnly) return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    this.value = (ev.target as HTMLInputElement).value;
    this.input.emit(ev);
  };

  private handleChange = (ev: Event) => {
    if (this.disabled || this.readOnly) return;
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

  private handlePickerTrigger = () => {
    if (this.disabled || this.loading || this.readOnly) return;
    this.nativeInputEl?.showPicker?.();
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    implicitSubmit(ev, this.internals, { disabled: this.disabled || this.loading, loading: false });
  };

  /**
   * @slot label - Custom label content. Replaces the plain-text `label` prop when rich markup is needed.
   * @slot description - Helper text content. Replaces the plain-text `helperText` prop when not in error state.
   * @slot message - Validation message content. Replaces the plain-text `message` prop in error/success/warning state.
   */
  render() {
    const { label, name, value, required, disabled, readOnly, loading, state, message, helperText, hideLabel, size, min, max, step, pickerLabel, hasLabelSlot, hasDescriptionSlot, hasMessageSlot } = this;
    const { inputId, errorId, helperId } = this;

    const showError = state === 'error';
    const showSuccess = state === 'success';
    const showWarning = state === 'warning';
    const showMessage = (showError || showSuccess || showWarning) && (hasMessageSlot || !!message);
    const showDescription = !showMessage && (hasDescriptionSlot || !!helperText);

    const showFaceError = this.touched && this.faceInvalid && !showError;
    const faceErrorId = `${inputId}-face-error`;

    const describedBy = buildInputDescribedBy(
      errorId,
      helperId,
      faceErrorId,
      showMessage,
      showDescription,
      showFaceError,
    );

    const wrapperClass = buildInputWrapperClass(state, this.faceInvalid, disabled, readOnly);

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
              ref={(el: HTMLInputElement | undefined) => {
                this.nativeInputEl = el ?? null;
                applyAriaProp(this.aria, el ?? null);
              }}
              type="date"
              name={name}
              value={value}
              required={required}
              disabled={disabled || loading}
              readOnly={readOnly}
              aria-readonly={readOnly ? 'true' : undefined}
              min={min}
              max={max}
              step={step}
              spellcheck={this.spellCheck}
              aria-invalid={(showError || (this.touched && this.faceInvalid)) ? 'true' : undefined}
              aria-describedby={describedBy}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
            />
            {/* Calendar icon — interactive trigger (supported) or decorative fallback */}
            {this.showPickerSupported ? (
              <button
                type="button"
                class="date-trigger"
                aria-label={pickerLabel}
                disabled={disabled || loading || readOnly}
                tabIndex={0}
                onClick={this.handlePickerTrigger}
              >
                <svg aria-hidden="true" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
              </button>
            ) : (
              <span class="date-suffix" aria-hidden="true">
                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
              </span>
            )}
            {showError && renderErrorIcon()}
            {showSuccess && renderSuccessIcon()}
            {showWarning && renderWarningIcon()}
          </div>
          {/* Label is permanently floated — date inputs always show a value placeholder */}
          <label htmlFor={inputId} class={hideLabel ? 'input-label input-label--sr-only' : 'input-label input-label--date-float'}>
            <span class={hasLabelSlot ? 'input-label__slot' : 'input-label__slot input-label__slot--hidden'}>
              <slot name="label" onSlotchange={this.handleLabelSlotChange} />
            </span>
            {!hasLabelSlot && (
              <span>
                {label}
                {required && <span class="input-required" aria-hidden="true"> *</span>}
              </span>
            )}
            {hasLabelSlot && required && <span class="input-required" aria-hidden="true"> *</span>}
          </label>
        </div>
        {showError && (
          <p id={errorId} class={`input-message input-message--error${showMessage ? '' : ' input-error--hidden'}`} role="alert">
            <span class={hasMessageSlot ? 'input-message__slot' : 'input-message__slot input-message__slot--hidden'}>
              <slot name="message" onSlotchange={this.handleMessageSlotChange} />
            </span>
            {!hasMessageSlot && message}
          </p>
        )}
        {showSuccess && (
          <p id={errorId} class={`input-message input-message--success${showMessage ? '' : ' input-error--hidden'}`} role="status">
            <span class={hasMessageSlot ? 'input-message__slot' : 'input-message__slot input-message__slot--hidden'}>
              <slot name="message" onSlotchange={this.handleMessageSlotChange} />
            </span>
            {!hasMessageSlot && message}
          </p>
        )}
        {showWarning && (
          <p id={errorId} class={`input-message input-message--warning${showMessage ? '' : ' input-error--hidden'}`} role="status">
            <span class={hasMessageSlot ? 'input-message__slot' : 'input-message__slot input-message__slot--hidden'}>
              <slot name="message" onSlotchange={this.handleMessageSlotChange} />
            </span>
            {!hasMessageSlot && message}
          </p>
        )}
        {showFaceError && (
          <p id={faceErrorId} class="input-message input-message--error" role="alert">
            {this.faceErrorMessage}
          </p>
        )}
        <p id={helperId} class={`input-helper${showDescription ? '' : ' input-helper--hidden'}`}>
          <span class={hasDescriptionSlot ? 'input-description__slot' : 'input-description__slot input-description__slot--hidden'}>
            <slot name="description" onSlotchange={this.handleDescriptionSlotChange} />
          </span>
          {!hasDescriptionSlot && helperText}
        </p>
      </Host>
    );
  }
}
