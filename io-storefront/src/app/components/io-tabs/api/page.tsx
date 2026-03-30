'use client';

import React from 'react';

// ── Local helpers ─────────────────────────────────────────────────────────────

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="block w-1 h-5 rounded-full shrink-0"
          style={{ background: 'var(--io-accent)' }}
          aria-hidden="true"
        />
        <h2
          className="text-lg font-bold"
          style={{ color: 'var(--io-text-primary)', letterSpacing: 'var(--io-heading-tracking-3, -0.015em)' }}
        >
          {title}
        </h2>
      </div>
      <p className="ml-3 text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {description}
      </p>
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="text-xs font-mono px-1.5 py-0.5 rounded"
      style={{
        background: 'var(--io-bg-surface)',
        border: '1px solid var(--io-border)',
        color: 'var(--io-text-primary)',
      }}
    >
      {children}
    </code>
  );
}

type Column = { label: string; width?: string };

function ApiTable({
  columns,
  rows,
}: {
  columns: Column[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--io-border)' }}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: 'var(--io-bg-surface)', borderBottom: '1px solid var(--io-border)' }}>
            {columns.map((col) => (
              <th
                key={col.label}
                className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-widest"
                style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em', width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                background: i % 2 === 1 ? 'var(--io-bg-raised)' : 'transparent',
                borderBottom: i < rows.length - 1 ? '1px solid var(--io-border)' : 'none',
              }}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 align-top"
                  style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReflectBadge() {
  return (
    <span
      className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ml-1.5 align-middle"
      style={{
        background: 'color-mix(in srgb, var(--io-accent-text) 10%, transparent)',
        color: 'var(--io-accent-text)',
        border: '1px solid color-mix(in srgb, var(--io-accent-text) 25%, transparent)',
      }}
      title="This prop is reflected to a host HTML attribute"
    >
      reflects
    </span>
  );
}

function MutableBadge() {
  return (
    <span
      className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ml-1.5 align-middle"
      style={{
        background: 'color-mix(in srgb, var(--io-color-success) 10%, transparent)',
        color: 'var(--io-color-success)',
        border: '1px solid color-mix(in srgb, var(--io-color-success) 25%, transparent)',
      }}
      title="This prop is mutable — updated internally by the component"
    >
      mutable
    </span>
  );
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg p-5"
      style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
    >
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {children}
      </p>
    </div>
  );
}

function CodeNote({ label, children }: { label: string; children: string }) {
  return (
    <div
      className="rounded-lg p-4"
      style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
    >
      <p className="text-xs font-semibold mb-2" style={{ color: 'var(--io-text-muted)', letterSpacing: '0.04em' }}>
        {label}
      </p>
      <pre
        className="text-xs font-mono overflow-x-auto"
        style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}
      >
        {children}
      </pre>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTabsApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-tabs Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute. Props marked 'mutable' are updated internally by the component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '200px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">tabs</InlineCode>,
              <InlineCode key="t">IoTabItem[]</InlineCode>,
              <InlineCode key="d">[]</InlineCode>,
              <span key="desc">
                Array of tab descriptors. Each item has a required{' '}
                <InlineCode>label</InlineCode> (display text),{' '}
                <InlineCode>value</InlineCode> (unique identifier string), and optional{' '}
                <InlineCode>disabled</InlineCode> (boolean). The order of items determines the
                visual and keyboard order of the tab buttons.
              </span>,
            ],
            [
              <span key="n">
                <InlineCode>activeTab</InlineCode>
                <MutableBadge />
                <ReflectBadge />
              </span>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              <span key="desc">
                The <InlineCode>value</InlineCode> of the currently active tab. Mutable — updated
                internally when the user activates a tab. Reflected to a host attribute so it can
                be observed via CSS attribute selectors. Bind to{' '}
                <InlineCode>ioChange</InlineCode> to keep external state in sync.
              </span>,
            ],
          ]}
        />
        <CodeNote label="IoTabItem type">
{`interface IoTabItem {
  /** Text displayed on the tab button and used as the accessible name. */
  label: string;
  /** Unique identifier emitted in the ioChange event detail. */
  value: string;
  /** When true, the tab is visually dimmed and cannot be activated. */
  disabled?: boolean;
}`}
        </CodeNote>
      </section>

      {/* ── Events ───────────────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-tabs."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '180px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">ioChange</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              'No',
              'Fires when the user activates a tab (via click, Enter, or Space). The event detail is the value string of the newly active tab. Use this to update the activeTab prop and render the corresponding panel.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-tabs')
  .addEventListener('ioChange', (e) => {
    console.log('active tab:', e.detail);
  });

// React
<IoTabs
  tabs={tabs}
  activeTab={activeTab}
  onIoChange={(e) => setActiveTab(e.detail)}
/>

// Angular
<io-tabs [tabs]="tabs" [activeTab]="activeTab" (ioChange)="onTabChange($event)"></io-tabs>

// Vue
<io-tabs :tabs="tabs" :active-tab="activeTab" @io-change="handleChange" />`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-tabs exposes no public methods.</strong>
          {' '}All interactions are driven by prop changes (<InlineCode>tabs</InlineCode>,{' '}
          <InlineCode>activeTab</InlineCode>) and the <InlineCode>ioChange</InlineCode> event.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-tabs."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-tabs has no content slots.</strong>
          {' '}The component renders tab buttons only. Panel content is managed entirely by the
          consuming application — render each panel as a sibling element with{' '}
          <InlineCode>role=&quot;tabpanel&quot;</InlineCode> and conditionally show the panel whose
          value matches <InlineCode>activeTab</InlineCode>.
        </EmptyNote>
      </section>

    </div>
  );
}
