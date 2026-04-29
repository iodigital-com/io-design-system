import { describe, it, expect, vi } from 'vitest';

import { IoToastItem } from './io-toast-item';

describe('io-toast-item — disabled behavior (N/A: no disabled state)', () => {
  it('does not expose a disabled prop', () => {
    const component = new IoToastItem() as any;
    expect('disabled' in component).toBe(false);
  });

  it('keeps dismiss interaction available by design', () => {
    const component = new IoToastItem() as any;
    const emitMock = vi.fn();
    component.dismiss = { emit: emitMock };

    component.handleClose();

    expect(emitMock).toHaveBeenCalledTimes(1);
  });
});
