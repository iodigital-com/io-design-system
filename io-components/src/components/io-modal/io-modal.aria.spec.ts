/**
 * io-modal — aria prop tests
 *
 * Verifies that the `aria?: Record<string, string>` prop correctly injects
 * ARIA attributes onto the native <dialog> element.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoModal } from './io-modal';
import { applyAriaProp } from '../../utils/aria-prop';

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

  it('accepts an aria-label record', () => {
    component.aria = { 'aria-label': 'Confirm deletion' };
    expect(component.aria).toEqual({ 'aria-label': 'Confirm deletion' });
  });

  it('accepts an aria-labelledby record', () => {
    component.aria = { 'aria-labelledby': 'heading-id' };
    expect(component.aria).toEqual({ 'aria-labelledby': 'heading-id' });
  });

  it('accepts an aria-describedby record', () => {
    component.aria = { 'aria-describedby': 'desc-id' };
    expect(component.aria).toEqual({ 'aria-describedby': 'desc-id' });
  });

  it('calls applyAriaProp when aria watch fires', () => {
    const mockDialog = document.createElement('dialog') as HTMLDialogElement;
    (component as any).dialogEl = mockDialog;
    component.aria = { 'aria-label': 'Step dialog' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith(
      { 'aria-label': 'Step dialog' },
      mockDialog,
    );
  });

  it('calls applyAriaProp with null when dialogEl is not set', () => {
    (component as any).dialogEl = undefined;
    component.aria = { 'aria-label': 'Panel' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith({ 'aria-label': 'Panel' }, null);
  });
});
