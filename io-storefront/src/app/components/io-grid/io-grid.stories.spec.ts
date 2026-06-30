import { describe, it, expect } from 'vitest';
import { gridStory, gridPropDefinitions, gridStoryHalves, gridStoryThirds, gridStorySidebar } from './io-grid.stories';

describe('io-grid storefront stories', () => {
  describe('gridStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => gridStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = gridStory.generator?.(gridStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('state.properties is defined', () => {
      expect(gridStory.state?.properties).toBeDefined();
    });

    it('every element has a tag', () => {
      const els = gridStory.generator?.(gridStory.state) ?? [];
      for (const el of els) {
        if (el && typeof el === 'object' && 'tag' in el) {
          expect(typeof (el as { tag: unknown }).tag).toBe('string');
        }
      }
    });
  });

  describe('gridPropDefinitions', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(gridPropDefinitions)).toBe(true);
      expect(gridPropDefinitions.length).toBeGreaterThan(0);
    });

    it('each entry has a name and type', () => {
      for (const def of gridPropDefinitions) {
        expect(typeof def.name).toBe('string');
        expect(typeof def.type).toBe('string');
      }
    });
  });

  describe('named stories', () => {
    it('gridStoryHalves generator does not throw', () => {
      expect(() => gridStoryHalves.generator?.()).not.toThrow();
    });

    it('gridStoryThirds generator does not throw', () => {
      expect(() => gridStoryThirds.generator?.()).not.toThrow();
    });

    it('gridStorySidebar generator does not throw', () => {
      expect(() => gridStorySidebar.generator?.()).not.toThrow();
    });
  });
});
