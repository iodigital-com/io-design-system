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
              <span key="n"><InlineCode>variant</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;mark&apos; | &apos;lockup&apos;</InlineCode>,
              <InlineCode key="d">&apos;mark&apos;</InlineCode>,
              <span key="desc">
                Which visual representation to render.{' '}
                <InlineCode>mark</InlineCode> = geometric iO mark SVG (default).{' '}
                <InlineCode>lockup</InlineCode> = full official brand lockup SVG.
              </span>,
            ],
            [
              <span key="n"><InlineCode>color</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;blue&apos; | &apos;black&apos; | &apos;white&apos; | &apos;beige&apos;</InlineCode>,
              <InlineCode key="d">&apos;blue&apos;</InlineCode>,
              <span key="desc">
                Colour applied to the wordmark.{' '}
                <InlineCode>beige</InlineCode> is only valid on <InlineCode>variant=&quot;mark&quot;</InlineCode>.
              </span>,
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos; | &apos;inherit&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Controls SVG height for mark and lockup variants.',
            ],
            [
              <InlineCode key="n">ariaLabel</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;io Digital&apos;</InlineCode>,
              <span key="desc">
                Sets <InlineCode>aria-label</InlineCode> on the host{' '}
                <InlineCode>role=&quot;img&quot;</InlineCode> element.
                Override when a more specific announcement is needed.
              </span>,
            ],
            [
              <InlineCode key="n">href</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>undefined</span>,
              'Navigation URL. When set, the host element renders as an anchor link wrapping the wordmark SVG.',
            ],
            [
              <span key="n"><InlineCode>target</InlineCode></span>,
              <InlineCode key="t">&apos;_self&apos; | &apos;_blank&apos; | &apos;_parent&apos; | &apos;_top&apos;</InlineCode>,
              <InlineCode key="d">&apos;_self&apos;</InlineCode>,
              'Specifies where to open the linked URL. Only meaningful when href is set.',
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
          {' '}The brand content is fixed. Use <InlineCode>ariaLabel</InlineCode> to customise the accessible announcement.
        </EmptyNote>
      </section>

      {/* ── CSS Parts ─────────────────────────────────────────────── */}
      <section id="css-parts" className="space-y-4">
        <SectionHeader
          title="CSS Parts"
          description="Named parts exposed for targeted styling via the ::part() pseudo-element."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-wordmark exposes no CSS parts.</strong>
          {' '}Both variants render official brand SVGs — their internal structure is not exposed for modification.
        </EmptyNote>
      </section>

    </div>
  );
}
