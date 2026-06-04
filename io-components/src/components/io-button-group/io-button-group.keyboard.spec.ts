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

  // Wire up mock button refs
  const refs = new Map<number, HTMLButtonElement>();
  ITEMS.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.focus = vi.fn();
    refs.set(i, btn as HTMLButtonElement);
  });
  (comp as any).buttonRefs = refs;

  return comp;
}

function makeKeyEvent(key: string): KeyboardEvent {
  return new KeyboardEvent('keydown', { key, bubbles: true });
}

function emitSpy(comp: IoButtonGroup): ReturnType<typeof vi.fn> {
  return (comp as any).change.emit;
}

// ── Single mode (radiogroup) — arrows select ──────────────────────────────────

describe('io-button-group.keyboard — single mode', () => {
  let comp: IoButtonGroup;

  beforeEach(() => {
    comp = makeComponent({ type: 'single', value: 'day', focusIndex: 0 } as any);
  });

  it('ArrowRight moves focusIndex to next and emits change', () => {
    (comp as any).handleKeyDown(makeKeyEvent('ArrowRight'), 0);
    expect((comp as any).focusIndex).toBe(1);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'week' });
  });

  it('ArrowRight on last item wraps to item 0', () => {
    (comp as any).handleKeyDown(makeKeyEvent('ArrowRight'), 2);
    expect((comp as any).focusIndex).toBe(0);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'day' });
  });

  it('ArrowLeft moves focus to previous and emits change', () => {
    (comp as any).handleKeyDown(makeKeyEvent('ArrowLeft'), 1);
    expect((comp as any).focusIndex).toBe(0);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'day' });
  });

  it('ArrowLeft on first item wraps to last', () => {
    (comp as any).handleKeyDown(makeKeyEvent('ArrowLeft'), 0);
    expect((comp as any).focusIndex).toBe(2);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'month' });
  });

  it('ArrowDown behaves identically to ArrowRight', () => {
    (comp as any).handleKeyDown(makeKeyEvent('ArrowDown'), 0);
    expect((comp as any).focusIndex).toBe(1);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'week' });
  });

  it('ArrowUp behaves identically to ArrowLeft', () => {
    (comp as any).handleKeyDown(makeKeyEvent('ArrowUp'), 1);
    expect((comp as any).focusIndex).toBe(0);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'day' });
  });

  it('Home moves focus to index 0 and selects it', () => {
    comp.value = 'month';
    (comp as any).handleKeyDown(makeKeyEvent('Home'), 2);
    expect((comp as any).focusIndex).toBe(0);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'day' });
  });

  it('End moves focus to last and selects it', () => {
    (comp as any).handleKeyDown(makeKeyEvent('End'), 0);
    expect((comp as any).focusIndex).toBe(2);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'month' });
  });

  it('Space on focused item emits change', () => {
    (comp as any).handleKeyDown(makeKeyEvent(' '), 1);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'week' });
  });

  it('Enter on focused item emits change', () => {
    (comp as any).handleKeyDown(makeKeyEvent('Enter'), 2);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'month' });
  });

  it('Escape does not move focus or emit', () => {
    (comp as any).handleKeyDown(makeKeyEvent('Escape'), 0);
    expect((comp as any).focusIndex).toBe(0);
    expect(emitSpy(comp)).not.toHaveBeenCalled();
  });

  it('arrow navigation skips disabled items', () => {
    (comp as any).items = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week', disabled: true },
      { value: 'month', label: 'Month' },
    ];
    // Only day and month are enabled; ArrowRight from day (enabled index 0) → month (enabled index 1)
    (comp as any).handleKeyDown(makeKeyEvent('ArrowRight'), 0);
    expect((comp as any).focusIndex).toBe(2);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: 'month' });
  });

  it('focus() is called on the button ref when navigating', () => {
    const refs = (comp as any).buttonRefs as Map<number, HTMLButtonElement>;
    (comp as any).handleKeyDown(makeKeyEvent('ArrowRight'), 0);
    expect(refs.get(1)?.focus).toHaveBeenCalled();
  });
});

// ── Multiple mode (group) — arrows move focus only ────────────────────────────

describe('io-button-group.keyboard — multiple mode', () => {
  let comp: IoButtonGroup;

  beforeEach(() => {
    comp = makeComponent({ type: 'multiple', value: [], focusIndex: 0 } as any);
  });

  it('ArrowRight moves focusIndex WITHOUT emitting change', () => {
    (comp as any).handleKeyDown(makeKeyEvent('ArrowRight'), 0);
    expect((comp as any).focusIndex).toBe(1);
    expect(emitSpy(comp)).not.toHaveBeenCalled();
  });

  it('ArrowLeft moves focusIndex WITHOUT emitting', () => {
    (comp as any).handleKeyDown(makeKeyEvent('ArrowLeft'), 2);
    expect((comp as any).focusIndex).toBe(1);
    expect(emitSpy(comp)).not.toHaveBeenCalled();
  });

  it('Space toggles focused item and emits change with updated array', () => {
    comp.value = [];
    (comp as any).handleKeyDown(makeKeyEvent(' '), 1);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: ['week'] });
  });

  it('Enter toggles focused item and emits change', () => {
    comp.value = ['week'];
    (comp as any).handleKeyDown(makeKeyEvent('Enter'), 1);
    expect(emitSpy(comp)).toHaveBeenCalledWith({ value: [] });
  });
});
