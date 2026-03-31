'use client';

import { ApiTable, InlineCode, ReflectBadge, SectionHeader } from '@/components/api/ApiPrimitives';

export default function IoAccordionApiPage() {
  return (
    <div className="space-y-16">
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="Single-item slot mode uses heading / headingTag / open. List mode uses items / allowMultiple."
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
              <span key="property"><InlineCode>heading</InlineCode></span>,
              <InlineCode key="attribute">heading</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              <InlineCode key="default">''</InlineCode>,
              <span key="description">Fallback heading text for single-item mode. Overridden by the <InlineCode>heading</InlineCode> named slot.</span>,
            ],
            [
              <span key="property"><InlineCode>headingTag</InlineCode></span>,
              <InlineCode key="attribute">heading-tag</InlineCode>,
              <InlineCode key="type">'h2' | 'h3' | 'h4' | 'h5' | 'h6'</InlineCode>,
              <InlineCode key="default">'h3'</InlineCode>,
              <span key="description">HTML heading element wrapping the trigger button in single-item mode.</span>,
            ],
            [
              <span key="property"><InlineCode>open</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">open</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">Controls whether the single-item panel is expanded. Reflects to attribute.</span>,
            ],
            [
              <InlineCode key="property">items</InlineCode>,
              <InlineCode key="attribute">-</InlineCode>,
              <InlineCode key="type">IoAccordionItem[]</InlineCode>,
              <InlineCode key="default">[]</InlineCode>,
              <span key="description">Array of accordion entries for list mode. Set via JavaScript property.</span>,
            ],
            [
              <span key="property"><InlineCode>allowMultiple</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">allow-multiple</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">List mode only. When true, multiple panels can be open simultaneously.</span>,
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
            { label: 'Detail type', width: '260px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="event">update</InlineCode>,
              <InlineCode key="detail">{`{ open: boolean }`}</InlineCode>,
              <span key="description">Single-item mode. Fires when the panel opens or closes. Consumer should update the <InlineCode>open</InlineCode> prop in response.</span>,
            ],
            [
              <InlineCode key="event">accordionChange</InlineCode>,
              <InlineCode key="detail">{`{ index: number; open: boolean }`}</InlineCode>,
              <span key="description">List mode. Fires when a panel opens or closes.</span>,
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Available in single-item slot mode only."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '190px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="slot">heading</InlineCode>,
              <span key="description">Named slot. Replaces the <InlineCode>heading</InlineCode> prop with rich HTML in the trigger button.</span>,
            ],
            [
              <span key="slot">(default)</span>,
              <span key="description">Panel body content rendered when the accordion is open.</span>,
            ],
          ]}
        />
      </section>

      <section id="item-type" className="space-y-4">
        <SectionHeader
          title="IoAccordionItem type"
          description="Shape of each item in the items array (list mode only)."
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

