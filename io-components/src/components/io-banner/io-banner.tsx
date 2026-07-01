import { Component, Element, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';

import { getBannerStyles } from './io-banner-styles';
import { getNotificationIconName } from '../../utils/notification-icons';
import type { IoBannerVariant, IoBannerPosition, IoBannerHeadingTag } from './types';
import type { IoIconName } from '../../utils/icons';

/**
 * io-banner
 * =========
 * Fixed-position page-level notification banner with four severity variants.
 * Visibility is controlled by the `open` prop — the host hides itself when open=false.
 * Set open=true to show; wire the dismiss event to set it back to false.
 *
 * ARIA live region strategy (issue #1076):
 *   The inner `.banner` wrapper is always present in the DOM; visibility is
 *   toggled via aria-hidden + CSS display:none. This ensures screen readers
 *   have seen the live region before the first announcement, preventing the
 *   well-known NVDA/JAWS "first open missed" quirk with newly-inserted regions.
 *
 * Focus management (issues #997, #998):
 *   - When `open && dismissible`, focus moves to the dismiss button on the
 *     render after the transition occurs. This covers initial open, programmatic
 *     open, and runtime toggling of `dismissible` on an already-open banner.
 *   - A previous-focus reference is captured when the banner opens, and
 *     restored when it dismisses.
 *
 * Dismiss guard (issue #1012):
 *   A `_dismissing` state flag prevents duplicate dismiss events from rapid
 *   Escape presses or double-clicks. An exit animation runs while `_dismissing`
 *   is true, and `open` is set to false only after the CSS transition ends.
 *
 * @example
 * <io-banner variant="info" open heading="Maintenance scheduled">
 *   Scheduled maintenance on Saturday 10:00–12:00 UTC.
 * </io-banner>
 *
 * <io-banner variant="success" open dismissible>
 *   Your changes have been saved.
 * </io-banner>
 *
 * <io-banner variant="info" open>
 *   <span slot="heading">Maintenance on <a href="/status">status page</a></span>
 *   Extended details below.
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
  @State() private hasHeadingSlot = false;

  /**
   * True while the exit animation is running.
   * Prevents duplicate dismiss events from rapid Escape presses or double-clicks.
   */
  @State() private _dismissing = false;

  /**
   * Tracks whether the dismiss button should receive focus on the next render.
   * Set whenever `open && dismissible` transitions become true.
   */
  private _shouldFocusDismiss = false;

  /**
   * The element that had focus before the banner opened.
   * Focus is restored here when the banner closes.
   */
  private _openerEl: HTMLElement | null = null;

  private get resolvedDismissLabel(): string {
    if (this.dismissLabel) return this.dismissLabel;
    if (this.heading) return `Dismiss "${this.heading}"`;
    if (this.hasHeadingSlot) {
      const slot = this.el?.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="heading"]');
      const nodes = slot?.assignedNodes({ flatten: true }) ?? [];
      const text = nodes.map((n) => n.textContent ?? '').join('').trim();
      if (text) return `Dismiss "${text}"`;
    }
    return `Dismiss ${this.variant} notification`;
  }

  private handleDismiss = () => {
    // Guard: ignore if already in the process of dismissing
    if (this._dismissing) return;
    this._dismissing = true;

    // Restore focus to the opener before closing (WCAG 2.4.3, issue #998)
    this._openerEl?.focus();
    this._openerEl = null;
  };

  private handleTransitionEnd = (e: TransitionEvent) => {
    // Only react to the primary transition on the banner element itself
    if ((e.target as HTMLElement)?.classList?.contains('banner') && this._dismissing) {
      this._dismissing = false;
      this.open = false;
      this.dismiss.emit();
    }
  };

  private handleAction = () => {
    if (!this.actionLoading) this.action.emit();
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.dismissible) this.handleDismiss();
  };

  componentWillLoad(): void {
    if (this.open && this.dismissible) {
      this._shouldFocusDismiss = true;
    }
    if (this.open && this.dismissible) {
      document.addEventListener('keydown', this.handleKeyDown);
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
  onOpenChange(newVal: boolean, oldVal: boolean): void {
    if (newVal) {
      document.addEventListener('keydown', this.handleKeyDown);
      // Capture opener when transitioning false → true
      if (!oldVal) {
        this._openerEl = document.activeElement as HTMLElement | null;
      }
      if (this.dismissible) {
        this._shouldFocusDismiss = true;
      }
    } else {
      document.removeEventListener('keydown', this.handleKeyDown);
      this._dismissing = false;
    }
  }

  @Watch('dismissible')
  onDismissibleChange(newVal: boolean): void {
    if (this.open) {
      if (newVal) {
        document.addEventListener('keydown', this.handleKeyDown);
        // Banner is open and dismissible just became true — focus the button
        this._shouldFocusDismiss = true;
      } else {
        document.removeEventListener('keydown', this.handleKeyDown);
      }
    }
  }

  componentDidRender(): void {
    if (this._shouldFocusDismiss && this.open && this.dismissible) {
      this._shouldFocusDismiss = false;
      this.el?.shadowRoot?.querySelector<HTMLButtonElement>('.banner__dismiss')?.focus();
    }
  }

  private get isAssertive(): boolean {
    return this.variant === 'error' || this.variant === 'warning';
  }

  /**
   * @slot - Default slot. Notification message body text or inline elements.
   * @slot heading - Optional rich heading content. Takes precedence over the `heading` prop.
   */
  render() {
    const headingTag = this.headingTag as keyof HTMLElementTagNameMap;
    const HeadingTag = headingTag;
    const iconName = getNotificationIconName(this.variant);

    // The live-region wrapper is always mounted (issue #1076) so assistive tech
    // registers it before the first announcement. aria-hidden hides it from the
    // a11y tree when closed; CSS display:none removes it from layout.
    const bannerHidden = !this.open;

    return (
      <Host>
        <style>{getBannerStyles()}</style>
        {/* #1076: The live-region wrapper is always mounted so the browser can
            register it before the first open. Visibility toggled via aria-hidden
            and display:none — matches the WAI-ARIA Authoring Practices guidance
            for pre-established live regions. */}
        <div
          class={{
            banner: true,
            [`banner--${this.variant}`]: true,
            'banner--dismissing': this._dismissing,
          }}
          role={this.isAssertive ? 'alert' : 'status'}
          aria-live={this.isAssertive ? undefined : 'polite'}
          aria-atomic={this.isAssertive ? undefined : 'true'}
          aria-hidden={bannerHidden ? 'true' : undefined}
          style={{ display: this.open ? undefined : 'none' }}
          onTransitionEnd={this.handleTransitionEnd}
        >
          <span class="banner__icon" aria-hidden="true">
            <io-icon name={iconName} />
          </span>
          <div class="banner__body">
            {this.heading
              ? <HeadingTag class="banner__heading">{this.heading}</HeadingTag>
              : <HeadingTag class={{ 'banner__heading': true, 'banner__heading--hidden': !this.hasHeadingSlot }}>
                  <slot
                    name="heading"
                    onSlotchange={(e: Event) => {
                      const slot = e.target as HTMLSlotElement;
                      this.hasHeadingSlot = slot.assignedNodes({ flatten: true }).length > 0;
                    }}
                  />
                </HeadingTag>
            }
            {this.description && <p class="banner__description">{this.description}</p>}
            <div class={{ 'banner__content': true, 'banner__content--empty': !this.hasContent }}>
              <slot onSlotchange={(e: Event) => {
                const slot = e.target as HTMLSlotElement;
                this.hasContent = slot.assignedNodes({ flatten: true }).length > 0;
              }} />
            </div>
          </div>
          {this.actionLabel && (
            <io-button
              variant="ghost"
              size="sm"
              icon={this.actionIcon}
              icon-position="right"
              loading={this.actionLoading}
              onClick={this.handleAction}
            >
              {this.actionLabel}
            </io-button>
          )}
          {this.dismissible && (
            <io-button
              class="banner__dismiss"
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
