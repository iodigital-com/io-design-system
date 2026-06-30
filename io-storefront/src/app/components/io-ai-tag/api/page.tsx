'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoAiTagApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-ai-tag Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>variant</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;abbreviation&apos; | &apos;generated&apos; | &apos;modified&apos;</InlineCode>,
              <InlineCode key="d">&apos;generated&apos;</InlineCode>,
              "Controls which disclosure form is shown. 'abbreviation' renders an <abbr> element; 'generated' and 'modified' render the locale-specific full string.",
            ],
            [
              <span key="n"><InlineCode>locale</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;en&apos; | &apos;nl&apos;</InlineCode>,
              <InlineCode key="d">&apos;en&apos;</InlineCode>,
              "BCP 47 locale code for the label language. Unknown locales fall back to 'en'. Currently ships: en (English), nl (Dutch).",
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-ai-tag."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-ai-tag emits no custom events.</strong>
          {' '}It is a presentational disclosure badge — a passive label with no user interaction model.
        </EmptyNote>
      </section>

      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-ai-tag exposes no public methods.</strong>
        </EmptyNote>
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default content slots available on io-ai-tag."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-ai-tag uses no slots.</strong>
          {' '}The label content is derived from the variant and locale props — there is no text slot.
        </EmptyNote>
      </section>

      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Component-level override tokens for io-ai-tag."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '280px' },
            { label: 'Default', width: '200px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="p">--io-ai-tag-color</InlineCode>,
              <InlineCode key="d">var(--io-color-primary)</InlineCode>,
              'Text and icon colour of the badge.',
            ],
            [
              <InlineCode key="p">--io-ai-tag-bg</InlineCode>,
              <InlineCode key="d">var(--io-color-primary-bg)</InlineCode>,
              'Background fill of the badge.',
            ],
            [
              <InlineCode key="p">--io-ai-tag-border-color</InlineCode>,
              <InlineCode key="d">var(--io-color-primary)</InlineCode>,
              'Border colour of the badge pill.',
            ],
            [
              <InlineCode key="p">--io-ai-tag-font-size</InlineCode>,
              <InlineCode key="d">var(--io-font-size-xs)</InlineCode>,
              'Font size of the badge label.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
