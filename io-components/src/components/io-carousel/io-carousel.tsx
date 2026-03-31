import { Component, Prop, Element, Host, h, State, Listen } from '@stencil/core';
import type { IoCarouselItem } from './types';
import { getCarouselStyles } from './io-carousel-styles';

/**
 * io-carousel
 * ============
 * Horizontally scrollable content card slider.
 * Supports drag-to-scroll and prev/next navigation buttons.
 *
 * Extracted from the "Related articles" section on iodigital.com.
 *
 * @example
 * <io-carousel></io-carousel>
 *
 * // Set items via property (framework usage):
 * carouselEl.items = [
 *   { type: 'Blog', title: 'Is AI taking over the customer journey?', ctaLabel: 'Read more', ctaHref: '#' },
 *   { type: 'Webinar', title: 'Cloud costs are skyrocketing', ctaLabel: 'Watch now', ctaHref: '#' },
 * ];
 */
@Component({
  tag: 'io-carousel',
  shadow: { delegatesFocus: true },
})
export class IoCarousel {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Slide data to render */
  @Prop({ mutable: false }) items: IoCarouselItem[] = [];

  /** Accessible label for the previous button */
  @Prop() prevLabel = 'Previous';

  /** Accessible label for the next button */
  @Prop() nextLabel = 'Next';

  // ── State ─────────────────────────────────────────────────────

  @State() private isDragging = false;

  // ── Drag helpers ──────────────────────────────────────────────

  private startX = 0;
  private scrollLeft = 0;

  private get track(): HTMLElement | null {
    return this.el.shadowRoot?.querySelector<HTMLElement>('.carousel-track') ?? null;
  }

  private slideWidth(): number {
    const firstSlide = this.track?.querySelector<HTMLElement>('.carousel-slide');
    if (!firstSlide) return 390;
    const gap = 16; // var(--io-space-4) = 1rem = 16px
    return firstSlide.offsetWidth + gap;
  }

  private onPrev = () => {
    this.track?.scrollBy({ left: -this.slideWidth(), behavior: 'smooth' });
  };

  private onNext = () => {
    this.track?.scrollBy({ left: this.slideWidth(), behavior: 'smooth' });
  };

  private onMouseDown = (ev: MouseEvent) => {
    const track = this.track;
    if (!track) return;
    this.isDragging = true;
    this.startX = ev.pageX - track.offsetLeft;
    this.scrollLeft = track.scrollLeft;
  };

  @Listen('mouseup', { target: 'window' })
  onMouseUp() {
    this.isDragging = false;
  }

  @Listen('mousemove', { target: 'window' })
  onMouseMove(ev: MouseEvent) {
    if (!this.isDragging) return;
    const track = this.track;
    if (!track) return;
    ev.preventDefault();
    const x = ev.pageX - track.offsetLeft;
    track.scrollLeft = this.scrollLeft - (x - this.startX);
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { items, prevLabel, nextLabel, isDragging } = this;

    const arrowSvg = (
      <svg viewBox="0 0 26 16" width="20" height="13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" fill="currentColor" />
      </svg>
    );

    return (
      <Host>
        <style>{getCarouselStyles()}</style>
        <div class="carousel-wrap">
          <div
            class={`carousel-track${isDragging ? ' carousel-track--dragging' : ''}`}
            onMouseDown={this.onMouseDown}
          >
            {items.map(item => (
              <div class="carousel-slide">
                <div
                  class="carousel-image"
                  style={item.imageBackground ? { background: item.imageBackground } : undefined}
                >
                  <span class="carousel-pill">{item.type}</span>
                </div>
                <div class="carousel-body">
                  <div class="carousel-type">{item.type}</div>
                  <div class="carousel-title">{item.title}</div>
                  {item.ctaLabel && (
                    <div class="carousel-cta">
                      <a href={item.ctaHref ?? '#'}>
                        {item.ctaLabel}
                        {arrowSvg}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button class="carousel-btn carousel-btn--prev" aria-label={prevLabel} onClick={this.onPrev}>
            {arrowSvg}
          </button>
          <button class="carousel-btn carousel-btn--next" aria-label={nextLabel} onClick={this.onNext}>
            {arrowSvg}
          </button>
        </div>
      </Host>
    );
  }
}
