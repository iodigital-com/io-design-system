import { describe, it, expect, beforeEach } from 'vitest';
import { IoTooltip } from './io-tooltip';

describe('io-tooltip — disabled behavior (N/A: no disabled state)', () => {
  let component: IoTooltip;

  beforeEach(() => {
    component = new IoTooltip();
    (component as any).el = document.createElement('io-tooltip');
    (component as any).tooltipEl = document.createElement('div');
    (component as any).componentWillLoad();
  });

  it('does not expose a disabled prop', () => {
    expect('disabled' in (component as any)).toBe(false);
  });

  it('keeps hide behavior tied to pointer and focus out', () => {
    (component as any).visible = true;
    (component as any).handleMouseLeave();
    expect((component as any).visible).toBe(false);

    (component as any).visible = true;
    (component as any).handleFocusOut();
    expect((component as any).visible).toBe(false);
  });
});
