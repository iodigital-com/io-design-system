import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoTextList } from './io-text-list';

describe('io-text-list — default props', () => {
  it('has "ul" as the default tag', () => {
    const component = new IoTextList();
    expect(component.tag).toBe('ul');
  });

  it('has "base" as the default size', () => {
    const component = new IoTextList();
    expect(component.size).toBe('base');
  });

  it('has "primary" as the default color', () => {
    const component = new IoTextList();
    expect(component.color).toBe('primary');
  });
});

describe('io-text-list — render does not throw', () => {
  it('renders without throwing for ul', () => {
    const component = new IoTextList();
    component.tag = 'ul';
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing for ol', () => {
    const component = new IoTextList();
    component.tag = 'ol';
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing for all supported sizes', () => {
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl', 'inherit'] as const;
    for (const size of sizes) {
      const component = new IoTextList();
      component.size = size;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing for all supported colors', () => {
    const colors = [
      'primary',
      'secondary',
      'disabled',
      'inverse',
      'success',
      'warning',
      'error',
      'info',
      'inherit',
    ] as const;
    for (const color of colors) {
      const component = new IoTextList();
      component.color = color;
      expect(() => component.render()).not.toThrow();
    }
  });
});

describe('io-text-list — h() call arguments (style computation)', () => {
  it('passes font-size token for each size', () => {
    const hMock = vi.mocked(h);
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
    for (const size of sizes) {
      hMock.mockClear();
      const component = new IoTextList();
      component.size = size;
      component.render();
      const listCall = hMock.mock.calls.find(([tag]) => tag === 'ul' || tag === 'ol');
      expect(listCall).toBeDefined();
      expect((listCall![1] as any).style.fontSize).toBe(`var(--io-font-size-${size})`);
    }
  });

  it('passes "inherit" as font-size when size is inherit', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoTextList();
    component.size = 'inherit';
    component.render();
    const listCall = hMock.mock.calls.find(([tag]) => tag === 'ul' || tag === 'ol');
    expect((listCall![1] as any).style.fontSize).toBe('inherit');
  });

  it('passes --io-text-* token for primary, secondary, disabled, inverse colors', () => {
    const hMock = vi.mocked(h);
    const colors = ['primary', 'secondary', 'disabled', 'inverse'] as const;
    for (const color of colors) {
      hMock.mockClear();
      const component = new IoTextList();
      component.color = color;
      component.render();
      const listCall = hMock.mock.calls.find(([tag]) => tag === 'ul' || tag === 'ol');
      expect((listCall![1] as any).style.color).toBe(`var(--io-text-${color})`);
    }
  });

  it('passes success color token', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoTextList();
    component.color = 'success';
    component.render();
    const listCall = hMock.mock.calls.find(([tag]) => tag === 'ul' || tag === 'ol');
    expect((listCall![1] as any).style.color).toBe('var(--io-color-success)');
  });

  it('passes warning color token', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoTextList();
    component.color = 'warning';
    component.render();
    const listCall = hMock.mock.calls.find(([tag]) => tag === 'ul' || tag === 'ol');
    expect((listCall![1] as any).style.color).toBe('var(--io-color-warning)');
  });

  it('passes error color token', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoTextList();
    component.color = 'error';
    component.render();
    const listCall = hMock.mock.calls.find(([tag]) => tag === 'ul' || tag === 'ol');
    expect((listCall![1] as any).style.color).toBe('var(--io-color-error)');
  });

  it('passes info color token', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoTextList();
    component.color = 'info';
    component.render();
    const listCall = hMock.mock.calls.find(([tag]) => tag === 'ul' || tag === 'ol');
    expect((listCall![1] as any).style.color).toBe('var(--io-color-info)');
  });

  it('passes "inherit" for inherit color', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoTextList();
    component.color = 'inherit';
    component.render();
    const listCall = hMock.mock.calls.find(([tag]) => tag === 'ul' || tag === 'ol');
    expect((listCall![1] as any).style.color).toBe('inherit');
  });

  it('renders "ul" tag by default', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoTextList();
    component.render();
    const ulCall = hMock.mock.calls.find(([tag]) => tag === 'ul');
    expect(ulCall).toBeDefined();
  });

  it('renders "ol" tag when tag prop is "ol"', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoTextList();
    component.tag = 'ol';
    component.render();
    const olCall = hMock.mock.calls.find(([tag]) => tag === 'ol');
    expect(olCall).toBeDefined();
  });
});
