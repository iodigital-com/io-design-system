/**
 * io-pin-code — disabled state tests
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoPinCode } from './io-pin-code';

describe('io-pin-code — disabled', () => {
  let component: IoPinCode;

  beforeEach(() => {
    component = new IoPinCode();
    (component as any).el = document.createElement('io-pin-code');
    (component as any).change = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('reflects disabled prop when set to true', () => {
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('does not update digit when disabled on handleKeydown', () => {
    component.disabled = true;
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = new KeyboardEvent('keydown', { key: '3', cancelable: true });
    (component as any).handleKeydown(ev, 0);

    expect((component as any).digits[0]).toBe('');
  });

  it('does not emit change event when disabled on handleInput', () => {
    component.disabled = true;
    const emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const input = document.createElement('input');
    input.value = '5';
    const ev = new InputEvent('input');
    Object.defineProperty(ev, 'target', { value: input });
    (component as any).handleInput(ev, 0);

    expect(emitMock).not.toHaveBeenCalled();
  });

  it('does not distribute paste when disabled', () => {
    component.disabled = true;
    const emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const clipboardData = { getData: vi.fn().mockReturnValue('1234') };
    const ev = new Event('paste', { cancelable: true });
    Object.defineProperty(ev, 'clipboardData', { value: clipboardData });
    (component as any).handlePaste(ev, 0);

    expect((component as any).digits).toEqual(['', '', '', '']);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('reflects error state prop', () => {
    component.state = 'error';
    expect(component.state).toBe('error');
  });

  it('reflects success state prop', () => {
    component.state = 'success';
    expect(component.state).toBe('success');
  });

  it('reflects warning state prop', () => {
    component.state = 'warning';
    expect(component.state).toBe('warning');
  });
});
