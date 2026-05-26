import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoDrawer } from './io-drawer';
import { getDrawerStyles } from './io-drawer-styles';
import type { IoDrawerBackground } from './types';

describe('io-drawer — default props', () => {
  let component: IoDrawer;

  beforeEach(() => {
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
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

  it('dialog[open] applies display flex so layout only activates when native open attribute is present', () => {
    const styles: string = getDrawerStyles();
    expect(styles).toContain('dialog[open]');
    const openIdx = styles.indexOf('dialog[open]');
    const openBlock = styles.slice(openIdx, openIdx + 80);
    expect(openBlock).toContain('display: flex');
  });

  it('dialog:not([open]) display none prevents drawer from being visible when closed (regression: #336 incomplete fix)', () => {
    const styles: string = getDrawerStyles();
    expect(styles).toContain('dialog:not([open])');
    const hiddenIdx = styles.indexOf('dialog:not([open])');
    const hiddenBlock = styles.slice(hiddenIdx, hiddenIdx + 60);
    expect(hiddenBlock).toContain('display: none');
  });
});

describe('io-drawer — bottom sheet styles', () => {
  it('styles contain drawer--sheet class rule with border-radius-lg', () => {
    const styles: string = getDrawerStyles();
    expect(styles).toContain('drawer--sheet');
    const sheetIdx = styles.indexOf('drawer--sheet');
    const sheetBlock = styles.slice(sheetIdx, sheetIdx + 200);
    expect(sheetBlock).toContain('--io-border-radius-lg');
  });

  it('styles contain max-height: 85vh for bottom sheet', () => {
    const styles: string = getDrawerStyles();
    expect(styles).toContain('max-height: 85vh');
  });

  it('styles contain .drawer__handle rule', () => {
    const styles: string = getDrawerStyles();
    expect(styles).toContain('.drawer__handle');
  });

  it('drag handle uses --io-border-hover token for background-color', () => {
    const styles: string = getDrawerStyles();
    const handleIdx = styles.indexOf('.drawer__handle');
    const handleBlock = styles.slice(handleIdx, handleIdx + 200);
    expect(handleBlock).toContain('--io-border-hover');
  });

  it('drag handle dimensions are 32px wide and 4px tall', () => {
    const styles: string = getDrawerStyles();
    const handleIdx = styles.indexOf('.drawer__handle');
    const handleBlock = styles.slice(handleIdx, handleIdx + 200);
    expect(handleBlock).toContain('width: 32px');
    expect(handleBlock).toContain('height: 4px');
  });

  it('drag handle uses border-radius: 2px per ACs', () => {
    const styles: string = getDrawerStyles();
    const handleIdx = styles.indexOf('.drawer__handle');
    const handleBlock = styles.slice(handleIdx, handleIdx + 200);
    expect(handleBlock).toContain('border-radius: 2px');
  });
});

describe('io-drawer — bottom sheet rendering', () => {
  let component: IoDrawer;

  beforeEach(() => {
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('render does not throw for bottom placement', () => {
    component.placement = 'bottom';
    expect(() => (component as any).render()).not.toThrow();
  });

  it('render does not throw for non-bottom placement (no handle rendered)', () => {
    component.placement = 'right';
    expect(() => (component as any).render()).not.toThrow();
  });
});

describe('io-drawer — background prop', () => {
  let component: IoDrawer;

  beforeEach(() => {
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('defaults to canvas background', () => {
    expect(component.background).toBe('canvas');
  });

  it('accepts surface background', () => {
    component.background = 'surface' as IoDrawerBackground;
    expect(component.background).toBe('surface');
  });

  it('accepts elevated background', () => {
    component.background = 'elevated' as IoDrawerBackground;
    expect(component.background).toBe('elevated');
  });

  it('styles contain canvas background token', () => {
    const styles: string = getDrawerStyles();
    expect(styles).toContain('drawer--bg-canvas');
    expect(styles).toContain('var(--io-bg-page)');
  });

  it('styles contain surface background token', () => {
    const styles: string = getDrawerStyles();
    expect(styles).toContain('drawer--bg-surface');
    expect(styles).toContain('var(--io-bg-surface)');
  });

  it('styles contain elevated background token with shadow', () => {
    const styles: string = getDrawerStyles();
    expect(styles).toContain('drawer--bg-elevated');
    expect(styles).toContain('var(--io-bg-raised)');
  });
});

describe('io-drawer — show/close methods', () => {
  let component: IoDrawer;
  let dialogEl: HTMLDialogElement;

  beforeEach(() => {
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
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
