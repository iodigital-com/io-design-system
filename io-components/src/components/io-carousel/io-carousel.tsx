import { Component, Prop, Element, Host, h, State, Listen, Event, EventEmitter, Watch } from '@stencil/core';

import { getCarouselStyles } from './io-carousel-styles';
import { clampSlideIndex, getCarouselFallbackDistance, getCarouselStepSize, getCarouselTargetIndex, normalizeSlidesPerPage, shouldUseTargetScroll } from './io-carousel-utils';

import type { IoCarouselAlignHeader, IoCarouselSlidesPerPage, IoCarouselUpdateDetail } from './types';

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
 * @slot heading - Optional heading rendered above the slide track. When present,
 *   `aria-labelledby` on the carousel region points to this element instead of
 *   using the `label` prop. Falls back to `label` prop when slot is empty.
 * @slot description - Optional description rendered below the heading and above
 *   the slide track.
 * @slot controls - Optional slot rendered adjacent to the Prev/Next navigation
 *   buttons. Use for pagination dots, thumbnails, or other custom indicators.
 *
 * @example
 * <io-carousel>
 *   <h2 slot="heading">Featured Articles</h2>
 *   <p slot="description">Browse our latest content.</p>
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

  /**
   * Accessible label for the carousel region. Used as `aria-label` when no
   * `heading` slot content is present. When the `heading` slot is occupied,
   * `aria-labelledby` is used instead and this prop is ignored.
   */
  @Prop() label = 'Carousel';

  /** Number of slides to move per navigation step; use auto for slide-by-slide. */
  @Prop() slidesPerPage: IoCarouselSlidesPerPage = 1;

  /** Rewinds from last to first (and first to last) when navigating. */
  @Prop() rewind = false;

  /** Zero-based active slide index. */
  @Prop({ mutable: true, reflect: true }) activeSlideIndex = 0;

  /** Optional heading text rendered above the slide track. */
  @Prop() heading?: string;

  /** Optional description text rendered below the heading and above the slide track. */
  @Prop() description?: string;

  /** When true, renders dot indicators below the slides, each synced to activeSlideIndex. */
  @Prop() pagination = false;

  /** Alignment of the heading and description header area. */
  @Prop() alignHeader: IoCarouselAlignHeader = 'left';

  /** Emitted when the active slide index changes. */
  @Event({ eventName: 'update', bubbles: true, composed: true, cancelable: false }) update!: EventEmitter<IoCarouselUpdateDetail>;

  // ── State ─────────────────────────────────────────────────────

  @State() private isDragging = false;
  @State() private slideAnnouncement = '';
  @State() private hasHeadingSlot = false;
  @State() private hasDescriptionSlot = false;
  @State() private hasControlsSlot = false;
  /** True when the track is scrolled to the physical start. Used to disable prev button when rewind=false. */
  @State() private isAtStart = true;
  /** True when the track is scrolled to the physical end. Used to disable next button when rewind=false. */
  @State() private isAtEnd = false;

  // ── Private fields ────────────────────────────────────────────

  /**
   * True while setActiveIndex is propagating an internal scroll-driven change.
   * Prevents the @Watch from calling scrollToIndex and interrupting ongoing
   * smooth-scroll animations (e.g. rewind from last to first slide).
   */
  private _internalScroll = false;

  /** Stable ID for the heading element — used in aria-labelledby. */
  private headingId = '';

  // ── Slot-change handlers ──────────────────────────────────────

  private handleHeadingSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    this.hasHeadingSlot = slot.assignedElements().length > 0;
  };

  private handleDescriptionSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    this.hasDescriptionSlot = slot.assignedElements().length > 0;
  };

  private handleControlsSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    this.hasControlsSlot = slot.assignedElements().length > 0;
  };

  // ── Drag helpers ──────────────────────────────────────────────

  private startX = 0;
  private dragStartScrollLeft = 0;

  private get track(): HTMLElement | null {
    return this.el?.shadowRoot?.querySelector<HTMLElement>('.carousel-track') ?? null;
  }


  private get scrollBehavior(): ScrollBehavior {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth';
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
    return normalizeSlidesPerPage(this.slidesPerPage);
  }

  private get stepSize(): number {
    return getCarouselStepSize(this.normalizedSlidesPerPage);
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
    return clampSlideIndex(index, this.totalSlides);
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

  private updateBoundaryState(): void {
    const track = this.track;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    this.isAtStart = track.scrollLeft <= 1;
    this.isAtEnd = track.scrollLeft >= maxScroll - 1;
  }

  private syncIndexFromScroll = () => {
    this.updateBoundaryState();
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
    const previousIndex = this.activeSlideIndex;
    // Mark this as an internal change so the @Watch skips its scrollToIndex call.
    // The scroll is already in progress; Watch-driven instant scrolls would
    // interrupt smooth-scroll animations (most visibly: rewind navigation).
    this._internalScroll = true;
    this.activeSlideIndex = next;
    // Always announce slide change — AT users need feedback regardless of event emission.
    this.slideAnnouncement = `Slide ${next + 1} of ${this.totalSlides}`;
    if (emitEvent) {
      this.update.emit({ activeIndex: next, previousIndex, totalSlides: this.totalSlides });
    }
    // Keep isAtStart/isAtEnd fresh for programmatic index changes (slot changes, resize,
    // external activeSlideIndex prop changes) that do not go through the scroll handler.
    this.updateBoundaryState();
  }

  private onPrev = () => {
    const track = this.track;
    if (!track) return;

    const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0);

    // Rewind should follow physical boundaries first so it works even when
    // "last page" does not map to the final slide index on wide layouts.
    if (this.rewind && track.scrollLeft <= 1) {
      track.scrollTo({ left: maxScroll, behavior: this.scrollBehavior });
      return;
    }

    if (this.totalSlides > 0) {
      const currentIndex = this.getNearestSlideIndex();
      const targetIndex = getCarouselTargetIndex(currentIndex, this.stepSize, this.totalSlides, this.rewind, 'prev');
      const targetLeft = this.getSlideLeft(targetIndex);

      if (shouldUseTargetScroll(targetLeft, track.scrollLeft)) {
        track.scrollTo({ left: targetLeft, behavior: this.scrollBehavior });
        return;
      }
    }

    const fallbackDistance = getCarouselFallbackDistance(track.clientWidth);

    track.scrollBy({ left: -fallbackDistance, behavior: this.scrollBehavior });
  };

  private onNext = () => {
    const track = this.track;
    if (!track) return;

    const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0);

    // Rewind should follow physical boundaries first so it works even when
    // "last page" does not map to the final slide index on wide layouts.
    if (this.rewind && track.scrollLeft >= maxScroll - 1) {
      track.scrollTo({ left: 0, behavior: this.scrollBehavior });
      return;
    }

    if (this.totalSlides > 0) {
      const currentIndex = this.getNearestSlideIndex();
      const targetIndex = getCarouselTargetIndex(currentIndex, this.stepSize, this.totalSlides, this.rewind, 'next');
      const targetLeft = this.getSlideLeft(targetIndex);

      if (shouldUseTargetScroll(targetLeft, track.scrollLeft)) {
        track.scrollTo({ left: targetLeft, behavior: this.scrollBehavior });
        return;
      }
    }

    const fallbackDistance = getCarouselFallbackDistance(track.clientWidth);

    track.scrollBy({ left: fallbackDistance, behavior: this.scrollBehavior });
  };

  private onTrackScroll = () => {
    this.syncIndexFromScroll();
  };

  private syncSlideAriaAttributes = (): void => {
    const slides = this.slides;
    const total = slides.length;
    slides.forEach((slide, i) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `Slide ${i + 1} of ${total}`);
    });
  };

  private onSlotChange = () => {
    this.setActiveIndex(this.activeSlideIndex, false);
    this.scrollToIndex(this.activeSlideIndex, 'auto');
    this.syncSlideAriaAttributes();
  };

  private onMouseDown = (ev: MouseEvent) => {
    const track = this.track;
    if (!track) return;
    this.isDragging = true;
    this.startX = ev.pageX - track.offsetLeft;
    this.dragStartScrollLeft = track.scrollLeft;
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
    track.scrollLeft = this.dragStartScrollLeft - (x - this.startX);
  }

  @Listen('resize', { target: 'window' })
  onResize() {
    this.scrollToIndex(this.activeSlideIndex, 'auto');
  }

  @Watch('activeSlideIndex')
  onActiveSlideIndexChange(newValue: number) {
    if (this._internalScroll) {
      // Consume the flag — next external change will proceed normally.
      this._internalScroll = false;
      return;
    }

    const normalized = this.clampIndex(newValue);
    if (normalized !== newValue) {
      this.activeSlideIndex = normalized;
      return;
    }

    this.slideAnnouncement = `Slide ${normalized + 1} of ${this.totalSlides}`;
    this.scrollToIndex(normalized, 'auto');
  }

  componentWillLoad() {
    this.headingId = `io-carousel-heading-${Math.random().toString(36).slice(2, 9)}`;
  }

  componentDidLoad() {
    this.setActiveIndex(this.activeSlideIndex, false);
    this.scrollToIndex(this.activeSlideIndex, 'auto');
    this.updateBoundaryState();
    this.syncSlideAriaAttributes();
    // Seed live region so AT users know the initial slide position on mount.
    if (this.totalSlides > 0) {
      this.slideAnnouncement = `Slide ${this.activeSlideIndex + 1} of ${this.totalSlides}`;
    }
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const {
      prevLabel,
      nextLabel,
      isDragging,
      label,
      slideAnnouncement,
      hasHeadingSlot,
      hasDescriptionSlot,
      hasControlsSlot,
      headingId,
      rewind,
      isAtStart,
      isAtEnd,
      heading,
      description,
      pagination,
      alignHeader,
      activeSlideIndex,
    } = this;

    const totalSlides = this.totalSlides;

    const isPrevDisabled = !rewind && isAtStart;
    const isNextDisabled = !rewind && isAtEnd;

    // When rewind=true at a boundary, keep the existing prevLabel/nextLabel for
    // localization — callers already customize those props for their language.
    const prevAriaLabel = prevLabel;
    const nextAriaLabel = nextLabel;

    const arrowSvg = (
      <svg viewBox="0 0 26 16" width="20" height="13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z" fill="currentColor" />
      </svg>
    );

    return (
      <Host>
        <style>{getCarouselStyles()}</style>
        <div
          role="region"
          aria-label={hasHeadingSlot || heading ? undefined : label}
          aria-labelledby={hasHeadingSlot || heading ? headingId : undefined}
          aria-roledescription="carousel"
        >
          <span aria-live="polite" aria-atomic="true" class="sr-only">{slideAnnouncement}</span>

          <div
            class={{
              'carousel-header': true,
              'carousel-header--hidden': !hasHeadingSlot && !hasDescriptionSlot && !heading && !description,
              'carousel-header--center': alignHeader === 'center',
            }}
          >
            <div id={headingId} class={{ 'carousel-heading': true, 'carousel-heading--hidden': !hasHeadingSlot && !heading }}>
              {heading ? <span class="carousel-heading-text">{heading}</span> : null}
              <slot name="heading" onSlotchange={this.handleHeadingSlotChange} />
            </div>
            <div class={{ 'carousel-description': true, 'carousel-description--hidden': !hasDescriptionSlot && !description }}>
              {description ? <span class="carousel-description-text">{description}</span> : null}
              <slot name="description" onSlotchange={this.handleDescriptionSlotChange} />
            </div>
          </div>

          <div class="carousel-wrap">
            <div
              class={`carousel-track${isDragging ? ' carousel-track--dragging' : ''}`}
              onMouseDown={this.onMouseDown}
              onScroll={this.onTrackScroll}
            >
              <slot onSlotchange={this.onSlotChange} />
            </div>

            <button
              class="carousel-btn carousel-btn--prev"
              aria-label={prevAriaLabel}
              disabled={isPrevDisabled}
              onClick={this.onPrev}
            >
              {arrowSvg}
            </button>
            <button
              class="carousel-btn carousel-btn--next"
              aria-label={nextAriaLabel}
              disabled={isNextDisabled}
              onClick={this.onNext}
            >
              {arrowSvg}
            </button>

            <div class={{ 'carousel-controls': true, 'carousel-controls--hidden': !hasControlsSlot }}>
              <slot name="controls" onSlotchange={this.handleControlsSlotChange} />
            </div>
          </div>

          {pagination && totalSlides > 0 && (
            <div class="carousel-pagination" role="group" aria-label="Slide navigation">
              {Array.from({ length: totalSlides }, (_, i) => (
                <button
                  type="button"
                  class={{ 'carousel-dot': true, 'carousel-dot--active': i === activeSlideIndex }}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === activeSlideIndex ? 'true' : undefined}
                  onClick={() => {
                    this.scrollToIndex(i, this.scrollBehavior);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
