import { Component, Prop, Event, EventEmitter, Element, Host, Watch, Listen, AttachInternals, State, h } from '@stencil/core';

import { getSegmentedControlStyles } from './io-segmented-control-styles';

import type { IoSegmentedControlChangeDetail, IoSegmentedControlColumns } from './types';

/**
 * io-segmented-control
 * =====================
 * FACE-compliant exclusive-selection bar. A styled radio group with a unified
 * horizontal bar visual layout. Parent component that manages selection state
 * and keyboard navigation across slotted io-segment children.
 *
 * #1080 — wraps segments in an inner <fieldset role="radiogroup"> with
 * <legend> to align semantics with io-radio-group. The Host element carries
 * no ARIA role; the fieldset provides the group semantics.
 *
 * #1074 — adds `required`, `error`, and `errorMessage` props to mirror the
 * io error-prop standard and FACE validity wiring.
 *
 * #1072 — adds `noWrap` prop that wraps the slot in <io-scroller> for
 * horizontal scrolling when there are many segments.
 *
 * #1063 — adds `columns` prop that switches the bar from flex to a CSS grid
 * so segments become equal-width cells.
 *
 * @example
 * <io-segmented-control name="view" label="View mode" value="list">
 *   <io-segment value="list" label="List" />
 *   <io-segment value="grid" label="Grid" />
 *   <io-segment value="map" label="Map" />
 * </io-segmented-control>
 */
@Component({
  tag: 'io-segmented-control',
  shadow: true,
  formAssociated: true,
})
export class IoSegmentedControl {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  // ── Props ─────────────────────────────────────────────────────

  /** Currently selected segment value */
  @Prop({ mutable: true }) value: string | undefined;

  /** HTML name attribute for form participation */
  @Prop() name: string | undefined;

  /** Accessible label for the control group — required for WCAG 4.1.2 */
  @Prop() label: string | undefined;

  /** When true, visually hides the legend; the accessible name is still provided by the legend text */
  @Prop() hideLabel = false;

  /** Disables the entire control and all child segments */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Marks the control as required in form validation. When no segment is
   * selected, FACE validity is set to `valueMissing`.
   * #1074
   */
  @Prop() required = false;

  /**
   * Puts the control in error state. Applies error styling to the bar and
   * legend. Pair with `errorMessage` to render a visible error text node.
   * #1074
   */
  @Prop({ reflect: true }) error = false;

  /**
   * Error message shown below the bar when `error=true`. When omitted,
   * error styling is applied but no DOM node is rendered.
   * #1074
   */
  @Prop() errorMessage: string | undefined;

  /**
   * When true, wraps the segments in an <io-scroller> so many segments scroll
   * horizontally with native momentum instead of wrapping to a second row.
   * #1072
   */
  @Prop({ reflect: true }) noWrap = false;

  /**
   * Number of equal-width columns. When `'auto'` (default) the bar uses flex
   * and segments size to their content. When a number is provided the bar
   * switches to a CSS grid with that many equal-width tracks.
   * #1063
   */
  @Prop({ reflect: true }) columns: IoSegmentedControlColumns = 'auto';

  // ── Private ───────────────────────────────────────────────────

  private defaultValue?: string;
  private errorId!: string;

  // ── State ─────────────────────────────────────────────────────

