import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core';

import { getScrollerStyles } from './io-scroller-styles';
import { getScrollerClass } from './io-scroller-utils';
import type { IoScrollerOrientation } from './types';

/**
 * io-scroller
 * ===========
 * Horizontally or vertically scrollable content wrapper with gradient fade
 * indicators at each edge. Fade appears when there is scrollable content in
 * that direction and hides automatically when scrolled to the edge.
 *
 * Uses IntersectionObserver on sentinel elements at the start and end of the
 * scroll content to detect edge proximity without polling scroll position.
 *
 * @example
 * <io-scroller>
 *   <io-button>Tab 1</io-button>
 *   <io-button>Tab 2</io-button>
 *   <!-- …more buttons… -->
 * </io-scroller>
 *
 * @example
 * <io-scroller orientation="vertical" label="Navigation links">
 *   <nav><!-- long list of links --></nav>
 * </io-scroller>
 */
@Component({
  tag: 'io-scroller',
  shadow: { delegatesFocus: true },
})
export class IoScroller {
  // ── Element ref ──────────────────────────────────────────────

  @Element() el!: HTMLIoScrollerElement;

  // ── Props ─────────────────────────────────────────────────────

  /**
   * Scroll axis.
   * `horizontal` — content overflows left/right.
   * `vertical`   — content overflows top/bottom.
   * Reflected as an attribute.
   */
  @Prop({ reflect: true }) orientation: IoScrollerOrientation = 'horizontal';

  /**
   * When `false` (default), the native scrollbar is hidden and fades
   * serve as the scroll affordance. Set to `true` to show the native
   * scrollbar alongside the fade indicators.
   */
  @Prop() showScrollbar = false;

  /**
   * Accessible label set as `aria-label` on the scroll region.
   * Provides context for screen reader users navigating with the keyboard.
   * Defaults to a generic description when not provided.
   */
  @Prop() label: string | undefined;

  // ── State ─────────────────────────────────────────────────────

  /** True when scroll position is at the start edge (no fade shown at start). */
  @State() atStart = true;

  /** True when scroll position is at the end edge (no fade shown at end). */
  @State() atEnd = true;

  // ── Private fields ────────────────────────────────────────────

  private scrollContainer: HTMLDivElement | undefined;
  private startSentinel: HTMLDivElement | undefined;
  private endSentinel: HTMLDivElement | undefined;
  private observer: IntersectionObserver | undefined;
  private scrollHandler: (() => void) | undefined;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentDidLoad(): void {
    this.setupObserver();
  }

  disconnectedCallback(): void {
    this.teardownObserver();
  }

  @Watch('orientation')
  handleOrientationChange(): void {
    this.teardownObserver();
    this.setupObserver();
  }

  // ── Private helpers ───────────────────────────────────────────

  private setupObserver(): void {
    const container = this.scrollContainer;
    const start = this.startSentinel;
    const end = this.endSentinel;

    if (!container || !start || !end) {
      return;
    }

    // Use IntersectionObserver to track whether sentinels at each edge
    // are visible within the scroll container's viewport.
    // A sentinel being visible means we are at that edge (no fade needed).
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target === start) {
              this.atStart = entry.isIntersecting;
            } else if (entry.target === end) {
              this.atEnd = entry.isIntersecting;
            }
          }
          this.syncHostClasses();
        },
        {
          root: container,
          threshold: 0.1,
        },
      );

      this.observer.observe(start);
      this.observer.observe(end);
    } else {
      // Fallback: scroll event listener for environments without
      // IntersectionObserver (e.g. jsdom in tests).
      this.scrollHandler = () => {
        this.updateEdgeStateFromScroll(container);
      };
      container.addEventListener('scroll', this.scrollHandler, { passive: true });
      this.updateEdgeStateFromScroll(container);
    }
  }

  private updateEdgeStateFromScroll(container: HTMLDivElement): void {
    const isHorizontal = this.orientation === 'horizontal';
    const scrollPos = isHorizontal ? container.scrollLeft : container.scrollTop;
    const maxScroll = isHorizontal
      ? container.scrollWidth - container.clientWidth
      : container.scrollHeight - container.clientHeight;

    const newAtStart = scrollPos <= 1;
    const newAtEnd = maxScroll <= 1 || scrollPos >= maxScroll - 1;

    this.atStart = newAtStart;
    this.atEnd = newAtEnd;
    this.syncHostClasses();
  }

  private teardownObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }

    if (this.scrollHandler && this.scrollContainer) {
      this.scrollContainer.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = undefined;
    }
  }

  private syncHostClasses(): void {
    // Apply host classes so the CSS pseudo-element fades activate.
    // Fade at start: visible when NOT at start.
    // Fade at end:   visible when NOT at end.
    if (this.el) {
      this.el.classList.toggle('has-fade-start', !this.atStart);
      this.el.classList.toggle('has-fade-end', !this.atEnd);
    }
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const scrollerClass = getScrollerClass(
      this.orientation,
      this.showScrollbar,
      this.atStart,
      this.atEnd,
    );

    const regionLabel = this.label ?? `Scrollable ${this.orientation} region`;

    return (
      <Host>
        <style>{getScrollerStyles()}</style>
        <div
          class={scrollerClass}
          role="region"
          aria-label={regionLabel}
          tabIndex={0}
          ref={(el) => {
            this.scrollContainer = el as HTMLDivElement;
          }}
        >
          <div
            class="scroller__sentinel scroller__sentinel--start"
            aria-hidden="true"
            ref={(el) => {
              this.startSentinel = el as HTMLDivElement;
            }}
          />
          <slot />
          <div
            class="scroller__sentinel scroller__sentinel--end"
            aria-hidden="true"
            ref={(el) => {
              this.endSentinel = el as HTMLDivElement;
            }}
          />
        </div>
      </Host>
    );
  }
}
