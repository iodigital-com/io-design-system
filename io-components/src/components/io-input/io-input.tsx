import { Component, Prop, Event, EventEmitter, Method, State, Element, Host, Watch, AttachInternals, h } from '@stencil/core';

import { getInputStyles } from './io-input-styles';
import { resolveInputId } from './io-input-utils';
import { applyAriaProp } from '../../utils/aria-prop';

import type { IoFieldState } from '../../utils/field-state';
import type { IoInputType, IoInputSize, IoInputMode } from './types';

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
  private counterTimer?: ReturnType<typeof setTimeout>;

  @State() private announcedCounter = '';

  @State() private hasPrefix = false;
  @State() private hasSuffix = false;
  @State() private hasLabelSlot = false;
  @State() private hasDescriptionSlot = false;
  @State() private hasMessageSlot = false;

  /** Tracks FACE form validation invalidity; drives aria-invalid and error UI once field has been touched */
  @State() faceInvalid = false;

  /** True after the user has blurred the field at least once — gates eager FACE error display */
  @State() private touched = false;

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

  /** Native inputmode attribute — hints at the virtual keyboard type to show on mobile */
  @Prop() inputMode: IoInputMode = 'text';

  /** Native pattern attribute — regex that the input value must match for validity */
  @Prop() pattern?: string;

  /** Compact variant — reduces the field height and vertical padding for dense layouts */
  @Prop({ reflect: true }) compact = false;

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
    if (this.counter && this.maxLength != null) {
      const remaining = this.maxLength - (this.value ?? '').length;
      this.announcedCounter = `${remaining} characters remaining`;
    }
  }

  disconnectedCallback(): void {
    if (this.counterTimer) clearTimeout(this.counterTimer);
  }

  formResetCallback() {
    this.value = this.defaultValue;
    this.touched = false;
    this.syncFormValue();
    this.faceInvalid = false;
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    this.value = typeof state === 'string' ? state : '';
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

  @Watch('pattern')
  onPatternChange() {
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
    if (this.counter && this.maxLength != null) {
      if (this.counterTimer) clearTimeout(this.counterTimer);
      const remaining = this.maxLength - (this.value ?? '').length;
      this.counterTimer = setTimeout(() => {
        this.announcedCounter = `${remaining} characters remaining`;
      }, 1000);
    }
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
    this.touched = true;
    this.syncFormValue();
    this.blur.emit(ev);
  };

  /**
   * @slot prefix - Content placed before the input field. Typically an icon or short text.
   * @slot suffix - Content placed after the input field. Typically an icon, unit label, or action button.
   * @slot label - Custom label content. Replaces the plain-text `label` prop when rich markup is needed.
   * @slot message - Validation message content. Replaces the plain-text `message` prop in error state.
   * @slot description - Helper text content. Replaces the plain-text `helperText` prop when not in error state.
   */
  render() {
    const { label, type, name, value, placeholder, required, readonly, disabled, state, message, helperText, maxLength, minLength, min, max, step, autocomplete, autoComplete, spellCheck, loading, counter, form, size, hasPrefix, hasSuffix, hideLabel, hasLabelSlot, hasDescriptionSlot, hasMessageSlot, inputMode, pattern } = this;
    const { inputId, errorId, helperId } = this.getInputIds();

    const isDisabled = disabled || loading;
    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const showMessage = (showError || showSuccess || showWarning) && (hasMessageSlot || !!message);
    const showDescription = !showMessage && (hasDescriptionSlot || !!helperText);
    const showCounter = counter && maxLength != null;
    const counterSrId = `${this.counterId}-sr`;
    // #1094: errorId is always referenced so the live-region relationship is
    // established when the input receives focus, before any error occurs.
    // The <p> wrapper is rendered unconditionally; only its inner text is gated.
    const describedBy = [
      errorId,
      showDescription ? helperId : '',
      showCounter ? counterSrId : '',
    ].filter(Boolean).join(' ') || undefined;
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
              inputmode={inputMode}
              pattern={pattern}
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
        {/* #1094: Error live-region is always mounted so aria-describedby can
            reference it before any error occurs. The role/hidden class gate the
            announcement; only the inner text is conditionally rendered. */}
        <p
          id={errorId}
          class={[
            'input-message',
            showError ? 'input-message--error' : showSuccess ? 'input-message--success' : showWarning ? 'input-message--warning' : '',
            showMessage ? '' : 'input-error--hidden',
          ].filter(Boolean).join(' ')}
          role={showError ? 'alert' : showSuccess || showWarning ? 'status' : undefined}
          aria-live={showError ? 'assertive' : showSuccess || showWarning ? 'polite' : undefined}
          aria-atomic={showMessage ? 'true' : undefined}
        >
          {showMessage && (
            <span class={hasMessageSlot ? 'input-message__slot' : 'input-message__slot input-message__slot--hidden'}>
              <slot name="message" onSlotchange={this.handleMessageSlotChange} />
            </span>
          )}
          {showMessage && !hasMessageSlot && message}
        </p>
        <p id={helperId} class={`input-helper${showDescription ? '' : ' input-helper--hidden'}`}>
          <span class={hasDescriptionSlot ? 'input-description__slot' : 'input-description__slot input-description__slot--hidden'}>
            <slot name="description" onSlotchange={this.handleDescriptionSlotChange} />
          </span>
          {!hasDescriptionSlot && helperText}
        </p>
        {showCounter && (
          <div id={this.counterId} class="input-counter" aria-hidden="true">
            {currentLength} / {maxLength}
          </div>
        )}
        {showCounter && (
          <span id={counterSrId} class="input-counter-sr" aria-live="polite" aria-atomic="true">
            {this.announcedCounter}
          </span>
        )}
      </Host>
    );
  }
}
