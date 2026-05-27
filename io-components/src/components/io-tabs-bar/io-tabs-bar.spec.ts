import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTabsBar } from './io-tabs-bar';
import { normalizeActiveTabIndex, getNextEnabledIndex } from './io-tabs-bar-utils';

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeButton(label: string, disabled = false): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = label;
  if (disabled) btn.disabled = true;
  return btn;
}

function makeComponent(buttons: HTMLButtonElement[] = []) {
  const component = new IoTabsBar();
  (component as any).el = document.createElement('io-tabs-bar');
  (component as any).update = { emit: vi.fn() };
  (component as any).slotEl = { assignedElements: () => buttons };
  return component;
}

// ── Default props ─────────────────────────────────────────────────────────────

describe('io-tabs-bar — default props', () => {
  it('has activeTabIndex=0 by default', () => {
    const component = makeComponent();
    expect(component.activeTabIndex).toBe(0);
  });

  it('has no label by default', () => {
    const component = makeComponent();
    expect(component.label).toBeUndefined();
  });
});

// ── syncFromSlot ──────────────────────────────────────────────────────────────

describe('io-tabs-bar — syncFromSlot', () => {
  let component: IoTabsBar;
  let btn1: HTMLButtonElement;
  let btn2: HTMLButtonElement;
  let btn3: HTMLButtonElement;

  beforeEach(() => {
    btn1 = makeButton('Overview');
    btn2 = makeButton('Details');
    btn3 = makeButton('Settings', true); // disabled
    component = makeComponent([btn1, btn2, btn3]);
  });

  it('applies role=tab to all slotted buttons', () => {
    (component as any).syncFromSlot();
    expect(btn1.getAttribute('role')).toBe('tab');
    expect(btn2.getAttribute('role')).toBe('tab');
    expect(btn3.getAttribute('role')).toBe('tab');
  });

  it('sets aria-selected=true on the active tab only', () => {
    component.activeTabIndex = 1;
    (component as any).syncFromSlot();
    expect(btn1.getAttribute('aria-selected')).toBe('false');
    expect(btn2.getAttribute('aria-selected')).toBe('true');
    expect(btn3.getAttribute('aria-selected')).toBe('false');
  });

  it('gives tabindex=0 to the active tab and -1 to others', () => {
    component.activeTabIndex = 0;
    (component as any).syncFromSlot();
    expect(btn1.getAttribute('tabindex')).toBe('0');
    expect(btn2.getAttribute('tabindex')).toBe('-1');
    expect(btn3.getAttribute('tabindex')).toBe('-1');
  });

  it('clamps activeTabIndex to valid range when it exceeds slot length', () => {
    component.activeTabIndex = 10;
    (component as any).syncFromSlot();
    expect(component.activeTabIndex).toBe(0);
  });

  it('normalizes negative activeTabIndex to first enabled tab', () => {
    component.activeTabIndex = -3;
    (component as any).syncFromSlot();
    expect(component.activeTabIndex).toBe(0);
    expect(btn1.getAttribute('tabindex')).toBe('0');
  });

  it('moves activeTabIndex away from a disabled active tab', () => {
    component.activeTabIndex = 2; // disabled button
    (component as any).syncFromSlot();
    expect(component.activeTabIndex).toBe(0);
    expect(btn3.getAttribute('aria-selected')).toBe('false');
    expect(btn3.getAttribute('tabindex')).toBe('-1');
  });

  it('populates internal buttons array from slotted elements', () => {
    (component as any).syncFromSlot();
    expect((component as any).buttons).toHaveLength(3);
  });

  it('ignores non-button slotted elements', () => {
    const span = document.createElement('span');
    (component as any).slotEl = { assignedElements: () => [btn1, span, btn2] };
    (component as any).syncFromSlot();
    expect((component as any).buttons).toHaveLength(2);
  });
});

// ── onActiveTabIndexChange ────────────────────────────────────────────────────

describe('io-tabs-bar — onActiveTabIndexChange', () => {
  it('updates aria-selected on buttons when activeTabIndex changes', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B');
    const component = makeComponent([btn1, btn2]);
    (component as any).syncFromSlot();

    component.activeTabIndex = 1;
    (component as any).onActiveTabIndexChange(1);

    expect(btn1.getAttribute('aria-selected')).toBe('false');
    expect(btn2.getAttribute('aria-selected')).toBe('true');
    expect(btn2.getAttribute('tabindex')).toBe('0');
    expect(btn1.getAttribute('tabindex')).toBe('-1');
  });

  it('normalizes non-finite activeTabIndex values', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B');
    const component = makeComponent([btn1, btn2]);
    (component as any).syncFromSlot();

    (component as any).onActiveTabIndexChange(Number.NaN);

    expect(component.activeTabIndex).toBe(0);
    expect(btn1.getAttribute('tabindex')).toBe('0');
  });
});

