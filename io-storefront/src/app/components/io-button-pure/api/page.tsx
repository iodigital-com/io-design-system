'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoButtonPureApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-button-pure Stencil component."
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
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the button. In button mode, uses native disabled. In anchor mode, clears href and sets aria-disabled.',
            ],
            [
              <span key="n"><InlineCode>underline</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Renders a persistent text underline regardless of hover state.',
            ],
            [
              <span key="n"><InlineCode>active</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Applies the active colour token to mark the current selection state in navigation contexts.',
            ],
            [
              <span key="n"><InlineCode>stretch</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Stretches the button to fill its parent container width.',
            ],
            [
              <span key="n"><InlineCode>alignLabel</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;start&apos; | &apos;end&apos;</InlineCode>,
              <InlineCode key="d">&apos;start&apos;</InlineCode>,
              "Icon alignment relative to the label. 'start' = icon before label (left in LTR); 'end' = icon after label.",
            ],
            [
              <span key="n"><InlineCode>href</InlineCode></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'When set, renders the component as an anchor tag navigating to this URL.',
            ],
            [
              <span key="n"><InlineCode>target</InlineCode></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">&apos;_self&apos;</InlineCode>,
              'Link target. Only used when href is set.',
            ],
            [
              <span key="n"><InlineCode>rel</InlineCode></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Rel attribute for the anchor. Only used when href is set.',
            ],
            [
              <span key="n"><InlineCode>type</InlineCode></span>,
              <InlineCode key="t">&apos;button&apos; | &apos;submit&apos; | &apos;reset&apos;</InlineCode>,
              <InlineCode key="d">&apos;button&apos;</InlineCode>,
              'Native button type. Irrelevant when href is set.',
            ],
            [
              <span key="n"><InlineCode>label</InlineCode></span>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Accessible label — required for icon-only buttons where no visible text is provided.',
            ],
            [
              <span key="n"><InlineCode>icon</InlineCode></span>,
              <InlineCode key="t">IoIconName | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Name of a Lucide icon to render alongside the label.',
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-button-pure."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Payload', width: '180px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="e">click</InlineCode>,
              <InlineCode key="p">MouseEvent</InlineCode>,
              'Fires on user click or keyboard activation. Not fired when disabled.',
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default content slots available on io-button-pure."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>
                (default)
              </span>,
              'Button label text. Set the label prop for icon-only usage where no text is slotted.',
            ],
          ]}
        />
      </section>

      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Component-level override tokens for io-button-pure."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '320px' },
            { label: 'Default', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="p">--io-button-pure-color</InlineCode>,
              <InlineCode key="d">var(--io-color-primary)</InlineCode>,
              'Text colour of the button.',
            ],
            [
              <InlineCode key="p">--io-button-pure-hover-color</InlineCode>,
              <InlineCode key="d">var(--io-color-primary-hover)</InlineCode>,
              'Text colour on hover.',
            ],
            [
              <InlineCode key="p">--io-button-pure-active-color</InlineCode>,
              <InlineCode key="d">var(--io-color-primary-active)</InlineCode>,
              'Text colour in the active/pressed state.',
            ],
            [
              <InlineCode key="p">--io-button-pure-underline-color</InlineCode>,
              <InlineCode key="d">currentColor</InlineCode>,
              'Colour of the text underline decoration.',
            ],
            [
              <InlineCode key="p">--io-button-pure-underline-offset</InlineCode>,
              <InlineCode key="d">2px</InlineCode>,
              'Vertical offset of the text underline from the baseline.',
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
          <strong style={{ color: 'var(--io-text-primary)' }}>io-button-pure exposes no public methods.</strong>
        </EmptyNote>
      </section>

    </div>
  );
}
