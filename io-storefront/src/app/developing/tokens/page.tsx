import { type ReactNode } from 'react';

import type { Metadata } from 'next';

import { CodeTabs } from '@/components/CodeTabs';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Token Usage — io Design System',
  description: 'How to consume io Design System CSS custom properties in your application — token categories, override patterns, and dark mode usage.',
  openGraph: {
    title: 'Token Usage — io Design System',
    description: 'CSS custom property consumption guide for the io Design System.',
    type: 'website',
  },
};

// ── Token category data ────────────────────────────────────────────────────────

const TOKEN_CATEGORIES = [
  {
    id: 'colour',
    title: 'Colour',
    description: 'Brand palette, semantic state colours, and surface/text semantic aliases.',
    examples: [
      { token: '--io-color-primary', usage: 'Primary brand actions, active states, links' },
      { token: '--io-color-error', usage: 'Validation failure, destructive actions' },
      { token: '--io-text-primary', usage: 'Body copy, headings, high-contrast labels' },
      { token: '--io-text-secondary', usage: 'Supporting text, descriptions, captions' },
      { token: '--io-bg-raised', usage: 'Elevated surfaces — cards, popovers, dropdowns' },
    ],
  },
  {
    id: 'typography',
    title: 'Typography',
    examples: [
      { token: '--io-font-primary', usage: 'Primary typeface: Manrope, sans-serif' },
      { token: '--io-text-xs', usage: 'Captions, labels, code snippets (12px)' },
      { token: '--io-text-sm', usage: 'Body secondary, helper text (14px)' },
      { token: '--io-text-base', usage: 'Body primary (16px)' },
      { token: '--io-heading-tracking-3', usage: 'Letter-spacing for large headings' },
    ],
    description: 'Typeface, type-scale, and letter-spacing tokens.',
  },
  {
    id: 'spacing',
    title: 'Spacing',
    description: 'A 4px base grid — 16 named steps from space-1 (4px) to space-40 (160px).',
    examples: [
      { token: '--io-space-1', usage: '4px — icon gap, tight list spacing' },
      { token: '--io-space-2', usage: '8px — compact padding, inline gap' },
      { token: '--io-space-4', usage: '16px — standard card padding, section gap' },
      { token: '--io-space-8', usage: '32px — section margin, modal padding' },
      { token: '--io-space-16', usage: '64px — page-level vertical rhythm' },
    ],
  },
  {
    id: 'motion',
    title: 'Motion',
    description: 'Three named timing tokens for transitions and animations.',
    examples: [
      { token: '--io-motion-fast', usage: '200ms ease — micro interactions, hover' },
      { token: '--io-motion-base', usage: '300ms ease — standard transitions' },
      { token: '--io-motion-slow', usage: '500ms ease — entrance/exit animations' },
    ],
  },
  {
    id: 'borders',
    title: 'Borders & Radius',
    description: 'Semantic border colour tokens and corner radius scale.',
    examples: [
      { token: '--io-border', usage: 'Default surface border' },
      { token: '--io-border-hover', usage: 'Hover state border' },
      { token: '--io-border-focus', usage: 'Focus state border (form fields)' },
      { token: '--io-border-radius-sm', usage: '9px — default component radius' },
      { token: '--io-border-radius-pill', usage: '9999px — pill buttons, tags' },
    ],
  },
  {
    id: 'focus',
    title: 'Focus',
    description: 'Double-ring focus indicator tokens for keyboard navigation.',
    examples: [
      { token: '--io-focus-inner', usage: '2px inner ring — #7D0034 dark red' },
      { token: '--io-focus-outer', usage: '5px outer halo — #FFE4EE light pink' },
      { token: '--io-shadow-focus-ring', usage: 'Composed box-shadow for the full double-ring' },
    ],
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

function TokenExample({ token, usage }: { token: string; usage: string }) {
  return (
    <div
      className="flex items-start gap-4 px-4 py-3 rounded-lg"
      style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
    >
      <code className="text-xs font-mono shrink-0 pt-0.5" style={{ color: 'var(--io-text-primary)', width: 240 }}>
        {token}
      </code>
      <span className="text-xs" style={{ color: 'var(--io-text-secondary)' }}>{usage}</span>
    </div>
  );
}

function CategoryCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold" style={{ color: 'var(--io-text-primary)' }}>{title}</h3>
        {description && (
          <p className="text-sm mt-1" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>{description}</p>
        )}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TokensPage() {
  const cssCode = `/* Reference any --io-* token in plain CSS */
.my-card {
  background: var(--io-bg-raised);
  border: 1px solid var(--io-border);
  border-radius: var(--io-border-radius-sm);
  padding: var(--io-space-4);
  color: var(--io-text-primary);
  transition: border-color var(--io-motion-fast);
}

.my-card:hover {
  border-color: var(--io-border-hover);
}`;

  const reactCode = `// Use inline styles for one-off token values
<div style={{
  background: 'var(--io-bg-raised)',
  border: '1px solid var(--io-border)',
  borderRadius: 'var(--io-border-radius-sm)',
  padding: 'var(--io-space-4)',
}}>
  ...
</div>

// Or Tailwind arbitrary values
<div className="bg-[var(--io-bg-raised)] border-[var(--io-border)] rounded-[var(--io-border-radius-sm)]">
  ...
</div>`;

  const angularCode = `<!-- Inline styles use var() directly -->
<div [style.background]="'var(--io-bg-raised)'"
     [style.border]="'1px solid var(--io-border)'">
  ...
</div>

/* Or in your component SCSS/CSS */
:host {
  .my-card {
    background: var(--io-bg-raised);
    border: 1px solid var(--io-border);
    border-radius: var(--io-border-radius-sm);
  }
}`;

  const overrideCode = `/* Override a token at any scope */

/* Page-level: override just on a specific page */
.my-feature {
  --io-color-primary: #005fcc;
}

/* Component-level: scope a token override to a shadow host */
io-button::part(button) {
  /* Note: only parts exposed by the component are accessible */
}

/* Global dark mode: tokens auto-resolve — no override needed.
   All --io-* tokens are pre-defined for both light and dark
   via data-theme="dark" on <html>. */`;

  return (
    <div className="space-y-16">
      <PageHeader
        title="Token Usage"
        description="io Design System exposes all design decisions as CSS custom properties (--io-*). This guide explains how to consume tokens in your application, organises them by category, and covers override patterns."
        tabs={[]}
      />

      {/* Introduction */}
      <section id="introduction" className="space-y-6">
        <SectionHeader
          title="Introduction"
          description="Every visual decision in io Design System is a token."
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          Tokens are CSS custom properties declared on <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>:root</code> in <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>io-components.css</code>. They cover colour, typography, spacing, motion, borders, elevation, and focus styles. Tokens cascade like any CSS variable — you can reference them in plain CSS, inline styles, Tailwind arbitrary values, or CSS Modules.
        </p>
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          Dark mode works automatically: when <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>data-theme="dark"</code> is set on <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>{"<html>"}</code>, semantic tokens resolve to their dark-mode values. Code that uses tokens requires no change.
        </p>
      </section>

      {/* Token categories */}
      <section id="categories" className="space-y-10">
        <SectionHeader
          title="Token categories"
          description="Quick reference for the most commonly used tokens in each group."
        />
        {TOKEN_CATEGORIES.map(({ id, title, description, examples }) => (
          <CategoryCard key={id} title={title} description={description}>
            {examples.map(({ token, usage }) => (
              <TokenExample key={token} token={token} usage={usage} />
            ))}
          </CategoryCard>
        ))}
      </section>

      {/* How to consume */}
      <section id="consuming" className="space-y-6">
        <SectionHeader
          title="How to consume tokens"
          description="Token references work identically in CSS, inline styles, and Tailwind arbitrary values."
        />
        <CodeTabs
          tabs={[
            { label: 'Angular', code: angularCode },
            { label: 'React', code: reactCode },
            { label: 'HTML', code: cssCode },
          ]}
        />
      </section>

      {/* Override patterns */}
      <section id="overrides" className="space-y-6">
        <SectionHeader
          title="Override patterns"
          description="Scope a token override to a specific element or page without touching the global root."
        />
        <pre
          className="text-xs font-mono leading-6 p-5 rounded-lg overflow-x-auto"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
        >
          {overrideCode}
        </pre>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Overrides follow standard CSS cascade rules. More specific selectors win. When overriding semantic tokens, ensure dark-mode variants are also updated if they exist.
        </p>
      </section>

      {/* Token naming rules */}
      <section id="naming" className="space-y-6">
        <SectionHeader
          title="Token naming conventions"
          description="Understanding the token hierarchy."
        />
        <ul className="space-y-3 text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>Primitive tokens</strong> — raw palette values (e.g. <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>--io-color-primary</code>). Use these only when a semantic alias does not exist.</li>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>Semantic tokens</strong> — context-aware aliases (e.g. <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>--io-text-primary</code>, <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>--io-bg-raised</code>). Prefer these — they change correctly in dark mode.</li>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>Component tokens</strong> — internal tokens used inside component Shadow DOM. Not part of the public consumer API and subject to change without notice.</li>
        </ul>
      </section>
    </div>
  );
}
