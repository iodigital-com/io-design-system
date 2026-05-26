import { describe, it, expect, vi } from 'vitest';

import { IoSelect } from './io-select';

describe('io-select — disabled', () => {
  let component: IoSelect;

  beforeEach(() => {
    component = new IoSelect();
    (component as any).el = document.createElement('io-select');
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
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

  it('required prop defaults to false', () => {
    expect(component.required).toBe(false);
  });

  it('is not loading by default', () => {
    expect(component.loading).toBe(false);
  });

  it('reflects loading prop when set to true', () => {
    component.loading = true;
    expect(component.loading).toBe(true);
  });
});
