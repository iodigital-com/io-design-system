import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoText } from './io-text';

describe('io-text — default props', () => {
  it('has "p" as the default tag', () => {
    const component = new IoText();
    expect(component.tag).toBe('p');
  });

  it('has "base" as the default size', () => {
    const component = new IoText();
    expect(component.size).toBe('base');
  });

  it('has "regular" as the default weight', () => {
    const component = new IoText();
    expect(component.weight).toBe('regular');
  });

  it('has "start" as the default align', () => {
    const component = new IoText();
    expect(component.align).toBe('start');
  });

  it('has "primary" as the default color', () => {
    const component = new IoText();
    expect(component.color).toBe('primary');
  });

  it('has ellipsis false by default', () => {
    const component = new IoText();
    expect(component.ellipsis).toBe(false);
  });
});

describe('io-text — render does not throw', () => {
  it('renders without throwing for all supported tags', () => {
    const tags = ['p', 'span', 'div', 'blockquote', 'time'] as const;
    for (const tag of tags) {
      const component = new IoText();
      component.tag = tag;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing for all supported sizes', () => {
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
    for (const size of sizes) {
      const component = new IoText();
      component.size = size;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing for all supported weights', () => {
    const weights = ['regular', 'medium', 'semibold', 'bold'] as const;
    for (const weight of weights) {
      const component = new IoText();
      component.weight = weight;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing for all supported colors', () => {
    const colors = ['primary', 'secondary', 'disabled', 'inverse', 'success', 'warning', 'error', 'inherit'] as const;
    for (const color of colors) {
      const component = new IoText();
      component.color = color;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing for all supported align values', () => {
    const aligns = ['start', 'center', 'end', 'inherit'] as const;
    for (const align of aligns) {
      const component = new IoText();
      component.align = align;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing when ellipsis is true', () => {
    const component = new IoText();
    component.ellipsis = true;
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-text — h() call arguments (style computation)', () => {
  /**
   * JSX compiles <Tag style={...}><slot /></Tag> as two h() calls:
   *   call[0]: h('slot', null)   — the inner <slot> element
   *   call[1]: h(Tag, {style}, …) — the outer wrapper element
   * So we inspect calls[1] for the outer element.
   */
  const OUTER = 1;

  it('passes font-size token for each size', () => {
    const hMock = vi.mocked(h);
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
    for (const size of sizes) {
      hMock.mockClear();
      const component = new IoText();
      component.size = size;
      component.render();
      const [, styleArg] = hMock.mock.calls[OUTER];
      expect((styleArg as any).style.fontSize).toBe(`var(--io-font-size-${size})`);
    }
  });

  it('passes font-weight token for each weight', () => {
    const hMock = vi.mocked(h);
    const weights = ['regular', 'medium', 'semibold', 'bold'] as const;
    for (const weight of weights) {
      hMock.mockClear();
      const component = new IoText();
      component.weight = weight;
      component.render();
      const [, styleArg] = hMock.mock.calls[OUTER];
      expect((styleArg as any).style.fontWeight).toBe(`var(--io-font-weight-${weight})`);
    }
  });

  it('passes --io-text-* token for primary, secondary, disabled, inverse colors', () => {
    const hMock = vi.mocked(h);
    const colors = ['primary', 'secondary', 'disabled', 'inverse'] as const;
    for (const color of colors) {
      hMock.mockClear();
      const component = new IoText();
      component.color = color;
      component.render();
      const [, styleArg] = hMock.mock.calls[OUTER];
      expect((styleArg as any).style.color).toBe(`var(--io-text-${color})`);
    }
  });

  it('passes success color token', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoText();
    component.color = 'success';
    component.render();
    const [, styleArg] = hMock.mock.calls[OUTER];
    expect((styleArg as any).style.color).toBe('var(--io-color-success, #059669)');
  });

  it('passes warning color token', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoText();
    component.color = 'warning';
    component.render();
    const [, styleArg] = hMock.mock.calls[OUTER];
    expect((styleArg as any).style.color).toBe('var(--io-color-warning, #d97706)');
  });

  it('passes error color token', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoText();
    component.color = 'error';
    component.render();
    const [, styleArg] = hMock.mock.calls[OUTER];
    expect((styleArg as any).style.color).toBe('var(--io-color-error)');
  });

  it('passes inherit for inherit color', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoText();
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
      const component = new IoText();
      component.align = align;
      component.render();
      const [, styleArg] = hMock.mock.calls[OUTER];
      expect((styleArg as any).style.textAlign).toBe(align);
    }
  });

  it('passes ellipsis styles when ellipsis is true', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoText();
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
    const component = new IoText();
    component.ellipsis = false;
    component.render();
    const [, styleArg] = hMock.mock.calls[OUTER];
    expect((styleArg as any).style.overflow).toBeUndefined();
    expect((styleArg as any).style.textOverflow).toBeUndefined();
    expect((styleArg as any).style.whiteSpace).toBeUndefined();
  });

  it('passes the correct tag to h()', () => {
    const hMock = vi.mocked(h);
    const tags = ['p', 'span', 'div', 'blockquote', 'time'] as const;
    for (const tag of tags) {
      hMock.mockClear();
      const component = new IoText();
      component.tag = tag;
      component.render();
      const [tagArg] = hMock.mock.calls[OUTER];
      expect(tagArg).toBe(tag);
    }
  });
});
