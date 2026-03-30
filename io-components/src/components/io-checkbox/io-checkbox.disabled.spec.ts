import { describe, it, expect, vi } from 'vitest';
import { IoCheckbox } from './io-checkbox';

describe('io-checkbox — disabled', () => {
  let component: IoCheckbox;

  beforeEach(() => {
    component = new IoCheckbox();
    (component as any).el = document.createElement('io-checkbox');
    (component as any).change = { emit: vi.fn() };
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('reflects disabled prop when set to true', () => {
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('reflects error prop when set to true', () => {
    component.error = true;
    expect(component.error).toBe(true);
  });

  it('sets checked prop when checked changes', () => {
    component.checked = true;
    expect(component.checked).toBe(true);
  });

  it('indeterminate prop can be set', () => {
    component.indeterminate = true;
    expect(component.indeterminate).toBe(true);
  });
});
