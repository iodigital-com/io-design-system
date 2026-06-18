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

describe('io-segmented-control — click / segmentSelect event handling', () => {
  let component: IoSegmentedControl;
  let emitMock: ReturnType<typeof vi.fn>;
  let host: HTMLElement;

  beforeEach(() => {
    component = new IoSegmentedControl();
    host = document.createElement('io-segmented-control');
    (component as any).el = host;
    emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    component.value = undefined;
    component.disabled = false;
  });

  it('emits change with the selected segment value', () => {
    const seg1 = makeSegment('list');
    const seg2 = makeSegment('grid');
    host.appendChild(seg1);
    host.appendChild(seg2);

    const ev = new CustomEvent('segmentSelect', { detail: { value: 'list' }, bubbles: true });
    (component as any).handleSegmentSelect(ev);

    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ value: 'list' });
  });

  it('updates the group value to the selected segment value', () => {
    const ev = new CustomEvent('segmentSelect', { detail: { value: 'grid' }, bubbles: true });
    (component as any).handleSegmentSelect(ev);

    expect(component.value).toBe('grid');
  });

  it('emits change when selection moves from one segment to another', () => {
    const seg1 = makeSegment('list');
    const seg2 = makeSegment('grid');
    host.appendChild(seg1);
    host.appendChild(seg2);
    component.value = 'list';

    const ev = new CustomEvent('segmentSelect', { detail: { value: 'grid' }, bubbles: true });
    (component as any).handleSegmentSelect(ev);

    expect(component.value).toBe('grid');
    expect(emitMock).toHaveBeenCalledWith({ value: 'grid' });
  });

  it('emits once per segmentSelect event', () => {
    const ev1 = new CustomEvent('segmentSelect', { detail: { value: 'a' }, bubbles: true });
    const ev2 = new CustomEvent('segmentSelect', { detail: { value: 'b' }, bubbles: true });

    (component as any).handleSegmentSelect(ev1);
    (component as any).handleSegmentSelect(ev2);

    expect(emitMock).toHaveBeenCalledTimes(2);
    expect(emitMock).toHaveBeenNthCalledWith(1, { value: 'a' });
    expect(emitMock).toHaveBeenNthCalledWith(2, { value: 'b' });
  });
});
