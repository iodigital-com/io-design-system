import { Component, Prop, Event, EventEmitter, Element, Host, Watch, Listen, AttachInternals, h } from '@stencil/core';

import { getRadioGroupStyles } from './io-radio-group-styles';

import type { IoRadioGroupChangeDetail, IoRadioGroupOrientation } from './types';

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
  formAssociated: true,
})
export class IoRadioGroup {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

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

  /** Layout orientation — 'vertical' (default) or 'horizontal' */
  @Prop({ reflect: true }) orientation: IoRadioGroupOrientation = 'vertical';

  // ── Private ───────────────────────────────────────────────────

  private errorId!: string;
  private defaultValue?: string;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when a radio in the group is selected */
  @Event() change!: EventEmitter<IoRadioGroupChangeDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    const suffix = Math.random().toString(36).slice(2);
    this.errorId = `io-rg-error-${suffix}`;
    this.defaultValue = this.value;
    this.internals?.setFormValue?.(this.value ?? '');
  }

  componentDidLoad() {
    this.syncChildren();
    this.updateTabStops();
  }

  @Watch('name')
  onNameChange() {
    this.syncChildren();
  }

  @Watch('value')
  onValueChange() {
    this.syncChildren();
    this.updateTabStops();
    this.internals?.setFormValue?.(this.value ?? '');
  }

  @Watch('disabled')
  onDisabledChange() {
    this.syncChildren();
  }

  @Watch('required')
  onRequiredChange() {
    this.syncChildren();
  }

  // ── FACE callbacks ────────────────────────────────────────────

  formResetCallback(): void {
    this.value = this.defaultValue ?? '';
    this.syncChildren();
    this.updateTabStops();
    this.internals?.setFormValue?.(this.value ?? '');
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
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

  /** ARIA APG roving tabindex: Arrow keys, Home, End navigate the group */
  @Listen('keydown')
  handleGroupKeydown(ev: KeyboardEvent): void {
    const radios = this.getRadios().filter(r => !r.disabled);
    if (!radios.length) return;

    const currentIndex = radios.findIndex(r => r === document.activeElement);
    let nextIndex = currentIndex;

    if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') {
      ev.preventDefault();
      nextIndex = (currentIndex + 1) % radios.length;
    } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
      ev.preventDefault();
      nextIndex = (currentIndex - 1 + radios.length) % radios.length;
    } else if (ev.key === 'Home') {
      ev.preventDefault();
      nextIndex = 0;
    } else if (ev.key === 'End') {
      ev.preventDefault();
      nextIndex = radios.length - 1;
    } else {
      return;
    }

    const target = radios[nextIndex];
    target.checked = true;
    target.tabIndex = 0;
    this.value = target.value;
    radios.forEach((r, i) => { if (i !== nextIndex) r.tabIndex = -1; });
    // Focus the target — setFocus() is defined on IoRadio, fall back to host focus
    (target as any).setFocus?.() || (target as HTMLElement).focus();
    this.change?.emit({ value: this.value });
  }

  private getRadios(): Array<HTMLElement & { value: string; checked: boolean; name: string; disabled: boolean; tabIndex: number; required: boolean }> {
    return Array.from(
      this.el.querySelectorAll<HTMLElement & { value: string; checked: boolean; name: string; disabled: boolean; tabIndex: number; required: boolean }>('io-radio'),
    );
  }

  private updateTabStops(): void {
    const radios = this.getRadios();
    radios.forEach((radio, i) => {
      // The checked radio (or first if none checked) gets tabindex=0
      const isActive = this.value !== undefined && this.value !== ''
        ? radio.value === this.value
        : i === 0;
      radio.tabIndex = isActive ? 0 : -1;
    });
  }

  private syncChildren = () => {
    const radios = this.getRadios();
    for (const radio of radios) {
      radio.name = this.name;
      radio.checked = radio.value === this.value;
      radio.required = this.required;
      // Fix: unconditionally assign disabled so re-enabling the group propagates correctly
      radio.disabled = this.disabled;
    }
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, disabled, helperText, error, errorMessage, orientation, required } = this;
    const fieldsetClass = error ? 'radio-group radio-group--error' : 'radio-group';
    const describedBy = error && errorMessage ? this.errorId : undefined;

    return (
      <Host>
        <style>{getRadioGroupStyles()}</style>
        <fieldset
          class={fieldsetClass}
          disabled={disabled}
          role="radiogroup"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          aria-orientation={orientation}
          aria-required={required ? 'true' : undefined}
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
          <p id={this.errorId} class="radio-group__error" aria-live="polite">
            {errorMessage}
          </p>
        )}
      </Host>
    );
  }
}
