'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoAlertApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-alert Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>variant</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;info&apos; | &apos;success&apos; | &apos;warning&apos; | &apos;error&apos;</InlineCode>,
              <InlineCode key="d">&apos;info&apos;</InlineCode>,
              'Severity level. Controls icon, colour tokens, and aria live region role (polite for info/success, assertive for warning/error).',
            ],
            [
              <InlineCode key="n">heading</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Optional bold heading rendered above the slotted body content. Leave empty to show body copy only.',
            ],
            [
              <span key="n"><InlineCode>dismissible</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, renders a × dismiss button in the top-right corner. Wire the dismiss event to remove the alert from the DOM.',
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-alert. Listen with addEventListener or the framework event binding syntax."
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
              'Emitted when the user clicks the dismiss button. No detail payload. Your application is responsible for removing or hiding the alert element.',
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content projected into io-alert via slot."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              'Body content of the alert. Accepts any HTML — plain text, links, lists, or emphasis. Rendered below the optional heading.',
            ],
          ]}
        />
      </section>

      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS custom properties"
          description="Token overrides exposed for white-label and brand customisation."
        />
        <EmptyNote>
          io-alert uses global semantic tokens (<InlineCode>--io-color-info</InlineCode>, <InlineCode>--io-color-success</InlineCode>, etc.)
          inherited from <code className="font-mono text-xs">app.css</code>.
          Override those root tokens to retheme all alert variants simultaneously, or target a specific variant
          with <InlineCode>[variant=&apos;error&apos;]</InlineCode> attribute selectors from outside the shadow boundary.
        </EmptyNote>
      </section>

    </div>
  );
}
