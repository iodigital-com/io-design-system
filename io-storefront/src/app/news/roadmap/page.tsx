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
    title: 'io-icon-button component',
    summary: 'New dedicated icon-only button component to replace the iconOnly prop on io-button.',
    status: 'In progress',
    owner: 'Component engineering',
    outcome: 'Clean API separation between text buttons and icon controls; removes iconOnly deprecation from io-button.',
    horizon: 'Now',
  },
  {
    title: 'Component stability promotion',
    summary: 'Graduate components from beta to stable after passing the quality and usage bar.',
    status: 'In progress',
    owner: 'Design system product',
    outcome: 'Consumers can rely on stable semver guarantees for promoted components.',
    horizon: 'Now',
  },
  {
    title: 'Token documentation auto-generation',
    summary: 'Generate storefront token pages directly from docs/tokens-meta.json without manual authoring.',
    status: 'In progress',
    owner: 'Storefront engineering',
    outcome: 'Token docs stay in sync with component releases automatically.',
    horizon: 'Now',
  },
  {
    title: 'Dark mode polish pass',
    summary: 'Audit all 49 components for dark-mode token coverage and visual consistency.',
    status: 'Planned',
    owner: 'Component engineering',
    outcome: 'All components render correctly under data-theme="dark" and prefers-color-scheme: dark.',
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
    title: 'Storybook integration',
    summary: 'Evaluate publishing a Storybook alongside the storefront for interactive component sandboxing.',
    status: 'Exploring',
    owner: 'Storefront engineering',
    outcome: 'Give consumers an isolated environment to test props and events without integrating into a project.',
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
