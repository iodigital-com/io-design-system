import { h } from '@stencil/core';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

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

  it('type defaults to "single"', () => {
    expect(comp.type).toBe('single');
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

  it('onTypeChange from multiple to single keeps first active value', () => {
    const comp = makeComponent({ type: 'multiple', value: ['week', 'month'] } as any);
    (comp as any).items = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ];

    (comp as any).onTypeChange('single');

    expect(comp.value).toBe('week');
  });

  it('onTypeChange from single to multiple wraps string in array', () => {
    const comp = makeComponent({ type: 'single', value: 'week' } as any);
    (comp as any).items = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
    ];

    (comp as any).onTypeChange('multiple');

    expect(comp.value).toEqual(['week']);
  });

  it('onTypeChange from single to multiple produces empty array when no selection', () => {
    const comp = makeComponent({ type: 'single', value: '' });
    (comp as any).items = [{ value: 'day', label: 'Day' }];

    (comp as any).onTypeChange('multiple');

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

function hCallsForTag(tag: string): Array<Record<string, unknown> | undefined> {
  return vi
    .mocked(h)
    .mock.calls.filter((args) => args[0] === tag)
    .map((args) => args[1] as Record<string, unknown> | undefined);
}

describe('io-button-group render — single mode (radiogroup)', () => {
  beforeEach(() => {
    const comp = makeRenderComp({ type: 'single', value: 'b' });
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

describe('io-button-group render — multiple mode (group)', () => {
  beforeEach(() => {
    const comp = makeRenderComp({ type: 'multiple', value: ['a', 'c'] });
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
  it('group container uses aria-labelledby when label is provided', () => {
    const comp = makeRenderComp({ label: 'View period' });
    vi.mocked(h).mockClear();
    comp.render();
    const divProps = hCallsForTag('div').find((p) => p?.['role'] === 'group' || p?.['role'] === 'radiogroup');
    expect(divProps?.['aria-labelledby']).toBe('io-button-group-label');
  });

  it('omits aria-labelledby when label prop is undefined', () => {
    const comp = makeRenderComp({ label: undefined });
    vi.mocked(h).mockClear();
    comp.render();
    const divProps = hCallsForTag('div').find((p) => p?.['role'] === 'group' || p?.['role'] === 'radiogroup');
    expect(divProps?.['aria-labelledby']).toBeUndefined();
  });

  it('renders a span element with group-label class when label is provided', () => {
    const comp = makeRenderComp({ label: 'View period' });
    vi.mocked(h).mockClear();
    comp.render();
    const spanProps = hCallsForTag('span').find((p) => p?.['class'] === 'group-label');
    expect(spanProps).toBeDefined();
  });

  it('span label element does NOT have aria-hidden — it must be accessible to aria-labelledby', () => {
    const comp = makeRenderComp({ label: 'View period' });
    vi.mocked(h).mockClear();
    comp.render();
    const spanProps = hCallsForTag('span').find((p) => p?.['class'] === 'group-label');
    // aria-hidden must not be on the label span: the .group div references it via
    // aria-labelledby, and ARIA prohibits referencing aria-hidden elements.
    expect(spanProps?.['aria-hidden']).toBeUndefined();
  });

  it('does not render a group-label span when label prop is undefined', () => {
    const comp = makeRenderComp({ label: undefined });
    vi.mocked(h).mockClear();
    comp.render();
    const labelSpans = hCallsForTag('span').filter((p) => p?.['class'] === 'group-label');
    expect(labelSpans).toHaveLength(0);
  });

  it('does not render a group-label span when label prop is empty string', () => {
    const comp = makeRenderComp({ label: '' });
    vi.mocked(h).mockClear();
    comp.render();
    const labelSpans = hCallsForTag('span').filter((p) => p?.['class'] === 'group-label');
    expect(labelSpans).toHaveLength(0);
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
    expect(buttons.every((p) => p?.['disabled'] === true)).toBe(true);
  });

  it('no button gets tabIndex=0 when all are disabled (none in tab order)', () => {
    const buttons = hCallsForTag('button');
    const focused = buttons.filter((p) => p?.['tabIndex'] === 0);
    expect(focused).toHaveLength(0);
  });
});

// ── Variant prop ──────────────────────────────────────────────────────────────

describe('io-button-group — variant prop', () => {
  it('variant defaults to "primary"', () => {
    const comp = makeComponent();
    expect(comp.variant).toBe('primary');
  });

  it('variant prop can be set to "secondary"', () => {
    const comp = makeComponent({ variant: 'secondary' } as any);
    expect(comp.variant).toBe('secondary');
  });

  it('renders with variant="primary" without throwing', () => {
    const comp = makeRenderComp({ variant: 'primary' } as any);
    vi.mocked(h).mockClear();
    expect(() => comp.render()).not.toThrow();
  });

  it('renders with variant="secondary" without throwing', () => {
    const comp = makeRenderComp({ variant: 'secondary' } as any);
    vi.mocked(h).mockClear();
    expect(() => comp.render()).not.toThrow();
  });

  it('active button class includes group-btn--active for primary variant', () => {
    const comp = makeRenderComp({ type: 'single', value: 'a', variant: 'primary' } as any);
    vi.mocked(h).mockClear();
    comp.render();
    const buttons = hCallsForTag('button');
    const activeBtn = buttons.find((p) => (p?.['class'] as string)?.includes('group-btn--active'));
    expect(activeBtn).toBeDefined();
  });

  it('active button class includes group-btn--active for secondary variant', () => {
    const comp = makeRenderComp({ type: 'single', value: 'a', variant: 'secondary' } as any);
    vi.mocked(h).mockClear();
    comp.render();
    const buttons = hCallsForTag('button');
    const activeBtn = buttons.find((p) => (p?.['class'] as string)?.includes('group-btn--active'));
    expect(activeBtn).toBeDefined();
  });
});

// ── Compact prop ──────────────────────────────────────────────────────────────

describe('io-button-group — compact prop', () => {
  it('compact defaults to false', () => {
    const comp = makeComponent();
    expect(comp.compact).toBe(false);
  });

  it('compact prop can be set to true', () => {
    const comp = makeComponent({ compact: true } as any);
    expect(comp.compact).toBe(true);
  });

  it('renders with compact=true without throwing', () => {
    const comp = makeRenderComp({ compact: true } as any);
    vi.mocked(h).mockClear();
    expect(() => comp.render()).not.toThrow();
  });

  it('renders with compact=false without throwing', () => {
    const comp = makeRenderComp({ compact: false } as any);
    vi.mocked(h).mockClear();
    expect(() => comp.render()).not.toThrow();
  });

  it('compact=true renders the same button roles as compact=false', () => {
    const compactComp = makeRenderComp({ compact: true, type: 'single', value: 'a' } as any);
    vi.mocked(h).mockClear();
    compactComp.render();
    const compactButtons = hCallsForTag('button');

    const standardComp = makeRenderComp({ compact: false, type: 'single', value: 'a' } as any);
    vi.mocked(h).mockClear();
    standardComp.render();
    const standardButtons = hCallsForTag('button');

    expect(compactButtons.map((p) => p?.['role'])).toEqual(standardButtons.map((p) => p?.['role']));
  });
});

// ── Size prop removed ─────────────────────────────────────────────────────────

describe('io-button-group — size prop removed', () => {
  it('component does not have a size property', () => {
    const comp = makeComponent();
    expect((comp as any).size).toBeUndefined();
  });

  it('component does not have a propagateSize method', () => {
    const comp = makeComponent();
    expect(typeof (comp as any).propagateSize).not.toBe('function');
  });

  it('component does not have an onSizeChange method', () => {
    const comp = makeComponent();
    expect(typeof (comp as any).onSizeChange).not.toBe('function');
  });
});

// ── Direction prop ────────────────────────────────────────────────────────────

describe('io-button-group — direction prop', () => {
  it('direction defaults to "row"', () => {
    const comp = makeComponent();
    expect(comp.direction).toBe('row');
  });

  it('direction prop can be set to "column"', () => {
    const comp = makeComponent({ direction: 'column' } as any);
    expect(comp.direction).toBe('column');
  });

  it('direction prop can be set to "row"', () => {
    const comp = makeComponent({ direction: 'row' } as any);
    expect(comp.direction).toBe('row');
  });
});

describe('io-button-group render — direction prop', () => {
  it('renders with default direction "row" without errors', () => {
    const comp = makeRenderComp({ direction: 'row' } as any);
    vi.mocked(h).mockClear();
    expect(() => comp.render()).not.toThrow();
  });

  it('renders with direction "column" without errors', () => {
    const comp = makeRenderComp({ direction: 'column' } as any);
    vi.mocked(h).mockClear();
    expect(() => comp.render()).not.toThrow();
  });
});
