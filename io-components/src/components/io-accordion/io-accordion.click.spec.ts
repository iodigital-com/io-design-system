import { describe, it, expect, vi } from 'vitest';
import { IoAccordion } from './io-accordion';

describe('io-accordion — event emission', () => {
  let component: IoAccordion;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoAccordion();
    emitSpy = vi.fn();
    (component as any).update = { emit: emitSpy };
    (component as any).el = { id: '' };
    component.componentWillLoad();
  });

  it('emits update with open=true when opening', () => {
    (component as any).toggleSingle();
    expect(emitSpy).toHaveBeenCalledOnce();
    expect(emitSpy).toHaveBeenCalledWith({ open: true });
  });

  it('emits update with open=false when closing', () => {
    component.open = true;
    (component as any).toggleSingle();
    expect(emitSpy).toHaveBeenCalledOnce();
    expect(emitSpy).toHaveBeenCalledWith({ open: false });
  });

  it('does not emit when disabled', () => {
    component.disabled = true;
    (component as any).toggleSingle();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('does not toggle open state when disabled', () => {
    component.disabled = true;
    expect(component.open).toBe(false);
    (component as any).toggleSingle();
    expect(component.open).toBe(false);
  });
});
