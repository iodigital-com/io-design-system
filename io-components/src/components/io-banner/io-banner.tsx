import { Component, Element, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';

import { getBannerStyles } from './io-banner-styles';
import type { IoBannerVariant, IoBannerPosition, IoBannerHeadingTag } from './types';
import type { IoIconName } from '../../utils/icons';

/**
 * io-banner
 * =========
 * Fixed-position page-level notification banner with four severity variants.
 * Visibility is controlled by the `open` prop — the host hides itself when open=false.
 * Set open=true to show; wire the dismiss event to set it back to false.
 *
 * ARIA live region strategy:
 *   - error / warning variants: role="alert" on inner .banner div (assertive)
 *   - info / success variants:  role="status" + aria-live="polite" aria-atomic="true"
 *
 * Role is placed on the conditionally-rendered inner div so the live region only exists
 * while the banner is visible — prevents spurious announcements when open=false.
 *
 * @example
 * <io-banner variant="info" open heading="Maintenance scheduled">
 *   Scheduled maintenance on Saturday 10:00–12:00 UTC.
 * </io-banner>
 *
 * <io-banner variant="success" open dismissible>
 *   Your changes have been saved.
 * </io-banner>
 */
@Component({
  tag: 'io-banner',
  shadow: { delegatesFocus: true },
})
export class IoBanner {
  @Element() el!: HTMLElement;

  /** Severity variant — controls icon, colour, and aria-live politeness */
  @Prop({ reflect: true }) variant: IoBannerVariant = 'info';

  /** Optional bold heading rendered above the slotted content */
  @Prop() heading?: string;

  /** Semantic HTML tag for the heading element (WCAG 1.3.1) */
  @Prop() headingTag: IoBannerHeadingTag = 'h5';

  /** Optional description text rendered as a <p> below the heading */
  @Prop() description?: string;

  /** Controls visibility. Set to true to show the banner. */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** When true, renders a dismiss button that emits the `dismiss` event and closes the banner */
  @Prop() dismissible = false;

  /** Screen position of the fixed banner — top or bottom of the viewport */
  @Prop({ reflect: true }) position: IoBannerPosition = 'top';

  /**
   * Accessible label for the dismiss button. Defaults to "Dismiss {heading}" when heading is set,
   * otherwise "Dismiss {variant} notification".
   */
  @Prop() dismissLabel?: string;

  /** Label for an optional action button rendered before the dismiss button */
  @Prop() actionLabel?: string;

  /** Icon name for the action button (only rendered when actionLabel is set) */
  @Prop() actionIcon: IoIconName = 'arrow-right';

  /** When true, suppresses the action event (use during async operations) */
  @Prop() actionLoading = false;

  /** Emitted when the dismiss button is clicked or Escape is pressed */
  @Event() dismiss!: EventEmitter<void>;

  /** Emitted when the action button is clicked (suppressed when actionLoading=true) */
  @Event({ bubbles: false }) action!: EventEmitter<void>;

  @State() private hasContent = false;

  /** Set to true in @Watch('open') to focus the dismiss button after the next render */
  private needsFocus = false;

  private get resolvedDismissLabel(): string {
    if (this.dismissLabel) return this.dismissLabel;
    if (this.heading) return `Dismiss "${this.heading}"`;
    return `Dismiss ${this.variant} notification`;
  }

  private handleDismiss = () => {
    this.open = false;
    this.dismiss.emit();
  };

  private handleAction = () => {
    if (!this.actionLoading) this.action.emit();
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.dismissible) this.handleDismiss();
  };

  componentWillLoad(): void {
    if (this.open && this.dismissible) {
      this.needsFocus = true;
    }
  }

  connectedCallback(): void {
    if (this.open && this.dismissible) {
      document.addEventListener('keydown', this.handleKeyDown);
    }
  }

  disconnectedCallback(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  @Watch('open')
  onOpenChange(newVal: boolean): void {
    if (newVal && this.dismissible) {
      document.addEventListener('keydown', this.handleKeyDown);
      this.needsFocus = true;
    } else {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  @Watch('dismissible')
  onDismissibleChange(newVal: boolean): void {
    if (this.open) {
      if (newVal) {
        document.addEventListener('keydown', this.handleKeyDown);
      } else {
        document.removeEventListener('keydown', this.handleKeyDown);
      }
    }
  }

  componentDidRender(): void {
    if (this.needsFocus) {
      this.needsFocus = false;
      this.el?.shadowRoot?.querySelector<HTMLButtonElement>('.banner__dismiss')?.focus();
    }
  }

  private get isAssertive(): boolean {
    return this.variant === 'error' || this.variant === 'warning';
  }

  /**
   * @slot - Default slot. Notification message body text or inline elements.
   */
  render() {
    const headingTag = this.headingTag as keyof HTMLElementTagNameMap;
    const HeadingTag = headingTag;

    return (
      <Host>
        <style>{getBannerStyles()}</style>
        {/* #1076: The live-region wrapper is always mounted so the browser can
            register it before the first open. Visibility toggled via aria-hidden
            and display:none — matches the WAI-ARIA Authoring Practices guidance
            for pre-established live regions. */}
        <div
          class={`banner banner--${this.variant}`}
          role={this.isAssertive ? 'alert' : 'status'}
          aria-live={this.isAssertive ? undefined : 'polite'}
          aria-atomic={this.isAssertive ? undefined : 'true'}
          aria-hidden={this.open ? undefined : 'true'}
          style={{ display: this.open ? undefined : 'none' }}
        >
          <span class="banner__icon" aria-hidden="true">
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
          <div class="banner__body">
            {this.heading && <HeadingTag class="banner__heading">{this.heading}</HeadingTag>}
            {this.description && <p class="banner__description">{this.description}</p>}
            <div class={{ 'banner__content': true, 'banner__content--empty': !this.hasContent }}>
              <slot onSlotchange={(e: Event) => {
                const slot = e.target as HTMLSlotElement;
                this.hasContent = slot.assignedNodes({ flatten: true }).length > 0;
              }} />
            </div>
          </div>
          {this.actionLabel && (
            <button
              type="button"
              class={{ 'banner__action': true, 'banner__action--loading': this.actionLoading }}
              aria-busy={this.actionLoading ? 'true' : undefined}
              disabled={this.actionLoading || undefined}
              onClick={this.handleAction}
            >
              {this.actionLabel}
              <io-icon name={this.actionIcon} aria-hidden="true" />
            </button>
          )}
          {this.dismissible && (
            <button
              type="button"
              class="banner__dismiss"
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
