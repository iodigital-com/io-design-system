/**
 * io-breadcrumb-utils.spec.ts
 *
 * The JSON-parsing utilities (parseItems, getVisibleItems) were removed in Wave XI
 * when io-breadcrumb migrated from a JSON string prop API to a declarative
 * slot-based sub-component API (io-breadcrumb-item).
 *
 * Tests for the new API are in:
 *   - io-breadcrumb.spec.ts
 *   - io-breadcrumb.a11y.spec.ts
 *   - io-breadcrumb-item/io-breadcrumb-item.spec.ts
 *   - io-breadcrumb-item/io-breadcrumb-item.a11y.spec.ts
 */
import { describe, it } from 'vitest';

describe('io-breadcrumb-utils', () => {
  it('no utilities required — slot-based API has no parsing logic', () => {
    // The JSON string prop API and its utilities were removed in Wave XI (#320).
    // Separator insertion and current-page inference are handled directly
    // in the slotchange handler of IoBreadcrumb (see io-breadcrumb.tsx).
  });
});
