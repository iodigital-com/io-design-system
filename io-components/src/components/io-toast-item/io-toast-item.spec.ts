import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoToastItem } from './io-toast-item';

describe('io-toast-item — default props', () => {
  let component: IoToastItem;

  beforeEach(() => {
    component = new IoToastItem();
    (component as any).dismiss = { emit: vi.fn() };
  });

  it('text defaults to empty string', () => {
    expect(component.text).toBe('');
  });

  it('variant defaults to neutral', () => {
    expect(component.variant).toBe('neutral');
  });
});

describe('io-toast-item — dismiss', () => {
  let component: IoToastItem;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoToastItem();
    emitMock = vi.fn();
    (component as any).dismiss = { emit: emitMock };
  });

  it('emits dismiss when close is clicked', () => {
    (component as any).handleClose();
    expect(emitMock).toHaveBeenCalled();
  });

  it('emits dismiss once per click', () => {
    (component as any).handleClose();
    (component as any).handleClose();
    expect(emitMock).toHaveBeenCalledTimes(2);
  });
});

describe('io-toast-item — variant', () => {
  it.each(['neutral', 'success', 'error', 'warning', 'info'] as const)(
    'accepts %s variant',
    (variant) => {
      const component = new IoToastItem();
      (component as any).dismiss = { emit: vi.fn() };
      component.variant = variant;
      expect(component.variant).toBe(variant);
    },
  );
});
