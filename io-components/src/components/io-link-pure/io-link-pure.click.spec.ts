import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoLinkPure } from './io-link-pure';

describe('io-link-pure — click event', () => {
  let component: IoLinkPure;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoLinkPure();
    emitSpy = vi.fn();
    (component as any).click = { emit: emitSpy };
    (component as any).el = { textContent: 'Test', shadowRoot: null };
    component.href = '/test';
  });

  it('emits click event when not disabled', () => {
    const ev = new MouseEvent('click');
    (component as any).handleClick(ev);
    expect(emitSpy).toHaveBeenCalledWith(ev);
  });

  it('does not emit click event when disabled', () => {
    component.disabled = true;
    const ev = { preventDefault: vi.fn(), stopPropagation: vi.fn() } as unknown as MouseEvent;
    (component as any).handleClick(ev);
    expect(emitSpy).not.toHaveBeenCalled();
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(ev.stopPropagation).toHaveBeenCalled();
  });
});
