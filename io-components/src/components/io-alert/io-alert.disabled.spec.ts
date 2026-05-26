import { describe, it, expect } from 'vitest';

import { IoAlert } from './io-alert';

/**
 * io-alert has no disabled state.
 *
 * It is a non-interactive notification component — it displays information
 * but does not accept user input and cannot be focused or activated. There
 * is therefore no concept of "disabled" for this component.
 *
 * The dismiss button (when dismissible=true) is always enabled; hiding the
 * alert entirely is the responsibility of the consuming application.
 */
describe('io-alert — disabled state (not applicable)', () => {
  it('renders as passive notification without a disabled prop', () => {
    const component = new IoAlert() as any;
    expect(component.disabled).toBeUndefined();
  });

  it('renders without throwing across all variants', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const;

    for (const variant of variants) {
      const component = new IoAlert();
      component.variant = variant;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('does not expose disabled-state event handlers', () => {
    const component = new IoAlert() as any;
    expect(component.handleDisable).toBeUndefined();
    expect(component.handleEnable).toBeUndefined();
  });
});
