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
    const { component } = makeComponent({ filter: true } as any);
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
    const { component } = makeComponent({ filter: true } as any);
    (component as any).flatOptions = [{ value: 'nl', label: 'Netherlands' }];
    const input = document.createElement('input');
    input.value = 'xyz';
    const ev = new Event('input');
    Object.defineProperty(ev, 'target', { value: input });
    (component as any).handleFilterInput(ev);
    expect((component as any).activeIndex).toBe(-1);
  });

  it('closes dropdown on Escape in filter', () => {
    const { component } = makeComponent({ filter: true } as any);
    (component as any).isOpen = true;
    const ev = new KeyboardEvent('keydown', { key: 'Escape' });
    vi.spyOn(ev, 'stopPropagation');
    (component as any).handleFilterKeyDown(ev);
    expect((component as any).isOpen).toBe(false);
  });

  it('toggles option on Enter in filter', () => {
    const { component } = makeComponent({ filter: true } as any);
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
