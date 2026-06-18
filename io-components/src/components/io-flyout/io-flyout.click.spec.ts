import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoFlyout } from './io-flyout';

describe('io-flyout — dismiss event', () => {
  let component: IoFlyout;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoFlyout();
    emitSpy = vi.fn();
    (component as any).el = document.createElement('io-flyout');
    (component as any).dismissEvent = { emit: emitSpy };
    (component as any).componentWillLoad();
    component.open = true;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handleDismiss emits dismiss event', () => {
    (component as any).handleDismiss();
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('handleDismiss sets open to false', () => {
    (component as any).handleDismiss();
    expect(component.open).toBe(false);
  });

  it('close button click via handleDismiss emits dismiss', () => {
    (component as any).handleDismiss();
    expect(emitSpy).toHaveBeenCalled();
  });
});

describe('io-flyout — backdrop click', () => {
  let component: IoFlyout;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoFlyout();
    emitSpy = vi.fn();
    (component as any).el = document.createElement('io-flyout');
    (component as any).dismissEvent = { emit: emitSpy };
    (component as any).componentWillLoad();
    component.open = true;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('backdrop click emits dismiss when target is the backdrop element', () => {
    const backdropEl = document.createElement('div');
    (component as any).backdropEl = backdropEl;

    const ev = { target: backdropEl } as unknown as MouseEvent;
    (component as any).handleBackdropClick(ev);

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('backdrop click does NOT emit dismiss when target is a child element', () => {
    const backdropEl = document.createElement('div');
    const child = document.createElement('div');
    (component as any).backdropEl = backdropEl;

    const ev = { target: child } as unknown as MouseEvent;
    (component as any).handleBackdropClick(ev);

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('backdrop click sets open to false when target matches backdrop', () => {
    const backdropEl = document.createElement('div');
    (component as any).backdropEl = backdropEl;

    const ev = { target: backdropEl } as unknown as MouseEvent;
    (component as any).handleBackdropClick(ev);

    expect(component.open).toBe(false);
  });
});

describe('io-flyout — close() method does NOT emit dismiss', () => {
  let component: IoFlyout;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoFlyout();
    emitSpy = vi.fn();
    (component as any).el = document.createElement('io-flyout');
    (component as any).dismissEvent = { emit: emitSpy };
    (component as any).componentWillLoad();
    component.open = true;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('close() does NOT emit the dismiss event (programmatic close)', async () => {
    await component.close();
    expect(emitSpy).not.toHaveBeenCalled();
  });
});

describe('io-flyout — Escape key', () => {
  let component: IoFlyout;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoFlyout();
    emitSpy = vi.fn();
    (component as any).el = document.createElement('io-flyout');
    (component as any).dismissEvent = { emit: emitSpy };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Escape key while open emits dismiss', () => {
    component.open = true;
    const ev = {
      key: 'Escape',
      stopPropagation: vi.fn(),
    } as unknown as KeyboardEvent;
    (component as any).handleKeydown(ev);
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('Escape key while open sets open to false', () => {
    component.open = true;
    const ev = {
      key: 'Escape',
      stopPropagation: vi.fn(),
    } as unknown as KeyboardEvent;
    (component as any).handleKeydown(ev);
    expect(component.open).toBe(false);
  });

  it('Escape key while closed is a no-op', () => {
    component.open = false;
    const ev = {
      key: 'Escape',
      stopPropagation: vi.fn(),
    } as unknown as KeyboardEvent;
    (component as any).handleKeydown(ev);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('other keys do not trigger dismiss', () => {
    component.open = true;
    const ev = {
      key: 'Enter',
      stopPropagation: vi.fn(),
    } as unknown as KeyboardEvent;
    (component as any).handleKeydown(ev);
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
