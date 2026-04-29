import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoTabs } from './io-tabs';

function makeButton(label: string, disabled = false): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = label;
  if (disabled) btn.disabled = true;
  return btn;
}

describe('io-tabs — click handling', () => {
  let component: IoTabs;
  let updateEmitMock: ReturnType<typeof vi.fn>;
  let btn0: HTMLButtonElement;
  let btn1: HTMLButtonElement;

  beforeEach(() => {
    btn0 = makeButton('Overview');
    btn1 = makeButton('Details');

    component = new IoTabs();
    (component as any).el = document.createElement('io-tabs');
    updateEmitMock = vi.fn();
    (component as any).update = { emit: updateEmitMock };
    (component as any).buttons = [btn0, btn1];
    component.activeTabIndex = 0;
  });

  it('updates activeTabIndex and emits update when a different tab is clicked', () => {
    (component as any).handleTabClick(1);

    expect(component.activeTabIndex).toBe(1);
    expect(updateEmitMock).toHaveBeenCalledOnce();
    expect(updateEmitMock).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('does not emit update when the same tab is clicked', () => {
    (component as any).handleTabClick(0);

    expect(component.activeTabIndex).toBe(0);
    expect(updateEmitMock).not.toHaveBeenCalled();
  });

  it('does not emit update when a disabled tab is clicked', () => {
    const disabledBtn = makeButton('Disabled', true);
    (component as any).buttons = [btn0, disabledBtn];
    component.activeTabIndex = 0;

    (component as any).handleTabClick(1);

    expect(component.activeTabIndex).toBe(0);
    expect(updateEmitMock).not.toHaveBeenCalled();
  });

  it('emits once per distinct tab transition across sequential clicks', () => {
    (component as any).handleTabClick(1);
    (component as any).handleTabClick(1);
    (component as any).handleTabClick(0);

    expect(component.activeTabIndex).toBe(0);
    expect(updateEmitMock).toHaveBeenCalledTimes(2);
    expect(updateEmitMock).toHaveBeenNthCalledWith(1, { activeTabIndex: 1 });
    expect(updateEmitMock).toHaveBeenNthCalledWith(2, { activeTabIndex: 0 });
  });
});

