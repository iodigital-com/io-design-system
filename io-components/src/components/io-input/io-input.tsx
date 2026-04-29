import { Component, Prop, Event, EventEmitter, Method, Element, Host, Watch, h } from '@stencil/core';
import type { IoInputType } from './types';
import { getInputStyles } from './io-input-styles';
import { resolveInputId } from './io-input-utils';

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
})
export class IoInput {
  @Element() el!: HTMLElement;

  private fallbackId!: string;
  private inputId!: string;

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Input type */
  @Prop() type: IoInputType = 'text';

  /** Input name */
  @Prop() name: string | undefined;

  /** Current value */
  @Prop({ mutable: true }) value = '';

  /** Placeholder — shown when no value and label is resting */
  @Prop() placeholder: string | undefined;

  /** Marks the input as required */
  @Prop() required = false;

  /** Disables the input */
  @Prop({ reflect: true }) disabled = false;

  /** Puts the input in error state */
  @Prop({ reflect: true }) error = false;

  /** Error message shown below the input */
  @Prop() errorMessage: string | undefined;

  /** Helper text shown below the input (replaces error when no error) */
  @Prop() helperText: string | undefined;

  /** Max length */
  @Prop() maxLength: number | undefined;

  /** Autocomplete attribute */
  @Prop() autocomplete: string | undefined;

  @Event() input!: EventEmitter<InputEvent>;
  @Event() change!: EventEmitter<string>;
  @Event() focus!: EventEmitter<FocusEvent>;
  @Event() blur!: EventEmitter<FocusEvent>;

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.inputId = resolveInputId(this.name, this.fallbackId);
  }

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

  private handleInput = (ev: InputEvent) => {
    if (this.disabled) {
      return;
    }
    this.value = (ev.target as HTMLInputElement).value;
    this.input.emit(ev);
  };

  private handleChange = (ev: Event) => {
    if (this.disabled) {
      return;
    }
    this.change.emit((ev.target as HTMLInputElement).value);
  };

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled) {
      return;
    }
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled) {
      return;
    }
    this.blur.emit(ev);
  };

  render() {
    const { label, type, name, value, placeholder, required, disabled, error, errorMessage, helperText, maxLength, autocomplete } = this;
    const { inputId, errorId, helperId } = this.getInputIds();

    const describedBy = [
      error && errorMessage ? errorId : '',
      !error && helperText ? helperId : '',
    ].filter(Boolean).join(' ') || undefined;

    return (
      <Host>
        <style>{getInputStyles()}</style>
        <div class={`input-wrapper${error ? ' input-wrapper--error' : ''}${disabled ? ' input-wrapper--disabled' : ''}`}>
          <input
            id={inputId}
            class="input-field"
            type={type}
            name={name}
            value={value}
            placeholder={placeholder ?? ' '}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            autocomplete={autocomplete}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
            onInput={this.handleInput}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          <label htmlFor={inputId} class="input-label">
            {label}
            {required && <span class="input-required" aria-hidden="true"> *</span>}
          </label>
          {error && (
            <div class="input-error-icon" aria-hidden="true">
              <svg width="1.5rem" height="1.5rem" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 3.667a.667.667 0 0 0-.667.666V7a.667.667 0 1 0 1.334 0V4.333A.667.667 0 0 0 7 3.667Zm.613 5.746a.507.507 0 0 0-.06-.12l-.08-.1a.667.667 0 0 0-.726-.14.767.767 0 0 0-.22.14.667.667 0 0 0-.14.727.6.6 0 0 0 .36.36.626.626 0 0 0 .506 0 .6.6 0 0 0 .36-.36.667.667 0 0 0 .054-.253.907.907 0 0 0 0-.134.427.427 0 0 0-.054-.12ZM7 .333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 7 .333Zm0 12A5.334 5.334 0 1 1 7 1.666a5.334 5.334 0 0 1 0 10.667Z" fill="currentColor" />
              </svg>
            </div>
          )}
        </div>
        {error && errorMessage && (
          <p id={errorId} class="input-error" role="alert">{errorMessage}</p>
        )}
        {!error && helperText && (
          <p id={helperId} class="input-helper">{helperText}</p>
        )}
      </Host>
    );
  }
}