// ── Event emission ────────────────────────────────────────────────────────────

describe('io-tabs-bar — update event', () => {
  it('emits update event with new activeTabIndex when a tab is clicked', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B');
    const component = makeComponent([btn1, btn2]);
    (component as any).syncFromSlot();

    (component as any).handleTabClick(1);

    expect((component as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('does not emit update event when clicking the already-active tab', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B');
    const component = makeComponent([btn1, btn2]);
    component.activeTabIndex = 0;
    (component as any).syncFromSlot();

    (component as any).handleTabClick(0);

    expect((component as any).update.emit).not.toHaveBeenCalled();
  });

  it('does not emit update event when clicking a disabled tab', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B', true); // disabled
    const component = makeComponent([btn1, btn2]);
    (component as any).syncFromSlot();

    (component as any).handleTabClick(1);

    expect((component as any).update.emit).not.toHaveBeenCalled();
  });
});

// ── setupListeners clickHandler closure ───────────────────────────────────────

describe('io-tabs-bar — setupListeners clickHandler closure', () => {
  it('invokes the stored clickHandler closure built by setupListeners', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B');
    const component = makeComponent([btn1, btn2]);
    (component as any).clickHandlers = new Map();
    (component as any).keyHandlers = new Map();
    (component as any).buttons = [btn1, btn2];
    component.activeTabIndex = 0;
    (component as any).setupListeners();

    const clickHandler = (component as any).clickHandlers.get(btn2);
    expect(clickHandler).toBeDefined();

    // Invoking the closure must trigger handleTabClick(1)
    clickHandler();

    expect((component as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });
});

// ── Listener teardown ─────────────────────────────────────────────────────────

describe('io-tabs-bar — listener teardown', () => {
  it('removes event listeners from buttons on disconnectedCallback', () => {
    const btn = makeButton('X');
    const removeSpy = vi.spyOn(btn, 'removeEventListener');
    const component = makeComponent([btn]);
    (component as any).syncFromSlot();

    component.disconnectedCallback();

    expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});

// ── Keyboard navigation ───────────────────────────────────────────────────────

describe('io-tabs-bar — keyboard navigation', () => {
  it('moves focus to next tab on ArrowRight', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B');
    const focusSpy = vi.spyOn(btn2, 'focus');
    const component = makeComponent([btn1, btn2]);
    (component as any).syncFromSlot();

    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (component as any).handleKeyDown(ev, 0);

    expect(focusSpy).toHaveBeenCalled();
  });

  it('moves focus to previous tab on ArrowLeft', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B');
    const focusSpy = vi.spyOn(btn1, 'focus');
    const component = makeComponent([btn1, btn2]);
    component.activeTabIndex = 1;
    (component as any).syncFromSlot();

    const ev = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (component as any).handleKeyDown(ev, 1);

    expect(focusSpy).toHaveBeenCalled();
  });

  it('wraps focus from last to first tab on ArrowRight', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B');
    const focusSpy = vi.spyOn(btn1, 'focus');
    const component = makeComponent([btn1, btn2]);
    component.activeTabIndex = 1;
    (component as any).syncFromSlot();

    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (component as any).handleKeyDown(ev, 1);

    expect(focusSpy).toHaveBeenCalled();
  });

  it('moves focus to first tab on Home', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B');
    const btn3 = makeButton('C');
    const focusSpy = vi.spyOn(btn1, 'focus');
    const component = makeComponent([btn1, btn2, btn3]);
    component.activeTabIndex = 2;
    (component as any).syncFromSlot();

    const ev = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (component as any).handleKeyDown(ev, 2);

    expect(focusSpy).toHaveBeenCalled();
  });

  it('moves focus to last tab on End', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B');
    const btn3 = makeButton('C');
    const focusSpy = vi.spyOn(btn3, 'focus');
    const component = makeComponent([btn1, btn2, btn3]);
    (component as any).syncFromSlot();

    const ev = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (component as any).handleKeyDown(ev, 0);

    expect(focusSpy).toHaveBeenCalled();
  });

  it('activates tab on Enter', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B');
    const component = makeComponent([btn1, btn2]);
    component.activeTabIndex = 0;
    (component as any).syncFromSlot();

    const ev = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (component as any).handleKeyDown(ev, 1);

    expect((component as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('activates tab on Space', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B');
    const component = makeComponent([btn1, btn2]);
    component.activeTabIndex = 0;
    (component as any).syncFromSlot();

    const ev = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (component as any).handleKeyDown(ev, 1);

    expect((component as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('skips disabled tabs in keyboard navigation', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B', true); // disabled
    const btn3 = makeButton('C');
    const focusSpy = vi.spyOn(btn3, 'focus');
    const component = makeComponent([btn1, btn2, btn3]);
    (component as any).syncFromSlot();

    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (component as any).handleKeyDown(ev, 0);

    expect(focusSpy).toHaveBeenCalled();
  });

  it('falls back to last enabled tab on ArrowLeft when focused tab is disabled (currentEnabledIndex < 0)', () => {
    const btn1 = makeButton('A');
    const btn2 = makeButton('B', true); // disabled — has focus but not in enabled list
    const btn3 = makeButton('C');
    const focusSpy = vi.spyOn(btn3, 'focus');
    const component = makeComponent([btn1, btn2, btn3]);
    (component as any).syncFromSlot();

    const ev = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    // Call with index=1 (disabled btn2) → currentEnabledIndex = -1 → fallback branch
    (component as any).handleKeyDown(ev, 1);

    // ArrowLeft with currentEnabledIndex < 0 → fallbackIndex = enabled.length - 1 = 1 (btn3)
    expect(focusSpy).toHaveBeenCalled();
  });

  it('falls back to first enabled tab on ArrowRight when focused tab is disabled (currentEnabledIndex < 0)', () => {
    const btn1 = makeButton('A', true); // disabled — has focus
    const btn2 = makeButton('B');
    const btn3 = makeButton('C');
    const focusSpy = vi.spyOn(btn2, 'focus');
    const component = makeComponent([btn1, btn2, btn3]);
    (component as any).syncFromSlot();

    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (component as any).handleKeyDown(ev, 0);

    // ArrowRight with currentEnabledIndex < 0 → fallbackIndex = 0 → btn2 (first enabled)
    expect(focusSpy).toHaveBeenCalled();
  });

  it('does nothing for non-navigation key when focused tab is disabled (currentEnabledIndex < 0)', () => {
    const btn1 = makeButton('A', true); // disabled — has focus
    const btn2 = makeButton('B');
    const component = makeComponent([btn1, btn2]);
    (component as any).syncFromSlot();

    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    const preventDefaultSpy = vi.fn();
    Object.defineProperty(ev, 'preventDefault', { value: preventDefaultSpy });
    (component as any).handleKeyDown(ev, 0);

    // fallbackIndex is null for 'Tab' key → should not call preventDefault
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
});

// ── Utility functions ─────────────────────────────────────────────────────────

describe('normalizeActiveTabIndex', () => {
  it('returns 0 for an empty buttons array', () => {
    expect(normalizeActiveTabIndex(5, [])).toBe(0);
  });

  it('clamps an out-of-range index to the last valid index', () => {
    const buttons = [makeButton('A'), makeButton('B'), makeButton('C')];
    expect(normalizeActiveTabIndex(10, buttons)).toBe(2);
  });

  it('clamps a negative index to first enabled', () => {
    const buttons = [makeButton('A'), makeButton('B')];
    expect(normalizeActiveTabIndex(-1, buttons)).toBe(0);
  });

  it('skips a disabled button at the requested index', () => {
    const buttons = [makeButton('A'), makeButton('B', true), makeButton('C')];
    expect(normalizeActiveTabIndex(1, buttons)).toBe(0);
  });

  it('normalises NaN to 0', () => {
    const buttons = [makeButton('A'), makeButton('B')];
    expect(normalizeActiveTabIndex(Number.NaN, buttons)).toBe(0);
  });
});

describe('getNextEnabledIndex', () => {
  it('returns null for an empty list', () => {
    expect(getNextEnabledIndex('ArrowRight', 0, 0)).toBeNull();
  });

  it('returns null for an unknown key', () => {
    expect(getNextEnabledIndex('Tab', 0, 3)).toBeNull();
  });

  it('returns null when currentEnabledIndex is out of range', () => {
    expect(getNextEnabledIndex('ArrowRight', 5, 3)).toBeNull();
  });

  it('wraps ArrowRight at the end', () => {
    expect(getNextEnabledIndex('ArrowRight', 2, 3)).toBe(0);
  });

  it('wraps ArrowLeft at the start', () => {
    expect(getNextEnabledIndex('ArrowLeft', 0, 3)).toBe(2);
  });

  it('returns 0 for Home', () => {
    expect(getNextEnabledIndex('Home', 2, 3)).toBe(0);
  });

  it('returns last index for End', () => {
    expect(getNextEnabledIndex('End', 0, 3)).toBe(2);
  });
});

// ── normalizeActiveTabIndex — all-disabled fallback ───────────────────────────

describe('normalizeActiveTabIndex — all buttons disabled', () => {
  it('returns 0 when all buttons are disabled (no firstEnabled found)', () => {
    const buttons = [makeButton('A', true), makeButton('B', true), makeButton('C', true)];
    expect(normalizeActiveTabIndex(0, buttons)).toBe(0);
  });
});

