import { type ReactNode } from 'react';

import Link from 'next/link';

import type { Metadata } from 'next';

import { CodeTabs } from '@/components/CodeTabs';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Borders — io Design System',
  description: 'Semantic border colour tokens for default, hover, focus, and error states. Every border in the io Design System is expressed as a CSS custom property.',
  openGraph: {
    title: 'Borders — io Design System',
    description: 'Semantic border colour tokens for default, hover, focus, and error states.',
    type: 'website',
  },
};

// ── Token data ─────────────────────────────────────────────────────────────────

const BORDER_TOKENS = [
  {
    token: '--io-border',
    value: 'var(--io-color-grey-2)',
    useCase: 'Default — cards, inputs, dividers, table cells',
  },
  {
    token: '--io-border-hover',
    value: 'var(--io-color-grey-3)',
    useCase: 'Hover state — interactive surfaces that accept pointer hover',
  },
  {
    token: '--io-border-focus',
    value: 'var(--io-color-primary)',
    useCase: 'Focus state — input and form field focus indicator ring',
  },
  {
    token: '--io-border-error',
    value: 'var(--io-color-error)',
    useCase: 'Error state — invalid form fields and destructive feedback',
  },
] as const;

// ── Local helpers ──────────────────────────────────────────────────────────────

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

function TokenRow({ token, value, useCase }: { token: string; value: string; useCase: string }) {
  return (
    <div
      className="flex items-start gap-4 px-5 py-3 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <code className="text-xs font-mono shrink-0 pt-0.5" style={{ color: 'var(--io-text-primary)', width: 200 }}>
        {token}
      </code>
      <code
        className="text-xs font-mono shrink-0 pt-0.5"
        style={{ color: 'var(--io-accent-text)', width: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
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

function RuleCard({ type, children }: { type: 'do' | 'dont'; children: ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <span
        className="block w-1 shrink-0 rounded-full mt-0.5"
        style={{ background: type === 'do' ? 'var(--io-color-success)' : 'var(--io-color-error)', height: '1rem' }}
        aria-hidden="true"
      />
      <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
        {children}
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BordersPage() {
  const angularCode = `<!-- Default border -->
<div class="card" style="border: 1px solid var(--io-border);">...</div>

<!-- Hover state via CSS -->
<style>
  .card:hover { border-color: var(--io-border-hover); }
  .card:focus-within { border-color: var(--io-border-focus); }
  .card.error { border-color: var(--io-border-error); }
</style>`;

  const reactCode = `// Inline style — default border
<div style={{ border: '1px solid var(--io-border)' }}>...</div>

// CSS module or Tailwind arbitrary value
<div className="border-[var(--io-border)]">...</div>`;

  const htmlCode = `<!-- Default border -->
<div style="border: 1px solid var(--io-border);">...</div>

<!-- Error state -->
<input style="border: 1px solid var(--io-border-error);" />`;

  return (
    <div className="space-y-16">
      <PageHeader
        title="Borders"
        description="Four semantic border colour tokens covering default, hover, focus, and error states. All borders resolve to CSS custom properties that adapt automatically to light and dark themes."
        tabs={[]}
      />

      {/* Introduction */}
      <section id="introduction" className="space-y-6">
        <SectionHeader
          title="Introduction"
          description="io Design System expresses borders as semantic colour tokens, not width tokens. A 1px solid border is the universal stroke weight — the token controls which colour is applied per interaction state."
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          Borders are defined as CSS custom properties on <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>:root</code>. In dark mode, the token values resolve to adjusted palette entries automatically — consuming code requires no change. Border radius is a separate concern: see the{' '}
          <Link href="/styles/border-radius" className="underline" style={{ color: 'var(--io-color-primary)' }}>
            Border Radius
          </Link>{' '}
          page.
        </p>
      </section>

      {/* Scale */}
      <section id="scale" className="space-y-6">
        <SectionHeader
          title="Scale"
          description="Visual reference for each semantic border token in context."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BORDER_TOKENS.map(({ token, useCase }) => (
            <div
              key={token}
              className="rounded-lg p-5 space-y-3"
              style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)' }}
            >
              <div
                className="h-12 w-full rounded-md"
                style={{ border: `1px solid var(${token})`, background: 'var(--io-bg-surface)' }}
                aria-hidden="true"
              />
              <div className="space-y-1">
                <code className="block text-xs font-mono" style={{ color: 'var(--io-text-primary)' }}>{token}</code>
                <p className="text-xs" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.5' }}>{useCase.split(' — ')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Token reference */}
      <section id="tokens" className="space-y-4">
        <SectionHeader
          title="Token reference"
          description="Resolved values and intended usage for all four border tokens."
        />
        <div className="space-y-2">
          {BORDER_TOKENS.map((row) => (
            <TokenRow key={row.token} token={row.token} value={row.value} useCase={row.useCase} />
          ))}
        </div>
      </section>

      {/* Usage guidance */}
      <section id="usage" className="space-y-6">
        <SectionHeader
          title="Usage guidance"
          description="When to reach for each token."
        />
        <ul className="space-y-3 text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>--io-border</strong> — use on all static surfaces: cards, input fields at rest, table cells, and dividers.</li>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>--io-border-hover</strong> — apply on <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>:hover</code> for any interactive surface that accepts pointer input.</li>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>--io-border-focus</strong> — use on <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>:focus</code> or <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>:focus-within</code>. For keyboard focus rings, prefer the double-ring pattern from the <Link href="/styles/focus" className="underline" style={{ color: 'var(--io-color-primary)' }}>Focus</Link> page.</li>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>--io-border-error</strong> — only apply when validation has failed. Pair with an inline error message so colour is not the sole indicator.</li>
        </ul>
      </section>

      {/* Do and don't */}
      <section id="do-and-dont" className="space-y-4">
        <SectionHeader title="Do and don't" description="" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RuleCard type="do">Use <code className="text-xs font-mono">var(--io-border)</code> on all static surfaces. The token adapts to dark mode automatically.</RuleCard>
          <RuleCard type="dont">Do not hardcode hex or rgba border colours. Hardcoded values bypass dark mode and break semantic consistency.</RuleCard>
          <RuleCard type="do">Transition border-color on hover using <code className="text-xs font-mono">var(--io-border-hover)</code> to provide clear affordance without changing the layout.</RuleCard>
          <RuleCard type="dont">Do not use <code className="text-xs font-mono">var(--io-border-error)</code> as a general emphasis border — it carries a specific validation-failure meaning.</RuleCard>
        </div>
      </section>

      {/* Code usage */}
      <section id="code-usage" className="space-y-6">
        <SectionHeader
          title="Code usage"
          description="Applying border tokens in each supported framework."
        />
        <CodeTabs
          tabs={[
            { label: 'Angular', code: angularCode },
            { label: 'React', code: reactCode },
            { label: 'HTML', code: htmlCode },
          ]}
        />
      </section>
    </div>
  );
}
