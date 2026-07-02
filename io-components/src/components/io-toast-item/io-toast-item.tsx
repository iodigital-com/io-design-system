import { Component, Prop, Event, EventEmitter, Host, h } from '@stencil/core';

import { getToastItemStyles } from './io-toast-item-styles';
import { getToastCloseIcon, getToastVariantIcon } from './io-toast-item-utils';

import type { IoToastVariant, IoToastAction } from '../io-toast/types';

/**
 * io-toast-item
 * ==============
 * Internal component rendered by <io-toast>. Not intended for direct use.
 * Displays a single notification row with icon, text, optional CTA(s), and a
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
   * Array of up to 2 action items to render beside the toast text.
   * Each entry may specify `label`, optional `href`, optional `variant`, and optional `onClick`.
   */
  @Prop() actions?: IoToastAction[];

  /**
   * When true, renders a progress bar that animates over `duration` ms to indicate
   * the auto-dismiss countdown. Has no effect when the toast is persistent.
   * @default false
   */
  @Prop() showProgress?: boolean = false;

  /**
   * Duration in milliseconds passed from the parent toast manager.
   * Drives the progress bar animation duration.
   * @default 6000
   */
  @Prop() duration?: number = 6000;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the user dismisses the toast */
  @Event() dismiss!: EventEmitter<void>;

  /**
   * Fires when an action button is clicked (only for button actions without an href).
   * Bubbles and is composed so consumers can listen on `<io-toast>` or any ancestor.
   * The event detail carries the zero-based index of the action that was clicked.
   */
  @Event({ bubbles: true, composed: true }) action!: EventEmitter<number>;

  // ── Handlers ─────────────────────────────────────────────────

  private handleClose = () => {
    this.dismiss.emit();
  };

  private handleAction = (index = 0) => {
    this.action.emit(index);
  };

  // ── Helpers ───────────────────────────────────────────────────

  private resolveActions(): IoToastAction[] {
    if (this.actions && this.actions.length > 0) {
      return this.actions.slice(0, 2);
    }
    return [];
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { variant, text, showProgress } = this;
    const closeIcon = getToastCloseIcon();
    const variantIcon = getToastVariantIcon(variant);
    const resolvedActions = this.resolveActions();
    const durationMs = this.duration ?? 6000;

    return (
      <Host>
        <style>{getToastItemStyles(variant)}</style>
        <div class="toast">
          <span class="toast__icon" aria-hidden="true" innerHTML={variantIcon} />
          <span class="toast__text">{text}</span>
          {resolvedActions.map((act, index) => {
            const clickHandler = act.onClick ?? (() => this.handleAction(index));
            return act.href
              ? (
                <a
                  key={index}
                  class={`toast__action${act.variant ? ` toast__action--${act.variant}` : ''}`}
                  href={act.href}
                >
                  {act.label}
                </a>
              )
              : (
                <button
                  key={index}
                  type="button"
                  class={`toast__action${act.variant ? ` toast__action--${act.variant}` : ''}`}
                  onClick={clickHandler}
                >
                  {act.label}
                </button>
              );
          })}
          <button
            type="button"
            class="toast__close"
            aria-label="Dismiss notification"
            onClick={this.handleClose}
            innerHTML={closeIcon}
          />
        </div>
        {showProgress && (
          <div
            class="toast__progress"
            style={{ '--io-toast-duration': `${durationMs}ms` } as Record<string, string>}
            aria-hidden="true"
          />
        )}
      </Host>
    );
  }
}
