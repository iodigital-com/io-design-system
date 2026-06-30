import { h } from '@stencil/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoSegmentedControl } from './io-segmented-control';

type SegmentLike = HTMLElement & {
  value: string;
  selected: boolean;
  disabled: boolean;
  tabIndex: number;
};

function makeSegment(value: string): SegmentLike {
  return Object.assign(document.createElement('io-segment'), {
    value,
    selected: false,
    disabled: false,
    tabIndex: -1,
  }) as SegmentLike;
}

describe('io-segmented-control — default props', () => {
  let component: IoSegmentedControl;

  beforeEach(() => {
    component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).change = { emit: vi.fn() };
  });

  it('has undefined value by default', () => {
    expect(component.value).toBeUndefined();
  });

  it('has undefined name by default', () => {
    expect(component.name).toBeUndefined();
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('has required=false by default (#1074)', () => {
    expect(component.required).toBe(false);
  });

  it('has error=false by default (#1074)', () => {
    expect(component.error).toBe(false);
  });

  it('has undefined errorMessage by default (#1074)', () => {
    expect(component.errorMessage).toBeUndefined();
  });

  it('has noWrap=false by default (#1072)', () => {
    expect(component.noWrap).toBe(false);
  });

  it('has columns="auto" by default (#1063)', () => {
    expect(component.columns).toBe('auto');
  });
});

describe('io-segmented-control — syncChildren', () => {
  it('sets selected=true on the child matching the current value', () => {
    const component = new IoSegmentedControl();
    const host = document.createElement('io-segmented-control');
    const seg1 = makeSegment('list');
    const seg2 = makeSegment('grid');
    host.appendChild(seg1);
    host.appendChild(seg2);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.value = 'grid';
    component.disabled = false;

    (component as any).syncChildren();

    expect(seg1.selected).toBe(false);
    expect(seg2.selected).toBe(true);
  });

  it('disables all children when group is disabled', () => {
    const component = new IoSegmentedControl();
    const host = document.createElement('io-segmented-control');
    const seg = makeSegment('list');
    host.appendChild(seg);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.value = undefined;
    component.disabled = true;

    (component as any).syncChildren();

    expect(seg.disabled).toBe(true);
  });

  it('does not throw when no children are present', () => {
    const component = new IoSegmentedControl();
    const host = document.createElement('io-segmented-control');
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.value = undefined;
    component.disabled = false;

    expect(() => (component as any).syncChildren()).not.toThrow();
  });

  it('clears selected on all segments when value is undefined', () => {
    const component = new IoSegmentedControl();
    const host = document.createElement('io-segmented-control');
    const seg1 = makeSegment('a');
    const seg2 = makeSegment('b');
    seg1.selected = true;
    host.appendChild(seg1);
    host.appendChild(seg2);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.value = undefined;
    component.disabled = false;

    (component as any).syncChildren();

    expect(seg1.selected).toBe(false);
    expect(seg2.selected).toBe(false);
  });
});

describe('io-segmented-control — handleSegmentSelect', () => {
  it('updates value and emits change when a segment fires segmentSelect', () => {
    const component = new IoSegmentedControl();
    const host = document.createElement('io-segmented-control');
    (component as any).el = host;
    const emitFn = vi.fn();
    (component as any).change = { emit: emitFn };
    component.value = 'list';
    component.disabled = false;

    const ev = new CustomEvent('segmentSelect', { detail: { value: 'grid' }, bubbles: true });
    (component as any).handleSegmentSelect(ev);

    expect(component.value).toBe('grid');
    expect(emitFn).toHaveBeenCalledWith({ value: 'grid' });
  });
});

describe('io-segmented-control — updateTabStops', () => {
  it('gives tabIndex=0 to the selected segment and -1 to others', () => {
    const component = new IoSegmentedControl();
    const host = document.createElement('io-segmented-control');
    const seg1 = makeSegment('list');
    const seg2 = makeSegment('grid');
    host.appendChild(seg1);
    host.appendChild(seg2);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.value = 'grid';
    component.disabled = false;

    (component as any).updateTabStops();

    expect(seg1.tabIndex).toBe(-1);
    expect(seg2.tabIndex).toBe(0);
  });

  it('gives tabIndex=0 to the first non-disabled segment when none are selected', () => {
    const component = new IoSegmentedControl();
    const host = document.createElement('io-segmented-control');
    const seg1 = makeSegment('a');
    const seg2 = makeSegment('b');
    host.appendChild(seg1);
    host.appendChild(seg2);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.value = undefined;
    component.disabled = false;

    (component as any).updateTabStops();

    expect(seg1.tabIndex).toBe(0);
    expect(seg2.tabIndex).toBe(-1);
  });
});

describe('io-segmented-control — render() ARIA (#1080)', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('renders an inner fieldset with role="radiogroup"', () => {
    const component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'test-error-id';
    component.value = 'a';
    component.disabled = false;
    component.label = 'Test';

    component.render();

    const fieldsetCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'fieldset');

    expect(fieldsetCalls.length).toBeGreaterThanOrEqual(1);
    expect(fieldsetCalls[0]?.[1]?.['role']).toBe('radiogroup');
  });

  it('sets aria-required="true" on fieldset when required (#1074)', () => {
    const component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'test-error-id';
    component.required = true;
    component.label = 'Test';

    vi.mocked(h).mockClear();
    component.render();

    const fieldsetCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'fieldset');

    expect(fieldsetCalls[0]?.[1]?.['aria-required']).toBe('true');
  });

  it('omits aria-required when not required', () => {
    const component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'test-error-id';
    component.required = false;
    component.label = 'Test';

    vi.mocked(h).mockClear();
    component.render();

    const fieldsetCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'fieldset');

    expect(fieldsetCalls[0]?.[1]?.['aria-required']).toBeUndefined();
  });

  it('sets aria-invalid="true" on fieldset when error=true (#1074)', () => {
    const component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'test-error-id';
    component.error = true;
    component.label = 'Test';

    vi.mocked(h).mockClear();
    component.render();

    const fieldsetCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'fieldset');

    expect(fieldsetCalls[0]?.[1]?.['aria-invalid']).toBe('true');
  });

  it('renders aria-disabled="true" on Host when disabled', () => {
    const component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'test-error-id';
    component.value = undefined;
    component.disabled = true;
    component.label = 'Test';

    component.render();

    const hostCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'Host' || args[0] == null);

    expect(hostCalls[0]?.[1]?.['aria-disabled']).toBe('true');
  });

  it('omits aria-disabled when not disabled', () => {
    const component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'test-error-id';
    component.value = undefined;
    component.disabled = false;
    component.label = 'Test';

    component.render();

    const hostCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'Host' || args[0] == null);

    expect(hostCalls[0]?.[1]?.['aria-disabled']).toBeUndefined();
  });
});

