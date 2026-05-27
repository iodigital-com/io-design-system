'use client';

import { ApiTable, InlineCode, MutableBadge, ReflectBadge, SectionHeader, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoCarouselApiPage() {
  return (
    <div className="space-y-16">
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="Public API for io-carousel. Content is provided via the default slot, while navigation behavior is configurable via properties."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '170px' },
            { label: 'Type', width: '200px' },
            { label: 'Default', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="name">slidesPerPage</InlineCode>,
              <InlineCode key="type">number | &apos;auto&apos;</InlineCode>,
              <InlineCode key="default">1</InlineCode>,
              <span key="desc">Number of slides to move per navigation step. Set <InlineCode>&apos;auto&apos;</InlineCode> to move slide-by-slide.</span>,
            ],
            [
              <InlineCode key="name">rewind</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="desc">When true, next from last rewinds to first and prev from first rewinds to last.</span>,
            ],
            [
              <span key="name"><InlineCode>activeSlideIndex</InlineCode><MutableBadge /><ReflectBadge /></span>,
              <InlineCode key="type">number</InlineCode>,
              <InlineCode key="default">0</InlineCode>,
              <span key="desc">Zero-based active slide index. Mutable — updated internally on navigation and drag-scroll. Reflected to the <InlineCode>active-slide-index</InlineCode> attribute.</span>,
            ],
            [
              <InlineCode key="name">label</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              <InlineCode key="default">&apos;Carousel&apos;</InlineCode>,
              <span key="desc">Accessible label applied to the carousel <InlineCode>role=&quot;region&quot;</InlineCode> via <InlineCode>aria-label</InlineCode>. Defaults to <InlineCode>&apos;Carousel&apos;</InlineCode>; override to a more descriptive value such as <InlineCode>&apos;Product gallery&apos;</InlineCode> for clearer screen reader context.</span>,
            ],
            [
              <InlineCode key="name">prevLabel</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              <InlineCode key="default">&apos;Previous&apos;</InlineCode>,
              <span key="desc">Accessible label for the previous-slide button. Override for localisation.</span>,
            ],
            [
              <InlineCode key="name">nextLabel</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              <InlineCode key="default">&apos;Next&apos;</InlineCode>,
              <span key="desc">Accessible label for the next-slide button. Override for localisation.</span>,
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="The carousel is a generic container — content is projected via the default slot."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '170px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="slot" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>default</span>,
              <span key="desc">
                Any HTML elements placed as direct children of <InlineCode>{'<io-carousel>'}</InlineCode> are projected
                into the scrollable track. Each child becomes a flex item with <InlineCode>flex: 0 0 auto</InlineCode>.
                Give children an explicit width for consistent card sizing.
              </span>,
            ],
            [
              <InlineCode key="slot">heading</InlineCode>,
              <span key="desc">
                Optional heading rendered above the slide track. When this slot is occupied, <InlineCode>aria-labelledby</InlineCode> is
                used on the carousel region instead of <InlineCode>aria-label</InlineCode> — the <InlineCode>label</InlineCode> prop is
                ignored. Use a semantic heading element (e.g. <InlineCode>{'<h2 slot="heading">'}</InlineCode>).
              </span>,
            ],
            [
              <InlineCode key="slot">description</InlineCode>,
              <span key="desc">
                Optional descriptive text rendered below the heading and above the slide track. Hidden entirely when the slot is empty.
              </span>,
            ],
            [
              <InlineCode key="slot">controls</InlineCode>,
              <span key="desc">
                Optional slot rendered adjacent to the prev/next navigation buttons. Use for pagination dots, thumbnails, or
                other custom indicators. Hidden entirely when the slot is empty.
              </span>,
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="io-carousel emits updates when the active slide changes."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '170px' },
            { label: 'Detail', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="event">update</InlineCode>,
              <InlineCode key="detail">{`{ activeIndex: number; totalSlides: number }`}</InlineCode>,
              <span key="desc">Emitted when navigation or scrolling changes the active slide index. Bubbles and crosses the Shadow DOM boundary (<InlineCode>bubbles: true, composed: true</InlineCode>) — framework wrapper listeners (React <InlineCode>onUpdate</InlineCode>, Angular <InlineCode>(update)</InlineCode>, Vue <InlineCode>@update</InlineCode>) receive it reliably.</span>,
            ],
          ]}
        />
      </section>

      <section id="css" className="space-y-4">
        <SectionHeader
          title="CSS architecture"
          description="The carousel provides the scrollable track, nav buttons, and scrollbar via Shadow DOM. Slotted content is unstyled."
        />
        <ApiTable
          columns={[
            { label: 'Part', width: '200px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="part">carousel-track</InlineCode>,
              <span key="desc">
                Flex container with <InlineCode>overflow-x: scroll</InlineCode>, custom scrollbar (4px, <InlineCode>var(--io-color-primary)</InlineCode>),
                and <InlineCode>gap: var(--io-space-4)</InlineCode>.
              </span>,
            ],
            [
              <InlineCode key="part">carousel-btn</InlineCode>,
              <span key="desc">
                Circular prev/next buttons, absolutely positioned at 50% vertical, with <InlineCode>var(--io-shadow-md)</InlineCode> and
                focus ring support.
              </span>,
            ],
            [
              <InlineCode key="part">::slotted(*)</InlineCode>,
              <span key="desc">
                Applies <InlineCode>flex: 0 0 auto</InlineCode> to prevent slotted children from shrinking. Width, background,
                and internal layout are the consumer&apos;s responsibility.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Code examples ─────────────────────────────────────────────────── */}
      <section id="code-examples" className="space-y-4">
        <SectionHeader
          title="Code examples"
          description="Framework integration snippets for io-carousel. Always provide a descriptive label prop for screen reader context."
        />
        <CodeNote label="HTML">
{`<io-carousel label="Product gallery" slides-per-page="2">
  <div class="slide">Slide 1</div>
  <div class="slide">Slide 2</div>
  <div class="slide">Slide 3</div>
</io-carousel>

<script>
  document.querySelector('io-carousel')
    .addEventListener('update', (e) => {
      // e.detail.activeIndex — update your UI state here
    });
</script>`}
        </CodeNote>
        <CodeNote label="React">
{`import { useCallback, useRef } from 'react';

function ProductGallery() {
  const carouselRef = useRef<HTMLElement>(null);

  const handleUpdate = useCallback(
    (e: CustomEvent<{ activeIndex: number; totalSlides: number }>) => {
      // e.detail.activeIndex — update your UI state here
    },
    [],
  );

  return (
    <io-carousel
      ref={carouselRef}
      label="Product gallery"
      slides-per-page={2}
      onUpdate={handleUpdate}
    >
      <div className="slide">Slide 1</div>
      <div className="slide">Slide 2</div>
      <div className="slide">Slide 3</div>
    </io-carousel>
  );
}`}
        </CodeNote>
        <CodeNote label="Angular">
{`import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IoCarousel } from '@io-digital/components-angular';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [IoCarousel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <io-carousel
      label="Product gallery"
      [slidesPerPage]="2"
      (update)="onUpdate($event)"
    >
      <div class="slide">Slide 1</div>
      <div class="slide">Slide 2</div>
      <div class="slide">Slide 3</div>
    </io-carousel>
  \`,
})
export class ProductGalleryComponent {
  onUpdate(_e: CustomEvent<{ activeIndex: number; totalSlides: number }>) {
    // _e.detail.activeIndex — update your component state here
  }
}`}
        </CodeNote>
        <CodeNote label="Vue">
{`<template>
  <io-carousel
    label="Product gallery"
    :slides-per-page="2"
    @update="onUpdate"
  >
    <div class="slide">Slide 1</div>
    <div class="slide">Slide 2</div>
    <div class="slide">Slide 3</div>
  </io-carousel>
</template>

<script setup lang="ts">
const onUpdate = (_e: CustomEvent<{ activeIndex: number; totalSlides: number }>) => {
  // _e.detail.activeIndex — update your UI state here
};
</script>`}
        </CodeNote>
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="These tokens can be set on the host element (or any ancestor) to override component-specific defaults without breaking out of the design system."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '280px' },
            { label: 'Default', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-carousel-scrollbar-height</InlineCode>,
              <InlineCode key="d">4px</InlineCode>,
              'Height of the custom scrollbar track rendered below the carousel slide area.',
            ],
          ]}
        />
      </section>
    </div>
  );
}
