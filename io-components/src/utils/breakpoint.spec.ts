import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';

import { parseBreakpoint, resolveBreakpoint } from './breakpoint';

// Utility: mock matchMedia to return true for a specific min-width query.
function mockMatchMedia(matchingQuery: string | null): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => ({
      matches: query === matchingQuery,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

// Utility: restore matchMedia so all queries return false (the project default mock).
function resetMatchMedia(): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// parseBreakpoint
// ──────────────────────────────────────────────────────────────────────────────

describe('parseBreakpoint', () => {
  it('returns fallback for undefined input', () => {
    const result = parseBreakpoint<'sm' | 'md'>(undefined, 'md');
    expect(result).toEqual({ isFixed: true, value: 'md' });
  });

  it('returns fallback for null input', () => {
    const result = parseBreakpoint<'sm' | 'md'>(null, 'md');
    expect(result).toEqual({ isFixed: true, value: 'md' });
  });

  it('returns a fixed scalar for a plain string', () => {
    const result = parseBreakpoint<'sm' | 'md' | 'lg'>('lg', 'md');
    expect(result).toEqual({ isFixed: true, value: 'lg' });
  });

  it('parses a JSON-string object into responsive entries', () => {
    const result = parseBreakpoint<'sm' | 'md' | 'lg'>('{"base":"sm","l":"lg"}', 'md');
    expect(result.isFixed).toBe(false);
    if (!result.isFixed) {
      expect(result.entries).toEqual([
        { key: 'base', value: 'sm' },
        { key: 'l', value: 'lg' },
      ]);
    }
  });

  it('treats a malformed JSON string as a plain scalar', () => {
    const result = parseBreakpoint<string>('{not-valid-json', 'md');
    expect(result).toEqual({ isFixed: true, value: '{not-valid-json' });
  });

  it('returns fixed for an object with only a base key', () => {
    const result = parseBreakpoint<'sm' | 'md'>({ base: 'sm' }, 'md');
    expect(result).toEqual({ isFixed: true, value: 'sm' });
  });

  it('returns fixed fallback for an empty object', () => {
    const result = parseBreakpoint<'sm' | 'md'>({}, 'md');
    expect(result).toEqual({ isFixed: true, value: 'md' });
  });

  it('returns responsive entries ordered by BREAKPOINT_ORDER', () => {
    const result = parseBreakpoint<'sm' | 'md' | 'lg'>({ l: 'lg', base: 'sm' }, 'md');
    expect(result.isFixed).toBe(false);
    if (!result.isFixed) {
      expect(result.entries.map((e) => e.key)).toEqual(['base', 'l']);
    }
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// resolveBreakpoint
// ──────────────────────────────────────────────────────────────────────────────

describe('resolveBreakpoint', () => {
  beforeEach(() => {
    resetMatchMedia();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    resetMatchMedia();
  });

  // ── Scalar input ─────────────────────────────────────────────────────────

  it('returns the scalar value directly', () => {
    const result = resolveBreakpoint<'sm' | 'md' | 'lg'>('lg', 'md');
    expect(result).toBe('lg');
  });

  it('returns fallback for undefined input', () => {
    const result = resolveBreakpoint<'sm' | 'md'>(undefined, 'md');
    expect(result).toBe('md');
  });

  it('returns fallback for null input', () => {
    const result = resolveBreakpoint<'sm' | 'md'>(null, 'md');
    expect(result).toBe('md');
  });

  // ── SSR / no matchMedia fallback ──────────────────────────────────────────

  it('returns base entry when matchMedia is not a function', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: undefined,
    });

    const result = resolveBreakpoint<'sm' | 'md' | 'lg'>({ base: 'sm', l: 'lg' }, 'md');
    expect(result).toBe('sm');
  });

  it('returns fallback when matchMedia is not a function and no base entry', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: undefined,
    });

    const result = resolveBreakpoint<'sm' | 'md' | 'lg'>({ l: 'lg' }, 'md');
    expect(result).toBe('md');
  });

  // ── Responsive object input ───────────────────────────────────────────────

  it('returns the value for the largest matching breakpoint', () => {
    mockMatchMedia('(min-width: 1024px)'); // 'l' breakpoint matches

    const result = resolveBreakpoint<'sm' | 'md' | 'lg'>({ base: 'sm', l: 'lg' }, 'md');
    expect(result).toBe('lg');
  });

  it('falls back to base when no named breakpoint matches', () => {
    // resetMatchMedia already installed — all queries return false
    const result = resolveBreakpoint<'sm' | 'md' | 'lg'>({ base: 'sm', l: 'lg' }, 'md');
    expect(result).toBe('sm');
  });

  it('falls back to provided fallback when no breakpoint matches and no base entry', () => {
    // resetMatchMedia already installed — all queries return false, no 'base' key
    const result = resolveBreakpoint<'sm' | 'md' | 'lg'>({ l: 'lg' }, 'md');
    expect(result).toBe('md');
  });

  // ── JSON-string form ──────────────────────────────────────────────────────

  it('resolves a JSON-string responsive value', () => {
    mockMatchMedia('(min-width: 1024px)'); // 'l' matches

    const result = resolveBreakpoint<'sm' | 'md' | 'lg'>('{"base":"sm","l":"lg"}', 'md');
    expect(result).toBe('lg');
  });

  it('treats a malformed JSON string as a scalar', () => {
    const result = resolveBreakpoint<string>('{bad-json', 'md');
    expect(result).toBe('{bad-json');
  });
});
