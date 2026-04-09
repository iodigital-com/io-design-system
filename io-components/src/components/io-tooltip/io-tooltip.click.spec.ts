import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoTooltip } from './io-tooltip';

describe('io-tooltip — click behavior (N/A: no click contract)', () => {
  let component: IoTooltip;

  beforeEach(() => {
    component = new IoTooltip();
    (component as any).el = document.createElement('io-tooltip');
    (component as any).tooltipEl = document.createElement('div');
    (component as any).componentWillLoad();
  });

  it('does not expose click handlers or click events', () => {
    const methodNames = Object.getOwnPropertyNames(IoTooltip.prototype);

    expect(methodNames).not.toContain('handleClick');
    expect((component as any).click).toBeUndefined();
  });

  it('shows tooltip through hover/focus handlers', async () => {
    const updatePositionSpy = vi
      .spyOn(component as any, 'updatePosition')
      .mockResolvedValue(undefined);

    await (component as any).handleMouseEnter();
    expect(updatePositionSpy).toHaveBeenCalledTimes(1);
    expect((component as any).visible).toBe(true);
  });
});
