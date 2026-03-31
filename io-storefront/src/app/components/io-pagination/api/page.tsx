'use client';

import { ApiTable, EmptyNote, InlineCode, MutableBadge, ReflectBadge, SectionHeader } from '@/components/api/ApiPrimitives';

export default function IoPaginationApiPage() {
  return (
    <div className="space-y-16">
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="Public props for io-pagination. Reflecting props sync to host attributes; mutable props can change internally."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '170px' },
            { label: 'Attribute', width: '170px' },
            { label: 'Type', width: '140px' },
            { label: 'Default', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="property"><InlineCode>page</InlineCode><ReflectBadge /><MutableBadge /></span>,
              <InlineCode key="attribute">page</InlineCode>,
              <InlineCode key="type">number</InlineCode>,
              <InlineCode key="default">1</InlineCode>,
              <span key="description">Current 1-based active page.</span>,
            ],
            [
              <span key="property"><InlineCode>totalPages</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">total-pages</InlineCode>,
              <InlineCode key="type">number</InlineCode>,
              <InlineCode key="default">1</InlineCode>,
              <span key="description">Total number of pages.</span>,
            ],
            [
              <InlineCode key="property">prevLabel</InlineCode>,
              <InlineCode key="attribute">prev-label</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              <InlineCode key="default">&apos;Previous page&apos;</InlineCode>,
              <span key="description">aria-label for the previous button.</span>,
            ],
            [
              <InlineCode key="property">nextLabel</InlineCode>,
              <InlineCode key="attribute">next-label</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              <InlineCode key="default">&apos;Next page&apos;</InlineCode>,
              <span key="description">aria-label for the next button.</span>,
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-pagination."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '180px' },
            { label: 'Detail type', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="event">pageChange</InlineCode>,
              <InlineCode key="detail">{`{ page: number }`}</InlineCode>,
              <span key="description">Fires when the user navigates to a different 1-based page.</span>,
            ],
          ]}
        />
      </section>

      <section id="methods-slots" className="space-y-4">
        <SectionHeader
          title="Methods / Slots"
          description="Imperative APIs and slots exposed by io-pagination."
        />
        <EmptyNote>
          None. io-pagination is fully configured through props and emits pageChange events for integration.
        </EmptyNote>
      </section>
    </div>
  );
}
