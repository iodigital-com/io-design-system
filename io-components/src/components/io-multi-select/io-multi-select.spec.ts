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

describe('io-multi-select — trigger clear button touch target (#1111)', () => {
  it('trigger clear button has min-width: var(--io-touch-target-min)', () => {
    const styles = getMultiSelectStyles();
    expect(styles).toContain('.multi-select-trigger__clear');
    expect(styles).toContain('min-width: var(--io-touch-target-min)');
  });

  it('trigger clear button has min-height: var(--io-touch-target-min)', () => {
    const styles = getMultiSelectStyles();
    expect(styles).toContain('min-height: var(--io-touch-target-min)');
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

describe('io-multi-select — aria-describedby wiring for FACE error (#840)', () => {
  let component: InstanceType<typeof import('./io-multi-select').IoMultiSelect>;

  beforeEach(async () => {
    const { IoMultiSelect } = await import('./io-multi-select');
    component = new IoMultiSelect() as typeof component;
    (component as any).el = document.createElement('io-multi-select');
    component.label = 'Items';
    (component as any).groups = [];
    (component as any).flatOptions = [];
    (component as any).internals = {
      setFormValue: vi.fn(),
      setValidity: vi.fn(),
      checkValidity: vi.fn().mockReturnValue(true),
      reportValidity: vi.fn().mockReturnValue(true),
    };
    (component as any).componentWillLoad();
  });

  it('trigger aria-describedby includes face-error id when faceInvalid=true and no message', () => {
    (component as any).faceInvalid = true;
    vi.mocked(h).mockClear();
    component.render();
    const triggerProps = vi.mocked(h).mock.calls
      .filter(args => args[0] === 'button')
      .map(args => args[1] as Record<string, unknown>)
      .find(p => p?.['role'] === 'combobox');
    const describedBy = triggerProps?.['aria-describedby'] as string | undefined;
    expect(describedBy).toBeTruthy();
    expect(describedBy).toContain('face-error');
  });

  it('trigger aria-describedby does not include face-error id when faceInvalid=false', () => {
    (component as any).faceInvalid = false;
    vi.mocked(h).mockClear();
    component.render();
    const triggerProps = vi.mocked(h).mock.calls
      .filter(args => args[0] === 'button')
      .map(args => args[1] as Record<string, unknown>)
      .find(p => p?.['role'] === 'combobox');
    const describedBy = triggerProps?.['aria-describedby'] as string | undefined;
    expect(describedBy ?? '').not.toContain('face-error');
  });

  it('trigger aria-describedby does not include face-error when faceInvalid=true but state=error set', () => {
    (component as any).faceInvalid = true;
    component.state = 'error';
    component.message = 'Required';
    vi.mocked(h).mockClear();
    component.render();
    const triggerProps = vi.mocked(h).mock.calls
      .filter(args => args[0] === 'button')
      .map(args => args[1] as Record<string, unknown>)
      .find(p => p?.['role'] === 'combobox');
    const describedBy = triggerProps?.['aria-describedby'] as string | undefined;
    // face-error suppressed when state='error' + message present; messageId used instead
    expect(describedBy ?? '').not.toContain('face-error');
    expect(describedBy).toBeTruthy();
  });
});

// ── Issue #910: description, helperText, warning state ────────────────────────

describe('io-multi-select — description prop (issue #910)', () => {
  let component: InstanceType<typeof import('./io-multi-select').IoMultiSelect>;

  beforeEach(async () => {
    const { IoMultiSelect } = await import('./io-multi-select');
    component = new IoMultiSelect() as typeof component;
    (component as any).el = document.createElement('io-multi-select');
    component.label = 'Items';
    (component as any).groups = [];
    (component as any).flatOptions = [];
    (component as any).internals = {
      setFormValue: vi.fn(),
      setValidity: vi.fn(),
      checkValidity: vi.fn().mockReturnValue(true),
      reportValidity: vi.fn().mockReturnValue(true),
    };
    (component as any).componentWillLoad();
  });

  it('has description undefined by default', () => {
    expect(component.description).toBeUndefined();
  });

  it('has helperText undefined by default', () => {
    expect(component.helperText).toBeUndefined();
  });

  it('accepts description prop', () => {
    component.description = 'Select your options';
    expect(component.description).toBe('Select your options');
  });

  it('accepts helperText prop', () => {
    component.helperText = 'Helper text here';
    expect(component.helperText).toBe('Helper text here');
  });

  it('renders description paragraph when set', () => {
    component.description = 'Persistent description';
    vi.mocked(h).mockClear();
    component.render();
    const pCalls = vi.mocked(h).mock.calls.filter(
      args => args[0] === 'p' && String((args[1] as Record<string, unknown>)?.class ?? '').includes('description--persistent'),
    );
    expect(pCalls.length).toBeGreaterThan(0);
  });
});

describe('io-multi-select — warning state (issue #910)', () => {
  let component: InstanceType<typeof import('./io-multi-select').IoMultiSelect>;

  beforeEach(async () => {
    const { IoMultiSelect } = await import('./io-multi-select');
    component = new IoMultiSelect() as typeof component;
    (component as any).el = document.createElement('io-multi-select');
    component.label = 'Items';
    (component as any).groups = [];
    (component as any).flatOptions = [];
    (component as any).internals = {
      setFormValue: vi.fn(),
      setValidity: vi.fn(),
      checkValidity: vi.fn().mockReturnValue(true),
      reportValidity: vi.fn().mockReturnValue(true),
    };
    (component as any).componentWillLoad();
  });

  it('state prop accepts "warning"', () => {
    component.state = 'warning';
    expect(component.state).toBe('warning');
  });

  it('render does not throw when state=warning and message set', () => {
    component.state = 'warning';
    component.message = 'Please review your selection';
    expect(() => (component as any).render()).not.toThrow();
  });

  it('wrapper class includes warning modifier when state=warning', () => {
    component.state = 'warning';
    vi.mocked(h).mockClear();
    component.render();
    const divCalls = vi.mocked(h).mock.calls.filter(
      args => args[0] === 'div' && String((args[1] as Record<string, unknown>)?.class ?? '').includes('multi-select-wrapper--warning'),
    );
    expect(divCalls.length).toBeGreaterThan(0);
  });
});

// ── Issue #1070: maxSelections prop with limitreached event ───────────────────

describe('io-multi-select — maxSelections (issue #1070)', () => {
  let component: IoMultiSelect;
  let emitSpy: ReturnType<typeof vi.fn>;
  let limitEmitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    emitSpy = vi.fn();
    limitEmitSpy = vi.fn();
    (component as any).change = { emit: emitSpy };
    (component as any).limitreached = { emit: limitEmitSpy };
    component.name = 'test';
    component.maxSelections = 2;
    (component as any).componentWillLoad();
  });

  it('has maxSelections undefined by default', () => {
    const fresh = new IoMultiSelect();
    expect(fresh.maxSelections).toBeUndefined();
  });

  it('allows selection when below the cap', () => {
    component.value = [];
    (component as any).toggleOption({ value: 'a', label: 'A' });
    expect(component.value).toContain('a');
    expect(emitSpy).toHaveBeenCalled();
    expect(limitEmitSpy).not.toHaveBeenCalled();
  });

  it('blocks selection when at the cap and emits limitreached', () => {
    component.value = ['a', 'b'];
    (component as any).toggleOption({ value: 'c', label: 'C' });
    expect(component.value).not.toContain('c');
    expect(emitSpy).not.toHaveBeenCalled();
    expect(limitEmitSpy).toHaveBeenCalledWith({ max: 2, attempted: 'c' });
  });

  it('always allows deselection even when at cap', () => {
    component.value = ['a', 'b'];
    (component as any).toggleOption({ value: 'a', label: 'A' });
    expect(component.value).not.toContain('a');
    expect(emitSpy).toHaveBeenCalled();
  });

  it('renders limit helper text when selections exist', () => {
    component.value = ['a'];
    (component as any).flatOptions = [{ value: 'a', label: 'A', disabled: false }];
    vi.mocked(h).mockClear();
    (component as any).render();
    const pCalls = vi.mocked(h).mock.calls.filter(
      args => args[0] === 'p' && String((args[1] as Record<string, unknown>)?.class ?? '').includes('message--limit'),
    );
    expect(pCalls.length).toBeGreaterThan(0);
  });
});

// ── Issue #1111: clear-all button in trigger row ──────────────────────────────

describe('io-multi-select — inline clear button in trigger row (issue #1111)', () => {
  let component: IoMultiSelect;

  beforeEach(() => {
    component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    (component as any).change = { emit: vi.fn() };
    (component as any).limitreached = { emit: vi.fn() };
    component.name = 'test';
    component.label = 'Items';
    (component as any).componentWillLoad();
  });

  it('renders clear button when selections exist and not disabled', () => {
    component.value = ['a'];
    (component as any).flatOptions = [{ value: 'a', label: 'A', disabled: false }];
    vi.mocked(h).mockClear();
    (component as any).render();
    const clearBtnCall = vi.mocked(h).mock.calls.find(
      args =>
        args[0] === 'button' &&
        (args[1] as Record<string, unknown>)?.['aria-label'] === 'Clear selection',
    );
    expect(clearBtnCall).toBeDefined();
  });

  it('does not render clear button when no selections', () => {
    component.value = [];
    vi.mocked(h).mockClear();
    (component as any).render();
    const clearBtnCall = vi.mocked(h).mock.calls.find(
      args =>
        args[0] === 'button' &&
        (args[1] as Record<string, unknown>)?.['aria-label'] === 'Clear selection',
    );
    expect(clearBtnCall).toBeUndefined();
  });

  it('does not render clear button when disabled', () => {
    component.value = ['a'];
    component.disabled = true;
    (component as any).flatOptions = [{ value: 'a', label: 'A', disabled: false }];
    vi.mocked(h).mockClear();
    (component as any).render();
    const clearBtnCall = vi.mocked(h).mock.calls.find(
      args =>
        args[0] === 'button' &&
        (args[1] as Record<string, unknown>)?.['aria-label'] === 'Clear selection',
    );
    expect(clearBtnCall).toBeUndefined();
  });

  it('clear button has correct aria-label for accessibility', () => {
    component.value = ['a'];
    (component as any).flatOptions = [{ value: 'a', label: 'A', disabled: false }];
    vi.mocked(h).mockClear();
    (component as any).render();
    const clearBtnCall = vi.mocked(h).mock.calls.find(
      args =>
        args[0] === 'button' &&
        (args[1] as Record<string, unknown>)?.['aria-label'] === 'Clear selection',
    );
    expect((clearBtnCall![1] as Record<string, unknown>)['aria-label']).toBe('Clear selection');
  });
});

// ── Issue #937: trigger aria-label summarizes selection ──────────────────────

describe('io-multi-select — trigger aria-label with selection summary (issue #937)', () => {
  let component: IoMultiSelect;

  beforeEach(() => {
    component = new IoMultiSelect();
    (component as any).el = document.createElement('io-multi-select');
    (component as any).change = { emit: vi.fn() };
    (component as any).limitreached = { emit: vi.fn() };
    component.name = 'test';
    component.label = 'Countries';
    (component as any).componentWillLoad();
  });

  it('trigger aria-label includes label and selected labels when selections exist', () => {
    component.value = ['nl', 'be'];
    (component as any).flatOptions = [
      { value: 'nl', label: 'Netherlands', disabled: false },
      { value: 'be', label: 'Belgium', disabled: false },
    ];
    vi.mocked(h).mockClear();
    (component as any).render();
    const triggerProps = vi.mocked(h).mock.calls
      .filter(args => args[0] === 'button')
      .map(args => args[1] as Record<string, unknown>)
      .find(p => p?.['role'] === 'combobox');
    const ariaLabel = triggerProps?.['aria-label'] as string | undefined;
    expect(ariaLabel).toContain('Countries');
    expect(ariaLabel).toContain('Netherlands');
    expect(ariaLabel).toContain('Belgium');
  });

  it('trigger has no aria-label when no selections and hideLabel=false', () => {
    component.value = [];
    vi.mocked(h).mockClear();
    (component as any).render();
    const triggerProps = vi.mocked(h).mock.calls
      .filter(args => args[0] === 'button')
      .map(args => args[1] as Record<string, unknown>)
      .find(p => p?.['role'] === 'combobox');
    expect(triggerProps?.['aria-label']).toBeUndefined();
  });
});

// ── #1111 trigger clear button render ─────────────────────────────────────────

describe('io-multi-select — trigger clear button render (#1111)', () => {
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

  it('renders inline clear button with aria-label="Clear selection" when values selected', () => {
    const comp = makeRenderComp({ value: ['nl'] } as any);
    vi.mocked(h).mockClear();
    comp.render();
    const clearBtn = vi.mocked(h).mock.calls
      .filter(args => args[0] === 'button')
      .map(args => args[1] as Record<string, unknown>)
      .find(p => p?.['aria-label'] === 'Clear selection');
    expect(clearBtn).toBeDefined();
  });

  it('does not render inline clear button when no values selected', () => {
    const comp = makeRenderComp({ value: [] } as any);
    vi.mocked(h).mockClear();
    comp.render();
    const clearBtn = vi.mocked(h).mock.calls
      .filter(args => args[0] === 'button')
      .map(args => args[1] as Record<string, unknown>)
      .find(p => p?.['aria-label'] === 'Clear selection');
    expect(clearBtn).toBeUndefined();
  });
});

// ── #1070 maxSelections defaults ──────────────────────────────────────────────

describe('io-multi-select — maxSelections default props (#1070)', () => {
  it('maxSelections is undefined by default', () => {
    const comp = new IoMultiSelect();
    (comp as any).el = document.createElement('io-multi-select');
    (comp as any).componentWillLoad();
    expect(comp.maxSelections).toBeUndefined();
  });
});

// ── #1069 selectAll default props ─────────────────────────────────────────────

describe('io-multi-select — selectAll default props (#1069)', () => {
  it('selectAll is false by default', () => {
    const comp = new IoMultiSelect();
    (comp as any).el = document.createElement('io-multi-select');
    (comp as any).componentWillLoad();
    expect(comp.selectAll).toBe(false);
  });
});
