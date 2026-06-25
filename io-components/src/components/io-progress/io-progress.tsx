import { Component, Prop, Host, h } from '@stencil/core';

import { getProgressStyles } from './io-progress-styles';
import {
  computePercentage,
  getProgressWrapperClass,
  getProgressFillClass,
} from './io-progress-utils';
import type { IoProgressColor, IoProgressSize } from './types';

/**
 * io-progress
 * ===========
 * Linear progress bar for determinate loading states.
 * Use for file uploads, multi-step forms, and wizard flows.
 *
 * @example
 * <io-progress value="60"></io-progress>
 * <io-progress value="75" color="success" size="lg" show-label></io-progress>
 * <io-progress value="40" color="warning" size="sm" label="Upload progress"></io-progress>
 */
@Component({
  tag: 'io-progress',
  shadow: true,
})
export class IoProgress {
  // ── Props ─────────────────────────────────────────────────────

  /** Progress value from 0 to 100 (or min-max range if supplied). */
  @Prop() value = 0;

  /** Colour variant for the progress fill. Reflected as an attribute. */
  @Prop({ reflect: true }) color: IoProgressColor = 'blue';

  /** Track height variant. Reflected as an attribute. */
  @Prop({ reflect: true }) size: IoProgressSize = 'md';

  /**
   * When true, the fill width transitions smoothly on value change.
   * Disabled automatically when prefers-reduced-motion is active.
   */
  @Prop() animated = true;

  /** Accessible label set as aria-label on the host element. */
  @Prop() label: string | undefined;

  /** When true, renders a visible percentage label below the track. */
  @Prop() showLabel = false;

  /** Element ID that labels this progress bar (aria-labelledby). Takes precedence over label prop. */
  @Prop() labelledBy: string | undefined;

  /** Text description for the current value, e.g. "3 of 5 steps" (aria-valuetext). */
  @Prop() valueText: string | undefined;

  /** Minimum value of the range. Affects aria-valuemin and percentage calculation. */
  @Prop() min = 0;

  /** Maximum value of the range. Affects aria-valuemax and percentage calculation. */
  @Prop() max = 100;

  /** When true, shows indeterminate (shimmer) animation. Omits aria-valuenow per ARIA spec. */
  @Prop({ reflect: true }) indeterminate = false;

  // ── Render ───────────────────────────────────────────────────

  render() {
    // Compute normalized percentage using min/max range
    const percentage = this.indeterminate ? 0 : computePercentage(this.value, this.min, this.max);

    // Determine aria-label: labelledBy takes precedence, falls back to label prop
    const ariaLabel = this.labelledBy ? undefined : this.label ?? undefined;

    return (
      <Host
        role="progressbar"
        aria-valuenow={this.indeterminate ? undefined : this.value}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        aria-valuetext={this.valueText ?? undefined}
        aria-label={ariaLabel}
        aria-labelledby={this.labelledBy ?? undefined}
      >
        <style>{getProgressStyles()}</style>
        <div class={getProgressWrapperClass(this.size, this.indeterminate)}>
          <div
            class={getProgressFillClass(this.color, this.animated, this.indeterminate)}
            style={{ width: this.indeterminate ? undefined : `${percentage}%` }}
          />
        </div>
        {this.indeterminate && (
          <span role="status" aria-live="polite" aria-atomic="true" class="sr-only">
            {this.valueText ?? 'Loading…'}
          </span>
        )}
        {this.showLabel && !this.indeterminate && (
          <p class="progress-label" aria-hidden="true">
            {percentage}%
          </p>
        )}
      </Host>
    );
  }
}
