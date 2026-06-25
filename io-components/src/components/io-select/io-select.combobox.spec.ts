import { h } from '@stencil/core';
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

describe('io-select combobox — open/close', () => {
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

  it('isOpen starts false', () => {
    expect((component as any).isOpen).toBe(false);
  });

  it('handleTriggerClick opens when closed', () => {
    (component as any).handleTriggerClick();
    expect((component as any).isOpen).toBe(true);
  });

  it('handleTriggerClick closes when open', () => {
    (component as any).isOpen = true;
    (component as any).handleTriggerClick();
    expect((component as any).isOpen).toBe(false);
  });

  it('does not open when disabled', () => {
    component.disabled = true;
    (component as any).handleTriggerClick();
    expect((component as any).isOpen).toBe(false);
  });
});

describe('io-select combobox — selection (single)', () => {
  let component: IoSelect;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoSelect();
    component.custom = true;
    (component as any).flatOptions = OPTIONS;
    (component as any).groups = [{ options: OPTIONS }];
    emitSpy = vi.fn();
    (component as any).change = { emit: emitSpy };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).triggerEl = { focus: vi.fn(), getBoundingClientRect: () => ({ width: 200 }) };
    (component as any).dropdownEl = { style: {} };
    (component as any).isOpen = true;
    component.componentWillLoad();
  });

  it('selectOption sets value and emits change', () => {
    (component as any).selectOption(OPTIONS[0]);
    expect(component.value).toBe('a');
    expect(emitSpy).toHaveBeenCalledWith({ value: 'a', name: undefined });
  });

  it('selectOption closes dropdown in single mode', () => {
    (component as any).selectOption(OPTIONS[0]);
    expect((component as any).isOpen).toBe(false);
  });

  it('disabled option is skipped', () => {
    (component as any).selectOption(OPTIONS[2]); // disabled
    expect(component.value).toBe('');
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('includes name in change detail when name prop is set', () => {
    // Arrange
    component.name = 'role';

    // Act
    (component as any).selectOption(OPTIONS[0]);

    // Assert
    expect(emitSpy).toHaveBeenCalledWith({ value: 'a', name: 'role' });
  });
});

describe('io-select combobox — selection (multiple)', () => {
  let component: IoSelect;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoSelect();
    component.custom = true;
    component.multiple = true;
    (component as any).flatOptions = OPTIONS;
    (component as any).groups = [{ options: OPTIONS }];
    emitSpy = vi.fn();
    (component as any).change = { emit: emitSpy };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).triggerEl = { focus: vi.fn(), getBoundingClientRect: () => ({ width: 200 }) };
    (component as any).dropdownEl = { style: {} };
    (component as any).isOpen = true;
    component.componentWillLoad();
  });

  it('selecting option adds to selectedValues', () => {
    (component as any).selectOption(OPTIONS[0]);
    expect((component as any).selectedValues).toContain('a');
  });

  it('selecting same option twice removes it', () => {
    (component as any).selectOption(OPTIONS[0]);
    (component as any).selectOption(OPTIONS[0]);
    expect((component as any).selectedValues).not.toContain('a');
  });

  it('emits change with array', () => {
    (component as any).selectOption(OPTIONS[0]);
    expect(emitSpy).toHaveBeenCalledWith({ value: ['a'], name: undefined });
  });

  it('dropdown stays open in multiple mode', () => {
    (component as any).selectOption(OPTIONS[0]);
    expect((component as any).isOpen).toBe(true);
  });

  it('includes name in change detail when name prop is set (multiple)', () => {
    // Arrange
    component.name = 'tags';

    // Act
    (component as any).selectOption(OPTIONS[0]);

    // Assert
    expect(emitSpy).toHaveBeenCalledWith({ value: ['a'], name: 'tags' });
  });
});

describe('io-select combobox — filter', () => {
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
    component.componentWillLoad();
  });

  it('filteredOptions returns all when filterQuery is empty', () => {
    expect((component as any).filteredOptions).toHaveLength(OPTIONS.length);
  });

  it('filteredOptions filters by label case-insensitively', () => {
    (component as any).filterQuery = 'alp';
    expect((component as any).filteredOptions).toHaveLength(1);
    expect((component as any).filteredOptions[0].value).toBe('a');
  });

  it('filteredOptions returns empty when no match', () => {
    (component as any).filterQuery = 'zzz';
    expect((component as any).filteredOptions).toHaveLength(0);
  });

  it('handleFilterInput updates filterQuery', () => {
    const mockEv = { target: { value: 'bet' } } as unknown as Event;
    (component as any).handleFilterInput(mockEv);
    expect((component as any).filterQuery).toBe('bet');
  });

  it('activeIndex resets to 0 when filter has results', () => {
    (component as any).activeIndex = 2;
    const mockEv = { target: { value: 'alp' } } as unknown as Event;
    (component as any).handleFilterInput(mockEv);
    expect((component as any).activeIndex).toBe(0);
  });

  it('activeIndex resets to -1 when filter has no results', () => {
    (component as any).activeIndex = 1;
    const mockEv = { target: { value: 'zzz' } } as unknown as Event;
    (component as any).handleFilterInput(mockEv);
    expect((component as any).activeIndex).toBe(-1);
  });
});

describe('io-select combobox — isSelected', () => {
  let component: IoSelect;

  beforeEach(() => {
    component = new IoSelect();
    component.custom = true;
    (component as any).flatOptions = OPTIONS;
    (component as any).groups = [{ options: OPTIONS }];
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    component.componentWillLoad();
  });

  it('isSelected false when no value set (single mode)', () => {
    expect((component as any).isSelected('a')).toBe(false);
  });

  it('isSelected true after setting value (single mode)', () => {
    component.value = 'a';
    expect((component as any).isSelected('a')).toBe(true);
  });

  it('isSelected uses selectedValues in multiple mode', () => {
    component.multiple = true;
    (component as any).selectedValues = ['a', 'b'];
    expect((component as any).isSelected('a')).toBe(true);
    expect((component as any).isSelected('d')).toBe(false);
  });
});

describe('io-select — group rendering accessibility (#839)', () => {
  function makeGroupedComponent() {
    const c = new IoSelect();
    c.custom = true;
    // filter defaults to false — renderListboxItems skips filteredOptions path
    (c as any).fieldId = 'io-select-test';
    (c as any).groups = [
      {
        label: 'Fruits',
        options: [
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
        ],
      },
    ];
    return c;
  }

  it('group heading span has no aria-hidden attribute', () => {
    const component = makeGroupedComponent();
    vi.mocked(h).mockClear();
    (component as any).renderListboxItems();
    const calls = vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>;
    const spanCall = calls.find(([tag, attrs]) => tag === 'span' && (attrs?.class as string)?.includes('combobox-group__label'));
    expect(spanCall).toBeDefined();
    expect(spanCall?.[1]?.['aria-hidden']).toBeUndefined();
  });

  it('group items are wrapped in ul with role="group" and aria-labelledby', () => {
    const component = makeGroupedComponent();
    vi.mocked(h).mockClear();
    (component as any).renderListboxItems();
    const calls = vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>;
    const ulCall = calls.find(([tag, attrs]) => tag === 'ul' && attrs?.role === 'group');
    expect(ulCall).toBeDefined();
    expect(ulCall?.[1]?.['aria-labelledby']).toBeDefined();
  });
});
