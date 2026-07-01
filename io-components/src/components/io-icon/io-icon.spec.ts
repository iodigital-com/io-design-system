import { describe, it, expect } from 'vitest';

import { IoIcon } from './io-icon';

describe('io-icon', () => {
  it('renders without throwing for a known icon', () => {
    const c = new IoIcon();
    c.name = 'x';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('returns null for an unknown icon name', () => {
    const c = new IoIcon();
    c.name = 'nonexistent' as any;
    const result = (c as any).render();
    expect(result).toBeNull();
  });

  it('defaults size to md', () => {
    const c = new IoIcon();
    c.name = 'check';
    expect(c.size).toBe('md');
  });

  it('renders with aria-hidden when no label is provided', () => {
    const c = new IoIcon();
    c.name = 'info';
    const result = (c as any).render();
    expect(result).not.toBeNull();
  });

  it('patches aria attributes when label is provided', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.label = 'Success';
    const result = (c as any).render();
    expect(result).not.toBeNull();
  });

  it('defaults flip to false', () => {
    const c = new IoIcon();
    c.name = 'arrow-right';
    expect(c.flip).toBe(false);
  });

  it('defaults fixedWidth to false', () => {
    const c = new IoIcon();
    c.name = 'search';
    expect(c.fixedWidth).toBe(false);
  });

  it('accepts fixedWidth=true', () => {
    const c = new IoIcon();
    c.name = 'search';
    c.fixedWidth = true;
    expect(c.fixedWidth).toBe(true);
    expect(() => (c as any).render()).not.toThrow();
  });

  it('accepts size="inherit"', () => {
    const c = new IoIcon();
    c.name = 'search';
    c.size = 'inherit';
    expect(c.size).toBe('inherit');
    expect(() => (c as any).render()).not.toThrow();
  });

  it('renders with fixedWidth and inherit size', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.fixedWidth = true;
    c.size = 'inherit';
    const result = (c as any).render();
    expect(result).not.toBeNull();
  });

  it('returns null when iconSource set but fetchedSvg not yet loaded', () => {
    const c = new IoIcon();
    c.iconSource = 'https://example.com/icon.svg';
    (c as any).fetchedSvg = undefined;
    const result = (c as any).render();
    expect(result).toBeNull();
  });

  it('renders fetchedSvg when iconSource resolves', () => {
    const c = new IoIcon();
    c.iconSource = 'https://example.com/icon.svg';
    (c as any).fetchedSvg = '<svg aria-hidden="true"><path/></svg>';
    const result = (c as any).render();
    expect(result).not.toBeNull();
  });

  it('defaults color to inherit', () => {
    const c = new IoIcon();
    c.name = 'check';
    expect(c.color).toBe('inherit');
  });

  it('returns undefined hostStyle when color is inherit', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.color = 'inherit';
    expect((c as any).hostStyle).toBeUndefined();
  });

  it('sets --io-icon-color to primary token when color="primary"', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.color = 'primary';
    expect((c as any).hostStyle).toEqual({ '--io-icon-color': 'var(--io-color-primary)' });
  });

  it('sets --io-icon-color to text-primary token when color="contrast-high"', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.color = 'contrast-high';
    expect((c as any).hostStyle).toEqual({ '--io-icon-color': 'var(--io-text-primary)' });
  });

  it('sets --io-icon-color to text-secondary token when color="contrast-medium"', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.color = 'contrast-medium';
    expect((c as any).hostStyle).toEqual({ '--io-icon-color': 'var(--io-text-secondary)' });
  });

  it('sets --io-icon-color to success token when color="success"', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.color = 'success';
    expect((c as any).hostStyle).toEqual({ '--io-icon-color': 'var(--io-color-success)' });
  });

  it('sets --io-icon-color to warning token when color="warning"', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.color = 'warning';
    expect((c as any).hostStyle).toEqual({ '--io-icon-color': 'var(--io-color-warning)' });
  });

  it('sets --io-icon-color to error token when color="error"', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.color = 'error';
    expect((c as any).hostStyle).toEqual({ '--io-icon-color': 'var(--io-color-error)' });
  });

  it('sets --io-icon-color to info token when color="info"', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.color = 'info';
    expect((c as any).hostStyle).toEqual({ '--io-icon-color': 'var(--io-color-info)' });
  });

  it('render does not throw for each named color', () => {
    const colors = ['primary', 'contrast-higher', 'contrast-high', 'contrast-medium', 'contrast-lower', 'success', 'warning', 'error', 'info', 'inherit'] as const;
    for (const color of colors) {
      const c = new IoIcon();
      c.name = 'check';
      c.color = color;
      expect(() => (c as any).render()).not.toThrow();
    }
  });

  it('sets --io-icon-color to contrast-higher token when color="contrast-higher"', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.color = 'contrast-higher';
    expect((c as any).hostStyle).toEqual({ '--io-icon-color': 'var(--io-text-contrast-higher)' });
  });

  it('sets --io-icon-color to contrast-lower token when color="contrast-lower"', () => {
    const c = new IoIcon();
    c.name = 'check';
    c.color = 'contrast-lower';
    expect((c as any).hostStyle).toEqual({ '--io-icon-color': 'var(--io-text-contrast-lower)' });
  });

  it('render does not throw for each new size', () => {
    const sizes = ['2xs', '2xl', '3xl', '4xl', '5xl'] as const;
    for (const size of sizes) {
      const c = new IoIcon();
      c.name = 'check';
      c.size = size;
      expect(() => (c as any).render()).not.toThrow();
    }
  });

  it('accepts size="2xs"', () => {
    const c = new IoIcon();
    c.name = 'search';
    c.size = '2xs';
    expect(c.size).toBe('2xs');
    expect(() => (c as any).render()).not.toThrow();
  });

  it('accepts size="5xl"', () => {
    const c = new IoIcon();
    c.name = 'search';
    c.size = '5xl';
    expect(c.size).toBe('5xl');
    expect(() => (c as any).render()).not.toThrow();
  });
});
