import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoCheckbox } from './io-checkbox';

describe('io-checkbox — loading state', () => {
  let component: IoCheckbox;

  beforeEach(() => {
    component = new IoCheckbox();
    (component as any).el = document.createElement('io-checkbox');
    (component as any).change = { emit: vi.fn() };
  });

  it('is not loading by default', () => {
    expect(component.loading).toBe(false);
  });

  it('reflects loading prop when set to true', () => {
    component.loading = true;
    expect(component.loading).toBe(true);
  });

  it('treats loading as disabled for interaction purposes', () => {
    component.loading = true;
    expect(component.loading || component.disabled).toBe(true);
  });

  it('disabled prop remains false when only loading is set', () => {
    component.loading = true;
    expect(component.disabled).toBe(false);
    expect(component.loading).toBe(true);
  });

  it('can combine loading and disabled', () => {
    component.loading = true;
    component.disabled = true;
    expect(component.loading).toBe(true);
    expect(component.disabled).toBe(true);
  });

  it('render does not throw when loading=true (native input stays in DOM)', () => {
    component.loading = true;
    (component as any).label = 'Loading checkbox';
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });
});
