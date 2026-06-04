import { describe, it, expect, beforeEach } from 'vitest';

import { parseSelectContent } from './io-select-utils';

describe('parseSelectContent', () => {
  let host: HTMLElement;

  beforeEach(() => {
    host = document.createElement('div');
  });

  it('returns empty groups and flatOptions when host has no children', () => {
    const result = parseSelectContent(host);
    expect(result.groups).toEqual([]);
    expect(result.flatOptions).toEqual([]);
  });

  it('parses flat io-option children', () => {
    const opt = document.createElement('io-option') as HTMLElement & { value: string; label: string };
    opt.value = 'nl';
    opt.label = 'Netherlands';
    host.appendChild(opt);

    const result = parseSelectContent(host);
    expect(result.flatOptions).toHaveLength(1);
    expect(result.flatOptions[0]).toEqual({ value: 'nl', label: 'Netherlands' });
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0].label).toBeUndefined();
  });

  it('reads value from getAttribute when JS property not set', () => {
    const opt = document.createElement('io-option');
    opt.setAttribute('value', 'be');
    opt.setAttribute('label', 'Belgium');
    host.appendChild(opt);

    const result = parseSelectContent(host);
    expect(result.flatOptions[0].value).toBe('be');
    expect(result.flatOptions[0].label).toBe('Belgium');
  });

  it('skips io-option without value', () => {
    const opt = document.createElement('io-option');
    opt.setAttribute('label', 'No value');
    host.appendChild(opt);

    const result = parseSelectContent(host);
    expect(result.flatOptions).toHaveLength(0);
  });

  it('reads disabled from JS property', () => {
    const opt = document.createElement('io-option') as HTMLElement & { value: string; label: string; disabled: boolean };
    opt.value = 'se';
    opt.label = 'Sweden';
    opt.disabled = true;
    host.appendChild(opt);

    const result = parseSelectContent(host);
    expect(result.flatOptions[0].disabled).toBe(true);
  });

  it('reads disabled from attribute', () => {
    const opt = document.createElement('io-option');
    opt.setAttribute('value', 'se');
    opt.setAttribute('label', 'Sweden');
    opt.setAttribute('disabled', '');
    host.appendChild(opt);

    const result = parseSelectContent(host);
    expect(result.flatOptions[0].disabled).toBe(true);
  });

  it('merges consecutive ungrouped options into a single group', () => {
    for (const [v, l] of [['nl', 'Netherlands'], ['be', 'Belgium']]) {
      const opt = document.createElement('io-option') as HTMLElement & { value: string; label: string };
      opt.value = v;
      opt.label = l;
      host.appendChild(opt);
    }
    const result = parseSelectContent(host);
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0].options).toHaveLength(2);
    expect(result.flatOptions).toHaveLength(2);
  });

  it('parses io-optgroup with io-option children', () => {
    const group = document.createElement('io-optgroup') as HTMLElement & { label: string };
    group.label = 'Europe';
    const opt = document.createElement('io-option') as HTMLElement & { value: string; label: string };
    opt.value = 'nl';
    opt.label = 'Netherlands';
    group.appendChild(opt);
    host.appendChild(group);

    const result = parseSelectContent(host);
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0].label).toBe('Europe');
    expect(result.groups[0].options).toHaveLength(1);
    expect(result.flatOptions).toHaveLength(1);
  });

  it('propagates optgroup disabled to child options', () => {
    const group = document.createElement('io-optgroup') as HTMLElement & { label: string; disabled: boolean };
    group.label = 'Disabled Group';
    group.disabled = true;
    const opt = document.createElement('io-option') as HTMLElement & { value: string; label: string };
    opt.value = 'x';
    opt.label = 'Item';
    group.appendChild(opt);
    host.appendChild(group);

    const result = parseSelectContent(host);
    expect(result.flatOptions[0].disabled).toBe(true);
  });

  it('handles mixed flat options and optgroups', () => {
    const opt1 = document.createElement('io-option') as HTMLElement & { value: string; label: string };
    opt1.value = 'us';
    opt1.label = 'United States';
    host.appendChild(opt1);

    const group = document.createElement('io-optgroup') as HTMLElement & { label: string };
    group.label = 'Europe';
    const opt2 = document.createElement('io-option') as HTMLElement & { value: string; label: string };
    opt2.value = 'nl';
    opt2.label = 'Netherlands';
    group.appendChild(opt2);
    host.appendChild(group);

    const result = parseSelectContent(host);
    expect(result.groups).toHaveLength(2);
    expect(result.flatOptions).toHaveLength(2);
    expect(result.flatOptions[0].value).toBe('us');
    expect(result.flatOptions[1].value).toBe('nl');
  });
});
