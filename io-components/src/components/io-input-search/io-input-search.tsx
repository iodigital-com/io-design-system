import { Component, Prop, Event, EventEmitter, State, Watch, Element, Host, h, AttachInternals, Method } from '@stencil/core';

import { getInputSearchStyles } from './io-input-search-styles';
import { implicitSubmit } from '../../utils/form/implicit-submit';
import { applyAriaProp } from '../../utils/aria-prop';
import {
  renderErrorIcon,
  renderSuccessIcon,
  renderWarningIcon,
  buildInputWrapperClass,
  buildInputDescribedBy,
  renderInputMessageTree,
} from '../../utils/input-base';

import type { IoFieldState } from '../../utils/field-state';
import type { IoInputSearchSize } from './types';

/**
 * io-input-search
 * ================
 * Search input with a magnifier prefix icon and a clear button that appears
 * when the field has a value. Suppresses the browser's native clear button.
 *
 * @example
 * <io-input-search label="Search" name="q" placeholder="Search products…" />
 */
@Component({
  tag: 'io-input-search',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class IoInputSearch {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;
  private defaultValue = '';
  private faceErrorMessage = '';

  private inputId!: string;
  private errorId!: string;
  private helperId!: string;
  private nativeInputEl?: HTMLInputElement;

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Input name */
  @Prop() name: string | undefined;

  /** Current value */
  @Prop({ mutable: true }) value = '';

  /** Placeholder text */
  @Prop() placeholder: string | undefined;

  /** Marks the input as required */
  @Prop() required = false;

  /** Disables the input */
  @Prop({ reflect: true }) disabled = false;

  /** Makes the input read-only */
  @Prop({ reflect: true }) readOnly = false;

  /** Shows a loading indicator */
  @Prop() loading = false;

  /** Maximum number of characters allowed */
  @Prop() maxLength: number | undefined;

  /** Minimum number of characters required */
  @Prop() minLength: number | undefined;

  /** Validation state */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

  /** Validation message shown below the input */
  @Prop() message = '';

  /** Helper text shown below the input when no error */
  @Prop() helperText: string | undefined;

  /** Visually hides the label while keeping it accessible */
  @Prop({ reflect: true }) hideLabel = false;

  /** Field size aligned to io-button scale */
  @Prop({ reflect: true }) size: IoInputSearchSize = 'md';

  /** Native autocomplete attribute */
  @Prop() autocomplete = 'off';

  /** Accessible label for the clear button */
  @Prop() clearAriaLabel = 'Clear search';

  /**
   * Custom ARIA attributes to inject onto the native `<input>` element.
   * Keys may omit or include the `aria-` prefix — both forms are accepted.
   *
   * @example
   * <io-input-search .aria={{ label: 'Search products', autocomplete: 'list' }} label="Search" />
   */
  @Prop() aria?: Record<string, string>;

  /** Tracks whether the clear button should be visible */
  @State() private hasValue = false;

  @State() faceInvalid = false;
  @State() private touched = false;

  @Event() input!: EventEmitter<InputEvent>;
  @Event() change!: EventEmitter<string>;
  @Event() focus!: EventEmitter<FocusEvent>;
  @Event() blur!: EventEmitter<FocusEvent>;
  /** Fired when the user clicks the clear button */
  @Event() clear!: EventEmitter<void>;

  componentWillLoad() {
    const uid = Math.random().toString(36).slice(2);
    const base = this.name ? `io-input-search-${this.name.replace(/[^a-z0-9_-]+/gi, '-')}-${uid}` : `io-input-search-${uid}`;
    this.inputId = base;
    this.errorId = `${base}-error`;
    this.helperId = `${base}-helper`;
    this.defaultValue = this.value ?? '';
    this.hasValue = !!this.value;
    this.syncFormValue();
  }

  @Watch('value')
  onValueChange(newVal: string) {
    this.hasValue = !!newVal;
    this.syncFormValue();
  }

  @Watch('required')
  @Watch('maxLength')
  @Watch('minLength')
  onValidityAffectingPropChange() {
    this.syncFormValue();
  }

  @Watch('aria')
  onAriaChange() {
    applyAriaProp(this.aria, this.nativeInputEl ?? null);
  }

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
    const newValue = (ev.target as HTMLInputElement).value;
    this.value = newValue;
    this.hasValue = newValue.length > 0;
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

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.touched = true;
    this.syncFormValue();
    this.blur.emit(ev);
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

  private handleClear = () => {
    if (this.readOnly) return;
    this.value = '';
    this.hasValue = false;
    this.clear.emit();
    // Return focus to the input after clearing
    const nativeInput = this.el.shadowRoot?.querySelector<HTMLInputElement>('input');
    nativeInput?.focus();
  };

  render() {
    const { label, name, value, placeholder, required, disabled, readOnly, loading, state, message, helperText, hideLabel, size, autocomplete, clearAriaLabel, hasValue, maxLength, minLength } = this;
    const { inputId, errorId, helperId } = this;

    const showError = state === 'error';
    const showSuccess = state === 'success';
    const showWarning = state === 'warning';
    const showMessage = (showError || showSuccess || showWarning) && !!message;
    const showDescription = !showMessage && !!helperText;

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
      'input-field--has-prefix',
    ].filter(Boolean).join(' ');

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
        <style>{getInputSearchStyles()}</style>
        <div class={wrapperClass}>
          <div class="input-field-row">
            {/* Magnifier prefix icon — always visible */}
            <span class="search-prefix" aria-hidden="true">
              <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <input
              id={inputId}
              class={fieldClass}
              ref={(el?: HTMLInputElement) => {
                this.nativeInputEl = el;
                applyAriaProp(this.aria, el ?? null);
              }}
              type="search"
              name={name}
              value={value}
              placeholder={placeholder ?? ' '}
              required={required}
              disabled={disabled || loading}
              readOnly={readOnly}
              aria-readonly={readOnly ? 'true' : undefined}
              maxLength={maxLength}
              minLength={minLength}
              autocomplete={autocomplete}
              aria-invalid={(showError || (this.touched && this.faceInvalid)) ? 'true' : undefined}
              aria-describedby={describedBy}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {/* Clear button — only visible when there is a value */}
            <button
              type="button"
              class={`search-clear${hasValue ? '' : ' search-clear--hidden'}`}
              aria-label={clearAriaLabel}
              disabled={disabled || loading || undefined}
              onClick={this.handleClear}
              tabIndex={hasValue && !disabled && !loading ? 0 : -1}
            >
              <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
            </button>
            {showError && renderErrorIcon()}
            {showSuccess && renderSuccessIcon()}
            {showWarning && renderWarningIcon()}
          </div>
          <label htmlFor={inputId} class={hideLabel ? 'input-label input-label--sr-only' : `input-label input-label--has-prefix`}>
            {label}
            {required && <span class="input-required" aria-hidden="true"> *</span>}
          </label>
        </div>
        {...renderInputMessageTree({
          errorId,
          helperId,
          showError,
          showSuccess,
          showWarning,
          showMessage,
          message,
          showDescription,
          helperText,
          showFaceError,
          faceErrorId,
          faceErrorMessage: this.faceErrorMessage,
        })}
      </Host>
    );
  }
}
