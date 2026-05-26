import { Component, Prop, Event, EventEmitter, Method, State, Element, Host, Watch, AttachInternals, h } from '@stencil/core';

import { getTextareaStyles } from './io-textarea-styles';
import { resolveTextareaId, getTextareaWrapperClass, getTextareaFieldClass } from './io-textarea-utils';

import type { IoFieldState } from '../../utils/field-state';
import type { IoTextareaResize, IoTextareaSize } from './types';

/**
 * io-textarea
 * ============
 * Multi-line text input with label, helper text, and error state.
 * Uses a full border (not underline-only) for better spatial clarity.
 *
 * @example
 * <io-textarea label="Message" rows={4} />
 * <io-textarea label="Bio" resize="auto" placeholder="Tell us about yourself..." />
 * <io-textarea label="Comments" error error-message="This field is required" />
 */
@Component({
  tag: 'io-textarea',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class IoTextarea {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  // ── Props ─────────────────────────────────────────────────────

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Textarea name */
  @Prop() name: string | undefined;

  /** Current value */
  @Prop({ mutable: true }) value = '';

  /** Placeholder text shown when empty */
  @Prop() placeholder: string | undefined;

  /** Marks the field as required */
  @Prop() required = false;

  /** Disables the textarea */
  @Prop({ reflect: true }) disabled = false;

  /** Validation state — controls border color, icon, and message color */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

  /** Validation message shown below (used for error, success, and warning states) */
  @Prop() message = '';

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

  /** Maximum number of characters */
  @Prop() maxLength: number | undefined;

  /** Visible rows (controls initial height) */
  @Prop() rows = 4;

  /** Field size aligned to io-button scale */
  @Prop({ reflect: true }) size: IoTextareaSize = 'md';

  /** Autocomplete attribute */
  @Prop() autocomplete: string | undefined;

  /**
   * Resize behaviour.
   * - 'none':     not resizable
   * - 'vertical': user can drag to resize vertically
   * - 'auto':     textarea grows automatically with content
   */
  @Prop() resize: IoTextareaResize = 'vertical';

  // ── Events ────────────────────────────────────────────────────

  /** Fires on every keystroke — raw InputEvent */
  @Event() input!: EventEmitter<InputEvent>;

  /** Fires on change — payload is the current string value */
  @Event() change!: EventEmitter<string>;

  /** Fires when the textarea gains focus */
  @Event() focus!: EventEmitter<FocusEvent>;

  /** Fires when the textarea loses focus */
  @Event() blur!: EventEmitter<FocusEvent>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the textarea */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const textarea = this.el.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');
    textarea?.focus(options);
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
  private defaultValue = '';

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.fieldId = resolveTextareaId(this.name, this.fallbackId);
    this.defaultValue = this.value ?? '';
    this.syncFormValue();
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

  private syncFormValue() {
    this.internals?.setFormValue?.(this.value ?? '');
    // Derive validity from the native <textarea> when available so constraints like
    // maxLength (tooLong) are reflected automatically — matches native behaviour.
    // Falls back to required-only check before the shadow root exists.
    const nativeTextarea = this.el?.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');
    if (nativeTextarea) {
      if (!nativeTextarea.checkValidity()) {
        this.internals?.setValidity?.(nativeTextarea.validity, nativeTextarea.validationMessage, nativeTextarea);
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

  // ── Handlers ─────────────────────────────────────────────────

  private handleInput = (ev: InputEvent) => {
    if (this.disabled) return;
    const textarea = ev.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.input.emit(ev);

    if (this.resize === 'auto') {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  private handleChange = (ev: Event) => {
    if (this.disabled) return;
    this.change.emit((ev.target as HTMLTextAreaElement).value);
  };

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.blur.emit(ev);
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, name, value, placeholder, required, disabled, state, message, helperText, maxLength, rows, autocomplete, resize, size } = this;
    const textareaId = this.fieldId;
    const messageId = `${textareaId}-message`;
    const helperId = `${textareaId}-helper`;

    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const hasState = showError || showSuccess || showWarning;

    const describedBy = [
      hasState && message ? messageId : '',
      !hasState && helperText ? helperId : '',
    ].filter(Boolean).join(' ') || undefined;

    return (
      <Host>
        <style>{getTextareaStyles()}</style>
        <div class={getTextareaWrapperClass(showError, showSuccess, showWarning, disabled)}>
          <textarea
            id={textareaId}
            class={getTextareaFieldClass(resize, size)}
            name={name}
            placeholder={placeholder ?? ' '}
            value={value}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
            autocomplete={autocomplete}
            aria-invalid={showError ? 'true' : undefined}
            aria-describedby={describedBy}
            onInput={this.handleInput}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          <label htmlFor={textareaId} class="textarea-label">
            {label}
            {required && (
              <span class="textarea-required" aria-hidden="true">
                {' *'}
              </span>
            )}
          </label>
        </div>
        {hasState && message && (
          <p id={messageId} class={`textarea-message textarea-message--${showError ? 'error' : showSuccess ? 'success' : 'warning'}`} role="alert">
            {message}
          </p>
        )}
        {!hasState && helperText && (
          <p id={helperId} class="textarea-helper">{helperText}</p>
        )}
      </Host>
    );
  }
}
