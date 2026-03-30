'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';


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
              'Renders a remove icon (×) inside the tag. Clicking the icon fires remove instead of toggle. Use in tag input fields where selected values can be cleared.',
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
              <InlineCode key="n">toggle</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              'No',
              'Fires when the tag is clicked and not disabled and not removable. The detail is the new selected value (true if now selected, false if now deselected).',
            ],
            [
              <InlineCode key="n">remove</InlineCode>,
              <InlineCode key="t">void</InlineCode>,
              'No',
              'Fires when the remove icon is clicked on a removable tag. No detail value. Handle this event to remove the tag from your data model.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
const tag = document.querySelector('io-tag');
tag.addEventListener('toggle', (e) => console.log('selected:', e.detail));
tag.addEventListener('remove', () => removeTag(tag));

// React
<IoTag onToggle={(e) => setSelected(e.detail)}>React</IoTag>
<IoTag removable onRemove={() => removeTag(id)}>TypeScript</IoTag>

// Angular
<io-tag (toggle)="onToggle($event)">React</io-tag>

// Vue
<io-tag @toggle="handleToggle">React</io-tag>`}
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
