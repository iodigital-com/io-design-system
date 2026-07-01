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

  /**
   * @deprecated Pass aria-* attributes directly on the host element instead.
   * E.g. <io-spinner aria-label="Saving"> instead of <io-spinner aria={{ 'aria-label': 'Saving' }}>.
   * This prop will be removed in a future minor release.
   *
   * Additional ARIA attributes spread onto the Host element.
   * When aria-label is provided here, it takes precedence over the label prop.
   * Accepted keys: aria-label, aria-describedby, aria-live, aria-atomic.
   */
  @Prop() aria?: Partial<Record<'aria-label' | 'aria-describedby' | 'aria-live' | 'aria-atomic', string>>;

  // ── Lifecycle ────────────────────────────────────────────────

  componentWillLoad() {
    if (this.aria !== undefined) {
      console.warn(
        '[io-spinner] The `aria` object prop is deprecated and will be removed in a future release. ' +
        'Pass aria-* attributes directly on the host element instead: ' +
        '<io-spinner aria-label="Loading" aria-live="polite">',
      );
    }
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { size, color, aria, context } = this;
    const label = normalizeSpinnerLabel(this.label);

    // Read aria-label from host element (new pattern) or from deprecated aria prop
    const hostAriaLabel = this.el?.getAttribute('aria-label')?.trim();
    const legacyAriaLabel = aria?.['aria-label']?.trim();
    const ariaLabel = hostAriaLabel || legacyAriaLabel || label;

    // aria-live and aria-describedby can come from deprecated aria prop (host attrs handled natively)
    const ariaDescribedby = aria?.['aria-describedby'];
    const ariaLive = aria?.['aria-live'];
    const ariaAtomic = aria?.['aria-atomic'];

    // context prop drives role and aria-live defaults
    const role = context === 'blocking' ? 'alert' : 'status';
    const effectiveAriaLive = ariaLive ?? (context === 'blocking' ? 'assertive' : 'polite');

    const { r, circumference } = getSpinnerCircleRadius(size);

    return (
      <Host
        role={role}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-live={effectiveAriaLive}
        aria-atomic={ariaAtomic ?? 'true'}
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
