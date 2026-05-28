import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

import { getInlineNotificationStyles } from './io-inline-notification-styles';
import type { IoInlineNotificationVariant } from './types';

/**
 * io-inline-notification
 * ======================
 * Inline content-level notification with four severity variants.
 * Sits within the content flow — no open/close state. The consumer
 * controls visibility by mounting or unmounting the element.
 *
 * ARIA live region strategy:
 *   - error variant:     role="alert" (implicit aria-live="assertive")
 *   - all other variants: role="status" with aria-live="polite" aria-atomic="true"
 *
 * @example
 * <io-inline-notification variant="warning" heading="Storage limit">
 *   You have used 90% of your quota.
 * </io-inline-notification>
 *
 * <io-inline-notification variant="error" dismissible>
 *   Failed to save. Please try again.
 * </io-inline-notification>
 */
@Component({
  tag: 'io-inline-notification',
  shadow: { delegatesFocus: true },
})
export class IoInlineNotification {
  /** Severity variant — controls icon, colour, and aria-live politeness */
  @Prop({ reflect: true }) variant: IoInlineNotificationVariant = 'info';

  /** Optional bold heading rendered above the slotted content */
  @Prop() heading?: string;

  /** When true, renders a dismiss button that emits the `dismiss` event on click */
  @Prop() dismissible = false;

  /**
   * Accessible label for the dismiss button. Defaults to "Dismiss {heading}" when heading is set,
   * otherwise "Dismiss {variant} notification".
   */
  @Prop() dismissLabel?: string;

  /** Emitted when the dismiss button is clicked */
  @Event() dismiss!: EventEmitter<void>;

  private get resolvedDismissLabel(): string {
    if (this.dismissLabel) return this.dismissLabel;
    if (this.heading) return `Dismiss "${this.heading}"`;
    return `Dismiss ${this.variant} notification`;
  }

  private handleDismiss = () => {
    this.dismiss.emit();
  };

  render() {
    return (
      <Host
        role={this.variant === 'error' ? 'alert' : 'status'}
        aria-live={this.variant === 'error' ? undefined : 'polite'}
        aria-atomic={this.variant === 'error' ? undefined : 'true'}
      >
        <style>{getInlineNotificationStyles()}</style>
        <div class={`inline-notification inline-notification--${this.variant}`}>
          <span class="inline-notification__icon" aria-hidden="true">
            {this.variant === 'info' && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            )}
            {this.variant === 'success' && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            )}
            {this.variant === 'warning' && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            )}
            {this.variant === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            )}
          </span>
          <div class="inline-notification__body">
            {this.heading && <strong class="inline-notification__heading">{this.heading}</strong>}
            <div class="inline-notification__content">
              <slot />
            </div>
          </div>
          {this.dismissible && (
            <button
              type="button"
              class="inline-notification__dismiss"
              aria-label={this.resolvedDismissLabel}
              onClick={this.handleDismiss}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </Host>
    );
  }
}
