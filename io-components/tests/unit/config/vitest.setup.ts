import '../mocks/match-media.mock';
import { expect } from 'vitest';
import { toHaveNoViolations } from 'vitest-axe/matchers';

// Extend Vitest's expect with axe accessibility matchers.
// After this, all test files can use expect(results).toHaveNoViolations()
// without per-file imports.
expect.extend({ toHaveNoViolations });
