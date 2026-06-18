/**
 * io-popover — disabled state: N/A marker
 *
 * io-popover intentionally has no `disabled` prop. The component uses the `open`
 * boolean prop (toggled via internal click and keyboard handlers) to control
 * visibility. Disabling a popover is not a meaningful concept — consumers should
 * simply not render or not wire up the trigger element instead.
 *
 * This file exists so future disabled-state audits can confirm the omission is
 * deliberate and skip this component accordingly.
 */

import { describe, it } from 'vitest';

describe('io-popover — disabled state', () => {
  it('has no disabled prop (by design)', () => {
    // io-popover uses open/close state, not a disabled prop.
    // No implementation needed here — this spec is an explicit N/A marker.
  });
});
