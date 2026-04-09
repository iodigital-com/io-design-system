import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoTabs } from './io-tabs';

describe('io-tabs - disabled behavior', () => {
  let component: IoTabs;

  beforeEach(() => {
    component = new IoTabs();
    (component as any).el = {
      shadowRoot: {
        querySelectorAll: vi.fn().mockReturnValue([
          { focus: vi.fn() },
          { focus: vi.fn() },
          { focus: vi.fn() },
        ]),
      },
    };
    (component as any).change = { emit: vi.fn() };
    component.tabs = [
      { label: 'First', value: 'first' },
      { label: 'Disabled', value: 'disabled', disabled: true },
      { label: 'Third', value: 'third' },
    ];
    component.activeTab = 'first';
  });

  it('does not default activeTab to disabled entries on load', () => {
    component.activeTab = '';
    component.componentWillLoad();

    expect(component.activeTab).toBe('first');
  });

  it('skips disabled tabs during keyboard navigation', () => {
    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
    ev.preventDefault = vi.fn();

    (component as any).handleKeyDown(ev, 0);

    const buttons = (component as any).el.shadowRoot.querySelectorAll('.tab');
    expect(buttons[2].focus).toHaveBeenCalled();
    expect(buttons[1].focus).not.toHaveBeenCalled();
  });
});
