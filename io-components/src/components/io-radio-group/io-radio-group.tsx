import { Component, Prop, Event, EventEmitter, Element, Host, Watch, Listen, AttachInternals, h } from '@stencil/core';

import { getRadioGroupStyles } from './io-radio-group-styles';

import type { IoFieldState } from '../../utils/field-state';
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
  @Prop() name: string | undefined;

  /** Currently selected value */
  @Prop({ mutable: true }) value = '';

  /** Marks the group as required */
  @Prop() required = false;

  /** Disables the entire group */
  @Prop({ reflect: true }) disabled = false;

  /** Shows a loading spinner overlay and blocks interaction */
  @Prop({ reflect: true }) loading = false;

  /**
   * Validation state — controls border/message color.
   * Mirrors the Wave-XI IoFieldState API used by all child io-radio components.
   * Propagated to children via syncChildren().
   */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

  /**
   * Validation/helper message shown below the group.
   * Replaces the legacy errorMessage prop when state is set explicitly.
   */
  @Prop() message = '';

  /**
   * @deprecated Use `error={true}` with `state="error"` instead.
   * Kept for one minor cycle for backwards compatibility.
   * Puts the group in error state.
   */
  @Prop({ reflect: true }) error = false;

  /**
   * @deprecated Use `message` instead.
   * Kept for one minor cycle for backwards compatibility.
   * Error message shown below the group when error is true.
   */
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
  private legendId!: string;
  private defaultValue?: string;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when a radio in the group is selected */
  @Event() change!: EventEmitter<IoRadioGroupChangeDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    const suffix = Math.random().toString(36).slice(2);
    this.errorId = `io-rg-error-${suffix}`;
    this.descriptionId = `io-rg-desc-${suffix}`;
    this.legendId = `io-rg-legend-${suffix}`;
    this.defaultValue = this.value;
    if (!this.name) {
      console.error('[io-radio-group] The "name" prop is required for form participation and accessibility. Provide a unique name for this group.');
    }
    const isProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;
    if (!isProd && this.error) {
      console.warn('[io-radio-group] The "error" prop is deprecated. Use state="error" instead.');
    }
    if (!isProd && this.errorMessage !== undefined) {
      console.warn('[io-radio-group] The "errorMessage" prop is deprecated. Use the "message" prop instead.');
    }
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

  @Watch('state')
  onStateChange() {
    this.syncChildren();
  }

  @Watch('error')
  onErrorChange() {
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

  formStateRestoreCallback(state: string | null): void {
    this.value = state ?? '';
    this.syncChildren();
    this.updateTabStops();
    this.syncFormValue();
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

  private getRadios(): Array<HTMLElement & { value: string; checked: boolean; name: string; disabled: boolean; tabIndex: number; required: boolean; state: IoFieldState }> {
    return Array.from(
      this.el.querySelectorAll<HTMLElement & { value: string; checked: boolean; name: string; disabled: boolean; tabIndex: number; required: boolean; state: IoFieldState }>('io-radio'),
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
    // Resolve the effective state: explicit state prop takes precedence;
    // legacy error=true maps to 'error' for one-cycle backwards compat.
    const effectiveState: IoFieldState = this.state !== 'none' ? this.state : (this.error ? 'error' : 'none');
    radios.forEach(r => {
      r.disabled = this.disabled;
    });
    for (const radio of radios) {
      if (this.name !== undefined) {
        radio.name = this.name;
      }
      radio.checked = radio.value === this.value;
      radio.required = this.required;
      radio.state = effectiveState;
    }
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, disabled, loading, helperText, description, error, errorMessage, orientation, required, state, message } = this;
    // Resolve effective error/message: new state API takes precedence over legacy error prop.
    const effectiveError = state === 'error' || error;
    // Legacy errorMessage only shows when error=true (legacy behaviour preserved).
    // New message prop shows when state is not 'none'.
    const effectiveMessage = message || (error ? errorMessage : undefined);
    const messageId = `${this.errorId}-msg`;

    const fieldsetClass = effectiveError ? 'radio-group radio-group--error' : 'radio-group';
    const describedBy = [
      effectiveError && effectiveMessage ? messageId : '',
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
            aria-labelledby={this.legendId}
            aria-invalid={effectiveError ? 'true' : undefined}
            aria-describedby={describedBy}
            aria-orientation={orientation}
            aria-required={required ? 'true' : undefined}
          >
            <legend id={this.legendId} class="radio-group__legend">{label}</legend>
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
        {effectiveMessage && (
          <p
            id={messageId}
            class={`radio-group__error radio-group__message--${effectiveError ? 'error' : state}`}
            role={effectiveError ? 'alert' : 'status'}
            aria-atomic="true"
          >
            {effectiveMessage}
          </p>
        )}
      </Host>
    );
  }
}
