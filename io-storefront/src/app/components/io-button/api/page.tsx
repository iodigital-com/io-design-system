'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoButtonApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-button Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              <InlineCode key="t">&apos;solid&apos; | &apos;ghost&apos; | &apos;link&apos;</InlineCode>,
              <InlineCode key="d">&apos;solid&apos;</InlineCode>,
              'Visual fill style. Solid = filled background. Ghost = transparent with border. Link = underline only.',
            ],
            [
              <span key="n"><InlineCode>color</InlineCode><ReflectBadge /></span>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>IoButtonColor</InlineCode>
                <span className="text-xs ml-1" style={{ color: 'var(--io-text-muted)' }}>(10 values)</span>
              </span>,
              <InlineCode key="d">&apos;blue&apos;</InlineCode>,
              <span key="desc">
                Colour theme. One of: <InlineCode>blue</InlineCode> <InlineCode>white</InlineCode> <InlineCode>black</InlineCode> <InlineCode>antraciet</InlineCode> <InlineCode>orange</InlineCode> <InlineCode>pink</InlineCode> <InlineCode>rouge</InlineCode> <InlineCode>yellow</InlineCode> <InlineCode>beige</InlineCode> <InlineCode>grey</InlineCode>. Note: <InlineCode>grey</InlineCode> is only supported with <InlineCode>variant=&quot;ghost&quot;</InlineCode>.
              </span>,
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Size preset. sm ≈ 31px height, md = 42px, lg = 50px. Heights are driven by padding + line-height, not min-height.',
            ],
            [
              <InlineCode key="n">type</InlineCode>,
              <InlineCode key="t">&apos;button&apos; | &apos;submit&apos; | &apos;reset&apos;</InlineCode>,
              <InlineCode key="d">&apos;button&apos;</InlineCode>,
              'Native HTML button type attribute. Ignored when href is set (the element renders as <a> instead).',
            ],
            [
              <InlineCode key="n">href</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'When set, renders the inner element as <a href="..."> instead of <button>. Removed from the anchor when disabled or loading.',
            ],
            [
              <InlineCode key="n">target</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">&apos;_self&apos;</InlineCode>,
              'Forwarded to the anchor target attribute. Only used when href is set.',
            ],
            [
              <InlineCode key="n">rel</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Forwarded to the anchor rel attribute. Only used when href is set. Recommended value for external links: "noreferrer noopener".',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Reduces opacity and blocks all user interaction. Sets aria-disabled="true". On anchors, also removes the href so the link cannot be followed.',
            ],
            [
              <span key="n"><InlineCode>loading</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Displays a centred spinner, hides label and arrow (opacity: 0), and blocks interaction. Sets aria-busy="true" and aria-disabled="true". Button dimensions are preserved — no layout shift.',
            ],
            [
              <InlineCode key="n">fullWidth</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Stretches the button to fill 100% of its containing block. Useful for stacked mobile layouts.',
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Sets aria-label on the inner element. Required for icon-only buttons that have no visible slot text.',
            ],
            [
              <span key="n"><InlineCode>arrow</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;forward&apos; | &apos;back&apos; | &apos;down&apos; | undefined</InlineCode>,
              '—',
              'Renders an animated SVG arrow icon. forward slides right on hover, back rotates 180° and slides left, down rotates 90° and slides down. Omit to hide the arrow.',
            ],
            [
              <span key="n"><InlineCode>arrowPlacement</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;left&apos; | &apos;right&apos;</InlineCode>,
              <InlineCode key="d">&apos;right&apos;</InlineCode>,
              'Side on which the arrow icon is rendered relative to the label. Use "left" for back-navigation patterns.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-button. Listen via addEventListener or framework event binding."
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
              <InlineCode key="n">ioClick</InlineCode>,
              <InlineCode key="t">MouseEvent</InlineCode>,
              'Yes',
              <span key="desc">
                Fires when the user activates the button via click, <kbd className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>Enter</kbd>, or{' '}
                <kbd className="text-xs font-mono px-1 py-0.5 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>Space</kbd>. The original <InlineCode>MouseEvent</InlineCode> is passed as the event detail. Not emitted when <InlineCode>disabled</InlineCode> or <InlineCode>loading</InlineCode> is true.
              </span>,
            ],
          ]}
        />
        <div
          className="rounded-lg p-4"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--io-text-muted)', letterSpacing: '0.04em' }}>
            Usage
          </p>
          <pre
            className="text-xs font-mono overflow-x-auto"
            style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}
          >
{`// Vanilla JS
document.querySelector('io-button')
  .addEventListener('ioClick', (e) => console.log(e.detail));

// React
<IoButton onIoClick={(e) => console.log(e.detail)}>Click me</IoButton>

// Angular
<io-button (click)="handleClick($event)">Click me</io-button>

// Vue
<io-button @click="handleClick">Click me</io-button>`}
          </pre>
        </div>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference. Call after the component has been upgraded."
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
              'Programmatically moves focus to the inner button or anchor element. Useful for managing focus after dynamic UI changes (e.g. closing a modal and returning focus to its trigger).',
            ],
          ]}
        />
        <div
          className="rounded-lg p-4"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--io-text-muted)', letterSpacing: '0.04em' }}>
            Usage
          </p>
          <pre
            className="text-xs font-mono overflow-x-auto"
            style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}
          >
{`// Vanilla JS
const btn = document.querySelector('io-button');
await btn.setFocus({ preventScroll: true });

// React (via ref)
const ref = useRef(null);
await ref.current.setFocus();`}
          </pre>
        </div>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default content slots available on io-button."
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
              'Button label text or arbitrary inline content. For icon-only usage with no visible text, always set the label prop to provide an accessible name.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
