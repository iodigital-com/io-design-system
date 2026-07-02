import { Component, Element, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';

import { getBannerStyles } from './io-banner-styles';
import { getNotificationIconName } from '../../utils/notification-icons';
import type { IoBannerVariant, IoBannerPosition, IoBannerPositionValue, IoBannerHeadingTag } from './types';
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

  /**
   * Screen position of the banner. Accepts a flat string or a responsive
   * breakpoint object. Defaults to `{ base: 'bottom', s: 'top' }` which
   * follows the standard notification pattern: bottom on mobile, top on desktop.
   *
   * @example
   * position="top"
   * :position="{ base: 'bottom', s: 'top' }"
   */
  @Prop() position: IoBannerPosition = { base: 'bottom', s: 'top' };

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

  private popoverEl?: HTMLDivElement;

  /**
   * Resolve the flat position value for the current viewport.
   * When position is an object, prefer the most specific matching key
   * based on the current window width. Falls back to 'top'.
   */
  private get resolvedPosition(): IoBannerPositionValue {
    const pos = this.position;
    if (typeof pos === 'string') return pos as IoBannerPositionValue;

    // Breakpoint widths: base=0, s=640, m=1024, l=1280
    if (typeof window === 'undefined') return (pos.base ?? 'top') as IoBannerPositionValue;
    const w = window.innerWidth;
    if (w >= 1280 && pos.l) return pos.l;
    if (w >= 1024 && pos.m) return pos.m;
    if (w >= 640 && pos.s) return pos.s;
    return (pos.base ?? 'top') as IoBannerPositionValue;
  }

  /** Returns the CSS classes to apply on the inner banner div based on resolved position */
  private get bannerPositionClass(): string {
    return `banner--position-${this.resolvedPosition}`;
  }

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
    // Manage popover visibility via the Popover API for top-layer rendering.
    // This escapes z-index stacking contexts set by <dialog>, <select>, etc.
    if (this.popoverEl) {
      const popEl = this.popoverEl as HTMLDivElement & {
        showPopover?: () => void;
        hidePopover?: () => void;
      };
      if (this.open) {
        try { popEl.showPopover?.(); } catch { /* polyfill missing */ }
      } else {
        try { popEl.hidePopover?.(); } catch { /* already hidden */ }
      }
    }

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
        <div
          class="banner__popover"
          popover="manual"
          ref={(el?: HTMLDivElement) => { this.popoverEl = el; }}
        >
        <div
          class={`banner banner--${this.variant} ${this.bannerPositionClass}`}
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
        </div>
      </Host>
    );
  }
}
