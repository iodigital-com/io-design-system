'use client';

import React from 'react';

import { CodeTabs } from '@/components/CodeTabs';
import { PageHeader } from '@/components/layout/PageHeader';

// ── Shared helpers ────────────────────────────────────────────────────────────

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

function SubsectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xs font-semibold uppercase mb-4"
      style={{ color: 'var(--io-text-muted)', letterSpacing: '0.08em' }}
    >
      {children}
    </h3>
  );
}

function RuleCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="flex gap-4 p-5 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <span
        className="block w-1 shrink-0 rounded-full mt-0.5"
        style={{ background: 'var(--io-accent)', height: '1rem' }}
        aria-hidden="true"
      />
      <div>
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
          {label}
        </p>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          {children}
        </p>
      </div>
    </div>
  );
}

// ── Section: Colour treatments ────────────────────────────────────────────────

type MarkColour = 'blue' | 'black' | 'white' | 'beige';

const COLOUR_CARD_CONFIGS: Record<MarkColour, { surface: string; title: string; note: string }> = {
  blue: {
    surface: 'var(--io-color-grey-1, #f7f7f7)',
    title: 'Accent blue (default)',
    note: 'Use on white and light-neutral surfaces.',
  },
  black: {
    surface: 'var(--io-color-grey-1, #f7f7f7)',
    title: 'Dark neutral',
    note: 'Use on light surfaces where brand blue is too prominent.',
  },
  white: {
    surface: 'var(--io-color-grey-6, #242424)',
    title: 'Reversed (white)',
    note: 'Use on dark, primary-blue, or image backgrounds.',
  },
  beige: {
    surface: 'var(--io-color-grey-6, #242424)',
    title: 'Warm beige (mark only)',
    note: 'Use on dark or warm-toned surfaces. Mark variant only.',
  },
};

function LogoCard({ colour }: { colour: MarkColour }) {
  const c = COLOUR_CARD_CONFIGS[colour];
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--io-border)' }}
    >
      <div
        className="flex items-center justify-center py-12"
        style={{ background: c.surface }}
      >
        <io-wordmark variant="mark" color={colour} size="xl" />
      </div>
      <div
        className="px-5 py-4"
        style={{ borderTop: '1px solid var(--io-border)', background: 'var(--io-bg-base)' }}
      >
        <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
          {c.title}
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--io-text-secondary)' }}>
          {c.note}
        </p>
      </div>
    </div>
  );
}

// ── Section: Placements ───────────────────────────────────────────────────────

