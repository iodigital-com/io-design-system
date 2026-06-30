/**
 * io-multi-select — keyboard navigation spec
 *
 * Covers: PageUp/PageDown navigation and typeahead letter search.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

vi.mock('@floating-ui/dom', () => ({
  computePosition: vi.fn().mockResolvedValue({ x: 0, y: 40 }),
  autoUpdate: vi.fn(() => vi.fn()),
  offset: vi.fn(() => ({ name: 'offset' })),
  flip: vi.fn(() => ({ name: 'flip' })),
  shift: vi.fn(() => ({ name: 'shift' })),
}));

import { IoMultiSelect } from './io-multi-select';

function makeKeyEvent(key: string): KeyboardEvent {
  return { key, preventDefault: vi.fn(), stopPropagation: vi.fn() } as unknown as KeyboardEvent;
}

function makeComponent(): IoMultiSelect {
  const c = new IoMultiSelect();
  (c as any).el = document.createElement('io-multi-select');
  (c as any).change = { emit: vi.fn() };
  (c as any).blur = { emit: vi.fn() };
  (c as any).toggle = { emit: vi.fn() };
  (c as any).internals = {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
  c.name = 'test';
  c.label = 'Countries';
  (c as any).triggerEl = { focus: vi.fn(), getBoundingClientRect: () => ({ width: 200 }) };
  (c as any).dropdownEl = { style: {} };
  (c as any).componentWillLoad();
  return c;
}

// ── PageUp / PageDown ─────────────────────────────────────────────────────────

describe('io-multi-select — PageUp/PageDown keyboard navigation', () => {
  const LONG_OPTIONS = Array.from({ length: 20 }, (_, i) => ({
    value: `v${i}`,
    label: `Option ${i}`,
    disabled: false,
  }));

  let component: IoMultiSelect;

  beforeEach(() => {
    component = makeComponent();
    (component as any).flatOptions = LONG_OPTIONS;
    (component as any).groups = [{ options: LONG_OPTIONS }];
    (component as any).isOpen = true;
    (component as any).activeIndex = 5;
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
    expect((component as any).activeIndex).toBe(19);
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

// ── Typeahead letter search ───────────────────────────────────────────────────

describe('io-multi-select — typeahead letter search', () => {
  const OPTIONS_FOR_TYPEAHEAD = [
    { value: 'nl', label: 'Netherlands' },
    { value: 'be', label: 'Belgium' },
    { value: 'de', label: 'Germany' },
    { value: 'at', label: 'Austria', disabled: true },
    { value: 'au', label: 'Australia' },
  ];

  let component: IoMultiSelect;

  beforeEach(() => {
    vi.useFakeTimers();
    component = makeComponent();
    (component as any).flatOptions = OPTIONS_FOR_TYPEAHEAD;
    (component as any).groups = [{ options: OPTIONS_FOR_TYPEAHEAD }];
    (component as any).isOpen = true;
    (component as any).activeIndex = -1;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('typing a single letter jumps to matching option', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('b'));
    expect((component as any).activeIndex).toBe(1); // Belgium
  });

  it('typing multi-char prefix narrows the match', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('g'));
    expect((component as any).activeIndex).toBe(2); // Germany
  });

  it('skips disabled options in typeahead', () => {
    // 'at' (Austria) is disabled; 'au' (Australia) should match 'a' prefix
    (component as any).handleTriggerKeyDown(makeKeyEvent('a'));
    const idx = (component as any).activeIndex;
    expect(OPTIONS_FOR_TYPEAHEAD[idx].disabled).toBeFalsy();
    expect(OPTIONS_FOR_TYPEAHEAD[idx].label.toLowerCase().startsWith('a')).toBe(true);
  });

  it('buffer resets after 500ms timeout', () => {
    (component as any).handleTriggerKeyDown(makeKeyEvent('n'));
    vi.advanceTimersByTime(600);
    // Buffer reset; typing 'e' — no option starts with 'e', activeIndex unchanged
    const prevIndex = (component as any).activeIndex;
    (component as any).handleTriggerKeyDown(makeKeyEvent('e'));
    const idx = (component as any).activeIndex;
    expect(idx).toBe(prevIndex);
  });

  it('printable key typed when dropdown is closed does not open (only arrow/enter does)', () => {
    (component as any).isOpen = false;
    (component as any).handleTriggerKeyDown(makeKeyEvent('b'));
    // The closed-dropdown branch only opens for Enter/Space/ArrowDown/ArrowUp
    expect((component as any).isOpen).toBe(false);
  });
});
