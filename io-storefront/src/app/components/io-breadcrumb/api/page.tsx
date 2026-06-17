'use client';

import { SectionHeader, InlineCode, ApiTable, EmptyNote } from '@/components/api/ApiPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBreadcrumbApiPage() {
  return (
    <div className="space-y-16">

      {/* ── io-breadcrumb Properties ──────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="io-breadcrumb Properties"
          description="@Prop() declarations on the io-breadcrumb container component."
        />
        <ApiTable
          columns={[
            { label: 'Prop', width: '160px' },
            { label: 'Type', width: '100px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="p">label</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;Breadcrumb&apos;</InlineCode>,
              "Accessible label applied as aria-label on the wrapping <nav> element. Override for non-English UIs or when multiple breadcrumbs appear on the same page to avoid duplicate unlabelled landmarks (WCAG 2.4.6 / 4.1.2).",
            ],
          ]}
        />
      </section>

      {/* ── io-breadcrumb-item Properties ─────────────────────────── */}
      <section id="item-properties" className="space-y-4">
        <SectionHeader
          title="io-breadcrumb-item Properties"
          description="@Prop() declarations on the io-breadcrumb-item sub-component."
        />
        <ApiTable
          columns={[
            { label: 'Prop', width: '160px' },
            { label: 'Type', width: '120px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="p">href</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'URL the item links to. When omitted the item renders as plain text.',
            ],
            [
              <InlineCode key="p">current</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks this item as the current page. Adds aria-current="page" and renders as a <span> instead of <a>. Reflected to the host attribute.',
            ],
            [
              <InlineCode key="p">target</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Anchor target attribute (e.g. "_blank"). When set to "_blank", rel="noopener noreferrer" is added automatically for security (WCAG 3.2.2).',
            ],
            [
              <InlineCode key="p">itemLabel</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Accessible name override applied as aria-label on the rendered <a> or <span>. Use when slot text alone is insufficient, e.g. icon-only items (WCAG 4.1.2).',
            ],
          ]}
        />
      </section>

      {/* ── CSS custom properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Global tokens declared in app.css for per-instance or site-level breadcrumb theming."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '280px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="p">--io-breadcrumb-separator</InlineCode>,
              <InlineCode key="d">&apos;/&apos;</InlineCode>,
              "CSS content value for the separator character between items. Override on io-breadcrumb or any ancestor.",
            ],
            [
              <InlineCode key="p">--io-breadcrumb-font-size</InlineCode>,
              <InlineCode key="d">var(--io-font-size-sm)</InlineCode>,
              'Font size applied to all breadcrumb text (links, current item, separator).',
            ],
            [
              <InlineCode key="p">--io-breadcrumb-item-color</InlineCode>,
              <InlineCode key="d">var(--io-color-primary)</InlineCode>,
              'Color of link items. Override for dark or coloured banner surfaces.',
            ],
            [
              <InlineCode key="p">--io-breadcrumb-current-color</InlineCode>,
              <InlineCode key="d">var(--io-text-secondary)</InlineCode>,
              'Color of the current-page span. Override for inverted-background surfaces.',
            ],
            [
              <InlineCode key="p">--io-breadcrumb-separator-color</InlineCode>,
              <InlineCode key="d">var(--io-color-grey-4)</InlineCode>,
              'Color of the separator character. Override for dark or brand-coloured containers.',
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
                Separators are rendered automatically between items.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-breadcrumb and io-breadcrumb-item."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>No custom events are emitted.</strong>
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
          <strong style={{ color: 'var(--io-text-primary)' }}>No public methods are exposed.</strong>
        </EmptyNote>
      </section>

    </div>
  );
}
