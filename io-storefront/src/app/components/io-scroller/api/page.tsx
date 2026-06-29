'use client';

import { ApiTable, EmptyNote, InlineCode, SectionHeader } from '@/components/api/ApiPrimitives';

export default function IoScrollerApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-scroller Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '280px' },
            { label: 'Default', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">orientation</InlineCode>,
              <InlineCode key="t">&apos;horizontal&apos; | &apos;vertical&apos;</InlineCode>,
              <InlineCode key="d">&apos;horizontal&apos;</InlineCode>,
              <span key="desc">
                Scroll axis. <InlineCode>horizontal</InlineCode> overflows left/right.{' '}
                <InlineCode>vertical</InlineCode> overflows top/bottom. Reflected as an attribute.
              </span>,
            ],
            [
              <InlineCode key="n">showScrollbar</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                When <InlineCode>false</InlineCode> (default), the native scrollbar is hidden and
                gradient fades serve as the scroll affordance. Set to{' '}
                <InlineCode>true</InlineCode> to show the native scrollbar.
              </span>,
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                Accessible label set as <InlineCode>aria-label</InlineCode> on the scroll region.
                When not provided, defaults to <InlineCode>&quot;Scrollable horizontal region&quot;</InlineCode>{' '}
                or <InlineCode>&quot;Scrollable vertical region&quot;</InlineCode> based on orientation.
                Always provide a meaningful value — e.g. <InlineCode>&quot;Navigation tabs&quot;</InlineCode>{' '}
                or <InlineCode>&quot;Image strip&quot;</InlineCode>.
              </span>,
            ],
            [
              <InlineCode key="n">compact</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                When <InlineCode>true</InlineCode>, reduces the internal gap between slotted items
                for dense layout contexts. Reflected as an attribute.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-scroller."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-scroller emits no custom events.</strong>
          {' '}Scroll state is communicated visually through the gradient fade indicators. Native{' '}
          <InlineCode>scroll</InlineCode> events bubble from the inner scroll container and can be
          intercepted by consumer code if needed.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-scroller exposes no public methods.</strong>
          {' '}All behaviour is controlled through props. Programmatic scrolling can be achieved by
          obtaining a reference to the element and calling the native{' '}
          <InlineCode>scrollTo()</InlineCode> method on the inner scroll container via{' '}
          <InlineCode>shadowRoot?.querySelector(&apos;.scroller&apos;)</InlineCode>.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-scroller."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              'Scrollable content. Any HTML or web component can be placed in the default slot. For horizontal scroll, wrap items in a flex container to keep them inline.',
            ],
          ]}
        />
      </section>

      {/* ── CSS custom properties ────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS custom properties"
          description="Token-based CSS properties that can be overridden to theme io-scroller."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '280px' },
            { label: 'Default', width: '280px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="p">--io-scroller-fade-color</InlineCode>,
              <InlineCode key="d">var(--io-bg-page)</InlineCode>,
              'The opaque colour used at the outer edge of the gradient fade. Override this when the scroller sits on a surface other than the page background — e.g. set to var(--io-bg-raised) on a card.',
            ],
            [
              <InlineCode key="p">--io-scroller-fade-size</InlineCode>,
              <InlineCode key="d">var(--io-space-6, 24px)</InlineCode>,
              'Width (horizontal) or height (vertical) of the gradient fade overlay. Increase for a more prominent fade or decrease for a subtler affordance.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
