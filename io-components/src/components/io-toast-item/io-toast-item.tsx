import { Component, Prop, Event, EventEmitter, Host, h } from '@stencil/core';

import { getToastItemStyles } from './io-toast-item-styles';
import { getToastCloseIcon, getToastVariantIcon } from './io-toast-item-utils';

import type { IoToastVariant } from '../io-toast/types';

/**
 * io-toast-item
 * ==============
 * Internal component rendered by <io-toast>. Not intended for direct use.
 * Displays a single notification row with icon, text, optional CTA, and a
 * dismiss button.
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

  /**
   * Label for an optional call-to-action rendered beside the text.
   * When omitted, no action is rendered.
   */
  @Prop() actionLabel?: string;

  /**
   * When set alongside `actionLabel`, renders the CTA as an `<a>` pointing to
   * this URL. When omitted the CTA is a `<button>` that emits `action`.
   */
  @Prop() actionHref?: string;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the user dismisses the toast */
  @Event() dismiss!: EventEmitter<void>;

  /**
   * Fires when the action button is clicked (only when `actionLabel` is set
   * and `actionHref` is not).
   */
  @Event({ bubbles: false }) action!: EventEmitter<void>;

  // ── Handlers ─────────────────────────────────────────────────

  private handleClose = () => {
    this.dismiss.emit();
  };

  private handleAction = () => {
    this.action.emit();
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { variant, text, actionLabel, actionHref } = this;
    const closeIcon = getToastCloseIcon();
    const variantIcon = getToastVariantIcon(variant);

    const actionNode = actionLabel
      ? actionHref
        ? <a class="toast__action" href={actionHref}>{actionLabel}</a>
        : <button type="button" class="toast__action" onClick={this.handleAction}>{actionLabel}</button>
      : null;

    return (
      <Host>
        <style>{getToastItemStyles(variant)}</style>
        <div class="toast">
          <span class="toast__icon" innerHTML={variantIcon} />
          <span class="toast__text">{text}</span>
          {actionNode}
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
