import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoTagDismissible } from './io-tag-dismissible';

describe('io-tag-dismissible — disabled state (#774)', () => {
  let component: IoTagDismissible;

  beforeEach(() => {
    component = new IoTagDismissible();
    component.label = 'React';
    (component as any).dismiss = { emit: vi.fn() };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('disabled defaults to false', () => {
    expect(component.disabled).toBe(false);
  });

  it('can be set to true', () => {
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('handleDismiss does not emit when disabled=true', () => {
    component.disabled = true;
    (component as any).handleDismiss();
    expect((component as any).dismiss.emit).not.toHaveBeenCalled();
  });

  it('handleDismiss emits when disabled=false', () => {
    component.disabled = false;
    (component as any).handleDismiss();
    expect((component as any).dismiss.emit).toHaveBeenCalledOnce();
  });

  it('handleKeydown Delete does not emit when disabled=true', () => {
    component.disabled = true;
    const ev = new KeyboardEvent('keydown', { key: 'Delete' });
    (component as any).handleKeydown(ev);
    expect((component as any).dismiss.emit).not.toHaveBeenCalled();
  });

  it('handleKeydown Backspace does not emit when disabled=true', () => {
    component.disabled = true;
    const ev = new KeyboardEvent('keydown', { key: 'Backspace' });
    (component as any).handleKeydown(ev);
    expect((component as any).dismiss.emit).not.toHaveBeenCalled();
  });

  it('handleKeydown Delete emits when disabled=false', () => {
    component.disabled = false;
    const ev = new KeyboardEvent('keydown', { key: 'Delete' });
    (component as any).handleKeydown(ev);
    expect((component as any).dismiss.emit).toHaveBeenCalledOnce();
  });

  it('render does not throw with disabled=true', () => {
    component.disabled = true;
    expect(() => (component as any).render()).not.toThrow();
  });

  it('render does not throw with disabled=false', () => {
    component.disabled = false;
    expect(() => (component as any).render()).not.toThrow();
  });
});
