import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoToastItem } from './io-toast-item';

describe('io-toast-item — click behavior', () => {
  let component: IoToastItem;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoToastItem();
    emitMock = vi.fn();
    (component as any).dismiss = { emit: emitMock };
    (component as any).action = { emit: vi.fn() };
  });

  it('emits dismiss when close is clicked', () => {
    (component as any).handleClose();
    expect(emitMock).toHaveBeenCalledTimes(1);
  });

  it('emits once per close interaction', () => {
    (component as any).handleClose();
    (component as any).handleClose();

    expect(emitMock).toHaveBeenCalledTimes(2);
  });

  it('emits action when action button is clicked', () => {
    const actionEmitMock = vi.fn();
    (component as any).action = { emit: actionEmitMock };
    component.actionLabel = 'Undo';

    (component as any).handleAction();

    expect(actionEmitMock).toHaveBeenCalledTimes(1);
  });

  it('dismiss and action are independent — clicking action does not dismiss', () => {
    const actionEmitMock = vi.fn();
    (component as any).action = { emit: actionEmitMock };
    component.actionLabel = 'Undo';

    (component as any).handleAction();

    expect(emitMock).not.toHaveBeenCalled();
    expect(actionEmitMock).toHaveBeenCalledTimes(1);
  });
});
