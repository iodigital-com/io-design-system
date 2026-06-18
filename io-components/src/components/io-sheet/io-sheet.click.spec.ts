import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoSheet } from './io-sheet';

describe('io-sheet — dismiss event', () => {
  let component: IoSheet;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoSheet();
    emitSpy = vi.fn();
    (component as any).el = document.createElement('io-sheet');
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

describe('io-sheet — backdrop click', () => {
  let component: IoSheet;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoSheet();
    emitSpy = vi.fn();
    (component as any).el = document.createElement('io-sheet');
    (component as any).dismissEvent = { emit: emitSpy };
    (component as any).componentWillLoad();
    component.open = true;
    component.dismissible = true;
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

  it('backdrop click does NOT dismiss when dismissible=false', () => {
    component.dismissible = false;
    const backdropEl = document.createElement('div');
    (component as any).backdropEl = backdropEl;

    const ev = { target: backdropEl } as unknown as MouseEvent;
    (component as any).handleBackdropClick(ev);

    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.open).toBe(true);
  });
});

describe('io-sheet — Escape key', () => {
  let component: IoSheet;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoSheet();
    emitSpy = vi.fn();
    (component as any).el = document.createElement('io-sheet');
    (component as any).dismissEvent = { emit: emitSpy };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Escape key while open and dismissible emits dismiss', () => {
    component.open = true;
    component.dismissible = true;
    const ev = {
      key: 'Escape',
      stopPropagation: vi.fn(),
    } as unknown as KeyboardEvent;
    (component as any).handleKeydown(ev);
    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('Escape key while open and dismissible sets open to false', () => {
    component.open = true;
    component.dismissible = true;
    const ev = {
      key: 'Escape',
      stopPropagation: vi.fn(),
    } as unknown as KeyboardEvent;
    (component as any).handleKeydown(ev);
    expect(component.open).toBe(false);
  });

  it('Escape key while closed is a no-op', () => {
    component.open = false;
    component.dismissible = true;
    const ev = {
      key: 'Escape',
      stopPropagation: vi.fn(),
    } as unknown as KeyboardEvent;
    (component as any).handleKeydown(ev);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('Escape key does NOT dismiss when dismissible=false', () => {
    component.open = true;
    component.dismissible = false;
    const ev = {
      key: 'Escape',
      stopPropagation: vi.fn(),
    } as unknown as KeyboardEvent;
    (component as any).handleKeydown(ev);
    expect(emitSpy).not.toHaveBeenCalled();
    expect(component.open).toBe(true);
  });

  it('other keys do not trigger dismiss', () => {
    component.open = true;
    component.dismissible = true;
    const ev = {
      key: 'Enter',
      stopPropagation: vi.fn(),
    } as unknown as KeyboardEvent;
    (component as any).handleKeydown(ev);
    expect(emitSpy).not.toHaveBeenCalled();
  });
});
