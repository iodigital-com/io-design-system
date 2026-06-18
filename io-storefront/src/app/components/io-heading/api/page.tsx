'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoHeadingApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-heading Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              <span key="n"><InlineCode>tag</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;h1&apos; | &apos;h2&apos; | &apos;h3&apos; | &apos;h4&apos; | &apos;h5&apos; | &apos;h6&apos;</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic', fontSize: '0.85rem' }}>required</span>,
              <span key="desc">Semantic heading element. Required for correct document outline. A dev warning is logged and the component falls back to h2 if omitted.</span>,
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos; | &apos;2xl&apos; | &apos;3xl&apos; | &apos;4xl&apos;</InlineCode>,
              <InlineCode key="d">&apos;2xl&apos;</InlineCode>,
              'Visual font size using --io-font-size-* tokens (14px–32px). Independent from semantic heading level.',
            ],
            [
              <span key="n"><InlineCode>weight</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;regular&apos; | &apos;semibold&apos; | &apos;bold&apos;</InlineCode>,
              <InlineCode key="d">&apos;semibold&apos;</InlineCode>,
              'Font weight using --io-font-weight-* tokens (400, 600, 700).',
            ],
            [
              <span key="n"><InlineCode>align</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;start&apos; | &apos;center&apos; | &apos;end&apos; | &apos;inherit&apos;</InlineCode>,
              <InlineCode key="d">&apos;start&apos;</InlineCode>,
              'Text alignment applied as text-align CSS property.',
            ],
            [
              <span key="n"><InlineCode>color</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;primary&apos; | &apos;secondary&apos; | &apos;inherit&apos; | &apos;inverse&apos; | &apos;brand&apos;</InlineCode>,
              <InlineCode key="d">&apos;primary&apos;</InlineCode>,
              'Text color. primary → --io-text-primary; secondary → --io-text-secondary; inverse → --io-text-inverse (use on dark surfaces); brand → --io-color-primary; inherit → inherits from parent.',
            ],
            [
              <span key="n"><InlineCode>ellipsis</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, applies overflow: hidden, text-overflow: ellipsis, white-space: nowrap for single-line truncation.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-heading."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-heading emits no custom events.</strong>
          {' '}It is a presentational component — a passive typographic primitive with no user interaction model.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-heading exposes no public methods.</strong>
          {' '}It is a passive display element with no programmatic API beyond its props.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default content slots available on io-heading."
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
              'Heading text content rendered inside the chosen h1–h6 element. The slot text is the accessible name of the heading and contributes to the document outline.',
            ],
          ]}
        />
      </section>

      {/* ── Light DOM Note ────────────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="Light DOM Note"
          description="io-heading uses light DOM (no Shadow DOM). All CSS custom properties and external styles apply directly without any boundary."
        />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          Because io-heading renders in the light DOM, standard CSS selectors, global stylesheets, and parent component styles apply directly to the rendered element. Token values are resolved from the nearest ancestor that defines them.
        </p>
      </section>

    </div>
  );
}
