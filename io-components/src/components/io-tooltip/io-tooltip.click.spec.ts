import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoTooltip } from './io-tooltip';

describe('io-tooltip — click behavior (N/A: no click contract)', () => {
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

  it('does not expose click handlers or click events', () => {
    const methodNames = Object.getOwnPropertyNames(IoTooltip.prototype);

    expect(methodNames).not.toContain('handleClick');
    expect((component as any).click).toBeUndefined();
  });

  it('maps click trigger attributes via wrapper sync', async () => {
    component.content = 'Action help';
    (component as any).onContentChange();
    expect(trigger.getAttribute('io-tooltip')).toBe('Action help');
  });
});
