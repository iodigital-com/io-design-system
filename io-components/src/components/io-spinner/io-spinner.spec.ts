import { describe, it, expect } from 'vitest';
import { IoSpinner } from './io-spinner';

describe('io-spinner — default props', () => {
  let component: IoSpinner;

  beforeEach(() => {
    component = new IoSpinner();
  });

  it('has md size by default', () => {
    expect(component.size).toBe('md');
  });

  it('has primary color by default', () => {
    expect(component.color).toBe('primary');
  });

  it('has "Loading" label by default', () => {
    expect(component.label).toBe('Loading');
  });
});
