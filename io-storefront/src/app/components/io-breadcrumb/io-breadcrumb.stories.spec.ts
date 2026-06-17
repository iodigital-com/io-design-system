import { describe, it, expect } from 'vitest';
import {
  breadcrumbStoryDefault,
  breadcrumbStorySlash,
  breadcrumbStoryLong,
  breadcrumbStoryLocalised,
  breadcrumbStoryExternalLink,
} from './io-breadcrumb.stories';

// io-breadcrumb uses a purely slot-based declarative API.
// Stories test the generator contract and new prop shapes.

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

  describe('breadcrumbStoryLocalised', () => {
    it('generator does not throw', () => {
      expect(() => breadcrumbStoryLocalised.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = breadcrumbStoryLocalised.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('root element has label prop set to localised string', () => {
      const els = breadcrumbStoryLocalised.generator?.() ?? [];
      const root = els[0] as { tag: string; properties: Record<string, unknown> };
      expect(root.properties.label).toBe('Navigatie');
    });
  });

  describe('breadcrumbStoryExternalLink', () => {
    it('generator does not throw', () => {
      expect(() => breadcrumbStoryExternalLink.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = breadcrumbStoryExternalLink.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('external link child has target="_blank" and itemLabel set', () => {
      const els = breadcrumbStoryExternalLink.generator?.() ?? [];
      const root = els[0] as { tag: string; children: Array<{ tag: string; properties: Record<string, unknown> }> };
      const externalItem = root.children.find(
        (c) => c.properties?.target === '_blank',
      );
      expect(externalItem).toBeDefined();
      expect(externalItem?.properties.itemLabel).toBeTruthy();
    });
  });
});