  /**
   * Mirrors FACE invalidity so the component re-renders on form validation
   * state changes (WCAG 4.1.3). #1074
   */
  @State() faceInvalid = false;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the selected segment changes */
  @Event() change!: EventEmitter<IoSegmentedControlChangeDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    if (!this.label) {
      console.error('[io-segmented-control] label prop is required for accessibility (WCAG 4.1.2).');
    }
    const suffix = Math.random().toString(36).slice(2);
    this.errorId = `io-sc-error-${suffix}`;
    this.defaultValue = this.value;
    this.syncFormValue();
  }

  componentDidLoad() {
    this.syncChildren();
    this.updateTabStops();
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
    this.syncFormValue();
  }

  // ── FACE callbacks ────────────────────────────────────────────

  formResetCallback(): void {
    this.value = this.defaultValue;
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
   * Listen for the 'segmentSelect' event bubbled from io-segment children.
   */
  @Listen('segmentSelect')
  handleSegmentSelect(ev: CustomEvent<{ value: string }>) {
    const newValue = ev.detail?.value ?? '';
    this.value = newValue;
    this.change.emit({ value: newValue });
  }

  /** Roving tabindex keyboard navigation across segments */
  @Listen('keydown')
  handleGroupKeydown(ev: KeyboardEvent): void {
    const segments = this.getSegments().filter(s => !s.disabled);
    if (!segments.length) return;

    let currentIndex = segments.findIndex(s => s === document.activeElement);
    if (currentIndex === -1) {
      currentIndex = segments.findIndex(s => s.value === this.value && !s.disabled);
      if (currentIndex === -1) currentIndex = 0;
    }

    let nextIndex = currentIndex;

    if (ev.key === 'ArrowRight' || ev.key === 'ArrowDown') {
      ev.preventDefault();
      nextIndex = (currentIndex + 1) % segments.length;
    } else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp') {
      ev.preventDefault();
      nextIndex = (currentIndex - 1 + segments.length) % segments.length;
    } else if (ev.key === 'Home') {
      ev.preventDefault();
      nextIndex = 0;
    } else if (ev.key === 'End') {
      ev.preventDefault();
      nextIndex = segments.length - 1;
    } else {
      return;
    }

    const target = segments[nextIndex];
    this.value = target.value;
    segments.forEach((s, i) => { s.tabIndex = i === nextIndex ? 0 : -1; });
    const targetEl = target as HTMLElement & { setFocus?(): void };
    if (typeof targetEl.setFocus === 'function') {
      targetEl.setFocus();
    } else {
      targetEl.focus();
    }
    this.change?.emit({ value: this.value ?? '' });
  }

  // ── Private helpers ───────────────────────────────────────────

  private syncFormValue(): void {
    const hasValue = this.value !== undefined && this.value !== '';
    this.internals?.setFormValue?.(hasValue ? this.value! : null);

    if (this.required && !hasValue) {
      this.internals?.setValidity?.(
        { valueMissing: true },
        'Please select an option.',
      );
      this.faceInvalid = true;
    } else {
      this.internals?.setValidity?.({});
      this.faceInvalid = false;
    }
  }

  private getSegments(): Array<HTMLElement & { value: string; selected: boolean; disabled: boolean; tabIndex: number }> {
    return Array.from(
      this.el.querySelectorAll<HTMLElement & { value: string; selected: boolean; disabled: boolean; tabIndex: number }>('io-segment'),
    );
  }

  private updateTabStops(): void {
    const segments = this.getSegments();
    const active = segments.find(s => s.value === this.value && !s.disabled);
    const first = segments.find(s => !s.disabled);
    const target = active ?? first;
    segments.forEach(s => {
      s.tabIndex = (s === target && !s.disabled) ? 0 : -1;
    });
  }

  private syncChildren = () => {
    const segments = this.getSegments();
    segments.forEach(s => {
      s.selected = s.value === this.value;
      // When group is disabled, force all segments disabled.
      // When group is enabled, respect each segment's own declared disabled state.
      s.disabled = this.disabled || !!(s as unknown as { ownDisabled: boolean }).ownDisabled;
    });
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { disabled, label, hideLabel, error, errorMessage, required, noWrap, columns, faceInvalid } = this;

    const showFaceError = faceInvalid && !error;
    const faceErrorId = `${this.errorId}-face`;

    const describedBy = [
      error && errorMessage ? this.errorId : '',
      showFaceError ? faceErrorId : '',
    ].filter(Boolean).join(' ') || undefined;

    const fieldsetClass = [
      'segmented-control',
      error ? 'segmented-control--error' : '',
    ].filter(Boolean).join(' ');

    // Render the slot, optionally wrapped in io-scroller for noWrap mode (#1072)
    const slotContent = noWrap
      ? <io-scroller class="segmented-control__scroller"><slot onSlotchange={this.syncChildren} /></io-scroller>
      : <slot onSlotchange={this.syncChildren} />;

    return (
      <Host aria-disabled={disabled ? 'true' : undefined}>
        <style>{getSegmentedControlStyles({ columns })}</style>
        {/*
          #1080 — inner <fieldset role="radiogroup"> aligns semantics with
          io-radio-group. The Host carries no ARIA role. aria-required and
          aria-invalid live on the fieldset.
        */}
        <fieldset
          class={fieldsetClass}
          disabled={disabled}
          role="radiogroup"
          aria-required={required ? 'true' : undefined}
          aria-invalid={(error || faceInvalid) ? 'true' : undefined}
          aria-describedby={describedBy}
        >
          <legend class={hideLabel ? 'segmented-control__legend segmented-control__legend--hidden' : 'segmented-control__legend'}>
            {label}
            {required && <span class="segmented-control__required" aria-hidden="true">&nbsp;*</span>}
          </legend>
          <div class="segmented-control__bar">
            {slotContent}
          </div>
        </fieldset>
        {error && errorMessage && (
          <p id={this.errorId} class="segmented-control__error" role="alert" aria-atomic="true">
            {errorMessage}
          </p>
        )}
        {showFaceError && (
          <p id={faceErrorId} class="segmented-control__error" role="alert" aria-atomic="true">
            Please select an option.
          </p>
        )}
      </Host>
    );
  }
}
