import { h } from '@stencil/core';
import { describe, it, expect, vi } from 'vitest';

import { IoHeading } from './io-heading';

describe('io-heading — default props', () => {
  it('has undefined tag by default', () => {
    const component = new IoHeading();
    expect(component.tag).toBeUndefined();
  });

  it('has "2xl" as the default size', () => {
    const component = new IoHeading();
    expect(component.size).toBe('2xl');
  });

  it('has "semibold" as the default weight', () => {
    const component = new IoHeading();
    expect(component.weight).toBe('semibold');
  });

  it('has "start" as the default align', () => {
    const component = new IoHeading();
    expect(component.align).toBe('start');
  });

  it('has "primary" as the default color', () => {
    const component = new IoHeading();
    expect(component.color).toBe('primary');
  });

  it('has ellipsis false by default', () => {
    const component = new IoHeading();
    expect(component.ellipsis).toBe(false);
  });
});

describe('io-heading — tag fallback and dev warning', () => {
  /**
   * JSX compiles <Tag style={...}><slot /></Tag> as two h() calls:
   *   call[0]: h('slot', null)   — the inner <slot> element
   *   call[1]: h(Tag, {style}, …) — the outer wrapper element
   */
  const OUTER = 1;

  it('logs an error when tag is not provided (in componentWillLoad, not render)', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const component = new IoHeading();
    (component as any).componentWillLoad();
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('[io-heading]'));
    errorSpy.mockRestore();
  });

  it('calls h() with "h2" as fallback when tag is not provided', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoHeading();
    component.render();
    const [tagArg] = hMock.mock.calls[OUTER];
    expect(tagArg).toBe('h2');
    vi.restoreAllMocks();
  });
});

describe('io-heading — render does not throw', () => {
  it('renders without throwing for all supported tags', () => {
    const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    for (const tag of tags) {
      const component = new IoHeading();
      component.tag = tag;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing for all supported sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;
    for (const size of sizes) {
      const component = new IoHeading();
      component.tag = 'h2';
      component.size = size;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing for all supported weights', () => {
    const weights = ['regular', 'semibold', 'bold'] as const;
    for (const weight of weights) {
      const component = new IoHeading();
      component.tag = 'h2';
      component.weight = weight;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing for all supported colors', () => {
    const colors = ['primary', 'secondary', 'inherit'] as const;
    for (const color of colors) {
      const component = new IoHeading();
      component.tag = 'h2';
      component.color = color;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing when ellipsis is true', () => {
    const component = new IoHeading();
    component.tag = 'h2';
    component.ellipsis = true;
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-heading — h() call arguments (style computation)', () => {
  /**
   * JSX compiles <Tag style={...}><slot /></Tag> as two h() calls:
   *   call[0]: h('slot', null)   — the inner <slot> element
   *   call[1]: h(Tag, {style}, …) — the outer wrapper element
   */
  const OUTER = 1;

  const SIZE_TOKEN_MAP: Record<string, string> = {
    sm: 'var(--io-font-size-sm)',
    md: 'var(--io-font-size-base)',
    lg: 'var(--io-font-size-lg)',
    xl: 'var(--io-font-size-xl)',
    '2xl': 'var(--io-font-size-2xl)',
    '3xl': 'var(--io-font-size-3xl)',
    '4xl': 'var(--io-font-size-4xl)',
  };

  it('passes correct font-size token for each size', () => {
    const hMock = vi.mocked(h);
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;
    for (const size of sizes) {
      hMock.mockClear();
      const component = new IoHeading();
      component.tag = 'h2';
      component.size = size;
      component.render();
      const [, styleArg] = hMock.mock.calls[OUTER];
      expect((styleArg as any).style.fontSize).toBe(SIZE_TOKEN_MAP[size]);
    }
  });

  it('passes font-weight token for each weight', () => {
    const hMock = vi.mocked(h);
    const weights = ['regular', 'semibold', 'bold'] as const;
    for (const weight of weights) {
      hMock.mockClear();
      const component = new IoHeading();
      component.tag = 'h2';
      component.weight = weight;
      component.render();
      const [, styleArg] = hMock.mock.calls[OUTER];
      expect((styleArg as any).style.fontWeight).toBe(`var(--io-font-weight-${weight})`);
    }
  });

  it('passes --io-text-primary for primary color', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoHeading();
    component.tag = 'h2';
    component.color = 'primary';
    component.render();
    const [, styleArg] = hMock.mock.calls[OUTER];
    expect((styleArg as any).style.color).toBe('var(--io-text-primary)');
  });

  it('passes --io-text-secondary for secondary color', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoHeading();
    component.tag = 'h2';
    component.color = 'secondary';
    component.render();
    const [, styleArg] = hMock.mock.calls[OUTER];
    expect((styleArg as any).style.color).toBe('var(--io-text-secondary)');
  });

  it('passes inherit for inherit color', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoHeading();
    component.tag = 'h2';
    component.color = 'inherit';
    component.render();
    const [, styleArg] = hMock.mock.calls[OUTER];
    expect((styleArg as any).style.color).toBe('inherit');
  });

  it('passes text-align from align prop', () => {
    const hMock = vi.mocked(h);
    const aligns = ['start', 'center', 'end', 'inherit'] as const;
    for (const align of aligns) {
      hMock.mockClear();
      const component = new IoHeading();
      component.tag = 'h2';
      component.align = align;
      component.render();
      const [, styleArg] = hMock.mock.calls[OUTER];
      expect((styleArg as any).style.textAlign).toBe(align);
    }
  });

  it('passes ellipsis styles when ellipsis is true', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoHeading();
    component.tag = 'h2';
    component.ellipsis = true;
    component.render();
    const [, styleArg] = hMock.mock.calls[OUTER];
    expect((styleArg as any).style.overflow).toBe('hidden');
    expect((styleArg as any).style.textOverflow).toBe('ellipsis');
    expect((styleArg as any).style.whiteSpace).toBe('nowrap');
  });

  it('does not pass ellipsis styles when ellipsis is false', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoHeading();
    component.tag = 'h2';
    component.ellipsis = false;
    component.render();
    const [, styleArg] = hMock.mock.calls[OUTER];
    expect((styleArg as any).style.overflow).toBeUndefined();
    expect((styleArg as any).style.textOverflow).toBeUndefined();
    expect((styleArg as any).style.whiteSpace).toBeUndefined();
  });

  it('passes the correct tag to h() for each heading level', () => {
    const hMock = vi.mocked(h);
    const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    for (const tag of tags) {
      hMock.mockClear();
      const component = new IoHeading();
      component.tag = tag;
      component.render();
      const [tagArg] = hMock.mock.calls[OUTER];
      expect(tagArg).toBe(tag);
    }
  });
});
