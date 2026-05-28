/**
 * io-breadcrumb-utils.spec.ts
 *
 * The items prop API was removed when the component moved to the declarative slot API.
 * Tests for the current API are in:
 *   - io-breadcrumb.spec.ts / io-breadcrumb-coverage.spec.ts
 *   - io-breadcrumb.a11y.spec.ts
 *   - io-breadcrumb-item/io-breadcrumb-item.spec.ts
 *   - io-breadcrumb-item/io-breadcrumb-item.a11y.spec.ts
 */
import { describe, it } from 'vitest';

describe('io-breadcrumb-utils', () => {
  it('no utilities required — slot-based API has no parsing logic', () => {
    // Separator rendering and current-page inference are handled in
    // io-breadcrumb-item (shadow DOM) and io-breadcrumb (slotchange handler).
  });
});
