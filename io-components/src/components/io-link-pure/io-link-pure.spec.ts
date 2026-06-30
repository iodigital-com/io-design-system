import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoLinkPure } from './io-link-pure';

describe('io-link-pure — default props', () => {
  let component: IoLinkPure;

  beforeEach(() => {
    component = new IoLinkPure();
    (component as any).click = { emit: vi.fn() };
    (component as any).el = { textContent: '', shadowRoot: null };
  });

  it('defaults size to md', () => {
    expect(component.size).toBe('md');
  });

  it('defaults alignLabel to start', () => {
    expect(component.alignLabel).toBe('start');
  });

  it('defaults disabled to false', () => {
    expect(component.disabled).toBe(false);
  });

  it('defaults active to false', () => {
    expect(component.active).toBe(false);
  });

  it('defaults stretch to false', () => {
    expect(component.stretch).toBe(false);
  });

  it('defaults hideLabel to false', () => {
    expect(component.hideLabel).toBe(false);
  });

  it('defaults external to false', () => {
    expect(component.external).toBe(false);
  });

  it('href defaults to undefined', () => {
    expect(component.href).toBeUndefined();
  });
});

describe('io-link-pure — prop setters', () => {
  it('accepts size xs', () => {
    const c = new IoLinkPure();
    c.size = 'xs';
    expect(c.size).toBe('xs');
  });

  it('accepts size sm', () => {
    const c = new IoLinkPure();
    c.size = 'sm';
    expect(c.size).toBe('sm');
  });

  it('accepts alignLabel end', () => {
    const c = new IoLinkPure();
    c.alignLabel = 'end';
    expect(c.alignLabel).toBe('end');
  });

  it('accepts active true', () => {
    const c = new IoLinkPure();
    c.active = true;
    expect(c.active).toBe(true);
  });

  it('accepts stretch true', () => {
    const c = new IoLinkPure();
    c.stretch = true;
    expect(c.stretch).toBe(true);
  });
});
