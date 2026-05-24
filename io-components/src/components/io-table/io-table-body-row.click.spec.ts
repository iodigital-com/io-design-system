import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTableBodyRow } from './io-table-body-row';

describe('io-table-body-row — event behavior', () => {
  let component: IoTableBodyRow;
  let emitMock: ReturnType<typeof vi.fn>;

  function makeChangeEvent(checked: boolean): Event {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = checked;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: input });
    return ev;
  }

  beforeEach(() => {
    component = new IoTableBodyRow();
    emitMock = vi.fn();
    (component as any).select = { emit: emitMock };
  });

  it('emits select with selected: true when checkbox is checked', () => {
    const ev = makeChangeEvent(true);
    (component as any).handleSelect(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ selected: true });
  });

  it('emits select with selected: false when checkbox is unchecked', () => {
    const ev = makeChangeEvent(false);
    (component as any).handleSelect(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ selected: false });
  });
});
