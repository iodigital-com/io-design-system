import { type ReactNode } from 'react';

import type { Metadata } from 'next';
import Link from 'next/link';

import { CodeTabs } from '@/components/CodeTabs';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Elevation — io Design System',
  description: 'Five-level box-shadow elevation scale and three focus shadow tokens, with visual swatches and usage guidance.',
  openGraph: {
    title: 'Elevation — io Design System',
    description: 'Five-level box-shadow elevation scale and three focus shadow tokens, with visual swatches and usage guidance.',
    type: 'website',
  },
};

// ── Local helpers ─────────────────────────────────────────────────────────────

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
      className="flex items-start gap-4 px-5 py-3 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <code className="text-xs font-mono shrink-0 pt-0.5" style={{ color: 'var(--io-text-primary)', width: 220 }}>
        {token}
      </code>
      <code
        className="text-xs font-mono shrink-0 pt-0.5"
        style={{
          color: 'var(--io-accent-text)',
          width: 200,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={value}
      >
        {value}
      </code>
      <span className="text-xs" style={{ color: 'var(--io-text-secondary)' }}>
        {useCase}
      </span>
    </div>
  );
}

// ── Token data ────────────────────────────────────────────────────────────────

const ELEVATION_TOKENS = [
  {
    token: '--io-shadow-sm',
    level: 0,
    label: 'sm',
    value: '0px 1px 3px rgba(0,0,0,.1), 0px 1px 2px -1px rgba(0,0,0,.1)',
    useCase: 'Subtle lift — buttons, input fields, chips',
  },
  {
    token: '--io-shadow-md',
    level: 1,
    label: 'md',
    value: '0px 0px 10px rgba(0,0,0,.04), 0px 0px 25px rgba(0,0,0,.02)',
    useCase: 'Default raised surface — cards, dropdowns',
  },
  {
    token: '--io-shadow-lg',
    level: 2,
    label: 'lg',
    value: '0px 0px 24px rgba(36,36,36,.25)',
    useCase: 'Overlaid panels — navigation drawers, popovers',
  },
  {
    token: '--io-shadow-xl',
    level: 3,
    label: 'xl',
    value: '0px 10px 15px -3px rgba(0,0,0,.1), 0px 4px 6px -4px rgba(0,0,0,.1)',
    useCase: 'Modals and dialogs',
  },
  {
    token: '--io-shadow-2xl',
    level: 4,
    label: '2xl',
    value: '0px 25px 50px -12px rgba(0,0,0,.25)',
    useCase: 'Full-screen overlays and page-level sheets',
  },
] as const;

