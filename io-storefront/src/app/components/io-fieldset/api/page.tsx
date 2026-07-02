'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoFieldsetApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-fieldset Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
                <InlineCode>label</InlineCode>
                <ReflectBadge />
              </span>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">—</InlineCode>,
              <span key="desc">
                Required. Legend text for the fieldset group — provides the accessible name announced by screen readers
                before each child control.
              </span>,
            ],
            [
              <span key="n">
                <InlineCode>required</InlineCode>
                <ReflectBadge />
              </span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                Renders a decorative <InlineCode>*</InlineCode> indicator in the legend (aria-hidden).
                Does NOT propagate to slotted children — add <InlineCode>required</InlineCode> to each child individually.
              </span>,
            ],
            [
              <span key="n">
                <InlineCode>error</InlineCode>
                <ReflectBadge />
              </span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                Puts the fieldset in error state. Changes the legend color to{' '}
                <InlineCode>--io-fieldset-error-color</InlineCode> and adds an error border
                (satisfying WCAG 1.4.1 non-color indicator). When paired with{' '}
                <InlineCode>errorMessage</InlineCode>, an error paragraph with{' '}
                <InlineCode>role=&quot;alert&quot;</InlineCode> is rendered and linked via{' '}
                <InlineCode>aria-describedby</InlineCode>.
              </span>,
            ],
            [
              <InlineCode key="n">errorMessage</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                Error text displayed below the group when <InlineCode>error=true</InlineCode>.
                If empty or undefined, error styling applies but no error text is rendered.
              </span>,
            ],
            [
              <InlineCode key="n">aria</InlineCode>,
              <InlineCode key="t">Record&lt;string, string&gt; | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                Arbitrary ARIA attributes spread onto the inner{' '}
                <InlineCode>&lt;fieldset&gt;</InlineCode> element. Keys without the{' '}
                <InlineCode>aria-</InlineCode> prefix are normalised automatically (e.g.{' '}
                <InlineCode>labelledby</InlineCode> → <InlineCode>aria-labelledby</InlineCode>).
                The special key <InlineCode>role</InlineCode> is passed through as-is.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Default slot for the grouped form controls."
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
                The grouped form controls or content. Any slotted content is placed inside
                a flex column container with a gap of{' '}
                <InlineCode>--io-fieldset-gap</InlineCode> between children.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-fieldset."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-fieldset emits no custom events.</strong>
          {' '}It is a structural grouping primitive — event handling belongs to the slotted children.
        </EmptyNote>
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Design tokens that control the visual appearance of io-fieldset. Override at :root or on the host element."
        />
        <ApiTable
          columns={[
            { label: 'Token', width: '300px' },
            { label: 'Default value', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-fieldset-gap</InlineCode>,
              <InlineCode key="d">var(--io-space-3)</InlineCode>,
              'Gap between slotted children in the fieldset body.',
            ],
            [
              <InlineCode key="n">--io-fieldset-legend-color</InlineCode>,
              <InlineCode key="d">var(--io-color-neutral-900)</InlineCode>,
              'Color of the legend text. Changes to --io-fieldset-error-color in error state.',
            ],
            [
              <InlineCode key="n">--io-fieldset-error-color</InlineCode>,
              <InlineCode key="d">var(--io-color-error)</InlineCode>,
              'Color of the error message text and error border. Applied when error=true.',
            ],
            [
              <InlineCode key="n">--io-fieldset-border-error-width</InlineCode>,
              <InlineCode key="d">2px</InlineCode>,
              'Width of the left border applied in error state. Provides a non-color indicator for WCAG 1.4.1.',
            ],
          ]}
        />
        <CodeNote label="Override example">
{`<style>
  /* Tighter spacing inside a compact form */
  .compact-form io-fieldset {
    --io-fieldset-gap: var(--io-space-1);
  }
</style>

<div class="compact-form">
  <io-fieldset label="Personal details">
    <io-input label="First name" name="first" />
    <io-input label="Last name" name="last" />
  </io-fieldset>
</div>`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-fieldset exposes no public methods.</strong>
          {' '}All behaviour is driven by props.
        </EmptyNote>
      </section>

    </div>
  );
}
