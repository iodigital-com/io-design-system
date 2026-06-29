/**
 * Shared validation state type and constant for all io form-field components.
 *
 * State semantics:
 *
 * - 'none':    No validation state — default appearance
 * - 'error':   Field has a validation error — red border + icon.
 *              Also affects FACE validity (sets valueMissing / invalid).
 * - 'success': Field passed validation — green border + icon.
 *              Does NOT affect FACE validity (advisory-only).
 * - 'warning': Field has a non-blocking advisory warning — amber border + icon.
 *              **Advisory-only**: does NOT affect FACE validity and does NOT
 *              cause `internals.setValidity()` to set any invalid flag.
 *              Screen reader announcement uses `role="status"` (polite) —
 *              not `role="alert"` (assertive) — because the warning is
 *              non-blocking and the user is not prevented from submitting.
 *              Markup and role MUST be consistent across all form components
 *              (io-input, io-checkbox, io-radio, io-select, io-textarea).
 *
 * Use `IO_FIELD_STATES` (runtime constant) wherever you need to enumerate
 * or validate the allowed values at runtime. Use `IoFieldState` (type) for
 * TypeScript compile-time checks.
 *
 * @example
 * // storefront propDefinitions
 * { key: 'state', type: 'select', options: IO_FIELD_STATES, default: 'none' }
 *
 * // runtime validation in dev mode
 * if (!IO_FIELD_STATES.includes(this.state)) {
 *   console.warn(`[io-input] Invalid state: "${this.state}". Expected one of ${IO_FIELD_STATES.join(', ')}.`);
 * }
 */

/** Runtime-accessible tuple of all valid field states. */
export const IO_FIELD_STATES = ['none', 'error', 'success', 'warning'] as const;

/** Derived type from the runtime constant — single source of truth. */
export type IoFieldState = (typeof IO_FIELD_STATES)[number];
