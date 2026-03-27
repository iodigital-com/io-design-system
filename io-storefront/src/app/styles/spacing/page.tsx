import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CodeTabs } from '@/components/CodeTabs';

// ── Mandatory helpers (Rule 11 — copy verbatim) ───────────────────────────────

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
          style={{ color: 'var(--io-text-primary)', letterSpacing: 'var(--io-heading-tracking-3, -0.015em)' }}
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

type DoOrDont = 'do' | 'dont';

function DoOrDontCard({ type, children }: { type: DoOrDont; children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <span
        className="block w-1 shrink-0 rounded-full mt-0.5"
        style={{
          background: type === 'do' ? 'var(--io-color-success)' : 'var(--io-color-error)',
          height: '1rem',
        }}
        aria-hidden="true"
      />
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {children}
      </p>
    </div>
  );
}

// ── Page-specific helpers ─────────────────────────────────────────────────────

function SpacingRow({
  token,
  rem,
  px,
  twKey,
}: {
  token: string;
  rem: string;
  px: string;
  twKey: string;
}) {
  const barWidth = Math.min(Math.round((parseInt(px) / 96) * 100), 100);
  return (
    <div
      className="flex items-center gap-4 px-5 py-3 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <code className="text-xs font-mono shrink-0" style={{ color: 'var(--io-text-primary)', width: 132 }}>
        {token}
      </code>
      <div style={{ flex: '0 0 240px', height: 10, background: 'var(--io-bg-hover)', borderRadius: 3 }}>
        <div
          style={{
            height: '100%',
            width: `${barWidth}%`,
            minWidth: 4,
            background: 'var(--io-accent)',
            borderRadius: 3,
            opacity: 0.75,
          }}
        />
      </div>
      <code className="text-xs font-mono shrink-0" style={{ color: 'var(--io-text-secondary)', width: 56 }}>
        {rem}
      </code>
      <span className="text-xs shrink-0" style={{ color: 'var(--io-text-muted)', width: 36 }}>
        {px}
      </span>
      <span className="ml-auto text-xs font-mono shrink-0" style={{ color: 'var(--io-text-muted)' }}>
        {twKey}
      </span>
    </div>
  );
}

// ── Token data ────────────────────────────────────────────────────────────────

