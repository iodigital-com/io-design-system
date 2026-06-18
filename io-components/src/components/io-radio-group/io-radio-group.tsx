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

  /** Shows a loading spinner overlay and blocks interaction */
  @Prop({ reflect: true }) loading = false;

  /** Puts the group in error state */
  @Prop({ reflect: true }) error = false;

  /** Error message shown below the group when error is true */
  @Prop() errorMessage: string | undefined;

  /** Helper text shown below the legend */
  @Prop() helperText = '';

  /** Layout orientation — 'vertical' (default) or 'horizontal' */
  @Prop({ reflect: true }) orientation: IoRadioGroupOrientation = 'vertical';

  /** Supplementary description shown below the legend for additional context */
  @Prop() description: string | undefined;

  // ── Private ───────────────────────────────────────────────────

  private errorId!: string;
  private descriptionId!: string;
  private defaultValue?: string;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when a radio in the group is selected */
  @Event() change!: EventEmitter<IoRadioGroupChangeDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    const suffix = Math.random().toString(36).slice(2);
    this.errorId = `io-rg-error-${suffix}`;
    this.descriptionId = `io-rg-desc-${suffix}`;
    this.defaultValue = this.value;
    this.syncFormValue();
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
    this.syncFormValue();
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
    this.syncFormValue();
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

    let currentIndex = radios.findIndex(r => r === document.activeElement);
    if (currentIndex === -1) {
      currentIndex = radios.findIndex(r => r.checked && !r.disabled);
      if (currentIndex === -1) currentIndex = radios.findIndex(r => !r.disabled);
      if (currentIndex === -1) return;
    }
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
    const targetEl = target as HTMLElement & { setFocus?(): void };
    if (typeof targetEl.setFocus === 'function') {
      targetEl.setFocus();
    } else {
      targetEl.focus();
    }
    this.change?.emit({ value: this.value });
  }

  private syncFormValue(): void {
    const hasValue = Boolean(this.value);
    this.internals?.setFormValue?.(hasValue ? this.value! : null);

    if (this.required && !hasValue) {
      this.internals?.setValidity?.(
        { valueMissing: true },
        'Please select an option.',
        this.el?.shadowRoot?.querySelector('input') ?? undefined,
      );
    } else {
      this.internals?.setValidity?.({});
    }
  }

  private getRadios(): Array<HTMLElement & { value: string; checked: boolean; name: string; disabled: boolean; tabIndex: number; required: boolean }> {
    return Array.from(
      this.el.querySelectorAll<HTMLElement & { value: string; checked: boolean; name: string; disabled: boolean; tabIndex: number; required: boolean }>('io-radio'),
    );
  }

  private updateTabStops(): void {
    const radios = this.getRadios();
    const active = radios.find(r => r.value === this.value && !r.disabled);
    const first = radios.find(r => !r.disabled);
    const target = active ?? first;
    radios.forEach(r => {
      r.tabIndex = (r === target && !r.disabled) ? 0 : -1;
    });
  }

  private syncChildren = () => {
    const radios = this.getRadios();
    radios.forEach(r => {
      r.disabled = this.disabled;
    });
    for (const radio of radios) {
      radio.name = this.name;
      radio.checked = radio.value === this.value;
      radio.required = this.required;
    }
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, disabled, loading, helperText, description, error, errorMessage, orientation, required } = this;
    const fieldsetClass = error ? 'radio-group radio-group--error' : 'radio-group';
    const describedBy = [
      error && errorMessage ? this.errorId : '',
      description ? this.descriptionId : '',
    ].filter(Boolean).join(' ') || undefined;

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
        <style>{getRadioGroupStyles()}</style>
        <div class="radio-group__wrapper" inert={loading ? true : undefined}>
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
            {description && (
              <p id={this.descriptionId} class="radio-group__description">{description}</p>
            )}
            {helperText && (
              <span class="radio-group__helper">{helperText}</span>
            )}
            <div class="radio-group__options">
              <slot onSlotchange={this.syncChildren} />
            </div>
          </fieldset>
          {loading && (
            <div class="radio-group__loading-overlay" aria-hidden="true">
              <io-spinner size="sm" />
            </div>
          )}
        </div>
        {error && errorMessage && (
          <p id={this.errorId} class="radio-group__error" aria-live="polite">
            {errorMessage}
          </p>
        )}
      </Host>
    );
  }
}
