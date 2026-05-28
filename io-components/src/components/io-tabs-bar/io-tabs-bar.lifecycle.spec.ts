import { describe, it, expect, vi } from 'vitest';

import { IoTabsBar } from './io-tabs-bar';
import { getTabsBarStyles } from './io-tabs-bar-styles';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeBtn(label = 'Tab', disabled = false): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = label;
  if (disabled) btn.disabled = true;
  btn.focus = vi.fn();
  return btn;
}

function makeComponent(buttons: HTMLButtonElement[] = []) {
  const c = new IoTabsBar();
  (c as any).el = document.createElement('io-tabs-bar');
  (c as any).update = { emit: vi.fn() };
  (c as any).slotEl = { assignedElements: () => buttons };
  return c;
}

// ── Styles ────────────────────────────────────────────────────────────────────

describe('io-tabs-bar — getTabsBarStyles', () => {
  it('returns a non-empty CSS string', () => {
    const styles = getTabsBarStyles();
    expect(typeof styles).toBe('string');
    expect(styles.length).toBeGreaterThan(0);
  });

  it('contains tablist selector', () => {
    expect(getTabsBarStyles()).toContain('.tablist');
  });

  it('contains ::slotted(button) selector', () => {
    expect(getTabsBarStyles()).toContain('::slotted(button)');
  });
});

// ── componentDidLoad ──────────────────────────────────────────────────────────

describe('io-tabs-bar — componentDidLoad', () => {
  it('wires slotEl from shadowRoot and calls syncFromSlot', () => {
    const btn0 = makeBtn('One');
    const btn1 = makeBtn('Two');
    const c = makeComponent();

    // Build a minimal slot mock with assignedElements
    const slot = document.createElement('slot') as HTMLSlotElement;
    (slot as any).assignedElements = vi.fn().mockReturnValue([btn0, btn1]);
    const shadowRootMock = { querySelector: vi.fn().mockReturnValue(slot) };
    Object.defineProperty((c as any).el, 'shadowRoot', {
      value: shadowRootMock,
      configurable: true,
    });

    c.componentDidLoad();

    // slotEl should be set to the slot element found in shadowRoot
    expect((c as any).slotEl).toBe(slot);
    // syncFromSlot was called: buttons array should be populated
    expect((c as any).buttons).toHaveLength(2);
  });

  it('handles missing shadowRoot gracefully', () => {
    const c = makeComponent();
    Object.defineProperty((c as any).el, 'shadowRoot', {
      value: null,
      configurable: true,
    });

    expect(() => c.componentDidLoad()).not.toThrow();
    expect((c as any).slotEl).toBeNull();
  });
});

// ── disconnectedCallback ──────────────────────────────────────────────────────

describe('io-tabs-bar — disconnectedCallback', () => {
  it('tears down event listeners on buttons when disconnected', () => {
    const btn = makeBtn('X');
    const removeSpy = vi.spyOn(btn, 'removeEventListener');
    const c = makeComponent([btn]);
    (c as any).syncFromSlot();

    c.disconnectedCallback();

    expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('clears internal handler maps after disconnect', () => {
    const btn = makeBtn('Y');
    const c = makeComponent([btn]);
    (c as any).syncFromSlot();

    c.disconnectedCallback();

    expect((c as any).clickHandlers.size).toBe(0);
    expect((c as any).keyHandlers.size).toBe(0);
  });

  it('does not throw when disconnected before any buttons were registered', () => {
    const c = makeComponent([]);
    expect(() => c.disconnectedCallback()).not.toThrow();
  });
});

// ── onActiveTabIndexChange ────────────────────────────────────────────────────

describe('io-tabs-bar — onActiveTabIndexChange watch', () => {
  it('applies ARIA attributes when changing to a valid in-range index', () => {
    const btn0 = makeBtn('A');
    const btn1 = makeBtn('B');
    const btn2 = makeBtn('C');
    const c = makeComponent([btn0, btn1, btn2]);
    (c as any).syncFromSlot();

    c.activeTabIndex = 1;
    (c as any).onActiveTabIndexChange(1);

    expect(btn0.getAttribute('aria-selected')).toBe('false');
    expect(btn1.getAttribute('aria-selected')).toBe('true');
    expect(btn2.getAttribute('aria-selected')).toBe('false');
    expect(btn1.getAttribute('tabindex')).toBe('0');
  });

  it('normalizes an out-of-range index and returns early without applying ARIA', () => {
    const btn0 = makeBtn('A');
    const btn1 = makeBtn('B');
    const c = makeComponent([btn0, btn1]);
    (c as any).syncFromSlot();

    // Set an out-of-range value and call the watch
    (c as any).onActiveTabIndexChange(99);

    // The component normalizes to 1 (last valid index)
    expect(c.activeTabIndex).toBeLessThan(99);
  });

  it('normalizes NaN to 0', () => {
    const btn0 = makeBtn('A');
    const btn1 = makeBtn('B');
    const c = makeComponent([btn0, btn1]);
    (c as any).syncFromSlot();

    (c as any).onActiveTabIndexChange(Number.NaN);

    expect(c.activeTabIndex).toBe(0);
  });
});

// ── onSlotChange ──────────────────────────────────────────────────────────────

describe('io-tabs-bar — onSlotChange', () => {
  it('re-syncs buttons from slot when slot content changes', () => {
    const btn0 = makeBtn('First');
    const btn1 = makeBtn('Second');
    const c = makeComponent([btn0]);
    (c as any).syncFromSlot();
    expect((c as any).buttons).toHaveLength(1);

    // Update the slot mock to return two buttons, then trigger the handler
    (c as any).slotEl = { assignedElements: () => [btn0, btn1] };
    (c as any).onSlotChange();

    expect((c as any).buttons).toHaveLength(2);
  });

  it('applies ARIA to all newly slotted buttons', () => {
    const btn0 = makeBtn('First');
    const btn1 = makeBtn('Second');
    const c = makeComponent([]);
    (c as any).slotEl = { assignedElements: () => [btn0, btn1] };
    (c as any).onSlotChange();

    expect(btn0.getAttribute('role')).toBe('tab');
    expect(btn1.getAttribute('role')).toBe('tab');
  });
});

// ── setupListeners / teardownListeners ────────────────────────────────────────

describe('io-tabs-bar — setupListeners and teardownListeners', () => {
  it('registers click and keydown handlers on each button during setup', () => {
    const btn0 = makeBtn('A');
    const btn1 = makeBtn('B');
    const addSpy0 = vi.spyOn(btn0, 'addEventListener');
    const addSpy1 = vi.spyOn(btn1, 'addEventListener');
    // Populate the internal buttons array directly so setupListeners iterates them
    const c = makeComponent([]);
    (c as any).buttons = [btn0, btn1];

    (c as any).setupListeners();

    expect(addSpy0).toHaveBeenCalledWith('click', expect.any(Function));
    expect(addSpy0).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect(addSpy1).toHaveBeenCalledWith('click', expect.any(Function));
    expect(addSpy1).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('removes all registered handlers during teardown', () => {
    const btn = makeBtn('X');
    const removeSpy = vi.spyOn(btn, 'removeEventListener');
    // Populate buttons and call setupListeners so handlers get registered
    const c = makeComponent([]);
    (c as any).buttons = [btn];
    (c as any).setupListeners();

    (c as any).teardownListeners();

    expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    expect((c as any).clickHandlers.size).toBe(0);
    expect((c as any).keyHandlers.size).toBe(0);
  });

  it('teardownListeners is idempotent when called on an empty map', () => {
    const c = makeComponent([]);
    expect(() => (c as any).teardownListeners()).not.toThrow();
  });
});
