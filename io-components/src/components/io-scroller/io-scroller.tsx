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

  /**
   * When `true`, reduces internal gap between slotted items for dense
   * layout contexts. Reflected as an attribute so CSS can target it.
   */
  @Prop({ reflect: true }) compact = false;

  /**
   * When `true`, the scroll indicator buttons use `position: sticky` so they
   * remain visible during long scrolls. Reflected as an attribute so CSS can
   * target it. Use `--io-scroller-indicator-sticky-offset` to adjust the
   * top/bottom offset when the scroller is inside a layout with a sticky header.
   */
  @Prop({ reflect: true }) sticky = false;

  /**
   * ARIA `role` pass-through for the scroll container element.
   * When set, the role is forwarded to the inner scroll `<div>` instead of
   * the default `"region"` role. Use this when composing io-scroller inside
   * another component that requires a specific role (e.g. `"tablist"`).
   */
  @Prop() scrollRole: string | undefined;

  /**
   * ARIA `aria-orientation` pass-through for the scroll container element.
   * Forwarded verbatim — use `"horizontal"` or `"vertical"`.
   * When omitted, `aria-orientation` is derived from the `orientation` prop.
   */
  @Prop() scrollAriaOrientation: 'horizontal' | 'vertical' | undefined;

  /**
   * ARIA `aria-label` pass-through for the scroll container element.
   * When set, overrides the auto-generated label derived from the `label` prop.
   */
  @Prop() scrollAriaLabel: string | undefined;

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

  private scrollBy(direction: 'prev' | 'next'): void {
    const el = this.scrollContainer;
    if (!el) return;
    const isVertical = this.orientation === 'vertical';
    const size = isVertical ? el.clientHeight : el.clientWidth;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const offset = Math.round(size / 2) || 200;
    const delta = direction === 'prev' ? -offset : offset;
    if (isVertical) {
      el.scrollBy({ top: delta, behavior: reducedMotion ? 'auto' : 'smooth' });
    } else {
      el.scrollBy({ left: delta, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }

  private scrollToExtent(direction: 'start' | 'end'): void {
    const el = this.scrollContainer;
    if (!el) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = reducedMotion ? 'auto' : 'smooth';
    const isVertical = this.orientation === 'vertical';
    if (direction === 'start') {
      el.scrollTo(isVertical ? { top: 0, behavior } : { left: 0, behavior });
    } else {
      const max = isVertical ? el.scrollHeight : el.scrollWidth;
      el.scrollTo(isVertical ? { top: max, behavior } : { left: max, behavior });
    }
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const scrollerClass = getScrollerClass(this.orientation, this.showScrollbar);

    // ARIA pass-through: allow consumers to override role and aria attributes
    // on the scroll container. This enables io-scroller to be composed inside
    // components that require a specific role (e.g. tablist for io-tabs-bar).
    const containerRole = this.scrollRole ?? 'region';
    const containerAriaLabel = this.scrollAriaLabel ?? this.label ?? `Scrollable ${this.orientation} region`;
    // When a custom role is set (e.g. "tablist"), aria-label on the container
    // names the widget. When using the default "region" role, the label is
    // required for the landmark to be distinguishable.
    const containerAriaOrientation = this.scrollAriaOrientation ?? this.orientation;

    return (
      <Host>
        <style>{getScrollerStyles()}</style>
        {!this.atStart && (
          <button
            type="button"
            class={`scroller__indicator scroller__indicator--prev${this.sticky ? ' scroller__indicator--sticky' : ''}`}
            tabIndex={-1}
            aria-label="Scroll backward"
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => this.scrollBy('prev')}
          />
        )}
        {!this.atEnd && (
          <button
            type="button"
            class={`scroller__indicator scroller__indicator--next${this.sticky ? ' scroller__indicator--sticky' : ''}`}
            tabIndex={-1}
            aria-label="Scroll forward"
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => this.scrollBy('next')}
          />
        )}
        <div
          class={scrollerClass}
          role={containerRole}
          aria-label={containerAriaLabel}
          aria-orientation={containerAriaOrientation}
          tabIndex={(!this.atStart || !this.atEnd) ? 0 : undefined}
          onKeyDown={(ev: KeyboardEvent) => {
            const isVertical = this.orientation === 'vertical';
            if ((isVertical ? ev.key === 'ArrowUp' : ev.key === 'ArrowLeft')) {
              ev.preventDefault();
              this.scrollBy('prev');
            } else if ((isVertical ? ev.key === 'ArrowDown' : ev.key === 'ArrowRight')) {
              ev.preventDefault();
              this.scrollBy('next');
            } else if (ev.key === 'Home') {
              ev.preventDefault();
              this.scrollToExtent('start');
            } else if (ev.key === 'End') {
              ev.preventDefault();
              this.scrollToExtent('end');
            }
          }}
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
