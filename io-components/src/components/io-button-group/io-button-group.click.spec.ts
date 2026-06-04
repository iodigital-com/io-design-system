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
  const host = document.createElement('io-button-group');
  (comp as any).el = host;
  (comp as any).change = { emit: vi.fn() };
  (comp as any).items = [...ITEMS];
  Object.assign(comp, overrides);
  return comp;
}

function emitSpy(comp: IoButtonGroup): ReturnType<typeof vi.fn> {
  return (comp as any).change.emit;
}

// ── Single mode ────────────────────────────────────────────────────────────────

describe('io-button-group.click — single mode', () => {
  let comp: IoButtonGroup;

  beforeEach(() => {
    comp = makeComponent({ type: 'single', value: 'day' });
  });

  it('clicking an item sets value to that item value', () => {
    (comp as any).handleItemClick(1);
    expect(comp.value).toBe('week');
  });

  it('clicking a different item emits change with the new string value', () => {
    (comp as any).handleItemClick(2);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'month' });
  });

  it('clicking the already-active item still emits (no deselect in radiogroup)', () => {
    (comp as any).handleItemClick(0);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'day' });
  });

  it('clicking an item updates focusIndex to that item index', () => {
    (comp as any).handleItemClick(2);
    expect((comp as any).focusIndex).toBe(2);
  });

  it('selecting the third item deselects the previously active item', () => {
    (comp as any).handleItemClick(2);
    expect(comp.value).toBe('month');
    expect(comp.value).not.toBe('day');
  });
});

// ── Multiple mode ──────────────────────────────────────────────────────────────

describe('io-button-group.click — multiple mode', () => {
  let comp: IoButtonGroup;

  beforeEach(() => {
    comp = makeComponent({ type: 'multiple', value: ['day'] } as any);
  });

  it('clicking an inactive item adds it to the active set', () => {
    (comp as any).handleItemClick(1);
    expect(comp.value).toEqual(['day', 'week']);
  });

  it('clicking an active item removes it from the active set', () => {
    (comp as any).handleItemClick(0);
    expect(comp.value).toEqual([]);
  });

  it('change emits with the updated string array', () => {
    (comp as any).handleItemClick(2);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: ['day', 'month'] });
  });

  it('clicking an item updates focusIndex to that item index', () => {
    (comp as any).handleItemClick(1);
    expect((comp as any).focusIndex).toBe(1);
  });
});

// ── Disabled guards ────────────────────────────────────────────────────────────

describe('io-button-group.click — disabled guards', () => {
  it('clicking a disabled item does nothing and does not emit', () => {
    const comp = makeComponent({
      type: 'single',
      value: 'day',
    });
    (comp as any).items = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week', disabled: true },
      { value: 'month', label: 'Month' },
    ];

    (comp as any).handleItemClick(1);

    expect(comp.value).toBe('day');
    expect(emitSpy(comp)).not.toHaveBeenCalled();
  });

  it('clicking any item while group-disabled does nothing and does not emit', () => {
    const comp = makeComponent({ type: 'single', value: 'day', disabled: true });

    (comp as any).handleItemClick(1);

    expect(comp.value).toBe('day');
    expect(emitSpy(comp)).not.toHaveBeenCalled();
  });
});
