import { describe, it, expect, vi } from 'vitest';
import { IoTag } from './io-tag';

describe('io-tag — disabled', () => {
  let component: IoTag;

  beforeEach(() => {
    component = new IoTag();
    (component as any).el = document.createElement('io-tag');
    (component as any).ioToggle = { emit: vi.fn() };
    (component as any).ioRemove = { emit: vi.fn() };
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('reflects disabled prop when set to true', () => {
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('does not toggle selected state when disabled', () => {
    component.disabled = true;
    component.selected = false;
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (component as any).handleToggle(ev);
    expect(component.selected).toBe(false);
  });

  it('calls preventDefault and stopPropagation on toggle when disabled', () => {
    component.disabled = true;
    const preventDefaultMock = vi.fn();
    const stopPropagationMock = vi.fn();
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: preventDefaultMock });
    Object.defineProperty(ev, 'stopPropagation', { value: stopPropagationMock });
    (component as any).handleToggle(ev);
    expect(preventDefaultMock).toHaveBeenCalled();
    expect(stopPropagationMock).toHaveBeenCalled();
  });
});
