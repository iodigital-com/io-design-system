import { describe, it, expect } from 'vitest';
import { IoAppShell } from './io-app-shell';

describe('io-app-shell — default props', () => {
  it('has sidebarStartOpen=false by default', () => {
    const component = new IoAppShell();
    expect(component.sidebarStartOpen).toBe(false);
  });

  it('has sidebarEndOpen=false by default', () => {
    const component = new IoAppShell();
    expect(component.sidebarEndOpen).toBe(false);
  });

  it('has undefined headerHeight by default', () => {
    const component = new IoAppShell();
    expect(component.headerHeight).toBeUndefined();
  });
});

describe('io-app-shell — prop mutation', () => {
  it('sidebarStartOpen can be set to true', () => {
    const component = new IoAppShell();
    (component as any).sidebarStartOpen = true;
    expect(component.sidebarStartOpen).toBe(true);
  });

  it('sidebarEndOpen can be set to true', () => {
    const component = new IoAppShell();
    (component as any).sidebarEndOpen = true;
    expect(component.sidebarEndOpen).toBe(true);
  });
});
