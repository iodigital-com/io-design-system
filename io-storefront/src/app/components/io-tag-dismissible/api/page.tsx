'use client';

import Link from 'next/link';
import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTagDismissibleApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-tag-dismissible Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '220px' },
            { label: 'Default', width: '130px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Visible label text for the chip. Also used to build the dismiss button\'s accessible name: "Remove {label}". When omitted, the default slot renders instead.',
            ],
            [
              <span key="n"><InlineCode>variant</InlineCode><ReflectBadge /></span>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>&apos;default&apos;</InlineCode>{' | '}<InlineCode>&apos;blue&apos;</InlineCode>{' | '}<InlineCode>&apos;beige&apos;</InlineCode>{' | '}
                <InlineCode>&apos;dark&apos;</InlineCode>{' | '}<InlineCode>&apos;orange&apos;</InlineCode>{' | '}<InlineCode>&apos;rouge&apos;</InlineCode>{' | '}
                <InlineCode>&apos;success&apos;</InlineCode>{' | '}<InlineCode>&apos;warning&apos;</InlineCode>{' | '}<InlineCode>&apos;error&apos;</InlineCode>{' | '}<InlineCode>&apos;outline&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;default&apos;</InlineCode>,
              'Colour variant of the chip. Controls background, border, and text colour. Use semantic variants (success/warning/error) when the chip communicates status.',
            ],
            [
              <InlineCode key="n">icon</InlineCode>,
              <InlineCode key="t">IoIconName</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>undefined</span>,
              'Optional leading icon rendered before the label. Accepts any name from the io icon set.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, the dismiss button is visually muted and inert — click and keyboard events are suppressed without removing the button from the tab order.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-tag-dismissible."
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
              <InlineCode key="n">dismiss</InlineCode>,
              <InlineCode key="t">void</InlineCode>,
              'No',
              'Fires when the dismiss button is clicked, or when Delete or Backspace is pressed while the host element is focused. No detail value. Handle this event to remove the chip from your data model.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
const chip = document.querySelector('io-tag-dismissible');
chip.addEventListener('dismiss', () => removeChip(chip));

// React
<IoTagDismissible label="React" onDismiss={() => removeChip('React')} />

// Angular
<io-tag-dismissible label="React" (dismiss)="removeChip('React')" />

// Vue
<io-tag-dismissible label="React" @dismiss="removeChip('React')" />`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-tag-dismissible exposes no public methods.</strong>
          {' '}All interactions are driven by props and events. Listen to the{' '}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)', color: 'var(--io-text-primary)' }}>dismiss</code>{' '}
          event and unmount the element to remove it.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="The default slot renders when the label prop is omitted, supporting rich slotted content such as an icon plus text."
        />
        <ApiTable
          columns={[{ label: 'Slot' }, { label: 'Purpose' }]}
          rows={[
            [
              <InlineCode key="s">(default)</InlineCode>,
              'Rich chip content — used when the label prop is not set. When both are provided, label takes precedence.',
            ],
          ]}
        />
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="These tokens can be set on the host element (or any ancestor) to override component-specific defaults without breaking out of the design system."
        />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          This component has no component-level override tokens. All visual properties are governed by global design tokens documented in the <Link href="/styles/tokens" className="underline">Token Explorer</Link>.
        </p>
      </section>

    </div>
  );
}
