import { describe, it, expect, vi } from 'vitest';
import { IoButtonTile } from './io-button-tile';

describe('io-button-tile — click event', () => {
  it('emits tileClick on click when not disabled', () => {
    const component = new IoButtonTile();
    (component as any).label = 'Test Tile';
    const emitSpy = vi.fn();
    component.tileClick = { emit: emitSpy } as any;
    component['handleClick'](new MouseEvent('click'));
    expect(emitSpy).toHaveBeenCalledOnce();
  });

  it('does not emit tileClick when disabled', () => {
    const component = new IoButtonTile();
    (component as any).label = 'Test Tile';
    (component as any).disabled = true;
    const emitSpy = vi.fn();
    component.tileClick = { emit: emitSpy } as any;
    const e = new MouseEvent('click');
    const preventSpy = vi.spyOn(e, 'preventDefault');
    component['handleClick'](e);
    expect(emitSpy).not.toHaveBeenCalled();
    expect(preventSpy).toHaveBeenCalled();
  });

  it('does not emit tileClick when loading', () => {
    const component = new IoButtonTile();
    (component as any).label = 'Test Tile';
    (component as any).loading = true;
    const emitSpy = vi.fn();
    component.tileClick = { emit: emitSpy } as any;
    component['handleClick'](new MouseEvent('click'));
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('emits tileClick on Enter key', () => {
    const component = new IoButtonTile();
    (component as any).label = 'Test Tile';
    const emitSpy = vi.fn();
    component.tileClick = { emit: emitSpy } as any;
    component['handleKeyDown'](new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(emitSpy).toHaveBeenCalledOnce();
  });

  it('emits tileClick on Space key', () => {
    const component = new IoButtonTile();
    (component as any).label = 'Test Tile';
    const emitSpy = vi.fn();
    component.tileClick = { emit: emitSpy } as any;
    component['handleKeyDown'](new KeyboardEvent('keydown', { key: ' ' }));
    expect(emitSpy).toHaveBeenCalledOnce();
  });
});
