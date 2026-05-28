import { describe, it, expect } from 'vitest';

import {
  sanitizeNameSegment,
  resolveSelectId,
  getSelectWrapperClass,
  getComboboxMiddleware,
  getComboboxOptionId,
  getComboboxWrapperClass,
  getComboboxOptionClass,
  parseSelectContent,
} from './io-select-utils';

describe('sanitizeNameSegment', () => {
  it('lowercases and trims input', () => {
    expect(sanitizeNameSegment('  Country  ')).toBe('country');
  });

  it('replaces disallowed characters with hyphens', () => {
    expect(sanitizeNameSegment('foo bar!baz')).toBe('foo-bar-baz');
  });

  it('strips leading and trailing hyphens', () => {
    expect(sanitizeNameSegment('--hello--')).toBe('hello');
  });

  it('preserves underscores and digits', () => {
    expect(sanitizeNameSegment('my_select_2')).toBe('my_select_2');
  });

  it('returns empty string for all-disallowed input', () => {
    expect(sanitizeNameSegment('!!!')).toBe('');
  });
});

describe('resolveSelectId', () => {
  it('builds id with sanitized name when name is provided', () => {
    expect(resolveSelectId('country', 'abc123')).toBe('io-select-country-abc123');
  });

  it('builds id without name segment when name is undefined', () => {
    expect(resolveSelectId(undefined, 'abc123')).toBe('io-select-abc123');
  });

  it('builds id without name segment when name is empty string', () => {
    expect(resolveSelectId('', 'abc123')).toBe('io-select-abc123');
  });

  it('builds id without name segment when name sanitizes to empty string', () => {
    expect(resolveSelectId('!!!', 'abc123')).toBe('io-select-abc123');
  });

  it('sanitizes special characters in name', () => {
    expect(resolveSelectId('My Select!', 'xyz')).toBe('io-select-my-select-xyz');
  });
});

describe('getSelectWrapperClass', () => {
  it('returns only base class when no state and not disabled', () => {
    expect(getSelectWrapperClass(false, false, false, false)).toBe('select-wrapper');
  });

  it('includes state-error modifier when error is true', () => {
    expect(getSelectWrapperClass(true, false, false, false)).toBe('select-wrapper select-wrapper--state-error');
  });

  it('includes state-success modifier when success is true', () => {
    expect(getSelectWrapperClass(false, true, false, false)).toBe('select-wrapper select-wrapper--state-success');
  });

  it('includes state-warning modifier when warning is true', () => {
    expect(getSelectWrapperClass(false, false, true, false)).toBe('select-wrapper select-wrapper--state-warning');
  });

  it('includes disabled modifier when disabled is true', () => {
    expect(getSelectWrapperClass(false, false, false, true)).toBe('select-wrapper select-wrapper--disabled');
  });

  it('includes both state-error and disabled modifiers when both are true', () => {
    expect(getSelectWrapperClass(true, false, false, true)).toBe('select-wrapper select-wrapper--state-error select-wrapper--disabled');
  });

  it('includes loading modifier when loading=true', () => {
    expect(getSelectWrapperClass(false, false, false, false, true)).toBe('select-wrapper select-wrapper--loading');
  });
});

describe('getComboboxMiddleware', () => {
  it('returns an array of middleware', () => {
    const middleware = getComboboxMiddleware();
    expect(Array.isArray(middleware)).toBe(true);
    expect(middleware.length).toBeGreaterThan(0);
  });
});

describe('getComboboxOptionId', () => {
  it('returns formatted option id string', () => {
    expect(getComboboxOptionId('my-listbox', 3)).toBe('my-listbox-option-3');
  });

  it('handles index zero', () => {
    expect(getComboboxOptionId('list', 0)).toBe('list-option-0');
  });
});

