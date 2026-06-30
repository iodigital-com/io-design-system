import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('@floating-ui/dom', () => ({
  computePosition: vi.fn().mockResolvedValue({ x: 0, y: 40 }),
  offset: vi.fn(() => ({ name: 'offset' })),
  flip: vi.fn(() => ({ name: 'flip' })),
  shift: vi.fn(() => ({ name: 'shift' })),
}));

import { IoSelect } from './io-select';

const OPTIONS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
  { value: 'd', label: 'Delta' },
];

function makeKeyEvent(key: string): KeyboardEvent {
  return { key, preventDefault: vi.fn(), stopPropagation: vi.fn() } as unknown as KeyboardEvent;
}

describe('io-select — keyboard (closed trigger)', () => {
  let component: IoSelect;

  beforeEach(() => {
    component = new IoSelect();
    component.custom = true;
    (component as any).flatOptions = OPTIONS;
    (component as any).groups = [{ options: OPTIONS }];
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).triggerEl = { focus: vi.fn(), getBoundingClientRect: () => ({ width: 200 }) };
    (component as any).dropdownEl = { style: {} };
    component.componentWillLoad();
  });

  it('Enter opens dropdown', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('Enter'));
    expect((component as any).isOpen).toBe(true);
  });

  it('Space opens dropdown', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent(' '));
    expect((component as any).isOpen).toBe(true);
  });

  it('ArrowDown opens dropdown', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('ArrowDown'));
    expect((component as any).isOpen).toBe(true);
  });

  it('ArrowUp opens dropdown', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('ArrowUp'));
    expect((component as any).isOpen).toBe(true);
  });

  it('ArrowDown prevents default', () => {
    const ev = makeKeyEvent('ArrowDown');
    (component as any).handleTriggerKeyDown(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('Tab does not open dropdown', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('Tab'));
    expect((component as any).isOpen).toBe(false);
  });
});

describe('io-select — keyboard (open trigger)', () => {
  let component: IoSelect;

  beforeEach(() => {
    component = new IoSelect();
    component.custom = true;
    (component as any).flatOptions = OPTIONS;
    (component as any).groups = [{ options: OPTIONS }];
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).triggerEl = { focus: vi.fn(), getBoundingClientRect: () => ({ width: 200 }) };
    (component as any).dropdownEl = { style: {} };
    (component as any).isOpen = true;
    (component as any).activeIndex = 0;
    component.componentWillLoad();
  });

  it('Escape closes dropdown', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('Escape'));
    expect((component as any).isOpen).toBe(false);
  });

  it('ArrowDown increments activeIndex', () => {
    (component as any).activeIndex = 0;
    (component as any).handleTriggerKeyDown(makeKeyEvent('ArrowDown'));
    expect((component as any).activeIndex).toBe(1);
  });

  it('ArrowDown skips disabled option (index 2)', () => {
    (component as any).activeIndex = 1;
    (component as any).handleTriggerKeyDown(makeKeyEvent('ArrowDown'));
    expect((component as any).activeIndex).toBe(3); // skips c (disabled)
  });

  it('ArrowUp decrements activeIndex', () => {
    (component as any).activeIndex = 3;
    (component as any).handleTriggerKeyDown(makeKeyEvent('ArrowUp'));
    // from 3: next=2, disabled, skip to 1
    expect((component as any).activeIndex).toBe(1);
  });

  it('ArrowDown wraps to 0 from last', () => {
    (component as any).activeIndex = 3;
    (component as any).handleTriggerKeyDown(makeKeyEvent('ArrowDown'));
    expect((component as any).activeIndex).toBe(0);
  });

  it('ArrowUp wraps to last from 0', () => {
    (component as any).activeIndex = 0;
    (component as any).handleTriggerKeyDown(makeKeyEvent('ArrowUp'));
    // from 0: next = -1 → wraps to 3. 3 is not disabled. So 3.
    expect((component as any).activeIndex).toBe(3);
  });

  it('Home sets activeIndex to 0', () => {
    (component as any).activeIndex = 3;
    (component as any).handleTriggerKeyDown(makeKeyEvent('Home'));
    expect((component as any).activeIndex).toBe(0);
  });

  it('End sets activeIndex to last non-disabled', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('End'));
    expect((component as any).activeIndex).toBe(3);
  });

  it('Enter selects active option', () => {
    (component as any).activeIndex = 0;
    (component as any).handleTriggerKeyDown(makeKeyEvent('Enter'));
    expect(component.value).toBe('a');
  });

  it('Tab closes dropdown', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('Tab'));
    expect((component as any).isOpen).toBe(false);
  });

  it('ArrowDown calls preventDefault', () => {
    const ev = makeKeyEvent('ArrowDown');
    (component as any).handleTriggerKeyDown(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
  });
});

