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

  componentWillLoad() {
    const steps = Array.from(this.el.querySelectorAll('io-step'));
    // Cap at 9 steps — log error without throwing (backwards compatible).
    if (steps.length > 9) {
      console.error(`[io-stepper] Maximum 9 steps are supported; found ${steps.length}. Extra steps will still render but may cause layout issues.`);
    }
  }

  componentDidLoad() {
    this.updateSteps();
    this.attachResizeObserver();
    this.scrollCurrentIntoView();
  }

  componentDidUpdate() {
    this.scrollCurrentIntoView();
  }

  disconnectedCallback() {
    this.detachResizeObserver();
  }

  @Watch('current')
  onCurrentChange() {
    this.updateSteps();
  }

  @Watch('orientation')
  onOrientationChange() {
    this.updateSteps();
  }

  // ── ResizeObserver for scroll centering ──────────────────────

  private resizeObserver: ResizeObserver | null = null;

  private attachResizeObserver() {
    if (typeof ResizeObserver === 'undefined') return;
    this.resizeObserver = new ResizeObserver(() => {
      this.scrollCurrentIntoView();
    });
    const list = this.el.shadowRoot?.querySelector('.stepper');
    if (list) this.resizeObserver.observe(list);
  }

  private detachResizeObserver() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }

  private scrollCurrentIntoView() {
    if (this.orientation !== 'horizontal') return;
    const steps = Array.from(this.el.querySelectorAll('io-step'));
    const currentStep = steps.find((_, i) => i + 1 === this.current) as HTMLElement | undefined;
    if (!currentStep) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    currentStep.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }

  // ── Slot handling ─────────────────────────────────────────────

  private handleSlotChange = () => {
    this.updateSteps();
    this.scrollCurrentIntoView();
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
