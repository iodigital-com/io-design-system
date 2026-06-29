import '../mocks/match-media.mock';
import { expect, beforeEach } from 'vitest';
import { toHaveNoViolations } from 'vitest-axe/matchers';

// Extend Vitest's expect with axe accessibility matchers.
// After this, all test files can use expect(results).toHaveNoViolations()
// without per-file imports.
expect.extend({ toHaveNoViolations });

// ── Motion override for deterministic specs ──────────────────────────────
// Collapse all transition and animation durations to 0s before each test.
// This prevents timing-based flakiness in specs that interact with overlays
// (modal, drawer, sheet, toast, popover) without needing real CSS animations.
// Components use var(--io-transition-duration, var(--io-duration-*)) and
// var(--io-animation-duration, var(--io-duration-*)) via getTransition() /
// getAnimation() helpers, so this single override collapses everything.
// See: docs/public-css-api.json — --io-transition-duration, --io-animation-duration
beforeEach(() => {
  document.documentElement.style.setProperty('--io-transition-duration', '0s');
  document.documentElement.style.setProperty('--io-animation-duration', '0s');
});
