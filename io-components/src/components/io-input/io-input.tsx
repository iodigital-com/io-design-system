import { Component, Prop, Event, EventEmitter, Method, State, Element, Host, Watch, AttachInternals, h } from '@stencil/core';

import { getInputStyles } from './io-input-styles';
import { resolveInputId } from './io-input-utils';
import { applyAriaProp } from '../../utils/aria-prop';

import type { IoFieldState } from '../../utils/field-state';
import type { IoInputType, IoInputSize } from './types';

let idCounter = 0;

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
  private counterId!: string;
  private defaultValue = '';
  private nativeInputEl?: HTMLInputElement;

  @State() private hasPrefix = false;
  @State() private hasSuffix = false;
  @State() private hasLabelSlot = false;
  @State() private hasDescriptionSlot = false;
  @State() private hasMessageSlot = false;

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

  /** Minimum number of characters; wired to native minlength and FACE tooShort validity */
  @Prop() minLength: number | undefined;

  /** Native minimum value (date/time/number) */
  @Prop() min: string | number | undefined;

  /** Native maximum value (date/time/number) */
  @Prop() max: string | number | undefined;

  /** Native step value (date/time/number) */
  @Prop() step: string | number | undefined;

  /** Autocomplete attribute (legacy — prefer autoComplete) */
  @Prop() autocomplete: string | undefined;

  /** Native autocomplete attribute (e.g. 'email', 'current-password', 'off') */
  @Prop() autoComplete: string | undefined;

  /** Native spellcheck attribute — passed through as-is */
  @Prop() spellCheck: boolean | undefined;

  /** Shows an inline spinner and disables the field while true */
  @Prop() loading = false;

  /** Shows {currentLength} / {maxLength} character counter below the field */
  @Prop() counter = false;

  /** Associates this element with a form by id — passed to the native input */
  @Prop() form: string | undefined;

  /** Visually hides the label while keeping it accessible to screen readers */
  @Prop({ reflect: true }) hideLabel = false;

  /**
   * Custom ARIA attributes to inject onto the native `<input>` element.
   * Keys may omit or include the `aria-` prefix — both forms are accepted.
   *
   * @example
   * // Sets aria-controls="suggestions-list" on the native <input>
   * <io-input .aria={{ controls: 'suggestions-list', autocomplete: 'list' }} label="Search" />
   */
  @Prop() aria?: Record<string, string>;

  @Event() input!: EventEmitter<InputEvent>;
  @Event() change!: EventEmitter<string>;
  @Event() focus!: EventEmitter<FocusEvent>;
  @Event() blur!: EventEmitter<FocusEvent>;

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.inputId = resolveInputId(this.name, this.fallbackId);
    this.counterId = `io-input-counter-${++idCounter}`;
    this.defaultValue = this.value ?? '';
    this.syncFormValue();
    if (this.hideLabel && !this.label) {
      console.warn('[io-input] hideLabel=true requires a non-empty label for accessibility.');
    }
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

  @Watch('minLength')
  onMinLengthChange() {
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

  @Watch('aria')
  onAriaChange() {
    applyAriaProp(this.aria, this.nativeInputEl ?? null);
  }

  private syncFormValue() {
    this.internals?.setFormValue?.(this.value ?? '');
    // Derive validity from the native <input> when available so constraints like
    // maxLength, minLength, min, max, step, and typeMismatch are reflected automatically.
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
    if (this.disabled || this.loading) {
      return;
    }
    this.value = (ev.target as HTMLInputElement).value;
    this.input.emit(ev);
  };

  private handleChange = (ev: Event) => {
    if (this.disabled || this.loading) {
      return;
    }
    this.change.emit((ev.target as HTMLInputElement).value);
  };

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled || this.loading) {
      return;
    }
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled || this.loading) {
      return;
    }
    this.blur.emit(ev);
  };

  render() {
    const { label, type, name, value, placeholder, required, readonly, disabled, state, message, helperText, maxLength, minLength, min, max, step, autocomplete, autoComplete, spellCheck, loading, counter, form, size, hasPrefix, hasSuffix, hideLabel, hasLabelSlot, hasDescriptionSlot, hasMessageSlot } = this;
    const { inputId, errorId, helperId } = this.getInputIds();

    const isDisabled = disabled || loading;
    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const hasState = showError || showSuccess || showWarning;
    const showMessage = showError && (hasMessageSlot || message);
    const showDescription = !showError && (hasDescriptionSlot || helperText);
    const describedBy = [
      showMessage ? errorId : '',
      showDescription ? helperId : '',
    ].filter(Boolean).join(' ') || undefined;

    const showCounter = counter && maxLength != null;
    const currentLength = (value ?? '').length;

    const wrapperClass = [
      'input-wrapper',
      showError ? 'input-wrapper--state-error' : '',
      showSuccess ? 'input-wrapper--state-success' : '',
      showWarning ? 'input-wrapper--state-warning' : '',
      isDisabled ? 'input-wrapper--disabled' : '',
      readonly ? 'input-wrapper--readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const fieldClass = [
      'input-field',
      `input-field--${size}`,
      hasPrefix ? 'input-field--has-prefix' : '',
      hasSuffix ? 'input-field--has-suffix' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
        <style>{getInputStyles()}</style>
        <div class={wrapperClass}>
          {/* Flex row: prefix slot, input, suffix slot / loading spinner, state icon */}
          <div class="input-field-row">
            <span class={`input-slot input-slot--prefix${hasPrefix ? '' : ' input-slot--hidden'}`}>
              <slot name="prefix" onSlotchange={this.handleSlotChange} />
            </span>
            <input
              id={inputId}
              class={fieldClass}
              ref={(el?: HTMLInputElement) => {
                this.nativeInputEl = el;
                applyAriaProp(this.aria, el ?? null);
              }}
              type={type}
              name={name}
              value={value}
              placeholder={placeholder ?? ' '}
              required={required}
              readOnly={readonly}
              disabled={isDisabled}
              maxLength={maxLength}
              minLength={minLength}
              min={min}
              max={max}
              step={step}
              autocomplete={autoComplete ?? autocomplete}
              spellcheck={spellCheck}
              form={form}
              aria-invalid={showError ? 'true' : undefined}
              aria-readonly={readonly ? 'true' : undefined}
              aria-describedby={describedBy}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {loading ? (
              <div class="input-wrapper__loading" aria-hidden="true">
                <io-spinner size="sm" />
              </div>
            ) : (
              <span class={`input-slot input-slot--suffix${hasSuffix ? '' : ' input-slot--hidden'}`}>
                <slot name="suffix" onSlotchange={this.handleSlotChange} />
              </span>
            )}
            {showError && (
              <div class="input-state-icon input-state-icon--error" aria-hidden="true">
                <svg width="1.5rem" height="1.5rem" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 3.667a.667.667 0 0 0-.667.666V7a.667.667 0 1 0 1.334 0V4.333A.667.667 0 0 0 7 3.667Zm.613 5.746a.507.507 0 0 0-.06-.12l-.08-.1a.667.667 0 0 0-.726-.14.767.767 0 0 0-.22.14.667.667 0 0 0-.14.727.6.6 0 0 0 .36.36.626.626 0 0 0 .506 0 .6.6 0 0 0 .36-.36.667.667 0 0 0 .054-.253.907.907 0 0 0 0-.134.427.427 0 0 0-.054-.12ZM7 .333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 7 .333Zm0 12A5.334 5.334 0 1 1 7 1.666a5.334 5.334 0 0 1 0 10.667Z"
                    fill="currentColor"
                  />
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
          <label htmlFor={inputId} class={hideLabel ? 'input-label input-label--sr-only' : 'input-label'}>
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
          <p id={errorId} class={`input-error${showMessage ? '' : ' input-error--hidden'}`} role="alert">
            <span class={hasMessageSlot ? 'input-message__slot' : 'input-message__slot input-message__slot--hidden'}>
              <slot name="message" onSlotchange={this.handleMessageSlotChange} />
            </span>
            {!hasMessageSlot && message}
          </p>
        )}
        {!showError && (
          <p id={helperId} class={`input-helper${showDescription ? '' : ' input-helper--hidden'}`}>
            <span class={hasDescriptionSlot ? 'input-description__slot' : 'input-description__slot input-description__slot--hidden'}>
              <slot name="description" onSlotchange={this.handleDescriptionSlotChange} />
            </span>
            {!hasDescriptionSlot && helperText}
          </p>
        )}
        {showCounter && (
          <div id={this.counterId} class="input-counter" aria-hidden="true">
            {currentLength} / {maxLength}
          </div>
        )}
      </Host>
    );
  }
}
