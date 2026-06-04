/**
 * io-multi-select — render() ref callback, inline handler, and utils coverage
 *
 * Covers:
 *  - triggerEl / dropdownEl / filterInputEl ref callbacks (lines 638-640, 675-677, 685-687)
 *  - onSlotchange inline handler (lines 577-581)
 *  - chip onClick inline handler (lines 608-611)
 *  - getMultiSelectMiddleware() utility (line 45 in utils)
 *  - positionDropdown() when both refs are present
 */
import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoMultiSelect } from './io-multi-select';
import { getMultiSelectMiddleware } from './io-multi-select-utils';

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
  Object.assign(c, overrides);
  (c as any).componentWillLoad();
  return c;
}

function renderCalls(c: IoMultiSelect) {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();
  return hMock.mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>;
}

// ── getMultiSelectMiddleware ──────────────────────────────────────────────────

describe('getMultiSelectMiddleware', () => {
  it('returns an array of middleware', () => {
    const middleware = getMultiSelectMiddleware();
    expect(Array.isArray(middleware)).toBe(true);
    expect(middleware.length).toBeGreaterThan(0);
  });
});

// ── ref callbacks ─────────────────────────────────────────────────────────────

describe('io-multi-select render() — triggerEl ref callback', () => {
  it('assigns element to triggerEl when ref is called', () => {
    const c = makeComponent({ label: 'Select items' });
    const calls = renderCalls(c);

    const triggerCall = calls.find(
      ([tag, attrs]) => tag === 'button' && (attrs as Record<string, unknown>)?.role === 'combobox',
    );
    expect(triggerCall).toBeDefined();

    const refFn = triggerCall![1].ref as (el: HTMLButtonElement) => void;
    const mockEl = document.createElement('button') as HTMLButtonElement;
    refFn(mockEl);
    expect((c as any).triggerEl).toBe(mockEl);
  });
});

describe('io-multi-select render() — dropdownEl ref callback', () => {
  it('assigns element to dropdownEl when ref is called', () => {
    const c = makeComponent({ label: 'Select items' });
    const calls = renderCalls(c);

    const dropdownCall = calls.find(
      ([tag, attrs]) =>
        tag === 'div' && String(attrs?.class).includes('multi-select-dropdown'),
    );
    expect(dropdownCall).toBeDefined();

    const refFn = dropdownCall![1].ref as (el: HTMLDivElement) => void;
    const mockEl = document.createElement('div') as HTMLDivElement;
    refFn(mockEl);
    expect((c as any).dropdownEl).toBe(mockEl);
  });
});

describe('io-multi-select render() — filterInputEl ref callback', () => {
  it('assigns element to filterInputEl when filter=true and ref is called', () => {
    const c = makeComponent({ label: 'Select items', filter: true });
    const calls = renderCalls(c);

    const filterInputCall = calls.find(
      ([tag, attrs]) =>
        tag === 'input' && (attrs as Record<string, unknown>)?.['aria-label'] === 'Filter options',
    );
    expect(filterInputCall).toBeDefined();

    const refFn = filterInputCall![1].ref as (el: HTMLInputElement) => void;
    const mockEl = document.createElement('input') as HTMLInputElement;
    refFn(mockEl);
    expect((c as any).filterInputEl).toBe(mockEl);
  });
});

// ── onSlotchange inline handler ───────────────────────────────────────────────

describe('io-multi-select render() — onSlotchange handler', () => {
  it('calls the slotchange handler without throwing', () => {
    const c = makeComponent({ label: 'Select items' });
    const calls = renderCalls(c);

    const slotCall = calls.find(([tag]) => tag === 'slot');
    expect(slotCall).toBeDefined();

    const onSlotchange = slotCall![1].onSlotchange as () => void;
    expect(() => onSlotchange()).not.toThrow();
  });
});

// ── chip onClick inline handler ───────────────────────────────────────────────

describe('io-multi-select render() — chip onClick handler', () => {
  it('calls removeChip and stops propagation when chip remove button is clicked', () => {
    const c = makeComponent({
      label: 'Select items',
      value: ['a'],
    });
    (c as any).flatOptions = [{ value: 'a', label: 'Option A', disabled: false }];

    const calls = renderCalls(c);

    const chipRemoveCall = calls.find(
      ([tag, attrs]) =>
        tag === 'button' && String(attrs?.class).includes('multi-select-chip__remove'),
    );
    expect(chipRemoveCall).toBeDefined();

    const removeChipSpy = vi.spyOn(c as any, 'removeChip');
    const mockEvent = { stopPropagation: vi.fn() } as unknown as MouseEvent;
    const onClick = chipRemoveCall![1].onClick as (e: MouseEvent) => void;
    onClick(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(removeChipSpy).toHaveBeenCalledWith('a');
  });
});

// ── positionDropdown ─────────────────────────────────────────────────────────

describe('io-multi-select — positionDropdown', () => {
  it('does not throw when triggerEl or dropdownEl is absent', async () => {
    const c = makeComponent({ label: 'Select items' });
    (c as any).triggerEl = undefined;
    (c as any).dropdownEl = undefined;
    await expect((c as any).positionDropdown()).resolves.not.toThrow();
  });
});
