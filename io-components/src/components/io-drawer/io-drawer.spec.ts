import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoDrawer } from './io-drawer';
import { getDrawerStyles } from './io-drawer-styles';
import type { IoDrawerBackground } from './types';

describe('io-drawer — default props', () => {
  let component: IoDrawer;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
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

  it('drag handle dimensions use --io-space-8 / --io-space-1 tokens', () => {
    const styles: string = getDrawerStyles();
    const handleIdx = styles.indexOf('.drawer__handle');
    const handleBlock = styles.slice(handleIdx, handleIdx + 200);
    expect(handleBlock).toContain('var(--io-space-8)');
    expect(handleBlock).toContain('var(--io-space-1)');
  });

  it('drag handle uses --io-border-radius-2xs token', () => {
    const styles: string = getDrawerStyles();
    const handleIdx = styles.indexOf('.drawer__handle');
    const handleBlock = styles.slice(handleIdx, handleIdx + 200);
    expect(handleBlock).toContain('var(--io-border-radius-2xs)');
  });
});

describe('io-drawer — bottom sheet rendering', () => {
  let component: IoDrawer;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
    vi.spyOn(console, 'error').mockImplementation(() => {});
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
    vi.spyOn(console, 'error').mockImplementation(() => {});
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

  afterEach(() => {
    vi.restoreAllMocks();
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

// ── removeSwipeListeners ───────────────────────────────────────────────────────

describe('io-drawer — removeSwipeListeners', () => {
  it('calls removeEventListener for each bound touch handler and clears them', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoDrawer();
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };

    const handle = document.createElement('div');
    handle.className = 'drawer__handle';
    const removeEventListenerSpy = vi.spyOn(handle, 'removeEventListener');

    const shadowRoot = {
      querySelector: vi.fn(() => handle),
    };
    const el = document.createElement('io-drawer');
    Object.defineProperty(el, 'shadowRoot', { get: () => shadowRoot });
    (component as any).el = el;

    const stubStart = vi.fn();
    const stubMove = vi.fn();
    const stubEnd = vi.fn();
    (component as any).boundHandleTouchStart = stubStart;
    (component as any).boundHandleTouchMove = stubMove;
    (component as any).boundHandleTouchEnd = stubEnd;

    (component as any).removeSwipeListeners();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', stubStart);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchmove', stubMove);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchend', stubEnd);

    expect((component as any).boundHandleTouchStart).toBeUndefined();
    expect((component as any).boundHandleTouchMove).toBeUndefined();
    expect((component as any).boundHandleTouchEnd).toBeUndefined();
  });
});

// ── dismissButton prop ────────────────────────────────────────────────────────

describe('io-drawer — dismissButton prop', () => {
  let component: IoDrawer;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    component = new IoDrawer();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('defaults to true', () => {
    expect(component.dismissButton).toBe(true);
  });

  it('can be set to false', () => {
    component.dismissButton = false;
    expect(component.dismissButton).toBe(false);
  });

  it('render does not throw when dismissButton is false', () => {
    component.dismissButton = false;
    expect(() => (component as any).render()).not.toThrow();
  });

  it('render does not throw when dismissButton is true', () => {
    component.dismissButton = true;
    expect(() => (component as any).render()).not.toThrow();
  });

  it('handleCancel is a no-op when dismissButton is false (ESC suppressed)', () => {
    component.dismissButton = false;
    component.open = true;
    const ev = { preventDefault: vi.fn() } as unknown as Event;
    (component as any).handleCancel(ev);
    expect(component.open).toBe(true);
  });

  it('handleCancel closes the drawer when dismissButton is true', () => {
    component.dismissButton = true;
    component.open = true;
    const ev = { preventDefault: vi.fn() } as unknown as Event;
    (component as any).handleCancel(ev);
    expect(component.open).toBe(false);
  });

  it('handleCancel always calls preventDefault regardless of dismissButton value', () => {
    component.dismissButton = false;
    const ev = { preventDefault: vi.fn() } as unknown as Event;
    (component as any).handleCancel(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
  });
});

// ── dismiss event — user-initiated only ───────────────────────────────────────

describe('io-drawer — dismiss event fires only on user-initiated close', () => {
  let component: IoDrawer;
  let emitSpy: ReturnType<typeof vi.fn>;

  function makeMockDialog(initialOpen = true) {
    const mockDialog = {
      open: initialOpen,
      showModal: vi.fn(),
      close: vi.fn(() => { mockDialog.open = false; }),
    };
    return mockDialog;
  }

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    component = new IoDrawer();
    emitSpy = vi.fn();
    (component as any).el = document.createElement('io-drawer');
    (component as any).dismissEvent = { emit: emitSpy };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
    component.open = true;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does NOT emit dismiss when close() is called programmatically', async () => {
    const mockDialog = makeMockDialog(true);
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(mockDialog) };
    (component as any).el = { shadowRoot };

    await component.close();
    (component as any).onOpenChange(false);

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('does NOT emit dismiss when open prop is set to false directly', () => {
    const mockDialog = makeMockDialog(true);
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(mockDialog) };
    (component as any).el = { shadowRoot };

    component.open = false;
    (component as any).onOpenChange(false);

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('emits dismiss when close button is clicked', () => {
    const mockDialog = makeMockDialog(true);
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(mockDialog) };
    (component as any).el = { shadowRoot };

    (component as any).handleCloseClick();
    (component as any).onOpenChange(false);

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('emits dismiss when ESC key triggers handleCancel (dismissButton=true)', () => {
    const mockDialog = makeMockDialog(true);
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(mockDialog) };
    (component as any).el = { shadowRoot };

    const ev = { preventDefault: vi.fn() } as unknown as Event;
    (component as any).handleCancel(ev);
    (component as any).onOpenChange(false);

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('does NOT emit dismiss when ESC key triggers handleCancel with dismissButton=false', () => {
    component.dismissButton = false;
    const mockDialog = makeMockDialog(true);
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(mockDialog) };
    (component as any).el = { shadowRoot };

    const ev = { preventDefault: vi.fn() } as unknown as Event;
    (component as any).handleCancel(ev);
    // open is still true — no onOpenChange call needed

    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.open).toBe(true);
  });

  it('emits dismiss when backdrop is clicked', () => {
    const mockDialog = makeMockDialog(true);
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(mockDialog) };
    (component as any).el = { shadowRoot };

    // Simulate backdrop click detection: set flag directly then trigger watcher
    (component as any)._userInitiatedClose = true;
    component.open = false;
    (component as any).onOpenChange(false);

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('_userInitiatedClose flag is reset to false after onOpenChange fires dismiss', () => {
    const mockDialog = makeMockDialog(true);
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(mockDialog) };
    (component as any).el = { shadowRoot };

    (component as any).handleCloseClick();
    (component as any).onOpenChange(false);

    expect((component as any)._userInitiatedClose).toBe(false);
  });

  it('_userInitiatedClose flag is reset to false even when dismiss is NOT emitted', () => {
    const mockDialog = makeMockDialog(true);
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(mockDialog) };
    (component as any).el = { shadowRoot };

    // No user action — flag stays false, onOpenChange resets it
    (component as any).onOpenChange(false);

    expect((component as any)._userInitiatedClose).toBe(false);
  });

  it('emits dismiss when swipe closes the bottom sheet', () => {
    component.placement = 'bottom';
    const mockDialog = makeMockDialog(true);
    // querySelector returns null for '.drawer__handle' but the dialog element for 'dialog'
    const shadowRoot = {
      querySelector: vi.fn((selector: string) => {
        if (selector === 'dialog') return mockDialog;
        return null;
      }),
    };
    (component as any).el = { shadowRoot };

    (component as any).touchStartY = 100;
    const ev = { changedTouches: [{ clientY: 181 }] } as unknown as TouchEvent;
    (component as any).handleTouchEnd(ev);
    (component as any).onOpenChange(false);

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });
});

// ── WCAG 2.5.7 / 2.1.1 — inaccessible swipe-only config guard (#1098) ────────

describe('io-drawer — swipe-only close path guard (#1098)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs console.error when placement=bottom, dismissButton=false, closeOnBackdrop=false', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoDrawer();
    const el = document.createElement('io-drawer');
    (component as any).el = el;
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    component.placement = 'bottom';
    component.dismissButton = false;
    component.closeOnBackdrop = false;
    component.heading = 'Bottom sheet';

    (component as any).componentWillLoad();

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Inaccessible configuration'),
    );
  });

  it('does NOT log the swipe-only warning when placement=bottom with dismissButton=true', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoDrawer();
    const el = document.createElement('io-drawer');
    (component as any).el = el;
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    component.placement = 'bottom';
    component.dismissButton = true;
    component.closeOnBackdrop = false;
    component.heading = 'Bottom sheet';

    (component as any).componentWillLoad();

    // Only the label error would fire here, swipe warning must not
    const swipeWarnings = errorSpy.mock.calls.filter(args =>
      String(args[0]).includes('Inaccessible configuration'),
    );
    expect(swipeWarnings).toHaveLength(0);
  });

  it('does NOT log the swipe-only warning when placement=bottom with closeOnBackdrop=true', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoDrawer();
    const el = document.createElement('io-drawer');
    (component as any).el = el;
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    component.placement = 'bottom';
    component.dismissButton = false;
    component.closeOnBackdrop = true;
    component.heading = 'Bottom sheet';

    (component as any).componentWillLoad();

    const swipeWarnings = errorSpy.mock.calls.filter(args =>
      String(args[0]).includes('Inaccessible configuration'),
    );
    expect(swipeWarnings).toHaveLength(0);
  });

  it('does NOT log the swipe-only warning for non-bottom placements', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoDrawer();
    const el = document.createElement('io-drawer');
    (component as any).el = el;
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    component.placement = 'right';
    component.dismissButton = false;
    component.closeOnBackdrop = false;
    component.heading = 'Right drawer';

    (component as any).componentWillLoad();

    const swipeWarnings = errorSpy.mock.calls.filter(args =>
      String(args[0]).includes('Inaccessible configuration'),
    );
    expect(swipeWarnings).toHaveLength(0);
  });
});

