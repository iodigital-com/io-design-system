import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import { IoButtonGroup } from './io-button-group';

function makeComponent(overrides: Partial<IoButtonGroup> = {}): IoButtonGroup {
  const comp = new IoButtonGroup();
  const host = document.createElement('io-button-group');
  (comp as any).el = host;
  (comp as any).change = { emit: vi.fn() };
  Object.assign(comp, overrides);
  return comp;
}

describe('io-button-group — default props', () => {
  let comp: IoButtonGroup;

  beforeEach(() => {
    comp = makeComponent();
  });

  it('exclusive defaults to false', () => {
    expect(comp.exclusive).toBe(false);
  });

  it('value defaults to empty string', () => {
    expect(comp.value).toBe('');
  });

  it('disabled defaults to false', () => {
    expect(comp.disabled).toBe(false);
  });

  it('label defaults to undefined', () => {
    expect(comp.label).toBeUndefined();
  });

  it('items state starts as empty array', () => {
    expect((comp as any).items).toEqual([]);
  });

  it('focusIndex state starts at 0', () => {
    expect((comp as any).focusIndex).toBe(0);
  });
});

describe('io-button-group — componentDidLoad parsing', () => {
  it('populates items from io-button children', () => {
    const host = document.createElement('io-button-group');
    ['day', 'week', 'month'].forEach(val => {
      const btn = document.createElement('io-button');
      btn.setAttribute('value', val);
      btn.textContent = val.charAt(0).toUpperCase() + val.slice(1);
      host.appendChild(btn);
    });

    const comp = new IoButtonGroup();
    (comp as any).el = host;
    (comp as any).change = { emit: vi.fn() };
    comp.componentDidLoad();

    expect((comp as any).items).toHaveLength(3);
    expect((comp as any).items[0].value).toBe('day');
    expect((comp as any).items[1].value).toBe('week');
    expect((comp as any).items[2].value).toBe('month');
  });

  it('items remains empty when host has no io-button children', () => {
    const comp = makeComponent();
    comp.componentDidLoad();
    expect((comp as any).items).toHaveLength(0);
  });

  it('initFocusIndex sets focusIndex to first active item index', () => {
    const host = document.createElement('io-button-group');
    ['day', 'week', 'month'].forEach(val => {
      const btn = document.createElement('io-button');
      btn.setAttribute('value', val);
      btn.textContent = val;
      host.appendChild(btn);
    });

    const comp = new IoButtonGroup();
    (comp as any).el = host;
    (comp as any).change = { emit: vi.fn() };
    comp.value = 'week';
    comp.componentDidLoad();

    expect((comp as any).focusIndex).toBe(1);
  });

  it('initFocusIndex falls back to 0 when no item matches value', () => {
    const host = document.createElement('io-button-group');
    ['day', 'week', 'month'].forEach(val => {
      const btn = document.createElement('io-button');
      btn.setAttribute('value', val);
      btn.textContent = val;
      host.appendChild(btn);
    });

    const comp = new IoButtonGroup();
    (comp as any).el = host;
    (comp as any).change = { emit: vi.fn() };
    comp.value = 'year';
    comp.componentDidLoad();

    expect((comp as any).focusIndex).toBe(0);
  });
});

describe('io-button-group — @Watch handlers', () => {
  it('onValueChange calls initFocusIndex (updates focusIndex)', () => {
    const host = document.createElement('io-button-group');
    ['day', 'week', 'month'].forEach(val => {
      const btn = document.createElement('io-button');
      btn.setAttribute('value', val);
      btn.textContent = val;
      host.appendChild(btn);
    });

    const comp = new IoButtonGroup();
    (comp as any).el = host;
    (comp as any).change = { emit: vi.fn() };
    comp.componentDidLoad();

    comp.value = 'month';
    (comp as any).onValueChange();

    expect((comp as any).focusIndex).toBe(2);
  });

  it('onExclusiveChange from multi to exclusive keeps first active value', () => {
    const comp = makeComponent({ exclusive: false, value: ['week', 'month'] } as any);
    (comp as any).items = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ];

    (comp as any).onExclusiveChange(true);

    expect(comp.value).toBe('week');
  });

  it('onExclusiveChange from exclusive to multi wraps string in array', () => {
    const comp = makeComponent({ exclusive: true, value: 'week' } as any);
    (comp as any).items = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
    ];

    (comp as any).onExclusiveChange(false);

    expect(comp.value).toEqual(['week']);
  });

  it('onExclusiveChange from exclusive to multi produces empty array when no selection', () => {
    const comp = makeComponent({ exclusive: true, value: '' });
    (comp as any).items = [{ value: 'day', label: 'Day' }];

    (comp as any).onExclusiveChange(false);

    expect(comp.value).toEqual([]);
  });
});

describe('io-button-group — disconnectedCallback', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('clears lateParseTimeout when component disconnects before the timeout fires', () => {
    vi.useFakeTimers();

    const host = document.createElement('io-button-group');
    // Add a non-io-button child so el.children.length > 0 but parseButtonGroupItems → []
    const div = document.createElement('div');
    host.appendChild(div);

    const comp = new IoButtonGroup();
    (comp as any).el = host;
    (comp as any).change = { emit: vi.fn() };

    comp.componentDidLoad();

    // lateParseTimeout should be set (items empty, children present)
    expect((comp as any).lateParseTimeout).toBeDefined();

    // Disconnect before timeout fires
    comp.disconnectedCallback();

    expect((comp as any).lateParseTimeout).toBeUndefined();

    // Advancing timers should not invoke the late-parse callback
    const itemsBefore = (comp as any).items.length;
    vi.runAllTimers();
    expect((comp as any).items.length).toBe(itemsBefore);
  });

  it('does not throw in disconnectedCallback when no timeout was scheduled', () => {
    const host = document.createElement('io-button-group');
    ['day', 'week'].forEach(val => {
      const btn = document.createElement('io-button');
      btn.setAttribute('value', val);
      btn.textContent = val;
      host.appendChild(btn);
    });

    const comp = new IoButtonGroup();
    (comp as any).el = host;
    (comp as any).change = { emit: vi.fn() };
    comp.componentDidLoad();

    // Items were parsed successfully — lateParseTimeout was never set
    expect((comp as any).lateParseTimeout).toBeUndefined();

    // Should not throw
    expect(() => comp.disconnectedCallback()).not.toThrow();
  });
});
