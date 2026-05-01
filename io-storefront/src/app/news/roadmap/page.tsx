import type { Metadata } from 'next';

import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'Roadmap — io Design System',
  description: 'Planned features, component additions, and infrastructure work for upcoming io Design System waves.',
  openGraph: {
    title: 'Roadmap — io Design System',
    description: 'Planned features, component additions, and infrastructure work for upcoming io Design System waves.',
    type: 'website',
  },
};

type RoadmapStatus = 'In progress' | 'Planned' | 'Exploring';
type RoadmapHorizon = 'Now' | 'Next' | 'Later';

type RoadmapItem = {
  title: string;
  summary: string;
  status: RoadmapStatus;
  owner: string;
  outcome: string;
  horizon: RoadmapHorizon;
};

const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    title: 'Support IA consolidation',
    summary: 'Unify Help and FAQ entry points and add explicit support guidance routes.',
    status: 'In progress',
    owner: 'Storefront docs',
    outcome: 'Reduce dead-end support navigation and improve first-attempt task completion.',
    horizon: 'Now',
  },
  {
    title: 'Release communication upgrade',
    summary: 'Restructure changelog entries into consistent release sections with migration guidance.',
    status: 'In progress',
    owner: 'Storefront docs',
    outcome: 'Lower upgrade ambiguity for component consumers.',
    horizon: 'Now',
  },
  {
    title: 'Roadmap confidence model',
    summary: 'Document priorities as Now, Next, Later with clear ownership and expected outcomes.',
    status: 'In progress',
    owner: 'Design system product',
    outcome: 'Make planning intent more actionable for product and engineering teams.',
    horizon: 'Now',
  },
  {
    title: 'Status-page editorial primitives',
    summary: 'Create reusable News and Help section patterns to reduce page-level duplication.',
    status: 'Planned',
    owner: 'Storefront engineering',
    outcome: 'Improve consistency and cut maintenance overhead for docs routes.',
    horizon: 'Next',
  },
  {
    title: 'Route integrity checks',
    summary: 'Add automated checks that sitemap links map to valid routes or intentional fallbacks.',
    status: 'Planned',
    owner: 'Developer experience',
    outcome: 'Prevent regressions where docs links lead to broken routes.',
    horizon: 'Next',
  },
  {
    title: 'News content sourcing',
    summary: 'Evaluate deriving roadmap and changelog content from source artifacts with typed schemas.',
    status: 'Exploring',
    owner: 'Storefront engineering',
    outcome: 'Reduce manual drift between repo updates and storefront documentation.',
    horizon: 'Later',
  },
];

const HORIZONS: RoadmapHorizon[] = ['Now', 'Next', 'Later'];

const STATUS_STYLES: Record<RoadmapStatus, { bg: string; text: string }> = {
  'In progress': {
    bg: 'var(--io-color-primary-bg)',
    text: 'var(--io-color-primary)',
  },
  Planned: {
    bg: 'var(--io-bg-hover)',
    text: 'var(--io-text-primary)',
  },
  Exploring: {
    bg: 'var(--io-bg-surface)',
    text: 'var(--io-text-secondary)',
  },
};

export default function RoadmapPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Roadmap"
        description="Current priorities and upcoming work across the io Design System storefront and documentation surfaces."
        tabs={[]}
      />

      <p className="text-sm leading-6 text-[var(--io-text-secondary)]">
        Horizons represent delivery confidence. <strong className="text-[var(--io-text-primary)]">Now</strong> items
        are actively prioritized, <strong className="text-[var(--io-text-primary)]">Next</strong> items are queued
        behind current delivery, and <strong className="text-[var(--io-text-primary)]">Later</strong> items are under
        validation and discovery.
      </p>

      {HORIZONS.map((horizon) => {
        const items = ROADMAP_ITEMS.filter((item) => item.horizon === horizon);

        return (
          <section key={horizon} className="space-y-4" aria-labelledby={`roadmap-${horizon.toLowerCase()}`}>
            <h2 id={`roadmap-${horizon.toLowerCase()}`} className="text-xl font-semibold text-[var(--io-text-primary)]">
              {horizon}
            </h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => {
                const style = STATUS_STYLES[item.status];

                return (
                  <li
                    key={item.title}
                    className="rounded-lg border p-5 space-y-3"
                    style={{
                      borderColor: 'var(--io-border)',
                      background: 'var(--io-bg-raised)',
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold text-[var(--io-text-primary)]">{item.title}</h3>
                      <span
                        className="rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-wide"
                        style={{ background: style.bg, color: style.text }}
                      >
                        {item.status}
                      </span>
                    </div>

                    <p className="text-sm text-[var(--io-text-secondary)]">{item.summary}</p>

                    <dl className="space-y-1 text-xs">
                      <div className="flex gap-1.5">
                        <dt className="font-semibold text-[var(--io-text-primary)]">Owner:</dt>
                        <dd className="text-[var(--io-text-secondary)]">{item.owner}</dd>
                      </div>
                      <div className="flex gap-1.5">
                        <dt className="font-semibold text-[var(--io-text-primary)]">Expected outcome:</dt>
                        <dd className="text-[var(--io-text-secondary)]">{item.outcome}</dd>
                      </div>
                    </dl>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
