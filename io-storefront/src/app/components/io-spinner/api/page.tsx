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

export default function IoSpinnerApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-spinner Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">size</InlineCode>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Controls the rendered diameter of the spinner. sm = 16px, md = 24px, lg = 40px.',
            ],
            [
              <InlineCode key="n">color</InlineCode>,
              <InlineCode key="t">&apos;primary&apos; | &apos;white&apos; | &apos;current&apos;</InlineCode>,
              <InlineCode key="d">&apos;primary&apos;</InlineCode>,
              <span key="desc">
                Sets the spinner colour. <InlineCode>primary</InlineCode> uses{' '}
                <InlineCode>--io-color-primary</InlineCode>.{' '}
                <InlineCode>white</InlineCode> is for dark or coloured backgrounds.{' '}
                <InlineCode>current</InlineCode> inherits{' '}
                <InlineCode>currentColor</InlineCode> from the parent element.
              </span>,
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;Loading&apos;</InlineCode>,
              'Visually hidden accessible label announced by screen readers via aria-label on the host element. Provide a contextual value when the generic "Loading" text would be ambiguous.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-spinner."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-spinner emits no events.</strong>
          {' '}It is a pure display component with no user interaction model.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-spinner exposes no public methods.</strong>
          {' '}All behaviour is controlled exclusively through props.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-spinner."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-spinner has no content slots.</strong>
          {' '}The component renders a self-contained SVG animation. All configuration is passed through props:{' '}
          <InlineCode>size</InlineCode>,{' '}
          <InlineCode>color</InlineCode>, and{' '}
          <InlineCode>label</InlineCode>.
        </EmptyNote>
      </section>

    </div>
  );
}
