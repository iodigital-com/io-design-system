import { describe, it, expect } from 'vitest';

import { parseItems, getVisibleItems } from './io-breadcrumb-utils';

describe('parseItems', () => {
  it('parses valid JSON array', () => {
    const result = parseItems('[{"label":"Home","href":"/"},{"label":"Services","href":"/s"},{"label":"Digital"}]');
    expect(result).toHaveLength(3);
    expect(result[0].label).toBe('Home');
    expect(result[0].href).toBe('/');
    expect(result[2].href).toBeUndefined();
  });

  it('returns empty array for invalid JSON', () => {
    expect(parseItems('not-json')).toEqual([]);
  });

  it('returns empty array for non-array JSON', () => {
    expect(parseItems('{"label":"x"}')).toEqual([]);
  });

  it('filters out items without label', () => {
    expect(parseItems('[{"href":"/"}]')).toEqual([]);
  });

  it('returns empty array for empty input', () => {
    expect(parseItems('[]')).toEqual([]);
  });

  it('filters out items with non-string label', () => {
    expect(parseItems('[{"label":123}]')).toEqual([]);
  });

  it('keeps items with only label (no href)', () => {
    const result = parseItems('[{"label":"Current Page"}]');
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('Current Page');
    expect(result[0].href).toBeUndefined();
  });
});

describe('getVisibleItems', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/s' },
    { label: 'Digital', href: '/d' },
    { label: 'Strategy' },
  ];

  it('returns all items when no maxVisible', () => {
    const result = getVisibleItems(items, undefined, false);
    expect(result.visible).toHaveLength(4);
    expect(result.hasCollapsed).toBe(false);
    expect(result.collapsedCount).toBe(0);
  });

  it('collapses when items exceed maxVisible', () => {
    const result = getVisibleItems(items, 3, false);
    expect(result.visible).toHaveLength(2);
    expect(result.hasCollapsed).toBe(true);
    expect(result.collapsedCount).toBe(2);
  });

  it('expands when expanded=true', () => {
    const result = getVisibleItems(items, 3, true);
    expect(result.visible).toHaveLength(4);
    expect(result.hasCollapsed).toBe(false);
  });

  it('does not collapse when items <= maxVisible', () => {
    const result = getVisibleItems(items, 4, false);
    expect(result.hasCollapsed).toBe(false);
    expect(result.visible).toHaveLength(4);
  });

  it('shows first and last when collapsed', () => {
    const result = getVisibleItems(items, 2, false);
    expect(result.visible[0].label).toBe('Home');
    expect(result.visible[1].label).toBe('Strategy');
  });

  it('returns all when maxVisible is 0 (falsy)', () => {
    const result = getVisibleItems(items, 0, false);
    expect(result.visible).toHaveLength(4);
    expect(result.hasCollapsed).toBe(false);
  });
});