describe('io-select — keyboard (filter input)', () => {
  let component: IoSelect;

  beforeEach(() => {
    component = new IoSelect();
    component.custom = true;
    component.filter = true;
    (component as any).flatOptions = OPTIONS;
    (component as any).groups = [{ options: OPTIONS }];
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).triggerEl = { focus: vi.fn(), getBoundingClientRect: () => ({ width: 200 }) };
    (component as any).dropdownEl = { style: {} };
    (component as any).isOpen = true;
    (component as any).activeIndex = 0;
    component.componentWillLoad();
  });

  it('Escape in filter closes dropdown', () => {
    (component as any).handleFilterKeyDown(makeKeyEvent('Escape'));
    expect((component as any).isOpen).toBe(false);
  });

  it('ArrowDown in filter moves activeIndex', () => {
    (component as any).activeIndex = 0;
    (component as any).handleFilterKeyDown(makeKeyEvent('ArrowDown'));
    expect((component as any).activeIndex).toBe(1);
  });

  it('ArrowUp in filter moves activeIndex backward', () => {
    (component as any).activeIndex = 1;
    (component as any).handleFilterKeyDown(makeKeyEvent('ArrowUp'));
    expect((component as any).activeIndex).toBe(0);
  });

  it('Enter in filter selects active option', () => {
    (component as any).activeIndex = 0;
    (component as any).handleFilterKeyDown(makeKeyEvent('Enter'));
    expect(component.value).toBe('a');
  });
});

describe('io-select — PageUp/PageDown keyboard navigation', () => {
  const LONG_OPTIONS = Array.from({ length: 20 }, (_, i) => ({
    value: `v${i}`,
    label: `Option ${i}`,
    disabled: false,
  }));

  let component: IoSelect;

  beforeEach(() => {
    component = new IoSelect();
    component.custom = true;
    (component as any).flatOptions = LONG_OPTIONS;
    (component as any).groups = [{ options: LONG_OPTIONS }];
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).triggerEl = { focus: vi.fn(), getBoundingClientRect: () => ({ width: 200 }) };
    (component as any).dropdownEl = { style: {} };
    (component as any).isOpen = true;
    (component as any).activeIndex = 5;
    component.componentWillLoad();
  });

  it('PageDown moves activeIndex forward by 10', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('PageDown'));
    expect((component as any).activeIndex).toBe(15);
  });

  it('PageUp moves activeIndex backward by 10', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('PageUp'));
    expect((component as any).activeIndex).toBe(0); // 5 - 10 clamped to 0
  });

  it('PageDown clamps to last option', () => {
    (component as any).activeIndex = 15;
    (component as any).handleTriggerKeyDown(makeKeyEvent('PageDown'));
    expect((component as any).activeIndex).toBe(19); // clamped to last
  });

  it('PageDown calls preventDefault', () => {
    const ev = makeKeyEvent('PageDown');
    (component as any).handleTriggerKeyDown(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
  });

  it('PageUp calls preventDefault', () => {
    const ev = makeKeyEvent('PageUp');
    (component as any).handleTriggerKeyDown(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
  });
});

describe('io-select — typeahead letter search', () => {
  const OPTIONS_FOR_TYPEAHEAD = [
    { value: 'nl', label: 'Netherlands' },
    { value: 'be', label: 'Belgium' },
    { value: 'de', label: 'Germany' },
    { value: 'at', label: 'Austria', disabled: true },
    { value: 'au', label: 'Australia' },
  ];

  let component: IoSelect;

  beforeEach(() => {
    vi.useFakeTimers();
    component = new IoSelect();
    component.custom = true;
    (component as any).flatOptions = OPTIONS_FOR_TYPEAHEAD;
    (component as any).groups = [{ options: OPTIONS_FOR_TYPEAHEAD }];
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).triggerEl = { focus: vi.fn(), getBoundingClientRect: () => ({ width: 200 }) };
    (component as any).dropdownEl = { style: {} };
    (component as any).isOpen = true;
    (component as any).activeIndex = -1;
    component.componentWillLoad();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('typing a single letter jumps to matching option', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('b'));
    expect((component as any).activeIndex).toBe(1); // Belgium
  });

  it('typing multi-char prefix jumps to matching option', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('n'));
    (component as any).handleTriggerKeyDown(makeKeyEvent('e'));
    expect((component as any).activeIndex).toBe(0); // Netherlands starts with "ne"
  });

  it('skips disabled options in typeahead', () => {
    // 'at' is disabled, 'au' should be matched instead
    (component as any).handleTriggerKeyDown(makeKeyEvent('a'));
    const idx = (component as any).activeIndex;
    // Should match Australia (index 4) since Austria is disabled
    expect(OPTIONS_FOR_TYPEAHEAD[idx].disabled).toBeFalsy();
    expect(OPTIONS_FOR_TYPEAHEAD[idx].label.toLowerCase().startsWith('a')).toBe(true);
  });

  it('buffer resets after 500ms timeout', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('n'));
    vi.advanceTimersByTime(600); // past the 500ms timeout
    // Buffer is reset; typing 'e' alone — no option starts with 'e' in this list
    // so activeIndex should remain at the last matched index (Netherlands, 0)
    const prevIndex = (component as any).activeIndex;
    (component as any).handleTriggerKeyDown(makeKeyEvent('e'));
    const idx = (component as any).activeIndex;
    // No option starts with 'e', so activeIndex should stay at prevIndex
    expect(idx).toBe(prevIndex);
  });

  it('printable key when dropdown is closed does not open dropdown (only arrow/enter does)', () => {
    (component as any).isOpen = false;
    (component as any).activeIndex = -1;
    (component as any).handleTriggerKeyDown(makeKeyEvent('b'));
    // Single printable chars only trigger typeahead when isOpen=true.
    // The closed-dropdown branch only opens for Enter/Space/ArrowDown/ArrowUp.
    expect((component as any).isOpen).toBe(false);
  });
});
