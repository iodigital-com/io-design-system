'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoInlineBannerApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-inline-banner Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '240px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>variant</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;info&apos; | &apos;success&apos; | &apos;warning&apos; | &apos;error&apos;</InlineCode>,
              <InlineCode key="d">&apos;info&apos;</InlineCode>,
              'Severity level. Controls icon, colour tokens, and aria live region role (polite for info/success/warning, assertive for error).',
            ],
            [
              <InlineCode key="n">heading</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Optional bold heading rendered above the slotted body content.',
            ],
            [
              <InlineCode key="n">dismissible</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, renders a dismiss button that emits the dismiss event on click. The consumer is responsible for removing the element from the DOM.',
            ],
            [
              <InlineCode key="n">dismissLabel</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Override the accessible label for the dismiss button. Defaults to "Dismiss {heading}" or "Dismiss {variant} notification".',
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-inline-banner."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Detail type', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">dismiss</InlineCode>,
              <InlineCode key="t">void</InlineCode>,
              'Emitted when the user clicks the dismiss button. Your application is responsible for removing or hiding the element.',
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content projected into io-inline-banner via slot."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              'Body content of the notification. Accepts any HTML — plain text, links, lists, or emphasis. Rendered below the optional heading.',
            ],
          ]}
        />
      </section>

      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS custom properties"
          description="Token overrides exposed for customisation."
        />
        <EmptyNote>
          io-inline-banner uses global semantic tokens (<InlineCode>--io-color-info</InlineCode>, <InlineCode>--io-color-success</InlineCode>, etc.)
          inherited from <code className="font-mono text-xs">app.css</code>.
          Override those root tokens to retheme all inline banner variants simultaneously.
        </EmptyNote>
      </section>

    </div>
  );
}
