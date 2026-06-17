import { describe, it, expect } from 'vitest';
import {
  breadcrumbStoryDefault,
  breadcrumbStoryGuillemet,
  breadcrumbStoryLong,
  breadcrumbStoryLabel,
  breadcrumbStoryTargetBlank,
} from './io-breadcrumb.stories';

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

  describe('breadcrumbStoryGuillemet', () => {
    it('generator with no args does not throw', () => {
      expect(() => breadcrumbStoryGuillemet.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = breadcrumbStoryGuillemet.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = breadcrumbStoryGuillemet.generator?.() ?? [];
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

  describe('breadcrumbStoryLabel', () => {
    it('generator with no args does not throw', () => {
      expect(() => breadcrumbStoryLabel.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = breadcrumbStoryLabel.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('io-breadcrumb has label property set', () => {
      const els = breadcrumbStoryLabel.generator?.() ?? [];
      type BreadcrumbLike = { tag: string; properties?: Record<string, unknown>; children?: unknown[] };
      const breadcrumb = els.find(
        el => typeof el === 'object' && el !== null && 'tag' in el && (el as { tag: unknown }).tag === 'io-breadcrumb',
      ) as BreadcrumbLike | undefined;
      expect(breadcrumb?.properties?.label).toBe("Fil d'Ariane");
    });
  });

  describe('breadcrumbStoryTargetBlank', () => {
    it('generator with no args does not throw', () => {
      expect(() => breadcrumbStoryTargetBlank.generator?.()).not.toThrow();
    });

    it('generator returns non-empty array', () => {
      const els = breadcrumbStoryTargetBlank.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('one io-breadcrumb-item has target="_blank"', () => {
      const els = breadcrumbStoryTargetBlank.generator?.() ?? [];
      type BreadcrumbEl = { tag: string; properties?: Record<string, unknown>; children?: unknown[] };
      const root = els.find(
        el => typeof el === 'object' && el !== null && 'tag' in el && (el as { tag: unknown }).tag === 'io-breadcrumb',
      ) as BreadcrumbEl | undefined;
      const items = (root?.children ?? []) as BreadcrumbEl[];
      const blankItem = items.find(c => c?.properties?.target === '_blank');
      expect(blankItem).toBeDefined();
    });
  });
});
