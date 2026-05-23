import { beforeEach, describe, it, expect } from 'vitest';

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
    expect((c as any).imgError).toBe(false);
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
