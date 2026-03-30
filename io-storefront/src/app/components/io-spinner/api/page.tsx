'use client';

import { SectionHeader, InlineCode, ApiTable, EmptyNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoSpinnerApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-spinner Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">size</InlineCode>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Controls the rendered diameter of the spinner. sm = 16px, md = 24px, lg = 40px.',
            ],
            [
              <InlineCode key="n">color</InlineCode>,
              <InlineCode key="t">&apos;primary&apos; | &apos;white&apos; | &apos;current&apos;</InlineCode>,
              <InlineCode key="d">&apos;primary&apos;</InlineCode>,
              <span key="desc">
                Sets the spinner colour. <InlineCode>primary</InlineCode> uses{' '}
                <InlineCode>--io-color-primary</InlineCode>.{' '}
                <InlineCode>white</InlineCode> is for dark or coloured backgrounds.{' '}
                <InlineCode>current</InlineCode> inherits{' '}
                <InlineCode>currentColor</InlineCode> from the parent element.
              </span>,
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;Loading&apos;</InlineCode>,
              'Visually hidden accessible label announced by screen readers via aria-label on the host element. Provide a contextual value when the generic "Loading" text would be ambiguous.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-spinner."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-spinner emits no events.</strong>
          {' '}It is a pure display component with no user interaction model.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-spinner exposes no public methods.</strong>
          {' '}All behaviour is controlled exclusively through props.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-spinner."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-spinner has no content slots.</strong>
          {' '}The component renders a self-contained SVG animation. All configuration is passed through props:{' '}
          <InlineCode>size</InlineCode>,{' '}
          <InlineCode>color</InlineCode>, and{' '}
          <InlineCode>label</InlineCode>.
        </EmptyNote>
      </section>

    </div>
  );
}
