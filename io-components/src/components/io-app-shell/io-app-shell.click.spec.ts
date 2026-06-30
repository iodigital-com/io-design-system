import { describe, it, expect, vi } from 'vitest';
import { IoAppShell } from './io-app-shell';

describe('io-app-shell — event emission', () => {
  it('emits sidebarStartUpdate on closeSidebarStart', () => {
    const component = new IoAppShell();
    (component as any).sidebarStartOpen = true;
    const emitSpy = vi.fn();
    component.sidebarStartUpdate = { emit: emitSpy } as any;
    component.sidebarEndDismiss = { emit: vi.fn() } as any;
    component['closeSidebarStart']('close-button');
    expect(emitSpy).toHaveBeenCalledWith({ open: false });
  });

  it('emits sidebarEndDismiss on close', () => {
    const component = new IoAppShell();
    (component as any).sidebarEndOpen = true;
    const emitSpy = vi.fn();
    component.sidebarEndDismiss = { emit: emitSpy } as any;
    component.sidebarStartUpdate = { emit: vi.fn() } as any;
    component['onSidebarEndOpenChange'](false);
    expect(emitSpy).toHaveBeenCalledWith({ reason: 'close-button' });
  });
});
