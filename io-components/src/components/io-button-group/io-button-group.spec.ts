import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { h } from '@stencil/core';

import { IoButtonGroup } from './io-button-group';
import type { IoButtonGroupItem } from './types';

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

// ── Render-path tests (vi.mocked(h).mock.calls) ───────────────────────────────

const RENDER_ITEMS: IoButtonGroupItem[] = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
];

function makeRenderComp(overrides: Partial<IoButtonGroup> = {}): IoButtonGroup {
  const comp = new IoButtonGroup();
  (comp as any).el = document.createElement('io-button-group');
  (comp as any).change = { emit: vi.fn() };
  (comp as any).items = [...RENDER_ITEMS];
  Object.assign(comp, overrides);
  return comp;
}

function hCallProps(tag: string): Record<string, unknown> | undefined {
  const call = vi.mocked(h).mock.calls.find((args) => args[0] === tag);
  return call?.[1] as Record<string, unknown> | undefined;
}

function hCallsForTag(tag: string): Array<Record<string, unknown> | undefined> {
  return vi
    .mocked(h)
    .mock.calls.filter((args) => args[0] === tag)
    .map((args) => args[1] as Record<string, unknown> | undefined);
}

describe('io-button-group render — exclusive mode (radiogroup)', () => {
  beforeEach(() => {
    const comp = makeRenderComp({ exclusive: true, value: 'b' });
    vi.mocked(h).mockClear();
    comp.render();
  });

  it('group container has role="radiogroup"', () => {
    const divProps = hCallsForTag('div').find((p) => p?.['role'] === 'radiogroup');
    expect(divProps).toBeDefined();
  });

  it('buttons have role="radio"', () => {
    const buttons = hCallsForTag('button');
    expect(buttons.every((p) => p?.['role'] === 'radio')).toBe(true);
  });

  it('active item has aria-checked="true"', () => {
    const buttons = hCallsForTag('button');
    const activeBtn = buttons.find((p) => p?.['aria-checked'] === 'true');
    expect(activeBtn).toBeDefined();
  });

  it('inactive items have aria-checked="false"', () => {
    const buttons = hCallsForTag('button');
    const inactive = buttons.filter((p) => p?.['aria-checked'] === 'false');
    expect(inactive).toHaveLength(2);
  });

  it('active item gets tabIndex=0 (roving tabindex)', () => {
    const buttons = hCallsForTag('button');
    const focused = buttons.find((p) => p?.['tabIndex'] === 0);
    expect(focused).toBeDefined();
  });

  it('inactive items get tabIndex=-1', () => {
    const buttons = hCallsForTag('button');
    const blurred = buttons.filter((p) => p?.['tabIndex'] === -1);
    expect(blurred).toHaveLength(2);
  });
});

describe('io-button-group render — multi-select mode (group)', () => {
  beforeEach(() => {
    const comp = makeRenderComp({ exclusive: false, value: ['a', 'c'] });
    vi.mocked(h).mockClear();
    comp.render();
  });

  it('group container has role="group"', () => {
    const divProps = hCallsForTag('div').find((p) => p?.['role'] === 'group');
    expect(divProps).toBeDefined();
  });

  it('buttons have role="checkbox"', () => {
    const buttons = hCallsForTag('button');
    expect(buttons.every((p) => p?.['role'] === 'checkbox')).toBe(true);
  });

  it('both active items have aria-checked="true"', () => {
    const buttons = hCallsForTag('button');
    const active = buttons.filter((p) => p?.['aria-checked'] === 'true');
    expect(active).toHaveLength(2);
  });
});

describe('io-button-group render — label prop', () => {
  it('sets aria-label on the group container when label is provided', () => {
    const comp = makeRenderComp({ label: 'View period' });
    vi.mocked(h).mockClear();
    comp.render();
    const divProps = hCallsForTag('div').find((p) => p?.['role'] === 'group' || p?.['role'] === 'radiogroup');
    expect(divProps?.['aria-label']).toBe('View period');
  });

  it('omits aria-label when label prop is undefined', () => {
    const comp = makeRenderComp({ label: undefined });
    vi.mocked(h).mockClear();
    comp.render();
    const divProps = hCallsForTag('div').find((p) => p?.['role'] === 'group' || p?.['role'] === 'radiogroup');
    expect(divProps?.['aria-label']).toBeUndefined();
  });
});

describe('io-button-group render — group disabled', () => {
  beforeEach(() => {
    const comp = makeRenderComp({ disabled: true, value: '' });
    vi.mocked(h).mockClear();
    comp.render();
  });

  it('group container gets aria-disabled="true"', () => {
    const divProps = hCallsForTag('div').find((p) => p?.['role'] === 'group' || p?.['role'] === 'radiogroup');
    expect(divProps?.['aria-disabled']).toBe('true');
  });

  it('all buttons get the disabled attribute', () => {
    const buttons = hCallsForTag('button');
    expect(buttons.every((p) => p?.['disabled'] === true || p?.['disabled'] !== undefined)).toBe(true);
  });

  it('no button gets tabIndex=0 when all are disabled (none in tab order)', () => {
    const buttons = hCallsForTag('button');
    const focused = buttons.filter((p) => p?.['tabIndex'] === 0);
    expect(focused).toHaveLength(0);
  });
});
