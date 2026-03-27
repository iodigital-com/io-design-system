import { Component, Prop, Event, EventEmitter, Method, Element, Host, h } from '@stencil/core';
import type { IoInputType } from './types';

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

  @Event() ioInput!: EventEmitter<InputEvent>;
  @Event() ioChange!: EventEmitter<string>;
  @Event() ioFocus!: EventEmitter<FocusEvent>;
  @Event() ioBlur!: EventEmitter<FocusEvent>;

  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const input = this.el.shadowRoot?.querySelector<HTMLInputElement>('input');
    input?.focus(options);
  }

  private handleInput = (ev: InputEvent) => {
    this.value = (ev.target as HTMLInputElement).value;
    this.ioInput.emit(ev);
  };

  private handleChange = (ev: Event) => {
    this.ioChange.emit((ev.target as HTMLInputElement).value);
  };

  private handleFocus = (ev: FocusEvent) => {
    this.ioFocus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    this.ioBlur.emit(ev);
  };

  render() {
    const { label, type, name, value, placeholder, required, disabled, error, errorMessage, helperText, maxLength, autocomplete } = this;
    const inputId = `io-input-${name || Math.random().toString(36).slice(2)}`;
    const errorId = `${inputId}-error`;

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
            aria-describedby={error && errorMessage ? errorId : undefined}
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
          <p class="input-helper">{helperText}</p>
        )}
      </Host>
    );
  }
}

function getInputStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* io brand: underline-only field — no box, no radius, no fill */
    .input-wrapper {
      position: relative;
      padding-top: var(--io-space-6);
    }

    .input-wrapper--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    /* Label: absolutely positioned over the padding-top area; floats up on value */
    .input-label {
      position: absolute;
      top: var(--io-space-1);
      left: 0;
      font-size: var(--io-label-font-size);
      font-weight: var(--io-label-font-weight);
      color: var(--io-text-secondary);
      pointer-events: none;
      transition: top var(--io-motion-base), font-size var(--io-motion-base);
    }

    /* Float label when input has a value — CSS sibling (input must precede label in DOM) */
    .input-field:not(:placeholder-shown) ~ .input-label {
      top: 0;
      font-size: var(--io-label-font-size-float);
    }

    .input-required {
      color: var(--io-color-error);
    }

    /* Border lives on the input itself, matching the source */
    .input-field {
      display: block;
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: var(--io-input-border-width) solid var(--io-text-primary);
      border-radius: 0;
      padding: var(--io-input-padding-y) var(--io-input-padding-right) var(--io-input-padding-y) 0;
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-primary);
      outline: none;
      box-sizing: border-box;
      min-height: var(--io-touch-target-min);
      transition: border-bottom-width var(--io-motion-fast), margin-top var(--io-motion-fast);
    }

    .input-field:focus {
      border-bottom-width: var(--io-input-border-width-focus);
      margin-top: -2px;
    }

    .input-field:focus-visible {
      outline: none;
      box-shadow: none;
    }

    .input-wrapper--error .input-field {
      border-bottom-color: var(--io-border-error);
    }

    .input-error-icon {
      position: absolute;
      bottom: var(--io-space-4);
      right: 0;
      pointer-events: none;
      color: var(--io-color-error);
      display: flex;
      align-items: center;
    }

    .input-error {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-color-error);
    }

    .input-helper {
      margin: var(--io-space-1) 0 0;
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
    }

    @media (prefers-reduced-motion: reduce) {
      .input-field,
      .input-label { transition: none; }
    }
  `;
}
