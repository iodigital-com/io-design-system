import { Component, Prop, Event, EventEmitter, Element, Host, Watch, Listen, h } from '@stencil/core';

import { getRadioGroupStyles } from './io-radio-group-styles';

import type { IoRadioGroupChangeDetail } from './types';

/**
 * io-radio-group
 * ===============
 * Wraps io-radio buttons in a semantic fieldset/legend and automatically
 * propagates the `name` prop and `checked` state to all slotted children.
 *
 * @example
 * <io-radio-group label="Preferred contact" name="contact" value="email">
 *   <io-radio label="Email" value="email" />
 *   <io-radio label="Phone" value="phone" />
 * </io-radio-group>
 */
@Component({
  tag: 'io-radio-group',
  shadow: true,
})
export class IoRadioGroup {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Legend text — required for accessibility */
  @Prop() label!: string;

  /** Name propagated to all slotted io-radio children */
  @Prop() name!: string;

  /** Currently selected value */
  @Prop({ mutable: true }) value = '';

  /** Marks the group as required */
  @Prop() required = false;

  /** Disables the entire group */
  @Prop({ reflect: true }) disabled = false;

  /** Puts the group in error state */
  @Prop({ reflect: true }) error = false;

  /** Error message shown below the group when error is true */
  @Prop() errorMessage: string | undefined;

  /** Helper text shown below the legend */
  @Prop() helperText = '';

  // ── Private ───────────────────────────────────────────────────

  private errorId!: string;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when a radio in the group is selected */
  @Event() change!: EventEmitter<IoRadioGroupChangeDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    const suffix = Math.random().toString(36).slice(2);
    this.errorId = `io-rg-error-${suffix}`;
  }

  componentDidLoad() {
    this.syncChildren();
  }

  @Watch('name')
  onNameChange() {
    this.syncChildren();
  }

  @Watch('value')
  onValueChange() {
    this.syncChildren();
  }

  @Watch('disabled')
  onDisabledChange() {
    this.syncChildren();
  }

  // ── Event Handlers ────────────────────────────────────────────

  /**
   * Listen for the 'change' event bubbled from io-radio children.
   * Capture phase is used so we intercept before the event propagates further.
   */
  @Listen('change', { capture: false })
  handleRadioChange(ev: Event) {
    const radio = ev.target as HTMLElement & { value?: string };
    if (radio && radio.tagName?.toLowerCase() === 'io-radio') {
      const newValue = radio.value ?? '';
      this.value = newValue;
      this.change.emit({ value: newValue });
    }
  }

  // ── Private helpers ───────────────────────────────────────────

  private syncChildren = () => {
    const radios = Array.from(
      this.el.querySelectorAll<HTMLElement & { name: string; checked: boolean; disabled: boolean; value: string }>('io-radio'),
    );
    for (const radio of radios) {
      radio.name = this.name;
      radio.checked = radio.value === this.value;
      if (this.disabled) {
        radio.disabled = true;
      }
    }
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, disabled, helperText, error, errorMessage } = this;
    const fieldsetClass = error ? 'radio-group radio-group--error' : 'radio-group';
    const describedBy = error && errorMessage ? this.errorId : undefined;

    return (
      <Host>
        <style>{getRadioGroupStyles()}</style>
        <fieldset
          class={fieldsetClass}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
        >
          <legend class="radio-group__legend">{label}</legend>
          {helperText && (
            <span class="radio-group__helper">{helperText}</span>
          )}
          <div class="radio-group__options">
            <slot onSlotchange={this.syncChildren} />
          </div>
        </fieldset>
        {error && errorMessage && (
          <p id={this.errorId} class="radio-group__error" role="alert">
            {errorMessage}
          </p>
        )}
      </Host>
    );
  }
}
