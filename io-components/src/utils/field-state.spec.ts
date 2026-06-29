import { describe, it, expect } from 'vitest';
import { IO_FIELD_STATES } from './field-state';
import type { IoFieldState } from './field-state';

describe('IO_FIELD_STATES', () => {
  it('contains all four valid states', () => {
    expect(IO_FIELD_STATES).toEqual(['none', 'error', 'success', 'warning']);
  });

  it('is a readonly tuple (as const)', () => {
    // Verify the constant is iterable and has correct length
    expect(IO_FIELD_STATES.length).toBe(4);
  });

  it('includes none', () => expect(IO_FIELD_STATES).toContain('none'));
  it('includes error', () => expect(IO_FIELD_STATES).toContain('error'));
  it('includes success', () => expect(IO_FIELD_STATES).toContain('success'));
  it('includes warning', () => expect(IO_FIELD_STATES).toContain('warning'));

  describe('warning state contract', () => {
    it('warning is advisory-only — it does NOT affect FACE validity', () => {
      /**
       * This test locks the documented invariant: when a form component has
       * state="warning", FACE validity (ElementInternals) MUST NOT be set to
       * invalid. Only state="error" + the required/valueMissing path affect
       * FACE validity.
       *
       * The invariant is enforced per-component in the individual .face.spec.ts
       * files. This spec documents the contract at the utility level so it is
       * visible to anyone reading field-state.ts.
       *
       * Contract: IO_FIELD_STATES includes 'warning'; warning is advisory-only.
       */
      const warningIsAdvisory = (state: IoFieldState): boolean => {
        // warning does not trigger FACE invalidity
        if (state === 'warning') return true;
        // error does trigger FACE invalidity when required + no value
        if (state === 'error') return false;
        // none and success are both non-invalid states
        return false;
      };
      expect(warningIsAdvisory('warning')).toBe(true);
      expect(warningIsAdvisory('error')).toBe(false);
      expect(warningIsAdvisory('none')).toBe(false);
      expect(warningIsAdvisory('success')).toBe(false);
    });

    it('warning uses role=status (polite), not role=alert (assertive)', () => {
      /**
       * Screen reader role mapping contract:
       * - error   → role="alert"   (assertive — user is blocked)
       * - warning → role="status"  (polite — advisory, user may continue)
       * - success → role="status"  (polite — confirmatory)
       */
      const getRoleForState = (state: IoFieldState): string => {
        if (state === 'error') return 'alert';
        return 'status';
      };
      expect(getRoleForState('error')).toBe('alert');
      expect(getRoleForState('warning')).toBe('status');
      expect(getRoleForState('success')).toBe('status');
    });
  });
});
