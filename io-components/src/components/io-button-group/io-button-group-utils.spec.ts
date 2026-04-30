import { describe, it, expect, beforeEach } from 'vitest';

import { parseButtonGroupItems, getNextEnabledGroupIndex, getButtonGroupClassList } from './io-button-group-utils';

// ── parseButtonGroupItems ──────────────────────────────────────────────────────

describe('parseButtonGroupItems', () => {
  let host: HTMLElement;

  beforeEach(() => {
    host = document.createElement('div');
  });

  it('returns empty array when there are no io-button children', () => {
    expect(parseButtonGroupItems(host)).toEqual([]);
  });

  it('returns correct { value, label } for multiple io-button children', () => {
    ['day', 'week', 'month'].forEach(val => {
      const btn = document.createElement('io-button');
      btn.setAttribute('value', val);
      btn.textContent = val.charAt(0).toUpperCase() + val.slice(1);
      host.appendChild(btn);
    });

    const items = parseButtonGroupItems(host);
    expect(items).toHaveLength(3);
    expect(items[0]).toEqual({ value: 'day', label: 'Day', disabled: false });
    expect(items[1]).toEqual({ value: 'week', label: 'Week', disabled: false });
    expect(items[2]).toEqual({ value: 'month', label: 'Month', disabled: false });
  });

  it('marks item as disabled when the io-button has the disabled attribute', () => {
    const btn = document.createElement('io-button');
    btn.setAttribute('value', 'day');
    btn.textContent = 'Day';
    btn.setAttribute('disabled', '');
    host.appendChild(btn);

    const items = parseButtonGroupItems(host);
    expect(items[0].disabled).toBe(true);
  });

  it('filters out items with an empty value attribute', () => {
    const btnEmpty = document.createElement('io-button');
    btnEmpty.setAttribute('value', '');
    btnEmpty.textContent = 'No value';
    host.appendChild(btnEmpty);

    const btnValid = document.createElement('io-button');
    btnValid.setAttribute('value', 'valid');
    btnValid.textContent = 'Valid';
    host.appendChild(btnValid);

    const items = parseButtonGroupItems(host);
    expect(items).toHaveLength(1);
    expect(items[0].value).toBe('valid');
  });

  it('filters out items with no value attribute at all', () => {
    const btn = document.createElement('io-button');
    btn.textContent = 'No value attr';
    host.appendChild(btn);

    const items = parseButtonGroupItems(host);
    expect(items).toHaveLength(0);
  });

  it('trims whitespace from textContent label', () => {
    const btn = document.createElement('io-button');
    btn.setAttribute('value', 'week');
    btn.textContent = '  Week  ';
    host.appendChild(btn);

    const items = parseButtonGroupItems(host);
    expect(items[0].label).toBe('Week');
  });

  it('reads value from JS property when attribute is not set (generator ref pattern)', () => {
    const btn = document.createElement('io-button') as HTMLElement & { value: string };
    btn.value = 'day'; // set as JS property, no setAttribute call
    btn.textContent = 'Day';
    host.appendChild(btn);

    const items = parseButtonGroupItems(host);
    expect(items).toHaveLength(1);
    expect(items[0].value).toBe('day');
  });

  it('reads disabled from JS property when attribute is not set (generator ref pattern)', () => {
    const btn = document.createElement('io-button') as HTMLElement & { value: string; disabled: boolean };
    btn.value = 'day';
    btn.disabled = true; // set as JS property, no setAttribute call
    btn.textContent = 'Day';
    host.appendChild(btn);

    const items = parseButtonGroupItems(host);
    expect(items[0].disabled).toBe(true);
  });

  it('prefers JS property over attribute when both are present', () => {
    const btn = document.createElement('io-button') as HTMLElement & { value: string };
    btn.setAttribute('value', 'attr-value');
    btn.value = 'prop-value';
    btn.textContent = 'Item';
    host.appendChild(btn);

    const items = parseButtonGroupItems(host);
    expect(items[0].value).toBe('prop-value');
  });
});

