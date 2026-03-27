import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { IoToast } from './io-toast';
import { toastManager } from './io-toast-manager';

describe('io-toast — registration', () => {
  let component: IoToast;

  beforeEach(() => {
    component = new IoToast();
    (component as any).el = document.createElement('io-toast');
    // Ensure clean state before each test
    toastManager.unregister();
  });

  afterEach(() => {
    toastManager.unregister();
  });

  it('registers with toastManager on connectedCallback', () => {
    const registerSpy = vi.spyOn(toastManager, 'register');
    component.connectedCallback();
    expect(registerSpy).toHaveBeenCalled();
  });

  it('unregisters with toastManager on disconnectedCallback', () => {
    const unregisterSpy = vi.spyOn(toastManager, 'unregister');
    component.connectedCallback();
    component.disconnectedCallback();
    expect(unregisterSpy).toHaveBeenCalled();
  });

  it('addToast() delegates to toastManager', async () => {
    const addSpy = vi.spyOn(toastManager, 'addToast');
    component.connectedCallback();
    await component.addToast({ text: 'Hello', variant: 'success' });
    expect(addSpy).toHaveBeenCalledWith({ text: 'Hello', variant: 'success' });
  });
});
