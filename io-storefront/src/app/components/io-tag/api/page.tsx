'use client';

import Link from 'next/link';
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
              <span key="n"><InlineCode>variant</InlineCode><ReflectBadge /></span>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>IoTagVariant</InlineCode>
                <span className="text-xs ml-1" style={{ color: 'var(--io-text-muted)' }}>(7 values)</span>
              </span>,
              <InlineCode key="d">&apos;neutral&apos;</InlineCode>,
              <span key="desc">
                Semantic colour variant applied to the tag background and text. One of:{' '}
                <InlineCode>neutral</InlineCode>{' '}
                <InlineCode>primary</InlineCode>{' '}
                <InlineCode>info</InlineCode>{' '}
                <InlineCode>success</InlineCode>{' '}
                <InlineCode>warning</InlineCode>{' '}
                <InlineCode>error</InlineCode>{' '}
                <InlineCode>subtle</InlineCode>.
                Use semantic status variants (<InlineCode>success</InlineCode>, <InlineCode>warning</InlineCode>, <InlineCode>error</InlineCode>) with a visible label to avoid conveying state through colour alone.
              </span>,
            ],
            [
              <span key="n"><InlineCode>appearance</InlineCode><ReflectBadge /></span>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>&apos;solid&apos;</InlineCode>{' | '}<InlineCode>&apos;soft&apos;</InlineCode>{' | '}<InlineCode>&apos;frosted&apos;</InlineCode>
              </span>,
              <InlineCode key="d">&apos;soft&apos;</InlineCode>,
              'Controls the background fill style. solid is a fully-filled background; soft is a translucent tinted background; frosted applies a backdrop-filter blur over a semi-transparent fill.',
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Accessible label for the tag content.',
            ],
            [
              <InlineCode key="n">icon</InlineCode>,
              <InlineCode key="t">IoIconName | undefined</InlineCode>,
              '—',
              'Optional leading icon name from the io icon set. Renders an io-icon element before the tag label text. When set alongside iconSource, iconSource takes precedence as the SVG source.',
            ],
            [
              <InlineCode key="n">iconSource</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Custom SVG URL for the leading icon. When set alongside icon, this URL takes precedence over the icon name as the SVG source.',
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
              'Fires when the tag button is clicked and the tag is not disabled. The detail is the new selected value (true if now selected, false if now deselected).',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
const tag = document.querySelector('io-tag');
tag.addEventListener('toggle', (e) => console.log('selected:', e.detail));

// React
<IoTag onToggle={(e) => setSelected(e.detail)}>React</IoTag>

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

      {/* ── Implementation Notes ─────────────────────────────────── */}
      <section id="implementation-notes" className="space-y-4">
        <SectionHeader
          title="Implementation Notes"
          description="Technical details about io-tag behaviour."
        />
        <div className="space-y-4">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
            <strong style={{ color: 'var(--io-text-primary)' }}>Form safety:</strong> The internal button element carries <InlineCode>type="button"</InlineCode>. This prevents accidental form submission when io-tag is placed inside a <InlineCode>&lt;form&gt;</InlineCode> element.
          </p>
        </div>
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
