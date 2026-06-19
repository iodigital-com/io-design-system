import { describe, it, expect } from 'vitest';
import { parseChangelog } from './parseChangelog';

const FIXTURE_MINIMAL = `
## [Unreleased]

### Added

- New feature one
- New feature two

---

## [1.0.0] — 2026-01-15

First stable release.

### Added

- Initial component library

### Changed

- Migrated from v0 API

### Fixed

- Fixed critical rendering bug
`;

const FIXTURE_BREAKING = `
## [2.0.0] — 2026-03-01

Major version with breaking changes.

### Changed — Breaking API changes (MAJOR)

- Removed deprecated io-prefixed event names
- Changed button variant prop from type to variant

### Added

- New dark mode tokens
`;

describe('parseChangelog', () => {
  it('returns empty array for empty input', () => {
    expect(parseChangelog('')).toEqual([]);
    expect(parseChangelog('   ')).toEqual([]);
  });

  it('parses [Unreleased] block without a date', () => {
    const releases = parseChangelog(FIXTURE_MINIMAL);
    const unreleased = releases.find((r) => r.version === 'Unreleased');

    expect(unreleased).toBeDefined();
    expect(unreleased?.date).toBeUndefined();
    expect(unreleased?.summary).toBe('Changes queued for the next published release.');
    expect(unreleased?.sections.Added).toEqual(['New feature one', 'New feature two']);
  });

  it('parses a versioned block with date and summary', () => {
    const releases = parseChangelog(FIXTURE_MINIMAL);
    const v1 = releases.find((r) => r.version === '1.0.0');

    expect(v1).toBeDefined();
    expect(v1?.date).toBe('2026-01-15');
    expect(v1?.summary).toBe('First stable release.');
    expect(v1?.sections.Added).toEqual(['Initial component library']);
    expect(v1?.sections.Changed).toEqual(['Migrated from v0 API']);
    expect(v1?.sections.Fixed).toEqual(['Fixed critical rendering bug']);
  });

  it('places Unreleased first regardless of order', () => {
    const releases = parseChangelog(FIXTURE_MINIMAL);
    expect(releases[0].version).toBe('Unreleased');
  });

  it('extracts breakingChanges from sections with "Breaking" in subtitle', () => {
    const releases = parseChangelog(FIXTURE_BREAKING);
    const v2 = releases.find((r) => r.version === '2.0.0');

    expect(v2).toBeDefined();
    expect(v2?.breakingChanges).toContain('Removed deprecated io-prefixed event names');
    expect(v2?.breakingChanges).toContain('Changed button variant prop from type to variant');
    // Breaking items should NOT appear in sections.Changed
    expect(v2?.sections.Changed).toBeUndefined();
  });

  it('collects normal Added section items alongside breaking Changed', () => {
    const releases = parseChangelog(FIXTURE_BREAKING);
    const v2 = releases.find((r) => r.version === '2.0.0');

    expect(v2?.sections.Added).toEqual(['New dark mode tokens']);
  });

  it('strips markdown bold markers from bullet text', () => {
    const raw = `
## [0.5.0]

### Added

- **\`io-badge\`** — Status label component
- **io-button** — Primary action component
`;
    const releases = parseChangelog(raw);
    expect(releases[0].sections.Added).toEqual([
      '`io-badge` — Status label component',
      'io-button — Primary action component',
    ]);
  });

  it('merges multiple ### Added subsections into one array', () => {
    const raw = `
## [0.0.1]

### Added — Core components

- io-button
- io-badge

### Added — Framework wrappers

- components-react
`;
    const releases = parseChangelog(raw);
    expect(releases[0].sections.Added).toEqual(['io-button', 'io-badge', 'components-react']);
  });

  it('handles malformed input without throwing', () => {
    expect(() => parseChangelog('not a changelog at all')).not.toThrow();
    expect(() => parseChangelog('## [no closing bracket')).not.toThrow();
  });

  it('returns a release with empty sections when no ### headers are present', () => {
    const raw = `## [1.0.1] — 2026-05-01\n\nHotfix release.\n`;
    const result = parseChangelog(raw);
    expect(result).toHaveLength(1);
    expect(result[0].version).toBe('1.0.1');
    expect(result[0].sections).toEqual({});
  });

  it('preserves duplicate bullet items as separate entries', () => {
    const raw = `## [1.0.0] — 2026-01-01\n\nRelease.\n\n### Added\n\n- Fix A\n- Fix A\n`;
    const result = parseChangelog(raw);
    expect(result[0].sections['Added']).toHaveLength(2);
    expect(result[0].sections['Added']).toEqual(['Fix A', 'Fix A']);
  });

  it('captures standalone bold heading lines as sub-section entries', () => {
    const raw = `
## [3.0.0] — 2026-03-01

Release with bold heading.

### Added

**15 Web Components:**

- io-button
`;
    const releases = parseChangelog(raw);
    const v3 = releases.find((r) => r.version === '3.0.0');
    expect(v3?.sections.Added).toContain('15 Web Components:');
    expect(v3?.sections.Added).toContain('io-button');
  });

  it('sorts multiple versioned releases descending when no Unreleased entry exists', () => {
    const raw = `
## [1.0.0] — 2026-01-01

First release.

### Added

- io-button

## [2.0.0] — 2026-02-01

Second release.

### Added

- io-badge
`;
    const releases = parseChangelog(raw);
    expect(releases[0].version).toBe('2.0.0');
    expect(releases[1].version).toBe('1.0.0');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Changesets format (auto-generated by @changesets/cli — no brackets, no date)
// ─────────────────────────────────────────────────────────────────────────────

const FIXTURE_CHANGESETS = `# @iodigital-com/components

## 1.5.0

### Minor Changes

- 266b813: feat(io-icon): add 52 new icons
- 15955c9: feat(io-inline-notification): add actionLabel prop

## 1.4.1

### Patch Changes

- f1c0fb4: fix(io-button): reflect hideLabel prop

## 1.3.0

### Minor Changes

- a94b542: feat(io-breadcrumb): add label prop

### Patch Changes

- d665b6d: fix(io-button-group): compact border-radius
`;

describe('parseChangelog — changesets format', () => {
  it('parses bare semver version headers (no brackets)', () => {
    const releases = parseChangelog(FIXTURE_CHANGESETS);
    expect(releases.map((r) => r.version)).toContain('1.5.0');
    expect(releases.map((r) => r.version)).toContain('1.4.1');
    expect(releases.map((r) => r.version)).toContain('1.3.0');
  });

  it('maps Minor Changes → Added section', () => {
    const releases = parseChangelog(FIXTURE_CHANGESETS);
    const v150 = releases.find((r) => r.version === '1.5.0');
    expect(v150?.sections.Added).toBeDefined();
    expect(v150?.sections.Added).toHaveLength(2);
  });

  it('maps Patch Changes → Fixed section', () => {
    const releases = parseChangelog(FIXTURE_CHANGESETS);
    const v141 = releases.find((r) => r.version === '1.4.1');
    expect(v141?.sections.Fixed).toBeDefined();
    expect(v141?.sections.Fixed).toHaveLength(1);
  });

  it('strips changesets commit-hash prefix from bullets', () => {
    const releases = parseChangelog(FIXTURE_CHANGESETS);
    const v150 = releases.find((r) => r.version === '1.5.0');
    expect(v150?.sections.Added?.[0]).toBe('feat(io-icon): add 52 new icons');
    expect(v150?.sections.Added?.[1]).toBe('feat(io-inline-notification): add actionLabel prop');
  });

  it('merges Minor + Patch sections across same release', () => {
    const releases = parseChangelog(FIXTURE_CHANGESETS);
    const v130 = releases.find((r) => r.version === '1.3.0');
    expect(v130?.sections.Added).toHaveLength(1);
    expect(v130?.sections.Fixed).toHaveLength(1);
  });

  it('sorts changesets versions descending', () => {
    const releases = parseChangelog(FIXTURE_CHANGESETS);
    const versions = releases.map((r) => r.version);
    expect(versions.indexOf('1.5.0')).toBeLessThan(versions.indexOf('1.4.1'));
    expect(versions.indexOf('1.4.1')).toBeLessThan(versions.indexOf('1.3.0'));
  });

  it('handles package title line without creating phantom release', () => {
    const releases = parseChangelog(FIXTURE_CHANGESETS);
    expect(releases.every((r) => r.version && r.version !== '@iodigital-com/components')).toBe(true);
  });

  it('parses full commit hash (40 chars) prefix', () => {
    const raw = `## 1.0.0\n\n### Minor Changes\n\n- ${'a'.repeat(40)}: feat(io-button): add size xl\n`;
    const releases = parseChangelog(raw);
    expect(releases[0].sections.Added?.[0]).toBe('feat(io-button): add size xl');
  });
});
