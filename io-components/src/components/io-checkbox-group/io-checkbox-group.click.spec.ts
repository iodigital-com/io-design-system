import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoCheckboxGroup } from './io-checkbox-group';

function makeCheckbox(value: string, checked = false): HTMLElement & { value: string; checked: boolean; name: string; disabled: boolean } {
  return Object.assign(document.createElement('io-checkbox'), { value, checked, name: '', disabled: false });
}

function makeChangeEvent(target: HTMLElement): Event {
  const ev = new Event('change', { bubbles: true });
  Object.defineProperty(ev, 'target', { value: target });
  return ev;
}

describe('io-checkbox-group — click / change event handling', () => {
  let component: IoCheckboxGroup;
  let emitMock: ReturnType<typeof vi.fn>;
  let host: HTMLElement;

  beforeEach(() => {
    component = new IoCheckboxGroup();
    host = document.createElement('io-checkbox-group');
    (component as any).el = host;
    emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    component.name = 'notifications';
    component.disabled = false;
  });

  it('emits change with all currently-checked values when a checkbox is checked', () => {
    // Arrange
    const cb1 = makeCheckbox('email', true);
    const cb2 = makeCheckbox('sms', false);
    const cb3 = makeCheckbox('push', true);
    host.appendChild(cb1);
    host.appendChild(cb2);
    host.appendChild(cb3);

    // Act — simulate io-checkbox emitting a change event
    const ev = makeChangeEvent(document.createElement('io-checkbox'));
    (component as any).handleCheckboxChange(ev);

    // Assert
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ checkedValues: ['email', 'push'] });
  });

  it('emits change with an empty array when no checkboxes are checked', () => {
    // Arrange
    const cb1 = makeCheckbox('email', false);
    const cb2 = makeCheckbox('sms', false);
    host.appendChild(cb1);
    host.appendChild(cb2);

    // Act
    const ev = makeChangeEvent(document.createElement('io-checkbox'));
    (component as any).handleCheckboxChange(ev);

    // Assert
    expect(emitMock).toHaveBeenCalledWith({ checkedValues: [] });
  });

  it('does not emit change when the event target is not an io-checkbox', () => {
    // Arrange
    const inputEl = document.createElement('input');
    const ev = makeChangeEvent(inputEl);

    // Act
    (component as any).handleCheckboxChange(ev);

    // Assert
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('emits change reflecting the single newly-checked value', () => {
    // Arrange
    const cb1 = makeCheckbox('alpha', false);
    const cb2 = makeCheckbox('beta', true);
    host.appendChild(cb1);
    host.appendChild(cb2);

    // Act
    const checkboxTarget = document.createElement('io-checkbox');
    const ev = makeChangeEvent(checkboxTarget);
    (component as any).handleCheckboxChange(ev);

    // Assert
    expect(emitMock).toHaveBeenCalledWith({ checkedValues: ['beta'] });
  });

  it('emits once per distinct checkbox change event', () => {
    // Arrange
    const cb = makeCheckbox('x', true);
    host.appendChild(cb);

    // Act — two separate change events
    const ev1 = makeChangeEvent(document.createElement('io-checkbox'));
    const ev2 = makeChangeEvent(document.createElement('io-checkbox'));
    (component as any).handleCheckboxChange(ev1);
    (component as any).handleCheckboxChange(ev2);

    // Assert
    expect(emitMock).toHaveBeenCalledTimes(2);
  });
});
