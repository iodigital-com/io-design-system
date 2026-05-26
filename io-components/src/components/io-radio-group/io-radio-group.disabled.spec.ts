import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoRadioGroup } from './io-radio-group';

function makeRadio(value: string): HTMLElement & { value: string; checked: boolean; name: string; disabled: boolean } {
  return Object.assign(document.createElement('io-radio'), { value, checked: false, name: '', disabled: false });
}

describe('io-radio-group — disabled state', () => {
  let component: IoRadioGroup;
  let host: HTMLElement;

  beforeEach(() => {
    component = new IoRadioGroup();
    host = document.createElement('io-radio-group');
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'choice';
    component.value = '';
    component.disabled = false;
  });

  it('propagates disabled=true to all slotted io-radio children', () => {
    // Arrange
    const radio1 = makeRadio('email');
    const radio2 = makeRadio('phone');
    host.appendChild(radio1);
    host.appendChild(radio2);
    component.disabled = true;

    // Act
    (component as any).syncChildren();

    // Assert
    expect(radio1.disabled).toBe(true);
    expect(radio2.disabled).toBe(true);
  });

  it('does not force-disable children when group is enabled', () => {
    // Arrange
    const radio = makeRadio('email');
    host.appendChild(radio);
    component.disabled = false;

    // Act
    (component as any).syncChildren();

    // Assert — child retains its own disabled state (not overridden to true)
    expect(radio.disabled).toBe(false);
  });

  it('propagates disabled to newly added children after a re-sync', () => {
    // Arrange — group disabled from the start
    component.disabled = true;
    const radio1 = makeRadio('first');
    host.appendChild(radio1);
    (component as any).syncChildren();

    // Act — add a second radio and re-sync (simulates slotchange)
    const radio2 = makeRadio('second');
    host.appendChild(radio2);
    (component as any).syncChildren();

    // Assert
    expect(radio1.disabled).toBe(true);
    expect(radio2.disabled).toBe(true);
  });

  it('does not throw when disabled is toggled with no children present', () => {
    // Arrange
    component.disabled = true;

    // Act & Assert
    expect(() => (component as any).syncChildren()).not.toThrow();
  });

  it('propagates disabled to all children when there are multiple options', () => {
    // Arrange
    const radios = ['email', 'sms', 'push', 'slack'].map(makeRadio);
    radios.forEach((r) => host.appendChild(r));
    component.disabled = true;

    // Act
    (component as any).syncChildren();

    // Assert — every child is disabled
    expect(radios.every((r) => r.disabled)).toBe(true);
  });

  it('still sets name and checked state even when disabled', () => {
    // Arrange
    const radio = makeRadio('email');
    host.appendChild(radio);
    component.name = 'contact';
    component.value = 'email';
    component.disabled = true;

    // Act
    (component as any).syncChildren();

    // Assert — name and checked are still synced alongside disabled
    expect(radio.name).toBe('contact');
    expect(radio.checked).toBe(true);
    expect(radio.disabled).toBe(true);
  });
});
