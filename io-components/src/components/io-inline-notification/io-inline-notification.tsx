import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';

import { getInlineNotificationStyles } from './io-inline-notification-styles';
import { getNotificationIconName } from '../../utils/notification-icons';
import type { IoInlineNotificationHeadingTag, IoInlineNotificationVariant } from './types';

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
 *
 * <io-inline-notification variant="info">
 *   <span slot="heading">Maintenance on <a href="/status">status page</a></span>
 *   Extended details below.
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
  @Prop() actionIcon = 'arrow-right';

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
  @State() private hasHeadingSlot = false;

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
   * @slot heading - Optional rich heading content. Takes precedence over the `heading` prop.
   */
  render() {
    const isAssertive = this.variant === 'error' || this.variant === 'warning';
    const HeadingTag = this.headingTag;
    const iconName = getNotificationIconName(this.variant);

    return (
      <Host aria-label={this.label || undefined}>
        <style>{getInlineNotificationStyles(this.variant)}</style>
        {/* #1024: Live region attributes moved from Host to the inner div.
            A key based on variant forces a DOM re-mount when severity changes,
            so screen readers see a fresh live region and re-announce. */}
        <div
          key={`inline-notification-${this.variant}`}
          class={`inline-notification inline-notification--${this.variant}`}
          role={isAssertive ? 'alert' : 'status'}
          aria-live={isAssertive ? 'assertive' : 'polite'}
          aria-atomic="true"
        >
          <span class="inline-notification__icon" aria-hidden="true">
            <io-icon name={iconName} />
          </span>
          <div class="inline-notification__body">
            {this.heading
              ? <HeadingTag class="inline-notification__heading">{this.heading}</HeadingTag>
              : <HeadingTag class={{ 'inline-notification__heading': true, 'inline-notification__heading--hidden': !this.hasHeadingSlot }}>
                  <slot
                    name="heading"
                    onSlotchange={(e: Event) => {
                      const slot = e.target as HTMLSlotElement;
                      this.hasHeadingSlot = slot.assignedNodes({ flatten: true }).length > 0;
                    }}
                  />
                </HeadingTag>
            }
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
            <io-button
              class="inline-notification__dismiss"
              variant="ghost"
              size="sm"
              icon="x"
              aria-label={this.resolvedDismissLabel}
              onClick={this.handleDismiss}
            />
          )}
        </div>
      </Host>
    );
  }
}
