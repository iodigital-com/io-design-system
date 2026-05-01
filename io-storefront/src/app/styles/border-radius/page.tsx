import { type ReactNode } from 'react';

import type { Metadata } from 'next';

import { CodeTabs } from '@/components/CodeTabs';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Border Radius — io Design System',
  description: 'Corner radius scale — 6 steps from xs (4px) to pill (9999px) with visual swatches and framework code examples.',
  openGraph: {
    title: 'Border Radius — io Design System',
    description: 'Corner radius scale — 6 steps from xs (4px) to pill (9999px) with visual swatches and framework code examples.',
    type: 'website',
  },
};

// ── Local helpers (same pattern as motion/page.tsx) ──────────────────────────

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

function RuleCard({ label, children }: { label: string; children: ReactNode }) {
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

function DoOrDontCard({ type, children }: { type: DoOrDont; children: ReactNode }) {
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

function TokenRow({ token, value, useCase }: { token: string; value: string; useCase: string }) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-3 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <code className="text-xs font-mono shrink-0" style={{ color: 'var(--io-text-primary)', width: 260 }}>
        {token}
      </code>
      <code className="text-xs font-mono shrink-0" style={{ color: 'var(--io-accent-text)', width: 80 }}>
        {value}
      </code>
      <span className="text-xs" style={{ color: 'var(--io-text-secondary)' }}>
        {useCase}
      </span>
    </div>
  );
}

// ── Token data ────────────────────────────────────────────────────────────────