// ── componentWillLoad console.error ──────────────────────────────────────────

describe('io-drawer — componentWillLoad accessible label warning', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs console.error when neither heading nor aria-label is supplied', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoDrawer();
    const el = document.createElement('io-drawer');
    (component as any).el = el;
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };

    (component as any).componentWillLoad();

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('[io-drawer]'),
    );
  });

  it('does NOT log console.error when heading is supplied', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoDrawer();
    const el = document.createElement('io-drawer');
    (component as any).el = el;
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    component.heading = 'My Drawer';

    (component as any).componentWillLoad();

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('does NOT log console.error when the aria prop supplies an aria-label key (#1014: narrowed type)', () => {
    // The host element attribute is NOT forwarded to the internal <dialog> in
    // Shadow DOM — only the `aria` prop reaches the dialog. The warning must
    // check the prop, not the host attribute. Since #1014 narrowed the type to
    // only 'aria-label' | 'aria-labelledby' | 'aria-describedby', bare 'label'
    // is no longer a valid key — use 'aria-label' instead.
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoDrawer();
    const el = document.createElement('io-drawer');
    (component as any).el = el;
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    component.aria = { 'aria-label': 'Settings panel' };

    (component as any).componentWillLoad();

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('does NOT log console.error when the aria prop supplies an aria-label key', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoDrawer();
    const el = document.createElement('io-drawer');
    (component as any).el = el;
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    component.aria = { 'aria-label': 'Settings panel' };

    (component as any).componentWillLoad();

    expect(errorSpy).not.toHaveBeenCalled();
  });
});
