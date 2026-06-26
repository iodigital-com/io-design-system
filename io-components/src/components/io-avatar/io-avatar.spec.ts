import { beforeEach, describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoAvatar } from './io-avatar';

describe('io-avatar — default props', () => {
  let c: IoAvatar;

  beforeEach(() => {
    c = new IoAvatar();
  });

  it('src is undefined by default', () => {
    expect(c.src).toBeUndefined();
  });

  it('alt is empty string by default', () => {
    expect(c.alt).toBe('');
  });

  it('name is undefined by default', () => {
    expect(c.name).toBeUndefined();
  });

  it('size is md by default', () => {
    expect(c.size).toBe('md');
  });

  it('color is grey by default', () => {
    expect(c.color).toBe('grey');
  });

  it('shape is circle by default', () => {
    expect(c.shape).toBe('circle');
  });

  it('imgError is false by default', () => {
    expect((c as unknown as { imgError: boolean }).imgError).toBe(false);
  });

  it('role is empty string by default', () => {
    expect(c.role).toBe('');
  });

  it('renders without throwing with no props', () => {
    expect(() => c.render()).not.toThrow();
  });

  it('renders without throwing with src', () => {
    c.src = 'https://example.com/avatar.jpg';
    expect(() => c.render()).not.toThrow();
  });

  it('renders without throwing with name', () => {
    c.name = 'Jane Doe';
    expect(() => c.render()).not.toThrow();
  });

  it('renders without throwing with all props set', () => {
    c.src = 'https://example.com/avatar.jpg';
    c.alt = 'Jane Doe';
    c.name = 'Jane Doe';
    c.size = 'xl';
    c.color = 'blue';
    c.shape = 'square';
    expect(() => c.render()).not.toThrow();
  });
});

describe('io-avatar — img loading attribute (#871)', () => {
  it('renders img with loading="lazy" when src is set', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const c = new IoAvatar();
    c.src = 'https://example.com/avatar.jpg';
    c.render();
    const imgCall = hMock.mock.calls.find(([tag, attrs]) => tag === 'img' && (attrs as any)?.loading === 'lazy');
    expect(imgCall).toBeDefined();
  });
});
