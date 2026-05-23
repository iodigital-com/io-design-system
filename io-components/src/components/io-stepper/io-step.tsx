import { Component, Prop, Host, Watch, h } from '@stencil/core';

import { getStepStyles } from './io-stepper-styles';
import { getStepClass, getStepAriaLabel } from './io-stepper-utils';
import type { IoStepStatus, IoStepperOrientation } from './types';

/**
 * io-step
 * =======
 * Individual step item within an io-stepper container.
 *
 * Renders as an <li> with a circle indicator (number or checkmark), a visible
 * label, a connector line, and a screen-reader-only full description.
 *
 * The `index`, `total`, and `orientation` props are set programmatically by
 * the parent io-stepper — you do not need to set them manually.
 *
 * @example
 * <io-step label="Account" status="complete"></io-step>
 * <io-step label="Details" status="current"></io-step>
 * <io-step label="Review" status="upcoming"></io-step>
 */
@Component({
  tag: 'io-step',
  shadow: true,
})
export class IoStep {
  // ── Props ─────────────────────────────────────────────────────

  /** Visible text label for this step. Required. */
  @Prop() label!: string;

  /** Completion status — set automatically by io-stepper or manually. */
  @Prop({ reflect: true }) status: IoStepStatus = 'upcoming';

  /**
   * 1-based position of this step in the sequence.
   * Set automatically by the parent io-stepper.
   */
  @Prop() index = 0;

  /**
   * Total number of steps.
   * Set automatically by the parent io-stepper.
   */
  @Prop() total = 0;

  /**
   * Orientation inherited from the parent io-stepper.
   * Set automatically by the parent io-stepper.
   */
  @Prop({ reflect: true }) orientation: IoStepperOrientation = 'horizontal';

  // ── Lifecycle ─────────────────────────────────────────────────

  @Watch('total')
  onTotalChange() {
    // Re-render happens automatically via prop change
  }

  @Watch('index')
  onIndexChange() {
    // Re-render happens automatically via prop change
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { status, label, index, total, orientation } = this;
    const isLast = index === total;
    const isCurrent = status === 'current';
    const isComplete = status === 'complete';

    const stepClass = getStepClass(status);
    const ariaLabel = index > 0 ? getStepAriaLabel(index, label, status) : label;

    return (
      <Host
        data-last={isLast ? '' : undefined}
        data-orientation={orientation}
      >
        <style>{getStepStyles()}</style>
        <li
          class={`step ${stepClass}`}
          aria-current={isCurrent ? 'step' : undefined}
        >
          <div class="step__inner">
            <div class="step__circle" aria-hidden="true">
              {isComplete ? (
                <svg class="step__check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8.5L6.5 12L13 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                index > 0 ? index : ''
              )}
            </div>
            <span class="step__label" aria-hidden="true">{label}</span>
          </div>
          {/* Screen reader full description */}
          <span class="step__sr">{ariaLabel}</span>
          {/* Connector line — hidden for last step via CSS */}
          <div class="step__connector" aria-hidden="true" />
        </li>
      </Host>
    );
  }
}
