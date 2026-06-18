'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoTextApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-text Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '300px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>tag</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;p&apos; | &apos;span&apos; | &apos;div&apos; | &apos;blockquote&apos; | &apos;time&apos; | &apos;address&apos; | &apos;figcaption&apos; | &apos;cite&apos; | &apos;legend&apos;</InlineCode>,
              <InlineCode key="d">&apos;p&apos;</InlineCode>,
              'Semantic HTML element to render. Choose the tag that matches the content\'s structural role.',
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;xs&apos; | &apos;sm&apos; | &apos;base&apos; | &apos;lg&apos; | &apos;xl&apos; | &apos;inherit&apos;</InlineCode>,
              <InlineCode key="d">&apos;base&apos;</InlineCode>,
              'Font size mapped to --io-font-size-* tokens (12px–20px). Use inherit to defer font-size to a parent element.',
            ],
            [
              <span key="n"><InlineCode>weight</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;regular&apos; | &apos;medium&apos; | &apos;semibold&apos; | &apos;bold&apos;</InlineCode>,
              <InlineCode key="d">&apos;regular&apos;</InlineCode>,
              'Font weight mapped to --io-font-weight-* tokens (400–700).',
            ],
            [
              <span key="n"><InlineCode>align</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;start&apos; | &apos;center&apos; | &apos;end&apos; | &apos;inherit&apos;</InlineCode>,
              <InlineCode key="d">&apos;start&apos;</InlineCode>,
              'Text alignment applied as text-align CSS property.',
            ],
            [
              <span key="n"><InlineCode>color</InlineCode><ReflectBadge /></span>,
              <span key="t" style={{ color: 'var(--io-text-secondary)' }}>
                <InlineCode>IoTextColor</InlineCode>
                <span className="text-xs ml-1" style={{ color: 'var(--io-text-muted)' }}>(9 values)</span>
              </span>,
              <InlineCode key="d">&apos;primary&apos;</InlineCode>,
              <span key="desc">
                Semantic text color. One of:{' '}
                <InlineCode>primary</InlineCode>{' '}
                <InlineCode>secondary</InlineCode>{' '}
                <InlineCode>disabled</InlineCode>{' '}
                <InlineCode>inverse</InlineCode>{' '}
                <InlineCode>success</InlineCode>{' '}
                <InlineCode>warning</InlineCode>{' '}
                <InlineCode>error</InlineCode>{' '}
                <InlineCode>info</InlineCode>{' '}
                <InlineCode>inherit</InlineCode>
              </span>,
            ],
            [
              <span key="n"><InlineCode>ellipsis</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'When true, applies overflow: hidden, text-overflow: ellipsis, white-space: nowrap for single-line truncation.',
            ],
            [
              <span key="n"><InlineCode>hyphens</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;none&apos; | &apos;manual&apos; | &apos;auto&apos; | &apos;inherit&apos;</InlineCode>,
              <InlineCode key="d">&apos;inherit&apos;</InlineCode>,
              'CSS hyphenation mode. auto uses the browser dictionary; manual only breaks at soft-hyphen characters (­). When auto or manual, overflow-wrap: break-word is also applied to prevent overflowing unbreakable strings.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-text."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-text emits no custom events.</strong>
          {' '}It is a presentational component — a passive typographic primitive with no user interaction model.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-text exposes no public methods.</strong>
          {' '}It is a passive display element with no programmatic API beyond its props.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default content slots available on io-text."
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
              'Text content rendered inside the chosen semantic HTML tag. Supports inline HTML for rich text formatting.',
            ],
          ]}
        />
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="Light DOM Note"
          description="io-text uses light DOM (no Shadow DOM). All CSS custom properties and external styles apply directly without any boundary."
        />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          Because io-text renders in the light DOM, standard CSS selectors, global stylesheets, and parent component styles apply directly to the rendered element. Token values are resolved from the nearest ancestor that defines them.
        </p>
      </section>

    </div>
  );
}
