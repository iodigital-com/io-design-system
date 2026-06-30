import { describe, it, expect, beforeEach } from 'vitest';

import { IoTooltip } from './io-tooltip';
import { getTooltipStyles } from './io-tooltip-styles';

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

  it('theme defaults to dark', () => {
    expect(component.theme).toBe('dark');
  });

  it('maps props to trigger attributes on load', () => {
    component.content = 'Hello';
    component.placement = 'bottom';
    component.componentDidLoad();

    expect(trigger.getAttribute('io-tooltip')).toBe('Hello');
    expect(trigger.getAttribute('io-tooltip-placement')).toBe('bottom');
  });

  it('does not set io-tooltip-theme for dark theme (default)', () => {
    component.content = 'Hello';
    component.theme = 'dark';
    component.componentDidLoad();

    expect(trigger.hasAttribute('io-tooltip-theme')).toBe(false);
  });

  it('sets io-tooltip-theme="light" on trigger for light theme', () => {
    component.content = 'Hello';
    component.theme = 'light';
    component.componentDidLoad();

    expect(trigger.getAttribute('io-tooltip-theme')).toBe('light');
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

/**
 * MIGRATION STUB TESTS — io-tooltip uses shadow: false; getTooltipStyles() is not applied
 * in production. These tests validate the token contracts of the migration stub in
 * io-tooltip-styles.ts so that if/when io-tooltip migrates to shadow DOM, the contract
 * is already verified. See the comment in io-tooltip-styles.ts for full context.
 *
 * Actual overlay styles live in app.css (.io-tooltip-overlay selector).
 */
describe('io-tooltip — overlay transition contract (migration stub)', () => {
  it('fade transition uses --io-motion-overlay-fade semantic token', () => {
    const styles: string = getTooltipStyles();
    expect(styles).toContain('--io-motion-overlay-fade');
  });

  it('prefers-reduced-motion guard disables transition', () => {
    const styles: string = getTooltipStyles();
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    const rmIdx = styles.indexOf('@media (prefers-reduced-motion: reduce)');
    expect(styles.slice(rmIdx)).toContain('transition: none');
  });

  it('does not set pointer-events: none — tooltip panel must be hoverable (WCAG 1.4.13)', () => {
    const styles: string = getTooltipStyles();
    expect(styles).not.toContain('pointer-events: none');
  });

  it('uses --io-tooltip-max-width token for max-width', () => {
    const styles: string = getTooltipStyles();
    expect(styles).toContain('--io-tooltip-max-width');
  });

  it('uses --io-tooltip-bg token for background', () => {
    const styles: string = getTooltipStyles();
    expect(styles).toContain('--io-tooltip-bg');
  });

  it('uses --io-tooltip-color token for text color', () => {
    const styles: string = getTooltipStyles();
    expect(styles).toContain('--io-tooltip-color');
  });

  it('has light theme variant class', () => {
    const styles: string = getTooltipStyles();
    expect(styles).toContain('.tooltip--light');
  });
});
