'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoBannerApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-banner Stencil component."
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
              <span key="n"><InlineCode>open</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Controls visibility. Set to true to show the banner. The banner remains in the DOM when closed.',
            ],
            [
              <InlineCode key="n">dismissible</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, renders a dismiss button. Clicking it sets open=false and emits the dismiss event.',
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
          description="Custom events emitted by io-banner."
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
              'Emitted when the user clicks the dismiss button. The banner also sets open=false automatically.',
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content projected into io-banner via slot."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              'Body content of the banner. Accepts any HTML — plain text, links, or emphasis. Rendered below the optional heading.',
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
          io-banner uses global semantic tokens (<InlineCode>--io-color-info</InlineCode>, <InlineCode>--io-color-success</InlineCode>, etc.)
          inherited from <code className="font-mono text-xs">app.css</code>.
          Override those root tokens to retheme all banner variants simultaneously.
        </EmptyNote>
      </section>

    </div>
  );
}
