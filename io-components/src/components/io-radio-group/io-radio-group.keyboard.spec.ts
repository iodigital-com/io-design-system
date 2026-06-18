/**
 * io-radio-group — keyboard navigation tests (#653)
 *
 * Tests the ARIA APG roving tabindex pattern:
 * - Arrow keys move focus and select the next/previous radio
 * - Home/End jump to first/last radio
 * - Disabled radios are skipped
 * - tabIndex updates (active radio = 0, others = -1)
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoRadioGroup } from './io-radio-group';

type RadioLike = HTMLElement & {
  value: string;
  checked: boolean;
  name: string;
  disabled: boolean;
  tabIndex: number;
  required: boolean;
  setFocus?: () => void;
  focus?: () => void;
};

function makeRadio(value: string, disabled = false): RadioLike {
  const el = Object.assign(document.createElement('io-radio'), {
    value,
    checked: false,
    name: '',
    disabled,
    tabIndex: -1,
    required: false,
  }) as RadioLike;
  el.focus = vi.fn();
  return el;
}

function makeKeyboardEvent(key: string): KeyboardEvent {
  return new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
}

function makeComponent() {
  const host = document.createElement('io-radio-group');
  const c = new IoRadioGroup();
  (c as any).el = host;
  const emitFn = vi.fn();
  (c as any).change = { emit: emitFn };
  c.name = 'choice';
  c.value = '';
  c.disabled = false;
  return { c, host, emitFn };
}

describe('io-radio-group — keyboard navigation (roving tabindex)', () => {
  let c: IoRadioGroup;
  let host: HTMLElement;
  let emitFn: ReturnType<typeof vi.fn>;
  let radio1: RadioLike;
  let radio2: RadioLike;
  let radio3: RadioLike;

  beforeEach(() => {
    ({ c, host, emitFn } = makeComponent());
    radio1 = makeRadio('a');
    radio2 = makeRadio('b');
    radio3 = makeRadio('c');
    host.appendChild(radio1);
    host.appendChild(radio2);
    host.appendChild(radio3);
  });

  afterEach(() => vi.restoreAllMocks());

  it('ArrowDown moves focus to next radio and selects it', () => {
    // Simulate radio1 is active element
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(radio1);
    const ev = makeKeyboardEvent('ArrowDown');
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');

    (c as any).handleGroupKeydown(ev);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(radio2.checked).toBe(true);
    expect(c.value).toBe('b');
    expect(emitFn).toHaveBeenCalledWith({ value: 'b' });
  });

  it('ArrowRight moves focus to next radio and selects it', () => {
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(radio1);
    const ev = makeKeyboardEvent('ArrowRight');

    (c as any).handleGroupKeydown(ev);

    expect(radio2.checked).toBe(true);
    expect(c.value).toBe('b');
  });

  it('ArrowUp moves focus to previous radio and selects it', () => {
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(radio2);
    const ev = makeKeyboardEvent('ArrowUp');
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');

    (c as any).handleGroupKeydown(ev);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(radio1.checked).toBe(true);
    expect(c.value).toBe('a');
    expect(emitFn).toHaveBeenCalledWith({ value: 'a' });
  });

  it('ArrowLeft moves focus to previous radio and selects it', () => {
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(radio2);
    const ev = makeKeyboardEvent('ArrowLeft');

    (c as any).handleGroupKeydown(ev);

    expect(radio1.checked).toBe(true);
    expect(c.value).toBe('a');
  });

  it('ArrowDown wraps around from last to first radio', () => {
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(radio3);
    const ev = makeKeyboardEvent('ArrowDown');

    (c as any).handleGroupKeydown(ev);

    expect(radio1.checked).toBe(true);
    expect(c.value).toBe('a');
  });

  it('ArrowUp wraps around from first to last radio', () => {
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(radio1);
    const ev = makeKeyboardEvent('ArrowUp');

    (c as any).handleGroupKeydown(ev);

    expect(radio3.checked).toBe(true);
    expect(c.value).toBe('c');
  });

  it('Home moves to first radio', () => {
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(radio3);
    const ev = makeKeyboardEvent('Home');
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');

    (c as any).handleGroupKeydown(ev);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(radio1.checked).toBe(true);
    expect(c.value).toBe('a');
    expect(emitFn).toHaveBeenCalledWith({ value: 'a' });
  });

  it('End moves to last radio', () => {
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(radio1);
    const ev = makeKeyboardEvent('End');
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');

    (c as any).handleGroupKeydown(ev);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(radio3.checked).toBe(true);
    expect(c.value).toBe('c');
    expect(emitFn).toHaveBeenCalledWith({ value: 'c' });
  });

  it('non-navigation key does not prevent default or change state', () => {
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(radio1);
    const ev = makeKeyboardEvent('Tab');
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');

    (c as any).handleGroupKeydown(ev);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
    expect(emitFn).not.toHaveBeenCalled();
    expect(radio1.checked).toBe(false);
  });

  it('updates tabIndex: selected radio gets 0, others get -1', () => {
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(radio1);
    const ev = makeKeyboardEvent('ArrowDown');

    (c as any).handleGroupKeydown(ev);

    expect(radio2.tabIndex).toBe(0);
    expect(radio1.tabIndex).toBe(-1);
    expect(radio3.tabIndex).toBe(-1);
  });

  it('does nothing when all radios are disabled', () => {
    const disabledRadio1 = makeRadio('x', true);
    const disabledHost = document.createElement('io-radio-group');
    disabledHost.appendChild(disabledRadio1);
    const { c: dc } = makeComponent();
    (dc as any).el = disabledHost;

    const ev = makeKeyboardEvent('ArrowDown');
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');

    (dc as any).handleGroupKeydown(ev);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('skips disabled radios when navigating', () => {
    const r1 = makeRadio('x');
    const rDisabled = makeRadio('y', true);
    const r3 = makeRadio('z');
    const disabledHost = document.createElement('io-radio-group');
    disabledHost.appendChild(r1);
    disabledHost.appendChild(rDisabled);
    disabledHost.appendChild(r3);

    const { c: dc, emitFn: ef } = makeComponent();
    (dc as any).el = disabledHost;

    // Start at r1, ArrowDown should skip disabled and land on r3
    vi.spyOn(document, 'activeElement', 'get').mockReturnValue(r1);
    const ev = makeKeyboardEvent('ArrowDown');
    (dc as any).handleGroupKeydown(ev);

    expect(r3.checked).toBe(true);
    expect(ef).toHaveBeenCalledWith({ value: 'z' });
  });
});

describe('io-radio-group — updateTabStops', () => {
  afterEach(() => vi.restoreAllMocks());

  it('gives tabIndex=0 to checked radio, -1 to others', () => {
    const { c, host } = makeComponent();
    const radio1 = makeRadio('a');
    const radio2 = makeRadio('b');
    const radio3 = makeRadio('c');
    host.appendChild(radio1);
    host.appendChild(radio2);
    host.appendChild(radio3);
    c.value = 'b';

    (c as any).updateTabStops();

    expect(radio1.tabIndex).toBe(-1);
    expect(radio2.tabIndex).toBe(0);
    expect(radio3.tabIndex).toBe(-1);
  });

  it('gives tabIndex=0 to first radio when no value is set', () => {
    const { c, host } = makeComponent();
    const radio1 = makeRadio('a');
    const radio2 = makeRadio('b');
    host.appendChild(radio1);
    host.appendChild(radio2);
    c.value = '';

    (c as any).updateTabStops();

    expect(radio1.tabIndex).toBe(0);
    expect(radio2.tabIndex).toBe(-1);
  });

  it('does nothing when no radios are present', () => {
    const { c } = makeComponent();
    expect(() => (c as any).updateTabStops()).not.toThrow();
  });
});
