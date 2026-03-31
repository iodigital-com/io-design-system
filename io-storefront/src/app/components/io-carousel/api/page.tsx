'use client';

import { ApiTable, InlineCode, SectionHeader } from '@/components/api/ApiPrimitives';

export default function IoCarouselApiPage() {
  return (
    <div className="space-y-16">
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="Public API for io-carousel. The items property must be set via JavaScript — it is not serialisable as an HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '170px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="name">items</InlineCode>,
              <InlineCode key="type">IoCarouselItem[]</InlineCode>,
              <InlineCode key="default">[]</InlineCode>,
              <span key="desc">Array of slide data objects. Must be set imperatively via JavaScript property assignment — not as an HTML attribute.</span>,
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

      <section id="carousel-item-type" className="space-y-4">
        <SectionHeader
          title="IoCarouselItem"
          description="Shape of each slide object passed to the items array."
        />
        <ApiTable
          columns={[
            { label: 'Field', width: '200px' },
            { label: 'Type', width: '220px' },
            { label: 'Required', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="name">type</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              'Yes',
              'Category label shown in the image pill and body section (e.g. "Blog", "Webinar").',
            ],
            [
              <InlineCode key="name">title</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              'Yes',
              'Slide title text displayed in the card body.',
            ],
            [
              <InlineCode key="name">imageBackground</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              'No',
              'CSS background value for the image area. Defaults to the component theme colour when omitted.',
            ],
            [
              <InlineCode key="name">ctaLabel</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              'No',
              'Label for the call-to-action link. When omitted, no CTA is rendered.',
            ],
            [
              <InlineCode key="name">ctaHref</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              'No',
              <span key="desc">Destination URL for the CTA link. Defaults to <InlineCode>#</InlineCode> when <InlineCode>ctaLabel</InlineCode> is set but href is omitted.</span>,
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

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="io-carousel does not use slots. Slide content is driven entirely by the items property."
        />
        <p className="text-sm" style={{ color: 'var(--io-text-muted)' }}>
          No named or default slots. All slide content is rendered from the <InlineCode>IoCarouselItem</InlineCode> data model.
        </p>
      </section>
    </div>
  );
}
