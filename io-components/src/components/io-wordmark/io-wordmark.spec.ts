import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h, Host } from '@stencil/core';

import { IoWordmark } from './io-wordmark';

// ── Default props ──────────────────────────────────────────────────────────────

describe('io-wordmark — default props', () => {
  it('has "mark" as the default variant', () => {
    expect(new IoWordmark().variant).toBe('mark');
  });

  it('has "blue" as the default color', () => {
    expect(new IoWordmark().color).toBe('blue');
  });

  it('has "md" as the default size', () => {
    expect(new IoWordmark().size).toBe('md');
  });

  it('has "io Digital" as the default ariaLabel', () => {
    expect(new IoWordmark().ariaLabel).toBe('io Digital');
  });

  it('has undefined href by default', () => {
    expect(new IoWordmark().href).toBeUndefined();
  });

  it('has "_self" as the default target', () => {
    expect(new IoWordmark().target).toBe('_self');
  });
});

// ── Render helpers ─────────────────────────────────────────────────────────────

function makeWordmark(overrides: Partial<IoWordmark> = {}): IoWordmark {
  return Object.assign(new IoWordmark(), overrides);
}

function hCallsForTag(tag: string): Array<Record<string, unknown> | undefined> {
  return vi
    .mocked(h)
    .mock.calls.filter((args) => args[0] === tag)
    .map((args) => args[1] as Record<string, unknown> | undefined);
}

function hostCalls(): Array<Record<string, unknown> | undefined> {
  return vi
    .mocked(h)
    .mock.calls.filter((args) => args[0] === Host)
    .map((args) => args[1] as Record<string, unknown> | undefined);
}

// ── variant='mark' ─────────────────────────────────────────────────────────────

describe('io-wordmark — variant="mark" render contract', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders without throwing', () => {
    expect(() => makeWordmark({ variant: 'mark' }).render()).not.toThrow();
  });

  it('renders without throwing for each supported size', () => {
    for (const size of ['sm', 'md', 'lg', 'xl', 'inherit'] as const) {
      expect(() => makeWordmark({ variant: 'mark', size }).render()).not.toThrow();
    }
  });

  it('renders without throwing for each supported color', () => {
    for (const color of ['blue', 'black', 'white', 'beige'] as const) {
      expect(() => makeWordmark({ variant: 'mark', color }).render()).not.toThrow();
    }
  });

  it('Host has role="img"', () => {
    makeWordmark({ variant: 'mark' }).render();
    const [host] = hostCalls();
    expect(host?.['role']).toBe('img');
  });

  it('Host has default aria-label', () => {
    makeWordmark({ variant: 'mark' }).render();
    const [host] = hostCalls();
    expect(host?.['aria-label']).toBe('io Digital');
  });

  it('Host has custom aria-label when ariaLabel is set', () => {
    makeWordmark({ variant: 'mark', ariaLabel: 'iO brand mark' }).render();
    const [host] = hostCalls();
    expect(host?.['aria-label']).toBe('iO brand mark');
  });

  it('renders an SVG element', () => {
    makeWordmark({ variant: 'mark' }).render();
    expect(hCallsForTag('svg').length).toBeGreaterThan(0);
  });
});

// ── variant='lockup' ───────────────────────────────────────────────────────────

describe('io-wordmark — variant="lockup" render contract', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders without throwing', () => {
    expect(() => makeWordmark({ variant: 'lockup' }).render()).not.toThrow();
  });

  it('renders without throwing for each supported size', () => {
    for (const size of ['sm', 'md', 'lg', 'xl', 'inherit'] as const) {
      expect(() => makeWordmark({ variant: 'lockup', size }).render()).not.toThrow();
    }
  });

  it('renders without throwing for each supported color', () => {
    for (const color of ['blue', 'black', 'white'] as const) {
      expect(() => makeWordmark({ variant: 'lockup', color }).render()).not.toThrow();
    }
  });

  it('Host has role="img"', () => {
    makeWordmark({ variant: 'lockup' }).render();
    const [host] = hostCalls();
    expect(host?.['role']).toBe('img');
  });

  it('Host has default aria-label', () => {
    makeWordmark({ variant: 'lockup' }).render();
    const [host] = hostCalls();
    expect(host?.['aria-label']).toBe('io Digital');
  });

  it('Host has custom aria-label when ariaLabel is set', () => {
    makeWordmark({ variant: 'lockup', ariaLabel: 'iO Digital brand lockup' }).render();
    const [host] = hostCalls();
    expect(host?.['aria-label']).toBe('iO Digital brand lockup');
  });

  it('renders an SVG element', () => {
    makeWordmark({ variant: 'lockup' }).render();
    expect(hCallsForTag('svg').length).toBeGreaterThan(0);
  });
});

// ── default render (no variant prop) ─────────────────────────────────────────

