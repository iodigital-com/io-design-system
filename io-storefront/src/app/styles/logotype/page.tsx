import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CodeTabs } from '@/components/CodeTabs';

// ── SVG paths ─────────────────────────────────────────────────────────────────

const IO_MARK_PATHS = {
  letterO:
    'M125.42,78.6c12.61,0,22.86,10.26,22.86,22.86s-10.26,22.86-22.86,22.86s-22.86-10.26-22.86-22.86S112.82,78.6,125.42,78.6 M125.42,55.74c-25.25,0-45.72,20.47-45.72,45.72c0,25.25,20.47,45.72,45.72,45.72c25.25,0,45.72-20.47,45.72-45.72C171.15,76.21,150.68,55.74,125.42,55.74L125.42,55.74z',
  letterI1:
    'M54.8,86.94L54.8,86.94l-21.54,48.38l24.26,10.8l10.74-24.13C74.22,108.6,68.19,92.9,54.8,86.94z',
  letterI2:
    'M41.34,51.88c-5.96,13.4,0.06,29.09,13.46,35.06l10.8-24.26L41.34,51.88z',
};

// ── Shared helpers ────────────────────────────────────────────────────────────

function IoMark({ size = 92, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label="iO logotype"
      style={style}
    >
      <path fill="currentColor" d={IO_MARK_PATHS.letterO} />
      <path fill="currentColor" d={IO_MARK_PATHS.letterI1} />
      <path fill="currentColor" d={IO_MARK_PATHS.letterI2} />
    </svg>
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

type ColourVariant = 'positive' | 'negative' | 'accent';

const CARD_CONFIGS: Record<ColourVariant, { surface: string; color: string; title: string; note: string }> = {
  positive: {
    surface: 'var(--io-color-grey-1, #f7f7f7)',
    color: 'var(--io-color-grey-6, #242424)',
    title: 'Positive (dark on light)',
    note: 'Default use on light surfaces.',
  },
  negative: {
    surface: 'var(--io-color-grey-6, #242424)',
    color: 'var(--io-color-white, #ffffff)',
    title: 'Negative (light on dark)',
    note: 'Preferred treatment where contrast allows.',
  },
  accent: {
    surface: 'var(--io-color-grey-1, #f7f7f7)',
    color: 'var(--io-color-primary, #0000D2)',
    title: 'Accent blue',
    note: 'Use on calm/light backgrounds only.',
  },
};

function LogoCard({ variant }: { variant: ColourVariant }) {
  const c = CARD_CONFIGS[variant];
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--io-border)' }}
    >
      <div
        className="flex items-center justify-center py-12"
        style={{ background: c.surface }}
      >
        <IoMark style={{ color: c.color }} />
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
          <IoMark size={32} style={{ color: 'var(--io-color-primary)' }} />
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
  markStyle,
  markWrapStyle,
  description,
}: {
  type: DoOrDont;
  markStyle?: React.CSSProperties;
  markWrapStyle?: React.CSSProperties;
  description: string;
}) {
  const isDo = type === 'do';
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--io-border)' }}
    >
      {/* Visual preview */}
      <div
        className="flex items-center justify-center py-8"
        style={{ background: 'var(--io-bg-base)', ...markWrapStyle }}
      >
        <IoMark size={52} style={{ color: 'var(--io-color-grey-6)', ...markStyle }} />
      </div>
      {/* Description — pill pattern matching Typography/Colours */}
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

