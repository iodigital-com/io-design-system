import Link from 'next/link';

import type { Metadata } from 'next';

import { PageHeader } from '@/components/layout/PageHeader';
import { type ComponentStatus, getComponentItems } from '@/sitemap';

export const metadata: Metadata = {
  title: 'Component Status — io Design System',
  description: 'Maturity model and per-component stability matrix for all io Design System components — stable and beta classifications with promotion criteria.',
  openGraph: {
    title: 'Component Status — io Design System',
    description: 'Per-component stability matrix and promotion criteria for the io Design System.',
    type: 'website',
  },
};

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

function StatusPill({ status }: { status: ComponentStatus | undefined }) {
  const resolved = status ?? 'stable';

  const styles: Record<ComponentStatus, { bg: string; text: string; label: string }> = {
    stable: { bg: 'var(--io-color-success)', text: 'var(--io-color-white)', label: 'Stable' },
    beta: { bg: 'var(--io-color-warning)', text: 'var(--io-color-grey-6)', label: 'Beta' },
  };

  const { bg, text, label } = styles[resolved];

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: bg, color: text }}
    >
      {label}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ComponentStatusPage() {
  const components = getComponentItems();

  const stable = components.filter((c) => !c.status || c.status === 'stable');
  const beta = components.filter((c) => c.status === 'beta');

  return (
    <div className="space-y-16">
      <PageHeader
        title="Component Status"
        description="Every io Design System component carries a maturity status — stable or beta. Use this page to understand what each classification means and to check the current status of any component."
        tabs={[]}
      />

      {/* Status model */}
      <section id="status-model" className="space-y-6">
        <SectionHeader
          title="Status model"
          description="Two canonical statuses govern component maturity. The source of truth for all statuses is sitemap.ts."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              status: 'stable' as ComponentStatus,
              heading: 'Stable',
              body: 'The component API is finalised and safe to use in production. Accessibility, test coverage, and governance gates have all passed. Breaking changes require a major version bump.',
            },
            {
              status: 'beta' as ComponentStatus,
              heading: 'Beta',
              body: 'The component is functionally complete but the API may change in a minor release. Suitable for production adoption with awareness of upcoming adjustments.',
            },
          ].map(({ status, heading, body }) => (
            <div
              key={status}
              className="rounded-lg p-5 space-y-3"
              style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)' }}
            >
              <StatusPill status={status} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--io-text-primary)' }}>{heading}</h3>
              <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Component matrix */}
      <section id="matrix" className="space-y-6">
        <SectionHeader
          title="Component matrix"
          description={`${components.length} components — ${stable.length} stable, ${beta.length} beta.`}
        />
        <div className="space-y-2">
          {components.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="flex items-center gap-4 px-5 py-3 rounded-lg no-underline group"
              style={{ border: '1px solid var(--io-border)', background: 'var(--io-bg-raised)', textDecoration: 'none' }}
            >
              <code
                className="text-xs font-mono shrink-0"
                style={{ color: 'var(--io-text-primary)', width: 180 }}
              >
                {item.slug}
              </code>
              <div className="shrink-0" style={{ width: 80 }}>
                <StatusPill status={item.status} />
              </div>
              <span className="text-xs" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.5' }}>
                {item.description}
              </span>
              <span
                className="ml-auto shrink-0 text-sm transition-transform group-hover:translate-x-1"
                style={{ color: 'var(--io-accent)' }}
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotion criteria */}
      <section id="promotion" className="space-y-6">
        <SectionHeader
          title="Promotion criteria"
          description="A beta component may be promoted to stable when all of the following are true."
        />
        <ul className="space-y-3 text-sm leading-7" style={{ color: 'var(--io-text-secondary)' }}>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>Test baseline complete</strong> — render, event behaviour, and disabled-state coverage in Vitest.</li>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>API contract tested</strong> — all props and events explicitly covered by assertions.</li>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>No unresolved a11y blockers</strong> — WCAG AA conformance verified; no open high-impact accessibility issues.</li>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>Quality gates pass</strong> — <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>governance:check</code>, <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>events:guard</code>, <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>build</code>, <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>test</code>, <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>type-check</code>, and <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>build:storefront</code> all succeed.</li>
          <li><strong style={{ color: 'var(--io-text-primary)' }}>Recommendation documented</strong> — a PR or issue includes evidence and a written promotion recommendation.</li>
        </ul>
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Status changes are applied exclusively in <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>io-storefront/src/sitemap.ts</code>. See the{' '}
          <Link href="/news/changelog" className="underline" style={{ color: 'var(--io-color-primary)' }}>
            Changelog
          </Link>{' '}
          for a history of status changes.
        </p>
      </section>
    </div>
  );
}
