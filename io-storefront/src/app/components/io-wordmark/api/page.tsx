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
            { label: 'Type', width: '300px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>variant</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;text&apos; | &apos;mark&apos; | &apos;lockup&apos;</InlineCode>,
              <InlineCode key="d">&apos;text&apos;</InlineCode>,
              <span key="desc">
                Which visual representation to render.{' '}
                <InlineCode>text</InlineCode> = typographic web-font wordmark (default, backwards-compatible).{' '}
                <InlineCode>mark</InlineCode> = geometric iO mark SVG.{' '}
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
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Controls font-size on the text variant, or SVG height on mark/lockup variants.',
            ],
            [
              <span key="n"><InlineCode>mono</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                Monochrome mode. Both &ldquo;io&rdquo; and &ldquo;digital&rdquo; use{' '}
                <InlineCode>currentColor</InlineCode>. Text variant only — kept for backwards compatibility.
              </span>,
            ],
            [
              <InlineCode key="n">ariaLabel</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;io Digital&apos;</InlineCode>,
              <span key="desc">
                Sets <InlineCode>aria-label</InlineCode> on the host{' '}
                <InlineCode>role=&quot;img&quot;</InlineCode> element (or the <InlineCode>{'<a>'}</InlineCode> in link mode).
                Override when a more specific announcement is needed.
              </span>,
            ],
            [
              <InlineCode key="n">href</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                When provided on <InlineCode>variant=&quot;text&quot;</InlineCode>, renders as an{' '}
                <InlineCode>{'<a>'}</InlineCode> element. Common use case: logo linking back to the homepage.
              </span>,
            ],
            [
              <InlineCode key="n">target</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Browsing context for the link (_self, _blank, etc.). Only applied when href is set.',
            ],
            [
              <InlineCode key="n">rel</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Link relationship (noopener noreferrer, etc.). Only applied when href is set.',
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
          description="Named parts exposed for targeted styling via the ::part() pseudo-element. Only available on variant='text'."
        />
        <ApiTable
          columns={[
            { label: 'Part', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">root</InlineCode>,
              'The outer wrapper span on variant="text". Target to adjust layout or spacing.',
            ],
            [
              <InlineCode key="n">io</InlineCode>,
              'The "io" text span on variant="text". Receives the brand-blue colour token by default.',
            ],
            [
              <InlineCode key="n">digital</InlineCode>,
              'The "digital" text span on variant="text". Inherits currentColor from the host.',
            ],
            [
              <InlineCode key="n">link</InlineCode>,
              'The <a> element rendered on variant="text" when href is set.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
