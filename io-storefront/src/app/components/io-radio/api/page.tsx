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

export default function IoRadioApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-radio Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              <span key="n"><InlineCode>label</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'Label text rendered next to the radio visual. This is the only accessible name for the field — it must always be set.',
            ],
            [
              <InlineCode key="n">name</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'HTML name attribute. Set the same name on every io-radio in a group to enable mutual exclusivity and arrow-key navigation.',
            ],
            [
              <InlineCode key="n">value</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Value submitted with the form when this radio is selected. Passed as the value field in the ioChange event detail. Should be unique within the group.',
            ],
            [
              <span key="n"><InlineCode>checked</InlineCode></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Whether this radio button is selected. Mutable — updated internally on user interaction. Bind to ioChange to keep external state in sync. Only one radio in a group should be checked at any time.',
            ],
            [
              <InlineCode key="n">required</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the field as required. Sets the native required attribute on the input.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the radio button. Renders at reduced opacity and blocks all pointer events. Sets the native disabled attribute.',
            ],
            [
              <span key="n"><InlineCode>error</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Puts the radio button in error state. The custom visual border and label turn red. Sets aria-invalid="true" on the native input.',
            ],
            [
              <InlineCode key="n">errorMessage</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Error message shown below the radio when error is true. Rendered with role="alert" and linked via aria-describedby.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Helper text shown below the radio when error is false. Hidden when the error state is active.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-radio."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '220px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">ioChange</InlineCode>,
              <InlineCode key="t">{'{ checked: boolean; value: string }'}</InlineCode>,
              'No',
              'Fires when the user selects this radio option. The detail contains checked: true and the value string of the selected option. Use this to update external state for the entire group.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelectorAll('io-radio[name="delivery"]')
  .forEach((radio) => {
    radio.addEventListener('ioChange', (e) => {
      console.log('selected:', e.detail.value);
    });
  });

// React
<IoRadio
  label="Express delivery"
  name="delivery"
  value="express"
  onIoChange={(e) => setDelivery(e.detail.value)}
/>

// Angular
<io-radio label="Express delivery" name="delivery" value="express" (ioChange)="onDeliveryChange($event)"></io-radio>

// Vue
<io-radio label="Express delivery" name="delivery" value="express" @io-change="handleDeliveryChange" />`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <ApiTable
          columns={[
            { label: 'Method', width: '160px' },
            { label: 'Signature', width: '320px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">setFocus</InlineCode>,
              <InlineCode key="s">(options?: FocusOptions) =&gt; Promise&lt;void&gt;</InlineCode>,
              'Programmatically moves focus to the native radio input element. Use to return focus after a modal closes or to direct the user to a required field.',
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-radio."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-radio has no content slots.</strong>
          {' '}All content is passed through props:{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>label</code>,{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>helperText</code>, and{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>errorMessage</code>.
        </EmptyNote>
      </section>

    </div>
  );
}
