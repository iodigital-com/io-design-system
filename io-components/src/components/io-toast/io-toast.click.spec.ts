import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoToast } from './io-toast';
import { toastManager } from './io-toast-manager';

describe('io-toast — click behavior', () => {
  let component: IoToast;

  beforeEach(() => {
    component = new IoToast();
    (component as any).el = document.createElement('io-toast');
    toastManager.unregister();
    component.connectedCallback();
  });

  afterEach(() => {
    component.disconnectedCallback();
  });

  it('delegates toast item dismiss handling to toastManager.dismiss with the entry id', () => {
    const dismissSpy = vi.spyOn(toastManager, 'dismiss');

    (component as any).handleItemDismiss(42);

    expect(dismissSpy).toHaveBeenCalledWith(42);
  });

  it('renders safely with active messages', () => {
    (component as any).visibleMsgs = [{ id: 1, text: 'Saved', variant: 'success' }];

    expect(() => component.render()).not.toThrow();
  });
});
