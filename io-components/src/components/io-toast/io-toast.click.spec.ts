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

  it('delegates toast item dismiss handling to toastManager.dismiss', () => {
    const dismissSpy = vi.spyOn(toastManager, 'dismiss');

    (component as any).handleItemDismiss();

    expect(dismissSpy).toHaveBeenCalledTimes(1);
  });

  it('renders safely with an active message', () => {
    (component as any).currentMsg = { id: 1, text: 'Saved', variant: 'success' };

    expect(() => component.render()).not.toThrow();
  });
});
