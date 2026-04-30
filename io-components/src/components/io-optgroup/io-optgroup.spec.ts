import { describe, it, expect, beforeEach } from 'vitest';
import { IoOptgroup } from './io-optgroup';
import { getOptgroupClass } from './io-optgroup-utils';

describe('io-optgroup — default props', () => {
  let component: IoOptgroup;

  beforeEach(() => {
    component = new IoOptgroup();
  });

  it('disabled defaults to false', () => {
    expect(component.disabled).toBe(false);
  });
});

describe('io-optgroup-utils — getOptgroupClass', () => {
  it('returns base class when not disabled', () => {
    expect(getOptgroupClass(false)).toBe('optgroup');
  });

  it('adds disabled modifier', () => {
    expect(getOptgroupClass(true)).toContain('optgroup--disabled');
  });
});
