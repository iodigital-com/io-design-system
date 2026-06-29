'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoInlineNotificationApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-inline-notification Stencil component."
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
              <InlineCode key="n">headingTag</InlineCode>,
              <InlineCode key="t">&apos;h1&apos; | &apos;h2&apos; | &apos;h3&apos; | &apos;h4&apos; | &apos;h5&apos; | &apos;h6&apos;</InlineCode>,
              <InlineCode key="d">&apos;h5&apos;</InlineCode>,
              'Controls the semantic HTML heading element rendered for the heading prop. Set this to match your document outline — e.g. h2 on a page where the notification appears in a main content area. Satisfies WCAG 1.3.1 Info and Relationships.',
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Accessible label applied as aria-label on the host live region. Use when multiple notifications appear on the same page simultaneously to give each a unique, distinguishable name (WCAG 4.1.2).',
            ],
            [
              <span key="n"><InlineCode>variant</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;info&apos; | &apos;success&apos; | &apos;warning&apos; | &apos;error&apos;</InlineCode>,
              <InlineCode key="d">&apos;info&apos;</InlineCode>,
              'Severity level. Controls icon, colour tokens, and aria live region role (assertive for error/warning, polite for info/success).',
            ],
            [
              <InlineCode key="n">heading</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
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
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Override the accessible label for the dismiss button. Defaults to "Dismiss {heading}" or "Dismiss {variant} notification".',
            ],
            [
              <InlineCode key="n">actionLabel</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Label for an optional call-to-action button rendered below the body content. When omitted, no action button is rendered.',
            ],
            [
              <InlineCode key="n">actionIcon</InlineCode>,
              <InlineCode key="t">IoIconName</InlineCode>,
              <InlineCode key="d">&apos;arrow-right&apos;</InlineCode>,
              'Icon rendered on the action button. Any valid io-icon name.',
            ],
            [
              <InlineCode key="n">actionLoading</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, the action button shows a loading spinner and suppresses the action event.',
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-inline-notification."
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
            [
              <InlineCode key="n">action</InlineCode>,
              <InlineCode key="t">void</InlineCode>,
              'Emitted when the action button is clicked. Not emitted while actionLoading is true. Only fires when actionLabel is set.',
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content projected into io-inline-notification via slot."
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
          io-inline-notification uses global semantic tokens (<InlineCode>--io-color-info</InlineCode>, <InlineCode>--io-color-success</InlineCode>, etc.)
          inherited from <code className="font-mono text-xs">app.css</code>.
          Override those root tokens to retheme all inline notification variants simultaneously.
        </EmptyNote>
      </section>

    </div>
  );
}
