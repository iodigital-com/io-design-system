import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoTabsBar } from './io-tabs-bar';
import { normalizeActiveTabIndex, getNextEnabledIndex, computeIndicatorKeyframes } from './io-tabs-bar-utils';

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

  it('has compact=false by default', () => {
    const component = makeComponent();
    expect(component.compact).toBe(false);
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

// ── compact prop ──────────────────────────────────────────────────────────────

describe('io-tabs-bar — compact prop', () => {
  it('has compact=false by default', () => {
    const component = makeComponent();
    expect(component.compact).toBe(false);
  });

  it('compact prop can be set to true', () => {
    const component = makeComponent();
    (component as any).compact = true;
    expect((component as any).compact).toBe(true);
  });
});

// ── anchor element support ────────────────────────────────────────────────────

function makeAnchor(label: string, disabled = false): HTMLAnchorElement {
  const a = document.createElement('a');
  a.href = '#';
  a.textContent = label;
  if (disabled) a.setAttribute('aria-disabled', 'true');
  return a;
}

function makeComponentWithItems(items: Array<HTMLButtonElement | HTMLAnchorElement> = []) {
  const component = new IoTabsBar();
  (component as any).el = document.createElement('io-tabs-bar');
  (component as any).update = { emit: vi.fn() };
  (component as any).slotEl = { assignedElements: () => items };
  return component;
}

describe('io-tabs-bar — anchor element support', () => {
  it('recognizes <a> elements as tab items', () => {
    const a1 = makeAnchor('Home');
    const a2 = makeAnchor('About');
    const component = makeComponentWithItems([a1, a2]);
    (component as any).syncFromSlot();
    expect((component as any).buttons).toHaveLength(2);
  });

  it('applies role=tab to slotted anchor elements', () => {
    const a1 = makeAnchor('Home');
    const a2 = makeAnchor('About');
    const component = makeComponentWithItems([a1, a2]);
    (component as any).syncFromSlot();
    expect(a1.getAttribute('role')).toBe('tab');
    expect(a2.getAttribute('role')).toBe('tab');
  });

  it('sets aria-selected on anchor tab items', () => {
    const a1 = makeAnchor('Home');
    const a2 = makeAnchor('About');
    const component = makeComponentWithItems([a1, a2]);
    component.activeTabIndex = 1;
    (component as any).syncFromSlot();
    expect(a1.getAttribute('aria-selected')).toBe('false');
    expect(a2.getAttribute('aria-selected')).toBe('true');
  });

  it('skips anchor elements with aria-disabled="true"', () => {
    const a1 = makeAnchor('Home');
    const a2 = makeAnchor('Disabled', true);
    const a3 = makeAnchor('About');
    const component = makeComponentWithItems([a1, a2, a3]);
    component.activeTabIndex = 1; // disabled anchor
    (component as any).syncFromSlot();
    // Should normalize away from disabled anchor
    expect(component.activeTabIndex).toBe(0);
  });

  it('supports mixed button and anchor tab items', () => {
    const btn = makeButton('Button Tab');
    const a = makeAnchor('Anchor Tab');
    const component = makeComponentWithItems([btn, a]);
    (component as any).syncFromSlot();
    expect((component as any).buttons).toHaveLength(2);
    expect(btn.getAttribute('role')).toBe('tab');
    expect(a.getAttribute('role')).toBe('tab');
  });

  it('does not emit update event when clicking a disabled anchor', () => {
    const a1 = makeAnchor('Home');
    const a2 = makeAnchor('Disabled', true);
    const component = makeComponentWithItems([a1, a2]);
    (component as any).syncFromSlot();

    (component as any).handleTabClick(1);

    expect((component as any).update.emit).not.toHaveBeenCalled();
  });
});


describe('io-tabs-bar — labelledBy prop (#838)', () => {
  it('labelledBy defaults to undefined', () => {
    const c = new IoTabsBar();
    expect(c.labelledBy).toBeUndefined();
  });

  it('renders aria-labelledby on tablist when labelledBy is set', () => {
    const c = makeComponent();
    c.labelledBy = 'my-heading';
    vi.mocked(h).mockClear();
    c.render();
    const tablistCall = vi.mocked(h).mock.calls.find(
      ([, attrs]: [unknown, unknown]) =>
        attrs && typeof attrs === 'object' &&
        (attrs as Record<string, unknown>)['role'] === 'tablist',
    );
    expect((tablistCall?.[1] as any)?.['aria-labelledby']).toBe('my-heading');
    expect((tablistCall?.[1] as any)?.['aria-label']).toBeUndefined();
  });

  it('uses aria-label (not aria-labelledby) when only label is set', () => {
    const c = makeComponent();
    c.label = 'Main navigation';
    vi.mocked(h).mockClear();
    c.render();
    const tablistCall = vi.mocked(h).mock.calls.find(
      ([, attrs]: [unknown, unknown]) =>
        attrs && typeof attrs === 'object' &&
        (attrs as Record<string, unknown>)['role'] === 'tablist',
    );
    expect((tablistCall?.[1] as any)?.['aria-label']).toBe('Main navigation');
    expect((tablistCall?.[1] as any)?.['aria-labelledby']).toBeUndefined();
  });
});

// ── computeIndicatorKeyframes utility (#847) ──────────────────────────────────

describe('computeIndicatorKeyframes — animated indicator utility (#847)', () => {
  it('returns keyframes with correct from/to positions', () => {
    const frames = computeIndicatorKeyframes(10, 80, 100, 120);
    expect(frames).toHaveLength(2);
    expect(frames[0]).toEqual({ left: '10px', width: '80px' });
    expect(frames[1]).toEqual({ left: '100px', width: '120px' });
  });

  it('returns identical from/to keyframes when positions are the same', () => {
    const frames = computeIndicatorKeyframes(50, 60, 50, 60);
    expect(frames[0]).toEqual({ left: '50px', width: '60px' });
    expect(frames[1]).toEqual({ left: '50px', width: '60px' });
  });

  it('handles zero position values', () => {
    const frames = computeIndicatorKeyframes(0, 0, 0, 0);
    expect(frames[0]).toEqual({ left: '0px', width: '0px' });
  });
});

// ── onActiveTabIndexChange calls animateIndicator (#847) ─────────────────────

describe('io-tabs-bar — onActiveTabIndexChange triggers animateIndicator (#847)', () => {
  it('calls animateIndicator with new and old index', () => {
    const b1 = makeButton('Tab 1');
    const b2 = makeButton('Tab 2');
    const component = makeComponent([b1, b2]);
    (component as any).syncFromSlot();

    const animateSpy = vi.spyOn(component as any, 'animateIndicator');
    (component as any).onActiveTabIndexChange(1, 0);

    expect(animateSpy).toHaveBeenCalledWith(1, 0);
  });

  it('does not call animateIndicator when index normalizes to different value', () => {
    const component = makeComponent([]);
    const animateSpy = vi.spyOn(component as any, 'animateIndicator');

    // No buttons — normalizeActiveTabIndex returns 0, newIndex is 5 → triggers re-assignment, returns early
    (component as any).onActiveTabIndexChange(5, 0);

    expect(animateSpy).not.toHaveBeenCalled();
  });
});
