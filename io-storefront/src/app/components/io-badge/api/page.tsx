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

// ── Generic table ─────────────────────────────────────────────────────────────

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

// ── Reflect badge ─────────────────────────────────────────────────────────────

function ReflectBadge() {
  return (
    <span
      className="inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ml-1.5 align-middle"
      style={{ background: 'color-mix(in srgb, var(--io-accent-text) 10%, transparent)', color: 'var(--io-accent-text)', border: '1px solid color-mix(in srgb, var(--io-accent-text) 25%, transparent)' }}
      title="This prop is reflected to a host HTML attribute"
    >
      reflects
    </span>
  );
}

// ── Empty section note ────────────────────────────────────────────────────────

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
