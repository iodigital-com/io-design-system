import { Component, Prop, Host, h } from '@stencil/core';

import { getProgressStyles } from './io-progress-styles';
import { clampValue, getProgressWrapperClass, getProgressFillClass } from './io-progress-utils';
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

  /** Progress value from 0 to 100 (clamped automatically). */
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

  // ── Render ───────────────────────────────────────────────────

  render() {
    const clamped = clampValue(this.value);

    return (
      <Host
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={this.label ?? undefined}
      >
        <style>{getProgressStyles()}</style>
        <div class={getProgressWrapperClass(this.size)}>
          <div
            class={getProgressFillClass(this.color, this.animated)}
            style={{ width: `${clamped}%` }}
          />
        </div>
        {this.showLabel && (
          <p class="progress-label" aria-hidden="true">
            {clamped}%
          </p>
        )}
      </Host>
    );
  }
}
