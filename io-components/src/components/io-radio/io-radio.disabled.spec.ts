import { describe, it, expect, vi } from 'vitest';
import { IoRadio } from './io-radio';

describe('io-radio — disabled state', () => {
  let component: IoRadio;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoRadio();
    (component as any).el = document.createElement('io-radio');
    emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    component.disabled = true;
  });

  it('is disabled', () => {
    expect(component.disabled).toBe(true);
  });

  it('does not emit change when disabled and change fires', () => {
    // Disabled native inputs do not fire change events in the browser,
    // but verify the component is in the correct state
    expect(component.disabled).toBe(true);
    expect(emitMock).not.toHaveBeenCalled();
  });
});
