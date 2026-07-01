import { describe, it, expect, beforeEach } from 'vitest';
import { ensureIconSymbol, injectIconSprite } from './icon-sprite';

describe('icon-sprite', () => {
  beforeEach(() => {
    // Remove sprite container between tests for isolation
    const existing = document.getElementById('io-icon-sprite');
    existing?.remove();
    // Also clean up any individual symbol elements that may have been injected
    document.querySelectorAll('[id^="io-icon-"]').forEach((el) => el.remove());
  });

  it('ensureIconSymbol creates the sprite container on first call', () => {
    expect(document.getElementById('io-icon-sprite')).toBeNull();
    ensureIconSymbol('check');
    expect(document.getElementById('io-icon-sprite')).not.toBeNull();
  });

  it('ensureIconSymbol injects a <symbol> with the correct id', () => {
    ensureIconSymbol('check');
    const symbol = document.getElementById('io-icon-check');
    expect(symbol).not.toBeNull();
    expect(symbol?.tagName.toLowerCase()).toBe('symbol');
  });

  it('ensureIconSymbol is a no-op for an unknown icon name', () => {
    ensureIconSymbol('nonexistent' as any);
    expect(document.getElementById('io-icon-nonexistent')).toBeNull();
  });

  it('ensureIconSymbol does not inject duplicate symbols on repeated calls', () => {
    ensureIconSymbol('check');
    ensureIconSymbol('check');
    const container = document.getElementById('io-icon-sprite');
    const symbols = container?.querySelectorAll('#io-icon-check');
    expect(symbols?.length).toBe(1);
  });

  it('ensureIconSymbol injects child path/circle elements into the symbol', () => {
    ensureIconSymbol('check');
    const symbol = document.getElementById('io-icon-check');
    expect(symbol?.children.length).toBeGreaterThan(0);
  });

  it('ensureIconSymbol sets correct attributes on the <symbol>', () => {
    ensureIconSymbol('check');
    const symbol = document.getElementById('io-icon-check');
    expect(symbol?.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(symbol?.getAttribute('fill')).toBe('none');
    expect(symbol?.getAttribute('stroke')).toBe('currentColor');
  });

  it('injectIconSprite injects all icons into the sprite container', () => {
    injectIconSprite();
    const container = document.getElementById('io-icon-sprite');
    expect(container).not.toBeNull();
    // Spot-check a few icons
    expect(document.getElementById('io-icon-check')).not.toBeNull();
    expect(document.getElementById('io-icon-x')).not.toBeNull();
    expect(document.getElementById('io-icon-search')).not.toBeNull();
  });

  it('injectIconSprite is idempotent — calling twice does not duplicate symbols', () => {
    injectIconSprite();
    injectIconSprite();
    const checkSymbols = document.querySelectorAll('#io-icon-check');
    expect(checkSymbols.length).toBe(1);
  });

  it('sprite container has aria-hidden="true"', () => {
    ensureIconSymbol('check');
    const container = document.getElementById('io-icon-sprite');
    expect(container?.getAttribute('aria-hidden')).toBe('true');
  });
});
