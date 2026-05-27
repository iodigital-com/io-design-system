import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTabsBar } from './io-tabs-bar';

function makeButton(label: string, disabled = false): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = label;
  if (disabled) btn.disabled = true;
  return btn;
}

describe('io-tabs-bar — click handling', () => {
  let component: IoTabsBar;
  let updateEmitMock: ReturnType<typeof vi.fn>;
  let btn0: HTMLButtonElement;
  let btn1: HTMLButtonElement;
  let btn2: HTMLButtonElement;

  beforeEach(() => {
    btn0 = makeButton('Overview');
    btn1 = makeButton('Details');
    btn2 = makeButton('Settings');

    component = new IoTabsBar();
    (component as any).el = document.createElement('io-tabs-bar');
    updateEmitMock = vi.fn();
    (component as any).update = { emit: updateEmitMock };
    (component as any).buttons = [btn0, btn1, btn2];
    component.activeTabIndex = 0;
  });

  it('updates activeTabIndex and emits update when a different tab is clicked', () => {
    (component as any).handleTabClick(1);

    expect(component.activeTabIndex).toBe(1);
    expect(updateEmitMock).toHaveBeenCalledOnce();
    expect(updateEmitMock).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('does not emit update when the already-active tab is clicked', () => {
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
    (component as any).handleTabClick(2);

    expect(component.activeTabIndex).toBe(2);
    expect(updateEmitMock).toHaveBeenCalledTimes(2);
    expect(updateEmitMock).toHaveBeenNthCalledWith(1, { activeTabIndex: 1 });
    expect(updateEmitMock).toHaveBeenNthCalledWith(2, { activeTabIndex: 2 });
  });

  it('updates activeTabIndex to the clicked tab index', () => {
    (component as any).handleTabClick(2);

    expect(component.activeTabIndex).toBe(2);
  });

  it('does not emit when buttons array is empty', () => {
    (component as any).buttons = [];

    (component as any).handleTabClick(0);

    expect(updateEmitMock).not.toHaveBeenCalled();
  });
});
