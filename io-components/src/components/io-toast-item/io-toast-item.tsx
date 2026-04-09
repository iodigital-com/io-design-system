import { Component, Prop, Event, EventEmitter, Host, h } from '@stencil/core';
import type { IoToastVariant } from '../io-toast/types';
import { getToastItemStyles } from './io-toast-item-styles';
import { getToastCloseIcon, getToastVariantIcon } from './io-toast-item-utils';

/**
 * io-toast-item
 * ==============
 * Internal component rendered by <io-toast>. Not intended for direct use.
 * Displays a single notification row with icon, text, and a dismiss button.
 */
@Component({
  tag: 'io-toast-item',
  shadow: { delegatesFocus: true },
})
export class IoToastItem {
  // ── Props ─────────────────────────────────────────────────────

  /** Notification text */
  @Prop() text = '';

  /** Visual variant controlling colour accent and icon */
  @Prop({ reflect: true }) variant: IoToastVariant = 'neutral';

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the user dismisses the toast */
  @Event() dismiss!: EventEmitter<void>;

  // ── Handlers ─────────────────────────────────────────────────

  private handleClose = () => {
    this.dismiss.emit();
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { variant, text } = this;
    const closeIcon = getToastCloseIcon();
    const variantIcon = getToastVariantIcon(variant);

    return (
      <Host>
        <style>{getToastItemStyles(variant)}</style>
        <div class="toast">
          <span class="toast__icon" innerHTML={variantIcon} />
          <span class="toast__text">{text}</span>
          <button
            type="button"
            class="toast__close"
            aria-label="Dismiss notification"
            onClick={this.handleClose}
            innerHTML={closeIcon}
          />
        </div>
      </Host>
    );
  }
}
