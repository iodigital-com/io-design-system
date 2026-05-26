/**
 * io-drawer — aria prop tests
 *
 * Verifies that the `aria?: Record<string, string>` prop correctly injects
 * ARIA attributes onto the native <dialog> element.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoDrawer } from './io-drawer';
import { applyAriaProp } from '../../utils/aria-prop';

vi.mock('../../utils/aria-prop', () => ({
  applyAriaProp: vi.fn(),
}));

describe('io-drawer — aria prop', () => {
  let component: IoDrawer;

  beforeEach(() => {
    vi.clearAllMocks();
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('aria prop is undefined by default', () => {
    expect(component.aria).toBeUndefined();
  });

  it('accepts a custom aria record', () => {
    component.aria = { controls: 'main-content' };
    expect(component.aria).toEqual({ controls: 'main-content' });
  });

  it('calls applyAriaProp when aria watch fires', () => {
    const mockDialog = document.createElement('dialog') as HTMLDialogElement;
    (component as any).dialogEl = mockDialog;
    component.aria = { controls: 'filter-results' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith(
      { controls: 'filter-results' },
      mockDialog,
    );
  });

  it('calls applyAriaProp with null when dialogEl is not set', () => {
    (component as any).dialogEl = undefined;
    component.aria = { controls: 'panel' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith({ controls: 'panel' }, null);
  });
});
