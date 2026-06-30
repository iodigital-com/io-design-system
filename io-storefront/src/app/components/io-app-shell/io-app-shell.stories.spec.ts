import { describe, it, expect } from 'vitest';
import { appShellStory, appShellPropDefinitions } from './io-app-shell.stories';

describe('io-app-shell storefront stories', () => {
  describe('appShellStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => appShellStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = appShellStory.generator?.(appShellStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('state.properties is defined', () => {
      expect(appShellStory.state?.properties).toBeDefined();
    });

    it('every element has a tag', () => {
      const els = appShellStory.generator?.(appShellStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('appShellPropDefinitions', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(appShellPropDefinitions)).toBe(true);
      expect(appShellPropDefinitions.length).toBeGreaterThan(0);
    });
  });
});
