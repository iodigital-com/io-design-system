import { describe, it, expect, beforeEach } from 'vitest';

import { IoFormField } from './io-form-field';

describe('io-form-field — default props', () => {
  let component: IoFormField;

  beforeEach(() => {
    component = new IoFormField();
    (component as any).el = document.createElement('io-form-field');
  });

  it('has empty helperText by default', () => {
    expect(component.helperText).toBe('');
  });

  it('has empty errorText by default', () => {
    expect(component.errorText).toBe('');
  });

  it('is not invalid by default', () => {
    expect(component.invalid).toBe(false);
  });

  it('is not required by default', () => {
    expect(component.required).toBe(false);
  });

  it('generates unique IDs in componentWillLoad', () => {
    const a = new IoFormField();
    (a as any).componentWillLoad();
    const b = new IoFormField();
    (b as any).componentWillLoad();
    expect((a as any).inputId).not.toBe((b as any).inputId);
  });

  it('buildDescribedBy returns helper ID when not invalid and helperText is set', () => {
    component.helperText = 'Some help';
    component.invalid = false;
    (component as any).helperId = 'io-ff-helper-abc';
    (component as any).errorId = 'io-ff-error-abc';
    const result = (component as any).buildDescribedBy();
    expect(result).toBe('io-ff-helper-abc');
  });

  it('buildDescribedBy returns error ID when invalid and errorText is set', () => {
    component.errorText = 'Something went wrong';
    component.invalid = true;
    (component as any).helperId = 'io-ff-helper-abc';
    (component as any).errorId = 'io-ff-error-abc';
    const result = (component as any).buildDescribedBy();
    expect(result).toBe('io-ff-error-abc');
  });

  it('buildDescribedBy returns empty string when no text is set', () => {
    component.helperText = '';
    component.errorText = '';
    component.invalid = false;
    (component as any).helperId = 'io-ff-helper-abc';
    (component as any).errorId = 'io-ff-error-abc';
    const result = (component as any).buildDescribedBy();
    expect(result).toBe('');
  });
});

describe('io-form-field — syncChildAttributes', () => {
  it('sets aria-invalid on slotted child when invalid is true', () => {
    const component = new IoFormField();
    const host = document.createElement('io-form-field');
    const child = document.createElement('io-input');
    host.appendChild(child);
    (component as any).el = host;
    (component as any).inputId = 'test-id';
    (component as any).helperId = 'test-helper';
    (component as any).errorId = 'test-error';
    component.invalid = true;
    component.errorText = 'Error occurred';
    component.helperText = '';

    (component as any).syncChildAttributes();

    expect(child.getAttribute('aria-invalid')).toBe('true');
    expect(child.getAttribute('id')).toBe('test-id');
    expect(child.getAttribute('aria-describedby')).toBe('test-error');
  });

  it('removes aria-invalid when invalid is false', () => {
    const component = new IoFormField();
    const host = document.createElement('io-form-field');
    const child = document.createElement('io-input');
    child.setAttribute('aria-invalid', 'true');
    host.appendChild(child);
    (component as any).el = host;
    (component as any).inputId = 'test-id';
    (component as any).helperId = 'test-helper';
    (component as any).errorId = 'test-error';
    component.invalid = false;
    component.helperText = '';
    component.errorText = '';

    (component as any).syncChildAttributes();

    expect(child.getAttribute('aria-invalid')).toBeNull();
  });

  it('sets aria-describedby to helper ID when not invalid', () => {
    const component = new IoFormField();
    const host = document.createElement('io-form-field');
    const child = document.createElement('io-input');
    host.appendChild(child);
    (component as any).el = host;
    (component as any).inputId = 'test-id';
    (component as any).helperId = 'test-helper';
    (component as any).errorId = 'test-error';
    component.invalid = false;
    component.helperText = 'Helpful hint';
    component.errorText = '';

    (component as any).syncChildAttributes();

    expect(child.getAttribute('aria-describedby')).toBe('test-helper');
  });

  it('does nothing when no child is found', () => {
    const component = new IoFormField();
    const host = document.createElement('io-form-field');
    (component as any).el = host;
    (component as any).inputId = 'test-id';

    expect(() => (component as any).syncChildAttributes()).not.toThrow();
  });
});
