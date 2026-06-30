import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoLinkPure } from './io-link-pure';

describe('io-link-pure — disabled state', () => {
  let component: IoLinkPure;

  beforeEach(() => {
    component = new IoLinkPure();
    (component as any).click = { emit: vi.fn() };
    (component as any).el = { textContent: 'Test', shadowRoot: null };
    component.href = '/test';
  });

  it('disabled defaults to false', () => {
    expect(component.disabled).toBe(false);
  });

  it('disabled can be set to true', () => {
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('blocks click event when disabled', () => {
    component.disabled = true;
    const emitSpy = vi.fn();
    (component as any).click = { emit: emitSpy };
    const ev = { preventDefault: vi.fn(), stopPropagation: vi.fn() } as unknown as MouseEvent;
    (component as any).handleClick(ev);
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
