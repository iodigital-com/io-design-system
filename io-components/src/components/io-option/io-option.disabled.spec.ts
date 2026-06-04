import { describe, it, expect, beforeEach, vi } from 'vitest';
import { IoOption } from './io-option';

describe('io-option — disabled state', () => {
  let component: IoOption;

  beforeEach(() => {
    component = new IoOption();
    component.value = 'bob';
    component.label = 'Bob Jones';
    (component as any).optionSelect = { emit: vi.fn() };
  });

  it('disabled is false by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('disabled suppresses emission', () => {
    component.disabled = true;
    (component as any).handleClick();
    expect((component as any).optionSelect.emit).not.toHaveBeenCalled();
  });

  it('selected reflects on the component', () => {
    component.selected = true;
    expect(component.selected).toBe(true);
  });
});
