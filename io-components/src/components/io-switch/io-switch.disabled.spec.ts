import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoSwitch } from './io-switch';

describe('io-switch — disabled state', () => {
  let component: IoSwitch;

  beforeEach(() => {
    component = new IoSwitch();
    (component as any).el = document.createElement('io-switch');
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

  it('reflects checked prop when set to true', () => {
    component.checked = true;
    expect(component.checked).toBe(true);
  });

  it('can be both disabled and checked simultaneously', () => {
    component.disabled = true;
    component.checked = true;
    expect(component.disabled).toBe(true);
    expect(component.checked).toBe(true);
  });

  it('can be both disabled and in error state simultaneously', () => {
    component.disabled = true;
    component.error = true;
    expect(component.disabled).toBe(true);
    expect(component.error).toBe(true);
  });
});
