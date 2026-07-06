import { describe, it, expect } from 'vitest';

import { IoFlag } from './io-flag';
import { getFlagLabel, getFlagSrc, FLAG_COUNTRY_NAMES, FLAG_SIZE_PX } from './io-flag-utils';

describe('io-flag — default props and render contract', () => {
  it('has md as the default size', () => {
    const component = new IoFlag();
    expect(component.size).toBe('md');
  });

  it('renders without throwing for known flag names', () => {
    const names = ['nl', 'gb', 'de', 'fr', 'us'] as const;
    for (const name of names) {
      const component = new IoFlag();
      component.name = name;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('returns null when name is not set', () => {
    const component = new IoFlag();
    // name is required but component should not crash
    expect(component.render()).toBeNull();
  });
});

describe('io-flag — utils', () => {
  it('getFlagLabel returns country name for known code', () => {
    expect(getFlagLabel('nl')).toBe('Netherlands');
    expect(getFlagLabel('gb')).toBe('United Kingdom');
    expect(getFlagLabel('de')).toBe('Germany');
  });

  it('getFlagLabel uses provided label over country name', () => {
    expect(getFlagLabel('nl', 'Nederland')).toBe('Nederland');
  });

  it('getFlagLabel returns uppercased code for unknown country', () => {
    expect(getFlagLabel('xx')).toBe('XX');
  });

  it('getFlagLabel returns empty string when label is empty string', () => {
    expect(getFlagLabel('nl', '')).toBe('');
  });

  it('getFlagSrc returns a flagcdn.com URL', () => {
    const src = getFlagSrc('nl', 24);
    expect(src).toContain('flagcdn.com');
    expect(src).toContain('nl');
    expect(src).toContain('w40');
  });

  it('getFlagSrc snaps an arbitrary size up to the nearest flagcdn.com width bucket', () => {
    expect(getFlagSrc('nl', 20)).toContain('w20');
    expect(getFlagSrc('nl', 24)).toContain('w40');
    expect(getFlagSrc('nl', 32)).toContain('w40');
    expect(getFlagSrc('nl', 48)).toContain('w80');
    expect(getFlagSrc('nl', 64)).toContain('w80');
  });

  it('FLAG_COUNTRY_NAMES has entries for all EU member states', () => {
    const euCodes = ['at', 'be', 'bg', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gr', 'hr', 'hu', 'ie', 'it', 'lt', 'lu', 'lv', 'mt', 'nl', 'pl', 'pt', 'ro', 'se', 'si', 'sk'];
    for (const code of euCodes) {
      expect(FLAG_COUNTRY_NAMES[code as keyof typeof FLAG_COUNTRY_NAMES]).toBeTruthy();
    }
  });

  it('FLAG_SIZE_PX maps all size tokens', () => {
    expect(FLAG_SIZE_PX['xs']).toBe(16);
    expect(FLAG_SIZE_PX['sm']).toBe(20);
    expect(FLAG_SIZE_PX['md']).toBe(24);
    expect(FLAG_SIZE_PX['lg']).toBe(32);
    expect(FLAG_SIZE_PX['xl']).toBe(40);
  });
});
