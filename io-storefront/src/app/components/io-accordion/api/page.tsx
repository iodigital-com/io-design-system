'use client';

import { ApiTable, InlineCode, ReflectBadge, SectionHeader } from '@/components/api/ApiPrimitives';

export default function IoAccordionApiPage() {
  return (
    <div className="space-y-16">
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="Public API for the single-item accordion pattern."
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
              <span key="description">Fallback heading text. Overridden by the <InlineCode>heading</InlineCode> named slot.</span>,
            ],
            [
              <span key="property"><InlineCode>headingTag</InlineCode></span>,
              <InlineCode key="attribute">heading-tag</InlineCode>,
              <InlineCode key="type">'h2' | 'h3' | 'h4' | 'h5' | 'h6'</InlineCode>,
              <InlineCode key="default">'h3'</InlineCode>,
              <span key="description">HTML heading element wrapping the trigger button.</span>,
            ],
            [
              <span key="property"><InlineCode>open</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">open</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">Controls whether the panel is expanded. Reflects to attribute.</span>,
            ],
            [
              <span key="property"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">disabled</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">Prevents interaction, reduces opacity, and sets <InlineCode>aria-disabled</InlineCode>. Reflects to attribute.</span>,
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
              <span key="description">Fires when the panel opens or closes. Consumer should update the <InlineCode>open</InlineCode> prop in response.</span>,
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Slots for trigger heading and panel content."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '190px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="slot">heading</InlineCode>,
              <span key="description">Named slot. Replaces the <InlineCode>heading</InlineCode> prop with rich heading content.</span>,
            ],
            [
              <span key="slot">(default)</span>,
              <span key="description">Panel body content rendered when the accordion is open.</span>,
            ],
          ]}
        />
      </section>
    </div>
  );
}

