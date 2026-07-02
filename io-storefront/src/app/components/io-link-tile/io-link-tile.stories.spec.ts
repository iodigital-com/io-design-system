import { describe, it, expect } from 'vitest';
import { linkTileStory, linkTilePropDefinitions, linkTileStoryAspectRatios, linkTileStoryAlignments } from './io-link-tile.stories';

describe('io-link-tile storefront stories', () => {
  describe('linkTileStory (configurator)', () => {
    it('generator with no args does not throw', () => {
      expect(() => linkTileStory.generator?.()).not.toThrow();
    });

    it('generator with default state returns non-empty array', () => {
      const els = linkTileStory.generator?.(linkTileStory.state);
      expect(Array.isArray(els)).toBe(true);
      expect(els!.length).toBeGreaterThan(0);
    });

    it('state.properties is defined', () => {
      expect(linkTileStory.state?.properties).toBeDefined();
    });
  });

  describe('linkTilePropDefinitions', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(linkTilePropDefinitions)).toBe(true);
      expect(linkTilePropDefinitions.length).toBeGreaterThan(0);
    });
  });

  describe('named stories', () => {
    it('linkTileStoryAspectRatios returns 4 elements', () => {
      const els = linkTileStoryAspectRatios.generator?.();
      expect(els?.length).toBe(4);
    });

    it('linkTileStoryAlignments returns 2 elements', () => {
      const els = linkTileStoryAlignments.generator?.();
      expect(els?.length).toBe(2);
    });
  });
});
