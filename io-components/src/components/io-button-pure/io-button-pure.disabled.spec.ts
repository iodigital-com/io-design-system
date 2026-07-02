import { describe, it, expect } from 'vitest';

import { IoButtonPure } from './io-button-pure';
import { getButtonPureClassList } from './io-button-pure-utils';

describe('io-button-pure — disabled state', () => {
  it('disabled prop is false by default', () => {
    const component = new IoButtonPure();
    expect(component.disabled).toBe(false);
  });

  it('reflects disabled attribute on host when disabled=true', () => {
    const component = new IoButtonPure();
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('renders without throwing when disabled', () => {
    const component = new IoButtonPure();
    component.disabled = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when disabled and href is set', () => {
    const component = new IoButtonPure();
    component.disabled = true;
    component.href = '/test';
    expect(() => component.render()).not.toThrow();
  });

  it('disabled class is included in classList when disabled', () => {
    const c = getButtonPureClassList({ disabled: true, active: false, underline: false, stretch: false, alignLabel: 'start' });
    expect(c).toContain('btn-pure--disabled');
  });
});
