'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoWordmarkApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-wordmark Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Controls the overall font-size of the wordmark via the token-driven size scale.',
            ],
            [
              <span key="n"><InlineCode>mono</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                Monochrome mode. When <InlineCode>true</InlineCode>, both &ldquo;io&rdquo; and &ldquo;digital&rdquo; use{' '}
                <InlineCode>currentColor</InlineCode> instead of the brand-blue primary token.
                Use on coloured or image backgrounds.
              </span>,
            ],
            [
              <InlineCode key="n">ariaLabel</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;io Digital&apos;</InlineCode>,
              <span key="desc">
                Sets the <InlineCode>aria-label</InlineCode> on the host{' '}
                <InlineCode>role=&quot;img&quot;</InlineCode> element.
                Override when a more specific announcement is needed for context.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-wordmark."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-wordmark emits no custom events.</strong>
          {' '}It is a presentational brand component — a passive display element with no user interaction model.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-wordmark exposes no public methods.</strong>
          {' '}It is a passive display element with no programmatic API beyond its props.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default content slots available on io-wordmark."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-wordmark has no slots.</strong>
          {' '}The wordmark text (&ldquo;io digital&rdquo;) is fixed brand content and is not slottable.
          Use the <InlineCode>ariaLabel</InlineCode> prop to customise the accessible announcement.
        </EmptyNote>
      </section>

      {/* ── CSS Parts ─────────────────────────────────────────────── */}
      <section id="css-parts" className="space-y-4">
        <SectionHeader
          title="CSS Parts"
          description="Named parts exposed for targeted styling via the ::part() pseudo-element."
        />
        <ApiTable
          columns={[
            { label: 'Part', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">root</InlineCode>,
              'The outer wrapper span. Target to adjust layout or spacing of the wordmark container.',
            ],
            [
              <InlineCode key="n">io</InlineCode>,
              'The "io" text span. Receives the brand-blue colour token by default. Override only when consuming in a context where the token is insufficient.',
            ],
            [
              <InlineCode key="n">digital</InlineCode>,
              'The "digital" text span. Inherits currentColor from the host.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
