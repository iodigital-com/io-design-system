import { describe, it, expect, beforeEach } from 'vitest';

import { IoTooltip } from './io-tooltip';

describe('io-tooltip — disabled behavior (N/A: no disabled state)', () => {
  let component: IoTooltip;
  let host: HTMLElement;
  let trigger: HTMLButtonElement;

  beforeEach(() => {
    component = new IoTooltip();
    host = document.createElement('io-tooltip');
    trigger = document.createElement('button');
    host.appendChild(trigger);
    (component as any).el = host;
    component.componentDidLoad();
  });

  it('does not expose a disabled prop', () => {
    expect('disabled' in (component as any)).toBe(false);
  });

  it('keeps wrapper non-interactive and only maps attributes', () => {
    expect(trigger.hasAttribute('io-tooltip')).toBe(true);
    expect(trigger.hasAttribute('io-tooltip-placement')).toBe(true);
  });
});
