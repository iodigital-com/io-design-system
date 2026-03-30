'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBadgeApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-badge Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>IoBadgeVariant</InlineCode>
                <span className="text-xs ml-1" style={{ color: 'var(--io-text-muted)' }}>(9 values)</span>
              </span>,
              <InlineCode key="d">&apos;blue&apos;</InlineCode>,
              <span key="desc">
                Colour and semantic style of the badge. Controls background, text colour, and border. One of:{' '}
                <InlineCode>beige</InlineCode>{' '}
                <InlineCode>blue</InlineCode>{' '}
                <InlineCode>dark</InlineCode>{' '}
                <InlineCode>orange</InlineCode>{' '}
                <InlineCode>rouge</InlineCode>{' '}
                <InlineCode>success</InlineCode>{' '}
                <InlineCode>warning</InlineCode>{' '}
                <InlineCode>error</InlineCode>{' '}
                <InlineCode>outline</InlineCode>
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-badge."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-badge emits no custom events.</strong>
          {' '}It is a presentational component — a passive label with no user interaction model.
          If you need click or keyboard behaviour on a badge, wrap it in an{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<io-button>'}</code>{' '}
          or a native{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<button>'}</code>{' '}
          element.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-badge exposes no public methods.</strong>
          {' '}It is a passive display element with no programmatic API beyond the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>variant</code>{' '}
          prop. There is no focus management or imperative control surface.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default content slots available on io-badge."
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
              <span key="desc">
                Badge label text. Keep to 1–3 words — the badge renders with{' '}
                <InlineCode>white-space: nowrap</InlineCode>, so longer strings will overflow their container.
                The slot text is also the component&apos;s accessible name — always use descriptive words, not
                symbols or colour references alone.
              </span>,
            ],
          ]}
        />
      </section>

    </div>
  );
}
