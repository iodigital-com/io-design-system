'use client';

import { SectionHeader, InlineCode, ApiTable, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoSkeletonApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-skeleton Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '320px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">variant</InlineCode>,
              <InlineCode key="t">&apos;text&apos; | &apos;circular&apos; | &apos;rectangular&apos; | &apos;rounded&apos;</InlineCode>,
              <InlineCode key="d">&apos;text&apos;</InlineCode>,
              <span key="desc">
                Shape preset for the skeleton placeholder. Reflected as an attribute.{' '}
                <InlineCode>text</InlineCode> renders a thin rounded bar at line height.{' '}
                <InlineCode>circular</InlineCode> renders a perfect circle.{' '}
                <InlineCode>rectangular</InlineCode> renders a sharp-edged rectangle.{' '}
                <InlineCode>rounded</InlineCode> renders a rectangle with medium border radius.
              </span>,
            ],
            [
              <InlineCode key="n">width</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'CSS width value applied as an inline style. Accepts any valid CSS width: px, %, em, rem, etc. Omit to use the variant\'s default width.',
            ],
            [
              <InlineCode key="n">height</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'CSS height value applied as an inline style. Accepts any valid CSS height. Omit to use the variant\'s default height. Required for circular variants — must equal width to produce a circle.',
            ],
            [
              <InlineCode key="n">animated</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">true</InlineCode>,
              <span key="desc">
                When false, the shimmer animation is disabled and the skeleton renders as a static coloured block.
                The <InlineCode>prefers-reduced-motion</InlineCode> media query automatically disables animation at the OS level — you do not need to set this prop for reduced-motion support.
                Reflected as an attribute.
              </span>,
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;Loading&apos;</InlineCode>,
              'Accessible label set as aria-label on the host element via role="img". Announced by screen readers when the skeleton is rendered. Provide a contextual value when the generic "Loading" text would be ambiguous.',
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-skeleton."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-skeleton emits no events.</strong>
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
          <strong style={{ color: 'var(--io-text-primary)' }}>io-skeleton exposes no public methods.</strong>
          {' '}All behaviour is controlled exclusively through props.
        </EmptyNote>
      </section>

      {/* ── Slots ────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-skeleton."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-skeleton has no content slots.</strong>
          {' '}The component renders a self-contained animated placeholder. All configuration is passed through props:{' '}
          <InlineCode>variant</InlineCode>,{' '}
          <InlineCode>width</InlineCode>,{' '}
          <InlineCode>height</InlineCode>,{' '}
          <InlineCode>animated</InlineCode>, and{' '}
          <InlineCode>label</InlineCode>.
        </EmptyNote>
      </section>

      {/* ── CSS custom properties ────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS custom properties"
          description="Token-based CSS properties that can be overridden to theme io-skeleton."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '320px' },
            { label: 'Default', width: '200px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="p">--io-skeleton-bg</InlineCode>,
              <span key="d" className="text-sm" style={{ color: 'var(--io-text-secondary)' }}>shimmer gradient</span>,
              'Background gradient used for the shimmer animation. Override to apply a custom loading colour.',
            ],
            [
              <InlineCode key="p">--io-skeleton-duration</InlineCode>,
              <InlineCode key="d">1.6s</InlineCode>,
              'Duration of one shimmer animation cycle. Increase to slow the pulse, decrease to speed it up.',
            ],
            [
              <InlineCode key="p">--io-skeleton-border-radius-text</InlineCode>,
              <InlineCode key="d">var(--io-border-radius-xs)</InlineCode>,
              'Border radius applied to the text variant. Defaults to the extra-small border radius token.',
            ],
            [
              <InlineCode key="p">--io-skeleton-border-radius-rounded</InlineCode>,
              <InlineCode key="d">var(--io-border-radius-md)</InlineCode>,
              'Border radius applied to the rounded variant. Defaults to the medium border radius token.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
