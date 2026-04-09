import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoToastItem } from './io-toast-item';

describe('io-toast-item — click behavior', () => {
  let component: IoToastItem;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoToastItem();
    emitMock = vi.fn();
    (component as any).dismiss = { emit: emitMock };
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
});
