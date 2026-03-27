import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoTooltip } from './io-tooltip';

describe('io-tooltip — default props', () => {
  let component: IoTooltip;

  beforeEach(() => {
    component = new IoTooltip();
    (component as any).el = document.createElement('io-tooltip');
    (component as any).componentWillLoad();
  });

  it('content defaults to empty string', () => {
    expect(component.content).toBe('');
  });

  it('placement defaults to top', () => {
    expect(component.placement).toBe('top');
  });

  it('is not visible by default', () => {
    expect((component as any).visible).toBe(false);
  });

  it('generates a stable tooltipId in componentWillLoad', () => {
    const id = (component as any).tooltipId as string;
    expect(id).toMatch(/^io-tooltip-/);
  });
});

describe('io-tooltip — visibility', () => {
  let component: IoTooltip;

  beforeEach(() => {
    component = new IoTooltip();
    (component as any).el = document.createElement('io-tooltip');
    (component as any).tooltipEl = document.createElement('div');
    (component as any).componentWillLoad();
  });

  it('handleMouseLeave sets visible to false', () => {
    (component as any).visible = true;
    (component as any).handleMouseLeave();
    expect((component as any).visible).toBe(false);
  });

  it('handleFocusOut sets visible to false', () => {
    (component as any).visible = true;
    (component as any).handleFocusOut();
    expect((component as any).visible).toBe(false);
  });
});

describe('io-tooltip — aria-describedby injection', () => {
  it('injects aria-describedby on the first slotted child in componentDidLoad', () => {
    const component = new IoTooltip();
    const host = document.createElement('io-tooltip');
    const trigger = document.createElement('button');
    host.appendChild(trigger);
    (component as any).el = host;
    (component as any).componentWillLoad();
    const tooltipId = (component as any).tooltipId as string;
    (component as any).componentDidLoad();
    expect(trigger.getAttribute('aria-describedby')).toBe(tooltipId);
  });
});
