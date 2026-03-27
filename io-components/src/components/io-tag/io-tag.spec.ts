import { describe, it, expect, vi } from 'vitest';
import { IoTag } from './io-tag';

describe('io-tag — default props', () => {
  let component: IoTag;

  beforeEach(() => {
    component = new IoTag();
    (component as any).el = document.createElement('io-tag');
    (component as any).ioToggle = { emit: vi.fn() };
    (component as any).ioRemove = { emit: vi.fn() };
  });

  it('is not selected by default', () => {
    expect(component.selected).toBe(false);
  });

  it('is not removable by default', () => {
    expect(component.removable).toBe(false);
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('has size md by default', () => {
    expect(component.size).toBe('md');
  });

  it('has color default by default', () => {
    expect(component.color).toBe('default');
  });
});
