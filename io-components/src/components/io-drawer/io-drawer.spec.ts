import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoDrawer } from './io-drawer';
import { getDrawerStyles } from './io-drawer-styles';

describe('io-drawer — default props', () => {
  let component: IoDrawer;

  beforeEach(() => {
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('is not open by default', () => {
    expect(component.open).toBe(false);
  });

  it('defaults to right placement', () => {
    expect(component.placement).toBe('right');
  });

  it('defaults to md size', () => {
    expect(component.size).toBe('md');
  });

  it('closes on backdrop by default', () => {
    expect(component.closeOnBackdrop).toBe(true);
  });

  it('has no heading by default', () => {
    expect(component.heading).toBeUndefined();
  });

  it('has default closeLabel', () => {
    expect(component.closeLabel).toBe('Close drawer');
  });

  it('generates a stable headingId in componentWillLoad', () => {
    const id = (component as any).headingId as string;
    expect(id).toMatch(/^io-drawer-heading-/);
  });
});

describe('io-drawer — render contract', () => {
  it('styles contain placement animation keyframes', () => {
    const styles: string = getDrawerStyles();
    expect(styles).toContain('drawer-in-right');
    expect(styles).toContain('drawer-in-left');
    expect(styles).toContain('drawer-in-bottom');
  });

  it('styles contain prefers-reduced-motion guard', () => {
    const styles: string = getDrawerStyles();
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    const rmIdx = styles.indexOf('@media (prefers-reduced-motion: reduce)');
    expect(styles.slice(rmIdx)).toContain('animation: none');
  });

  it('styles contain backdrop token', () => {
    const styles: string = getDrawerStyles();
    expect(styles).toContain('--io-backdrop');
  });
});

describe('io-drawer — show/close methods', () => {
  let component: IoDrawer;
  let dialogEl: HTMLDialogElement;

  beforeEach(() => {
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();

    dialogEl = document.createElement('div') as unknown as HTMLDialogElement;
    dialogEl.open = false;
    dialogEl.showModal = vi.fn(() => { dialogEl.open = true; });
    dialogEl.close = vi.fn(() => { dialogEl.open = false; });
    (component as any).dialogEl = dialogEl;
  });

  it('show() sets open to true', async () => {
    await component.show();
    expect(component.open).toBe(true);
  });

  it('show() is a no-op when already open', async () => {
    component.open = true;
    await component.show();
    expect(component.open).toBe(true);
  });

  it('close() sets open to false', async () => {
    component.open = true;
    await component.close();
    expect(component.open).toBe(false);
  });

  it('close() is a no-op when already closed', async () => {
    component.open = false;
    await component.close();
    expect(component.open).toBe(false);
  });
});