const FOCUS_SHADOW_TOKENS = [
  {
    token: '--io-shadow-focus-ring',
    value: '0 0 0 2px var(--io-focus-inner), 0 0 0 5px var(--io-focus-outer)',
    useCase: 'Keyboard focus indicator — 2px inner + 5px outer ring',
  },
  {
    token: '--io-shadow-focus-blue',
    value: '0 0 0 2px rgba(54,95,217,.7)',
    useCase: 'Alternative blue focus ring for specific contexts',
  },
  {
    token: '--io-shadow-focus-orange',
    value: '0 0 0 2px rgba(237,127,83,.7)',
    useCase: 'Alternative orange focus ring for specific contexts',
  },
] as const;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ElevationPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="Elevation"
        description="Token-based shadow scale for the io Digital component library. Five elevation levels plus focus ring shadows — all as CSS custom properties."
        tabs={[]}
      />

      {/* Introduction */}
      <section id="introduction" className="space-y-6">
        <SectionHeader
          title="Introduction"
          description="Elevation communicates depth, focus, and layering within a surface hierarchy."
        />
        <div className="space-y-4">
          <p className="text-base" style={{ color: 'var(--io-text-primary)', lineHeight: '1.7' }}>
            The io Digital elevation system uses five named shadow levels — from{' '}
            <code style={{ fontSize: '0.85em' }}>sm</code> for subtle button lifts to{' '}
            <code style={{ fontSize: '0.85em' }}>2xl</code> for full-screen overlays. Each level maps
            to a specific layer in the component hierarchy. Elevation is always applied via tokens — never
            with hardcoded box-shadow values.
          </p>
          <p className="text-base" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.7' }}>
            Focus ring shadows are separate tokens controlled by{' '}
            <code style={{ fontSize: '0.85em' }}>--io-focus-ring-active</code>. They are documented on the{' '}
            <Link href="/styles/focus" className="underline" style={{ color: 'var(--io-color-primary)' }}>Focus page</Link>.
          </p>
        </div>
      </section>

      {/* Visual scale */}
      <section id="scale" className="space-y-6">
        <SectionHeader
          title="Scale"
          description="All five elevation levels rendered using their respective CSS custom properties."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {ELEVATION_TOKENS.map(({ token, label, level }) => (
            <div key={token} className="flex flex-col items-center gap-4">
              <div
                className="w-full aspect-square rounded-lg"
                style={{
                  boxShadow: `var(${token})`,
                  background: 'var(--io-bg-raised)',
                  border: '1px solid var(--io-border)',
                }}
                aria-hidden="true"
              />
              <div className="text-center">
                <code className="text-xs block" style={{ color: 'var(--io-text-primary)' }}>
                  {label}
                </code>
                <span className="text-xs" style={{ color: 'var(--io-text-muted)' }}>
                  Level {level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Token reference */}
      <section id="tokens" className="space-y-6">
        <SectionHeader
          title="Token reference"
          description="Elevation tokens with resolved CSS values and recommended use cases."
        />
        <div className="space-y-2">
          {ELEVATION_TOKENS.map((row) => (
            <TokenRow key={row.token} token={row.token} value={row.value} useCase={row.useCase} />
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--io-text-muted)' }}>
            Focus ring shadows
          </p>
          {FOCUS_SHADOW_TOKENS.map((row) => (
            <TokenRow key={row.token} token={row.token} value={row.value} useCase={row.useCase} />
          ))}
        </div>
      </section>

      {/* Usage guidance */}
      <section id="usage" className="space-y-4">
        <SectionHeader
          title="Usage guidance"
          description="Principles that keep elevation decisions consistent and semantically meaningful."
        />
        <div className="space-y-3">
          <RuleCard label="Match shadow level to layer depth">
            Use <code style={{ fontSize: '0.85em' }}>--io-shadow-sm</code> for interactive controls (buttons,
            inputs), <code style={{ fontSize: '0.85em' }}>--io-shadow-md</code> for cards and dropdown surfaces,{' '}
            <code style={{ fontSize: '0.85em' }}>--io-shadow-lg</code> for drawers and panels, and{' '}
            <code style={{ fontSize: '0.85em' }}>--io-shadow-xl</code> for modal dialogs.
          </RuleCard>
          <RuleCard label="Never hardcode box-shadow values">
            Write <code style={{ fontSize: '0.85em' }}>box-shadow: var(--io-shadow-md)</code> in component CSS —
            not the resolved pixel value. Tokens allow the scale to evolve without touching individual components.
          </RuleCard>
          <RuleCard label="Do not stack shadows on a single element">
            Apply one elevation level per surface. Stacking multiple shadow tokens on the same element creates
            inconsistent depth perception across light and dark themes.
          </RuleCard>
          <RuleCard label="Reserve 2xl for full-screen overlays only">
            The <code style={{ fontSize: '0.85em' }}>--io-shadow-2xl</code> token is intended for page-level sheets
            and full-screen overlays. Using it on cards or dropdowns overstates their hierarchy.
          </RuleCard>
        </div>
      </section>

      {/* Code usage */}
      <section id="code-usage" className="space-y-6">
        <SectionHeader
          title="Code usage"
          description="Reference elevation tokens in Angular and React codebases using the same CSS custom property contract."
        />
        <CodeTabs
          tabs={[
            {
              label: 'Angular',
              language: 'css',
              code: `/* Angular component styles */
.card {
  box-shadow: var(--io-shadow-md);
}

.dropdown-menu {
  box-shadow: var(--io-shadow-lg);
}

.dialog-panel {
  box-shadow: var(--io-shadow-xl);
}`,
            },
            {
              label: 'React',
              language: 'typescript',
              code: `export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ boxShadow: 'var(--io-shadow-md)' }}>
      {children}
    </div>
  );
}

export function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ boxShadow: 'var(--io-shadow-xl)' }}>
      {children}
    </div>
  );
}`,
            },
            {
              label: 'HTML',
              language: 'html',
              code: `<!-- Global CSS or component stylesheet -->
<style>
  .card        { box-shadow: var(--io-shadow-md); }
  .dropdown    { box-shadow: var(--io-shadow-lg); }
  .dialog      { box-shadow: var(--io-shadow-xl); }
</style>

<div class="card">Card with md elevation</div>
<div class="dropdown">Dropdown with lg elevation</div>`,
            },
          ]}
        />
      </section>

      {/* Do and don't */}
      <section id="dos-and-donts" className="space-y-6">
        <SectionHeader
          title="Do and don't"
          description="Guardrails that keep elevation consistent and aligned with the io Digital visual language."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoOrDontCard type="do">
            Use <code style={{ fontSize: '0.85em' }}>var(--io-shadow-*)</code> tokens for all box-shadow
            declarations in component and product styles.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not hardcode shadow values such as{' '}
            <code style={{ fontSize: '0.85em' }}>box-shadow: 0 4px 6px rgba(0,0,0,0.1)</code> — tokens exist for
            every standard elevation level.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Match the shadow level to the semantic layer depth: controls → sm, cards → md, drawers → lg, modals → xl.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not apply <code style={{ fontSize: '0.85em' }}>--io-shadow-2xl</code> to cards or panels — it is
            reserved for full-screen overlay surfaces only.
          </DoOrDontCard>
          <DoOrDontCard type="do">
            Keep one elevation level per surface. Mixing multiple shadow tokens on the same element breaks depth
            consistency.
          </DoOrDontCard>
          <DoOrDontCard type="dont">
            Do not skip elevation levels (e.g. applying <code style={{ fontSize: '0.85em' }}>2xl</code> on a
            dropdown) — this overstates the component's position in the visual hierarchy.
          </DoOrDontCard>
        </div>
      </section>
    </div>
  );
}
