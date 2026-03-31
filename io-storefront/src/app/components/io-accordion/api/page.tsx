'use client';

import { ApiTable, EmptyNote, InlineCode, ReflectBadge, SectionHeader } from '@/components/api/ApiPrimitives';

export default function IoAccordionApiPage() {
  return (
    <div className="space-y-16">
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="Public props for io-accordion. Content is data-driven through the items array and open behavior is controlled with allow-multiple."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '170px' },
            { label: 'Attribute', width: '170px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="property">items</InlineCode>,
              <InlineCode key="attribute">-</InlineCode>,
              <InlineCode key="type">IoAccordionItem[]</InlineCode>,
              <InlineCode key="default">[]</InlineCode>,
              <span key="description">Array of accordion entries. Set through JavaScript property.</span>,
            ],
            [
              <span key="property"><InlineCode>allowMultiple</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">allow-multiple</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">When true, multiple panels can be open at the same time.</span>,
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-accordion."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '190px' },
            { label: 'Detail type', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="event">accordionChange</InlineCode>,
              <InlineCode key="detail">{`{ index: number; open: boolean }`}</InlineCode>,
              <span key="description">Fires when a panel opens or closes.</span>,
            ],
          ]}
        />
      </section>

      <section id="methods-slots" className="space-y-4">
        <SectionHeader
          title="Methods / Slots"
          description="Imperative APIs and slots exposed by io-accordion."
        />
        <EmptyNote>
          None. Content is data-driven via the <InlineCode>items</InlineCode> property.
        </EmptyNote>
      </section>

      <section id="item-type" className="space-y-4">
        <SectionHeader
          title="IoAccordionItem type"
          description="Shape of each item in the items array."
        />
        <ApiTable
          columns={[
            { label: 'Field', width: '170px' },
            { label: 'Type', width: '170px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="field">title</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              <span key="description">Trigger text shown in the accordion header.</span>,
            ],
            [
              <InlineCode key="field">body</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              <span key="description">Panel body text rendered when the item is open.</span>,
            ],
            [
              <InlineCode key="field">open?</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <span key="description">Initial open state. Defaults to false when omitted.</span>,
            ],
          ]}
        />
      </section>
    </div>
  );
}
