import { Component, Prop, Event, EventEmitter, Method, Element, Host, h } from '@stencil/core';
import type { IoRadioChangeDetail } from './types';
import { getRadioStyles } from './io-radio-styles';

/**
 * io-radio
 * =========
 * Custom-styled radio button with label, helper text, and error state.
 * Use multiple io-radio components with the same `name` to form a radio group.
 *
 * @example
 * <io-radio label="Option A" name="choice" value="a" />
 * <io-radio label="Option B" name="choice" value="b" checked />
 * <io-radio label="Required" name="req" required error error-message="Please select an option" />
 */
@Component({
  tag: 'io-radio',
  shadow: { delegatesFocus: true },
})
export class IoRadio {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Input name — share across radio group */
  @Prop() name: string | undefined;

  /** Value submitted with the form */
  @Prop() value = '';

  /** Checked state */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Marks the field as required */
  @Prop() required = false;

  /** Disables the radio button */
  @Prop({ reflect: true }) disabled = false;

  /** Puts the radio in error state */
  @Prop({ reflect: true }) error = false;

  /** Error message shown below the radio */
  @Prop() errorMessage: string | undefined;

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the checked state changes */
  @Event() ioChange!: EventEmitter<IoRadioChangeDetail>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the radio */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const input = this.el.shadowRoot?.querySelector<HTMLInputElement>('input');
    input?.focus(options);
  }

  // ── Private ───────────────────────────────────────────────────

  private fieldId!: string;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.fieldId = `io-radio-${this.name || Math.random().toString(36).slice(2)}`;
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleChange = (ev: Event) => {
    const input = ev.target as HTMLInputElement;
    this.checked = input.checked;
    this.ioChange.emit({ checked: input.checked, value: this.value });
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, name, value, checked, required, disabled, error, errorMessage, helperText } = this;
    const inputId = this.fieldId;
    const errorId = `${inputId}-error`;

    return (
      <Host>
        <style>{getRadioStyles()}</style>
        <div class={`radio-wrapper${disabled ? ' radio-wrapper--disabled' : ''}${error ? ' radio-wrapper--error' : ''}`}>
          <label class="radio-label" htmlFor={inputId}>
            <span class="radio-control">
              <input
                id={inputId}
                class="radio-native"
                type="radio"
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                required={required}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error && errorMessage ? errorId : undefined}
                onChange={this.handleChange}
              />
              <span
                class={`radio-custom${checked ? ' radio-custom--checked' : ''}`}
                aria-hidden="true"
              >
                <span class="radio-dot" />
              </span>
            </span>
            <span class="radio-text">
              {label}
              {required && (
                <span class="radio-required" aria-hidden="true">
                  {' *'}
                </span>
              )}
            </span>
          </label>
        </div>
        {error && errorMessage && (
          <p id={errorId} class="radio-error" role="alert">
            {errorMessage}
          </p>
        )}
        {!error && helperText && <p class="radio-helper">{helperText}</p>}
      </Host>
    );
  }
}
