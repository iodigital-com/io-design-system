import { Component, Prop, Event, EventEmitter, Method, Element, Host, h } from '@stencil/core';
import type { IoTextareaResize } from './types';
import { getTextareaStyles } from './io-textarea-styles';

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
})
export class IoTextarea {
  @Element() el!: HTMLElement;

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

  /** Puts the textarea in error state */
  @Prop({ reflect: true }) error = false;

  /** Error message shown below */
  @Prop() errorMessage: string | undefined;

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

  /** Maximum number of characters */
  @Prop() maxLength: number | undefined;

  /** Visible rows (controls initial height) */
  @Prop() rows = 4;

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

  // ── Private ───────────────────────────────────────────────────

  private fieldId!: string;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.fieldId = `io-textarea-${this.name || Math.random().toString(36).slice(2)}`;
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleInput = (ev: InputEvent) => {
    const textarea = ev.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.input.emit(ev);

    if (this.resize === 'auto') {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  private handleChange = (ev: Event) => {
    this.change.emit((ev.target as HTMLTextAreaElement).value);
  };

  private handleFocus = (ev: FocusEvent) => {
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    this.blur.emit(ev);
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, name, value, placeholder, required, disabled, error, errorMessage, helperText, maxLength, rows, autocomplete, resize } = this;
    const textareaId = this.fieldId;
    const errorId = `${textareaId}-error`;

    return (
      <Host>
        <style>{getTextareaStyles()}</style>
        <div class={`textarea-wrapper${error ? ' textarea-wrapper--error' : ''}${disabled ? ' textarea-wrapper--disabled' : ''}`}>
          <textarea
            id={textareaId}
            class={`textarea-field textarea-field--resize-${resize}`}
            name={name}
            placeholder={placeholder ?? ' '}
            value={value}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
            autocomplete={autocomplete}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error && errorMessage ? errorId : undefined}
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
        {error && errorMessage && (
          <p id={errorId} class="textarea-error" role="alert">
            {errorMessage}
          </p>
        )}
        {!error && helperText && <p class="textarea-helper">{helperText}</p>}
      </Host>
    );
  }
}
