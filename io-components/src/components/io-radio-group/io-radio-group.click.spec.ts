import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoRadioGroup } from './io-radio-group';

function makeRadio(value: string): HTMLElement & { value: string; checked: boolean; name: string; disabled: boolean } {
  return Object.assign(document.createElement('io-radio'), { value, checked: false, name: '', disabled: false });
}

function makeChangeEvent(target: HTMLElement & { value?: string }): Event {
  const ev = new Event('change', { bubbles: true });
  Object.defineProperty(ev, 'target', { value: target });
  return ev;
}

describe('io-radio-group — click / change event handling', () => {
  let component: IoRadioGroup;
  let emitMock: ReturnType<typeof vi.fn>;
  let host: HTMLElement;

  beforeEach(() => {
    component = new IoRadioGroup();
    host = document.createElement('io-radio-group');
    (component as any).el = host;
    emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    component.name = 'contact';
    component.value = '';
    component.disabled = false;
  });

  it('emits change with the selected value when a radio is selected', () => {
    // Arrange
    const radio = makeRadio('email');
    host.appendChild(radio);

    // Act
    const ev = makeChangeEvent(Object.assign(document.createElement('io-radio'), { value: 'email' }));
    (component as any).handleRadioChange(ev);

    // Assert
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ value: 'email' });
  });

  it('updates the group value to the selected radio value', () => {
    // Arrange
    const radio = makeRadio('phone');
    host.appendChild(radio);

    // Act
    const ev = makeChangeEvent(Object.assign(document.createElement('io-radio'), { value: 'phone' }));
    (component as any).handleRadioChange(ev);

    // Assert
    expect(component.value).toBe('phone');
  });

  it('does not emit change when event target is not an io-radio', () => {
    // Arrange
    const inputEl = document.createElement('input');
    const ev = makeChangeEvent(inputEl);

    // Act
    (component as any).handleRadioChange(ev);

    // Assert
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('emits change when selection moves from one radio to another', () => {
    // Arrange
    const radio1 = makeRadio('email');
    const radio2 = makeRadio('sms');
    host.appendChild(radio1);
    host.appendChild(radio2);
    component.value = 'email';

    // Act — select sms
    const ev = makeChangeEvent(Object.assign(document.createElement('io-radio'), { value: 'sms' }));
    (component as any).handleRadioChange(ev);

    // Assert
    expect(component.value).toBe('sms');
    expect(emitMock).toHaveBeenCalledWith({ value: 'sms' });
  });

  it('emits once per change event', () => {
    // Arrange
    const ev1 = makeChangeEvent(Object.assign(document.createElement('io-radio'), { value: 'a' }));
    const ev2 = makeChangeEvent(Object.assign(document.createElement('io-radio'), { value: 'b' }));

    // Act
    (component as any).handleRadioChange(ev1);
    (component as any).handleRadioChange(ev2);

    // Assert
    expect(emitMock).toHaveBeenCalledTimes(2);
    expect(emitMock).toHaveBeenNthCalledWith(1, { value: 'a' });
    expect(emitMock).toHaveBeenNthCalledWith(2, { value: 'b' });
  });

  it('handles a radio with no value by emitting an empty string', () => {
    // Arrange
    const radioEl = document.createElement('io-radio') as HTMLElement & { value?: string };
    // value is intentionally undefined to test fallback
    const ev = makeChangeEvent(radioEl);

    // Act
    (component as any).handleRadioChange(ev);

    // Assert
    expect(emitMock).toHaveBeenCalledWith({ value: '' });
    expect(component.value).toBe('');
  });
});