describe('getComboboxWrapperClass', () => {
  it('returns base classes when no state and not disabled', () => {
    expect(getComboboxWrapperClass(false, false, false, false)).toBe('select-wrapper select-wrapper--custom');
  });

  it('includes state-error modifier when error is true', () => {
    expect(getComboboxWrapperClass(true, false, false, false)).toBe('select-wrapper select-wrapper--custom select-wrapper--state-error');
  });

  it('includes state-success modifier when success is true', () => {
    expect(getComboboxWrapperClass(false, true, false, false)).toBe('select-wrapper select-wrapper--custom select-wrapper--state-success');
  });

  it('includes state-warning modifier when warning is true', () => {
    expect(getComboboxWrapperClass(false, false, true, false)).toBe('select-wrapper select-wrapper--custom select-wrapper--state-warning');
  });

  it('includes disabled modifier when disabled is true', () => {
    expect(getComboboxWrapperClass(false, false, false, true)).toBe('select-wrapper select-wrapper--custom select-wrapper--disabled');
  });

  it('includes both state-error and disabled modifiers when both are true', () => {
    expect(getComboboxWrapperClass(true, false, false, true)).toBe('select-wrapper select-wrapper--custom select-wrapper--state-error select-wrapper--disabled');
  });

  it('includes loading modifier when loading=true', () => {
    expect(getComboboxWrapperClass(false, false, false, false, true)).toBe('select-wrapper select-wrapper--custom select-wrapper--loading');
  });
});

describe('getComboboxOptionClass', () => {
  it('returns base class only when no flags set', () => {
    expect(getComboboxOptionClass(false, false, false, false)).toBe('combobox-option');
  });

  it('includes selected modifier when selected is true', () => {
    expect(getComboboxOptionClass(true, false, false, false)).toBe('combobox-option combobox-option--selected');
  });

  it('includes disabled modifier when disabled is true', () => {
    expect(getComboboxOptionClass(false, true, false, false)).toBe('combobox-option combobox-option--disabled');
  });

  it('includes focused modifier when focused is true', () => {
    expect(getComboboxOptionClass(false, false, true, false)).toBe('combobox-option combobox-option--focused');
  });

  it('includes multiple modifier when multipleMode is true', () => {
    expect(getComboboxOptionClass(false, false, false, true)).toBe('combobox-option combobox-option--multiple');
  });

  it('includes all modifiers when all flags are true', () => {
    expect(getComboboxOptionClass(true, true, true, true)).toBe(
      'combobox-option combobox-option--selected combobox-option--disabled combobox-option--focused combobox-option--multiple',
    );
  });
});

