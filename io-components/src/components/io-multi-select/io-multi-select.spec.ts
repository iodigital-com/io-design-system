/**
 * io-multi-select — default props / render tests
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoMultiSelect } from './io-multi-select';

describe('io-multi-select — default props', () => {
  let component: IoMultiSelect;

  beforeEach(() => {
    component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    (component as any).change = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('has empty value array by default', () => {
    expect(component.value).toEqual([]);
  });

  it('has placeholder "Select options" by default', () => {
    expect(component.placeholder).toBe('Select options');
  });

  it('is not required by default', () => {
    expect(component.required).toBe(false);
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('has state "none" by default', () => {
    expect(component.state).toBe('none');
  });

  it('has no message by default', () => {
    expect(component.message).toBeUndefined();
  });

  it('has filter false by default', () => {
    expect(component.filter).toBe(false);
  });

  it('has dropdownDirection "auto" by default', () => {
    expect(component.dropdownDirection).toBe('auto');
  });

  it('has maxDisplay 3 by default', () => {
    expect(component.maxDisplay).toBe(3);
  });

  it('is not open by default', () => {
    expect((component as any).isOpen).toBe(false);
  });

  it('has activeIndex -1 by default', () => {
    expect((component as any).activeIndex).toBe(-1);
  });

  it('has empty filterQuery by default', () => {
    expect((component as any).filterQuery).toBe('');
  });

  it('faceInvalid is false by default', () => {
    expect((component as any).faceInvalid).toBe(false);
  });
});

describe('io-multi-select — componentWillLoad', () => {
  it('generates a fieldId from the name prop', () => {
    const component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    component.name = 'countries';
    (component as any).componentWillLoad();
    expect((component as any).fieldId).toContain('io-multi-select-countries-');
  });

  it('generates a fallback fieldId when name contains special chars', () => {
    const component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    component.name = '!!!';
    (component as any).componentWillLoad();
    expect((component as any).fieldId).toContain('io-multi-select-');
  });

  it('captures defaultValue from initial value prop', () => {
    const component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    component.value = ['nl', 'be'];
    (component as any).componentWillLoad();
    expect((component as any).defaultValue).toEqual(['nl', 'be']);
  });
});

describe('io-multi-select — formResetCallback', () => {
  it('restores value to defaultValue', () => {
    const component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    component.value = ['nl', 'be'];
    (component as any).componentWillLoad();
    component.value = ['de'];
    (component as any).formResetCallback();
    expect(component.value).toEqual(['nl', 'be']);
  });

  it('clears faceInvalid on reset', () => {
    const component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    (component as any).componentWillLoad();
    (component as any).faceInvalid = true;
    (component as any).formResetCallback();
    expect((component as any).faceInvalid).toBe(false);
  });
});

describe('io-multi-select — toggleOption', () => {
  let component: IoMultiSelect;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    emitSpy = vi.fn();
    (component as any).change = { emit: emitSpy };
    component.name = 'test';
    (component as any).componentWillLoad();
  });

  it('adds value when option is not yet selected', () => {
    component.value = [];
    (component as any).toggleOption({ value: 'nl', label: 'Netherlands' });
    expect(component.value).toContain('nl');
  });

  it('removes value when option is already selected', () => {
    component.value = ['nl', 'be'];
    (component as any).toggleOption({ value: 'nl', label: 'Netherlands' });
    expect(component.value).not.toContain('nl');
    expect(component.value).toContain('be');
  });

  it('emits change with updated array', () => {
    component.value = [];
    (component as any).toggleOption({ value: 'nl', label: 'Netherlands' });
    expect(emitSpy).toHaveBeenCalledWith({ value: ['nl'], name: 'test' });
  });

  it('does not toggle a disabled option', () => {
    component.value = [];
    (component as any).toggleOption({ value: 'nl', label: 'Netherlands', disabled: true });
    expect(component.value).toEqual([]);
    expect(emitSpy).not.toHaveBeenCalled();
  });
});

describe('io-multi-select — removeChip', () => {
  it('removes the chip value from the selection', () => {
    const component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    (component as any).change = { emit: vi.fn() };
    component.name = 'test';
    component.value = ['nl', 'be'];
    (component as any).componentWillLoad();
    (component as any).removeChip('nl');
    expect(component.value).toEqual(['be']);
  });
});

describe('io-multi-select — clearAll', () => {
  it('sets value to empty array', () => {
    const component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    const emitSpy = vi.fn();
    (component as any).change = { emit: emitSpy };
    component.name = 'test';
    component.value = ['nl', 'be'];
    (component as any).componentWillLoad();
    (component as any).clearAll();
    expect(component.value).toEqual([]);
    expect(emitSpy).toHaveBeenCalledWith({ value: [], name: 'test' });
  });
});

describe('io-multi-select — setFocus', () => {
  it('focuses the trigger element', async () => {
    const component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    (component as any).componentWillLoad();
    const focusSpy = vi.fn();
    (component as any).triggerEl = { focus: focusSpy };
    await component.setFocus();
    expect(focusSpy).toHaveBeenCalled();
  });
});
