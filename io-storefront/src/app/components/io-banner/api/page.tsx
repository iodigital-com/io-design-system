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
              <span key="desc">Severity level. Controls icon, colour tokens, and aria live region role. <InlineCode>warning</InlineCode> and <InlineCode>error</InlineCode> use <InlineCode>role=&quot;alert&quot;</InlineCode> (assertive); <InlineCode>info</InlineCode> and <InlineCode>success</InlineCode> use <InlineCode>role=&quot;status&quot;</InlineCode> (polite).</span>,
            ],
            [
              <InlineCode key="n">heading</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>undefined</span>,
              'Optional heading text rendered above the body content.',
            ],
            [
              <InlineCode key="n">headingTag</InlineCode>,
              <InlineCode key="t">IoBannerHeadingTag</InlineCode>,
              <InlineCode key="d">&apos;h5&apos;</InlineCode>,
              <span key="desc">Semantic HTML element for the heading (<InlineCode>h1</InlineCode>–<InlineCode>h6</InlineCode>). Ensures the banner heading participates correctly in the document outline. (WCAG 1.3.1)</span>,
            ],
            [
              <InlineCode key="n">description</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>undefined</span>,
              'Optional plain-text description rendered as a <p> element below the heading.',
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
              <span key="desc">When true, renders a dismiss button. Clicking it or pressing <InlineCode>Escape</InlineCode> emits the dismiss event and sets open=false. Focus moves to the button when the banner opens. (WCAG 2.1.2, 2.4.3, 2.5.8)</span>,
            ],
            [
              <span key="n"><InlineCode>position</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;top&apos; | &apos;bottom&apos;</InlineCode>,
              <InlineCode key="d">&apos;top&apos;</InlineCode>,
              'Viewport edge where the banner is fixed. Bottom position flips the entry animation direction.',
            ],
            [
              <InlineCode key="n">dismissLabel</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>undefined</span>,
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
        <ApiTable
          columns={[
            { label: 'Property', width: '260px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [<InlineCode key="t">--io-banner-max-w</InlineCode>, <InlineCode key="d">768px</InlineCode>, 'Maximum width of the banner panel.'],
            [<InlineCode key="t">--io-banner-top</InlineCode>, <InlineCode key="d">var(--io-space-4)</InlineCode>, 'Top inset when position="top". Useful for pushing the banner below a fixed nav bar.'],
            [<InlineCode key="t">--io-banner-bottom</InlineCode>, <InlineCode key="d">var(--io-space-4)</InlineCode>, 'Bottom inset when position="bottom".'],
            [<InlineCode key="t">--io-banner-inset-x</InlineCode>, <InlineCode key="d">var(--io-space-4)</InlineCode>, 'Left and right margins from the viewport edge.'],
            [<InlineCode key="t">--io-banner-z-index</InlineCode>, <InlineCode key="d">var(--io-z-toast)</InlineCode>, 'Z-index stacking level of the fixed banner.'],
          ]}
        />
      </section>

    </div>
  );
}
