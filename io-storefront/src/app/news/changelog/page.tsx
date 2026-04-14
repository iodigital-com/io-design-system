import { PageHeader } from '@/components/layout/PageHeader';

type ReleaseSection = 'Added' | 'Changed' | 'Fixed' | 'Deprecated';

type Release = {
  version: string;
  date?: string;
  summary: string;
  sections: Partial<Record<ReleaseSection, string[]>>;
  breakingChanges?: string[];
  migrationNotes?: string[];
};

const RELEASES: Release[] = [
  {
    version: 'Unreleased',
    summary: 'Changes queued for the next published release.',
    sections: {
      Changed: ['Breaking events API policy is locked for the io-prefixed custom event removal migration.'],
    },
    breakingChanges: [
      'Canonical event names migrate from io-prefixed names to native event names such as input, change, focus, blur, open, close, click, toggle, remove, and dismiss.',
      'No dual-emit alias layer is planned, so consumers must update listeners and wrapper props during the next major upgrade.',
    ],
    migrationNotes: [
      'Track the root CHANGELOG.md for final release timing and complete migration guidance once the next major version is cut.',
    ],
  },
  {
    version: '0.0.1',
    date: '2026-03-27',
    summary: 'Initial development baseline across components, wrappers, storefront, and monorepo tooling.',
    sections: {
      Added: [
        'Fifteen Stencil web components including button, modal, tabs, input, select, toast, tooltip, and supporting form controls.',
        'Auto-generated React, Vue, and Angular wrappers for the component library.',
        'Storefront documentation site with component tabs, design token pages, and framework integration guides.',
        'Monorepo quality gates covering governance, build, test, type-checking, and storefront build flows.',
      ],
    },
    migrationNotes: ['APIs are still pre-release and may change before 1.0.0.'],
  },
];

const SECTION_ORDER: ReleaseSection[] = ['Added', 'Changed', 'Fixed', 'Deprecated'];

export default function ChangelogPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Changelog"
        description="Track release changes, upgrades, and migration impact across io Design System versions."
        tabs={[]}
      />

      <div className="space-y-6">
        {RELEASES.map((release) => (
          <section
            key={release.version}
            className="rounded-lg border p-5"
            style={{ borderColor: 'var(--io-border)', background: 'var(--io-bg-raised)' }}
            aria-labelledby={`release-${release.version}`}
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 id={`release-${release.version}`} className="text-base font-semibold text-[var(--io-text-primary)]">
                v{release.version}
              </h2>
              <span className="text-xs text-[var(--io-text-secondary)]">{release.date ?? 'Pending release'}</span>
            </div>

            <p className="text-sm text-[var(--io-text-secondary)]">{release.summary}</p>

            <div className="mt-4 space-y-4">
              {SECTION_ORDER.map((section) => {
                const items = release.sections[section];
                if (!items || items.length === 0) {
                  return null;
                }

                return (
                  <section key={`${release.version}-${section}`} className="space-y-2" aria-label={`${section} changes`}>
                    <h3 className="text-sm font-semibold text-[var(--io-text-primary)]">{section}</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--io-text-secondary)]">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                );
              })}

              {release.breakingChanges && release.breakingChanges.length > 0 && (
                <section className="space-y-2" aria-label="Breaking changes">
                  <h3 className="text-sm font-semibold text-[var(--io-text-primary)]">Breaking changes</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--io-text-secondary)]">
                    {release.breakingChanges.map((change) => (
                      <li key={change}>{change}</li>
                    ))}
                  </ul>
                </section>
              )}

              {release.migrationNotes && release.migrationNotes.length > 0 && (
                <section className="space-y-2" aria-label="Migration notes">
                  <h3 className="text-sm font-semibold text-[var(--io-text-primary)]">Migration notes</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--io-text-secondary)]">
                    {release.migrationNotes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
