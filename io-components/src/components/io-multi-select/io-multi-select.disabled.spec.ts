/**
 * io-multi-select — disabled-state tests
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoMultiSelect } from './io-multi-select';

describe('io-multi-select — disabled state', () => {
  let component: IoMultiSelect;

  beforeEach(() => {
    component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    (component as any).change = { emit: vi.fn() };
    component.name = 'test';
    component.disabled = true;
    (component as any).componentWillLoad();
  });

  it('disabled prop is true', () => {
    expect(component.disabled).toBe(true);
  });

  it('does not open the dropdown on trigger click when disabled', () => {
    (component as any).handleTriggerClick();
    expect((component as any).isOpen).toBe(false);
  });

  it('does not open on keydown when disabled', () => {
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    vi.spyOn(ev, 'preventDefault');
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).isOpen).toBe(false);
  });

  it('does not respond to Space when disabled', () => {
    const ev = new KeyboardEvent('keydown', { key: ' ' });
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).isOpen).toBe(false);
  });

  it('does not respond to ArrowDown when disabled', () => {
    const ev = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    (component as any).handleTriggerKeyDown(ev);
    expect((component as any).isOpen).toBe(false);
  });
});

describe('io-multi-select — disabled individual option', () => {
  it('does not toggle a disabled option', () => {
    const component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    const emitSpy = vi.fn();
    (component as any).change = { emit: emitSpy };
    component.name = 'test';
    component.value = [];
    (component as any).componentWillLoad();
    (component as any).toggleOption({ value: 'nl', label: 'Netherlands', disabled: true });
    expect(component.value).toEqual([]);
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
