import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTableHeadCell } from './io-table-head-cell';

describe('io-table-head-cell — keyboard interaction', () => {
  let component: IoTableHeadCell;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoTableHeadCell();
    emitMock = vi.fn();
    (component as any).sort = { emit: emitMock };
    component.sortable = true;
    component.sortKey = 'email';
  });

  it('emits sort on Enter key press', () => {
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');
    (component as any).handleKeyDown(ev);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(emitMock).toHaveBeenCalledOnce();
  });

  it('emits sort on Space key press', () => {
    const ev = new KeyboardEvent('keydown', { key: ' ' });
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');
    (component as any).handleKeyDown(ev);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(emitMock).toHaveBeenCalledOnce();
  });

  it('does not emit sort on other key presses', () => {
    const ev = new KeyboardEvent('keydown', { key: 'Tab' });
    (component as any).handleKeyDown(ev);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('emits sort on click', () => {
    (component as any).handleSort();
    expect(emitMock).toHaveBeenCalledOnce();
  });
});
