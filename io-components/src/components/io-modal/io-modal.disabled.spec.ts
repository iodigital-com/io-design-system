import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoModal } from './io-modal';

describe('io-modal — disabled behavior (N/A: no disabled state)', () => {
  let component: IoModal;

  beforeEach(() => {
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
    component.open = true;
  });

  it('does not expose a disabled prop', () => {
    expect('disabled' in component).toBe(false);
  });

  it('uses closeOnBackdrop as the interaction guard', () => {
    component.closeOnBackdrop = false;
    const dialogEl = document.createElement('div') as unknown as HTMLDialogElement;
    vi.spyOn(dialogEl, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      right: 400,
      top: 100,
      bottom: 400,
      width: 300,
      height: 300,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    });

    const ev = { clientX: 10, clientY: 10, currentTarget: dialogEl } as unknown as MouseEvent;
    (component as any).handleDialogClick(ev);

    expect(component.open).toBe(true);
  });
});
