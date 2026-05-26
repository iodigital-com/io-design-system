import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoCheckboxGroup } from './io-checkbox-group';

function makeCheckbox(value: string): HTMLElement & { value: string; checked: boolean; name: string; disabled: boolean } {
  return Object.assign(document.createElement('io-checkbox'), { value, checked: false, name: '', disabled: false });
}

describe('io-checkbox-group — disabled state', () => {
  let component: IoCheckboxGroup;
  let host: HTMLElement;

  beforeEach(() => {
    component = new IoCheckboxGroup();
    host = document.createElement('io-checkbox-group');
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'opts';
    component.disabled = false;
  });

  it('propagates disabled=true to all slotted io-checkbox children', () => {
    // Arrange
    const cb1 = makeCheckbox('a');
    const cb2 = makeCheckbox('b');
    host.appendChild(cb1);
    host.appendChild(cb2);
    component.disabled = true;

    // Act
    (component as any).syncChildren();

    // Assert
    expect(cb1.disabled).toBe(true);
    expect(cb2.disabled).toBe(true);
  });

  it('does not force-disable children when group is enabled', () => {
    // Arrange
    const cb = makeCheckbox('x');
    host.appendChild(cb);
    component.disabled = false;

    // Act
    (component as any).syncChildren();

    // Assert — children retain their own disabled state (not overridden to true)
    expect(cb.disabled).toBe(false);
  });

  it('propagates disabled to newly added children after a re-sync', () => {
    // Arrange — group disabled from the start
    component.disabled = true;
    const cb1 = makeCheckbox('first');
    host.appendChild(cb1);
    (component as any).syncChildren();

    // Act — add a second child and re-sync (simulates slotchange)
    const cb2 = makeCheckbox('second');
    host.appendChild(cb2);
    (component as any).syncChildren();

    // Assert
    expect(cb1.disabled).toBe(true);
    expect(cb2.disabled).toBe(true);
  });

  it('does not throw when disabled is toggled with no children present', () => {
    // Arrange
    component.disabled = true;

    // Act & Assert
    expect(() => (component as any).syncChildren()).not.toThrow();
  });

  it('propagates disabled to all children when there are multiple', () => {
    // Arrange
    const checkboxes = ['email', 'sms', 'push', 'slack'].map(makeCheckbox);
    checkboxes.forEach((cb) => host.appendChild(cb));
    component.disabled = true;

    // Act
    (component as any).syncChildren();

    // Assert — every child is disabled
    expect(checkboxes.every((cb) => cb.disabled)).toBe(true);
  });
});
