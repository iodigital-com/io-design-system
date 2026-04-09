import { describe, it, expect } from 'vitest';
import { createTabsIdPrefix, getEnabledTabs, getFirstEnabledTabValue, getNextEnabledIndex, getTabClassName, getTabIds } from './io-tabs-utils';

describe('io-tabs-utils', () => {
  const tabs = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b', disabled: true },
    { label: 'C', value: 'c' },
  ];

  it('builds tab ids and class names', () => {
    expect(createTabsIdPrefix('xyz')).toBe('io-tabs-xyz');
    expect(getTabIds('io-tabs-xyz', 'a')).toEqual({ tabId: 'io-tabs-xyz-tab-a', panelId: 'io-tabs-xyz-panel-a' });
    expect(getTabClassName(true, false)).toBe('tab tab--active');
    expect(getTabClassName(false, true)).toBe('tab tab--disabled');
  });

  it('returns enabled tabs and first enabled value', () => {
    expect(getFirstEnabledTabValue(tabs)).toBe('a');
    expect(getEnabledTabs(tabs).map(item => item.index)).toEqual([0, 2]);
  });

  it('returns null when enabled count or index are invalid', () => {
    expect(getNextEnabledIndex('ArrowRight', 0, 0)).toBeNull();
    expect(getNextEnabledIndex('ArrowRight', -1, 2)).toBeNull();
    expect(getNextEnabledIndex('ArrowRight', 2, 2)).toBeNull();
  });

  it('resolves next enabled index for key navigation', () => {
    expect(getNextEnabledIndex('ArrowRight', 0, 2)).toBe(1);
    expect(getNextEnabledIndex('ArrowLeft', 0, 2)).toBe(1);
    expect(getNextEnabledIndex('Home', 1, 2)).toBe(0);
    expect(getNextEnabledIndex('End', 0, 2)).toBe(1);
    expect(getNextEnabledIndex('Enter', 0, 2)).toBeNull();
  });
});
