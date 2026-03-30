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

  it('reflects error prop when set to true', () => {
    component.error = true;
    expect(component.error).toBe(true);
  });

  it('required prop defaults to false', () => {
    expect(component.required).toBe(false);
  });
});
