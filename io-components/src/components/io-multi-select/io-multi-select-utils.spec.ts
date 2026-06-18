/**
 * io-multi-select — utility function unit tests
 */
import { describe, it, expect, vi } from 'vitest';

vi.mock('@floating-ui/dom', () => ({
  offset: vi.fn(() => ({ name: 'offset' })),
  flip: vi.fn(() => ({ name: 'flip' })),
  shift: vi.fn(() => ({ name: 'shift' })),
}));

import { flip } from '@floating-ui/dom';
import {
  getMultiSelectWrapperClass,
  getMultiSelectOptionClass,
  getMultiSelectOptionId,
  resolveMultiSelectId,
  parseMultiSelectContent,
  getMultiSelectDisplayText,
  getMultiSelectMiddleware,
  getMultiSelectPinnedMiddleware,
} from './io-multi-select-utils';

// ── getMultiSelectWrapperClass ────────────────────────────────────────────────

describe('getMultiSelectWrapperClass', () => {
  it('returns base class for state none, not disabled', () => {
    expect(getMultiSelectWrapperClass('none', false)).toBe('multi-select-wrapper');
  });

  it('adds error modifier for state error', () => {
    expect(getMultiSelectWrapperClass('error', false)).toBe(
      'multi-select-wrapper multi-select-wrapper--error',
    );
  });

  it('adds success modifier for state success', () => {
    expect(getMultiSelectWrapperClass('success', false)).toBe(
      'multi-select-wrapper multi-select-wrapper--success',
    );
  });

  it('adds disabled modifier', () => {
    expect(getMultiSelectWrapperClass('none', true)).toBe(
      'multi-select-wrapper multi-select-wrapper--disabled',
    );
  });

  it('combines error and disabled', () => {
    const cls = getMultiSelectWrapperClass('error', true);
    expect(cls).toContain('multi-select-wrapper--error');
    expect(cls).toContain('multi-select-wrapper--disabled');
  });
});

// ── getMultiSelectOptionClass ─────────────────────────────────────────────────

describe('getMultiSelectOptionClass', () => {
  it('returns base class by default', () => {
    expect(getMultiSelectOptionClass(false, false, false)).toBe('multi-select-option');
  });

  it('adds selected modifier', () => {
    expect(getMultiSelectOptionClass(true, false, false)).toContain(
      'multi-select-option--selected',
    );
  });

  it('adds disabled modifier', () => {
    expect(getMultiSelectOptionClass(false, true, false)).toContain(
      'multi-select-option--disabled',
    );
  });

  it('adds focused modifier', () => {
    expect(getMultiSelectOptionClass(false, false, true)).toContain(
      'multi-select-option--focused',
    );
  });

  it('combines all modifiers', () => {
    const cls = getMultiSelectOptionClass(true, true, true);
    expect(cls).toContain('multi-select-option--selected');
    expect(cls).toContain('multi-select-option--disabled');
    expect(cls).toContain('multi-select-option--focused');
  });
});

// ── getMultiSelectOptionId ────────────────────────────────────────────────────

describe('getMultiSelectOptionId', () => {
  it('generates correct id', () => {
    expect(getMultiSelectOptionId('listbox-1', 3)).toBe('listbox-1-option-3');
  });
});

// ── getMultiSelectMiddleware / getMultiSelectPinnedMiddleware ─────────────────

describe('getMultiSelectMiddleware', () => {
  it('returns 3 middleware items including flip', () => {
    vi.mocked(flip).mockClear();
    const mw = getMultiSelectMiddleware();
    expect(mw).toHaveLength(3);
    expect(vi.mocked(flip)).toHaveBeenCalled();
  });
});

describe('getMultiSelectPinnedMiddleware', () => {
  it('returns 2 middleware items (no flip)', () => {
    vi.mocked(flip).mockClear();
    const mw = getMultiSelectPinnedMiddleware();
    expect(mw).toHaveLength(2);
    expect(vi.mocked(flip)).not.toHaveBeenCalled();
  });
});

// ── resolveMultiSelectId ──────────────────────────────────────────────────────

describe('resolveMultiSelectId', () => {
  it('includes name when provided', () => {
    expect(resolveMultiSelectId('countries', 'abc')).toBe('io-multi-select-countries-abc');
  });

  it('uses fallback only when name is undefined', () => {
    expect(resolveMultiSelectId(undefined, 'xyz')).toBe('io-multi-select-xyz');
  });

  it('sanitizes special characters from name', () => {
    expect(resolveMultiSelectId('My Field!', 'fb')).toContain('my-field');
  });

  it('falls back when name becomes empty after sanitize', () => {
    expect(resolveMultiSelectId('!!!', 'fb')).toBe('io-multi-select-fb');
  });
});

// ── parseMultiSelectContent ───────────────────────────────────────────────────

