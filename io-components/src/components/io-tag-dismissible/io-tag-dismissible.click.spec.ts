import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTagDismissible } from './io-tag-dismissible';

describe('io-tag-dismissible — dismiss event', () => {
  let component: IoTagDismissible;
  let dismissMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoTagDismissible();
    component.label = 'React';
    (component as any).el = document.createElement('io-tag-dismissible');
    dismissMock = vi.fn();
    (component as any).dismiss = { emit: dismissMock };
  });

  it('emits dismiss when handleDismiss is called', () => {
    (component as any).handleDismiss();
    expect(dismissMock).toHaveBeenCalledOnce();
  });

  it('emits dismiss with void (no detail)', () => {
    (component as any).handleDismiss();
    expect(dismissMock).toHaveBeenCalledWith();
  });

  it('emits dismiss on Delete keydown', () => {
    const ev = new KeyboardEvent('keydown', { key: 'Delete' });
    component.handleKeydown(ev);
    expect(dismissMock).toHaveBeenCalledOnce();
  });

  it('emits dismiss on Backspace keydown', () => {
    const ev = new KeyboardEvent('keydown', { key: 'Backspace' });
    component.handleKeydown(ev);
    expect(dismissMock).toHaveBeenCalledOnce();
  });

  it('does not emit dismiss on other keys', () => {
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    component.handleKeydown(ev);
    expect(dismissMock).not.toHaveBeenCalled();
  });

  it('does not emit dismiss when disabled', () => {
    component.disabled = true;
    (component as any).handleDismiss();
    expect(dismissMock).not.toHaveBeenCalled();
  });
});
