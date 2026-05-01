import { type ReactNode } from 'react';

import type { Metadata } from 'next';

import { CodeTabs } from '@/components/CodeTabs';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Icons — io Design System',
  description: 'Icon usage guidance for io Design System — size recommendations, accessibility patterns, and integration with io components.',
  openGraph: {
    title: 'Icons — io Design System',
    description: 'Icon size recommendations, accessibility patterns, and integration with io components.',
    type: 'website',
  },
};

// ── Token data ─────────────────────────────────────────────────────────────────

const ICON_SIZES = [
  { size: '16px', label: 'xs', useCase: 'Inline with text (body copy), badges, dense UI' },
  { size: '20px', label: 'sm', useCase: 'Navigation items, compact list rows, input affixes' },
  { size: '24px', label: 'md', useCase: 'Default — action buttons, section headers' },
  { size: '32px', label: 'lg', useCase: 'Feature callouts, empty states, onboarding illustrations' },
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

export default function IconsPage() {
  const angularCode = `<!-- Decorative icon — hidden from screen readers -->
<svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24">
  <path d="..." />
</svg>

<!-- Meaningful icon with accessible label -->
<button aria-label="Delete item">
  <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24">
    <path d="..." />
  </svg>
</button>`;

  const reactCode = `{/* Decorative icon */}
<svg aria-hidden="true" focusable={false} width={24} height={24} viewBox="0 0 24 24">
  <path d="..." />
</svg>

{/* Meaningful icon — label on the button, not the SVG */}
<button aria-label="Delete item">
  <svg aria-hidden="true" focusable={false} width={24} height={24} viewBox="0 0 24 24">
    <path d="..." />
  </svg>
</button>`;

  const htmlCode = `<!-- Decorative icon -->
<svg aria-hidden="true" focusable="false" width="24" height="24">
  <path d="..." />
</svg>

<!-- Standalone icon button -->
<button aria-label="Delete item">
  <svg aria-hidden="true" focusable="false" width="24" height="24">
    <path d="..." />
  </svg>
</button>`;

  return (
    <div className="space-y-16">
      <PageHeader
        title="Icons"
        description="io Design System does not ship a built-in icon set. This page defines size recommendations, accessibility requirements, and integration patterns for icons used alongside io components."
        tabs={[]}
      />

      {/* Introduction */}
      <section id="introduction" className="space-y-6">
        <SectionHeader
          title="Introduction"
          description="Bring your own icon library — the design system is intentionally icon-agnostic."
        />
        <p className="text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          io components render internal icons (status indicators, arrow glyphs, validation marks) as inline SVG. For product icons in your own UI, any SVG-based icon library is compatible — Heroicons, Phosphor Icons, and Lucide are all commonly used alongside io components. Size and colour alignment is what matters.
        </p>
      </section>

      {/* Sizes */}
      <section id="sizes" className="space-y-6">
        <SectionHeader
          title="Recommended sizes"
          description="Four canonical sizes align with the io spacing scale and component anatomy."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ICON_SIZES.map(({ size, label, useCase }) => (
            <div
              key={size}
              className="rounded-lg p-5 space-y-3"
              style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
            >
              <div className="flex items-center justify-center" style={{ height: 48 }} aria-hidden="true">
                <svg
                  width={parseInt(size)}
                  height={parseInt(size)}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  style={{ color: 'var(--io-color-primary)' }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M9 12h6M12 9v6" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>{size}</span>
                  <code className="text-xs font-mono" style={{ color: 'var(--io-text-muted)' }}>{label}</code>
                </div>
                <p className="text-xs" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.5' }}>{useCase}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Colour */}
      <section id="colour" className="space-y-6">
        <SectionHeader
          title="Colour"
          description="Icons should inherit colour from their context rather than receive explicit fill values."
        />
        <ul className="space-y-3 text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          <li>Use <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>currentColor</code> as the SVG <code className="text-xs font-mono">stroke</code> or <code className="text-xs font-mono">fill</code> so the icon inherits the parent element's text colour automatically.</li>
          <li>For primary actions, set the parent colour to <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>var(--io-color-primary)</code>. For secondary or muted icons, use <code className="text-xs font-mono">var(--io-text-muted)</code>.</li>
          <li>Status icons (success, error, warning, info) should use <code className="text-xs font-mono">var(--io-color-success)</code>, <code className="text-xs font-mono">var(--io-color-error)</code>, <code className="text-xs font-mono">var(--io-color-warning)</code>, and <code className="text-xs font-mono">var(--io-color-orange)</code> respectively.</li>
        </ul>
      </section>

      {/* Accessibility */}
      <section id="accessibility" className="space-y-6">
        <SectionHeader
          title="Accessibility"
          description="Every icon must be either hidden from assistive technology or given a meaningful label."
        />
        <ul className="space-y-3 text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>Decorative icons</strong> — add <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>aria-hidden="true"</code> and <code className="text-xs font-mono">focusable="false"</code> so screen readers and keyboard navigation skip them.</li>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>Meaningful icons</strong> (icon-only buttons) — add <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>aria-label</code> to the <em>interactive element</em>, not the SVG itself. Keep the SVG <code className="text-xs font-mono">aria-hidden</code>.</li>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>Minimum touch target</strong> — icon-only interactive controls must meet the <code className="text-xs font-mono">var(--io-touch-target-min)</code> (44px) touch target regardless of the icon's visual size.</li>
        </ul>
      </section>

      {/* Do and don't */}
      <section id="do-and-dont" className="space-y-4">
        <SectionHeader title="Do and don't" description="" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RuleCard type="do">Use <code className="text-xs font-mono">currentColor</code> on SVG stroke/fill so icons inherit theme-aware colour automatically.</RuleCard>
          <RuleCard type="dont">Do not hardcode icon colours. Hardcoded values do not adapt to dark mode or disabled states.</RuleCard>
          <RuleCard type="do">Add <code className="text-xs font-mono">aria-hidden="true"</code> to decorative icons and an <code className="text-xs font-mono">aria-label</code> on the parent interactive element for meaningful icons.</RuleCard>
          <RuleCard type="dont">Do not rely on colour alone to communicate icon meaning — pair status icons with a text label or tooltip.</RuleCard>
        </div>
      </section>

      {/* Code usage */}
      <section id="code-usage" className="space-y-6">
        <SectionHeader
          title="Code usage"
          description="Accessible SVG icon patterns across frameworks."
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
