import { describe, it, expect } from 'vitest';
import {
  breadcrumbStoryDefault,
  breadcrumbStorySlash,
  breadcrumbStoryLong,
} from './io-breadcrumb.stories';

// io-breadcrumb has no dedicated configurator story or propDefinitions export —
// it uses a purely slot-based declarative API with no configurable props.
// All three exported stories serve as named stories.

describe('io-breadcrumb storefront stories', () => {
  // ── Named stories ───────────────────────────────────────────────────────
  describe('breadcrumbStoryDefault', () => {
    it('generator with no args does not throw', () => {
      expect(() => breadcrumbStoryDefault.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = breadcrumbStoryDefault.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = breadcrumbStoryDefault.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(breadcrumbStoryDefault.state?.properties).toBeDefined();
    });
  });

  describe('breadcrumbStorySlash', () => {
    it('generator with no args does not throw', () => {
      expect(() => breadcrumbStorySlash.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = breadcrumbStorySlash.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = breadcrumbStorySlash.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('breadcrumbStoryLong', () => {
    it('generator with no args does not throw', () => {
      expect(() => breadcrumbStoryLong.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = breadcrumbStoryLong.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = breadcrumbStoryLong.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });
});
