import { describe, it, expect, vi } from 'vitest';
import { IoTag } from './io-tag';

describe('io-tag — click handling', () => {
  let component: IoTag;
  let toggleMock: ReturnType<typeof vi.fn>;
  let removeMock: ReturnType<typeof vi.fn>;

  function makeEvent() {
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    return ev;
  }

  beforeEach(() => {
    component = new IoTag();
    (component as any).el = document.createElement('io-tag');
    toggleMock = vi.fn();
    removeMock = vi.fn();
    (component as any).ioToggle = { emit: toggleMock };
    (component as any).ioRemove = { emit: removeMock };
  });

  it('emits ioToggle with true when toggling from false', () => {
    component.selected = false;
    (component as any).handleToggle(makeEvent());
    expect(toggleMock).toHaveBeenCalledWith(true);
    expect(component.selected).toBe(true);
  });

  it('emits ioToggle with false when toggling from true', () => {
    component.selected = true;
    (component as any).handleToggle(makeEvent());
    expect(toggleMock).toHaveBeenCalledWith(false);
    expect(component.selected).toBe(false);
  });

  it('does not emit ioToggle when disabled', () => {
    component.disabled = true;
    (component as any).handleToggle(makeEvent());
    expect(toggleMock).not.toHaveBeenCalled();
  });

  it('emits ioRemove when remove handler fires', () => {
    component.removable = true;
    (component as any).handleRemove(makeEvent());
    expect(removeMock).toHaveBeenCalledOnce();
  });

  it('does not emit ioRemove when disabled', () => {
    component.disabled = true;
    component.removable = true;
    (component as any).handleRemove(makeEvent());
    expect(removeMock).not.toHaveBeenCalled();
  });
});
