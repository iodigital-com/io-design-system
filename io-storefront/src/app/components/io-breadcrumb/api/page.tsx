'use client';

import { SectionHeader, InlineCode, ApiTable, EmptyNote } from '@/components/api/ApiPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBreadcrumbApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-breadcrumb Stencil component. io-breadcrumb has no configurable props — all content is provided via slotted io-breadcrumb-item sub-components."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-breadcrumb has no props.</strong>
          {' '}Content is driven by slotted{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-breadcrumb-item</code>{' '}
          sub-components. The separator character can be customized via the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>--io-breadcrumb-separator</code>{' '}
          CSS custom property.
        </EmptyNote>
      </section>

      {/* ── CSS custom properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="CSS custom properties for styling io-breadcrumb separators."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '280px' },
            { label: 'Default', width: '80px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="p">--io-breadcrumb-separator</InlineCode>,
              <InlineCode key="d">&apos;/&apos;</InlineCode>,
              "CSS content value for the separator character inserted between items. Override on the io-breadcrumb element or any ancestor. Example: --io-breadcrumb-separator: '›'",
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-breadcrumb."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>default</span>,
              <span key="d">
                Accepts <InlineCode>io-breadcrumb-item</InlineCode> sub-components as children.
                Separators are inserted programmatically between items on each <InlineCode>slotchange</InlineCode> event.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-breadcrumb."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-breadcrumb emits no custom events.</strong>
          {' '}Navigation is handled natively by the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<a>'}</code>{' '}
          elements inside each <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-breadcrumb-item</code>.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-breadcrumb exposes no public methods.</strong>
        </EmptyNote>
      </section>

    </div>
  );
}
