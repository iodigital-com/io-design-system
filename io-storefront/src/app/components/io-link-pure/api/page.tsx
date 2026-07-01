'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge } from '@/components/api/ApiPrimitives';

export default function IoLinkPureApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-link-pure Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">href</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Destination URL. When absent the component renders as a <button> element instead of an anchor.',
            ],
            [
              <span key="n"><InlineCode>alignLabel</InlineCode><ReflectBadge /></span>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>&apos;start&apos;</InlineCode>{' | '}<InlineCode>&apos;end&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;start&apos;</InlineCode>,
              'Icon position relative to the label. start places the icon before the label; end places it after.',
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>&apos;xs&apos;</InlineCode>{' | '}<InlineCode>&apos;sm&apos;</InlineCode>{' | '}<InlineCode>&apos;md&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Text size variant.',
            ],
            [
              <span key="n"><InlineCode>active</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the link as the active/current navigation item. Applies visual treatment and sets aria-current="page".',
            ],
            [
              <span key="n"><InlineCode>stretch</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, the component fills its container width and pushes the label and icon to opposite ends.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the link — removes href navigation and blocks click events. The element remains focusable.',
            ],
            [
              <InlineCode key="n">icon</InlineCode>,
              <InlineCode key="t">IoIconName | undefined</InlineCode>,
              '—',
              'Name of a Lucide icon to render. Set to a valid IoIconName to show an icon.',
            ],
            [
              <InlineCode key="n">iconSource</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Raw SVG string for a custom icon. Takes precedence over the icon prop when both are set.',
            ],
            [
              <InlineCode key="n">hideLabel</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Hides the label text visually. The slot text becomes the accessible aria-label. Requires icon or iconSource for any visual affordance.',
            ],
            [
              <InlineCode key="n">external</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the link as external. Sets target="_blank" and rel="noopener noreferrer" automatically.',
            ],
            [
              <InlineCode key="n">target</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">&apos;_self&apos;</InlineCode>,
              'HTML target attribute. Overridden to "_blank" automatically when external=true.',
            ],
            [
              <InlineCode key="n">rel</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'HTML rel attribute. "noopener noreferrer" applied automatically when external=true.',
            ],
            [
              <InlineCode key="n">download</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Downloadable file name. Enables download behaviour on click.',
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-link-pure."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '160px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">click</InlineCode>,
              <InlineCode key="t">MouseEvent</InlineCode>,
              'No',
              'Fires when the link is clicked and not disabled.',
            ],
          ]}
        />
      </section>

      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <ApiTable
          columns={[
            { label: 'Method', width: '160px' },
            { label: 'Signature', width: '320px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">setFocus</InlineCode>,
              <InlineCode key="s">(options?: FocusOptions) =&gt; Promise&lt;void&gt;</InlineCode>,
              'Programmatically moves focus to the inner anchor or button element.',
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-link-pure."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>default</span>,
              'Link label text. This is the visible label and, when hideLabel=true, also the accessible aria-label.',
            ],
          ]}
        />
      </section>

      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Component-level override tokens."
        />
        <ApiTable
          columns={[
            { label: 'Token', width: '300px' },
            { label: 'Default', width: '200px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-link-pure-active-color</InlineCode>,
              <InlineCode key="d">var(--io-color-primary)</InlineCode>,
              'Color of the text and underline when the link is in the active state.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
