// Server Component — must NOT have 'use client'. Called at Next.js build time
// (output: 'export') via fs.readFileSync so CHANGELOG.md is read once and
// embedded into the static HTML. Do not add 'use client' to this file.

import fs from 'node:fs';
import path from 'node:path';

import { PageHeader } from '@/components/layout/PageHeader';
import { parseChangelog, SECTION_ORDER } from '@/utils/parseChangelog';

function getChangelog() {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), '..', 'CHANGELOG.md'),
      'utf-8',
    );
    return parseChangelog(raw);
  } catch (err) {
    console.error('[changelog] Failed to read CHANGELOG.md:', err);
    return [];
  }
}

export default function ChangelogPage() {
  const releases = getChangelog();

  return (
    <div className="space-y-10">
      <PageHeader
        title="Changelog"
        description="Track release changes, upgrades, and migration impact across io Design System versions."
        tabs={[]}
      />

      {releases.length === 0 && (
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)' }}>
          Changelog could not be loaded — check the build log for details.
        </p>
      )}

      <div className="space-y-6">
        {releases.map((release) => (
          <section
            key={release.version}
            className="rounded-lg border p-5"
            style={{ borderColor: 'var(--io-border)', background: 'var(--io-bg-raised)' }}
            aria-labelledby={`release-${release.version.replace(/[^a-zA-Z0-9-_.]/g, '-')}`}
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 id={`release-${release.version.replace(/[^a-zA-Z0-9-_.]/g, '-')}`} className="text-base font-semibold text-[var(--io-text-primary)]">
                {release.version === 'Unreleased' ? 'Unreleased' : `v${release.version}`}
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
                      {items.map((item, i) => (
                        <li key={`${item}-${i}`}>{item}</li>
                      ))}
                    </ul>
                  </section>
                );
              })}

              {release.breakingChanges && release.breakingChanges.length > 0 && (
                <section key="breaking" className="space-y-2" aria-label="Breaking changes">
                  <h3 className="text-sm font-semibold text-[var(--io-text-primary)]">Breaking changes</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--io-text-secondary)]">
                    {release.breakingChanges.map((change, i) => (
                      <li key={`${change}-${i}`}>{change}</li>
                    ))}
                  </ul>
                </section>
              )}

              {release.migrationNotes && release.migrationNotes.length > 0 && (
                <section className="space-y-2" aria-label="Migration notes">
                  <h3 className="text-sm font-semibold text-[var(--io-text-primary)]">Migration notes</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--io-text-secondary)]">
                    {release.migrationNotes.map((note, i) => (
                      <li key={`${note}-${i}`}>{note}</li>
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
