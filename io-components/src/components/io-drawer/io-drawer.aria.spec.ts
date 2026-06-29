/**
 * io-drawer — aria prop tests
 *
 * Verifies that the narrowed `aria?: IoDrawerAriaProps` prop correctly injects
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
    vi.spyOn(console, 'error').mockImplementation(() => {});
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('aria prop is undefined by default', () => {
    expect(component.aria).toBeUndefined();
  });

  it('accepts an aria-label record', () => {
    component.aria = { 'aria-label': 'Navigation settings' };
    expect(component.aria).toEqual({ 'aria-label': 'Navigation settings' });
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
    component.aria = { 'aria-label': 'Filter results' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith(
      { 'aria-label': 'Filter results' },
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
