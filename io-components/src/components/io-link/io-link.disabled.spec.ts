import { describe, it, expect, vi } from 'vitest';
import { IoLink } from './io-link';

describe('io-link — disabled', () => {
  let component: IoLink;

  beforeEach(() => {
    component = new IoLink();
    (component as any).el = document.createElement('io-link');
    (component as any).click = { emit: vi.fn() };
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('reflects disabled prop when set to true', () => {
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('prevents click when disabled', () => {
    component.disabled = true;
    const emitMock = (component as any).click.emit;
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (component as any).handleClick(ev);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('calls preventDefault and stopPropagation when disabled', () => {
    component.disabled = true;
    const preventDefaultMock = vi.fn();
    const stopPropagationMock = vi.fn();
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: preventDefaultMock });
    Object.defineProperty(ev, 'stopPropagation', { value: stopPropagationMock });
    (component as any).handleClick(ev);
    expect(preventDefaultMock).toHaveBeenCalled();
    expect(stopPropagationMock).toHaveBeenCalled();
  });
});