describe('parseMultiSelectContent', () => {
  it('returns empty arrays for host with no children', () => {
    const host = document.createElement('io-multi-select');
    const result = parseMultiSelectContent(host);
    expect(result.groups).toEqual([]);
    expect(result.flatOptions).toEqual([]);
  });

  it('parses io-option children into flatOptions', () => {
    const host = document.createElement('io-multi-select');
    const opt = document.createElement('io-option');
    opt.setAttribute('value', 'nl');
    opt.setAttribute('label', 'Netherlands');
    host.appendChild(opt);
    const result = parseMultiSelectContent(host);
    expect(result.flatOptions).toHaveLength(1);
    expect(result.flatOptions[0].value).toBe('nl');
    expect(result.flatOptions[0].label).toBe('Netherlands');
  });

  it('parses native option children', () => {
    const host = document.createElement('io-multi-select');
    const opt = document.createElement('option');
    opt.value = 'be';
    opt.setAttribute('label', 'Belgium');
    host.appendChild(opt);
    const result = parseMultiSelectContent(host);
    expect(result.flatOptions[0].value).toBe('be');
  });

  it('marks disabled options', () => {
    const host = document.createElement('io-multi-select');
    const opt = document.createElement('io-option');
    opt.setAttribute('value', 'de');
    opt.setAttribute('label', 'Germany');
    opt.setAttribute('disabled', '');
    host.appendChild(opt);
    const result = parseMultiSelectContent(host);
    expect(result.flatOptions[0].disabled).toBe(true);
  });

  it('parses io-optgroup children with nested io-options', () => {
    const host = document.createElement('io-multi-select');
    const group = document.createElement('io-optgroup');
    group.setAttribute('label', 'Benelux');
    const opt = document.createElement('io-option');
    opt.setAttribute('value', 'nl');
    opt.setAttribute('label', 'Netherlands');
    group.appendChild(opt);
    host.appendChild(group);
    const result = parseMultiSelectContent(host);
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0].label).toBe('Benelux');
    expect(result.flatOptions[0].value).toBe('nl');
  });

  it('skips options without a value', () => {
    const host = document.createElement('io-multi-select');
    const opt = document.createElement('io-option');
    opt.setAttribute('label', 'No value option');
    host.appendChild(opt);
    const result = parseMultiSelectContent(host);
    expect(result.flatOptions).toHaveLength(0);
  });

  it('appends second io-option to existing unnamed group without creating a new group', () => {
    const host = document.createElement('io-multi-select');
    const opt1 = document.createElement('io-option');
    opt1.setAttribute('value', 'nl');
    opt1.setAttribute('label', 'Netherlands');
    const opt2 = document.createElement('io-option');
    opt2.setAttribute('value', 'be');
    opt2.setAttribute('label', 'Belgium');
    host.appendChild(opt1);
    host.appendChild(opt2);
    const result = parseMultiSelectContent(host);
    expect(result.flatOptions).toHaveLength(2);
    // Both options should be in a single unnamed group, not two groups
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0].label).toBeUndefined();
    expect(result.groups[0].options).toHaveLength(2);
  });

  it('reads io-optgroup label and disabled from JS properties when set', () => {
    const host = document.createElement('io-multi-select');
    const group = document.createElement('io-optgroup');
    (group as HTMLElement & { label?: unknown; disabled?: unknown }).label = 'Prop Label';
    (group as HTMLElement & { disabled?: unknown }).disabled = true;
    const opt = document.createElement('io-option');
    opt.setAttribute('value', 'nl');
    opt.setAttribute('label', 'Netherlands');
    group.appendChild(opt);
    host.appendChild(group);
    const result = parseMultiSelectContent(host);
    expect(result.groups[0].label).toBe('Prop Label');
    expect(result.groups[0].disabled).toBe(true);
    expect(result.flatOptions[0].disabled).toBe(true);
  });
});

// ── getMultiSelectDisplayText ─────────────────────────────────────────────────

describe('getMultiSelectDisplayText', () => {
  const flatOptions = [
    { value: 'nl', label: 'Netherlands' },
    { value: 'be', label: 'Belgium' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
  ];

  it('returns null when nothing is selected', () => {
    expect(getMultiSelectDisplayText([], flatOptions, 3)).toBeNull();
  });

  it('returns the single label when one is selected', () => {
    expect(getMultiSelectDisplayText(['nl'], flatOptions, 3)).toBe('Netherlands');
  });

  it('returns comma-joined labels when count <= maxDisplay', () => {
    expect(getMultiSelectDisplayText(['nl', 'be'], flatOptions, 3)).toBe(
      'Netherlands, Belgium',
    );
  });

  it('returns "{N} selected" when count > maxDisplay', () => {
    expect(getMultiSelectDisplayText(['nl', 'be', 'de', 'fr'], flatOptions, 3)).toBe(
      '4 selected',
    );
  });

  it('falls back to raw value when label not found (single item)', () => {
    expect(getMultiSelectDisplayText(['xx'], flatOptions, 3)).toBe('xx');
  });

  it('falls back to raw value in multi-item comma-join when label not found', () => {
    expect(getMultiSelectDisplayText(['nl', 'xx'], flatOptions, 3)).toBe('Netherlands, xx');
  });
});
