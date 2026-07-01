import { Component, Prop, Host, Element, h } from '@stencil/core';

import { getSpinnerStyles } from './io-spinner-styles';
import { getSpinnerCircleRadius, normalizeSpinnerLabel } from './io-spinner-utils';

import type { IoSpinnerSize, IoSpinnerColor, IoSpinnerContext } from './types';

/**
 * io-spinner
 * ==========
 * Animated loading indicator. SVG-based two-circle (track + arc) animation.
 *
 * Renders a spinning arc that communicates an async operation in progress.
 * Use inside io-button (loading state), page transitions, or lazy content areas.
 *
 * @example
 * <io-spinner></io-spinner>
 * <io-spinner size="lg" color="white" label="Saving..."></io-spinner>
 * <io-spinner context="blocking" label="Processing payment"></io-spinner>
 *
 * // Deprecated (still works with console.warn):
 * // <IoSpinner aria={{ 'aria-label': 'Uploading file' }} />
 * // Preferred:
 * // <io-spinner aria-label="Uploading file"></io-spinner>
 */
@Component({
  tag: 'io-spinner',
  shadow: { delegatesFocus: true },
})
export class IoSpinner {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Size preset. Use 'inherit' to scale with parent font-size (1em). */
  @Prop({ reflect: true }) size: IoSpinnerSize = 'md';

  /** Color of the spinner arc */
  @Prop({ reflect: true }) color: IoSpinnerColor = 'primary';

  /** Accessible label announced by screen readers */
  @Prop() label = 'Loading';

  /**
   * Context of the spinner: 'inline' (default) uses role="status" aria-live="polite",
   * 'blocking' uses role="alert" aria-live="assertive" for modal/page-blocking spinners.
   */
  @Prop({ reflect: true }) context: IoSpinnerContext = 'inline';

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { size, color, context } = this;
    const label = normalizeSpinnerLabel(this.label);

    // Read aria-label from host element
    const hostAriaLabel = this.el?.getAttribute('aria-label')?.trim();
    const ariaLabel = hostAriaLabel || label;

    // context prop drives role and aria-live defaults
    const role = context === 'blocking' ? 'alert' : 'status';
    const effectiveAriaLive = context === 'blocking' ? 'assertive' : 'polite';

    const { r, circumference } = getSpinnerCircleRadius(size);

    return (
      <Host
        role={role}
        aria-label={ariaLabel}
        aria-live={effectiveAriaLive}
        aria-atomic="true"
      >
        <style>{getSpinnerStyles()}</style>
        <svg
          class={`spinner spinner--${size} spinner--${color}`}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          {/* Static track circle */}
          <circle
            class="spinner__track"
            cx="12"
            cy="12"
            r={r}
            fill="none"
          />
          {/* Animated arc circle */}
          <circle
            class="spinner__arc"
            cx="12"
            cy="12"
            r={r}
            fill="none"
            stroke-dasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            stroke-dashoffset="0"
          />
        </svg>
      </Host>
    );
  }
}