export default function LogotypePage() {
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
          description="What the iO mark is and when to use it."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Hero mark */}
          <div
            className="flex items-center justify-center py-14 rounded-lg"
            style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
          >
            <IoMark size={120} style={{ color: 'var(--io-color-grey-6)' }} />
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
              Always use the approved SVG asset. Never reconstruct or redraw the mark from scratch.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Colours ────────────────────────────────────────────── */}
      <section id="colours" className="space-y-6">
        <SectionHeader
          title="Colours"
          description="Three approved colour values — each tied to a specific background context."
        />
        <div className="space-y-3">
          {[
            { label: 'Default dark', hex: '#242424', token: 'brand.logotype.tokens.defaultColorDark', note: 'On light backgrounds', border: false },
            { label: 'Default light', hex: '#FFFFFF', token: 'brand.logotype.tokens.defaultColorLight', note: 'On dark backgrounds', border: true },
            { label: 'Accent blue', hex: '#0000D2', token: 'brand.logotype.tokens.accentColor', note: 'On calm/neutral backgrounds', border: false },
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

      {/* ── 3. Colour treatment ───────────────────────────────────── */}
      <section id="colour-treatment" className="space-y-6">
        <SectionHeader
          title="Colour treatment"
          description="Choose the treatment based on the background the mark appears on."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <LogoCard variant="positive" />
          <LogoCard variant="negative" />
          <LogoCard variant="accent" />
        </div>
      </section>

      {/* ── 4. Placements ─────────────────────────────────────────── */}
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

      {/* ── 5. Clearspace ─────────────────────────────────────────── */}
      <section id="clearspace" className="space-y-6">
        <SectionHeader
          title="Clearspace"
          description="Always maintain a minimum clear zone around the logotype to protect its visual integrity."
        />
        {/* Clearspace diagram */}
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
                style={{
                  top: '50%',
                  left: 4,
                  transform: 'translateY(-50%)',
                  color: 'var(--io-accent-text)',
                  letterSpacing: '0.04em',
                }}
              >
                0.5×
              </span>
              <span
                className="absolute text-[10px] font-semibold"
                style={{
                  top: '50%',
                  right: 4,
                  transform: 'translateY(-50%)',
                  color: 'var(--io-accent-text)',
                  letterSpacing: '0.04em',
                }}
              >
                0.5×
              </span>
              <span
                className="absolute text-[10px] font-semibold"
                style={{
                  top: 4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'var(--io-accent-text)',
                  letterSpacing: '0.04em',
                }}
              >
                0.5×
              </span>
              <span
                className="absolute text-[10px] font-semibold"
                style={{
                  bottom: 4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'var(--io-accent-text)',
                  letterSpacing: '0.04em',
                }}
              >
                0.5×
              </span>
              <IoMark size={80} style={{ color: 'var(--io-color-grey-6)', display: 'block' }} />
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

      {/* ── 6. Alternative placement ──────────────────────────────── */}
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
            A top-left placement can provide a compositional counterweight when the layout's
            visual mass is concentrated bottom-right.
          </RuleCard>
          <RuleCard label="Never both simultaneously">
            Never apply the logotype in both the bottom-right and top-left positions within the
            same layout.
          </RuleCard>
        </div>
      </section>

      {/* ── 7. Size ───────────────────────────────────────────────── */}
      <section id="size" className="space-y-6">
        <SectionHeader
          title="Size"
          description="Minimum and recommended sizes across digital and print contexts."
        />
        {/* Size scale */}
        <div
          className="rounded-lg px-8 py-10 overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
        >
          <div className="flex items-end gap-8 min-w-max">
            {[
              { px: 16, label: '16px', note: 'Favicon min' },
              { px: 24, label: '24px', note: 'Digital min' },
              { px: 32, label: '32px', note: 'Small' },
              { px: 48, label: '48px', note: 'Medium' },
              { px: 64, label: '64px', note: 'Large' },
              { px: 96, label: '96px', note: 'Display' },
            ].map(({ px, label, note }) => (
              <div key={px} className="flex flex-col items-center gap-3">
                <IoMark size={px} style={{ color: 'var(--io-color-grey-6)' }} />
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
            Never render the bare mark below <code style={{ fontSize: '0.85em' }}>24px</code>{' '}
            height on screen. At this size letterform detail is still legible.
          </RuleCard>
          <RuleCard label="Print minimum">
            Minimum print size is <code style={{ fontSize: '0.85em' }}>8mm</code> height. Below
            this, ink spread degrades the fine strokes.
          </RuleCard>
          <RuleCard label="Below minimum">
            At <code style={{ fontSize: '0.85em' }}>16px</code> and below, use the avatar
            (blue circle) treatment instead of the bare mark.
          </RuleCard>
        </div>
      </section>

      {/* ── 8. Avatar ─────────────────────────────────────────────── */}
      <section id="avatar" className="space-y-6">
        <SectionHeader
          title="Avatar"
          description="Use the primary blue background with the white logotype for all avatar and profile contexts."
        />
        <div className="flex flex-wrap items-end gap-10">
          {[
            { size: 96, markSize: 56, label: '96px' },
            { size: 64, markSize: 38, label: '64px' },
            { size: 48, markSize: 28, label: '48px' },
            { size: 32, markSize: 18, label: '32px' },
          ].map(({ size, markSize, label }) => (
            <div key={size} className="flex flex-col items-center gap-3">
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: size, height: size, background: 'var(--io-color-primary, #0000D2)' }}
              >
                <IoMark size={markSize} style={{ color: 'var(--io-color-white, #ffffff)' }} />
              </div>
              <span className="text-xs" style={{ color: 'var(--io-text-muted)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <RuleCard label="Avatar specification">
          Background: <code style={{ fontSize: '0.85em' }}>var(--io-color-primary)</code>{' '}
          (#0000D2). Foreground: white. Logotype scaled to approximately 60% of the circle
          diameter. Use a perfect circle, never a rounded square.
        </RuleCard>
      </section>

      {/* ── 9. Code usage ─────────────────────────────────────────── */}
      <section id="code-usage" className="space-y-6">
        <SectionHeader
          title="Code usage"
          description="Reference the brand colour tokens in your Angular or React project."
        />
        <CodeTabs
          tabs={[
            {
              label: 'Angular',
              code: `/* In your Angular component styles */
.brand-mark {
  color: var(--io-color-primary);     /* Energetic Blue — default brand colour */
  fill: currentColor;
}

.brand-mark--antraciet {
  color: var(--io-color-antraciet);   /* Antraciet — dark neutral variant */
}

.brand-mark--white {
  color: var(--io-color-white);       /* Reversed — use on dark backgrounds */
}`,
            },
            {
              label: 'React',
              code: `/* Apply brand colour tokens to your logo implementation */

{/* Energetic Blue variant */}
<svg style={{ color: 'var(--io-color-primary)', fill: 'currentColor' }}>
  {/* io Digital brand mark paths */}
</svg>

{/* Antraciet variant */}
<svg style={{ color: 'var(--io-color-antraciet)', fill: 'currentColor' }}>
  {/* io Digital brand mark paths */}
</svg>

{/* White reversed variant */}
<svg style={{ color: 'var(--io-color-white)', fill: 'currentColor' }}>
  {/* io Digital brand mark paths */}
</svg>`,
            },
          ]}
        />
      </section>

      {/* ── 10. Do's and don'ts ───────────────────────────────────── */}
      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do's and don'ts"
          description="Common misuse patterns to avoid."
        />

        {/* Do row */}
        <div>
          <SubsectionTitle>Do</SubsectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <UsageCard
              type="do"
              description="Use the mark at its correct proportions on an approved background."
            />
            <UsageCard
              type="do"
              markStyle={{ color: 'var(--io-color-white)' }}
              markWrapStyle={{ background: 'var(--io-color-grey-6)' }}
              description="Use the negative (white) treatment on dark surfaces."
            />
            <UsageCard
              type="do"
              markStyle={{ color: 'var(--io-color-primary)' }}
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
              markStyle={{ transform: 'rotate(25deg)' }}
              description="Don't rotate or tilt the mark."
            />
            <UsageCard
              type="dont"
              markStyle={{ transform: 'scaleX(1.6)' }}
              description="Don't stretch or distort the proportions."
            />
            <UsageCard
              type="dont"
              markStyle={{ color: 'var(--io-color-rouge)' }}
              description="Don't recolour to unapproved colours."
            />
            <UsageCard
              type="dont"
              markStyle={{ opacity: 0.2 }}
              description="Don't use ghosted or low-opacity versions."
            />
            <UsageCard
              type="dont"
              markStyle={{ filter: 'drop-shadow(4px 4px 10px rgba(0,0,0,0.7))' }}
              description="Don't add drop shadows, glows, or effects."
            />
            <UsageCard
              type="dont"
              markStyle={{ color: 'var(--io-color-grey-6)', outline: '3px solid var(--io-color-error)', outlineOffset: 4 }}
              description="Don't add outlines, borders, or containment shapes."
            />
          </div>
        </div>
      </section>

      {/* ── 10. iodigital.com version ─────────────────────────────── */}
      <section id="iodigital-com-version" className="space-y-6">
        <SectionHeader
          title="iodigital.com version"
          description="The horizontal lockup used on iodigital.com — mark + wordmark."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Light surface */}
          <div>
            <SubsectionTitle>On light</SubsectionTitle>
            <div
              className="flex items-center justify-center py-12 rounded-lg"
              style={{ background: 'var(--io-color-grey-1, #f7f7f7)', border: '1px solid var(--io-border)' }}
            >
              <div className="flex items-center gap-3 select-none">
                <IoMark size={44} style={{ color: 'var(--io-color-primary)' }} />
                <div>
                  <span
                    className="block text-2xl font-bold"
                    style={{ color: 'var(--io-color-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}
                  >
                    io
                  </span>
                  <span
                    className="block text-xs font-light tracking-widest uppercase"
                    style={{ color: 'var(--io-text-secondary)', marginTop: 2 }}
                  >
                    digital
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Dark surface */}
          <div>
            <SubsectionTitle>On dark</SubsectionTitle>
            <div
              className="flex items-center justify-center py-12 rounded-lg"
              style={{ background: 'var(--io-color-grey-6, #242424)', border: '1px solid var(--io-border)' }}
            >
              <div className="flex items-center gap-3 select-none">
                <IoMark size={44} style={{ color: 'var(--io-color-white, #ffffff)' }} />
                <div>
                  <span
                    className="block text-2xl font-bold"
                    style={{ color: 'var(--io-color-white, #ffffff)', letterSpacing: '-0.03em', lineHeight: 1 }}
                  >
                    io
                  </span>
                  <span
                    className="block text-xs font-light tracking-widest uppercase"
                    style={{ color: 'rgba(255,255,255,0.55)', marginTop: 2 }}
                  >
                    digital
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RuleCard label="Usage scope">
          This horizontal lockup is reserved for iodigital.com and official digital properties.
          Component libraries and design systems use the standalone mark only — not this full
          wordmark lockup.
        </RuleCard>
      </section>

      {/* ── 11. Local variations ──────────────────────────────────── */}
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
