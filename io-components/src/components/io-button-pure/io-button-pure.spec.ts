import { describe, it, expect } from 'vitest';

import { IoButtonPure } from './io-button-pure';
import { getButtonPureClassList } from './io-button-pure-utils';

describe('io-button-pure — default props and render contract', () => {
  it('has false as the default disabled value', () => {
    const component = new IoButtonPure();
    expect(component.disabled).toBe(false);
  });

  it('has false as the default underline value', () => {
    const component = new IoButtonPure();
    expect(component.underline).toBe(false);
  });

  it('has false as the default active value', () => {
    const component = new IoButtonPure();
    expect(component.active).toBe(false);
  });

  it('has false as the default stretch value', () => {
    const component = new IoButtonPure();
    expect(component.stretch).toBe(false);
  });

  it('has start as the default alignLabel value', () => {
    const component = new IoButtonPure();
    expect(component.alignLabel).toBe('start');
  });

  it('has button as the default type', () => {
    const component = new IoButtonPure();
    expect(component.type).toBe('button');
  });

  it('renders without throwing with defaults', () => {
    const component = new IoButtonPure();
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when disabled', () => {
    const component = new IoButtonPure();
    component.disabled = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when href is set', () => {
    const component = new IoButtonPure();
    component.href = '/pricing';
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing with all modifiers', () => {
    const component = new IoButtonPure();
    component.active = true;
    component.underline = true;
    component.stretch = true;
    component.alignLabel = 'end';
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-button-pure — utils', () => {
  it('base class is always present', () => {
    const c = getButtonPureClassList({ disabled: false, active: false, underline: false, stretch: false, alignLabel: 'start' });
    expect(c).toContain('btn-pure');
  });

  it('disabled adds disabled class', () => {
    const c = getButtonPureClassList({ disabled: true, active: false, underline: false, stretch: false, alignLabel: 'start' });
    expect(c).toContain('btn-pure--disabled');
  });

  it('active adds active class', () => {
    const c = getButtonPureClassList({ disabled: false, active: true, underline: false, stretch: false, alignLabel: 'start' });
    expect(c).toContain('btn-pure--active');
  });

  it('underline adds underline class', () => {
    const c = getButtonPureClassList({ disabled: false, active: false, underline: true, stretch: false, alignLabel: 'start' });
    expect(c).toContain('btn-pure--underline');
  });

  it('stretch adds stretch class', () => {
    const c = getButtonPureClassList({ disabled: false, active: false, underline: false, stretch: true, alignLabel: 'start' });
    expect(c).toContain('btn-pure--stretch');
  });

  it('alignLabel adds align class', () => {
    const start = getButtonPureClassList({ disabled: false, active: false, underline: false, stretch: false, alignLabel: 'start' });
    expect(start).toContain('btn-pure--align-start');

    const end = getButtonPureClassList({ disabled: false, active: false, underline: false, stretch: false, alignLabel: 'end' });
    expect(end).toContain('btn-pure--align-end');
  });
});
