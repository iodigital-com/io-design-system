import { Component, Prop, Element, Host, h, State, Listen } from '@stencil/core';
import { getCarouselStyles } from './io-carousel-styles';

/**
 * io-carousel
 * ============
 * Generic horizontally scrollable container with prev/next navigation,
 * drag-to-scroll, and a custom scrollbar.
 *
 * Inner content is projected via the default slot — the carousel does not
 * dictate slide structure. Put any HTML you need inside.
 *
 * @slot - Default slot for slide content (cards, images, etc.)
 *
 * @example
 * <io-carousel>
 *   <div class="card">Slide 1</div>
 *   <div class="card">Slide 2</div>
 *   <div class="card">Slide 3</div>
 * </io-carousel>
 */
@Component({
  tag: 'io-carousel',
  shadow: { delegatesFocus: true },
})
export class IoCarousel {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

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
    const slot = this.el.shadowRoot?.querySelector<HTMLSlotElement>('slot');
    const first = slot?.assignedElements()?.[0] as HTMLElement | undefined;
    if (!first) return 390;
    const gap = 16; // var(--io-space-4) = 1rem = 16px
    return first.offsetWidth + gap;
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
    const { prevLabel, nextLabel, isDragging } = this;

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
            <slot />
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
