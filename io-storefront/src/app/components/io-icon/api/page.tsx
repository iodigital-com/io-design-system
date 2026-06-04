'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoIconApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-icon Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '300px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>name</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">IoIconName</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>required</span>,
              <span key="desc">
                The icon to render. Must be one of the 51 registered names from the io icon registry.
                See the <strong>Usage</strong> tab for the full list of available names.
                Ignored when <InlineCode>iconSource</InlineCode> is set.
              </span>,
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;xs&apos; | &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              <span key="desc">
                Rendered icon size. Maps to design-token pixel values:{' '}
                <InlineCode>xs</InlineCode> = 12 px,{' '}
                <InlineCode>sm</InlineCode> = 16 px,{' '}
                <InlineCode>md</InlineCode> = 20 px,{' '}
                <InlineCode>lg</InlineCode> = 24 px,{' '}
                <InlineCode>xl</InlineCode> = 32 px.
              </span>,
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>undefined</span>,
              <span key="desc">
                Accessible label for meaningful icons. When set, the component renders with{' '}
                <InlineCode>role=&quot;img&quot;</InlineCode> and <InlineCode>aria-label</InlineCode>.
                When omitted, <InlineCode>aria-hidden=&quot;true&quot;</InlineCode> is applied and the icon
                is invisible to assistive technology.
              </span>,
            ],
            [
              <InlineCode key="n">icon-source</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>undefined</span>,
              <span key="desc">
                URL of a custom SVG to render. Fetched once, cached for the session. Overrides{' '}
                <InlineCode>name</InlineCode> when set. Requires <InlineCode>label</InlineCode> for
                non-decorative use. Renders nothing until fetch resolves.
              </span>,
            ],
            [
              <span key="n"><InlineCode>flip</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                Mirrors the icon horizontally via <InlineCode>scaleX(-1)</InlineCode>. Use for explicit
                RTL overrides. Directional icons (arrow-left/right, chevron-left/right) also flip
                automatically in <InlineCode>:dir(rtl)</InlineCode> contexts.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-icon."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-icon emits no custom events.</strong>
          {' '}It is a presentational component — a passive SVG renderer with no user interaction model.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-icon exposes no public methods.</strong>
          {' '}All behaviour is driven entirely through the three props above. There is no imperative API.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default content slots available on io-icon."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-icon has no slots.</strong>
          {' '}SVG is rendered programmatically from the registry (<InlineCode>name</InlineCode>) or
          fetched from a URL (<InlineCode>icon-source</InlineCode>). No slot for custom SVG content.
        </EmptyNote>
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="These tokens can be set on the host element (or any ancestor) to override component-specific defaults."
        />
        <ApiTable
          columns={[
            { label: 'Token', width: '280px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="t">color</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic', fontSize: '0.8rem' }}>inherited</span>,
              'The icon stroke colour inherits currentColor from its parent. Set color on the host or any ancestor element — no component-level token is needed.',
            ],
          ]}
        />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          All size dimensions are governed by the <InlineCode>size</InlineCode> prop via internal design tokens.
          Width and height are not directly overridable via CSS — use the <InlineCode>size</InlineCode> prop instead.
        </p>
      </section>

    </div>
  );
}
