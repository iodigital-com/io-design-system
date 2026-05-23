'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, EmptyNote } from '@/components/api/ApiPrimitives';

export default function IoAvatarApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-avatar Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
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
              <InlineCode key="n">src</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>undefined</span>,
              'Image URL. On load failure the component automatically falls back to initials or the person icon.',
            ],
            [
              <InlineCode key="n">alt</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              <span key="desc">Accessible alt text for the image. Set to the person&apos;s name for named avatars. Pass an empty string for decorative avatars — <InlineCode>aria-hidden=&quot;true&quot;</InlineCode> is applied automatically.</span>,
            ],
            [
              <InlineCode key="n">name</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>undefined</span>,
              <span key="desc">Full name used to derive 1–2 letter initials (<InlineCode>&quot;Jane Doe&quot; → &quot;JD&quot;</InlineCode>). Also sets <InlineCode>aria-label</InlineCode> on the host element.</span>,
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">IoAvatarSize</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              <span key="desc">
                Visual size of the avatar. One of:{' '}
                <InlineCode>xs</InlineCode>{' (24 px) '}
                <InlineCode>sm</InlineCode>{' (32 px) '}
                <InlineCode>md</InlineCode>{' (40 px) '}
                <InlineCode>lg</InlineCode>{' (48 px) '}
                <InlineCode>xl</InlineCode>{' (64 px)'}
              </span>,
            ],
            [
              <span key="n"><InlineCode>color</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">IoAvatarColor</InlineCode>,
              <InlineCode key="d">&apos;grey&apos;</InlineCode>,
              <span key="desc">
                Background colour for the initials or icon fallback. One of:{' '}
                <InlineCode>blue</InlineCode>{' '}
                <InlineCode>orange</InlineCode>{' '}
                <InlineCode>green</InlineCode>{' '}
                <InlineCode>purple</InlineCode>{' '}
                <InlineCode>grey</InlineCode>
              </span>,
            ],
            [
              <span key="n"><InlineCode>shape</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">IoAvatarShape</InlineCode>,
              <InlineCode key="d">&apos;circle&apos;</InlineCode>,
              <span key="desc">Shape of the avatar container. One of: <InlineCode>circle</InlineCode> <InlineCode>square</InlineCode></span>,
            ],
          ]}
        />
      </section>

      {/* ── Events ───────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-avatar."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-avatar emits no custom events.</strong>
          {' '}It is a presentational component. Image load errors are handled internally and trigger an automatic
          fallback — no external event is emitted.
        </EmptyNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-avatar exposes no public methods.</strong>
          {' '}All behaviour is driven through props.
        </EmptyNote>
      </section>

      {/* ── CSS custom properties ────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS custom properties"
          description="Avatar-specific tokens defined in app.css. Override these on :root or a scoped selector to customise colours."
        />
        <ApiTable
          columns={[
            { label: 'Token', width: '280px' },
            { label: 'Default' },
          ]}
          rows={[
            [<InlineCode key="t">--io-avatar-bg-blue</InlineCode>, <span key="v" style={{ color: 'var(--io-text-secondary)' }}>var(--io-color-primary)</span>],
            [<InlineCode key="t">--io-avatar-bg-orange</InlineCode>, <span key="v" style={{ color: 'var(--io-text-secondary)' }}>var(--io-color-orange)</span>],
            [<InlineCode key="t">--io-avatar-bg-green</InlineCode>, <span key="v" style={{ color: 'var(--io-text-secondary)' }}>#1a7a4a</span>],
            [<InlineCode key="t">--io-avatar-bg-purple</InlineCode>, <span key="v" style={{ color: 'var(--io-text-secondary)' }}>#6b3fa0</span>],
            [<InlineCode key="t">--io-avatar-bg-grey</InlineCode>, <span key="v" style={{ color: 'var(--io-text-secondary)' }}>var(--io-color-grey-3)</span>],
            [<InlineCode key="t">--io-avatar-text-blue</InlineCode>, <span key="v" style={{ color: 'var(--io-text-secondary)' }}>#ffffff</span>],
            [<InlineCode key="t">--io-avatar-text-orange</InlineCode>, <span key="v" style={{ color: 'var(--io-text-secondary)' }}>#ffffff</span>],
            [<InlineCode key="t">--io-avatar-text-green</InlineCode>, <span key="v" style={{ color: 'var(--io-text-secondary)' }}>#ffffff</span>],
            [<InlineCode key="t">--io-avatar-text-purple</InlineCode>, <span key="v" style={{ color: 'var(--io-text-secondary)' }}>#ffffff</span>],
            [<InlineCode key="t">--io-avatar-text-grey</InlineCode>, <span key="v" style={{ color: 'var(--io-text-secondary)' }}>var(--io-color-grey-6)</span>],
          ]}
        />
      </section>

    </div>
  );
}