describe('io-segmented-control — label and accessible name', () => {
  it('has undefined label prop by default', () => {
    const component = new IoSegmentedControl();
    expect(component.label).toBeUndefined();
  });

  it('has hideLabel=false by default', () => {
    const component = new IoSegmentedControl();
    expect(component.hideLabel).toBe(false);
  });

  it('logs console.error when label is not provided', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    component.label = undefined;
    component.componentWillLoad();
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('label'));
    errorSpy.mockRestore();
  });
});

describe('io-segmented-control — noWrap (#1072)', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('wraps slot in io-scroller when noWrap=true', () => {
    const component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'test-error-id';
    component.noWrap = true;
    component.label = 'Test';

    vi.mocked(h).mockClear();
    component.render();

    const scrollerCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'io-scroller');

    expect(scrollerCalls.length).toBeGreaterThanOrEqual(1);
  });

  it('does not render io-scroller when noWrap=false', () => {
    const component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'test-error-id';
    component.noWrap = false;
    component.label = 'Test';

    vi.mocked(h).mockClear();
    component.render();

    const scrollerCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'io-scroller');

    expect(scrollerCalls.length).toBe(0);
  });
});

describe('io-segmented-control — columns (#1063)', () => {
  it('has columns="auto" by default', () => {
    const component = new IoSegmentedControl();
    expect(component.columns).toBe('auto');
  });

  it('accepts a numeric columns value', () => {
    const component = new IoSegmentedControl();
    component.columns = 3;
    expect(component.columns).toBe(3);
  });
});
