'use client';

import { SectionHeader, InlineCode, ApiTable, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoBreadcrumbApiPage() {
  return (
    <div className="space-y-16">

      {/* ── io-breadcrumb Properties ──────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties — io-breadcrumb"
          description="@Prop() declarations on the io-breadcrumb container component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '200px' },
            { label: 'Default', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;Breadcrumb&apos;</InlineCode>,
              'Accessible label bound to aria-label on the inner nav landmark. Override for non-English deployments or when multiple breadcrumbs appear on the same page to give each landmark a distinct, descriptive name (WCAG SC 2.4.6 / 4.1.2).',
            ],
          ]}
        />
        <CodeNote label="Localisation example">
{`<!-- Dutch -->
<io-breadcrumb label="Navigatie">
  <io-breadcrumb-item href="/">Home</io-breadcrumb-item>
  <io-breadcrumb-item current>Huidige pagina</io-breadcrumb-item>
</io-breadcrumb>

<!-- Two breadcrumbs on one page — distinct labels prevent duplicate landmark violations -->
<io-breadcrumb label="Primary breadcrumb">...</io-breadcrumb>
<io-breadcrumb label="Section breadcrumb">...</io-breadcrumb>`}
        </CodeNote>
      </section>

      {/* ── io-breadcrumb-item Properties ─────────────────────────── */}
      <section id="item-properties" className="space-y-4">
        <SectionHeader
          title="Properties — io-breadcrumb-item"
          description="@Prop() declarations on the io-breadcrumb-item sub-component."
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
              '—',
              'URL this item links to. When omitted (or when current is true) the item renders as a plain <span> instead of an <a>.',
            ],
            [
              <span key="n"><InlineCode>current</InlineCode></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks this item as the current page. Renders a <span> with aria-current="page" instead of a link. The parent io-breadcrumb auto-sets this on the last item when none is explicitly marked.',
            ],
            [
              <InlineCode key="n">target</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Anchor target attribute (e.g. "_blank", "_self"). When set to "_blank", rel="noopener noreferrer" is added automatically to prevent tab-napping (WCAG SC 3.2.2).',
            ],
            [
              <InlineCode key="n">itemLabel</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Accessible name override — sets aria-label on the rendered <a> or <span>. Use when slot text is insufficient: icon-only items, or when a _blank link needs context like "opens in new tab" appended to its name (WCAG SC 4.1.2).',
            ],
          ]}
        />
        <CodeNote label="target + itemLabel example">
{`<io-breadcrumb>
  <io-breadcrumb-item href="/">Home</io-breadcrumb-item>
  <io-breadcrumb-item
    href="/docs"
    target="_blank"
    item-label="Documentation (opens in new tab)"
  >
    Docs
  </io-breadcrumb-item>
  <io-breadcrumb-item current>API Reference</io-breadcrumb-item>
</io-breadcrumb>`}
        </CodeNote>
      </section>

      {/* ── CSS custom properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Override tokens for io-breadcrumb and io-breadcrumb-item. Set on the io-breadcrumb element or any ancestor."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '300px' },
            { label: 'Default', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="p">--io-breadcrumb-separator</InlineCode>,
              <InlineCode key="d">&apos;/&apos;</InlineCode>,
              "CSS content value for the separator character inserted between items. Use any CSS string or counter value. Example: --io-breadcrumb-separator: '›'",
            ],
            [
              <InlineCode key="p">--io-breadcrumb-separator-color</InlineCode>,
              <InlineCode key="d">var(--io-color-grey-4)</InlineCode>,
              'Color of the separator character. Override for dark or brand-coloured surfaces.',
            ],
            [
              <InlineCode key="p">--io-breadcrumb-item-color</InlineCode>,
              <InlineCode key="d">var(--io-color-primary)</InlineCode>,
              'Text and decoration color of breadcrumb link items. Override for inverted or brand-coloured containers.',
            ],
            [
              <InlineCode key="p">--io-breadcrumb-current-color</InlineCode>,
              <InlineCode key="d">var(--io-text-secondary)</InlineCode>,
              'Text color of the current page item (rendered as a <span>). Override for surfaces where the secondary text token does not provide sufficient contrast.',
            ],
            [
              <InlineCode key="p">--io-breadcrumb-font-size</InlineCode>,
              <InlineCode key="d">var(--io-font-size-sm)</InlineCode>,
              'Font size for all breadcrumb items and the separator. Applies uniformly to links, the current item, and the separator character.',
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
