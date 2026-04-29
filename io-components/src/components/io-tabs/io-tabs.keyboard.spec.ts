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

function makeKeyEvent(key: string): KeyboardEvent {
  const ev = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
  ev.preventDefault = vi.fn();
  return ev;
}

describe('io-tabs — keyboard navigation', () => {
  let component: IoTabs;
  let updateEmitMock: ReturnType<typeof vi.fn>;
  // btn0=First, btn1=Second, btn2=Disabled, btn3=Third
  let btns: HTMLButtonElement[];

  beforeEach(() => {
    btns = [
      makeButton('First'),
      makeButton('Second'),
      makeButton('Disabled', true),
      makeButton('Third'),
    ];

    component = new IoTabs();
    (component as any).el = document.createElement('io-tabs');
    updateEmitMock = vi.fn();
    (component as any).update = { emit: updateEmitMock };
    (component as any).buttons = btns;
    component.activeTabIndex = 0;
  });

  it('ArrowRight moves focus to next enabled tab', () => {
    const ev = makeKeyEvent('ArrowRight');
    (component as any).handleKeyDown(ev, 0); // from 'First'
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(btns[1].focus).toHaveBeenCalled(); // 'Second'
  });

  it('ArrowRight skips disabled tabs', () => {
    const ev = makeKeyEvent('ArrowRight');
    (component as any).handleKeyDown(ev, 1); // from 'Second'
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(btns[3].focus).toHaveBeenCalled(); // jumps over 'Disabled' to 'Third'
  });

  it('ArrowLeft wraps to last enabled tab from first', () => {
    const ev = makeKeyEvent('ArrowLeft');
    (component as any).handleKeyDown(ev, 0); // from 'First', wraps to 'Third'
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(btns[3].focus).toHaveBeenCalled();
  });

  it('Home moves focus to first enabled tab', () => {
    const ev = makeKeyEvent('Home');
    (component as any).handleKeyDown(ev, 3); // from 'Third'
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(btns[0].focus).toHaveBeenCalled();
  });

  it('End moves focus to last enabled tab', () => {
    const ev = makeKeyEvent('End');
    (component as any).handleKeyDown(ev, 0); // from 'First'
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(btns[3].focus).toHaveBeenCalled(); // 'Third' is last enabled
  });

  it('Enter activates the focused tab', () => {
    const ev = makeKeyEvent('Enter');
    (component as any).handleKeyDown(ev, 1); // press Enter on 'Second'
    expect(updateEmitMock).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('Space activates the focused tab', () => {
    const ev = makeKeyEvent(' ');
    (component as any).handleKeyDown(ev, 1); // press Space on 'Second'
    expect(updateEmitMock).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('does nothing for unrecognised keys', () => {
    const ev = makeKeyEvent('Escape');
    (component as any).handleKeyDown(ev, 0);
    expect(ev.preventDefault).not.toHaveBeenCalled();
    expect(updateEmitMock).not.toHaveBeenCalled();
  });

  it('recovers keyboard navigation when current index is disabled', () => {
    const ev = makeKeyEvent('ArrowRight');
    (component as any).handleKeyDown(ev, 2); // disabled index
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(btns[0].focus).toHaveBeenCalled();
  });
});

