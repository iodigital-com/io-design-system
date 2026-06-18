import { Component, Prop, Event, EventEmitter, Element, Host, Watch, Listen, h } from '@stencil/core';

import { getStepperStyles } from './io-stepper-styles';
import type { IoStepperOrientation } from './types';

/**
 * io-stepper
 * ==========
 * Multi-step process indicator container.
 *
 * Renders as <nav aria-label="Progress"> containing an <ol> of io-step children.
 * The `current` prop drives which step is marked as active; all steps before it
 * are marked complete and all after are marked upcoming.
 *
 * @example
 * <io-stepper current="2">
 *   <io-step label="Account"></io-step>
 *   <io-step label="Details"></io-step>
 *   <io-step label="Review"></io-step>
 * </io-stepper>
 */
@Component({
  tag: 'io-stepper',
  shadow: { delegatesFocus: true },
})
export class IoStepper {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** 1-based index of the current active step. */
  @Prop({ reflect: true }) current = 1;

  /** Layout direction of the stepper. */
  @Prop({ reflect: true }) orientation: IoStepperOrientation = 'horizontal';

  /**
   * Accessible label for the <nav> landmark.
   * Override for i18n — default is 'Progress'.
   */
  @Prop() ariaLabel = 'Progress';

  // ── Events ────────────────────────────────────────────────────

  /**
   * Fired when a complete (non-disabled) step is clicked.
   * Payload: { activeStepIndex: number } — 0-based index of the clicked step.
   */
  @Event({ bubbles: false }) stepChange!: EventEmitter<{ activeStepIndex: number }>;

  // ── Event delegation ─────────────────────────────────────────

  @Listen('stepClick')
  onStepClick(ev: CustomEvent<{ index: number }>) {
    ev.stopPropagation();
    this.stepChange.emit({ activeStepIndex: ev.detail.index - 1 }); // convert 1-based → 0-based
  }

  // ── Lifecycle ─────────────────────────────────────────────────

  componentDidLoad() {
    this.updateSteps();
  }

  @Watch('current')
  onCurrentChange() {
    this.updateSteps();
  }

  @Watch('orientation')
  onOrientationChange() {
    this.updateSteps();
  }

  // ── Slot handling ─────────────────────────────────────────────

  private handleSlotChange = () => {
    this.updateSteps();
  };

  private updateSteps() {
    const steps = Array.from(this.el.querySelectorAll('io-step'));
    const total = steps.length;

    steps.forEach((step, i) => {
      const stepIndex = i + 1;
      (step as HTMLElement & { index: number; total: number; orientation: IoStepperOrientation }).index = stepIndex;
      (step as HTMLElement & { index: number; total: number; orientation: IoStepperOrientation }).total = total;
      (step as HTMLElement & { index: number; total: number; orientation: IoStepperOrientation }).orientation = this.orientation;
    });
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    return (
      <Host>
        <style>{getStepperStyles()}</style>
        <nav class="stepper-nav" aria-label={this.ariaLabel}>
          <ol class={`stepper stepper--${this.orientation}`}>
            <slot onSlotchange={this.handleSlotChange} />
          </ol>
        </nav>
      </Host>
    );
  }
}
