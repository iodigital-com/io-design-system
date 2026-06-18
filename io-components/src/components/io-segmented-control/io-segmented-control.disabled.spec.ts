import { describe, it, expect, vi, beforeEach } from 'vitest';

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

describe('io-segmented-control — disabled state', () => {
  let component: IoSegmentedControl;
  let host: HTMLElement;

  beforeEach(() => {
    component = new IoSegmentedControl();
    host = document.createElement('io-segmented-control');
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.value = undefined;
    component.disabled = false;
  });

  it('propagates disabled=true to all slotted io-segment children', () => {
    const seg1 = makeSegment('list');
    const seg2 = makeSegment('grid');
    host.appendChild(seg1);
    host.appendChild(seg2);
    component.disabled = true;

    (component as any).syncChildren();

    expect(seg1.disabled).toBe(true);
    expect(seg2.disabled).toBe(true);
  });

  it('does not force-disable children when group is enabled', () => {
    const seg = makeSegment('list');
    host.appendChild(seg);
    component.disabled = false;

    (component as any).syncChildren();

    expect(seg.disabled).toBe(false);
  });

  it('propagates disabled to newly added children after a re-sync', () => {
    component.disabled = true;
    const seg1 = makeSegment('first');
    host.appendChild(seg1);
    (component as any).syncChildren();

    const seg2 = makeSegment('second');
    host.appendChild(seg2);
    (component as any).syncChildren();

    expect(seg1.disabled).toBe(true);
    expect(seg2.disabled).toBe(true);
  });

  it('does not throw when disabled is toggled with no children present', () => {
    component.disabled = true;

    expect(() => (component as any).syncChildren()).not.toThrow();
  });

  it('re-enables children when group disabled changes from true to false', () => {
    const seg = makeSegment('list');
    seg.disabled = true;
    host.appendChild(seg);
    component.disabled = true;
    (component as any).syncChildren();
    expect(seg.disabled).toBe(true);

    component.disabled = false;
    (component as any).syncChildren();
    expect(seg.disabled).toBe(false);
  });

  it('still sets selected state correctly even when disabled', () => {
    const seg = makeSegment('list');
    host.appendChild(seg);
    component.value = 'list';
    component.disabled = true;

    (component as any).syncChildren();

    expect(seg.selected).toBe(true);
    expect(seg.disabled).toBe(true);
  });
});
