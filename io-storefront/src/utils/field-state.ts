/**
 * Runtime-accessible tuple of all valid io form field validation states.
 *
 * Mirrors `IO_FIELD_STATES` from `@iodigital-com/components/utils/field-state`.
 * Use this in storefront `propDefinitions` instead of inline literal arrays.
 *
 * @example
 * { key: 'state', type: 'select', options: IO_FIELD_STATES, default: 'none' }
 */
export const IO_FIELD_STATES = ['none', 'error', 'success', 'warning'] as const;

/** Derived type. */
export type IoFieldState = (typeof IO_FIELD_STATES)[number];
