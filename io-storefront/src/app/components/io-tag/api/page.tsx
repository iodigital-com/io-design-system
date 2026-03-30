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
      style={{ background: 'color-mix(in srgb, var(--io-accent-text) 10%, transparent)', color: 'var(--io-accent-text)', border: '1px solid color-mix(in srgb, var(--io-accent-text) 25%, transparent)' }}
      title="This prop is reflected to a host HTML attribute"
    >
      reflects
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

export default function IoTagApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-tag Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>selected</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Whether the tag is in its selected (active) state. Mutable — updated internally on toggle. Set aria-pressed="true" on the host when selected.',
            ],
            [
              <InlineCode key="n">removable</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Renders a remove icon (×) inside the tag. Clicking the icon fires ioRemove instead of ioToggle. Use in tag input fields where selected values can be cleared.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables all interactions. Sets aria-disabled="true" on the button. The tag remains focusable and visible in the tab order.',
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>&apos;sm&apos;</InlineCode>{' | '}<InlineCode>&apos;md&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Visual size of the tag. sm is for compact or dense UI contexts; md is the default for standard filter bars and form contexts.',
            ],
            [
              <span key="n"><InlineCode>color</InlineCode><ReflectBadge /></span>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>&apos;default&apos;</InlineCode>{' | '}<InlineCode>&apos;blue&apos;</InlineCode>{' | '}<InlineCode>&apos;beige&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;default&apos;</InlineCode>,
              'Colour palette applied to the tag background and text. Use consistently within a tag group to convey category or semantic meaning.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-tag."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '160px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">ioToggle</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              'No',
              'Fires when the tag is clicked and not disabled and not removable. The detail is the new selected value (true if now selected, false if now deselected).',
            ],
            [
              <InlineCode key="n">ioRemove</InlineCode>,
              <InlineCode key="t">void</InlineCode>,
              'No',
              'Fires when the remove icon is clicked on a removable tag. No detail value. Handle this event to remove the tag from your data model.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
const tag = document.querySelector('io-tag');
tag.addEventListener('ioToggle', (e) => console.log('selected:', e.detail));
tag.addEventListener('ioRemove', () => removeTag(tag));

// React
<IoTag onIoToggle={(e) => setSelected(e.detail)}>React</IoTag>
<IoTag removable onIoRemove={() => removeTag(id)}>TypeScript</IoTag>

// Angular
<io-tag (ioToggle)="onToggle($event)">React</io-tag>

// Vue
<io-tag @io-toggle="handleToggle">React</io-tag>`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-tag exposes no public methods.</strong>
          {' '}All interactions are driven by props and events. Use the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>selected</code>{' '}
          prop to control state programmatically.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-tag."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>default</span>,
              'Tag label text. This becomes the visible text of the chip and is used as the accessible name. Keep it short — one or two words.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
