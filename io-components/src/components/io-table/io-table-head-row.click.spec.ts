import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTableHeadRow } from './io-table-head-row';

describe('io-table-head-row — event behavior', () => {
  let component: IoTableHeadRow;
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
    component = new IoTableHeadRow();
    emitMock = vi.fn();
    (component as any).selectAll = { emit: emitMock };
  });

  it('emits selectAll with checked: true when select-all checkbox is checked', () => {
    const ev = makeChangeEvent(true);
    (component as any).handleSelectAll(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ checked: true });
  });

  it('emits selectAll with checked: false when select-all checkbox is unchecked', () => {
    const ev = makeChangeEvent(false);
    (component as any).handleSelectAll(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ checked: false });
  });
});
