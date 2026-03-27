'use client';

import { PageHeader } from '@/components/layout/PageHeader';

export default function StylesIntroduction() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Design Tokens"
        description="The complete io Digital token system — colour, type, spacing, motion, and shape. All values are CSS custom properties on :root."
        tabs={[]}
      />

      {/* Color Tokens */}
      <section id="colors" className="space-y-8">
        <SectionHeader title="Colors" description="io Digital brand palette from design tokens" />

        <TokenGroup title="Primary Brand">
          <ColorSwatch color="var(--io-color-primary, #0000D2)" hex="#0000D2" name="Primary Blue" token="--io-color-primary" />
          <ColorSwatch color="var(--io-color-primary-hover, #0000a8)" hex="#0000a8" name="Primary Hover" token="--io-color-primary-hover" />
          <ColorSwatch color="var(--io-color-off-white, #EBE8E3)" hex="#EBE8E3" name="Off White" token="--io-color-off-white" border />
          <ColorSwatch color="var(--io-color-beige, #DCCFC2)" hex="#DCCFC2" name="Beige" token="--io-color-beige" />
          <ColorSwatch color="var(--io-color-antraciet, #454545)" hex="#454545" name="Antraciet" token="--io-color-antraciet" />
          <ColorSwatch color="var(--io-color-grey-6, #242424)" hex="#242424" name="Grey 6" token="--io-color-grey-6" />
        </TokenGroup>

        <TokenGroup title="Accents">
          <ColorSwatch color="var(--io-color-orange, #ed7f53)" hex="#ed7f53" name="Orange" token="--io-color-orange" />
          <ColorSwatch color="var(--io-color-pink, #DCC8C2)" hex="#DCC8C2" name="Pink" token="--io-color-pink" />
          <ColorSwatch color="var(--io-color-rouge, #a13865)" hex="#a13865" name="Rouge" token="--io-color-rouge" />
          <ColorSwatch color="var(--io-color-yellow, #fdbc75)" hex="#fdbc75" name="Yellow" token="--io-color-yellow" />
          <ColorSwatch color="var(--io-color-lavendel, #868ada)" hex="#868ada" name="Lavendel" token="--io-color-lavendel" />
        </TokenGroup>

        <TokenGroup title="Status">
          <ColorSwatch color="var(--io-color-success, #30c58e)" hex="#30c58e" name="Success" token="--io-color-success" />
          <ColorSwatch color="var(--io-color-warning, #ffa100)" hex="#ffa100" name="Warning" token="--io-color-warning" />
          <ColorSwatch color="var(--io-color-error, #ff6161)" hex="#ff6161" name="Error" token="--io-color-error" />
        </TokenGroup>

        <TokenGroup title="Focus Ring">
          <ColorSwatch color="var(--io-focus-inner, #7D0034)" hex="#7D0034" name="Focus Inner" token="--io-focus-inner" />
          <ColorSwatch color="var(--io-focus-outer, #FFE4EE)" hex="#FFE4EE" name="Focus Outer" token="--io-focus-outer" border />
        </TokenGroup>
      </section>

      {/* Typography */}
      <section id="typography" className="space-y-4">
        <SectionHeader title="Typography" description="Manrope — io Digital's primary typeface" />
        <div className="space-y-1" style={{ borderTop: '1px solid var(--io-border, #e8e8e8)' }}>
          {[
            { label: 'Heading 1', cls: 'text-4xl font-bold', sample: 'The quick brown fox' },
            { label: 'Heading 2', cls: 'text-3xl font-bold', sample: 'The quick brown fox' },
            { label: 'Heading 3', cls: 'text-2xl font-semibold', sample: 'The quick brown fox jumps' },
            { label: 'Heading 4', cls: 'text-xl font-semibold', sample: 'The quick brown fox jumps over' },
            { label: 'Lead', cls: 'text-lg font-medium', sample: 'The quick brown fox jumps over the lazy dog' },
            { label: 'Body', cls: 'text-base font-normal', sample: 'The quick brown fox jumps over the lazy dog. Bright vixens jump; dozy fowl quack.' },
            { label: 'Small', cls: 'text-sm font-normal', sample: 'Used for captions, helper text, and labels' },
            { label: 'XSmall', cls: 'text-xs font-normal', sample: 'Used for badges, timestamps, and metadata' },
          ].map(({ label, cls, sample }) => (
            <div
              key={label}
              className="flex items-baseline gap-6 py-4"
              style={{ borderBottom: '1px solid var(--io-border, #e8e8e8)' }}
            >
              <span
                className="w-24 text-xs shrink-0"
                style={{ color: 'var(--io-text-muted, #9e9e9e)' }}
              >
                {label}
              </span>
              <span className={`${cls}`} style={{ color: 'var(--io-text-primary, #242424)' }}>
                {sample}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section id="spacing" className="space-y-6">
        <SectionHeader title="Spacing" description="4px base scale — 16 steps" />
        <div className="flex flex-wrap gap-8 items-end">
          {[
            { step: 1, px: 4 }, { step: 2, px: 8 }, { step: 3, px: 12 },
            { step: 4, px: 16 }, { step: 5, px: 20 }, { step: 6, px: 24 },
            { step: 8, px: 32 }, { step: 10, px: 40 }, { step: 12, px: 48 },
          ].map(({ step, px }) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <div
                className="rounded-xs"
                style={{
                  width: px,
                  height: px,
                  background: 'var(--io-color-primary, #0000D2)',
                }}
              />
              <code className="text-xs" style={{ color: 'var(--io-text-muted, #9e9e9e)' }}>
                space-{step}
              </code>
              <span className="text-xs" style={{ color: 'var(--io-text-muted, #9e9e9e)' }}>
                {px}px
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Motion */}
      <section id="motion" className="space-y-6">
        <SectionHeader title="Motion" description="Animation timing tokens" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Fast', token: '--io-motion-fast', ms: '200ms', desc: 'Micro-interactions, icon swaps' },
            { name: 'Base', token: '--io-motion-base', ms: '300ms', desc: 'Standard transitions' },
            { name: 'Slow', token: '--io-motion-slow', ms: '500ms', desc: 'Emphasis, panels, modals' },
          ].map(({ name, token, ms, desc }) => (
            <div
              key={name}
              className="p-6 rounded-lg"
              style={{
                background: 'var(--io-bg-raised, #f5f5f5)',
                border: '1px solid var(--io-border, #e8e8e8)',
              }}
            >
              <p className="text-lg font-semibold" style={{ color: 'var(--io-text-primary, #242424)' }}>
                {name} — {ms}
              </p>
              <code className="text-xs block mt-1" style={{ color: 'var(--io-text-muted, #9e9e9e)' }}>
                {token}
              </code>
              <p className="text-sm mt-2" style={{ color: 'var(--io-text-secondary, #6b6b6b)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius */}
      <section id="border-radius" className="space-y-6">
        <SectionHeader title="Border Radius" description="Corner radius scale" />
        <div className="flex flex-wrap items-end gap-8">
          {[
            { name: 'xs', value: '4px' },
            { name: 'sm', value: '9px' },
            { name: 'md', value: '12px' },
            { name: 'lg', value: '14px' },
            { name: 'xl', value: '24px' },
            { name: 'pill', value: '9999px' },
          ].map(({ name, value }) => (
            <div key={name} className="flex flex-col items-center gap-3">
              <div
                className="w-16 h-16"
                style={{
                  borderRadius: value,
                  background: 'var(--io-color-primary, #0000D2)',
                }}
              />
              <code className="text-xs" style={{ color: 'var(--io-text-muted, #9e9e9e)' }}>
                {name}
              </code>
              <span className="text-xs" style={{ color: 'var(--io-text-muted, #9e9e9e)' }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="block w-1 h-5 rounded-full shrink-0"
          style={{ background: 'var(--io-accent)' }}
          aria-hidden="true"
        />
        <h2
          className="text-xl font-bold"
          style={{
            color: 'var(--io-text-primary)',
            letterSpacing: 'var(--io-heading-tracking-3, -0.015em)',
          }}
        >
          {title}
        </h2>
      </div>
      <p className="ml-3 text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {description}
      </p>
    </div>
  );
}

function TokenGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-4"
        style={{ color: 'var(--io-text-muted, #9e9e9e)' }}
      >
        {title}
      </h3>
      <div className="flex flex-wrap gap-6">{children}</div>
    </div>
  );
}

function ColorSwatch({
  color,
  hex,
  name,
  token,
  border,
}: {
  color: string;
  hex: string;
  name: string;
  token: string;
  border?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-16 h-16 rounded-md shadow-sm"
        style={{
          background: color,
          border: border ? '1px solid var(--io-border, #e8e8e8)' : undefined,
        }}
      />
      <span className="text-xs font-medium text-center" style={{ color: 'var(--io-text-primary, #242424)' }}>
        {name}
      </span>
      <code className="text-xs text-center" style={{ color: 'var(--io-text-muted, #9e9e9e)' }}>
        {hex}
      </code>
      <code className="text-xs text-center" style={{ color: 'var(--io-text-muted, #9e9e9e)' }}>
        {token}
      </code>
    </div>
  );
}
