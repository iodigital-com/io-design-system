import { Component, Prop, Event, EventEmitter, Host, Watch, h } from '@stencil/core';

import { getStepStyles } from './io-stepper-styles';
import { getStepClass, getStepAriaLabel } from './io-stepper-utils';
import type { IoStepStatus, IoStepperOrientation } from './types';

/**
 * io-step
 * =======
 * Individual step item within an io-stepper container.
 *
 * Renders as an <li> containing a <button> for keyboard accessibility (WCAG 2.1.1/4.1.2).
 * The button has aria-current="step" on the current step, and aria-disabled="true" on
 * non-interactive steps (upcoming, warning when not navigable, or disabled).
 *
 * The `index`, `total`, and `orientation` props are set programmatically by
 * the parent io-stepper — you do not need to set them manually.
 *
 * @example
 * <io-step label="Account" status="complete"></io-step>
 * <io-step label="Details" status="current"></io-step>
 * <io-step label="Review" status="upcoming"></io-step>
 * <io-step label="Verify" status="warning"></io-step>
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

  /**
   * When true, the step is non-interactive regardless of status.
   * Applies aria-disabled="true" and suppresses click events.
   * Use to block navigation during async operations.
   */
  @Prop({ reflect: true }) disabled = false;

  // ── Events ────────────────────────────────────────────────────

  /**
   * Fired when a navigable (complete, non-disabled) step button is clicked.
   * Bubbles up to io-stepper for re-emission as stepChange.
   * Internal event — not part of the public API.
   */
  @Event({ bubbles: true, composed: true }) stepClick!: EventEmitter<{ index: number }>;

  // ── Lifecycle ─────────────────────────────────────────────────

  @Watch('total')
  onTotalChange() {
    // Re-render happens automatically via prop change
  }

  @Watch('index')
  onIndexChange() {
    // Re-render happens automatically via prop change
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleClick = () => {
    if (this.disabled || this.status !== 'complete') return;
    this.stepClick.emit({ index: this.index });
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { status, label, index, total, orientation, disabled } = this;
    const isLast = index === total;
    const isCurrent = status === 'current';
    const isComplete = status === 'complete';
    const isWarning = status === 'warning';
    // Only complete (and non-disabled) steps are interactive
    const isInteractive = isComplete && !disabled;

    const stepClass = getStepClass(status);
    const ariaLabel = index > 0 ? getStepAriaLabel(index, label, status) : label;

    return (
      <Host
        data-last={isLast ? '' : undefined}
        data-orientation={orientation}
      >
        <style>{getStepStyles()}</style>
        <li class={`step ${stepClass}`}>
          <button
            type="button"
            class={`step__button${disabled ? ' step__button--disabled' : ''}`}
            aria-current={isCurrent ? 'step' : undefined}
            aria-disabled={(!isInteractive) ? 'true' : undefined}
            aria-label={ariaLabel}
            onClick={this.handleClick}
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
                ) : isWarning ? (
                  <svg class="step__warning-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M8 2L14.5 13H1.5L8 2Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 6.5V9"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <circle cx="8" cy="11" r="0.75" fill="currentColor" />
                  </svg>
                ) : (
                  index > 0 ? index : ''
                )}
              </div>
              <span class="step__label" aria-hidden="true">{label}</span>
            </div>
            {/* Connector line — hidden for last step via CSS */}
            <div class="step__connector" aria-hidden="true" />
          </button>
        </li>
      </Host>
    );
  }
}
