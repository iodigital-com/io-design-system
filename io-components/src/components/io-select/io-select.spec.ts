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

  it('has empty options array by default', () => {
    expect(component.options).toEqual([]);
  });

  it('is not required by default', () => {
    expect(component.required).toBe(false);
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('is not in error state by default', () => {
    expect(component.error).toBe(false);
  });

  it('has no placeholder by default', () => {
    expect(component.placeholder).toBeUndefined();
  });

  it('has no errorMessage by default', () => {
    expect(component.errorMessage).toBeUndefined();
  });

  it('setFocus resolves without throwing', async () => {
    const select = document.createElement('select');
    select.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(select) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });
});
