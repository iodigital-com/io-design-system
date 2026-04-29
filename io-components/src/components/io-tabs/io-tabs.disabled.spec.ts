import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTabs } from './io-tabs';

function makeButton(label: string, disabled = false): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = label;
  btn.focus = vi.fn();
  if (disabled) btn.disabled = true;
  return btn;
}

describe('io-tabs — disabled button behaviour', () => {
  let component: IoTabs;

  beforeEach(() => {
    component = new IoTabs();
    (component as any).el = document.createElement('io-tabs');
    (component as any).update = { emit: vi.fn() };
  });

  it('does not activate a disabled tab on click', () => {
    const btn0 = makeButton('Enabled');
    const btn1 = makeButton('Disabled', true);
    (component as any).buttons = [btn0, btn1];
    component.activeTabIndex = 0;

    (component as any).handleTabClick(1);

    expect(component.activeTabIndex).toBe(0);
    expect((component as any).update.emit).not.toHaveBeenCalled();
  });

  it('skips disabled tabs during ArrowRight keyboard navigation', () => {
    const btn0 = makeButton('First');
    const btn1 = makeButton('Disabled', true);
    const btn2 = makeButton('Third');
    (component as any).buttons = [btn0, btn1, btn2];
    component.activeTabIndex = 0;

    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
    ev.preventDefault = vi.fn();

    (component as any).handleKeyDown(ev, 0);

    expect(btn2.focus).toHaveBeenCalled();
    expect(btn1.focus).not.toHaveBeenCalled();
  });

  it('marks disabled buttons with role=tab and aria-selected=false', () => {
    const btn0 = makeButton('Active');
    const btn1 = makeButton('Disabled', true);
    (component as any).slotEl = { assignedElements: () => [btn0, btn1] };
    component.activeTabIndex = 0;

    (component as any).syncFromSlot();

    expect(btn1.getAttribute('role')).toBe('tab');
    expect(btn1.getAttribute('aria-selected')).toBe('false');
  });
});

