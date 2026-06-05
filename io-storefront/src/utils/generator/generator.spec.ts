// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';

import { applyPropertiesToElement } from './generator';

describe('applyPropertiesToElement', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('div');
  });

  // ── style object ──────────────────────────────────────────────────────────

  it('applies camelCase style property via setProperty', () => {
    applyPropertiesToElement(el as any, { style: { color: 'red' } });
    expect(el.style.getPropertyValue('color')).toBe('red');
  });

  it('applies CSS variable value via style object', () => {
    applyPropertiesToElement(el as any, { style: { color: 'var(--io-color-success)' } });
    expect(el.style.getPropertyValue('color')).toBe('var(--io-color-success)');
  });

  it('converts camelCase style key to kebab-case', () => {
    applyPropertiesToElement(el as any, { style: { backgroundColor: 'blue' } });
    expect(el.style.getPropertyValue('background-color')).toBe('blue');
  });

  it('applies multiple style properties', () => {
    applyPropertiesToElement(el as any, { style: { color: 'green', fontSize: '16px' } });
    expect(el.style.getPropertyValue('color')).toBe('green');
    expect(el.style.getPropertyValue('font-size')).toBe('16px');
  });

  it('does not throw when style is empty object', () => {
    expect(() => applyPropertiesToElement(el as any, { style: {} })).not.toThrow();
  });

  it('does not replace el.style itself (CSSStyleDeclaration must remain intact)', () => {
    const originalStyle = el.style;
    applyPropertiesToElement(el as any, { style: { color: 'red' } });
    expect(el.style).toBe(originalStyle);
  });

  // ── hyphenated attribute keys ─────────────────────────────────────────────

  it('sets hyphenated key via setAttribute', () => {
    applyPropertiesToElement(el as any, { 'data-testid': 'foo' });
    expect(el.getAttribute('data-testid')).toBe('foo');
  });

  it('removes hyphenated attribute when value is false', () => {
    el.setAttribute('aria-expanded', 'true');
    applyPropertiesToElement(el as any, { 'aria-expanded': false });
    expect(el.hasAttribute('aria-expanded')).toBe(false);
  });

  it('removes hyphenated attribute when value is null', () => {
    el.setAttribute('data-x', 'y');
    applyPropertiesToElement(el as any, { 'data-x': null });
    expect(el.hasAttribute('data-x')).toBe(false);
  });

  // ── regular prop assignment ───────────────────────────────────────────────

  it('assigns regular property directly', () => {
    applyPropertiesToElement(el as any, { name: 'search' });
    expect((el as any)['name']).toBe('search');
  });

  it('assigns boolean property directly', () => {
    applyPropertiesToElement(el as any, { fixedWidth: true });
    expect((el as any)['fixedWidth']).toBe(true);
  });
});