function PlacementMockup({
  position,
  label,
  description,
  badge,
}: {
  position: 'bottom-right' | 'top-left';
  label: string;
  description: string;
  badge?: string;
}) {
  const posStyle: React.CSSProperties =
    position === 'bottom-right' ? { bottom: 12, right: 12 } : { top: 12, left: 12 };
  return (
    <div>
      <div
        className="relative rounded-md overflow-hidden mb-4"
        style={{ height: 160, background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}
      >
        {/* Content placeholder lines */}
        <div className="absolute top-4 left-4 right-4 space-y-2">
          <div className="h-2 rounded-full" style={{ background: 'var(--io-border)', width: '60%' }} />
          <div className="h-2 rounded-full" style={{ background: 'var(--io-border)', width: '40%' }} />
        </div>
        <div className="absolute" style={posStyle}>
          <io-wordmark variant="mark" color="blue" size="sm" />
        </div>
      </div>
      <div className="flex items-start gap-2">
        {badge && (
          <span
            className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded"
            style={{
              background: 'var(--io-accent-bg)',
              color: 'var(--io-accent-text)',
              letterSpacing: '0.04em',
            }}
          >
            {badge}
          </span>
        )}
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
            {label}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--io-text-secondary)' }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Section: Do's and don'ts ──────────────────────────────────────────────────

type DoOrDont = 'do' | 'dont';

function UsageCard({
  type,
  wordmarkStyle,
  wordmarkWrapStyle,
  wordmarkColor = 'black',
  description,
}: {
  type: DoOrDont;
  wordmarkStyle?: React.CSSProperties;
  wordmarkWrapStyle?: React.CSSProperties;
  wordmarkColor?: MarkColour;
  description: string;
}) {
  const isDo = type === 'do';
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--io-border)' }}
    >
      <div
        className="flex items-center justify-center py-8"
        style={{ background: 'var(--io-bg-base)', ...wordmarkWrapStyle }}
      >
        <io-wordmark variant="mark" color={wordmarkColor} size="lg" style={wordmarkStyle} />
      </div>
      <div
        className="flex gap-3 px-4 py-3"
        style={{ borderTop: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
      >
        <span
          className="block w-1 shrink-0 rounded-full mt-0.5"
          style={{
            background: isDo ? 'var(--io-color-success)' : 'var(--io-color-error)',
            height: '1rem',
          }}
          aria-hidden="true"
        />
        <p className="text-xs" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.5' }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LogotypePageContent() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Logotype"
        description="Approved iO logotype treatments, placement guidance, and implementation tokens."
        tabs={[]}
      />

      {/* ── 1. Introduction ───────────────────────────────────────── */}
      <section id="introduction" className="space-y-6">
        <SectionHeader
          title="Introduction"
          description="The iO brand identity system. Two variants for different contexts — all driven by the io-wordmark component."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Hero mark */}
          <div
            className="flex items-center justify-center py-14 rounded-lg"
            style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
          >
            <io-wordmark variant="mark" color="black" size="xl" />
          </div>
          {/* Description */}
          <div className="space-y-4">
            <p className="text-base" style={{ color: 'var(--io-text-primary)', lineHeight: '1.7' }}>
              The iO logotype is the primary brand identifier — a compact geometric mark composed of
              two letterforms: the italic{' '}
              <strong style={{ fontWeight: 600 }}>i</strong> (a dynamic diagonal stroke suggesting
              forward motion) and the{' '}
              <strong style={{ fontWeight: 600 }}>O</strong> (a precise circle representing
              completeness and clarity).
            </p>
            <p className="text-base" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}>
              Together they form a confident, minimal signature that scales from favicon to billboard.
              Use the{' '}
              <code className="text-sm font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)' }}>
                io-wordmark
              </code>{' '}
              component — never reconstruct the mark from scratch.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Variants ───────────────────────────────────────────── */}
      <section id="variants" className="space-y-6">
        <SectionHeader
          title="Variants"
          description="The io-wordmark component offers two variants for different brand contexts."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Mark variant */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid var(--io-border)' }}
          >
            <div
              className="flex items-center justify-center py-12"
              style={{ background: 'var(--io-bg-raised)' }}
            >
              <io-wordmark variant="mark" color="blue" size="xl" />
            </div>
            <div
              className="px-5 py-4"
              style={{ borderTop: '1px solid var(--io-border)', background: 'var(--io-bg-base)' }}
            >
              <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
                variant=&quot;mark&quot; (default)
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--io-text-secondary)' }}>
                Official geometric iO mark SVG (i + O). Use in favicons, avatars, and constrained icon slots.
              </p>
            </div>
          </div>
          {/* Lockup variant */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid var(--io-border)' }}
          >
            <div
              className="flex items-center justify-center py-12"
              style={{ background: 'var(--io-bg-raised)' }}
            >
              <io-wordmark variant="lockup" color="blue" size="md" />
            </div>
            <div
              className="px-5 py-4"
              style={{ borderTop: '1px solid var(--io-border)', background: 'var(--io-bg-base)' }}
            >
              <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
                variant=&quot;lockup&quot;
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--io-text-secondary)' }}>
                Full official brand lockup SVG (mark + &ldquo;io digital&rdquo;). Use in hero sections and brand-moment placements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Colours ────────────────────────────────────────────── */}
      <section id="colours" className="space-y-6">
        <SectionHeader
          title="Colours"
          description="Three colours apply across all variants; beige is exclusive to the mark variant."
        />
        <div className="space-y-3">
          {[
            { label: 'Accent blue (default)', hex: '#0000D2', token: '--io-color-primary', note: 'Use on white/light surfaces', border: false },
            { label: 'Dark neutral', hex: '#242424', token: '--io-color-grey-6', note: 'Use on light surfaces', border: false },
            { label: 'Reversed (white)', hex: '#FFFFFF', token: '--io-color-white', note: 'Use on dark/image backgrounds', border: true },
            { label: 'Warm beige — mark only', hex: '#E1CFBF', token: '--io-color-beige', note: 'Use on dark/warm surfaces (mark only)', border: false },
          ].map(({ label, hex, token, note, border }) => (
            <div
              key={token}
              className="flex items-center gap-4 px-5 py-4 rounded-lg"
              style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
            >
              <div
                className="w-10 h-10 rounded-md shrink-0"
                style={{
                  background: hex,
                  border: border ? '1px solid var(--io-border)' : undefined,
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
                  {label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--io-text-secondary)' }}>
                  {note}
                </p>
              </div>
              <div className="text-right shrink-0">
                <code className="text-xs block font-mono" style={{ color: 'var(--io-text-primary)' }}>
                  {hex}
                </code>
                <code className="text-xs block font-mono mt-0.5" style={{ color: 'var(--io-text-muted)' }}>
                  {token}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Colour treatment ───────────────────────────────────── */}
      <section id="colour-treatment" className="space-y-6">
        <SectionHeader
          title="Colour treatment"
          description="Choose the treatment based on the background the mark appears on. All four shown on the iO mark variant."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <LogoCard colour="blue" />
          <LogoCard colour="black" />
          <LogoCard colour="white" />
          <LogoCard colour="beige" />
        </div>
      </section>

      {/* ── 5. Placements ─────────────────────────────────────────── */}
      <section id="placements" className="space-y-6">
        <SectionHeader
          title="Placements"
          description="The iO mark anchors to one of two approved corners in any composition."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <PlacementMockup
            position="bottom-right"
            badge="DEFAULT"
            label="Bottom-right"
            description="Primary placement. Anchor the mark to the bottom-right corner with clearspace observed."
          />
          <PlacementMockup
            position="top-left"
            badge="ALTERNATIVE"
            label="Top-left"
            description="Use when the bottom-right position conflicts with primary content or layout balance."
          />
        </div>
        <RuleCard label="Oversized lockup">
          An oversized mark (larger than standard proportions) is allowed only at the{' '}
          <code style={{ fontSize: '0.85em' }}>bottom-right</code> position and only when the
          composition intentionally uses it as a background texture element.
        </RuleCard>
      </section>

      {/* ── 6. Clearspace ─────────────────────────────────────────── */}
      <section id="clearspace" className="space-y-6">
        <SectionHeader
          title="Clearspace"
          description="Always maintain a minimum clear zone around the logotype to protect its visual integrity."
        />
        <div className="flex flex-col items-center gap-4">
          <div
            className="rounded-lg flex items-center justify-center"
            style={{ padding: '2rem', background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
          >
            <div style={{ position: 'relative', padding: 40 }}>
              {/* Dashed clearspace indicator */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1.5px dashed var(--io-border-hover)',
                  borderRadius: 4,
                  pointerEvents: 'none',
                }}
              />
              {/* Side labels */}
              <span
                className="absolute text-[10px] font-semibold"
                style={{ top: '50%', left: 4, transform: 'translateY(-50%)', color: 'var(--io-accent-text)', letterSpacing: '0.04em' }}
              >
                0.5×
              </span>
              <span
                className="absolute text-[10px] font-semibold"
                style={{ top: '50%', right: 4, transform: 'translateY(-50%)', color: 'var(--io-accent-text)', letterSpacing: '0.04em' }}
              >
                0.5×
              </span>
              <span
                className="absolute text-[10px] font-semibold"
                style={{ top: 4, left: '50%', transform: 'translateX(-50%)', color: 'var(--io-accent-text)', letterSpacing: '0.04em' }}
              >
                0.5×
              </span>
              <span
                className="absolute text-[10px] font-semibold"
                style={{ bottom: 4, left: '50%', transform: 'translateX(-50%)', color: 'var(--io-accent-text)', letterSpacing: '0.04em' }}
              >
                0.5×
              </span>
              <io-wordmark variant="mark" color="black" size="xl" style={{ display: 'block' }} />
            </div>
          </div>
          <p className="text-xs text-center" style={{ color: 'var(--io-text-muted)' }}>
            Clearspace = 0.5 × logotype height on every side
          </p>
        </div>
        <RuleCard label="Clearspace rule">
          Keep at least <code style={{ fontSize: '0.85em' }}>0.5×</code> the logotype height free
          on all four sides. No text, imagery, or graphic elements may intrude into this zone.
        </RuleCard>
      </section>

      {/* ── 7. Alternative placement ──────────────────────────────── */}
      <section id="alternative-placement" className="space-y-6">
        <SectionHeader
          title="Alternative placement"
          description="When to use top-left instead of the default bottom-right position."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <RuleCard label="Primary content conflict">
            Use top-left when a signature, call-to-action, or key visual element occupies the
            bottom-right corner.
          </RuleCard>
          <RuleCard label="Composition balance">
            A top-left placement can provide a compositional counterweight when the layout&apos;s
            visual mass is concentrated bottom-right.
          </RuleCard>
          <RuleCard label="Never both simultaneously">
            Never apply the logotype in both the bottom-right and top-left positions within the
            same layout.
          </RuleCard>
        </div>
      </section>

      {/* ── 8. Size ───────────────────────────────────────────────── */}
      <section id="size" className="space-y-6">
        <SectionHeader
          title="Size"
          description="Four size steps via the size prop — sm, md, lg, xl. Both variants scale SVG height."
        />
        <div
          className="rounded-lg px-8 py-10 overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <div className="flex items-end gap-10 min-w-max">
            {([
              { size: 'sm', label: 'sm', note: '16px — Favicon / compact' },
              { size: 'md', label: 'md', note: '24px — Digital minimum' },
              { size: 'lg', label: 'lg', note: '36px — Standard UI' },
              { size: 'xl', label: 'xl', note: '56px — Display / hero' },
            ] as const).map(({ size, label, note }) => (
              <div key={size} className="flex flex-col items-center gap-3">
                <io-wordmark variant="mark" color="black" size={size} />
                <code className="text-xs" style={{ color: 'var(--io-text-primary)' }}>
                  {label}
                </code>
                <span className="text-[10px]" style={{ color: 'var(--io-text-muted)' }}>
                  {note}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <RuleCard label="Digital minimum">
            Never render the mark below <code style={{ fontSize: '0.85em' }}>size=&quot;md&quot;</code>{' '}
            (24px) on screen. At this size letterform detail is still legible.
          </RuleCard>
          <RuleCard label="Print minimum">
            Minimum print size is <code style={{ fontSize: '0.85em' }}>8mm</code> height. Below
            this, ink spread degrades the fine strokes.
          </RuleCard>
          <RuleCard label="Below minimum">
            At <code style={{ fontSize: '0.85em' }}>size=&quot;sm&quot;</code> (16px) and below,
            use the avatar (blue circle) treatment instead of the bare mark.
          </RuleCard>
        </div>
      </section>

      {/* ── 9. Avatar ─────────────────────────────────────────────── */}
      <section id="avatar" className="space-y-6">
        <SectionHeader
          title="Avatar"
          description="Use the primary blue background with the white mark for all avatar and profile contexts."
        />
        <div className="flex flex-wrap items-end gap-10">
          {([
            { containerSize: 96, size: 'xl', label: '96px' },
            { containerSize: 64, size: 'lg', label: '64px' },
            { containerSize: 48, size: 'md', label: '48px' },
            { containerSize: 32, size: 'sm', label: '32px' },
          ] as const).map(({ containerSize, size, label }) => (
            <div key={containerSize} className="flex flex-col items-center gap-3">
              <div
                className="flex items-center justify-center rounded-full overflow-hidden"
                style={{ width: containerSize, height: containerSize, background: 'var(--io-color-primary, #0000D2)' }}
              >
                <io-wordmark variant="mark" color="white" size={size} />
              </div>
              <span className="text-xs" style={{ color: 'var(--io-text-muted)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <RuleCard label="Avatar specification">
          Background: <code style={{ fontSize: '0.85em' }}>var(--io-color-primary)</code>{' '}
          (#0000D2). Foreground:{' '}
          <code style={{ fontSize: '0.85em' }}>color=&quot;white&quot;</code>. Use a perfect
          circle, never a rounded square.
        </RuleCard>
      </section>

      {/* ── 10. Part of iO ────────────────────────────────────────── */}
      <section id="part-of-io" className="space-y-6">
        <SectionHeader
          title="Part of iO"
          description="The 'Part of iO' lockup identifies affiliated products and services. Use only the approved static SVG assets — it is not a component."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SubsectionTitle>On light</SubsectionTitle>
            <div
              className="flex items-center justify-center py-10 rounded-lg"
              style={{ background: 'var(--io-color-grey-1, #f7f7f7)', border: '1px solid var(--io-border)' }}
            >
              <img
                src="/brand/mark/Part-of-iO_black.svg"
                alt="Part of iO"
                height={30}
                style={{ height: 30, width: 'auto' }}
              />
            </div>
          </div>
          <div>
            <SubsectionTitle>On dark</SubsectionTitle>
            <div
              className="flex items-center justify-center py-10 rounded-lg"
              style={{ background: 'var(--io-color-grey-6, #242424)', border: '1px solid var(--io-border)' }}
            >
              <img
                src="/brand/mark/Part-of-iO_white.svg"
                alt="Part of iO"
                height={30}
                style={{ height: 30, width: 'auto' }}
              />
            </div>
          </div>
        </div>
        <RuleCard label="Static asset only">
          The &ldquo;Part of iO&rdquo; lockup is a fixed brand asset — not a component. Use
          the approved SVG from{' '}
          <code style={{ fontSize: '0.85em' }}>/brand/mark/Part-of-iO_black.svg</code> or{' '}
          <code style={{ fontSize: '0.85em' }}>/brand/mark/Part-of-iO_white.svg</code>. Do not
          recreate or alter the lockup.
        </RuleCard>
      </section>

      {/* ── 11. Full brand lockup ──────────────────────────────────── */}
      <section id="brand-lockup" className="space-y-6">
        <SectionHeader
          title="Brand lockup"
          description="The full official brand lockup — iO mark combined with 'io digital' in the approved outlined typeface. Use variant='lockup' on the io-wordmark component."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Light surface */}
          <div>
            <SubsectionTitle>On light</SubsectionTitle>
            <div
              className="flex items-center justify-center py-12 rounded-lg"
              style={{ background: 'var(--io-color-grey-1, #f7f7f7)', border: '1px solid var(--io-border)' }}
            >
              <io-wordmark variant="lockup" color="blue" size="md" />
            </div>
          </div>
          {/* Dark surface */}
          <div>
            <SubsectionTitle>On dark</SubsectionTitle>
            <div
              className="flex items-center justify-center py-12 rounded-lg"
              style={{ background: 'var(--io-color-grey-6, #242424)', border: '1px solid var(--io-border)' }}
            >
              <io-wordmark variant="lockup" color="white" size="md" />
            </div>
          </div>
        </div>
        <RuleCard label="Usage scope">
          Use <code style={{ fontSize: '0.85em' }}>variant=&quot;lockup&quot;</code> for hero
          sections and brand-moment placements that require the official full-lockup SVG. Use{' '}
          <code style={{ fontSize: '0.85em' }}>variant=&quot;mark&quot;</code> for navigation bars,
          avatars, and constrained icon slots.
        </RuleCard>
      </section>

      {/* ── 12. Code usage ────────────────────────────────────────── */}
      <section id="code-usage" className="space-y-6">
        <SectionHeader
          title="Code usage"
          description="Use the io-wordmark component across Angular, React, and Vanilla JS projects."
        />
        <CodeTabs
          tabs={[
            {
              label: 'Angular',
              language: 'html',
              code: `<!-- iO mark (default) -->
<io-wordmark></io-wordmark>

<!-- iO mark in blue, large -->
<io-wordmark variant="mark" color="blue" size="lg"></io-wordmark>

<!-- Full brand lockup, white on dark background -->
<io-wordmark variant="lockup" color="white" size="md"></io-wordmark>

<!-- Full brand lockup, black -->
<io-wordmark variant="lockup" color="black" size="md"></io-wordmark>`,
            },
            {
              label: 'React',
              code: `// iO mark (default)
<io-wordmark />

// iO mark in blue, large
<io-wordmark variant="mark" color="blue" size="lg" />

// Full brand lockup, white on dark background
<io-wordmark variant="lockup" color="white" size="md" />

// Full brand lockup, black
<io-wordmark variant="lockup" color="black" size="md" />`,
            },
            {
              label: 'Vanilla JS',
              language: 'html',
              code: `<!-- iO mark (default) -->
<io-wordmark></io-wordmark>

<!-- iO mark in blue, large -->
<io-wordmark variant="mark" color="blue" size="lg"></io-wordmark>

<!-- Full brand lockup, black -->
<io-wordmark variant="lockup" color="black" size="md"></io-wordmark>`,
            },
          ]}
        />
      </section>

      {/* ── 13. Do's and don'ts ───────────────────────────────────── */}
      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do&apos;s and don&apos;ts"
          description="Common misuse patterns to avoid."
        />

        {/* Do row */}
        <div>
          <SubsectionTitle>Do</SubsectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <UsageCard
              type="do"
              wordmarkColor="blue"
              description="Use the mark at its correct proportions on an approved background."
            />
            <UsageCard
              type="do"
              wordmarkColor="white"
              wordmarkWrapStyle={{ background: 'var(--io-color-grey-6)' }}
              description="Use the reversed (white) treatment on dark surfaces."
            />
            <UsageCard
              type="do"
              wordmarkColor="blue"
              description="Use the accent blue treatment on calm, neutral backgrounds."
            />
          </div>
        </div>

        {/* Don't row */}
        <div>
          <SubsectionTitle>Don&apos;t</SubsectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <UsageCard
              type="dont"
              wordmarkColor="black"
              wordmarkStyle={{ transform: 'rotate(25deg)' }}
              description="Don't rotate or tilt the mark."
            />
            <UsageCard
              type="dont"
              wordmarkColor="black"
              wordmarkStyle={{ transform: 'scaleX(1.6)' }}
              description="Don't stretch or distort the proportions."
            />
            <UsageCard
              type="dont"
              wordmarkColor="black"
              wordmarkStyle={{ color: 'var(--io-color-rouge)' }}
              description="Don't recolour to unapproved colours."
            />
            <UsageCard
              type="dont"
              wordmarkColor="black"
              wordmarkStyle={{ opacity: 0.2 }}
              description="Don't use ghosted or low-opacity versions."
            />
            <UsageCard
              type="dont"
              wordmarkColor="black"
              wordmarkStyle={{ filter: 'drop-shadow(4px 4px 10px rgba(0,0,0,0.7))' }}
              description="Don't add drop shadows, glows, or effects."
            />
            <UsageCard
              type="dont"
              wordmarkColor="black"
              wordmarkStyle={{ outline: '3px solid var(--io-color-error)', outlineOffset: 4 }}
              description="Don't add outlines, borders, or containment shapes."
            />
          </div>
        </div>
      </section>

      {/* ── 14. Local variations ──────────────────────────────────── */}
      <section id="local-variations" className="space-y-6">
        <SectionHeader
          title="Local variations"
          description="iO operates across multiple European markets. The mark is identical in all — only entity naming in body copy changes."
        />
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid var(--io-border)' }}
        >
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--io-bg-raised)', borderBottom: '1px solid var(--io-border)' }}>
                {['Market', 'Brand name', 'Logotype mark', 'Note'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-xs font-semibold"
                    style={{ color: 'var(--io-text-muted)', letterSpacing: '0.06em' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { market: 'Netherlands', name: 'iO', mark: 'Standard', note: 'Primary brand — origin market' },
                { market: 'Belgium', name: 'iO', mark: 'Standard', note: 'Same mark, no variation' },
                { market: 'Germany', name: 'iO', mark: 'Standard', note: 'Same mark, no variation' },
                { market: 'Denmark', name: 'iO', mark: 'Standard', note: 'Same mark, no variation' },
                { market: 'Czechia', name: 'iO', mark: 'Standard', note: 'Same mark, no variation' },
              ].map((row, i) => (
                <tr
                  key={row.market}
                  style={{
                    background: i % 2 === 0 ? 'var(--io-bg-base)' : 'var(--io-bg-raised)',
                    borderBottom: i < 4 ? '1px solid var(--io-border)' : undefined,
                  }}
                >
                  <td className="px-5 py-3 text-sm font-medium" style={{ color: 'var(--io-text-primary)' }}>
                    {row.market}
                  </td>
                  <td className="px-5 py-3 text-sm" style={{ color: 'var(--io-text-primary)' }}>
                    {row.name}
                  </td>
                  <td className="px-5 py-3 text-sm" style={{ color: 'var(--io-text-secondary)' }}>
                    {row.mark}
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: 'var(--io-text-muted)' }}>
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <RuleCard label="Mark consistency">
          The iO logotype mark never changes across markets. Local entities are identified through
          registered company names in legal copy, not through logotype modifications.
        </RuleCard>
      </section>
    </div>
  );
}
