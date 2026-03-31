'use client';

import { ApiTable, InlineCode, SectionHeader } from '@/components/api/ApiPrimitives';

export default function IoCarouselApiPage() {
  return (
    <div className="space-y-16">
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="Public API for io-carousel. Only navigation labels are configurable — content is provided via the default slot."
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
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="io-carousel does not emit custom events. Navigation state is managed internally."
        />
        <p className="text-sm" style={{ color: 'var(--io-text-muted)' }}>
          No custom events are exposed. Prev/Next navigation and drag scrolling are handled internally without emitting state changes.
        </p>
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
    </div>
  );
}