describe('io-wordmark — default render (mark)', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders without throwing when no variant is set', () => {
    expect(() => new IoWordmark().render()).not.toThrow();
  });

  it('Host has role="img"', () => {
    new IoWordmark().render();
    const [host] = hostCalls();
    expect(host?.['role']).toBe('img');
  });

  it('does not render an <a> element when href is not set', () => {
    new IoWordmark().render();
    expect(hCallsForTag('a')).toHaveLength(0);
  });
});

// ── href + target link wrapping ──────────────────────────────────────────

describe('io-wordmark — href link wrapping', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders an <a> element when href is set', () => {
    makeWordmark({ href: '/' }).render();
    expect(hCallsForTag('a').length).toBeGreaterThan(0);
  });

  it('anchor has correct href attribute', () => {
    makeWordmark({ href: '/home' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['href']).toBe('/home');
  });

  it('anchor has target attribute set to _self by default', () => {
    makeWordmark({ href: '/' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['target']).toBe('_self');
  });

  it('anchor has rel="noopener noreferrer" when target="_blank"', () => {
    makeWordmark({ href: '/', target: '_blank' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['rel']).toBe('noopener noreferrer');
  });

  it('anchor has aria-label when href is set', () => {
    makeWordmark({ href: '/', ariaLabel: 'Home' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['aria-label']).toBe('Home');
  });
});

// ── size='inherit' ──────────────────────────────────────────────────────────────

describe('io-wordmark — size="inherit"', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders without throwing with size="inherit"', () => {
    expect(() => makeWordmark({ variant: 'mark', size: 'inherit' }).render()).not.toThrow();
  });

  it('renders without throwing with size="inherit" and variant="lockup"', () => {
    expect(() => makeWordmark({ variant: 'lockup', size: 'inherit' }).render()).not.toThrow();
  });
});

// ── variant='badge' ────────────────────────────────────────────────────────────

describe('io-wordmark — variant="badge" render contract', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders without throwing', () => {
    expect(() => makeWordmark({ variant: 'badge' }).render()).not.toThrow();
  });

  it('renders without throwing for each supported size', () => {
    for (const size of ['sm', 'md', 'lg', 'xl', 'inherit'] as const) {
      expect(() => makeWordmark({ variant: 'badge', size }).render()).not.toThrow();
    }
  });

  it('renders without throwing for each supported color', () => {
    for (const color of ['blue', 'black', 'white', 'beige'] as const) {
      expect(() => makeWordmark({ variant: 'badge', color }).render()).not.toThrow();
    }
  });

  it('Host has role="img"', () => {
    makeWordmark({ variant: 'badge' }).render();
    const [host] = hostCalls();
    expect(host?.['role']).toBe('img');
  });

  it('Host has default aria-label', () => {
    makeWordmark({ variant: 'badge' }).render();
    const [host] = hostCalls();
    expect(host?.['aria-label']).toBe('io Digital');
  });

  it('renders an SVG element', () => {
    makeWordmark({ variant: 'badge' }).render();
    expect(hCallsForTag('svg').length).toBeGreaterThan(0);
  });

  it('SVG has badge-svg class', () => {
    makeWordmark({ variant: 'badge', size: 'md' }).render();
    const svgCalls = hCallsForTag('svg');
    const badgeSvg = svgCalls.find(attrs => typeof attrs?.['class'] === 'string' && (attrs['class'] as string).includes('badge-svg'));
    expect(badgeSvg).toBeDefined();
  });
});

// ── size='inherit' fix ──────────────────────────────────────────────────────────

describe('io-wordmark — size="inherit" fix (#1048)', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders mark SVG with class mark-svg--inherit when size="inherit"', () => {
    makeWordmark({ variant: 'mark', size: 'inherit' }).render();
    const svgCalls = hCallsForTag('svg');
    const inheritSvg = svgCalls.find(attrs => typeof attrs?.['class'] === 'string' && (attrs['class'] as string).includes('mark-svg--inherit'));
    expect(inheritSvg).toBeDefined();
  });

  it('renders lockup SVG with class lockup-svg--inherit when size="inherit"', () => {
    makeWordmark({ variant: 'lockup', size: 'inherit' }).render();
    const svgCalls = hCallsForTag('svg');
    const inheritSvg = svgCalls.find(attrs => typeof attrs?.['class'] === 'string' && (attrs['class'] as string).includes('lockup-svg--inherit'));
    expect(inheritSvg).toBeDefined();
  });
});

// ── beige + lockup validation ────────────────────────────────────────────────

describe('io-wordmark — beige + lockup validation', () => {
  it('logs console.error when color="beige" and variant="lockup"', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = makeWordmark({ variant: 'lockup', color: 'beige' });
    component.componentWillRender();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('color="beige" is not supported on variant="lockup"')
    );
    spy.mockRestore();
  });

  it('resolves color to blue when color="beige" and variant="lockup"', () => {
    const component = makeWordmark({ variant: 'lockup', color: 'beige' });
    component.componentWillRender();
    expect((component as any).resolvedColor).toBe('blue');
  });

  it('does not mutate the public color prop', () => {
    const component = makeWordmark({ variant: 'lockup', color: 'beige' });
    component.componentWillRender();
    expect(component.color).toBe('beige');
  });
});
