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

describe('io-segmented-control — render() ARIA', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('renders with role="group" on Host', () => {
    const component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).change = { emit: vi.fn() };
    component.value = 'a';
    component.disabled = false;

    component.render();

    // In the test mock, Host is resolved to undefined, so we check the first
    // h() call argument that is either 'Host' (string) or undefined (mock sentinel)
    const hostCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'Host' || args[0] == null);

    expect(hostCalls.length).toBeGreaterThanOrEqual(1);
    expect(hostCalls[0]?.[1]?.['role']).toBe('group');
  });

  it('sets aria-disabled="true" on Host when disabled', () => {
    const component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).change = { emit: vi.fn() };
    component.value = undefined;
    component.disabled = true;

    component.render();

    const hostCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'Host' || args[0] == null);

    expect(hostCalls[0]?.[1]?.['aria-disabled']).toBe('true');
  });

  it('omits aria-disabled when not disabled', () => {
    const component = new IoSegmentedControl();
    (component as any).el = document.createElement('io-segmented-control');
    (component as any).change = { emit: vi.fn() };
    component.value = undefined;
    component.disabled = false;

    component.render();

    const hostCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'Host' || args[0] == null);

    expect(hostCalls[0]?.[1]?.['aria-disabled']).toBeUndefined();
  });
});
