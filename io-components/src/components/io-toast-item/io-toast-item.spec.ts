import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoToastItem } from './io-toast-item';
import { getToastItemStyles } from './io-toast-item-styles';

describe('io-toast-item — default props', () => {
  let component: IoToastItem;

  beforeEach(() => {
    component = new IoToastItem();
    (component as any).dismiss = { emit: vi.fn() };
    (component as any).action = { emit: vi.fn() };
  });

  it('text defaults to empty string', () => {
    expect(component.text).toBe('');
  });

  it('variant defaults to neutral', () => {
    expect(component.variant).toBe('neutral');
  });

  it('actionLabel defaults to undefined', () => {
    expect(component.actionLabel).toBeUndefined();
  });

  it('actionHref defaults to undefined', () => {
    expect(component.actionHref).toBeUndefined();
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

describe('io-toast-item — interaction model consistency', () => {
  it('uses dismiss semantics without prefixed custom-event APIs', () => {
    const component = new IoToastItem() as any;

    expect('dismiss' in component).toBe(false);
    expect(component.didDismiss).toBeUndefined();
    expect(component.onDismiss).toBeUndefined();
  });

  it('close interaction only emits dismiss', () => {
    const component = new IoToastItem() as any;
    const emitMock = vi.fn();
    component.dismiss = { emit: emitMock };

    expect(() => component.handleClose()).not.toThrow();
    expect(emitMock).toHaveBeenCalledTimes(1);
  });
});

describe('io-toast-item — overlay transition contract', () => {
  it('enter animation uses motion easing token', () => {
    const styles: string = getToastItemStyles('neutral');
    expect(styles).toContain('--io-motion-easing-ease-out');
  });

  it('prefers-reduced-motion guard disables enter animation', () => {
    const styles: string = getToastItemStyles('neutral');
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    const rmIdx = styles.indexOf('@media (prefers-reduced-motion: reduce)');
    expect(styles.slice(rmIdx)).toContain('animation: none');
  });
});

describe('io-toast-item — action CTA', () => {
  it('emits action event when action button is clicked', () => {
    const component = new IoToastItem() as any;
    const actionEmitMock = vi.fn();
    component.dismiss = { emit: vi.fn() };
    component.action = { emit: actionEmitMock };
    component.actionLabel = 'Undo';

    component.handleAction();

    expect(actionEmitMock).toHaveBeenCalledTimes(1);
  });

  it('does not emit action when close button is clicked', () => {
    const component = new IoToastItem() as any;
    const actionEmitMock = vi.fn();
    const dismissEmitMock = vi.fn();
    component.dismiss = { emit: dismissEmitMock };
    component.action = { emit: actionEmitMock };
    component.actionLabel = 'Undo';

    component.handleClose();

    expect(actionEmitMock).not.toHaveBeenCalled();
    expect(dismissEmitMock).toHaveBeenCalledTimes(1);
  });

  it('action CTA styles include primary colour token', () => {
    const styles = getToastItemStyles('neutral');
    expect(styles).toContain('--io-color-primary');
    expect(styles).toContain('.toast__action');
  });
});
