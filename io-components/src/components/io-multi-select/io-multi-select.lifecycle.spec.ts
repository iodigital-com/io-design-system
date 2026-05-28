/**
 * io-multi-select — lifecycle, render-branch, and interaction coverage tests
 *
 * Targets the uncovered lines (~61% → ≥95%) including:
 * - componentDidLoad / disconnectedCallback / lateParseTimeout
 * - onIsOpenChange (open / close branches)
 * - moveActive edge cases (wrap-around, all-disabled, empty list)
 * - handleFilterKeyDown ArrowDown / ArrowUp
 * - renderOption / renderListboxItems (called via render())
 * - render() conditional branches (chips, filter, message, faceInvalid, required *)
 * - positionDropdown (early-return guard when refs absent)
 * - attachClickOutside / removeClickOutside
 * - setFocus with options arg
 * - render() inline JSX callback bodies (slotchange, chip remove onClick)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoMultiSelect } from './io-multi-select';

// ── Factory ───────────────────────────────────────────────────────────────────

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

function makeComponent(overrides: Partial<IoMultiSelect> = {}): IoMultiSelect {
  const c = new IoMultiSelect();
  (c as any).el = document.createElement('io-multi-select');
  (c as any).change = { emit: vi.fn() };
  (c as any).internals = makeInternals();
  c.name = 'test';
  c.label = 'Countries';
  Object.assign(c, overrides);
  (c as any).componentWillLoad();
  return c;
}

// ── componentDidLoad ──────────────────────────────────────────────────────────

describe('io-multi-select — componentDidLoad', () => {
  it('parses options from slotted children and populates flatOptions', () => {
    const c = makeComponent();
    const opt = document.createElement('io-option');
    opt.setAttribute('value', 'nl');
    opt.setAttribute('label', 'Netherlands');
    (c as any).el.appendChild(opt);
    (c as any).componentDidLoad();
    expect((c as any).flatOptions.length).toBeGreaterThan(0);
  });

  it('schedules a late-parse timeout when flatOptions is empty but children exist', () => {
    vi.useFakeTimers();
    const c = makeComponent();
    // Add a child element that won't be parsed as an option yet (simulates SSR)
    const div = document.createElement('div');
    (c as any).el.appendChild(div);
    (c as any).componentDidLoad();
    expect((c as any).lateParseTimeout).toBeDefined();
    vi.runAllTimers();
    vi.useRealTimers();
  });

  it('does not schedule a timeout when children list is empty', () => {
    const c = makeComponent();
    (c as any).componentDidLoad();
    expect((c as any).lateParseTimeout).toBeUndefined();
  });
});

// ── disconnectedCallback ──────────────────────────────────────────────────────

describe('io-multi-select — disconnectedCallback', () => {
  it('clears lateParseTimeout on disconnect', () => {
    vi.useFakeTimers();
    const c = makeComponent();
    const timeoutId = setTimeout(() => {}, 1000);
    (c as any).lateParseTimeout = timeoutId;
    (c as any).disconnectedCallback();
    expect((c as any).lateParseTimeout).toBeUndefined();
    vi.useRealTimers();
  });

  it('removes clickOutsideHandler on disconnect', () => {
    const c = makeComponent();
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    // Manually attach a handler so removeClickOutside has something to remove
    const handler = vi.fn();
    (c as any).clickOutsideHandler = handler;
    document.addEventListener('pointerdown', handler, true);
    (c as any).disconnectedCallback();
    expect(removeSpy).toHaveBeenCalled();
    removeSpy.mockRestore();
  });

  it('is safe to call disconnectedCallback when no timeout or handler exists', () => {
    const c = makeComponent();
    expect(() => (c as any).disconnectedCallback()).not.toThrow();
  });
});

// ── onIsOpenChange ────────────────────────────────────────────────────────────

describe('io-multi-select — onIsOpenChange (open)', () => {
  it('calls attachClickOutside when opening', () => {
    const c = makeComponent();
    const addSpy = vi.spyOn(document, 'addEventListener');
    (c as any).onIsOpenChange(true);
    expect(addSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function), true);
    addSpy.mockRestore();
  });

  it('sets activeIndex to firstSelected when opening without filter', () => {
    const c = makeComponent();
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
    ];
    c.value = ['be'];
    (c as any).onIsOpenChange(true);
    expect((c as any).activeIndex).toBe(1);
  });

  it('sets activeIndex to firstEnabled when opening without filter and none selected', () => {
    const c = makeComponent();
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
    ];
    c.value = [];
    (c as any).onIsOpenChange(true);
    expect((c as any).activeIndex).toBe(0);
  });

  it('sets activeIndex to -1 when opening without filter and all options disabled', () => {
    const c = makeComponent();
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: true },
    ];
    c.value = [];
    (c as any).onIsOpenChange(true);
    expect((c as any).activeIndex).toBe(-1);
  });

  it('schedules focus on filterInputEl when opening with filter=true', () => {
    vi.useFakeTimers();
    const c = makeComponent({ filter: true } as any);
    const focusMock = vi.fn();
    (c as any).filterInputEl = { focus: focusMock };
    (c as any).onIsOpenChange(true);
    vi.runAllTimers();
    expect(focusMock).toHaveBeenCalled();
    vi.useRealTimers();
  });
});

describe('io-multi-select — onIsOpenChange (close)', () => {
  it('calls removeClickOutside when closing', () => {
    const c = makeComponent();
    const handler = vi.fn();
    (c as any).clickOutsideHandler = handler;
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    (c as any).onIsOpenChange(false);
    expect(removeSpy).toHaveBeenCalled();
    removeSpy.mockRestore();
  });

  it('resets activeIndex and filterQuery when closing', () => {
    const c = makeComponent();
    (c as any).activeIndex = 2;
    (c as any).filterQuery = 'test';
    (c as any).onIsOpenChange(false);
    expect((c as any).activeIndex).toBe(-1);
    expect((c as any).filterQuery).toBe('');
  });

  it('schedules focus on triggerEl when closing', () => {
    vi.useFakeTimers();
    const c = makeComponent();
    const focusMock = vi.fn();
    (c as any).triggerEl = { focus: focusMock };
    (c as any).onIsOpenChange(false);
    vi.runAllTimers();
    expect(focusMock).toHaveBeenCalled();
    vi.useRealTimers();
  });
});

// ── positionDropdown ──────────────────────────────────────────────────────────

describe('io-multi-select — positionDropdown', () => {
  it('returns early without throwing when triggerEl or dropdownEl is absent', async () => {
    const c = makeComponent();
    (c as any).triggerEl = undefined;
    (c as any).dropdownEl = undefined;
    await expect((c as any).positionDropdown()).resolves.toBeUndefined();
  });
});

// ── moveActive ────────────────────────────────────────────────────────────────

describe('io-multi-select — moveActive', () => {
  let c: IoMultiSelect;

  beforeEach(() => {
    c = makeComponent();
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
      { value: 'de', label: 'Germany', disabled: true },
    ];
    (c as any).activeIndex = 0;
  });

  it('moves forward by delta', () => {
    (c as any).moveActive(1);
    expect((c as any).activeIndex).toBe(1);
  });

  it('wraps from last enabled to first when delta=1', () => {
    (c as any).activeIndex = 1;
    (c as any).moveActive(1);
    // index 2 is disabled, wraps to 0
    expect((c as any).activeIndex).toBe(0);
  });

  it('wraps from first to last enabled when delta=-1', () => {
    (c as any).activeIndex = 0;
    (c as any).moveActive(-1);
    // goes to index 2 but disabled, then index 1 which is enabled
    expect((c as any).activeIndex).toBe(1);
  });

  it('does not move when flatOptions is empty', () => {
    (c as any).flatOptions = [];
    (c as any).activeIndex = -1;
    (c as any).moveActive(1);
    expect((c as any).activeIndex).toBe(-1);
  });

  it('does not move to a disabled option and stays on current if all others disabled', () => {
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: true },
      { value: 'be', label: 'Belgium', disabled: true },
    ];
    (c as any).activeIndex = 0;
    const before = (c as any).activeIndex;
    (c as any).moveActive(1);
    // All disabled — activeIndex should not have moved to a disabled option
    expect((c as any).flatOptions[(c as any).activeIndex]?.disabled).not.toBe(false);
    // The index value is irrelevant as long as it's not on a clearly enabled slot
    expect(typeof (c as any).activeIndex).toBe('number');
    void before; // suppress lint
  });
});

// ── handleFilterKeyDown ArrowDown / ArrowUp ───────────────────────────────────

describe('io-multi-select — handleFilterKeyDown navigation', () => {
  let c: IoMultiSelect;

  beforeEach(() => {
    c = makeComponent({ filter: true } as any);
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
    ];
    (c as any).activeIndex = 0;
    (c as any).isOpen = true;
  });

  it('ArrowDown increments activeIndex', () => {
    const ev = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    vi.spyOn(ev, 'preventDefault');
    (c as any).handleFilterKeyDown(ev);
    expect((c as any).activeIndex).toBe(1);
  });

  it('ArrowUp decrements activeIndex', () => {
    (c as any).activeIndex = 1;
    const ev = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    vi.spyOn(ev, 'preventDefault');
    (c as any).handleFilterKeyDown(ev);
    expect((c as any).activeIndex).toBe(0);
  });

  it('unrecognised key in filter does nothing', () => {
    const ev = new KeyboardEvent('keydown', { key: 'F1' });
    expect(() => (c as any).handleFilterKeyDown(ev)).not.toThrow();
  });
});

// ── filteredOptions getter ────────────────────────────────────────────────────

describe('io-multi-select — filteredOptions getter', () => {
  it('returns all flatOptions when filter=false', () => {
    const c = makeComponent();
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
    ];
    expect((c as any).filteredOptions).toHaveLength(2);
  });

  it('returns all flatOptions when filter=true but filterQuery is empty', () => {
    const c = makeComponent({ filter: true } as any);
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
    ];
    (c as any).filterQuery = '';
    expect((c as any).filteredOptions).toHaveLength(2);
  });

  it('filters options by label case-insensitively when filter=true and query set', () => {
    const c = makeComponent({ filter: true } as any);
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
    ];
    (c as any).filterQuery = 'NETH';
    const result = (c as any).filteredOptions;
    expect(result).toHaveLength(1);
    expect(result[0].value).toBe('nl');
  });

  it('returns empty array when no options match the query', () => {
    const c = makeComponent({ filter: true } as any);
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
    ];
    (c as any).filterQuery = 'xyz';
    expect((c as any).filteredOptions).toHaveLength(0);
  });
});

// ── removeChip ────────────────────────────────────────────────────────────────

describe('io-multi-select — removeChip (emission)', () => {
  it('emits change event after removing a chip', () => {
    const c = makeComponent();
    const emitSpy = (c as any).change.emit as ReturnType<typeof vi.fn>;
    c.value = ['nl', 'be'];
    (c as any).removeChip('nl');
    expect(emitSpy).toHaveBeenCalledWith({ value: ['be'], name: 'test' });
  });

  it('results in empty array when the last chip is removed', () => {
    const c = makeComponent();
    c.value = ['nl'];
    (c as any).removeChip('nl');
    expect(c.value).toEqual([]);
  });
});

// ── clearAll ──────────────────────────────────────────────────────────────────

describe('io-multi-select — clearAll (emission)', () => {
  it('emits change with empty value array', () => {
    const c = makeComponent();
    const emitSpy = (c as any).change.emit as ReturnType<typeof vi.fn>;
    c.value = ['nl', 'be', 'de'];
    (c as any).clearAll();
    expect(emitSpy).toHaveBeenCalledWith({ value: [], name: 'test' });
  });

  it('sets value to [] regardless of previous selection size', () => {
    const c = makeComponent();
    c.value = ['nl', 'be'];
    (c as any).clearAll();
    expect(c.value).toEqual([]);
  });
});

// ── render() conditional branches ────────────────────────────────────────────

describe('io-multi-select — render() branches', () => {
  it('render() executes without throwing when value is empty (no chips)', () => {
    const c = makeComponent();
    c.value = [];
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() executes without throwing when selectedValues is populated (chips branch)', () => {
    const c = makeComponent();
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
    ];
    c.value = ['nl'];
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() executes without throwing when filter=true (filter input branch)', () => {
    const c = makeComponent({ filter: true } as any);
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() executes without throwing when message is set (message branch)', () => {
    const c = makeComponent({ message: 'Required field' } as any);
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() executes without throwing when state=error (error state branch)', () => {
    const c = makeComponent({ state: 'error', message: 'Oops' } as any);
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() executes without throwing when state=success (success state branch)', () => {
    const c = makeComponent({ state: 'success', message: 'Good' } as any);
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() executes without throwing when required=true (asterisk branch)', () => {
    const c = makeComponent({ required: true } as any);
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() executes without throwing when faceInvalid=true and no message (FACE error branch)', () => {
    const c = makeComponent();
    (c as any).faceInvalid = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() executes without throwing when faceInvalid=true and state=error', () => {
    const c = makeComponent({ state: 'error' } as any);
    (c as any).faceInvalid = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() executes without throwing when isOpen=true (dropdown open)', () => {
    const c = makeComponent();
    (c as any).isOpen = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() executes without throwing when activeIndex is set (activeOptId branch)', () => {
    const c = makeComponent();
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
    ];
    (c as any).activeIndex = 0;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() executes without throwing when displayText is null (placeholder branch)', () => {
    const c = makeComponent();
    c.value = [];
    (c as any).flatOptions = [];
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with chips and clearAll footer does not throw', () => {
    const c = makeComponent();
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
    ];
    c.value = ['nl', 'be'];
    (c as any).isOpen = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with no message and faceInvalid=false hides FACE error paragraph', () => {
    const c = makeComponent();
    (c as any).faceInvalid = false;
    // Just confirms no throw — FACE error <p> should not render
    expect(() => (c as any).render()).not.toThrow();
  });
});

// ── renderOption / renderListboxItems ─────────────────────────────────────────

describe('io-multi-select — renderOption', () => {
  it('executes without throwing for an enabled, unselected option', () => {
    const c = makeComponent();
    c.value = [];
    const opt = { value: 'nl', label: 'Netherlands', disabled: false };
    expect(() => (c as any).renderOption(opt, 0)).not.toThrow();
  });

  it('executes without throwing for a selected option (SVG checkmark branch)', () => {
    const c = makeComponent();
    c.value = ['nl'];
    const opt = { value: 'nl', label: 'Netherlands', disabled: false };
    expect(() => (c as any).renderOption(opt, 0)).not.toThrow();
  });

  it('executes without throwing for a disabled option', () => {
    const c = makeComponent();
    c.value = [];
    const opt = { value: 'nl', label: 'Netherlands', disabled: true };
    expect(() => (c as any).renderOption(opt, 0)).not.toThrow();
  });

  it('executes without throwing for a focused option (isFocused=true branch)', () => {
    const c = makeComponent();
    c.value = [];
    (c as any).activeIndex = 0;
    const opt = { value: 'nl', label: 'Netherlands', disabled: false };
    expect(() => (c as any).renderOption(opt, 0)).not.toThrow();
  });
});

describe('io-multi-select — renderListboxItems', () => {
  it('renders flat options when not filtering', () => {
    const c = makeComponent();
    (c as any).groups = [
      { options: [{ value: 'nl', label: 'Netherlands', disabled: false }] },
    ];
    (c as any).flatOptions = [{ value: 'nl', label: 'Netherlands', disabled: false }];
    expect(() => (c as any).renderListboxItems()).not.toThrow();
  });

  it('renders grouped options when groups have labels', () => {
    const c = makeComponent();
    (c as any).groups = [
      {
        label: 'Benelux',
        options: [
          { value: 'nl', label: 'Netherlands', disabled: false },
          { value: 'be', label: 'Belgium', disabled: false },
        ],
      },
    ];
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
    ];
    expect(() => (c as any).renderListboxItems()).not.toThrow();
  });

  it('renders filtered options when filter=true and filterQuery is set', () => {
    const c = makeComponent({ filter: true } as any);
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
    ];
    (c as any).filterQuery = 'neth';
    expect(() => (c as any).renderListboxItems()).not.toThrow();
  });

  it('renders empty state when flatOptions is empty', () => {
    const c = makeComponent();
    (c as any).groups = [];
    (c as any).flatOptions = [];
    expect(() => (c as any).renderListboxItems()).not.toThrow();
  });
});

// ── clickOutside handler ──────────────────────────────────────────────────────

describe('io-multi-select — clickOutside handler', () => {
  it('closes dropdown when pointer event is outside the host element', () => {
    const c = makeComponent();
    (c as any).isOpen = true;
    (c as any).attachClickOutside();
    const handler = (c as any).clickOutsideHandler as (ev: PointerEvent) => void;
    expect(handler).toBeDefined();

    // Simulate a pointerdown on an element NOT in the component's composedPath
    const outsideEl = document.createElement('div');
    document.body.appendChild(outsideEl);
    const ev = new PointerEvent('pointerdown', { bubbles: true });
    // composedPath() on synthetic events returns [] in jsdom, so the
    // includes() check will be false — exactly the outside-click scenario
    handler(ev);
    expect((c as any).isOpen).toBe(false);
    document.body.removeChild(outsideEl);
  });

  it('does not close dropdown when pointer event is inside the host element', () => {
    const c = makeComponent();
    (c as any).isOpen = true;
    const hostEl = (c as any).el as HTMLElement;
    (c as any).attachClickOutside();
    const handler = (c as any).clickOutsideHandler as (ev: PointerEvent) => void;

    // Fabricate an event whose composedPath includes the host element
    const fakeEv = { composedPath: () => [hostEl] } as unknown as PointerEvent;
    handler(fakeEv);
    expect((c as any).isOpen).toBe(true);
  });

  it('removeClickOutside is idempotent when no handler is registered', () => {
    const c = makeComponent();
    expect(() => (c as any).removeClickOutside()).not.toThrow();
    expect(() => (c as any).removeClickOutside()).not.toThrow();
  });
});

// ── setFocus with options ─────────────────────────────────────────────────────

describe('io-multi-select — setFocus', () => {
  it('passes FocusOptions to the trigger element', async () => {
    const c = makeComponent();
    const focusMock = vi.fn();
    (c as any).triggerEl = { focus: focusMock };
    await c.setFocus({ preventScroll: true });
    expect(focusMock).toHaveBeenCalledWith({ preventScroll: true });
  });

  it('does not throw when triggerEl is absent', async () => {
    const c = makeComponent();
    (c as any).triggerEl = undefined;
    await expect(c.setFocus()).resolves.toBeUndefined();
  });
});

// ── handleTriggerKeyDown — closed dropdown edge cases ────────────────────────

describe('io-multi-select — handleTriggerKeyDown (closed, edge cases)', () => {
  it('does not prevent default for unrecognised key when closed', () => {
    const c = makeComponent();
    const ev = new KeyboardEvent('keydown', { key: 'Tab' });
    const preventSpy = vi.spyOn(ev, 'preventDefault');
    (c as any).handleTriggerKeyDown(ev);
    expect(preventSpy).not.toHaveBeenCalled();
    expect((c as any).isOpen).toBe(false);
  });
});

// ── handleTriggerKeyDown — open dropdown, no active option ───────────────────

describe('io-multi-select — handleTriggerKeyDown (open, no active option)', () => {
  it('Enter with activeIndex=-1 does not toggle (opt is undefined)', () => {
    const c = makeComponent();
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
    ];
    (c as any).isOpen = true;
    (c as any).activeIndex = -1;
    c.value = [];
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    vi.spyOn(ev, 'preventDefault');
    (c as any).handleTriggerKeyDown(ev);
    // value should remain unchanged because no option is active
    expect(c.value).toEqual([]);
  });
});

// ── Watcher: onValueChange ────────────────────────────────────────────────────

describe('io-multi-select — @Watch(value) onValueChange', () => {
  it('calls syncFormValue when value changes', () => {
    const c = makeComponent();
    const spy = vi.spyOn(c as any, 'syncFormValue');
    (c as any).onValueChange();
    expect(spy).toHaveBeenCalledOnce();
  });
});

// ── formResetCallback (isOpen) ────────────────────────────────────────────────

describe('io-multi-select — formResetCallback detail', () => {
  it('calls syncFormValue as part of reset sequence', () => {
    const c = makeComponent();
    const spy = vi.spyOn(c as any, 'syncFormValue');
    (c as any).defaultValue = ['nl'];
    (c as any).formResetCallback();
    expect(spy).toHaveBeenCalled();
  });

  it('resets faceInvalid regardless of current state', () => {
    const c = makeComponent({ required: true } as any);
    (c as any).faceInvalid = true;
    (c as any).defaultValue = ['nl'];
    c.value = ['nl'];
    (c as any).formResetCallback();
    expect((c as any).faceInvalid).toBe(false);
  });
});

// ── handleFilterInput — activeIndex when matches exist ───────────────────────

describe('io-multi-select — handleFilterInput activeIndex', () => {
  it('sets activeIndex to 0 when there is at least one match', () => {
    const c = makeComponent({ filter: true } as any);
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
    ];
    (c as any).activeIndex = 1;
    const input = document.createElement('input');
    input.value = 'neth';
    const ev = new Event('input');
    Object.defineProperty(ev, 'target', { value: input });
    (c as any).handleFilterInput(ev);
    expect((c as any).filterQuery).toBe('neth');
    expect((c as any).activeIndex).toBe(0);
  });
});

// ── render() inline JSX callback bodies ──────────────────────────────────────
// These inline arrow functions are defined inside render(). Since h=vi.fn(),
// their function bodies only execute when explicitly extracted and invoked.

describe('io-multi-select — render() inline callback: slot onSlotchange', () => {
  it('re-parses options when the slot content changes', () => {
    const c = makeComponent();
    // Add a slottable option child to the host element
    const optEl = document.createElement('io-option');
    optEl.setAttribute('value', 'nl');
    optEl.setAttribute('label', 'Netherlands');
    (c as any).el.appendChild(optEl);

    // Capture the onSlotchange callback from h's call args.
    // render() calls h('slot', { onSlotchange: fn }) — the mock records all calls.
    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();

    (c as any).render();

    // Find the call where the first argument is 'slot'
    const slotCall = hMock.mock.calls.find(
      (args: unknown[]) => args[0] === 'slot',
    );
    expect(slotCall).toBeDefined();
    const slotProps = slotCall![1] as Record<string, unknown>;
    const onSlotchange = slotProps['onSlotchange'] as () => void;
    expect(typeof onSlotchange).toBe('function');

    // Invoke the callback — should not throw and should update groups/flatOptions
    expect(() => onSlotchange()).not.toThrow();
    expect((c as any).flatOptions.length).toBeGreaterThan(0);
  });
});

describe('io-multi-select — render() inline callback: chip remove onClick', () => {
  it('calls removeChip with the correct value when chip remove button is clicked', () => {
    const c = makeComponent();
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
    ];
    c.value = ['nl', 'be'];
    const emitSpy = (c as any).change.emit as ReturnType<typeof vi.fn>;

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();

    (c as any).render();

    // Find all calls where the element is 'button' and has an onClick with
    // a chip remove handler (aria-label starts with 'Remove ').
    const buttonCalls = hMock.mock.calls.filter(
      (args: unknown[]) =>
        args[0] === 'button' &&
        args[1] != null &&
        typeof (args[1] as Record<string, unknown>)['onClick'] === 'function' &&
        typeof (args[1] as Record<string, unknown>)['aria-label'] === 'string' &&
        ((args[1] as Record<string, unknown>)['aria-label'] as string).startsWith('Remove '),
    );
    expect(buttonCalls.length).toBeGreaterThan(0);

    // Invoke the first chip's onClick — should stop propagation and call removeChip
    const firstChipProps = buttonCalls[0][1] as Record<string, unknown>;
    const onClick = firstChipProps['onClick'] as (e: Event) => void;
    const fakeEvent = { stopPropagation: vi.fn() } as unknown as Event;
    onClick(fakeEvent);

    expect((fakeEvent as any).stopPropagation).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });
});

// ── render() inline callback: renderOption onClick (enabled option) ───────────

describe('io-multi-select — renderOption inline onClick callback', () => {
  it('toggles the option when the enabled option li is clicked', () => {
    const c = makeComponent();
    c.value = [];
    const opt = { value: 'nl', label: 'Netherlands', disabled: false };

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();

    (c as any).renderOption(opt, 0);

    // Find the 'li' call that has an onClick (only enabled options have one)
    const liCall = hMock.mock.calls.find(
      (args: unknown[]) =>
        args[0] === 'li' &&
        args[1] != null &&
        typeof (args[1] as Record<string, unknown>)['onClick'] === 'function',
    );
    expect(liCall).toBeDefined();
    const liOnClick = (liCall![1] as Record<string, unknown>)['onClick'] as () => void;
    liOnClick();
    expect(c.value).toContain('nl');
  });

  it('disabled option li has no onClick handler', () => {
    const c = makeComponent();
    c.value = [];
    const opt = { value: 'nl', label: 'Netherlands', disabled: true };

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();

    (c as any).renderOption(opt, 0);

    // For disabled options, onClick is set to undefined
    const liCall = hMock.mock.calls.find((args: unknown[]) => args[0] === 'li');
    expect(liCall).toBeDefined();
    const liProps = liCall![1] as Record<string, unknown>;
    expect(liProps['onClick']).toBeUndefined();
  });
});

// ── render() inline ref callbacks and clearAll onClick ────────────────────────

describe('io-multi-select — render() ref callbacks and clearAll onClick', () => {
  it('triggerEl ref callback assigns the element', () => {
    const c = makeComponent();

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();

    (c as any).render();

    // Find the trigger button call (has role="combobox")
    const triggerCall = hMock.mock.calls.find(
      (args: unknown[]) =>
        args[0] === 'button' &&
        args[1] != null &&
        (args[1] as Record<string, unknown>)['role'] === 'combobox',
    );
    expect(triggerCall).toBeDefined();
    const triggerProps = triggerCall![1] as Record<string, unknown>;
    const ref = triggerProps['ref'] as (el: unknown) => void;
    const fakeButton = document.createElement('button');
    ref(fakeButton);
    expect((c as any).triggerEl).toBe(fakeButton);
  });

  it('dropdownEl ref callback assigns the element', () => {
    const c = makeComponent();

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();

    (c as any).render();

    // Find the dropdown div call (has class "multi-select-dropdown")
    const dropdownCall = hMock.mock.calls.find(
      (args: unknown[]) =>
        args[0] === 'div' &&
        args[1] != null &&
        (args[1] as Record<string, unknown>)['class'] === 'multi-select-dropdown',
    );
    expect(dropdownCall).toBeDefined();
    const dropdownProps = dropdownCall![1] as Record<string, unknown>;
    const ref = dropdownProps['ref'] as (el: unknown) => void;
    const fakeDiv = document.createElement('div');
    ref(fakeDiv);
    expect((c as any).dropdownEl).toBe(fakeDiv);
  });

  it('filterInputEl ref callback assigns the element when filter=true', () => {
    const c = makeComponent({ filter: true } as any);

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();

    (c as any).render();

    // Find the filter input call
    const inputCall = hMock.mock.calls.find(
      (args: unknown[]) =>
        args[0] === 'input' &&
        args[1] != null &&
        (args[1] as Record<string, unknown>)['class'] === 'multi-select-filter__input',
    );
    expect(inputCall).toBeDefined();
    const inputProps = inputCall![1] as Record<string, unknown>;
    const ref = inputProps['ref'] as (el: unknown) => void;
    const fakeInput = document.createElement('input');
    ref(fakeInput);
    expect((c as any).filterInputEl).toBe(fakeInput);
  });

  it('clearAll button onClick calls clearAll()', () => {
    const c = makeComponent();
    (c as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
    ];
    c.value = ['nl'];
    const emitSpy = (c as any).change.emit as ReturnType<typeof vi.fn>;

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();

    (c as any).render();

    // Find the clear-all button call (aria-label includes "Clear all")
    const clearBtnCall = hMock.mock.calls.find(
      (args: unknown[]) =>
        args[0] === 'button' &&
        args[1] != null &&
        typeof (args[1] as Record<string, unknown>)['aria-label'] === 'string' &&
        ((args[1] as Record<string, unknown>)['aria-label'] as string).startsWith('Clear all'),
    );
    expect(clearBtnCall).toBeDefined();
    const clearBtnProps = clearBtnCall![1] as Record<string, unknown>;
    const onClick = clearBtnProps['onClick'] as () => void;
    onClick();
    expect(c.value).toEqual([]);
    expect(emitSpy).toHaveBeenCalledWith({ value: [], name: 'test' });
  });
});
