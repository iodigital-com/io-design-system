import { describe, it, expect, beforeEach, vi } from 'vitest';

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
    component.options = OPTIONS;
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
    component.options = OPTIONS;
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
    component.options = OPTIONS;
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
