/**
 * parseChangelog
 * ==============
 * Pure function — parses a Keep-a-Changelog formatted markdown string into
 * a typed Release[] array. Designed to be called from a Next.js Server
 * Component at build time (output: 'export').
 *
 * Supported CHANGELOG.md conventions:
 *   ## [Version] — YYYY-MM-DD          (versioned release)
 *   ## [Unreleased]                     (unreleased block)
 *   ### Added — optional subtitle       (section, with optional subtitle)
 *   ### Changed / Fixed / Deprecated    (section types)
 *   - bullet item text                  (top-level bullets collected into section)
 *
 * Multiple ### Added subsections within a single release are merged into
 * a single "Added" section array.
 */

export type ReleaseSection = 'Added' | 'Changed' | 'Fixed' | 'Deprecated';

export type Release = {
  version: string;
  date?: string;
  summary: string;
  sections: Partial<Record<ReleaseSection, string[]>>;
  breakingChanges?: string[];
  migrationNotes?: string[];
};

const VERSION_RE = /^\[(?<version>[^\]]+)\](?:\s*[—–-]+\s*(?<date>\d{4}-\d{2}-\d{2}))?/;
const SECTION_RE = /^### (?<type>Added|Changed|Fixed|Deprecated)(?:\s*[—–-].*)?$/;
const BULLET_RE = /^[-*]\s+(.+)$/;

const SECTION_ORDER: ReleaseSection[] = ['Added', 'Changed', 'Fixed', 'Deprecated'];

export function parseChangelog(raw: string): Release[] {
  if (!raw.trim()) return [];

  const releases: Release[] = [];

  // Split on lines that start a new version block ("## ")
  const blocks = raw.split(/\n(?=## )/);

  for (const block of blocks) {
    const lines = block.split('\n');

    // Find the version header line
    const headerLine = lines.find((l) => l.startsWith('## '));
    if (!headerLine) continue;

    const versionMatch = VERSION_RE.exec(headerLine.replace(/^## /, ''));
    if (!versionMatch?.groups) continue;

    const { version, date } = versionMatch.groups;

    // Extract summary: the first non-empty, non-section, non-separator line after the header
    let summary = '';
    let pastHeader = false;
    for (const line of lines) {
      if (!pastHeader) {
        if (line.startsWith('## ')) {
          pastHeader = true;
        }
        continue;
      }
      const trimmed = line.trim();
      if (!trimmed || trimmed === '---' || trimmed.startsWith('### ') || trimmed.startsWith('**')) {
        continue;
      }
      if (!trimmed.startsWith('-') && !trimmed.startsWith('*') && !trimmed.startsWith('[')) {
        summary = trimmed;
        break;
      }
    }

    if (!summary) {
      summary =
        version === 'Unreleased'
          ? 'Changes queued for the next published release.'
          : `Release ${version}.`;
    }

    // Extract sections
    const sections: Partial<Record<ReleaseSection, string[]>> = {};
    const breakingChanges: string[] = [];

    let currentSection: ReleaseSection | null = null;
    let isBreaking = false;

    for (const line of lines) {
      const sectionMatch = SECTION_RE.exec(line.trim());
      if (sectionMatch?.groups) {
        currentSection = sectionMatch.groups.type as ReleaseSection;
        // Detect "Breaking" in the optional subtitle of the section header
        isBreaking = line.toLowerCase().includes('breaking');
        continue;
      }

      if (!currentSection) continue;

      const bulletMatch = BULLET_RE.exec(line.trim());
      if (bulletMatch) {
        // Strip markdown bold markers from bullet text (e.g. **`io-badge`** → io-badge)
        const text = bulletMatch[1].replace(/\*\*([^*]+)\*\*/g, '$1').trim();
        if (isBreaking) {
          breakingChanges.push(text);
        } else {
          if (!sections[currentSection]) sections[currentSection] = [];
          sections[currentSection]!.push(text);
        }
      }
    }

    const release: Release = {
      version,
      ...(date ? { date } : {}),
      summary,
      sections,
    };

    if (breakingChanges.length > 0) release.breakingChanges = breakingChanges;

    releases.push(release);
  }

  // Unreleased first, then by version string descending
  return releases.sort((a, b) => {
    if (a.version === 'Unreleased') return -1;
    if (b.version === 'Unreleased') return 1;
    return b.version.localeCompare(a.version, undefined, { numeric: true });
  });
}

export { SECTION_ORDER };
