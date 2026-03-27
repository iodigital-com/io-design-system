import { Component, Prop, Host, h } from '@stencil/core';
import type { IoSpinnerSize, IoSpinnerColor } from './types';
import { getSpinnerStyles } from './io-spinner-styles';

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
 */
@Component({
  tag: 'io-spinner',
  shadow: true,
})
export class IoSpinner {
  // ── Props ─────────────────────────────────────────────────────

  /** Size preset */
  @Prop({ reflect: true }) size: IoSpinnerSize = 'md';

  /** Color of the spinner ring */
  @Prop({ reflect: true }) color: IoSpinnerColor = 'primary';

  /** Accessible label announced by screen readers */
  @Prop() label = 'Loading';

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { size, color, label } = this;

    return (
      <Host role="status" aria-label={label}>
        <style>{getSpinnerStyles()}</style>
        <span
          class={`spinner spinner--${size} spinner--${color}`}
          aria-hidden="true"
        />
      </Host>
    );
  }
}
