/**
 * io-multi-select — keyboard / event-emission tests
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoMultiSelect } from './io-multi-select';

function makeComponent(overrides: Partial<IoMultiSelect> = {}) {
  const component = new IoMultiSelect();
  (component as any).el = document.createElement('io-multi-select');
  const emitSpy = vi.fn();
  (component as any).change = { emit: emitSpy };
  component.name = 'test';
  Object.assign(component, overrides);
  (component as any).componentWillLoad();
  return { component, emitSpy };
}

describe('io-multi-select — trigger click', () => {
  it('opens the dropdown on trigger click', () => {
    const { component } = makeComponent();
    (component as any).handleTriggerClick();
    expect((component as any).isOpen).toBe(true);
  });

  it('closes the dropdown on second trigger click', () => {
    const { component } = makeComponent();
    (component as any).isOpen = true;
    (component as any).handleTriggerClick();
    expect((component as any).isOpen).toBe(false);
  });

  it('does not open when disabled', () => {
    const { component } = makeComponent({ disabled: true } as any);
    (component as any).handleTriggerClick();
    expect((component as any).isOpen).toBe(false);
  });
});

describe('io-multi-select — trigger keydown (closed)', () => {
  it('opens on Enter', () => {
    const { component } = makeComponent();
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).isOpen).toBe(true);
  });

  it('opens on Space', () => {
    const { component } = makeComponent();
    const ev = new KeyboardEvent('keydown', { key: ' ' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).isOpen).toBe(true);
  });

  it('opens on ArrowDown', () => {
    const { component } = makeComponent();
    const ev = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).isOpen).toBe(true);
  });

  it('opens on ArrowUp and moves focus to last option', () => {
    const { component } = makeComponent();
    (component as any).flatOptions = [
      { value: 'nl', label: 'Netherlands' },
      { value: 'be', label: 'Belgium' },
    ];
    const ev = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).isOpen).toBe(true);
    expect((component as any).activeIndex).toBe(1);
  });

  it('does not open on unrecognised key', () => {
    const { component } = makeComponent();
    const ev = new KeyboardEvent('keydown', { key: 'a' });
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).isOpen).toBe(false);
  });
});

describe('io-multi-select — trigger keydown (open)', () => {
  let component: IoMultiSelect;

  beforeEach(() => {
    ({ component } = makeComponent());
    (component as any).flatOptions = [
      { value: 'nl', label: 'Netherlands' },
      { value: 'be', label: 'Belgium' },
      { value: 'de', label: 'Germany', disabled: true },
    ];
    (component as any).isOpen = true;
    (component as any).activeIndex = 0;
  });

  it('closes on Escape', () => {
    const ev = new KeyboardEvent('keydown', { key: 'Escape' });
    vi.spyOn(ev, 'stopPropagation');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).isOpen).toBe(false);
  });

  it('moves active index forward on ArrowDown', () => {
    const ev = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).activeIndex).toBe(1);
  });

  it('moves active index backward on ArrowUp', () => {
    (component as any).activeIndex = 1;
    const ev = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).activeIndex).toBe(0);
  });

  it('wraps from last to first on ArrowDown', () => {
    (component as any).activeIndex = 1;
    const ev = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    vi.spyOn(ev, 'preventDefault');
    // Third option is disabled so it wraps to 0
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).activeIndex).toBe(0);
  });

  it('moves to first enabled option on Home', () => {
    (component as any).activeIndex = 1;
    const ev = new KeyboardEvent('keydown', { key: 'Home' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).activeIndex).toBe(0);
  });

  it('moves to last enabled option on End', () => {
    const ev = new KeyboardEvent('keydown', { key: 'End' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).activeIndex).toBe(1); // index 2 is disabled
  });

  it('toggles option on Enter', () => {
    component.value = [];
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect(component.value).toContain('nl');
  });

  it('toggles option on Space', () => {
    component.value = [];
    const ev = new KeyboardEvent('keydown', { key: ' ' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect(component.value).toContain('nl');
  });

  it('closes on Tab without toggling', () => {
    component.value = [];
    const ev = new KeyboardEvent('keydown', { key: 'Tab' });
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).isOpen).toBe(false);
    expect(component.value).toEqual([]);
  });
});

describe('io-multi-select — filter input events', () => {
  it('updates filterQuery on input', () => {
    const { component } = makeComponent({ filterable: true } as any);
    (component as any).flatOptions = [
      { value: 'nl', label: 'Netherlands' },
      { value: 'be', label: 'Belgium' },
    ];
    const input = document.createElement('input');
    input.value = 'neth';
    const ev = new Event('input');
    Object.defineProperty(ev, 'target', { value: input });
    (component as any).handleFilterInput(ev);
    expect((component as any).filterQuery).toBe('neth');
    expect((component as any).activeIndex).toBe(0); // one match
  });

  it('sets activeIndex to -1 when no matches', () => {
    const { component } = makeComponent({ filterable: true } as any);
    (component as any).flatOptions = [{ value: 'nl', label: 'Netherlands' }];
    const input = document.createElement('input');
    input.value = 'xyz';
    const ev = new Event('input');
    Object.defineProperty(ev, 'target', { value: input });
    (component as any).handleFilterInput(ev);
    expect((component as any).activeIndex).toBe(-1);
  });

  it('closes dropdown on Escape in filter', () => {
    const { component } = makeComponent({ filterable: true } as any);
    (component as any).isOpen = true;
    const ev = new KeyboardEvent('keydown', { key: 'Escape' });
    vi.spyOn(ev, 'stopPropagation');
    (component as any).handleFilterKeyDown(ev);
    expect((component as any).isOpen).toBe(false);
  });

  it('toggles option on Enter in filter', () => {
    const { component } = makeComponent({ filterable: true } as any);
    (component as any).flatOptions = [{ value: 'nl', label: 'Netherlands' }];
    (component as any).activeIndex = 0;
    component.value = [];
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleFilterKeyDown(ev);
    expect(component.value).toContain('nl');
  });
});

describe('io-multi-select — change event', () => {
  it('emits change with name and new value array', () => {
    const { component, emitSpy } = makeComponent();
    (component as any).flatOptions = [{ value: 'nl', label: 'Netherlands' }];
    component.value = [];
    (component as any).toggleOption({ value: 'nl', label: 'Netherlands' });
    expect(emitSpy).toHaveBeenCalledWith({ value: ['nl'], name: 'test' });
  });
});

describe('io-multi-select — blur event', () => {
  it('emits blur when trigger loses focus and dropdown is closed', () => {
    const { component } = makeComponent();
    const blurEmitSpy = vi.fn();
    (component as any).blur = { emit: blurEmitSpy };
    (component as any).isOpen = false;

    const ev = new FocusEvent('blur');
    (component as any).handleTriggerBlur(ev);

    expect(blurEmitSpy).toHaveBeenCalledOnce();
  });

  it('does not emit blur when trigger loses focus but dropdown is open', () => {
    const { component } = makeComponent();
    const blurEmitSpy = vi.fn();
    (component as any).blur = { emit: blurEmitSpy };
    (component as any).isOpen = true;

    const ev = new FocusEvent('blur');
    (component as any).handleTriggerBlur(ev);

    expect(blurEmitSpy).not.toHaveBeenCalled();
  });
});

describe('io-multi-select — toggle event', () => {
  it('emits toggle with open=true when dropdown opens', () => {
    const { component } = makeComponent();
    const toggleEmitSpy = vi.fn();
    (component as any).toggle = { emit: toggleEmitSpy };
    (component as any).attachClickOutside = vi.fn();
    (component as any).positionDropdown = vi.fn().mockResolvedValue(undefined);

    (component as any).onIsOpenChange(true);

    expect(toggleEmitSpy).toHaveBeenCalledWith({ open: true });
  });

  it('emits toggle with open=false when dropdown closes', () => {
    const { component } = makeComponent();
    const toggleEmitSpy = vi.fn();
    (component as any).toggle = { emit: toggleEmitSpy };
    (component as any).removeClickOutside = vi.fn();

    (component as any).onIsOpenChange(false);

    expect(toggleEmitSpy).toHaveBeenCalledWith({ open: false });
  });
});

// ── #1053 PageUp / PageDown navigation ────────────────────────────────────────

describe('io-multi-select — PageUp/PageDown navigation (#1053)', () => {
  let component: IoMultiSelect;

  beforeEach(() => {
    ({ component } = makeComponent());
    // 25 options: indices 0–24
    (component as any).flatOptions = Array.from({ length: 25 }, (_, i) => ({
      value: String(i),
      label: `Option ${i}`,
    }));
    (component as any).isOpen = true;
    (component as any).activeIndex = 5;
  });

  it('advances activeIndex by 10 on PageDown', () => {
    const ev = new KeyboardEvent('keydown', { key: 'PageDown' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).activeIndex).toBe(15);
  });

  it('clamps to last option when PageDown would exceed bounds', () => {
    (component as any).activeIndex = 20;
    const ev = new KeyboardEvent('keydown', { key: 'PageDown' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).activeIndex).toBe(24);
  });

  it('retreats activeIndex by 10 on PageUp', () => {
    (component as any).activeIndex = 15;
    const ev = new KeyboardEvent('keydown', { key: 'PageUp' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).activeIndex).toBe(5);
  });

  it('clamps to first option when PageUp would go below 0', () => {
    (component as any).activeIndex = 3;
    const ev = new KeyboardEvent('keydown', { key: 'PageUp' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).activeIndex).toBe(0);
  });
});

// ── #1077 Typeahead character search ──────────────────────────────────────────

describe('io-multi-select — typeahead character search (#1077)', () => {
  let component: IoMultiSelect;

  beforeEach(() => {
    ({ component } = makeComponent());
    (component as any).flatOptions = [
      { value: 'nl', label: 'Netherlands' },
      { value: 'be', label: 'Belgium' },
      { value: 'de', label: 'Germany' },
      { value: 'no', label: 'Norway' },
    ];
    (component as any).isOpen = true;
    (component as any).activeIndex = -1;
  });

  it('jumps to first option whose label starts with pressed letter', () => {
    const ev = new KeyboardEvent('keydown', { key: 'g' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).activeIndex).toBe(2); // Germany
  });

  it('cycles to next match on repeated same-letter press', () => {
    (component as any).activeIndex = 0; // Netherlands
    const ev1 = new KeyboardEvent('keydown', { key: 'n' });
    vi.spyOn(ev1, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev1);
    expect((component as any).activeIndex).toBe(3); // Norway
  });

  it('does not interfere with filter input mode (filter=true)', () => {
    component.filterable = true;
    (component as any).activeIndex = 0;
    const ev = new KeyboardEvent('keydown', { key: 'g' });
    (component as any).handleTriggerKeyDown(ev);
    // should not call handleTypeahead; index stays 0
    expect((component as any).activeIndex).toBe(0);
  });

  it('skips disabled options during typeahead', () => {
    (component as any).flatOptions = [
      { value: 'de', label: 'Denmark', disabled: true },
      { value: 'dk', label: 'Deutscheland' },
    ];
    (component as any).activeIndex = -1;
    const ev = new KeyboardEvent('keydown', { key: 'd' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).activeIndex).toBe(1); // skips disabled Denmark
  });
});

// ── #1070 maxSelections cap ────────────────────────────────────────────────────

describe('io-multi-select — maxSelections cap (#1070)', () => {
  let component: IoMultiSelect;
  let emitSpy: ReturnType<typeof vi.fn>;
  let limitEmitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    ({ component, emitSpy } = makeComponent());
    limitEmitSpy = vi.fn();
    (component as any).limitreached = { emit: limitEmitSpy };
    component.maxSelections = 2;
    (component as any).flatOptions = [
      { value: 'nl', label: 'Netherlands' },
      { value: 'be', label: 'Belgium' },
      { value: 'de', label: 'Germany' },
    ];
  });

  it('allows selection up to maxSelections', () => {
    component.value = [];
    (component as any).toggleOption({ value: 'nl', label: 'Netherlands' });
    (component as any).toggleOption({ value: 'be', label: 'Belgium' });
    expect(component.value).toEqual(['nl', 'be']);
    expect(limitEmitSpy).not.toHaveBeenCalled();
  });

  it('blocks adding a value past maxSelections and emits limitreached', () => {
    component.value = ['nl', 'be'];
    (component as any).toggleOption({ value: 'de', label: 'Germany' });
    expect(component.value).toEqual(['nl', 'be']); // no change
    expect(limitEmitSpy).toHaveBeenCalledWith({ max: 2, attempted: 'de' });
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('allows deselection even when at cap', () => {
    component.value = ['nl', 'be'];
    (component as any).toggleOption({ value: 'nl', label: 'Netherlands' });
    expect(component.value).toEqual(['be']);
    expect(limitEmitSpy).not.toHaveBeenCalled();
  });
});

// ── #1069 select all affordance ───────────────────────────────────────────────

describe('io-multi-select — selectAll affordance (#1069)', () => {
  let component: IoMultiSelect;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    ({ component, emitSpy } = makeComponent());
    component.selectAll = true;
    (component as any).flatOptions = [
      { value: 'nl', label: 'Netherlands' },
      { value: 'be', label: 'Belgium' },
      { value: 'de', label: 'Germany', disabled: true },
    ];
    component.value = [];
  });

  it('selectAllVisible selects all non-disabled options', () => {
    (component as any).selectAllVisible();
    expect(component.value).toContain('nl');
    expect(component.value).toContain('be');
    expect(component.value).not.toContain('de'); // disabled
    expect(emitSpy).toHaveBeenCalledWith({ value: ['nl', 'be'], name: 'test' });
  });

  it('does not re-add already selected options', () => {
    component.value = ['nl'];
    (component as any).selectAllVisible();
    expect(component.value).toEqual(['nl', 'be']);
  });

  it('respects maxSelections when selecting all', () => {
    const limitEmitSpy = vi.fn();
    (component as any).limitreached = { emit: limitEmitSpy };
    component.maxSelections = 1;
    (component as any).selectAllVisible();
    expect(component.value).toHaveLength(1);
    expect(limitEmitSpy).toHaveBeenCalled();
  });

  it('selects only filteredOptions when filter is active', () => {
    component.filterable = true;
    (component as any).filterQuery = 'nether';
    (component as any).selectAllVisible();
    expect(component.value).toContain('nl');
    expect(component.value).not.toContain('be');
  });
});

// ── #1111 trigger-level clear button ─────────────────────────────────────────
// Styles are tested in io-multi-select.spec.ts which already imports the styles module.