describe('parseSelectContent', () => {
  function makeOption(value: string, label?: string, text?: string, disabled?: boolean): HTMLElement {
    const el = document.createElement('io-option');
    if (value) el.setAttribute('value', value);
    if (label !== undefined) el.setAttribute('label', label);
    if (text !== undefined) el.textContent = text;
    if (disabled) el.setAttribute('disabled', '');
    return el;
  }

  function makeOptgroup(label?: string, disabled?: boolean): HTMLElement {
    const el = document.createElement('io-optgroup');
    if (label !== undefined) el.setAttribute('label', label);
    if (disabled) el.setAttribute('disabled', '');
    return el;
  }

  it('parses direct io-option children into flat options and a single ungrouped group', () => {
    const host = document.createElement('div');
    host.appendChild(makeOption('a', 'Option A'));
    host.appendChild(makeOption('b', 'Option B'));
    const { groups, flatOptions } = parseSelectContent(host);
    expect(flatOptions).toHaveLength(2);
    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBeUndefined();
  });

  it('uses textContent as label when no label attribute or prop is set (branch 14[1])', () => {
    const host = document.createElement('div');
    const opt = document.createElement('io-option');
    opt.setAttribute('value', 'x');
    opt.textContent = 'Text Label';
    host.appendChild(opt);
    const { flatOptions } = parseSelectContent(host);
    expect(flatOptions[0].label).toBe('Text Label');
  });

  it('skips options without a value (readOption returns null)', () => {
    const host = document.createElement('div');
    const noValue = document.createElement('io-option');
    // No value attribute — readOption returns null
    noValue.setAttribute('label', 'No value');
    host.appendChild(noValue);
    const { flatOptions } = parseSelectContent(host);
    expect(flatOptions).toHaveLength(0);
  });

  it('parses io-optgroup with label', () => {
    const host = document.createElement('div');
    const group = makeOptgroup('My Group');
    group.appendChild(makeOption('g1', 'G1'));
    host.appendChild(group);
    const { groups, flatOptions } = parseSelectContent(host);
    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBe('My Group');
    expect(flatOptions).toHaveLength(1);
  });

  it('parses io-optgroup with no label (groupLabel is falsy → undefined, branch 30[1])', () => {
    const host = document.createElement('div');
    const group = makeOptgroup(); // no label attribute
    group.appendChild(makeOption('g1', 'G1'));
    host.appendChild(group);
    const { groups } = parseSelectContent(host);
    expect(groups[0].label).toBeUndefined();
  });

  it('parses io-optgroup with label from attribute when prop is not a string (branch 23[1])', () => {
    const host = document.createElement('div');
    const group = document.createElement('io-optgroup');
    group.setAttribute('label', 'Attr Label');
    group.appendChild(makeOption('o1', 'O1'));
    host.appendChild(group);
    const { groups } = parseSelectContent(host);
    expect(groups[0].label).toBe('Attr Label');
  });

  it('skips non-io-option children inside io-optgroup (line 116 continue branch)', () => {
    const host = document.createElement('div');
    const group = makeOptgroup('Group');
    group.appendChild(document.createElement('span')); // non-io-option child
    group.appendChild(makeOption('valid', 'Valid'));
    host.appendChild(group);
    const { flatOptions } = parseSelectContent(host);
    expect(flatOptions).toHaveLength(1);
  });

  it('skips io-option children inside io-optgroup with no value (line 118 continue branch)', () => {
    const host = document.createElement('div');
    const group = makeOptgroup('Group');
    const noVal = document.createElement('io-option');
    noVal.setAttribute('label', 'No value');
    group.appendChild(noVal);
    host.appendChild(group);
    const { flatOptions, groups } = parseSelectContent(host);
    expect(flatOptions).toHaveLength(0);
    expect(groups).toHaveLength(0);
  });

  it('marks options as disabled when the group is disabled', () => {
    const host = document.createElement('div');
    const group = makeOptgroup('Disabled Group', true);
    group.appendChild(makeOption('d1', 'D1'));
    host.appendChild(group);
    const { flatOptions } = parseSelectContent(host);
    expect(flatOptions[0].disabled).toBe(true);
  });

  it('merges consecutive ungrouped options into one group', () => {
    const host = document.createElement('div');
    host.appendChild(makeOption('a', 'A'));
    host.appendChild(makeOption('b', 'B'));
    const { groups } = parseSelectContent(host);
    expect(groups).toHaveLength(1);
    expect(groups[0].options).toHaveLength(2);
  });

  it('handles empty host with no children', () => {
    const host = document.createElement('div');
    const { groups, flatOptions } = parseSelectContent(host);
    expect(groups).toHaveLength(0);
    expect(flatOptions).toHaveLength(0);
  });

  it('reads io-option label from JS property when set (not from attribute)', () => {
    const host = document.createElement('div');
    const opt = document.createElement('io-option');
    opt.setAttribute('value', 'nl');
    (opt as HTMLElement & { label?: unknown }).label = 'Netherlands Prop';
    host.appendChild(opt);
    const { flatOptions } = parseSelectContent(host);
    expect(flatOptions[0].label).toBe('Netherlands Prop');
  });

  it('reads io-optgroup label and disabled from JS properties when set', () => {
    const host = document.createElement('div');
    const group = document.createElement('io-optgroup');
    (group as HTMLElement & { label?: unknown }).label = 'Prop Group';
    (group as HTMLElement & { disabled?: unknown }).disabled = true;
    const opt = document.createElement('io-option');
    opt.setAttribute('value', 'nl');
    opt.setAttribute('label', 'Netherlands');
    group.appendChild(opt);
    host.appendChild(group);
    const { groups, flatOptions } = parseSelectContent(host);
    expect(groups[0].label).toBe('Prop Group');
    expect(groups[0].disabled).toBe(true);
    expect(flatOptions[0].disabled).toBe(true);
  });
});
