/**
 * io-modal — aria prop tests
 *
 * Verifies that the `aria?: Record<string, string>` prop correctly injects
 * ARIA attributes onto the native <dialog> element.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { applyAriaProp } from '../../utils/aria-prop';

import { IoModal } from './io-modal';

vi.mock('../../utils/aria-prop', () => ({
  applyAriaProp: vi.fn(),
}));

describe('io-modal — aria prop', () => {
  let component: IoModal;

  beforeEach(() => {
    vi.clearAllMocks();
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('aria prop is undefined by default', () => {
    expect(component.aria).toBeUndefined();
  });

  it('accepts a custom aria record', () => {
    component.aria = { owns: 'panel-id' };
    expect(component.aria).toEqual({ owns: 'panel-id' });
  });

  it('calls applyAriaProp when aria watch fires', () => {
    const mockDialog = document.createElement('dialog') as HTMLDialogElement;
    (component as any).dialogEl = mockDialog;
    component.aria = { owns: 'step-panel' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith(
      { owns: 'step-panel' },
      mockDialog,
    );
  });

  it('calls applyAriaProp with null when dialogEl is not set', () => {
    (component as any).dialogEl = undefined;
    component.aria = { owns: 'panel' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith({ owns: 'panel' }, null);
  });
});
