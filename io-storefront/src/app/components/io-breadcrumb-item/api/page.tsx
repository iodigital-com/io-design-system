'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBreadcrumbItemApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-breadcrumb-item Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">href</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>undefined</span>,
              <span key="desc">
                URL this breadcrumb item links to. When set (and <InlineCode>current</InlineCode> is false),
                the item renders as <InlineCode>{'<a href="...">'}</InlineCode>. When omitted, the item renders as{' '}
                <InlineCode>{'<span>'}</InlineCode>.
              </span>,
            ],
            [
              <span key="n"><InlineCode>current</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                Whether this item represents the current page. When true, the item renders as{' '}
                <InlineCode>{'<span aria-current="page">'}</InlineCode> regardless of whether{' '}
                <InlineCode>href</InlineCode> is set. The parent <InlineCode>io-breadcrumb</InlineCode>{' '}
                automatically sets this to <InlineCode>true</InlineCode> on the last item if no item has{' '}
                <InlineCode>current</InlineCode> set explicitly.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-breadcrumb-item."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>default</span>,
              'The visible label for this breadcrumb item. Becomes the accessible name of the link (when href is set) or the text content of the span (when current).',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-breadcrumb-item."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-breadcrumb-item emits no custom events.</strong>
          {' '}Navigation is handled natively by the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<a>'}</code> element when href is set.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-breadcrumb-item exposes no public methods.</strong>
        </EmptyNote>
      </section>

    </div>
  );
}
