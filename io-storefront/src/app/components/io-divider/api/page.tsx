'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoDividerApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-divider Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '240px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n">
                <InlineCode>orientation</InlineCode>
                <ReflectBadge />
              </span>,
              <InlineCode key="t">&apos;horizontal&apos; | &apos;vertical&apos;</InlineCode>,
              <InlineCode key="d">&apos;horizontal&apos;</InlineCode>,
              <span key="desc">
                Orientation of the separator. <InlineCode>horizontal</InlineCode> (default) renders a
                full-width horizontal rule using a semantic{' '}
                <InlineCode>&lt;hr&gt;</InlineCode> element. <InlineCode>vertical</InlineCode> renders
                a vertical line using a{' '}
                <InlineCode>div role=&quot;separator&quot; aria-orientation=&quot;vertical&quot;</InlineCode>.
                Reflected to the host attribute so CSS parent selectors can target it.
              </span>,
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                Optional visible label rendered at the center of the divider line. Also sets{' '}
                <InlineCode>aria-label</InlineCode> on the separator landmark. Common use cases: &quot;or&quot;, &quot;and&quot;,
                &quot;continue with&quot;, date headings. When using the default slot, slot content takes precedence over the label prop text.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named and default slots for optional label content."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '180px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">(default)</InlineCode>,
              <span key="desc">
                Optional label content rendered at the center of the divider line. Equivalent to the{' '}
                <InlineCode>label</InlineCode> prop but allows rich content (e.g. icons, styled text).
                When the slot is populated, slot content takes precedence over the <InlineCode>label</InlineCode> prop text.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-divider."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-divider emits no custom events.</strong>
          {' '}It is a purely presentational component.
        </EmptyNote>
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Design tokens that control the visual appearance of io-divider. Override at :root or on the host element."
        />
        <ApiTable
          columns={[
            { label: 'Token', width: '280px' },
            { label: 'Default value', width: '200px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-divider-color</InlineCode>,
              <InlineCode key="d">var(--io-border)</InlineCode>,
              'Color of the separator line. Defaults to the semantic border token (grey-2).',
            ],
            [
              <InlineCode key="n">--io-divider-thickness</InlineCode>,
              <InlineCode key="d">1px</InlineCode>,
              'Width/height of the separator line.',
            ],
            [
              <InlineCode key="n">--io-divider-gap</InlineCode>,
              <InlineCode key="d">var(--io-space-3)</InlineCode>,
              'Gap between the label text and the flanking lines in the labeled variant.',
            ],
            [
              <InlineCode key="n">--io-divider-label-size</InlineCode>,
              <InlineCode key="d">var(--io-font-size-sm)</InlineCode>,
              'Font size of the optional label text.',
            ],
          ]}
        />
        <CodeNote label="Override example">
{`<style>
  /* Thicker divider with brand blue color */
  .my-section io-divider {
    --io-divider-color: var(--io-color-primary);
    --io-divider-thickness: 2px;
  }
</style>

<div class="my-section">
  <io-divider />
</div>`}
        </CodeNote>
        <CodeNote label="Forced colors media query">
{`/* High contrast / forced colors mode (Windows High Contrast, dark reader, etc.) */
@media (forced-colors: active) {
  io-divider {
    --io-divider-color: CanvasText;
  }
}`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-divider exposes no public methods.</strong>
          {' '}All visual behaviour is driven entirely by props.
        </EmptyNote>
      </section>

    </div>
  );
}
