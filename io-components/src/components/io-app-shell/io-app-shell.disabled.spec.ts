import { describe, it, expect } from 'vitest';
import { IoAppShell } from './io-app-shell';

describe('io-app-shell — disabled/closed states', () => {
  it('sidebar-start is closed by default', () => {
    const component = new IoAppShell();
    expect(component.sidebarStartOpen).toBe(false);
  });

  it('sidebar-end is closed by default', () => {
    const component = new IoAppShell();
    expect(component.sidebarEndOpen).toBe(false);
  });
});