const RADIUS_TOKENS = [
  { token: '--io-border-radius-xs',   value: '4px',    useCase: 'Tight container corners and compact chips' },
  { token: '--io-border-radius-sm',   value: '9px',    useCase: 'Default component radius — buttons, inputs, cards' },
  { token: '--io-border-radius-md',   value: '12px',   useCase: 'Modal surfaces and elevated panels' },
  { token: '--io-border-radius-lg',   value: '14px',   useCase: 'Larger card containers and drawer surfaces' },
  { token: '--io-border-radius-xl',   value: '24px',   useCase: 'Hero containers and promotional tiles' },
  { token: '--io-border-radius-pill', value: '9999px', useCase: 'Fully rounded pills — tags, badges, toggles' },
] as const;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BorderRadiusPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Border Radius"
        description="Token-based corner radius scale for the io Digital component library. Six steps from tight corners to fully rounded pills."
        tabs={[]}
      />

      {/* Introduction */}
      <section id="introduction" className="space-y-6">
        <SectionHeader
          title="Introduction"
          description="Consistent corner rounding through a token-first radius scale."
        />
        <div className="space-y-4">
          <p className="text-base" style={{ color: 'var(--io-text-primary)', lineHeight: '1.7' }}>
            The io Digital radius scale covers six discrete steps: from{' '}
            <code style={{ fontSize: '0.85em' }}>xs</code> (4 px) for compact chips through to{' '}
            <code style={{ fontSize: '0.85em' }}>pill</code> (9999 px) for fully circular badges and toggles.
            All corner radii in io components are derived from these six tokens — no arbitrary pixel values are permitted
            inside component CSS.
          </p>
          <p className="text-base" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}>
            The default component radius is{' '}
            <code style={{ fontSize: '0.85em' }}>--io-border-radius-sm</code> (9 px). Override individual components
            sparingly and only when a contextual reason exists — mixing radii within a single surface breaks visual
            coherence.
          </p>
        </div>
      </section>

      {/* Visual scale demo */}
      <section id="scale" className="space-y-6">
        <SectionHeader
          title="Scale"
          description="All six radius steps rendered using their respective CSS custom properties."
        />
        <div className="flex flex-wrap items-end gap-8">
          {RADIUS_TOKENS.map(({ token, value }) => (
            <div key={token} className="flex flex-col items-center gap-3">
              <div
                className="w-16 h-16"
                style={{
                  borderRadius: `var(${token})`,
                  background: 'var(--io-accent)',
                }}
                aria-hidden="true"
              />
              <code className="text-xs text-center" style={{ color: 'var(--io-text-muted)', maxWidth: 80 }}>
                {token.replace('--io-border-radius-', '')}
              </code>
              <span className="text-xs" style={{ color: 'var(--io-text-muted)' }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Token reference */}
      <section id="tokens" className="space-y-4">
        <SectionHeader
          title="Token reference"
          description="Full token name, resolved value, and recommended use case for each radius step."
        />
        <div className="space-y-2">
          {RADIUS_TOKENS.map((row) => (
            <TokenRow key={row.token} token={row.token} value={row.value} useCase={row.useCase} />
          ))}
        </div>
      </section>

      {/* Usage guidance */}
      <section id="usage" className="space-y-4">
        <SectionHeader
          title="Usage guidance"
          description="Principles that keep radius decisions consistent and auditable."
        />
        <div className="space-y-3">
          <RuleCard label="Use --io-border-radius-sm as the default">
            9 px is the standard radius for interactive components — buttons, inputs, selects, cards, and badges.
            Start here and only deviate when a clear contextual reason exists.
          </RuleCard>
          <RuleCard label="Reserve pill for toggles, tags, and badges">
            The fully rounded pill shape signals binary-selection or category-label affordance. Avoid applying it to
            form inputs or structural containers where a rectangular shape communicates better.
          </RuleCard>
          <RuleCard label="Always reference the token, never the pixel value">
            Write <code style={{ fontSize: '0.85em' }}>border-radius: var(--io-border-radius-sm)</code> in component
            CSS, not <code style={{ fontSize: '0.85em' }}>border-radius: 9px</code>. Tokens allow the scale to evolve
            without touching individual components.
          </RuleCard>
          <RuleCard label="Do not mix radii within a single surface">
            Using different radius steps on adjacent elements inside the same card or container creates visual tension.
            Keep all corners of a surface at the same step.
          </RuleCard>
        </div>
      </section>

      {/* Code usage */}
      <section id="code-usage" className="space-y-6">
        <SectionHeader
          title="Code usage"
          description="Reference radius tokens in Angular and React codebases using the same CSS custom property contract."
        />
        <CodeTabs
          tabs={[
            {
              label: 'Angular',
              language: 'css',
              code: `/* Angular component styles */
.card {
  border-radius: var(--io-border-radius-md);
}

.chip {
  border-radius: var(--io-border-radius-pill);
}

.dialog {
  border-radius: var(--io-border-radius-lg);
}`,
            },
            {
              label: 'React',
              language: 'typescript',
              code: `import { type ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return (
    <div style={{ borderRadius: 'var(--io-border-radius-md)' }}>
      {children}
    </div>
  );
}

export function Pill({ label }: { label: string }) {
  return (
    <span style={{ borderRadius: 'var(--io-border-radius-pill)' }}>
      {label}
    </span>
  );
}`,
            },
            {
              label: 'HTML',
              language: 'html',
              code: `<!-- Global CSS or component stylesheet -->
<style>
  .card    { border-radius: var(--io-border-radius-md);   }
  .chip    { border-radius: var(--io-border-radius-pill); }
  .dialog  { border-radius: var(--io-border-radius-lg);   }
</style>

<div class="card">Card with md radius</div>
<span class="chip">Filter chip</span>`,
            },
          ]}
        />
      </section>

      {/* Do and don't */}
      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do and don't"
          description="Guardrails that keep corner radius consistent and aligned with the io Digital design language."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoOrDontCard type="do">
            Use <code style={{ fontSize: '0.85em' }}>var(--io-border-radius-*)</code> tokens for all corner radii in
            component and product styles.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not hardcode pixel values such as <code style={{ fontSize: '0.85em' }}>border-radius: 8px</code> —
            tokens exist for every standard step in the scale.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Default to <code style={{ fontSize: '0.85em' }}>--io-border-radius-sm</code> (9 px) for interactive
            elements and surface containers unless a larger or smaller step is explicitly justified.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not apply the <code style={{ fontSize: '0.85em' }}>pill</code> radius to form inputs, modals, or
            structural layout containers — it is reserved for tag, badge, and toggle affordances.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Keep all corners of a single surface at the same radius step to maintain visual coherence.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not mix different radius steps (e.g. <code style={{ fontSize: '0.85em' }}>sm</code> on the top and{' '}
            <code style={{ fontSize: '0.85em' }}>xl</code> on the bottom) within the same card or container.
          </DoOrDontCard>
        </div>
      </section>
    </div>
  );
}
