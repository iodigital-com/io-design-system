import { describe, it, expect, beforeEach } from 'vitest';

import { IoTable } from './io-table';

describe('io-table — default props', () => {
  let component: IoTable;

  beforeEach(() => {
    component = new IoTable();
  });

  it('has empty caption by default', () => {
    expect(component.caption).toBe('');
  });

  it('has captionHidden false by default', () => {
    expect(component.captionHidden).toBe(false);
  });

  it('has sticky false by default', () => {
    expect(component.sticky).toBe(false);
  });

  it('has size md by default', () => {
    expect(component.size).toBe('md');
  });
});

describe('io-table — render', () => {
  let component: IoTable;

  beforeEach(() => {
    component = new IoTable();
  });

  it('renders without throwing', () => {
    expect(() => component.render()).not.toThrow();
  });

  it('renders with caption without throwing', () => {
    component.caption = 'Users';
    expect(() => component.render()).not.toThrow();
  });

  it('renders with captionHidden without throwing', () => {
    component.caption = 'Hidden';
    component.captionHidden = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with sticky prop without throwing', () => {
    component.sticky = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with size sm without throwing', () => {
    component.size = 'sm';
    expect(() => component.render()).not.toThrow();
  });

  it('renders with size lg without throwing', () => {
    component.size = 'lg';
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when captionHidden is false', () => {
    component.caption = 'Users';
    component.captionHidden = false;
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-table — componentWillLoad', () => {
  it('warns when caption is empty', () => {
    const component = new IoTable();
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.componentWillLoad();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('does not warn when caption is provided', () => {
    const component = new IoTable();
    component.caption = 'Team members';
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
