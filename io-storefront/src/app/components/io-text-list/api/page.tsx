'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoTextListApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-text-list Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              <InlineCode key="t">&apos;ul&apos; | &apos;ol&apos;</InlineCode>,
              <InlineCode key="d">&apos;ul&apos;</InlineCode>,
              'Semantic HTML list element to render. Use ul for unordered content and ol for ordered/sequential content.',
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;xs&apos; | &apos;sm&apos; | &apos;base&apos; | &apos;lg&apos; | &apos;xl&apos; | &apos;inherit&apos;</InlineCode>,
              <InlineCode key="d">&apos;base&apos;</InlineCode>,
              'Font size mapped to --io-font-size-* tokens (12px–20px). Use inherit to defer font-size to a parent element.',
            ],
            [
              <span key="n"><InlineCode>color</InlineCode><ReflectBadge /></span>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>IoTextListColor</InlineCode>
                <span className="text-xs ml-1" style={{ color: 'var(--io-text-muted)' }}>(9 values)</span>
              </span>,
              <InlineCode key="d">&apos;primary&apos;</InlineCode>,
              <span key="desc">
                Semantic text color. One of:{' '}
                <InlineCode>primary</InlineCode>{' '}
                <InlineCode>secondary</InlineCode>{' '}
                <InlineCode>disabled</InlineCode>{' '}
                <InlineCode>inverse</InlineCode>{' '}
                <InlineCode>success</InlineCode>{' '}
                <InlineCode>warning</InlineCode>{' '}
                <InlineCode>error</InlineCode>{' '}
                <InlineCode>info</InlineCode>{' '}
                <InlineCode>inherit</InlineCode>
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-text-list."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-text-list emits no custom events.</strong>
          {' '}It is a presentational component — a passive typographic list primitive with no user interaction model.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-text-list exposes no public methods.</strong>
          {' '}It is a passive display element with no programmatic API beyond its props.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default content slots available on io-text-list."
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
              'List items rendered inside the chosen semantic HTML list element. Slot li elements directly as children.',
            ],
          ]}
        />
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="Shadow DOM"
          description="io-text-list uses Shadow DOM with delegatesFocus. Font size and color are applied via inline styles resolved from io design tokens."
        />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          The list element renders inside a Shadow DOM. Font size and color are applied as inline styles on the rendered list element using resolved token values. The default slot projects slotted <code className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>li</code> children into the shadow-projected list.
        </p>
      </section>

    </div>
  );
}