// ── getNextEnabledGroupIndex ───────────────────────────────────────────────────

describe('getNextEnabledGroupIndex', () => {
  it('returns null for empty list', () => {
    expect(getNextEnabledGroupIndex('ArrowRight', 0, 0)).toBeNull();
  });

  it('returns null for out-of-bounds currentEnabledIndex', () => {
    expect(getNextEnabledGroupIndex('ArrowRight', 5, 3)).toBeNull();
    expect(getNextEnabledGroupIndex('ArrowRight', -1, 3)).toBeNull();
  });

  it('returns null for unrecognised keys', () => {
    expect(getNextEnabledGroupIndex('Escape', 0, 3)).toBeNull();
    expect(getNextEnabledGroupIndex('Tab', 0, 3)).toBeNull();
    expect(getNextEnabledGroupIndex('Enter', 0, 3)).toBeNull();
  });

  it('ArrowRight advances with wrap: 0→1→2→0 in a 3-item group', () => {
    expect(getNextEnabledGroupIndex('ArrowRight', 0, 3)).toBe(1);
    expect(getNextEnabledGroupIndex('ArrowRight', 1, 3)).toBe(2);
    expect(getNextEnabledGroupIndex('ArrowRight', 2, 3)).toBe(0);
  });

  it('ArrowLeft reverses with wrap: 2→1→0→2 in a 3-item group', () => {
    expect(getNextEnabledGroupIndex('ArrowLeft', 2, 3)).toBe(1);
    expect(getNextEnabledGroupIndex('ArrowLeft', 1, 3)).toBe(0);
    expect(getNextEnabledGroupIndex('ArrowLeft', 0, 3)).toBe(2);
  });

  it('ArrowDown behaves identically to ArrowRight', () => {
    expect(getNextEnabledGroupIndex('ArrowDown', 0, 3)).toBe(1);
    expect(getNextEnabledGroupIndex('ArrowDown', 2, 3)).toBe(0);
  });

  it('ArrowUp behaves identically to ArrowLeft', () => {
    expect(getNextEnabledGroupIndex('ArrowUp', 1, 3)).toBe(0);
    expect(getNextEnabledGroupIndex('ArrowUp', 0, 3)).toBe(2);
  });

  it('Home always returns 0', () => {
    expect(getNextEnabledGroupIndex('Home', 2, 5)).toBe(0);
    expect(getNextEnabledGroupIndex('Home', 0, 5)).toBe(0);
  });

  it('End always returns enabledCount - 1', () => {
    expect(getNextEnabledGroupIndex('End', 0, 5)).toBe(4);
    expect(getNextEnabledGroupIndex('End', 3, 5)).toBe(4);
  });
});

// ── getButtonGroupClassList ────────────────────────────────────────────────────

describe('getButtonGroupClassList', () => {
  it('returns "group-btn" for a default inactive enabled item', () => {
    expect(getButtonGroupClassList({ active: false, disabled: false, groupDisabled: false })).toBe('group-btn');
  });

  it('includes "group-btn--active" when active is true', () => {
    expect(getButtonGroupClassList({ active: true, disabled: false, groupDisabled: false })).toContain('group-btn--active');
  });

  it('includes "group-btn--disabled" when item is disabled', () => {
    expect(getButtonGroupClassList({ active: false, disabled: true, groupDisabled: false })).toContain('group-btn--disabled');
  });

  it('includes "group-btn--disabled" when group is disabled', () => {
    expect(getButtonGroupClassList({ active: false, disabled: false, groupDisabled: true })).toContain('group-btn--disabled');
  });

  it('can combine active and disabled classes simultaneously', () => {
    const cls = getButtonGroupClassList({ active: true, disabled: true, groupDisabled: false });
    expect(cls).toContain('group-btn--active');
    expect(cls).toContain('group-btn--disabled');
  });

  it('always starts with "group-btn"', () => {
    const cls = getButtonGroupClassList({ active: true, disabled: true, groupDisabled: true });
    expect(cls.startsWith('group-btn')).toBe(true);
  });
});
