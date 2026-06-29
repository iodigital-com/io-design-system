'use client';

import Link from 'next/link';
import { SectionHeader, InlineCode, ApiTable, EmptyNote } from '@/components/api/ApiPrimitives';


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
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;inherit&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Controls the rendered diameter of the spinner. sm = 16px, md = 24px, lg = 40px. inherit sizes the spinner at 1em × 1em relative to the parent\'s font-size, useful for inline loading indicators.',
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
            [
              <InlineCode key="n">aria</InlineCode>,
              <InlineCode key="t">Partial&lt;Record&lt;&apos;aria-label&apos; | &apos;aria-describedby&apos; | &apos;aria-live&apos; | &apos;aria-atomic&apos;, string&gt;&gt;</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                ARIA attribute overrides spread onto the host element.{' '}
                When <InlineCode>aria[&apos;aria-label&apos;]</InlineCode> is set it takes precedence over the{' '}
                <InlineCode>label</InlineCode> prop. Use{' '}
                <InlineCode>aria-live=&apos;polite&apos;</InlineCode> with{' '}
                <InlineCode>aria-atomic=&apos;true&apos;</InlineCode> for live regions that announce loading state changes.
              </span>,
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
          {' '}The component renders a self-contained CSS animation. All configuration is passed through props:{' '}
          <InlineCode>size</InlineCode>,{' '}
          <InlineCode>color</InlineCode>, and{' '}
          <InlineCode>label</InlineCode>.
        </EmptyNote>
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

      {/* ── Accessibility Notes ───────────────────────────────────── */}
      <section id="accessibility-notes" className="space-y-4">
        <SectionHeader
          title="Accessibility Notes"
          description="Additional accessibility considerations for io-spinner."
        />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          <strong style={{ color: 'var(--io-text-primary)' }}>Windows High Contrast Mode:</strong>{' '}
          the spinner ring colour is forced to <InlineCode>ButtonText</InlineCode> for visibility in high-contrast themes.
        </p>
      </section>

    </div>
  );
}
