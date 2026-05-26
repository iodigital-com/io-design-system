import { describe, it, expect, vi } from 'vitest';

import { IoSelect } from './io-select';

describe('io-select — default props', () => {
  let component: IoSelect;

  beforeEach(() => {
    component = new IoSelect();
    (component as any).el = document.createElement('io-select');
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
  });

  it('has empty value by default', () => {
    expect(component.value).toBe('');
  });

  it('has empty flatOptions by default', () => {
    expect((component as any).flatOptions).toEqual([]);
  });

  it('has empty groups by default', () => {
    expect((component as any).groups).toEqual([]);
  });

  it('has size md by default', () => {
    expect(component.size).toBe('md');
  });

  it('is not required by default', () => {
    expect(component.required).toBe(false);
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('has state=none by default', () => {
    expect(component.state).toBe('none');
  });

  it('has no placeholder by default', () => {
    expect(component.placeholder).toBeUndefined();
  });

  it('has empty message by default', () => {
    expect(component.message).toBe('');
  });

  it('setFocus resolves without throwing', async () => {
    const select = document.createElement('select');
    select.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(select) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });
});
