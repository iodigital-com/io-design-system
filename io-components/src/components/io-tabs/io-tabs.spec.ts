import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTabs } from './io-tabs';

function makeButton(label: string, disabled = false): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = label;
  if (disabled) btn.disabled = true;
  return btn;
}

function makeComponent(buttons: HTMLButtonElement[] = []) {
  const component = new IoTabs();
  (component as any).el = document.createElement('io-tabs');
  (component as any).update = { emit: vi.fn() };
  (component as any).slotEl = { assignedElements: () => buttons };
  return component;
}

describe('io-tabs — default props', () => {
  it('has activeTabIndex=0 by default', () => {
    const component = makeComponent();
    expect(component.activeTabIndex).toBe(0);
  });

  it('has no label by default', () => {
    const component = makeComponent();
    expect(component.label).toBeUndefined();
  });
});

describe('io-tabs — syncFromSlot', () => {
  let component: IoTabs;
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

  it('clamps activeTabIndex to 0 when it exceeds slot length', () => {
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

  it('moves activeTabIndex away from disabled active tab', () => {
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

describe('io-tabs — onActiveTabIndexChange', () => {
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

describe('io-tabs — listener teardown', () => {
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

describe('io-tabs — delegatesFocus', () => {
  it('enables delegatesFocus for the component shadow root', async () => {
    const builtComponent = await import('../../../dist-custom-elements/io-tabs.js');
    expect((builtComponent.IoTabs as { delegatesFocus?: boolean }).delegatesFocus).toBe(true);
  });
});

