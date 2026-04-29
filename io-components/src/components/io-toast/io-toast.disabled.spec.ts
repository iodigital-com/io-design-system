import { describe, it, expect, beforeEach, afterEach } from 'vitest';

import { IoToast } from './io-toast';
import { toastManager } from './io-toast-manager';

describe('io-toast — disabled behavior (N/A: no disabled state)', () => {
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

  it('does not expose a disabled prop', () => {
    expect('disabled' in (component as any)).toBe(false);
  });

  it('still accepts addToast calls because disabled is not part of the contract', async () => {
    await expect(component.addToast({ text: 'Still works' })).resolves.toBeUndefined();
  });
});
