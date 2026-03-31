import { Component, Prop, Element, Host, h, State, Listen, Event, EventEmitter, Watch } from '@stencil/core';
import { getCarouselStyles } from './io-carousel-styles';
import type { IoCarouselSlidesPerPage, IoCarouselUpdateDetail } from './types';

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

  /** Number of slides to move per navigation step; use auto for slide-by-slide. */
  @Prop() slidesPerPage: IoCarouselSlidesPerPage = 1;

  /** Rewinds from last to first (and first to last) when navigating. */
  @Prop() rewind = false;

  /** Zero-based active slide index. */
  @Prop({ mutable: true, reflect: true }) activeSlideIndex = 0;

  /** Emitted when the active slide index changes. */
  @Event({ bubbles: false }) update!: EventEmitter<IoCarouselUpdateDetail>;

  // ── State ─────────────────────────────────────────────────────

  @State() private isDragging = false;

  // ── Drag helpers ──────────────────────────────────────────────

  private startX = 0;
  private scrollLeft = 0;

  private get track(): HTMLElement | null {
    return this.el.shadowRoot?.querySelector<HTMLElement>('.carousel-track') ?? null;
  }

  private get slotEl(): HTMLSlotElement | null {
    return this.el.shadowRoot?.querySelector<HTMLSlotElement>('slot') ?? null;
  }

  private get slides(): HTMLElement[] {
    return (this.slotEl?.assignedElements() ?? []).filter((el): el is HTMLElement => el instanceof HTMLElement);
  }

  private get totalSlides(): number {
    return this.slides.length;
  }

  private get normalizedSlidesPerPage(): IoCarouselSlidesPerPage {
    if (this.slidesPerPage === 'auto') return 'auto';
    const parsed = Number(this.slidesPerPage);
    if (!Number.isFinite(parsed) || parsed < 1) return 1;
    return Math.floor(parsed);
  }

  private get stepSize(): number {
    const spp = this.normalizedSlidesPerPage;
    return spp === 'auto' ? 1 : spp;
  }

  private getSlideLeft(index: number): number {
    const track = this.track;
    const slide = this.slides[index];
    if (!track || !slide) return 0;
    const trackRect = track.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    return track.scrollLeft + (slideRect.left - trackRect.left);
  }

  private clampIndex(index: number): number {
    if (this.totalSlides === 0) return 0;
    return Math.max(0, Math.min(index, this.totalSlides - 1));
  }

  private getNearestSlideIndex(): number {
    const track = this.track;
    if (!track || this.totalSlides === 0) return 0;

    const current = track.scrollLeft;
    let nearest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    this.slides.forEach((_, i) => {
      const dist = Math.abs(this.getSlideLeft(i) - current);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = i;
      }
    });

    return nearest;
  }

  private syncIndexFromScroll = () => {
    this.setActiveIndex(this.getNearestSlideIndex(), true);
  };

  private scrollToIndex(index: number, behavior: ScrollBehavior): void {
    const track = this.track;
    if (!track || this.totalSlides === 0) return;
    const clamped = this.clampIndex(index);
    track.scrollTo({ left: this.getSlideLeft(clamped), behavior });
  }

  private setActiveIndex(index: number, emitEvent: boolean): void {
    const next = this.clampIndex(index);
    if (next === this.activeSlideIndex) return;
    this.activeSlideIndex = next;
    if (emitEvent) {
      this.update.emit({ activeIndex: next, totalSlides: this.totalSlides });
    }
  }

  private onPrev = () => {
    const track = this.track;
    if (!track) return;

    if (this.totalSlides > 0) {
      const currentIndex = this.getNearestSlideIndex();
      const rawTarget = currentIndex - this.stepSize;
      const targetIndex = rawTarget < 0 ? (this.rewind ? this.totalSlides - 1 : 0) : rawTarget;
      const targetLeft = this.getSlideLeft(targetIndex);

      this.setActiveIndex(targetIndex, true);

      if (Math.abs(targetLeft - track.scrollLeft) > 1) {
        track.scrollTo({ left: targetLeft, behavior: 'smooth' });
        return;
      }
    }

    const fallbackDistance = Math.max(track.clientWidth / Math.max(this.stepSize, 1), 1);
    const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0);

    if (this.rewind && track.scrollLeft <= 1) {
      track.scrollTo({ left: maxScroll, behavior: 'smooth' });
      return;
    }

    track.scrollBy({ left: -fallbackDistance, behavior: 'smooth' });
  };

  private onNext = () => {
    const track = this.track;
    if (!track) return;

    if (this.totalSlides > 0) {
      const currentIndex = this.getNearestSlideIndex();
      const rawTarget = currentIndex + this.stepSize;
      const targetIndex = rawTarget >= this.totalSlides ? (this.rewind ? 0 : this.totalSlides - 1) : rawTarget;
      const targetLeft = this.getSlideLeft(targetIndex);

      this.setActiveIndex(targetIndex, true);

      if (Math.abs(targetLeft - track.scrollLeft) > 1) {
        track.scrollTo({ left: targetLeft, behavior: 'smooth' });
        return;
      }
    }

    const fallbackDistance = Math.max(track.clientWidth / Math.max(this.stepSize, 1), 1);
    const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0);

    if (this.rewind && track.scrollLeft >= maxScroll - 1) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    track.scrollBy({ left: fallbackDistance, behavior: 'smooth' });
  };

  private onTrackScroll = () => {
    this.syncIndexFromScroll();
  };

  private onSlotChange = () => {
    this.setActiveIndex(this.activeSlideIndex, false);
    this.scrollToIndex(this.activeSlideIndex, 'auto');
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

  @Listen('resize', { target: 'window' })
  onResize() {
    this.scrollToIndex(this.activeSlideIndex, 'auto');
  }

  @Watch('activeSlideIndex')
  onActiveSlideIndexChange(newValue: number) {
    this.scrollToIndex(newValue, 'auto');
  }

  componentDidLoad() {
    this.setActiveIndex(this.activeSlideIndex, false);
    this.scrollToIndex(this.activeSlideIndex, 'auto');
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
            onScroll={this.onTrackScroll}
          >
            <slot onSlotchange={this.onSlotChange} />
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
