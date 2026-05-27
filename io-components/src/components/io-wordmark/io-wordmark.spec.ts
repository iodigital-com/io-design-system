import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoWordmark } from './io-wordmark';

// ── Default props ──────────────────────────────────────────────────────────────

describe('io-wordmark — default props', () => {
  it('has "text" as the default variant', () => {
    expect(new IoWordmark().variant).toBe('text');
  });

  it('has "blue" as the default color', () => {
    expect(new IoWordmark().color).toBe('blue');
  });

  it('has "md" as the default size', () => {
    expect(new IoWordmark().size).toBe('md');
  });

  it('has false as the default mono value', () => {
    expect(new IoWordmark().mono).toBe(false);
  });

  it('has "io Digital" as the default ariaLabel', () => {
    expect(new IoWordmark().ariaLabel).toBe('io Digital');
  });

  it('href defaults to undefined', () => {
    expect(new IoWordmark().href).toBeUndefined();
  });

  it('target defaults to undefined', () => {
    expect(new IoWordmark().target).toBeUndefined();
  });

  it('rel defaults to undefined', () => {
    expect(new IoWordmark().rel).toBeUndefined();
  });
});

// ── variant='text' ─────────────────────────────────────────────────────────────

describe('io-wordmark — variant="text" render contract', () => {
  it('renders without throwing for each supported size', () => {
    for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
      const c = new IoWordmark();
      c.size = size;
      expect(() => c.render()).not.toThrow();
    }
  });

  it('renders without throwing in mono mode', () => {
    const c = new IoWordmark();
    c.mono = true;
    expect(() => c.render()).not.toThrow();
  });

  it('renders without throwing with custom ariaLabel', () => {
    const c = new IoWordmark();
    c.ariaLabel = 'iO Digital wordmark';
    expect(() => c.render()).not.toThrow();
  });

  it('renders without throwing for each color value', () => {
    for (const color of ['blue', 'black', 'white'] as const) {
      const c = new IoWordmark();
      c.color = color;
      expect(() => c.render()).not.toThrow();
    }
  });
});

// ── variant='text' href / link rendering ──────────────────────────────────────

function makeWordmark(overrides: Partial<IoWordmark> = {}): IoWordmark {
  return Object.assign(new IoWordmark(), overrides);
}

function hCallsForTag(tag: string): Array<Record<string, unknown> | undefined> {
  return vi
    .mocked(h)
    .mock.calls.filter((args) => args[0] === tag)
    .map((args) => args[1] as Record<string, unknown> | undefined);
}

describe('io-wordmark — variant="text" without href (static)', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders without throwing when href is not set', () => {
    expect(() => makeWordmark().render()).not.toThrow();
  });

  it('does NOT render an <a> element when href is not set', () => {
    makeWordmark().render();
    expect(hCallsForTag('a')).toHaveLength(0);
  });
});

describe('io-wordmark — variant="text" with href (link mode)', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders an <a> element when href is set', () => {
    makeWordmark({ href: '/' }).render();
    expect(hCallsForTag('a').length).toBeGreaterThan(0);
  });

  it('passes href to the <a> element', () => {
    makeWordmark({ href: '/home' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['href']).toBe('/home');
  });

  it('passes target to the <a> element', () => {
    makeWordmark({ href: 'https://iodigital.com', target: '_blank' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['target']).toBe('_blank');
  });

  it('passes rel to the <a> element', () => {
    makeWordmark({ href: 'https://iodigital.com', rel: 'noopener noreferrer' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['rel']).toBe('noopener noreferrer');
  });

  it('applies aria-label to the <a> element', () => {
    makeWordmark({ href: '/', ariaLabel: 'iO Digital — go to homepage' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['aria-label']).toBe('iO Digital — go to homepage');
  });

  it('uses default ariaLabel on the <a> when no custom label is set', () => {
    makeWordmark({ href: '/' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['aria-label']).toBe('io Digital');
  });

  it('does NOT render an <a> element when href is not set even if target is set', () => {
    makeWordmark({ target: '_blank' }).render();
    expect(hCallsForTag('a')).toHaveLength(0);
  });

  it('renders without throwing for all size + href combinations', () => {
    for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
      expect(() => makeWordmark({ href: '/', size }).render()).not.toThrow();
    }
  });
});

// ── variant='mark' ─────────────────────────────────────────────────────────────

describe('io-wordmark — variant="mark" render contract', () => {
  it('renders without throwing', () => {
    expect(() => makeWordmark({ variant: 'mark' }).render()).not.toThrow();
  });

  it('renders without throwing for each supported size', () => {
    for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
      expect(() => makeWordmark({ variant: 'mark', size }).render()).not.toThrow();
    }
  });

  it('renders without throwing for each supported color', () => {
    for (const color of ['blue', 'black', 'white', 'beige'] as const) {
      expect(() => makeWordmark({ variant: 'mark', color }).render()).not.toThrow();
    }
  });
});

// ── variant='lockup' ───────────────────────────────────────────────────────────

describe('io-wordmark — variant="lockup" render contract', () => {
  it('renders without throwing', () => {
    expect(() => makeWordmark({ variant: 'lockup' }).render()).not.toThrow();
  });

  it('renders without throwing for each supported size', () => {
    for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
      expect(() => makeWordmark({ variant: 'lockup', size }).render()).not.toThrow();
    }
  });

  it('renders without throwing for each supported color', () => {
    for (const color of ['blue', 'black', 'white'] as const) {
      expect(() => makeWordmark({ variant: 'lockup', color }).render()).not.toThrow();
    }
  });
});
