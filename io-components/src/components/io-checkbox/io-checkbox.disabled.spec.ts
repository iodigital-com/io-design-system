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

  it('reflects state prop when set to error', () => {
    component.state = 'error';
    expect(component.state).toBe('error');
  });

  it('sets checked prop when checked changes', () => {
    component.checked = true;
    expect(component.checked).toBe(true);
  });

  it('indeterminate prop can be set', () => {
    component.indeterminate = true;
    expect(component.indeterminate).toBe(true);
  });

  it('is not loading by default', () => {
    expect(component.loading).toBe(false);
  });

  it('reflects loading prop when set to true', () => {
    component.loading = true;
    expect(component.loading).toBe(true);
  });
});
