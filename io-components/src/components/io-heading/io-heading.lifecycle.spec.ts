import { describe, it, expect, vi, afterEach } from 'vitest';

import { IoHeading } from './io-heading';

describe('io-heading — componentWillLoad / resolveTag', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    errorSpy?.mockRestore();
  });

  it('logs console.error when tag prop is undefined', () => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const c = new IoHeading();
    // tag is undefined by default (no prop assignment)
    (c as any).componentWillLoad();

    expect(errorSpy).toHaveBeenCalledOnce();
    expect(errorSpy.mock.calls[0][0]).toContain('[io-heading]');
    expect(errorSpy.mock.calls[0][0]).toContain('`tag` prop is required');
  });

  it('does not log console.error when tag prop is set', () => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const c = new IoHeading();
    c.tag = 'h1';
    (c as any).componentWillLoad();

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('resolveTag returns "h2" when tag is undefined', () => {
    const c = new IoHeading();
    // tag not assigned — should be undefined
    const result = (c as any).resolveTag();
    expect(result).toBe('h2');
  });

  it('resolveTag returns the assigned tag when tag is defined', () => {
    const c = new IoHeading();
    c.tag = 'h3';
    expect((c as any).resolveTag()).toBe('h3');
  });

  it('resolveTag returns every valid heading tag correctly', () => {
    const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
    for (const tag of validTags) {
      const c = new IoHeading();
      c.tag = tag;
      expect((c as any).resolveTag()).toBe(tag);
    }
  });
});

describe('io-heading — resolveColor', () => {
  it('returns "inherit" when color is "inherit"', () => {
    const c = new IoHeading();
    c.color = 'inherit';
    expect((c as any).resolveColor()).toBe('inherit');
  });

  it('returns a CSS token string for a non-inherit color', () => {
    const c = new IoHeading();
    c.color = 'primary';
    expect((c as any).resolveColor()).toBe('var(--io-text-primary)');
  });

  it('returns correct token for secondary color', () => {
    const c = new IoHeading();
    c.color = 'secondary';
    expect((c as any).resolveColor()).toBe('var(--io-text-secondary)');
  });
});
