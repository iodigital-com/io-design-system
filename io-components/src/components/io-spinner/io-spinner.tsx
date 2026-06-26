import { Component, Prop, Host, h } from '@stencil/core';

import { getSpinnerStyles } from './io-spinner-styles';
import { getSpinnerClassName, normalizeSpinnerLabel } from './io-spinner-utils';

import type { IoSpinnerSize, IoSpinnerColor } from './types';

/**
 * io-spinner
 * ==========
 * Animated loading indicator. Pure CSS — no JS animation.
 *
 * Renders a spinning ring that communicates an async operation in progress.
 * Use inside io-button (loading state), page transitions, or lazy content areas.
 *
 * @example
 * <io-spinner></io-spinner>
 * <io-spinner size="lg" color="white" label="Saving..."></io-spinner>
 * // JSX / framework usage (dot-property binding):
 * // <IoSpinner aria={{ 'aria-live': 'polite', 'aria-atomic': 'true' }} />
 * // <IoSpinner aria={{ 'aria-label': 'Uploading file' }} />
 */
@Component({
  tag: 'io-spinner',
  shadow: { delegatesFocus: true },
})
export class IoSpinner {
  // ── Props ─────────────────────────────────────────────────────

  /** Size preset. Use 'inherit' to scale with parent font-size (1em). */
  @Prop({ reflect: true }) size: IoSpinnerSize = 'md';

  /** Color of the spinner ring */
  @Prop({ reflect: true }) color: IoSpinnerColor = 'primary';

  /** Accessible label announced by screen readers */
  @Prop() label = 'Loading';

  /**
   * Additional ARIA attributes spread onto the Host element.
   * When aria-label is provided here, it takes precedence over the label prop.
   * Accepted keys: aria-label, aria-describedby, aria-live, aria-atomic.
   */
  @Prop() aria?: Partial<Record<'aria-label' | 'aria-describedby' | 'aria-live' | 'aria-atomic', string>>;

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { size, color, aria } = this;
    const label = normalizeSpinnerLabel(this.label);
    const className = getSpinnerClassName(size, color);

    // aria['aria-label'] takes precedence over the label prop, but only when non-blank
    const ariaLabel = aria?.['aria-label']?.trim() || label;

    return (
      <Host
        role="status"
        aria-label={ariaLabel}
        aria-describedby={aria?.['aria-describedby']}
        aria-live={aria?.['aria-live']}
        aria-atomic={aria?.['aria-atomic']}
      >
        <style>{getSpinnerStyles()}</style>
        <span
          class={className}
          aria-hidden="true"
        />
      </Host>
    );
  }
}
