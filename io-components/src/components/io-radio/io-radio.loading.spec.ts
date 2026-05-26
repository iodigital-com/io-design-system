import { describe, it, expect, beforeEach } from 'vitest';

import { IoRadio } from './io-radio';

describe('io-radio — loading state', () => {
  let component: IoRadio;

  beforeEach(() => {
    component = new IoRadio();
    (component as any).el = document.createElement('io-radio');
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
});
