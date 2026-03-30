import { describe, it, expect, vi } from 'vitest';
import { IoCheckbox } from './io-checkbox';

describe('io-checkbox — default props', () => {
  let component: IoCheckbox;

  beforeEach(() => {
    component = new IoCheckbox();
    (component as any).el = document.createElement('io-checkbox');
    (component as any).change = { emit: vi.fn() };
  });

  it('is not checked by default', () => {
    expect(component.checked).toBe(false);
  });

  it('is not indeterminate by default', () => {
    expect(component.indeterminate).toBe(false);
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

  it('has empty value by default', () => {
    expect(component.value).toBe('');
  });

  it('has no errorMessage by default', () => {
    expect(component.errorMessage).toBeUndefined();
  });

  it('has no helperText by default', () => {
    expect(component.helperText).toBeUndefined();
  });

  it('setFocus resolves without throwing', async () => {
    const input = document.createElement('input');
    input.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(input) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });
});
