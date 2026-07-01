import { describe, it, expect, beforeEach } from 'vitest';
import { isParentGroupRequired } from './is-parent-group-required';

describe('isParentGroupRequired', () => {
  let host: HTMLElement;

  beforeEach(() => {
    host = document.createElement('io-checkbox');
  });

  it('returns false when there is no parent', () => {
    expect(isParentGroupRequired(host)).toBe(false);
  });

  it('returns false when parent is not a group element', () => {
    const div = document.createElement('div');
    div.appendChild(host);
    expect(isParentGroupRequired(host)).toBe(false);
  });

  it('returns false when parent is io-checkbox-group but not required', () => {
    const group = document.createElement('io-checkbox-group');
    group.appendChild(host);
    expect(isParentGroupRequired(host)).toBe(false);
  });

  it('returns false when parent is io-radio-group but not required', () => {
    const radio = document.createElement('io-radio');
    const group = document.createElement('io-radio-group');
    group.appendChild(radio);
    expect(isParentGroupRequired(radio)).toBe(false);
  });

  it('returns true when parent is io-checkbox-group with required attribute', () => {
    const group = document.createElement('io-checkbox-group');
    group.setAttribute('required', '');
    group.appendChild(host);
    expect(isParentGroupRequired(host)).toBe(true);
  });

  it('returns true when parent is io-radio-group with required attribute', () => {
    const radio = document.createElement('io-radio');
    const group = document.createElement('io-radio-group');
    group.setAttribute('required', '');
    group.appendChild(radio);
    expect(isParentGroupRequired(radio)).toBe(true);
  });

  it('returns true when parent io-checkbox-group has required property set to true', () => {
    const group = document.createElement('io-checkbox-group');
    (group as HTMLElement & { required: boolean }).required = true;
    group.appendChild(host);
    expect(isParentGroupRequired(host)).toBe(true);
  });

  it('returns false when deeply nested (not direct child of group)', () => {
    const group = document.createElement('io-checkbox-group');
    group.setAttribute('required', '');
    const wrapper = document.createElement('div');
    wrapper.appendChild(host);
    group.appendChild(wrapper);
    expect(isParentGroupRequired(host)).toBe(false);
  });
});
