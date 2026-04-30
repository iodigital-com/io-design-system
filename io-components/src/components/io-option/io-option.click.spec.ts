import { describe, it, expect, beforeEach, vi } from 'vitest';
import { IoOption } from './io-option';

describe('io-option — click behaviour', () => {
  let component: IoOption;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoOption();
    component.value = 'alice';
    component.label = 'Alice Smith';
    emitSpy = vi.fn();
    (component as any).optionSelect = { emit: emitSpy };
  });

  it('emits optionSelect on click when not disabled', () => {
    (component as any).handleClick();
    expect(emitSpy).toHaveBeenCalledWith({ value: 'alice', label: 'Alice Smith' });
  });

  it('does not emit when disabled', () => {
    component.disabled = true;
    (component as any).handleClick();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('emits exactly once per click', () => {
    (component as any).handleClick();
    (component as any).handleClick();
    expect(emitSpy).toHaveBeenCalledTimes(2);
  });
});
