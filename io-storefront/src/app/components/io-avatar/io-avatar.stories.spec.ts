import { describe, it, expect } from 'vitest';
import {
  avatarStory,
  avatarPropDefinitions,
  avatarStoryImage,
  avatarStoryInitials,
  avatarStoryIcon,
  avatarStorySizes,
  avatarStoryShapes,
} from './io-avatar.stories';

describe('io-avatar storefront stories', () => {
  // ── Configurator story ──────────────────────────────────────────────────
  describe('avatarStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => avatarStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = avatarStory.generator?.(avatarStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = avatarStory.generator?.(avatarStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });

    it('state.properties is defined', () => {
      expect(avatarStory.state?.properties).toBeDefined();
    });

    it('generator with size=xs does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, size: 'xs' } }),
      ).not.toThrow();
    });

    it('generator with size=sm does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, size: 'sm' } }),
      ).not.toThrow();
    });

    it('generator with size=md does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, size: 'md' } }),
      ).not.toThrow();
    });

    it('generator with size=lg does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, size: 'lg' } }),
      ).not.toThrow();
    });

    it('generator with size=xl does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, size: 'xl' } }),
      ).not.toThrow();
    });

    it('generator with color=blue does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, color: 'blue' } }),
      ).not.toThrow();
    });

    it('generator with color=orange does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, color: 'orange' } }),
      ).not.toThrow();
    });

    it('generator with color=green does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, color: 'green' } }),
      ).not.toThrow();
    });

    it('generator with color=purple does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, color: 'purple' } }),
      ).not.toThrow();
    });

    it('generator with color=grey does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, color: 'grey' } }),
      ).not.toThrow();
    });

    it('generator with shape=circle does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, shape: 'circle' } }),
      ).not.toThrow();
    });

    it('generator with shape=square does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, shape: 'square' } }),
      ).not.toThrow();
    });

    it('generator with empty src does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, src: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty src does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, src: 'https://example.com/avatar.jpg' } }),
      ).not.toThrow();
    });

    it('generator with empty alt does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, alt: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty alt does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, alt: 'Jane Doe' } }),
      ).not.toThrow();
    });

    it('generator with empty name does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, name: '' } }),
      ).not.toThrow();
    });

    it('generator with non-empty name does not throw', () => {
      expect(() =>
        avatarStory.generator?.({ properties: { ...avatarStory.state?.properties, name: 'Jane Doe' } }),
      ).not.toThrow();
    });

    it('configurator story produces io-avatar as root element', () => {
      const els = avatarStory.generator?.(avatarStory.state) ?? [];
      expect((els[0] as { tag: string }).tag).toBe('io-avatar');
    });
  });

  // ── PropDefinitions ─────────────────────────────────────────────────────
  describe('avatarPropDefinitions', () => {
    it('is non-empty', () => {
      expect(avatarPropDefinitions.length).toBeGreaterThan(0);
    });

    it('every definition has a non-empty name', () => {
      for (const def of avatarPropDefinitions) {
        expect(def.name).toBeTruthy();
      }
    });

    it('every definition has a valid type', () => {
      for (const def of avatarPropDefinitions) {
        expect(def.type).toMatch(/^(string|boolean|select|number)$/);
      }
    });

    it('select definitions have options with at least one entry', () => {
      for (const def of avatarPropDefinitions.filter((d) => d.type === 'select')) {
        expect((def as unknown as { options: string[] }).options).toBeDefined();
        expect(((def as unknown as { options: string[] }).options).length).toBeGreaterThan(0);
      }
    });

    it('every definition has defaultValue defined', () => {
      for (const def of avatarPropDefinitions) {
        expect(def.defaultValue).toBeDefined();
      }
    });

    it('no duplicate names', () => {
      const names = avatarPropDefinitions.map((d) => d.name);
      const unique = new Set(names);
      expect(unique.size).toBe(names.length);
    });
  });

  // ── Named stories ───────────────────────────────────────────────────────
  describe('avatarStoryImage', () => {
    it('generator returns non-empty array', () => {
      const els = avatarStoryImage.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = avatarStoryImage.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('avatarStoryInitials', () => {
    it('generator returns non-empty array', () => {
      const els = avatarStoryInitials.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = avatarStoryInitials.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('avatarStoryIcon', () => {
    it('generator returns non-empty array', () => {
      const els = avatarStoryIcon.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = avatarStoryIcon.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('avatarStorySizes', () => {
    it('generator returns non-empty array', () => {
      const els = avatarStorySizes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = avatarStorySizes.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('avatarStoryShapes', () => {
    it('generator returns non-empty array', () => {
      const els = avatarStoryShapes.generator?.();
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('every returned element has a tag', () => {
      const els = avatarStoryShapes.generator?.() ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });
});
