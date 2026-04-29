import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoTooltip } from './io-tooltip';

describe('io-tooltip — default props', () => {
  let component: IoTooltip;
  let host: HTMLElement;
  let trigger: HTMLButtonElement;

  beforeEach(() => {
    component = new IoTooltip();
    host = document.createElement('io-tooltip');
    trigger = document.createElement('button');
    host.appendChild(trigger);
    (component as any).el = host;
  });

  it('content defaults to empty string', () => {
    expect(component.content).toBe('');
  });

  it('placement defaults to top', () => {
    expect(component.placement).toBe('top');
  });

  it('maps props to trigger attributes on load', () => {
    component.content = 'Hello';
    component.placement = 'bottom';
    component.componentDidLoad();

    expect(trigger.getAttribute('io-tooltip')).toBe('Hello');
    expect(trigger.getAttribute('io-tooltip-placement')).toBe('bottom');
  });
});

describe('io-tooltip — wrapper syncing', () => {
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

  it('updates io-tooltip when content changes', () => {
    component.content = 'Updated';
    (component as any).onContentChange();

    expect(trigger.getAttribute('io-tooltip')).toBe('Updated');
  });

  it('updates io-tooltip-placement when placement changes', () => {
    component.placement = 'left';
    (component as any).onPlacementChange();

    expect(trigger.getAttribute('io-tooltip-placement')).toBe('left');
  });

  it('removes mapped attributes on disconnect', () => {
    component.content = 'Bye';
    component.placement = 'right';
    component.componentDidLoad();
    component.disconnectedCallback();

    expect(trigger.hasAttribute('io-tooltip')).toBe(false);
    expect(trigger.hasAttribute('io-tooltip-placement')).toBe(false);
  });

  it('restores pre-existing trigger tooltip attributes on disconnect', () => {
    const localComponent = new IoTooltip();
    const localHost = document.createElement('io-tooltip');
    const localTrigger = document.createElement('button');
    localTrigger.setAttribute('io-tooltip', 'Original tooltip');
    localTrigger.setAttribute('io-tooltip-placement', 'right');
    localHost.appendChild(localTrigger);
    (localComponent as any).el = localHost;

    localComponent.content = 'Mapped tooltip';
    localComponent.placement = 'left';
    localComponent.componentDidLoad();

    expect(localTrigger.getAttribute('io-tooltip')).toBe('Mapped tooltip');
    expect(localTrigger.getAttribute('io-tooltip-placement')).toBe('left');

    localComponent.disconnectedCallback();

    expect(localTrigger.getAttribute('io-tooltip')).toBe('Original tooltip');
    expect(localTrigger.getAttribute('io-tooltip-placement')).toBe('right');
  });
});
