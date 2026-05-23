import { describe, it, expect } from 'vitest';

import {
  ALL_TOKENS,
  CATEGORY_LABELS,
  TOKEN_CATEGORIES,
  filterTokens,
  isColorToken,
  type TokenCategory,
  type TokenEntry,
} from './token-explorer';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeToken(
  cssVar: string,
  value: string,
  category: TokenCategory,
): TokenEntry {
  return { name: cssVar.replace(/^--io-/, ''), cssVar, value, category };
}

// ── ALL_TOKENS shape ──────────────────────────────────────────────────────────

describe('ALL_TOKENS', () => {
  it('is non-empty', () => {
    expect(ALL_TOKENS.length).toBeGreaterThan(0);
  });

  it('every entry has a cssVar starting with --io-', () => {
    for (const token of ALL_TOKENS) {
      expect(token.cssVar).toMatch(/^--io-/);
    }
  });

  it('every entry has a non-empty name derived from cssVar', () => {
    for (const token of ALL_TOKENS) {
      expect(token.name).toBeTruthy();
      expect(token.name).not.toMatch(/^--/);
    }
  });

  it('every entry has a non-empty value', () => {
    for (const token of ALL_TOKENS) {
      expect(token.value).toBeTruthy();
    }
  });

  it('contains tokens from each category', () => {
    const categories = new Set(ALL_TOKENS.map((t) => t.category));
    for (const cat of TOKEN_CATEGORIES) {
      expect(categories).toContain(cat);
    }
  });

  it('includes primary brand blue as a color token', () => {
    const primary = ALL_TOKENS.find((t) => t.cssVar === '--io-color-primary');
    expect(primary).toBeDefined();
    expect(primary?.category).toBe('color');
    expect(primary?.value).toBe('#0000D2');
  });

  it('includes base spacing token', () => {
    const space4 = ALL_TOKENS.find((t) => t.cssVar === '--io-space-4');
    expect(space4).toBeDefined();
    expect(space4?.category).toBe('spacing');
  });

  it('includes border-radius pill token', () => {
    const pill = ALL_TOKENS.find((t) => t.cssVar === '--io-border-radius-pill');
    expect(pill).toBeDefined();
    expect(pill?.category).toBe('border-radius');
  });

  it('includes motion base token', () => {
    const motionBase = ALL_TOKENS.find((t) => t.cssVar === '--io-motion-base');
    expect(motionBase).toBeDefined();
    expect(motionBase?.category).toBe('motion');
  });
});

// ── isColorToken ──────────────────────────────────────────────────────────────

describe('isColorToken', () => {
  it('returns true for color category', () => {
    const token = makeToken('--io-color-primary', '#0000D2', 'color');
    expect(isColorToken(token)).toBe(true);
  });

  it('returns false for typography category', () => {
    const token = makeToken('--io-font-size-base', '1rem', 'typography');
    expect(isColorToken(token)).toBe(false);
  });

  it('returns false for spacing category', () => {
    const token = makeToken('--io-space-4', '1rem', 'spacing');
    expect(isColorToken(token)).toBe(false);
  });

  it('returns false for motion category', () => {
    const token = makeToken('--io-motion-base', '300ms ease', 'motion');
    expect(isColorToken(token)).toBe(false);
  });
});

// ── filterTokens ──────────────────────────────────────────────────────────────

describe('filterTokens', () => {
  const SAMPLE: readonly TokenEntry[] = [
    makeToken('--io-color-primary', '#0000D2', 'color'),
    makeToken('--io-color-error', '#ff6161', 'color'),
    makeToken('--io-font-size-base', '1rem', 'typography'),
    makeToken('--io-space-4', '1rem', 'spacing'),
    makeToken('--io-motion-base', '300ms ease', 'motion'),
    makeToken('--io-border-radius-sm', '9px', 'border-radius'),
    makeToken('--io-shadow-sm', '0px 1px 3px rgba(0,0,0,0.1)', 'shadow'),
  ] as const;

  it('returns all tokens when query is empty and category is all', () => {
    const result = filterTokens(SAMPLE, '', 'all');
    expect(result).toHaveLength(SAMPLE.length);
  });

  it('filters by category', () => {
    const result = filterTokens(SAMPLE, '', 'color');
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.category === 'color')).toBe(true);
  });

  it('filters by name (case-insensitive)', () => {
    const result = filterTokens(SAMPLE, 'PRIMARY', 'all');
    expect(result).toHaveLength(1);
    expect(result[0].cssVar).toBe('--io-color-primary');
  });

  it('filters by cssVar partial match', () => {
    const result = filterTokens(SAMPLE, 'color', 'all');
    expect(result).toHaveLength(2);
  });

  it('filters by value partial match', () => {
    const result = filterTokens(SAMPLE, '#ff6161', 'all');
    expect(result).toHaveLength(1);
    expect(result[0].cssVar).toBe('--io-color-error');
  });

  it('returns empty array when no tokens match', () => {
    const result = filterTokens(SAMPLE, 'does-not-exist-xyz', 'all');
    expect(result).toHaveLength(0);
  });

  it('combines category and search filters', () => {
    const result = filterTokens(SAMPLE, 'base', 'typography');
    expect(result).toHaveLength(1);
    expect(result[0].cssVar).toBe('--io-font-size-base');
  });

  it('trims whitespace from query', () => {
    const result = filterTokens(SAMPLE, '  primary  ', 'all');
    expect(result).toHaveLength(1);
  });
});

// ── CATEGORY_LABELS ───────────────────────────────────────────────────────────

describe('CATEGORY_LABELS', () => {
  it('has a label for every category', () => {
    for (const cat of TOKEN_CATEGORIES) {
      expect(CATEGORY_LABELS[cat]).toBeTruthy();
    }
  });

  it('labels the color category correctly', () => {
    expect(CATEGORY_LABELS.color).toBe('Color');
  });

  it('labels the border-radius category correctly', () => {
    expect(CATEGORY_LABELS['border-radius']).toBe('Border Radius');
  });
});
