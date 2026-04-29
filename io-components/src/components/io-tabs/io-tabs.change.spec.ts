import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoTabs } from './io-tabs';

function makeButton(label: string, disabled = false): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = label;
  if (disabled) btn.disabled = true;
  return btn;
}

describe('io-tabs — update event', () => {
  let component: IoTabs;
  let updateEmitMock: ReturnType<typeof vi.fn>;
  let btn0: HTMLButtonElement;
  let btn1: HTMLButtonElement;
  let btn2: HTMLButtonElement;

  beforeEach(() => {
    btn0 = makeButton('Overview');
    btn1 = makeButton('Details');
    btn2 = makeButton('Disabled', true);

    component = new IoTabs();
    (component as any).el = document.createElement('io-tabs');
    updateEmitMock = vi.fn();
    (component as any).update = { emit: updateEmitMock };
    (component as any).buttons = [btn0, btn1, btn2];
    component.activeTabIndex = 0;
  });

  it('emits update with activeTabIndex when tab changes', () => {
    (component as any).handleTabClick(1);
    expect(updateEmitMock).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('updates activeTabIndex when tab changes', () => {
    (component as any).handleTabClick(1);
    expect(component.activeTabIndex).toBe(1);
  });

  it('does not emit update when clicking already active tab', () => {
    (component as any).handleTabClick(0);
    expect(updateEmitMock).not.toHaveBeenCalled();
  });

  it('does not emit update when clicking a disabled tab', () => {
    (component as any).handleTabClick(2);
    expect(updateEmitMock).not.toHaveBeenCalled();
    expect(component.activeTabIndex).toBe(0);
  });
});

