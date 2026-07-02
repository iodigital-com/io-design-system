'use client';

import { ApiTable, EmptyNote, InlineCode, SectionHeader } from '@/components/api/ApiPrimitives';

export default function IoProgressApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-progress Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '320px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">value</InlineCode>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">0</InlineCode>,
              'Progress percentage from 0 to 100. Values outside this range are automatically clamped.',
            ],
            [
              <InlineCode key="n">color</InlineCode>,
              <InlineCode key="t">&apos;blue&apos; | &apos;orange&apos; | &apos;success&apos; | &apos;warning&apos; | &apos;error&apos;</InlineCode>,
              <InlineCode key="d">&apos;blue&apos;</InlineCode>,
              <span key="desc">
                Colour variant for the progress fill. Reflected as an attribute.{' '}
                <InlineCode>blue</InlineCode> is neutral,{' '}
                <InlineCode>success</InlineCode> indicates completion,{' '}
                <InlineCode>warning</InlineCode> signals a threshold, and{' '}
                <InlineCode>error</InlineCode> indicates failure.
              </span>,
            ],
            [
              <InlineCode key="n">size</InlineCode>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              <span key="desc">
                Track height variant. Reflected as an attribute.{' '}
                <InlineCode>sm</InlineCode>=4px, <InlineCode>md</InlineCode>=8px, <InlineCode>lg</InlineCode>=12px.
              </span>,
            ],
            [
              <InlineCode key="n">shape</InlineCode>,
              <InlineCode key="t">&apos;linear&apos; | &apos;circular&apos; | &apos;step&apos;</InlineCode>,
              <InlineCode key="d">&apos;linear&apos;</InlineCode>,
              <span key="desc">
                Visual variant for the progress indicator. Reflected as an attribute.{' '}
                <InlineCode>linear</InlineCode> renders a horizontal bar,{' '}
                <InlineCode>circular</InlineCode> renders an SVG ring, and{' '}
                <InlineCode>step</InlineCode> renders a segmented step bar.
              </span>,
            ],
            [
              <InlineCode key="n">animated</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">true</InlineCode>,
              <span key="desc">
                When true, the fill width transitions smoothly when <InlineCode>value</InlineCode> changes.
                Automatically disabled by the <InlineCode>prefers-reduced-motion</InlineCode> CSS media query at the OS level.
                Set to false to disable animation unconditionally.
              </span>,
            ],
            [
              <InlineCode key="n">showLabel</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                When true, renders a visible percentage label below the track.
                The label is marked <InlineCode>aria-hidden=&quot;true&quot;</InlineCode> — ARIA value information comes from <InlineCode>aria-valuenow</InlineCode> on the host.
              </span>,
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Accessible name set as aria-label on the host element. Announced by screen readers. Always provide a contextual value — e.g. "Upload progress" or "Step 2 of 4".',
            ],
            [
              <InlineCode key="n">labelledBy</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'ID of an element that labels this progress bar. Sets aria-labelledby.',
            ],
            [
              <InlineCode key="n">valueText</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Human-readable progress description for screen readers (e.g. "Step 2 of 5"). Sets aria-valuetext.',
            ],
            [
              <InlineCode key="n">indeterminate</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Shows an infinite shimmer animation. Omits aria-valuenow so assistive technology announces an unknown progress state.',
            ],
            [
              <InlineCode key="n">min</InlineCode>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">0</InlineCode>,
              'Minimum value. Sets aria-valuemin.',
            ],
            [
              <InlineCode key="n">max</InlineCode>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">100</InlineCode>,
              'Maximum value. Sets aria-valuemax.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-progress."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-progress emits no events.</strong>
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
          <strong style={{ color: 'var(--io-text-primary)' }}>io-progress exposes no public methods.</strong>
          {' '}All behaviour is controlled exclusively through props.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-progress."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-progress has no content slots.</strong>
          {' '}The component renders a self-contained progress track. All configuration is passed through props:{' '}
          <InlineCode>value</InlineCode>,{' '}
          <InlineCode>color</InlineCode>,{' '}
          <InlineCode>size</InlineCode>,{' '}
          <InlineCode>animated</InlineCode>,{' '}
          <InlineCode>showLabel</InlineCode>,{' '}
          <InlineCode>label</InlineCode>,{' '}
          <InlineCode>labelledBy</InlineCode>,{' '}
          <InlineCode>valueText</InlineCode>,{' '}
          <InlineCode>indeterminate</InlineCode>,{' '}
          <InlineCode>min</InlineCode>, and{' '}
          <InlineCode>max</InlineCode>.
        </EmptyNote>
      </section>

      {/* ── CSS custom properties ────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS custom properties"
          description="Token-based CSS properties that can be overridden to theme io-progress."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '280px' },
            { label: 'Default', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="p">--io-progress-track-bg</InlineCode>,
              <InlineCode key="d">var(--io-color-grey-2)</InlineCode>,
              'Background colour of the progress track. Overridden in dark mode to use dark-bg-raised.',
            ],
            [
              <InlineCode key="p">--io-progress-fill-blue</InlineCode>,
              <InlineCode key="d">var(--io-color-primary)</InlineCode>,
              'Fill colour for color=blue (Energetic Blue #0000D2).',
            ],
            [
              <InlineCode key="p">--io-progress-fill-orange</InlineCode>,
              <InlineCode key="d">var(--io-color-orange)</InlineCode>,
              'Fill colour for color=orange (#ed7f53).',
            ],
            [
              <InlineCode key="p">--io-progress-fill-success</InlineCode>,
              <InlineCode key="d">#1a7a4a</InlineCode>,
              'Fill colour for color=success. WCAG AA green.',
            ],
            [
              <InlineCode key="p">--io-progress-fill-warning</InlineCode>,
              <InlineCode key="d">#b85c00</InlineCode>,
              'Fill colour for color=warning. WCAG AA amber.',
            ],
            [
              <InlineCode key="p">--io-progress-fill-error</InlineCode>,
              <InlineCode key="d">var(--io-color-error, #c0392b)</InlineCode>,
              'Fill colour for color=error. Aliases --io-color-error with a red fallback.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
