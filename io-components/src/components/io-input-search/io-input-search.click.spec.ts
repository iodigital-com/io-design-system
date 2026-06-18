import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoInputSearch } from './io-input-search';

describe('io-input-search — click/change events', () => {
  let component: IoInputSearch;
  let changeMock: ReturnType<typeof vi.fn>;
  let clearMock: ReturnType<typeof vi.fn>;

  function makeChangeEvent(value: string): Event {
    const input = document.createElement('input');
    input.value = value;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: input });
    return ev;
  }

  beforeEach(() => {
    component = new IoInputSearch();
    (component as any).el = document.createElement('io-input-search');
    changeMock = vi.fn();
    clearMock = vi.fn();
    (component as any).change = { emit: changeMock };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).clear = { emit: clearMock };
    (component as any).internals = { setFormValue: vi.fn() };
    component.label = 'Search';
  });

  it('emits change with value on handleChange', () => {
    const ev = makeChangeEvent('query');
    (component as any).handleChange(ev);
    expect(changeMock).toHaveBeenCalledOnce();
    expect(changeMock).toHaveBeenCalledWith('query');
  });

  it('does not emit change when disabled', () => {
    component.disabled = true;
    const ev = makeChangeEvent('query');
    (component as any).handleChange(ev);
    expect(changeMock).not.toHaveBeenCalled();
  });

  it('updates value prop on change', () => {
    const ev = makeChangeEvent('hello world');
    (component as any).handleChange(ev);
    expect(component.value).toBe('hello world');
  });

  it('handleClear resets value to empty', () => {
    component.value = 'some query';
    (component as any).hasValue = true;
    (component as any).handleClear();
    expect(component.value).toBe('');
  });

  it('handleClear emits clear event', () => {
    (component as any).handleClear();
    expect(clearMock).toHaveBeenCalledOnce();
  });

  it('handleClear sets hasValue false', () => {
    (component as any).hasValue = true;
    (component as any).handleClear();
    expect((component as any).hasValue).toBe(false);
  });
});
