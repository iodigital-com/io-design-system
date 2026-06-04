import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoButtonGroup } from './io-button-group';

import type { IoButtonGroupItem } from './types';

const ITEMS: IoButtonGroupItem[] = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

function makeComponent(overrides: Partial<IoButtonGroup> = {}): IoButtonGroup {
  const comp = new IoButtonGroup();
  (comp as any).el = document.createElement('io-button-group');
  (comp as any).change = { emit: vi.fn() };
  (comp as any).items = [...ITEMS];
  Object.assign(comp, overrides);
  return comp;
}

function emitSpy(comp: IoButtonGroup): ReturnType<typeof vi.fn> {
  return (comp as any).change.emit;
}

describe('io-button-group — group-level disabled', () => {
  let comp: IoButtonGroup;

  beforeEach(() => {
    comp = makeComponent({ type: 'single', value: 'day', disabled: true });
  });

  it('does not emit change when group is disabled and an item is clicked', () => {
    (comp as any).handleItemClick(1);
    expect(emitSpy(comp)).not.toHaveBeenCalled();
  });

  it('does not mutate value when group is disabled', () => {
    (comp as any).handleItemClick(2);
    expect(comp.value).toBe('day');
  });

  it('getEnabledItems returns empty array when group is disabled', () => {
    const enabled = (comp as any).getEnabledItems();
    expect(enabled).toHaveLength(0);
  });

  it('onDisabledChange resets focusIndex to 0 when no enabled items exist', () => {
    (comp as any).focusIndex = 2;
    (comp as any).onDisabledChange();
    expect((comp as any).focusIndex).toBe(0);
  });

  it('re-enabling the group restores focusIndex to active item', () => {
    comp.disabled = false;
    (comp as any).onDisabledChange();
    expect((comp as any).focusIndex).toBe(0);
  });
});

describe('io-button-group — item-level disabled', () => {
  it('does not emit change when the clicked item is individually disabled', () => {
    const comp = makeComponent({ type: 'single', value: 'day' });
    (comp as any).items = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week', disabled: true },
    ];
    (comp as any).handleItemClick(1);
    expect(emitSpy(comp)).not.toHaveBeenCalled();
  });

  it('does not mutate value when the clicked item is individually disabled', () => {
    const comp = makeComponent({ type: 'single', value: 'day' });
    (comp as any).items = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week', disabled: true },
    ];
    (comp as any).handleItemClick(1);
    expect(comp.value).toBe('day');
  });

  it('getEnabledItems excludes individually disabled items', () => {
    const comp = makeComponent();
    (comp as any).items = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week', disabled: true },
      { value: 'month', label: 'Month' },
    ];
    const enabled = (comp as any).getEnabledItems();
    expect(enabled).toHaveLength(2);
    expect(enabled.map((e: { item: IoButtonGroupItem }) => e.item.value)).toEqual(['day', 'month']);
  });

  it('initFocusIndex skips disabled items when setting focus', () => {
    const comp = makeComponent({ value: '' });
    (comp as any).items = [
      { value: 'day', label: 'Day', disabled: true },
      { value: 'week', label: 'Week' },
    ];
    (comp as any).initFocusIndex();
    expect((comp as any).focusIndex).toBe(1);
  });
});
