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
          className="text-xl font-bold"
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

export default function IoModalApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-modal Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '200px' },
            { label: 'Type', width: '200px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>open</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Controls dialog visibility. Set to true to open the modal; false to close it. Prefer calling show() and hide() over setting this prop directly.',
            ],
            [
              <InlineCode key="n">heading</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>undefined</span>,
              'Text displayed in the dialog header. Used as the accessible name for the dialog via aria-labelledby. If omitted, use the header slot to provide a custom heading element.',
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">sm | md | lg</InlineCode>,
              <InlineCode key="d">md</InlineCode>,
              'Sets the dialog width. sm is suited to compact confirmations; md is the general-purpose default; lg accommodates content-rich dialogs such as forms or data tables.',
            ],
            [
              <InlineCode key="n">closeOnBackdrop</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">true</InlineCode>,
              'Dismisses the dialog when the user clicks the backdrop area outside the dialog panel. Disable for critical dialogs where accidental dismissal would cause data loss.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-modal."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '200px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">ioOpen</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>void</span>,
              'No',
              'Fires after the modal dialog has opened and focus has moved inside. Use this to run post-open logic such as fetching data or setting initial focus on a specific element.',
            ],
            [
              <InlineCode key="n">ioClose</InlineCode>,
              <span key="t" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>void</span>,
              'No',
              'Fires after the modal dialog has closed. Use this to return focus to the trigger element, clean up state, or trigger follow-up actions.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
const modal = document.querySelector('io-modal');
openBtn.addEventListener('click', () => modal.show());
modal.addEventListener('ioClose', () => console.log('closed'));

// React
const ref = useRef(null);
<io-modal ref={ref} heading="Confirm">...</io-modal>
<button onClick={() => ref.current.show()}>Open</button>

// Angular
@ViewChild('modal') modal!: ElementRef;
openModal() { this.modal.nativeElement.show(); }
<io-modal #modal heading="Confirm" (ioClose)="onClose()">...</io-modal>

// Vue
const modal = ref(null);
<io-modal ref="modal" heading="Confirm" @io-close="onClose">...</io-modal>
<button @click="modal?.show()">Open</button>`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference. Call these imperatively to control modal visibility."
        />
        <ApiTable
          columns={[
            { label: 'Signature', width: '220px' },
            { label: 'Returns', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="s">show()</InlineCode>,
              <InlineCode key="r">Promise&lt;void&gt;</InlineCode>,
              'Opens the modal dialog by calling showModal() on the underlying native dialog element. Moves focus to the first focusable element inside the dialog and emits ioOpen.',
            ],
            [
              <InlineCode key="s">hide()</InlineCode>,
              <InlineCode key="r">Promise&lt;void&gt;</InlineCode>,
              'Closes the modal dialog by calling close() on the underlying native dialog element. Emits ioClose. Focus returns to the element that last had focus before the dialog opened.',
            ],
          ]}
        />
        <CodeNote label="Imperative usage across frameworks">
{`// Vanilla JS
const modal = document.querySelector('io-modal');
openBtn.addEventListener('click', () => modal.show());
modal.addEventListener('ioClose', () => console.log('closed'));

// React
const ref = useRef(null);
<io-modal ref={ref} heading="Confirm">...</io-modal>
<button onClick={() => ref.current.show()}>Open</button>

// Angular
@ViewChild('modal') modal!: ElementRef;
openModal() { this.modal.nativeElement.show(); }
<io-modal #modal heading="Confirm" (ioClose)="onClose()">...</io-modal>

// Vue
const modal = ref(null);
<io-modal ref="modal" heading="Confirm" @io-close="onClose">...</io-modal>
<button @click="modal?.show()">Open</button>`}
        </CodeNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-modal. All slots are optional — use only what your dialog requires."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">header</InlineCode>,
              'Overrides the heading prop. Use for custom header content such as a heading with a subtitle, an icon, or a step indicator. When this slot is used, ensure the slotted content includes a visible heading element for accessibility.',
            ],
            [
              <span key="n" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              'Main dialog body content. Place descriptive text, form fields, data, or any content the user needs to respond to here.',
            ],
            [
              <InlineCode key="n">footer</InlineCode>,
              'Action buttons aligned to the end of the dialog panel by default. Place the primary action button and a secondary ghost-variant cancel button here. Limit footer actions to two buttons.',
            ],
          ]}
        />
        <CodeNote label="Slot usage">
{`<io-modal heading="Confirm deletion" size="sm">
  <!-- default slot: body content -->
  <p>This action cannot be undone. The record will be permanently deleted.</p>

  <!-- footer slot: action buttons -->
  <io-button slot="footer" variant="ghost" size="sm">Cancel</io-button>
  <io-button slot="footer" color="rouge" size="sm">Delete</io-button>
</io-modal>

<!-- header slot: custom header content -->
<io-modal size="md">
  <div slot="header">
    <h2>Upload document</h2>
    <p>Supported formats: PDF, DOCX, PNG</p>
  </div>
  <p>Select a file to upload to this record.</p>
  <io-button slot="footer" variant="ghost" size="sm">Cancel</io-button>
  <io-button slot="footer" size="sm">Upload</io-button>
</io-modal>`}
        </CodeNote>
      </section>

    </div>
  );
}
