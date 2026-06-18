/**
 * io-multi-select — default props / render tests
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';
import { getMultiSelectStyles } from './io-multi-select-styles';

vi.mock('@floating-ui/dom', () => ({
  computePosition: vi.fn().mockResolvedValue({ x: 42, y: 84 }),
  offset: vi.fn(() => ({ name: 'offset' })),
  flip: vi.fn(() => ({ name: 'flip' })),
  shift: vi.fn(() => ({ name: 'shift' })),
}));

import { computePosition } from '@floating-ui/dom';
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

// ── positionDropdown ───────────────────────────────────────────────────────────

describe('io-multi-select — positionDropdown', () => {
  it('uses top-start placement when dropdownDirection is "up"', async () => {
    const component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    (component as any).componentWillLoad();

    const triggerEl = document.createElement('button');
    triggerEl.getBoundingClientRect = vi.fn(() => ({ width: 200 } as DOMRect));
    const dropdownEl = document.createElement('div');
    dropdownEl.style.left = '';
    dropdownEl.style.top = '';
    dropdownEl.style.width = '';

    (component as any).triggerEl = triggerEl;
    (component as any).dropdownEl = dropdownEl;
    component.dropdownDirection = 'up';

    vi.mocked(computePosition).mockResolvedValueOnce({ x: 10, y: 20, middlewareData: {}, placement: 'top-start' });

    await (component as any).positionDropdown();

    expect(vi.mocked(computePosition)).toHaveBeenCalledWith(
      triggerEl,
      dropdownEl,
      expect.objectContaining({ placement: 'top-start' }),
    );
    expect(dropdownEl.style.left).toBe('10px');
    expect(dropdownEl.style.top).toBe('20px');
    expect(dropdownEl.style.width).toBe('200px');
  });
});

describe('io-multi-select — positionDropdown auto vs pinned', () => {
  it('uses bottom-start placement and flip middleware when dropdownDirection is "auto"', async () => {
    const component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    (component as any).componentWillLoad();

    const triggerEl = document.createElement('button');
    triggerEl.getBoundingClientRect = vi.fn(() => ({ width: 200 } as DOMRect));
    const dropdownEl = document.createElement('div');
    dropdownEl.style.left = '';
    dropdownEl.style.top = '';
    dropdownEl.style.width = '';

    (component as any).triggerEl = triggerEl;
    (component as any).dropdownEl = dropdownEl;
    component.dropdownDirection = 'auto';

    vi.mocked(computePosition).mockResolvedValueOnce({ x: 0, y: 100, middlewareData: {}, placement: 'bottom-start' });

    await (component as any).positionDropdown();

    // For auto, middleware array has 3 items (offset + flip + shift)
    const call = vi.mocked(computePosition).mock.calls.at(-1)!;
    expect(call[2].placement).toBe('bottom-start');
    expect(call[2].middleware).toHaveLength(3);
  });

  it('uses bottom-start placement and pinned middleware (no flip) when dropdownDirection is "down"', async () => {
    const component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    (component as any).componentWillLoad();

    const triggerEl = document.createElement('button');
    triggerEl.getBoundingClientRect = vi.fn(() => ({ width: 200 } as DOMRect));
    const dropdownEl = document.createElement('div');

    (component as any).triggerEl = triggerEl;
    (component as any).dropdownEl = dropdownEl;
    component.dropdownDirection = 'down';

    vi.mocked(computePosition).mockResolvedValueOnce({ x: 0, y: 100, middlewareData: {}, placement: 'bottom-start' });

    await (component as any).positionDropdown();

    // For pinned (down), middleware array has 2 items (offset + shift, no flip)
    const call = vi.mocked(computePosition).mock.calls.at(-1)!;
    expect(call[2].placement).toBe('bottom-start');
    expect(call[2].middleware).toHaveLength(2);
  });
});

describe('io-multi-select — formDisabledCallback', () => {
  let component: IoMultiSelect;

  beforeEach(() => {
    component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    component.name = 'test';
    (component as any).componentWillLoad();
  });

  it('sets disabled to true when formDisabledCallback(true) is called', () => {
    (component as any).formDisabledCallback(true);
    expect(component.disabled).toBe(true);
  });

  it('sets disabled to false when formDisabledCallback(false) is called', () => {
    component.disabled = true;
    (component as any).formDisabledCallback(false);
    expect(component.disabled).toBe(false);
  });
});

describe('io-multi-select — hideLabel prop', () => {
  let component: IoMultiSelect;

  beforeEach(() => {
    component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    component.name = 'test';
    component.label = 'Countries';
  });

  it('defaults hideLabel to false', () => {
    expect(component.hideLabel).toBe(false);
  });

  it('accepts hideLabel=true', () => {
    component.hideLabel = true;
    expect(component.hideLabel).toBe(true);
  });

  it('warns when hideLabel=true and label is empty string', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.label = '' as any;
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).toHaveBeenCalledWith('[io-multi-select] hideLabel=true requires a non-empty label for accessibility.');
    warnSpy.mockRestore();
  });

  it('does not warn when hideLabel=true and label is provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('does not warn when hideLabel=true and label is empty but host has aria-label', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    (component as any).el.setAttribute('aria-label', 'External label');
    component.label = '' as any;
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('io-multi-select — chip remove button touch target (WCAG 2.5.8)', () => {
  it('chip remove button has min-width: 24px in styles', () => {
    const styles = getMultiSelectStyles();
    expect(styles).toContain('.multi-select-chip__remove');
    expect(styles).toContain('min-width: 24px');
  });

  it('chip remove button has min-height: 24px in styles', () => {
    const styles = getMultiSelectStyles();
    expect(styles).toContain('min-height: 24px');
  });
});

describe('io-multi-select — hideLabel render', () => {
  let component: IoMultiSelect;

  function makeRenderComp(overrides: Partial<IoMultiSelect> = {}): IoMultiSelect {
    const comp = new IoMultiSelect();
    (comp as any).el = document.createElement('io-multi-select');
    (comp as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (comp as any).change = { emit: vi.fn() };
    comp.name = 'test';
    comp.label = 'Countries';
    Object.assign(comp, overrides);
    (comp as any).componentWillLoad();
    return comp;
  }

  beforeEach(() => {
    component = makeRenderComp();
  });

  it('does not render label element when hideLabel=true', () => {
    component.hideLabel = true;
    vi.mocked(h).mockClear();
    component.render();
    const labelCalls = vi.mocked(h).mock.calls.filter(args => args[0] === 'label');
    expect(labelCalls).toHaveLength(0);
  });

  it('renders label element when hideLabel=false', () => {
    component.hideLabel = false;
    vi.mocked(h).mockClear();
    component.render();
    const labelCalls = vi.mocked(h).mock.calls.filter(args => args[0] === 'label');
    expect(labelCalls.length).toBeGreaterThan(0);
  });

  it('combobox trigger uses aria-label and omits aria-labelledby when hideLabel=true and label provided', () => {
    component.hideLabel = true;
    vi.mocked(h).mockClear();
    component.render();
    const triggerProps = vi.mocked(h).mock.calls
      .filter(args => args[0] === 'button')
      .map(args => args[1] as Record<string, unknown>)
      .find(p => p?.['role'] === 'combobox');
    expect(triggerProps?.['aria-label']).toBe('Countries');
    expect(triggerProps?.['aria-labelledby']).toBeUndefined();
  });

  it('listbox uses aria-label and omits aria-labelledby when hideLabel=true and label provided', () => {
    component.hideLabel = true;
    vi.mocked(h).mockClear();
    component.render();
    const listboxProps = vi.mocked(h).mock.calls
      .filter(args => args[0] === 'ul')
      .map(args => args[1] as Record<string, unknown>)
      .find(p => p?.['role'] === 'listbox');
    expect(listboxProps?.['aria-label']).toBe('Countries');
    expect(listboxProps?.['aria-labelledby']).toBeUndefined();
  });
});
