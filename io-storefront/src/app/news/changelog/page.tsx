'use client';

import { PageHeader } from '@/components/layout/PageHeader';

type ReleaseSection = 'Added' | 'Changed' | 'Fixed' | 'Deprecated';

type Release = {
  version: string;
  date: string;
  summary: string;
  sections: Partial<Record<ReleaseSection, string[]>>;
  breakingChanges?: string[];
  migrationNotes?: string[];
};

const RELEASES: Release[] = [
  {
    version: '0.3.0',
    date: '2026-01-14',
    summary: 'Documentation IA update for Help and News surfaces.',
    sections: {
      Added: [
        'Added a dedicated support page at /help/support with issue triage guidance.',
        'Added roadmap horizon cards with owner and expected outcome metadata.',
      ],
      Changed: [
        'Restructured changelog entries into Added, Changed, Fixed, and Deprecated sections.',
        'Merged Help introduction and FAQ content into a single /help entry point.',
      ],
      Fixed: [
        'Aligned Help sitemap entries with route availability to avoid dead links.',
      ],
    },
  },
  {
    version: '0.2.0',
    date: '2025-09-20',
    summary: 'Component coverage and token quality improvements.',
    sections: {
      Added: [
        'Added io-accordion with keyboard support and ARIA roles.',
      ],
      Changed: [
        'Improved io-button hover and focus state contrast.',
      ],
      Fixed: [
        'Fixed spacing token usage for card and list item templates.',
      ],
    },
  },
  {
    version: '0.1.0',
    date: '2025-08-12',
    summary: 'Initial public release of io Design System foundations.',
    sections: {
      Added: ['Initial release with foundational components and token system.'],
    },
    migrationNotes: ['No migration required for first release adoption.'],
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
              <span className="text-xs text-[var(--io-text-secondary)]">{release.date}</span>
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
