'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoFlagApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-flag Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>name</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">IoFlagName</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>required</span>,
              'ISO 3166-1 alpha-2 country code (lowercase). Must be one of the codes in the shipped flag catalogue.',
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;xs&apos; | &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos; | &apos;inherit&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Visual size — aligned with io-icon size scale.',
            ],
            [
              <span key="n"><InlineCode>label</InlineCode></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              "Accessible alt text for the flag image. Defaults to the country's English name. Pass '' to mark the flag as decorative.",
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-flag."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-flag emits no custom events.</strong>
          {' '}It is a presentational indicator — a passive image with no user interaction model.
        </EmptyNote>
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default content slots available on io-flag."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-flag uses no slots.</strong>
          {' '}The flag image is fully controlled by the name and size props.
        </EmptyNote>
      </section>

      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Component-level override tokens for io-flag."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '280px' },
            { label: 'Default', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="p">--io-flag-border-radius</InlineCode>,
              <InlineCode key="d">2px</InlineCode>,
              'Border radius of the flag image. Override to make flags perfectly square or more rounded.',
            ],
          ]}
        />
      </section>

      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-flag exposes no public methods.</strong>
        </EmptyNote>
      </section>

    </div>
  );
}
