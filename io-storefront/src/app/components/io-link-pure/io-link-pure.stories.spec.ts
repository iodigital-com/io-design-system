import { describe, it, expect } from 'vitest';

import {
  linkPureStory,
  linkPureStoryDefault,
  linkPureStoryIconEnd,
  linkPureStoryActive,
  linkPureStorySizes,
  linkPureStoryDisabled,
  linkPureStoryIconOnly,
  linkPurePropDefinitions,
} from './io-link-pure.stories';

describe('io-link-pure stories', () => {
  describe('linkPureStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => linkPureStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = linkPureStory.generator?.(linkPureStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = linkPureStory.generator?.(linkPureStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(linkPureStory.state?.properties).toBeDefined();
    });

    it('passes href to properties', () => {
      const els = linkPureStory.generator?.({ properties: { href: '/docs', label: 'Docs' } }) ?? [];
      const first = els[0];
      if (first && typeof first === 'object' && 'properties' in first) {
        expect((first as { properties?: Record<string, unknown> }).properties?.['href']).toBe('/docs');
      }
    });

    it('passes size to properties', () => {
      const els = linkPureStory.generator?.({ properties: { size: 'sm', label: 'Small' } }) ?? [];
      const first = els[0];
      if (first && typeof first === 'object' && 'properties' in first) {
        expect((first as { properties?: Record<string, unknown> }).properties?.['size']).toBe('sm');
      }
    });

    it('passes active to properties', () => {
      const els = linkPureStory.generator?.({ properties: { active: true, label: 'Active' } }) ?? [];
      const first = els[0];
      if (first && typeof first === 'object' && 'properties' in first) {
        expect((first as { properties?: Record<string, unknown> }).properties?.['active']).toBe(true);
      }
    });

    it('clears icon when set to none', () => {
      const els = linkPureStory.generator?.({ properties: { icon: 'none', label: 'No icon' } }) ?? [];
      const first = els[0];
      if (first && typeof first === 'object' && 'properties' in first) {
        expect((first as { properties?: Record<string, unknown> }).properties?.['icon']).toBeNull();
      }
    });
  });

  describe('named example stories', () => {
    it('linkPureStoryDefault generator does not throw', () => {
      expect(() => linkPureStoryDefault.generator?.()).not.toThrow();
    });

    it('linkPureStoryDefault returns one element', () => {
      const els = linkPureStoryDefault.generator?.() ?? [];
      expect(els).toHaveLength(1);
    });

    it('linkPureStoryIconEnd generator does not throw', () => {
      expect(() => linkPureStoryIconEnd.generator?.()).not.toThrow();
    });

    it('linkPureStoryActive generator does not throw', () => {
      expect(() => linkPureStoryActive.generator?.()).not.toThrow();
    });

    it('linkPureStorySizes returns three elements', () => {
      const els = linkPureStorySizes.generator?.() ?? [];
      expect(els).toHaveLength(3);
    });

    it('linkPureStoryDisabled generator does not throw', () => {
      expect(() => linkPureStoryDisabled.generator?.()).not.toThrow();
    });

    it('linkPureStoryIconOnly generator does not throw', () => {
      expect(() => linkPureStoryIconOnly.generator?.()).not.toThrow();
    });
  });

  describe('linkPurePropDefinitions', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(linkPurePropDefinitions)).toBe(true);
      expect(linkPurePropDefinitions.length).toBeGreaterThan(0);
    });

    it('includes all configurable props', () => {
      const keys = linkPurePropDefinitions.map(p => p.name);
      expect(keys).toContain('label');
      expect(keys).toContain('href');
      expect(keys).toContain('icon');
      expect(keys).toContain('alignLabel');
      expect(keys).toContain('size');
      expect(keys).toContain('active');
      expect(keys).toContain('stretch');
      expect(keys).toContain('disabled');
      expect(keys).toContain('hideLabel');
    });

    it('size has type select', () => {
      const sizeDef = linkPurePropDefinitions.find(p => p.name === 'size');
      expect(sizeDef?.type).toBe('select');
    });

    it('active has type boolean', () => {
      const activeDef = linkPurePropDefinitions.find(p => p.name === 'active');
      expect(activeDef?.type).toBe('boolean');
    });
  });
});
