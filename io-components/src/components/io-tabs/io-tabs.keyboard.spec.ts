import { describe, it, expect, vi } from 'vitest';
import { IoTabs } from './io-tabs';

const TABS = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Disabled', value: 'disabled', disabled: true },
  { label: 'Third', value: 'third' },
];

function makeKeyEvent(key: string): KeyboardEvent {
  const ev = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
  ev.preventDefault = vi.fn();
  return ev;
}

describe('io-tabs — keyboard navigation', () => {
  let component: IoTabs;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoTabs();
    (component as any).el = {
      shadowRoot: {
        querySelectorAll: vi.fn().mockReturnValue(
          TABS.map(() => ({ focus: vi.fn() }))
        ),
      },
    };
    emitMock = vi.fn();
    (component as any).ioChange = { emit: emitMock };
    component.tabs = TABS;
    component.activeTab = 'first';
  });

  it('ArrowRight moves focus to next enabled tab', () => {
    const ev = makeKeyEvent('ArrowRight');
    (component as any).handleKeyDown(ev, 0); // from 'first'
    expect(ev.preventDefault).toHaveBeenCalled();
    // Should focus index 1 ('second')
    const buttons = component['el'].shadowRoot.querySelectorAll('.tab');
    expect(buttons[1].focus).toHaveBeenCalled();
  });

  it('ArrowLeft moves focus to previous enabled tab (wraps)', () => {
    const ev = makeKeyEvent('ArrowLeft');
    (component as any).handleKeyDown(ev, 0); // from 'first', wraps to last enabled
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('Home moves focus to first enabled tab', () => {
    const ev = makeKeyEvent('Home');
    (component as any).handleKeyDown(ev, 3); // from 'third'
    expect(ev.preventDefault).toHaveBeenCalled();
    const buttons = component['el'].shadowRoot.querySelectorAll('.tab');
    expect(buttons[0].focus).toHaveBeenCalled();
  });

  it('End moves focus to last enabled tab', () => {
    const ev = makeKeyEvent('End');
    (component as any).handleKeyDown(ev, 0); // from 'first'
    expect(ev.preventDefault).toHaveBeenCalled();
    const buttons = component['el'].shadowRoot.querySelectorAll('.tab');
    expect(buttons[3].focus).toHaveBeenCalled(); // 'third' is last enabled
  });

  it('Enter activates the focused tab', () => {
    const ev = makeKeyEvent('Enter');
    (component as any).handleKeyDown(ev, 1); // press Enter on 'second'
    expect(emitMock).toHaveBeenCalledWith('second');
  });

  it('Space activates the focused tab', () => {
    const ev = makeKeyEvent(' ');
    (component as any).handleKeyDown(ev, 1); // press Space on 'second'
    expect(emitMock).toHaveBeenCalledWith('second');
  });
});
