import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';

import { getInlineNotificationStyles } from './io-inline-notification-styles';
import type { IoInlineNotificationHeadingTag, IoInlineNotificationVariant } from './types';
import type { IoIconName } from '../../utils/icons';

/**
 * io-inline-notification
 * ======================
 * Inline content-level notification with four severity variants.
 * Sits within the content flow — no open/close state. The consumer
 * controls visibility by mounting or unmounting the element.
 *
 * ARIA live region strategy:
 *   - error/warning variants: role="alert" aria-live="assertive" aria-atomic="true" (interrupts screen reader)
 *   - info/success variants:  role="status" aria-live="polite"  aria-atomic="true" (polite announcement)
 *
 * aria-atomic="true" is applied to ALL variants so the entire notification is read as a unit.
 *
 * @example
 * <io-inline-notification variant="warning" heading="Storage limit">
 *   You have used 90% of your quota.
 * </io-inline-notification>
 *
 * <io-inline-notification variant="error" dismissible>
 *   Failed to save. Please try again.
 * </io-inline-notification>
 *
 * <io-inline-notification variant="info" action-label="Log Trip" action-icon="arrow-right">
 *   Your trip is ready to be logged.
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

  /** Semantic HTML tag for the notification heading. Defaults to 'h5' to avoid disrupting document hierarchy in most layouts. */
  @Prop() headingTag: IoInlineNotificationHeadingTag = 'h5';

  /** When true, renders a dismiss button that emits the `dismiss` event on click */
  @Prop() dismissible = false;

  /**
   * Accessible label for the dismiss button. Defaults to "Dismiss {heading}" when heading is set,
   * otherwise "Dismiss {variant} notification".
   */
  @Prop() dismissLabel?: string;

  /** Label for the optional inline call-to-action button. When omitted, no action button is rendered. */
  @Prop() actionLabel?: string;

  /** Icon rendered on the action button. Defaults to 'arrow-right'. */
  @Prop() actionIcon: IoIconName = 'arrow-right';

  /**
   * Accessible label for the notification live region (aria-label on the host element).
   * Use when the page contains multiple notifications and consumers need to distinguish them.
   * When omitted no aria-label is set and the notification content provides its own accessible name.
   */
  @Prop() label?: string;

  /** When true, the action button shows a loading spinner and interaction is suppressed. */
  @Prop() actionLoading = false;

  /** Emitted when the dismiss button is clicked */
  @Event() dismiss!: EventEmitter<void>;

  /** Emitted when the action button is clicked (not emitted while actionLoading is true) */
  @Event({ bubbles: false }) action!: EventEmitter<void>;

  @State() private hasContent = false;

  private get resolvedDismissLabel(): string {
    if (this.dismissLabel) return this.dismissLabel;
    if (this.heading) return `Dismiss "${this.heading}"`;
    return `Dismiss ${this.variant} notification`;
  }

  private handleDismiss = () => {
    this.dismiss.emit();
  };

  private handleAction = () => {
    if (!this.actionLoading) {
      this.action.emit();
    }
  };

  /**
   * @slot - Default slot. Notification message body text or inline elements.
   */
  render() {
    const isAssertive = this.variant === 'error' || this.variant === 'warning';
    const HeadingTag = this.headingTag;

    return (
      <Host
        role={isAssertive ? 'alert' : 'status'}
        aria-live={isAssertive ? 'assertive' : 'polite'}
        aria-atomic="true"
        aria-label={this.label || undefined}
      >
        <style>{getInlineNotificationStyles(this.variant)}</style>
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
            {this.heading && <HeadingTag class="inline-notification__heading">{this.heading}</HeadingTag>}
            <div class={{ 'inline-notification__content': true, 'inline-notification__content--empty': !this.hasContent }}>
              <slot onSlotchange={(e: Event) => {
                const slot = e.target as HTMLSlotElement;
                this.hasContent = slot.assignedNodes({ flatten: true }).length > 0;
              }} />
            </div>
            {this.actionLabel && (
              <div class="inline-notification__actions">
                <io-button
                  size="sm"
                  variant="ghost"
                  icon={this.actionIcon}
                  icon-position="right"
                  loading={this.actionLoading}
                  onClick={this.handleAction}
                >
                  {this.actionLabel}
                </io-button>
              </div>
            )}
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
