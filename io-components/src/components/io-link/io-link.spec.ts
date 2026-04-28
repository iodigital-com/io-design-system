import { describe, it, expect, vi } from 'vitest';
import { IoLink } from './io-link';

describe('io-link — default props', () => {
  let component: IoLink;

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
    (component as any).click = { emit: vi.fn() };
  });

  it('has variant standalone by default', () => {
    expect(component.variant).toBe('standalone');
  });

  it('has color blue by default', () => {
    expect(component.color).toBe('blue');
  });

  it('has target _self by default', () => {
    expect(component.target).toBe('_self');
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('is not external by default', () => {
    expect(component.external).toBe(false);
  });

  it('has no rel by default', () => {
    expect(component.rel).toBeUndefined();
  });

  it('has no download by default', () => {
    expect(component.download).toBeUndefined();
  });

  it('setFocus resolves without throwing', async () => {
    const inner = document.createElement('a');
    inner.className = 'link';
    inner.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(inner) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });

  it('setFocus handles missing inner element gracefully', async () => {
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(null) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });
});

describe('io-link — download prop', () => {
  let component: IoLink;

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
    (component as any).click = { emit: vi.fn() };
  });

  it('accepts download prop value', () => {
    component.download = 'file.pdf';
    expect(component.download).toBe('file.pdf');
  });

  it('allows filename in download attribute', () => {
    component.download = 'my-document.pdf';
    expect(component.download).toBe('my-document.pdf');
  });
});

describe('io-link — external link security', () => {
  let component: IoLink;

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
    (component as any).click = { emit: vi.fn() };
  });

  it('has external prop settable to true', () => {
    component.external = true;
    expect(component.external).toBe(true);
  });

  it('has external prop settable to false', () => {
    component.external = false;
    expect(component.external).toBe(false);
  });
});
