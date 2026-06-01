import { h } from '@stencil/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoButtonGroup } from './io-button-group';
import type { IoButtonGroupItem } from './types';

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const BASE_ITEMS: IoButtonGroupItem[] = [
  { value: 'a', label: 'A', disabled: false },
  { value: 'b', label: 'B', disabled: false },
  { value: 'c', label: 'C', disabled: false },
];

function makeComponent(overrides: Partial<IoButtonGroup> = {}): IoButtonGroup {
  const comp = new IoButtonGroup();
  (comp as any).el = document.createElement('io-button-group');
  (comp as any).change = { emit: vi.fn() };
  (comp as any).items = [...BASE_ITEMS];
  Object.assign(comp, overrides);
  return comp;
}


// ─── handleKeyDown fallback switch (line ~250) ────────────────────────────────
// The fallback IIFE fires when currentEnabledIndex < 0, i.e. the index passed
// to handleKeyDown belongs to a DISABLED item (not in the enabled set).

describe('io-button-group — handleKeyDown fallback for disabled-index', () => {
  // Layout: items[0]=enabled, items[1]=disabled, items[2]=enabled
  // enabled list: [{item, index:0}, {item, index:2}]  → enabled.length === 2
  // fallbackIndex for "backwards" keys → enabled.length - 1 === 1 (enabled[1] → items index 2)
  // fallbackIndex for "forwards"  keys → 0                         (enabled[0] → items index 0)

  function makeDisabledMiddleComp(opts: Partial<IoButtonGroup> = {}): IoButtonGroup {
    const comp = makeComponent(opts);
    (comp as any).items = [
      { value: 'a', label: 'A', disabled: false },
      { value: 'b', label: 'B', disabled: true },
      { value: 'c', label: 'C', disabled: false },
    ];

    // Provide focus-able button stubs
    const refs = new Map<number, HTMLButtonElement>();
    [0, 1, 2].forEach(i => {
      const btn = document.createElement('button');
      btn.focus = vi.fn();
      refs.set(i, btn as HTMLButtonElement);
    });
    (comp as any).buttonRefs = refs;

    return comp;
  }

  it('ArrowLeft on disabled index → fallback to last enabled item, moves focusIndex', () => {
    const comp = makeDisabledMiddleComp();
    const ev = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    vi.spyOn(ev, 'preventDefault');

    (comp as any).handleKeyDown(ev, 1);

    // enabled[enabled.length - 1] is the item at items index 2
    expect((comp as any).focusIndex).toBe(2);
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('ArrowUp on disabled index → fallback to last enabled item', () => {
    const comp = makeDisabledMiddleComp();
    const ev = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    vi.spyOn(ev, 'preventDefault');

    (comp as any).handleKeyDown(ev, 1);

    expect((comp as any).focusIndex).toBe(2);
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('End on disabled index → fallback to last enabled item', () => {
    const comp = makeDisabledMiddleComp();
    const ev = new KeyboardEvent('keydown', { key: 'End' });
    vi.spyOn(ev, 'preventDefault');

    (comp as any).handleKeyDown(ev, 1);

    expect((comp as any).focusIndex).toBe(2);
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('ArrowRight on disabled index → fallback to first enabled item', () => {
    const comp = makeDisabledMiddleComp();
    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    vi.spyOn(ev, 'preventDefault');

    (comp as any).handleKeyDown(ev, 1);

    // enabled[0] is the item at items index 0
    expect((comp as any).focusIndex).toBe(0);
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('ArrowDown on disabled index → fallback to first enabled item', () => {
    const comp = makeDisabledMiddleComp();
    const ev = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    vi.spyOn(ev, 'preventDefault');

    (comp as any).handleKeyDown(ev, 1);

    expect((comp as any).focusIndex).toBe(0);
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('Home on disabled index → fallback to first enabled item', () => {
    const comp = makeDisabledMiddleComp();
    const ev = new KeyboardEvent('keydown', { key: 'Home' });
    vi.spyOn(ev, 'preventDefault');

    (comp as any).handleKeyDown(ev, 1);

    expect((comp as any).focusIndex).toBe(0);
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('unrecognised key on disabled index → fallbackIndex null, preventDefault NOT called', () => {
    const comp = makeDisabledMiddleComp();
    const originalFocusIndex = (comp as any).focusIndex;
    const ev = new KeyboardEvent('keydown', { key: 'Escape' });
    vi.spyOn(ev, 'preventDefault');

    (comp as any).handleKeyDown(ev, 1);

    expect(ev.preventDefault).not.toHaveBeenCalled();
    expect((comp as any).focusIndex).toBe(originalFocusIndex);
  });

  it('Tab on disabled index → fallbackIndex null, no side effects', () => {
    const comp = makeDisabledMiddleComp();
    const ev = new KeyboardEvent('keydown', { key: 'Tab' });
    vi.spyOn(ev, 'preventDefault');

    (comp as any).handleKeyDown(ev, 1);

    expect(ev.preventDefault).not.toHaveBeenCalled();
  });

  it('fallback in exclusive mode also calls handleItemClick on the target', () => {
    const comp = makeDisabledMiddleComp({ exclusive: true, value: 'a' } as any);
    const clickSpy = vi.spyOn(comp as any, 'handleItemClick');
    const ev = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

    (comp as any).handleKeyDown(ev, 1);

    // In exclusive mode the fallback fires handleItemClick(target.index)
    // target is enabled[enabled.length-1] → items index 2
    expect(clickSpy).toHaveBeenCalledWith(2);
  });

  it('fallback in multi-select mode does NOT call handleItemClick', () => {
    const comp = makeDisabledMiddleComp({ exclusive: false, value: [] } as any);
    const clickSpy = vi.spyOn(comp as any, 'handleItemClick');
    const ev = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

    (comp as any).handleKeyDown(ev, 1);

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('fallback calls focus() on the resolved button ref', () => {
    const comp = makeDisabledMiddleComp();
    const refs = (comp as any).buttonRefs as Map<number, HTMLButtonElement>;
    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight' });

    (comp as any).handleKeyDown(ev, 1);

    // target is enabled[0] → items index 0
    expect(refs.get(0)?.focus).toHaveBeenCalled();
  });
});

// ─── render() inline handlers (lines 273-277) ────────────────────────────────
// h is vi.fn() in the test environment. After calling render() we can fish the
// inline arrow functions out of the mock's call log and invoke them directly.

describe('io-button-group — render() inline handlers', () => {
  function findButtonCalls(): Array<Record<string, unknown>> {
    return (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown> | null, ...unknown[]]>)
      .filter(args => args[0] === 'button' && args[1] != null && typeof args[1].onClick === 'function')
      .map(args => args[1] as Record<string, unknown>);
  }

  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('onClick handler calls handleItemClick for the correct index', () => {
    const comp = makeComponent({ value: '' });
    const clickSpy = vi.spyOn(comp as any, 'handleItemClick');

    comp.render();

    const buttons = findButtonCalls();
    expect(buttons.length).toBeGreaterThanOrEqual(1);

    // Invoke the onClick of the first button (index 0)
    (buttons[0].onClick as () => void)();
    expect(clickSpy).toHaveBeenCalledWith(0);
  });

  it('onKeyDown handler calls handleKeyDown for the correct index', () => {
    const comp = makeComponent({ value: '' });
    const keyDownSpy = vi.spyOn(comp as any, 'handleKeyDown');

    comp.render();

    const buttons = findButtonCalls();
    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    (buttons[0].onKeyDown as (ev: KeyboardEvent) => void)(ev);

    expect(keyDownSpy).toHaveBeenCalledWith(ev, 0);
  });

  it('ref callback with an element stores it in buttonRefs', () => {
    const comp = makeComponent({ value: '' });
    (comp as any).buttonRefs = new Map();

    comp.render();

    const buttons = findButtonCalls();
    const mockEl = document.createElement('button');
    (buttons[0].ref as (el?: HTMLButtonElement) => void)(mockEl);

    expect((comp as any).buttonRefs.get(0)).toBe(mockEl);
  });

  it('ref callback with undefined removes the entry from buttonRefs (else branch)', () => {
    const comp = makeComponent({ value: '' });
    const refs = new Map<number, HTMLButtonElement>();
    refs.set(0, document.createElement('button') as HTMLButtonElement);
    (comp as any).buttonRefs = refs;

    comp.render();

    const buttons = findButtonCalls();
    (buttons[0].ref as (el?: HTMLButtonElement) => void)(undefined);

    expect((comp as any).buttonRefs.has(0)).toBe(false);
  });

  it('slot element is rendered without an onSlotchange handler', () => {
    const comp = makeComponent();

    comp.render();

    // The slot renders with no props (null) — no onSlotchange handler since
    // propagateSize was removed along with the size prop.
    const slotCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown> | null]>)
      .filter(args => args[0] === 'slot');

    expect(slotCalls.length).toBeGreaterThanOrEqual(1);
    // None of the slot calls should carry an onSlotchange handler
    const hasSlotchange = slotCalls.some(
      args => args[1] != null && typeof args[1].onSlotchange === 'function',
    );
    expect(hasSlotchange).toBe(false);
  });
});

// ─── render() branch coverage ─────────────────────────────────────────────────

describe('io-button-group — render() branch coverage', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('renders with empty items array without throwing', () => {
    const comp = makeComponent({ value: '' });
    (comp as any).items = [];
    expect(() => comp.render()).not.toThrow();
  });

  it('renders with exclusive=false and multiple active items', () => {
    const comp = makeComponent({ exclusive: false, value: ['a', 'c'] } as any);
    expect(() => comp.render()).not.toThrow();
  });

  it('renders with disabled=true group', () => {
    const comp = makeComponent({ disabled: true, value: '' });
    expect(() => comp.render()).not.toThrow();

    // group div must carry aria-disabled="true"
    const divProps = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'div')
      .map(args => args[1]);
    const groupDiv = divProps.find(p => p?.['role'] === 'group' || p?.['role'] === 'radiogroup');
    expect(groupDiv?.['aria-disabled']).toBe('true');
  });

  it('omits aria-disabled when group is not disabled', () => {
    const comp = makeComponent({ disabled: false, value: '' });
    comp.render();

    const divProps = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'div')
      .map(args => args[1]);
    const groupDiv = divProps.find(p => p?.['role'] === 'group' || p?.['role'] === 'radiogroup');
    expect(groupDiv?.['aria-disabled']).toBeUndefined();
  });

  it('renders with label set (aria-labelledby present)', () => {
    const comp = makeComponent({ label: 'Period selector' });
    comp.render();

    const divProps = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'div')
      .map(args => args[1]);
    const groupDiv = divProps.find(p => p?.['role'] === 'group' || p?.['role'] === 'radiogroup');
    expect(groupDiv?.['aria-labelledby']).toBe('io-button-group-label');
  });

  it('renders with label unset (aria-label absent)', () => {
    const comp = makeComponent({ label: undefined });
    comp.render();

    const divProps = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'div')
      .map(args => args[1]);
    const groupDiv = divProps.find(p => p?.['role'] === 'group' || p?.['role'] === 'radiogroup');
    expect(groupDiv?.['aria-label']).toBeUndefined();
  });

  it('renders active item with aria-checked="true" in exclusive mode', () => {
    const comp = makeComponent({ exclusive: true, value: 'b' });
    comp.render();

    const btnProps = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'button')
      .map(args => args[1]);
    const activeBtn = btnProps.find(p => p?.['aria-checked'] === 'true');
    expect(activeBtn).toBeDefined();
  });

  it('renders ALL items with tabIndex=-1 when group is disabled', () => {
    const comp = makeComponent({ disabled: true, value: '' });
    comp.render();

    const btnProps = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'button')
      .map(args => args[1]);
    expect(btnProps.every(p => p?.['tabIndex'] === -1)).toBe(true);
  });

  it('onClick and onKeyDown handlers are invocable for every rendered button', () => {
    const comp = makeComponent({ value: '' });
    const clickSpy = vi.spyOn(comp as any, 'handleItemClick');
    const keyDownSpy = vi.spyOn(comp as any, 'handleKeyDown');

    vi.mocked(h).mockClear();
    comp.render();

    const buttons = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'button' && typeof (args[1] as Record<string, unknown>)?.onClick === 'function')
      .map(args => args[1] as Record<string, unknown>);

    expect(buttons).toHaveLength(3);

    // Verify onClick wiring: invoke each button's onClick once
    buttons.forEach(props => {
      (props.onClick as () => void)();
    });
    expect(clickSpy).toHaveBeenCalledTimes(3);

    // Verify onKeyDown wiring separately using a non-activating key (Escape)
    // so it does NOT chain into handleItemClick and pollute the click spy count
    buttons.forEach(props => {
      const ev = new KeyboardEvent('keydown', { key: 'Escape' });
      (props.onKeyDown as (ev: KeyboardEvent) => void)(ev);
    });
    expect(keyDownSpy).toHaveBeenCalledTimes(3);
  });
});
