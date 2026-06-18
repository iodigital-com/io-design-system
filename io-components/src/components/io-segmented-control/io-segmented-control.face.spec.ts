/**
 * io-segmented-control — FACE (Form-Associated Custom Elements) tests
 *
 * Tests formAssociated behaviour at the group level:
 * - componentWillLoad stores defaultValue and calls setFormValue
 * - onValueChange calls setFormValue
 * - formResetCallback restores defaultValue and resyncs children
 * - formDisabledCallback propagates disabled to children
 */
import { describe, it, expect, vi } from 'vitest';

import { IoSegmentedControl } from './io-segmented-control';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

type SegmentLike = HTMLElement & {
  value: string;
  selected: boolean;
  disabled: boolean;
  tabIndex: number;
};

function makeSegment(value: string): SegmentLike {
  return Object.assign(document.createElement('io-segment'), {
    value,
    selected: false,
    disabled: false,
    tabIndex: -1,
  }) as SegmentLike;
}

function makeComponent(initialValue?: string) {
  const host = document.createElement('io-segmented-control');
  const c = new IoSegmentedControl();
  (c as any).el = host;
  (c as any).change = { emit: vi.fn() };
  c.value = initialValue;
  c.disabled = false;
  return { c, host };
}

describe('io-segmented-control — FACE / formAssociated', () => {
  describe('componentWillLoad', () => {
    it('stores defaultValue from initial value prop', () => {
      const { c } = makeComponent('grid');
      (c as any).internals = makeInternals();
      (c as any).componentWillLoad();
      expect((c as any).defaultValue).toBe('grid');
    });

    it('calls setFormValue with initial value on load', () => {
      const { c } = makeComponent('grid');
      const internals = makeInternals();
      (c as any).internals = internals;
      (c as any).componentWillLoad();
      expect(internals.setFormValue).toHaveBeenCalledWith('grid');
    });

    it('calls setFormValue with null when no initial value', () => {
      const { c } = makeComponent(undefined);
      const internals = makeInternals();
      (c as any).internals = internals;
      (c as any).componentWillLoad();
      expect(internals.setFormValue).toHaveBeenCalledWith(null);
    });
  });

  describe('onValueChange', () => {
    it('calls setFormValue with new value when value changes', () => {
      const { c } = makeComponent();
      const internals = makeInternals();
      (c as any).internals = internals;
      (c as any).componentWillLoad();
      internals.setFormValue.mockClear();

      c.value = 'list';
      (c as any).onValueChange();

      expect(internals.setFormValue).toHaveBeenCalledWith('list');
    });
  });

  describe('formResetCallback', () => {
    it('restores value to defaultValue and calls setFormValue', () => {
      const { c } = makeComponent('list');
      const internals = makeInternals();
      (c as any).internals = internals;
      (c as any).componentWillLoad();

      c.value = 'grid';
      internals.setFormValue.mockClear();

      (c as any).formResetCallback();

      expect(c.value).toBe('list');
      expect(internals.setFormValue).toHaveBeenCalledWith('list');
    });

    it('restores to undefined when no initial value', () => {
      const { c } = makeComponent(undefined);
      const internals = makeInternals();
      (c as any).internals = internals;
      (c as any).componentWillLoad();

      c.value = 'grid';
      internals.setFormValue.mockClear();

      (c as any).formResetCallback();

      expect(c.value).toBeUndefined();
      expect(internals.setFormValue).toHaveBeenCalledWith(null);
    });

    it('resyncs children selected state on reset', () => {
      const { c, host } = makeComponent('list');
      const internals = makeInternals();
      (c as any).internals = internals;
      (c as any).componentWillLoad();

      const segList = makeSegment('list');
      const segGrid = makeSegment('grid');
      host.appendChild(segList);
      host.appendChild(segGrid);

      // Change to 'grid'
      c.value = 'grid';
      segList.selected = false;
      segGrid.selected = true;

      // Reset
      (c as any).formResetCallback();

      expect(c.value).toBe('list');
      expect(segList.selected).toBe(true);
      expect(segGrid.selected).toBe(false);
    });

    it('does not throw when internals is not available', () => {
      const { c } = makeComponent('list');
      (c as any).internals = undefined;
      (c as any).defaultValue = 'list';
      expect(() => (c as any).formResetCallback()).not.toThrow();
    });
  });

  describe('formDisabledCallback', () => {
    it('disables the group and propagates to children when called with true', () => {
      const { c, host } = makeComponent();
      (c as any).internals = makeInternals();
      (c as any).componentWillLoad();

      const seg = makeSegment('list');
      host.appendChild(seg);

      (c as any).formDisabledCallback(true);

      expect(c.disabled).toBe(true);
      expect(seg.disabled).toBe(true);
    });

    it('re-enables the group and propagates to children when called with false', () => {
      const { c, host } = makeComponent();
      (c as any).internals = makeInternals();
      (c as any).componentWillLoad();

      const seg = makeSegment('list');
      seg.disabled = true;
      host.appendChild(seg);
      c.disabled = true;

      (c as any).formDisabledCallback(false);

      expect(c.disabled).toBe(false);
      expect(seg.disabled).toBe(false);
    });
  });

  describe('double optional chaining safety', () => {
    it('componentWillLoad does not throw when internals is undefined', () => {
      const { c } = makeComponent('list');
      (c as any).internals = undefined;
      expect(() => (c as any).componentWillLoad()).not.toThrow();
    });

    it('onValueChange does not throw when internals is undefined', () => {
      const { c } = makeComponent();
      (c as any).internals = undefined;
      c.value = 'grid';
      expect(() => (c as any).onValueChange()).not.toThrow();
    });
  });
});
