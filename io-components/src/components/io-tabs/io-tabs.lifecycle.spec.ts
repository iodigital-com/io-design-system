import { describe, it, expect, vi } from 'vitest';

import { IoTabs } from './io-tabs';

function makeTabs() {
  const c = new IoTabs();
  (c as any).el = document.createElement('io-tabs');
  (c as any).update = { emit: vi.fn() };
  return c;
}

describe('io-tabs — componentDidLoad', () => {
  it('componentDidLoad does not throw when shadowRoot is null', () => {
    const c = makeTabs();
    (c as any).el = { shadowRoot: null };
    expect(() => c.componentDidLoad()).not.toThrow();
  });

  it('componentDidLoad sets slotEl from shadowRoot', () => {
    const c = makeTabs();
    const slot = document.createElement('slot');
    (slot as any).assignedElements = vi.fn().mockReturnValue([]);
    (c as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(slot) } };
    c.componentDidLoad();
    expect((c as any).slotEl).toBe(slot);
  });
});

describe('io-tabs — disconnectedCallback', () => {
  it('disconnectedCallback does not throw', () => {
    const c = makeTabs();
    expect(() => c.disconnectedCallback()).not.toThrow();
  });

  it('disconnectedCallback clears listener maps', () => {
    const c = makeTabs();
    (c as any).clickHandlers.set(document.createElement('button'), vi.fn());
    c.disconnectedCallback();
    expect((c as any).clickHandlers.size).toBe(0);
    expect((c as any).keyHandlers.size).toBe(0);
  });
});

describe('io-tabs — onSlotChange', () => {
  it('onSlotChange calls syncFromSlot', () => {
    const c = makeTabs();
    (c as any).slotEl = { assignedElements: vi.fn().mockReturnValue([]) };
    const spy = vi.spyOn(c as any, 'syncFromSlot');
    (c as any).onSlotChange();
    expect(spy).toHaveBeenCalled();
  });
});

describe('io-tabs — render() branch coverage', () => {
  it('render() without label does not throw', () => {
    const c = makeTabs();
    c.label = undefined;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with label set does not throw', () => {
    const c = makeTabs();
    c.label = 'Main navigation';
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-tabs — handleKeyDown edge cases', () => {
  function makeButton(label: string, disabled = false): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.focus = vi.fn();
    if (disabled) btn.disabled = true;
    return btn;
  }

  function makeKeyEvent(key: string): KeyboardEvent {
    const ev = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
    (ev as any).preventDefault = vi.fn();
    return ev;
  }

  it('handleKeyDown returns early when no enabled buttons exist', () => {
    const c = makeTabs();
    const disabledBtn = makeButton('Only', true);
    (c as any).buttons = [disabledBtn];
    const ev = makeKeyEvent('ArrowRight');
    expect(() => (c as any).handleKeyDown(ev, 0)).not.toThrow();
    expect(disabledBtn.focus).not.toHaveBeenCalled();
  });

  it('handleKeyDown uses ArrowLeft fallback when on disabled tab', () => {
    const c = makeTabs();
    const btn0 = makeButton('First');
    const btn1 = makeButton('Disabled', true);
    const btn2 = makeButton('Third');
    (c as any).buttons = [btn0, btn1, btn2];
    (c as any).update = { emit: vi.fn() };

    const ev = makeKeyEvent('ArrowLeft');
    (c as any).handleKeyDown(ev, 1); // disabled index → fallback to last enabled
    expect((ev as any).preventDefault).toHaveBeenCalled();
    expect(btn2.focus).toHaveBeenCalled();
  });

  it('handleKeyDown does not call preventDefault for unrecognized key on disabled tab', () => {
    const c = makeTabs();
    const btn0 = makeButton('First');
    const btn1 = makeButton('Disabled', true);
    (c as any).buttons = [btn0, btn1];
    (c as any).update = { emit: vi.fn() };

    const ev = makeKeyEvent('Escape');
    (c as any).handleKeyDown(ev, 1); // disabled index, unrecognized key → null fallback
    expect((ev as any).preventDefault).not.toHaveBeenCalled();
  });
});

describe('io-tabs — applyAriaToButtons badge branch', () => {
  it('sets aria-label from visible text when badge child is present', () => {
    const c = makeTabs();
    const btn = document.createElement('button');
    const badge = document.createElement('span');
    badge.setAttribute('data-slot', 'badge');
    badge.textContent = '5';
    btn.appendChild(document.createTextNode('Overview'));
    btn.appendChild(badge);

    (c as any).applyAriaToButtons([btn], 0);

    expect(btn.getAttribute('aria-label')).toBe('Overview');
  });

  it('does not overwrite existing aria-label when badge is present', () => {
    const c = makeTabs();
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', 'Custom label');
    const badge = document.createElement('span');
    badge.setAttribute('data-slot', 'badge');
    badge.textContent = '3';
    btn.appendChild(document.createTextNode('Tab'));
    btn.appendChild(badge);

    (c as any).applyAriaToButtons([btn], 0);

    expect(btn.getAttribute('aria-label')).toBe('Custom label');
  });
});

describe('io-tabs — onActiveTabIndexChange', () => {
  it('normalizes out-of-range index (no buttons — clamps to 0)', () => {
    const c = makeTabs();
    (c as any).slotEl = { assignedElements: vi.fn().mockReturnValue([]) };
    (c as any).syncFromSlot();
    (c as any).onActiveTabIndexChange(99);
    expect(c.activeTabIndex).toBe(0);
  });
});
