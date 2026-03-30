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

export default function IoToastApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-toast Stencil component."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-toast has no configurable props.</strong>
          {' '}It is a container that registers with the singleton manager. All notification content is passed
          imperatively via the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>addToast()</code>{' '}
          method.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the io-toast element reference."
        />
        <ApiTable
          columns={[
            { label: 'Method', width: '280px' },
            { label: 'Returns', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="m">addToast(message: IoToastMessage)</InlineCode>,
              <InlineCode key="r">Promise&lt;void&gt;</InlineCode>,
              'Enqueue a notification. The message is added to the FIFO queue and displayed when the current toast (if any) has been dismissed. The promise resolves once the message has been enqueued.',
            ],
          ]}
        />

        <div className="space-y-4 mt-6">
          <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
            IoToastMessage type
          </p>
          <ApiTable
            columns={[
              { label: 'Property', width: '160px' },
              { label: 'Type', width: '200px' },
              { label: 'Required', width: '100px' },
              { label: 'Default', width: '110px' },
              { label: 'Description' },
            ]}
            rows={[
              [
                <InlineCode key="n">text</InlineCode>,
                <InlineCode key="t">string</InlineCode>,
                'Yes',
                '—',
                'The notification message text displayed inside the toast.',
              ],
              [
                <InlineCode key="n">variant</InlineCode>,
                <InlineCode key="t">IoToastVariant</InlineCode>,
                'No',
                <InlineCode key="d">&apos;neutral&apos;</InlineCode>,
                'Visual and semantic variant of the toast. One of: neutral, success, error, warning, info.',
              ],
              [
                <InlineCode key="n">duration</InlineCode>,
                <InlineCode key="t">number</InlineCode>,
                'No',
                <InlineCode key="d">6000</InlineCode>,
                'Time in milliseconds before the toast auto-dismisses. Set to 0 for a persistent toast that requires manual dismissal.',
              ],
            ]}
          />
        </div>

        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-toast').addToast({ text: 'Saved!', variant: 'success' });

// React
const toastRef = useRef(null);
<io-toast ref={toastRef} />
toastRef.current?.addToast({ text: 'Saved!', variant: 'success' });

// Angular — inject ToastManager, place <io-toast> once in the app shell
constructor(private toast: ToastManager) {}
this.toast.addToast({ text: 'Saved!', variant: 'success' });

// Vue
const toast = ref(null);
toast.value?.addToast({ text: 'Saved!', variant: 'success' });`}
        </CodeNote>
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-toast."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-toast has no events.</strong>
          {' '}Notification lifecycle (enqueue, display, dismiss) is managed entirely by the component
          internals. Use the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>addToast()</code>{' '}
          method to enqueue messages imperatively.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-toast."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-toast has no slots.</strong>
          {' '}Content is fully managed by the component. Toast notifications are rendered by the
          internal <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>io-toast-item</code>{' '}
          element, which is created and destroyed programmatically by the queue manager.
        </EmptyNote>
      </section>

    </div>
  );
}
