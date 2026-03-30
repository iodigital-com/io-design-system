import { describe, it, expect, vi } from 'vitest';
import { IoButton } from './io-button';

describe('io-button — default props', () => {
  let component: IoButton;

  beforeEach(() => {
    component = new IoButton();
    (component as any).el = document.createElement('io-button');
    (component as any).click = { emit: vi.fn() };
  });

  it('has variant solid by default', () => {
    expect(component.variant).toBe('solid');
  });

  it('has color blue by default', () => {
    expect(component.color).toBe('blue');
  });

  it('has size md by default', () => {
    expect(component.size).toBe('md');
  });

  it('has type button by default', () => {
    expect(component.type).toBe('button');
  });

  it('has target _self by default', () => {
    expect(component.target).toBe('_self');
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('is not loading by default', () => {
    expect(component.loading).toBe(false);
  });

  it('is not fullWidth by default', () => {
    expect(component.fullWidth).toBe(false);
  });

  it('has no arrow by default', () => {
    expect(component.arrow).toBeUndefined();
  });

  it('setFocus resolves without throwing', async () => {
    const inner = document.createElement('button');
    inner.className = 'btn';
    inner.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(inner) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });
});
