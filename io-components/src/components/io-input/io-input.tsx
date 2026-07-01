import { Component, Prop, Event, EventEmitter, Method, State, Element, Host, Watch, AttachInternals, h } from '@stencil/core';

import { getInputStyles } from './io-input-styles';
import { resolveInputId } from './io-input-utils';
import { applyAriaProp } from '../../utils/aria-prop';
import type { IoIconName } from '../../utils/icons';
import { implicitSubmit } from '../../utils/form/implicit-submit';
import { syncFormState } from '../../utils/form/sync-form-state';
import { Required } from '../common/required/Required';
import { LoadingMessage } from '../../utils/common/loading-message';
import { renderErrorIcon, renderSuccessIcon, renderWarningIcon } from '../../utils/input-base';

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
  private descriptionId!: string;
  private loadingId!: string;
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

  /** Guards the loading live-region: set to true once loading has been true at least once */
  @State() private initialLoading = false;

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
  @Prop({ reflect: true }) readOnly = false;

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

  /** Screen-reader announcement while loading. Localizable. Defaults to "Loading". */
  @Prop() loadingDescription = 'Loading';

  /** Screen-reader announcement when loading completes. Localizable. Defaults to "Loading finished". */
  @Prop() loadingFinishedDescription = 'Loading finished';

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

  /**
   * Optional icon name to render as a leading indicator inside the prefix area.
   * When set, the icon is rendered before any slotted prefix content.
   * Accepts any valid IoIconName (a Lucide icon key).
   * @example indicator="search"
   */
  @Prop() indicator?: IoIconName;

  /**
   * When true and `type="number"`, renders custom increment/decrement stepper buttons
   * alongside the input. Also suppresses the native browser spin buttons.
   * @default false
   */
  @Prop({ reflect: true }) stepper = false;

  /**
   * Supplementary description rendered as a persistent `<p>` below the field.
   * Always visible, regardless of validation state. Distinct from `helperText`
   * (which is hidden in error state) and from the `slot="description"` slot
   * (which accepts rich HTML content).
   */
  @Prop() description: string | undefined;


  @Event() input!: EventEmitter<InputEvent>;
  @Event() change!: EventEmitter<string>;
  @Event() focus!: EventEmitter<FocusEvent>;
  @Event() blur!: EventEmitter<FocusEvent>;

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.inputId = resolveInputId(this.name, this.fallbackId);
    this.counterId = `io-input-counter-${++idCounter}`;
    this.descriptionId = `io-input-desc-${this.fallbackId}`;
    this.loadingId = `io-input-loading-${++idCounter}`;
    if (this.loading) this.initialLoading = true;
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

  @Watch('loading')
  onLoadingChange(newVal: boolean): void {
    if (newVal) this.initialLoading = true;
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
    const { label, type, name, value, placeholder, required, readOnly, disabled, state, message, helperText, description, maxLength, minLength, min, max, step, autocomplete, autoComplete, spellCheck, loading, counter, form, size, hasPrefix, hasSuffix, hideLabel, hasLabelSlot, hasDescriptionSlot, hasMessageSlot, inputMode, pattern, indicator, stepper } = this;
    const showIndicator = !!indicator;
    const showStepper = stepper && type === 'number';
    const { inputId, errorId, helperId } = this.getInputIds();

    const isDisabled = disabled || loading;
    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const showMessage = (showError || showSuccess || showWarning) && (hasMessageSlot || !!message);
    const showDescription = !showMessage && (hasDescriptionSlot || !!helperText);
    const showCounter = counter && maxLength != null;
    const counterSrId = `${this.counterId}-sr`;
    const describedBy = [
      showMessage ? errorId : '',
      showDescription ? helperId : '',
      showCounter ? counterSrId : '',
      description ? this.descriptionId : '',
      loading && this.initialLoading ? this.loadingId : '',
    ].filter(Boolean).join(' ') || undefined;
    const currentLength = (value ?? '').length;

    const wrapperClass = [
      'input-wrapper',
      showError ? 'input-wrapper--state-error' : '',
      showSuccess ? 'input-wrapper--state-success' : '',
      showWarning ? 'input-wrapper--state-warning' : '',
      isDisabled ? 'input-wrapper--disabled' : '',
      readOnly ? 'input-wrapper--readonly' : '',
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
              readOnly={readOnly}
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
              aria-readonly={readOnly ? 'true' : undefined}
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
            {showError && renderErrorIcon()}
            {showSuccess && renderSuccessIcon()}
            {showWarning && renderWarningIcon()}
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
        {description && (
          <p id={this.descriptionId} class="input-description">{description}</p>
        )}
        <LoadingMessage
          id={this.loadingId}
          loading={loading}
          initialLoading={this.initialLoading}
          loadingDescription={this.loadingDescription}
          loadingFinishedDescription={this.loadingFinishedDescription}
          class="input-loading-sr"
        />
      </Host>
    );
  }
}