const SPACING_TOKENS = [
  { token: '--io-space-1',  rem: '0.25rem', px: '4px',  twKey: 'space-1'  },
  { token: '--io-space-2',  rem: '0.5rem',  px: '8px',  twKey: 'space-2'  },
  { token: '--io-space-3',  rem: '0.75rem', px: '12px', twKey: 'space-3'  },
  { token: '--io-space-4',  rem: '1rem',    px: '16px', twKey: 'space-4'  },
  { token: '--io-space-5',  rem: '1.25rem', px: '20px', twKey: 'space-5'  },
  { token: '--io-space-6',  rem: '1.5rem',  px: '24px', twKey: 'space-6'  },
  { token: '--io-space-8',  rem: '2rem',    px: '32px', twKey: 'space-8'  },
  { token: '--io-space-10', rem: '2.5rem',  px: '40px', twKey: 'space-10' },
  { token: '--io-space-12', rem: '3rem',    px: '48px', twKey: 'space-12' },
  { token: '--io-space-16', rem: '4rem',    px: '64px', twKey: 'space-16' },
  { token: '--io-space-20', rem: '5rem',    px: '80px', twKey: 'space-20' },
  { token: '--io-space-24', rem: '6rem',    px: '96px', twKey: 'space-24' },
] as const;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SpacingPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Spacing"
        description="A 4px base spatial scale that gives every component and layout a consistent rhythmic foundation."
        tabs={[]}
      />

      {/* ── 1. Introduction ───────────────────────────────────────── */}
      <section id="introduction" className="space-y-6">
        <SectionHeader
          title="Introduction"
          description="A 4px base spatial scale gives every component and layout a consistent rhythmic foundation."
        />
        <div className="space-y-4">
          <p className="text-base" style={{ color: 'var(--io-text-primary)', lineHeight: '1.7' }}>
            Spacing is the invisible structure of every interface. io Digital uses a{' '}
            <strong style={{ fontWeight: 600 }}>4px base unit</strong> — every spacing value is a whole
            multiple of 4px. This produces visual harmony across components, layouts, and white space without
            ad-hoc sizing decisions creeping in.
          </p>
          <p className="text-base" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}>
            The system is token-based: 12 named steps from{' '}
            <code style={{ fontSize: '0.875em' }}>--io-space-1</code> (4px) through{' '}
            <code style={{ fontSize: '0.875em' }}>--io-space-24</code> (96px). Components never use raw pixel
            values — they reference <code style={{ fontSize: '0.875em' }}>var(--io-space-*)</code> so the
            entire system can scale or adapt from a single source of truth.
          </p>
        </div>
      </section>

      {/* ── 2. Spacing scale ──────────────────────────────────────── */}
      <section id="spacing-scale" className="space-y-6">
        <SectionHeader
          title="Spacing scale"
          description="Twelve steps built on a 4px base unit — from micro padding to generous section breathing room."
        />
        <div className="space-y-2">
          {SPACING_TOKENS.map((t) => (
            <SpacingRow key={t.token} token={t.token} rem={t.rem} px={t.px} twKey={t.twKey} />
          ))}
        </div>
        <RuleCard label="Base unit">
          All values are whole multiples of 4px. This prevents fractional pixels and keeps vertical rhythm
          consistent across type sizes, components, and layouts. If you need a value not in the scale, round
          to the nearest multiple of 4 and propose a token addition.
        </RuleCard>
      </section>

      {/* ── 3. Application ────────────────────────────────────────── */}
      <section id="application" className="space-y-6">
        <SectionHeader
          title="Application"
          description="How spacing tokens map to common use cases — padding, gap, and section rhythm."
        />

        <SubsectionTitle>Component padding</SubsectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { token: '--io-space-2', px: '8px',  label: 'Compact',     note: 'Chips, badges, tight labels',  cssVar: 'var(--io-space-2)' },
            { token: '--io-space-4', px: '16px', label: 'Standard',    note: 'Buttons, inputs, nav items',   cssVar: 'var(--io-space-4)' },
            { token: '--io-space-6', px: '24px', label: 'Comfortable', note: 'Cards, panels, modals',        cssVar: 'var(--io-space-6)' },
          ].map(({ token, px, label, note, cssVar }) => (
            <div
              key={token}
              className="rounded-lg overflow-hidden"
              style={{ border: '1px solid var(--io-border)' }}
            >
              <div className="flex items-center justify-center" style={{ background: 'var(--io-bg-base)', padding: cssVar }}>
                <div
                  className="w-full rounded text-center text-xs font-semibold"
                  style={{
                    background: 'var(--io-accent-bg)',
                    color: 'var(--io-accent-text)',
                    padding: cssVar,
                    outline: '1px dashed var(--io-accent)',
                    outlineOffset: 2,
                  }}
                >
                  content
                </div>
              </div>
              <div
                className="px-4 py-3"
                style={{ borderTop: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>
                  {label}{' '}
                  <code className="text-xs font-mono" style={{ color: 'var(--io-text-muted)' }}>
                    {px}
                  </code>
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--io-text-secondary)' }}>
                  {note}
                </p>
                <code className="text-xs font-mono mt-1 block" style={{ color: 'var(--io-text-muted)' }}>
                  {token}
                </code>
              </div>
            </div>
          ))}
        </div>

        <SubsectionTitle>Layout rhythm</SubsectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RuleCard label="Component padding">
            Use <code style={{ fontSize: '0.85em' }}>--io-space-2</code> through{' '}
            <code style={{ fontSize: '0.85em' }}>--io-space-6</code> for internal component padding. Never
            exceed <code style={{ fontSize: '0.85em' }}>--io-space-8</code> (32px) inside a single component
            — beyond that, you are in layout territory.
          </RuleCard>
          <RuleCard label="Section gaps">
            Use <code style={{ fontSize: '0.85em' }}>--io-space-12</code> (48px) to{' '}
            <code style={{ fontSize: '0.85em' }}>--io-space-16</code> (64px) between page sections.{' '}
            <code style={{ fontSize: '0.85em' }}>space-y-16</code> is the standard page-level vertical rhythm
            used across all Storefront pages.
          </RuleCard>
          <RuleCard label="Stack gaps">
            Use <code style={{ fontSize: '0.85em' }}>--io-space-4</code> (16px) or{' '}
            <code style={{ fontSize: '0.85em' }}>--io-space-6</code> (24px) for gaps between related elements
            in a vertical stack — form fields, list items, card content rows.
          </RuleCard>
          <RuleCard label="Inline gaps">
            Use <code style={{ fontSize: '0.85em' }}>--io-space-2</code> (8px) to{' '}
            <code style={{ fontSize: '0.85em' }}>--io-space-4</code> (16px) for gap between inline elements —
            icon and label, button text and arrow, navigation items.
          </RuleCard>
        </div>
      </section>

      {/* ── 4. Code usage ─────────────────────────────────────────── */}
      <section id="code-usage" className="space-y-6">
        <SectionHeader
          title="Code usage"
          description="Reference the spacing tokens in your Angular or React project."
        />
        <CodeTabs
          tabs={[
            {
              label: 'Angular',
              code: `/* In your Angular component styles */
.card {
  padding: var(--io-space-6);     /* 24px — comfortable card padding */
}

.form-field + .form-field {
  margin-top: var(--io-space-4);  /* 16px — standard stack gap */
}

.page-section + .page-section {
  margin-top: var(--io-space-16); /* 64px — standard section rhythm */
}

.icon-label {
  display: flex;
  align-items: center;
  gap: var(--io-space-2);         /* 8px — inline icon/label gap */
}`,
            },
            {
              label: 'React',
              code: `import { space2, space4, space6, space16 } from '@io-digital/components/styles';

/* Use JS exports in CSS-in-JS or inline styles */
<div style={{ padding: space6, gap: space4 }}>
  Card content
</div>

/* Or reference via CSS custom properties */
<section style={{ marginTop: 'var(--io-space-16)' }}>
  Page section
</section>

<span style={{ display: 'flex', gap: space2 }}>
  <Icon /> Label
</span>`,
            },
          ]}
        />
      </section>

      {/* ── 5. Do's and don'ts ────────────────────────────────────── */}
      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do's and don'ts"
          description="Rules for consistent, predictable spacing across all product surfaces."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoOrDontCard type="do">
            Always reference spacing via <code style={{ fontSize: '0.85em' }}>var(--io-space-*)</code> tokens
            — never write raw <code style={{ fontSize: '0.85em' }}>px</code>,{' '}
            <code style={{ fontSize: '0.85em' }}>rem</code>, or{' '}
            <code style={{ fontSize: '0.85em' }}>em</code> values directly in component styles.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Don't invent spacing values outside the scale (e.g. 6px, 10px, 14px, 18px) — they break visual
            rhythm and make the system harder to audit.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Use the 4px base unit as a guide for any one-off value not covered by the scale — round to the
            nearest multiple of 4 and propose a token addition if the pattern recurs.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Don't mix spacing tokens from widely different tiers in the same component — pairing{' '}
            <code style={{ fontSize: '0.85em' }}>--io-space-2</code> padding with{' '}
            <code style={{ fontSize: '0.85em' }}>--io-space-12</code> gap creates jarring density contrast.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Use <code style={{ fontSize: '0.85em' }}>--io-space-16</code> (64px) as the standard vertical
            rhythm between major page sections — this is the value behind{' '}
            <code style={{ fontSize: '0.85em' }}>space-y-16</code> used across all Styles pages.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Don't use margin to space components within a layout — use gap or padding and rely on the parent
            flex/grid context to control distribution.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Apply spacing tokens consistently at every level: inline gaps{' '}
            <code style={{ fontSize: '0.85em' }}>space-2/4</code>, stack gaps{' '}
            <code style={{ fontSize: '0.85em' }}>space-4/6</code>, section gaps{' '}
            <code style={{ fontSize: '0.85em' }}>space-12/16</code>.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Don't use the same spacing token for conceptually different distances — component internal padding
            and page-level section gaps need different scale tiers to preserve visual hierarchy.
          </DoOrDontCard>
        </div>
      </section>
    </div>
  );
}
