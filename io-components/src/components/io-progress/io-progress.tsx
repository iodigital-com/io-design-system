import { Component, Prop, State, Host, Element, h } from '@stencil/core';

import { getProgressStyles } from './io-progress-styles';
import {
  computePercentage,
  computeCircleCircumference,
  computeCircleDashoffset,
  computeStepsFilled,
  getProgressWrapperClass,
  getProgressFillClass,
} from './io-progress-utils';
import type { IoProgressColor, IoProgressShape, IoProgressSize } from './types';

// SVG viewBox size for the circular variant — fixed coordinate space.
const SVG_SIZE = 48;
// Radius must leave room for the stroke: radius = (SVG_SIZE / 2) - (strokeWidth / 2)
// We use a stroke-width of 6 in SVG user-units (matches the CSS token default).
const SVG_RADIUS = 21;

/**
 * io-progress
 * ===========
 * Progress indicator for determinate and indeterminate loading states.
 * Supports three shapes: linear (default), circular, and step.
 *
 * @example Linear
 * <io-progress value="60" label="Upload progress"></io-progress>
 *
 * @example Circular
 * <io-progress shape="circular" value="75" color="success" label="Loading"></io-progress>
 *
 * @example Step — max controls the number of segments
 * <io-progress shape="step" value="3" min="0" max="5" label="Step 3 of 5"></io-progress>
 */
@Component({
  tag: 'io-progress',
  shadow: { delegatesFocus: true },
})
export class IoProgress {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Progress value from 0 to 100 (or min-max range if supplied). */
  @Prop() value = 0;

  /** Colour variant for the progress fill. Reflected as an attribute. */
  @Prop({ reflect: true }) color: IoProgressColor = 'blue';

  /** Track height variant. Reflected as an attribute. */
  @Prop({ reflect: true }) size: IoProgressSize = 'md';

  /**
   * Shape variant.
   * - `'linear'` (default) — horizontal bar.
   * - `'circular'` — SVG ring. Size controlled by `--io-progress-circle-size-{sm,md,lg}`.
   * - `'step'` — segmented bar; each segment maps to one unit between `min` and `max`.
   */
  @Prop({ reflect: true }) shape: IoProgressShape = 'linear';

  /**
   * When true, the fill transitions smoothly on value change.
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

  // ── Internal state ────────────────────────────────────────────

  /**
   * Last integer percentage announced to screen readers.
   * aria-valuenow only updates when Math.round(percentage) changes to avoid
   * excessive announcements during smooth transitions (issue #1021).
   */
  @State() private _lastAnnouncedValue: number | undefined = undefined;

  // ── Lifecycle ────────────────────────────────────────────────

  componentWillLoad() {
    const hasHostAriaLabel = this.el.getAttribute('aria-label')?.trim();
    const hasHostAriaLabelledBy = this.el.getAttribute('aria-labelledby')?.trim();
    if (!this.label && !this.labelledBy && !hasHostAriaLabel && !hasHostAriaLabelledBy) {
      console.error('[io-progress] A progressbar requires an accessible name for WCAG 4.1.2. Provide `label` or `labelledBy` prop, or set `aria-label`/`aria-labelledby` directly on the host element.');
    }
  }

  // ── Private helpers ──────────────────────────────────────────

  private renderLinear(percentage: number) {
    return [
      <div class={getProgressWrapperClass(this.size, this.indeterminate)}>
        <div
          class={getProgressFillClass(this.color, this.animated, this.indeterminate)}
          style={{ width: this.indeterminate ? undefined : `${percentage}%` }}
        />
      </div>,
      this.indeterminate && (
        <span role="status" aria-live="polite" aria-atomic="true" class="sr-only">
          {this.valueText ?? 'Loading…'}
        </span>
      ),
      this.showLabel && !this.indeterminate && (
        <p class="progress-label" aria-hidden="true">
          {percentage}%
        </p>
      ),
    ];
  }

  private renderCircular(percentage: number) {
    const circumference = computeCircleCircumference(SVG_RADIUS);
    const dashoffset = this.indeterminate ? circumference * 0.25 : computeCircleDashoffset(SVG_RADIUS, percentage);

    const fillClass = [
      'progress-circular__fill',
      `progress-circular__fill--${this.color}`,
      !this.animated && 'progress-circular__fill--static',
    ].filter(Boolean).join(' ');

    const wrapperClass = [
      'progress-circular',
      `progress-circular--${this.size}`,
      this.indeterminate && 'progress-circular--indeterminate',
    ].filter(Boolean).join(' ');

    return (
      <div class={wrapperClass}>
        <svg
          class="progress-circular__svg"
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          aria-hidden="true"
          focusable="false"
        >
          <circle
            class="progress-circular__track"
            cx={SVG_SIZE / 2}
            cy={SVG_SIZE / 2}
            r={SVG_RADIUS}
            stroke-dasharray={`${circumference} ${circumference}`}
            stroke-dashoffset="0"
          />
          <circle
            class={fillClass}
            cx={SVG_SIZE / 2}
            cy={SVG_SIZE / 2}
            r={SVG_RADIUS}
            stroke-dasharray={`${circumference} ${circumference}`}
            stroke-dashoffset={dashoffset}
          />
        </svg>
        {this.indeterminate && (
          <span role="status" aria-live="polite" aria-atomic="true" class="sr-only">
            {this.valueText ?? 'Loading…'}
          </span>
        )}
        {this.showLabel && !this.indeterminate && (
          <p class="progress-circular__label" aria-hidden="true">
            {percentage}%
          </p>
        )}
      </div>
    );
  }

  private renderStep() {
    const totalSteps = Math.max(1, this.max - this.min);
    const filledSteps = computeStepsFilled(this.value, this.min, this.max);

    const steps = [];
    for (let i = 0; i < totalSteps; i++) {
      const isFilled = i < filledSteps;
      const stepClass = [
        'progress-step',
        isFilled ? `progress-step--filled progress-step--${this.color}` : '',
      ].filter(Boolean).join(' ');
      steps.push(<div class={stepClass} />);
    }

    return (
      <div class={`progress-steps progress-steps--${this.size}`}>
        {steps}
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    // Compute normalized percentage using min/max range
    const percentage = this.indeterminate ? 0 : computePercentage(this.value, this.min, this.max);

    // Throttle aria-valuenow: only update on integer percentage change (#1021)
    let announcedValue: number | undefined;
    if (!this.indeterminate) {
      const rounded = Math.round(percentage);
      if (this._lastAnnouncedValue !== rounded) {
        this._lastAnnouncedValue = rounded;
      }
      announcedValue = this._lastAnnouncedValue;
    }

    // Determine aria-label: labelledBy takes precedence, falls back to label prop
    const ariaLabel = this.labelledBy ? undefined : this.label ?? undefined;

    return (
      <Host
        role="progressbar"
        aria-valuenow={this.indeterminate ? undefined : announcedValue}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        aria-valuetext={this.indeterminate ? (this.valueText ?? 'Loading…') : this.valueText}
        aria-label={ariaLabel}
        aria-labelledby={this.labelledBy ?? undefined}
        aria-busy={this.indeterminate ? 'true' : undefined}
      >
        <style>{getProgressStyles()}</style>
        {this.shape === 'circular'
          ? this.renderCircular(percentage)
          : this.shape === 'step'
            ? this.renderStep()
            : this.renderLinear(percentage)
        }
      </Host>
    );
  }
}
