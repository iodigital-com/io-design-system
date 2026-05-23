'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBreadcrumbApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-breadcrumb Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              <InlineCode key="n">items</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;[]&apos;</InlineCode>,
              <span key="desc">
                JSON string representing an array of <InlineCode>IoBreadcrumbItem</InlineCode> objects.
                Each item has a required <InlineCode>label</InlineCode> and an optional <InlineCode>href</InlineCode>.
                The last item is treated as the current page — omit its <InlineCode>href</InlineCode> so it renders as{' '}
                <InlineCode>{`<span aria-current="page">`}</InlineCode>.
                Example: <InlineCode>{`'[{"label":"Home","href":"/"},{"label":"Current"}]'`}</InlineCode>
              </span>,
            ],
            [
              <span key="n"><InlineCode>separator</InlineCode><ReflectBadge /></span>,
              <span key="t">
                <InlineCode>&apos;chevron&apos; | &apos;slash&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;chevron&apos;</InlineCode>,
              'Style of separator rendered between breadcrumb items. chevron renders a small right-pointing SVG; slash renders a / character. Both are aria-hidden and not announced by screen readers.',
            ],
            [
              <InlineCode key="n">maxVisible</InlineCode>,
              <InlineCode key="t">number | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>undefined</span>,
              <span key="desc">
                Maximum number of items to display before collapsing. When items exceed this count, middle items are hidden behind a{' '}
                <InlineCode>…</InlineCode> expand button. The first and last items are always visible.
                When <InlineCode>undefined</InlineCode>, all items are shown.
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
          {' '}Navigation is handled natively by the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>{'<a>'}</code> elements
          inside each breadcrumb item. The expand button updates internal state only and does not emit an event.
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
          {' '}The component manages its own expand/collapse state internally. Reset the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>items</code>{' '}
          prop to reset collapse state (the <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>@Watch</code> hook handles this automatically).
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default content slots available on io-breadcrumb."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-breadcrumb uses no slots.</strong>
          {' '}All content is driven by the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>items</code>{' '}
          JSON string prop, which defines the label and href for each breadcrumb item.
        </EmptyNote>
      </section>

    </div>
  );
}
