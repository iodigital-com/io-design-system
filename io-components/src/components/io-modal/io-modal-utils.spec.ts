import { describe, it, expect } from 'vitest';
import { createModalHeadingId } from './io-modal-utils';

describe('io-modal-utils', () => {
  describe('createModalHeadingId', () => {
    it('prefixes the supplied random value', () => {
      expect(createModalHeadingId('abc123')).toBe('io-modal-heading-abc123');
    });

    it('produces unique IDs for different seeds', () => {
      expect(createModalHeadingId('aaa')).not.toBe(createModalHeadingId('bbb'));
    });
  });
});
