/**
 * io-grid utilities.
 *
 * Pure functions — no DOM dependencies — for unit-testable logic.
 */

import type { IoGridGap, IoGridAlign, IoGridJustify } from './types';

const VALID_GAPS: readonly IoGridGap[] = ['none', 'sm', 'md', 'lg'];
const VALID_ALIGNS: readonly IoGridAlign[] = ['start', 'center', 'end', 'stretch'];
const VALID_JUSTIFIES: readonly IoGridJustify[] = ['start', 'center', 'end', 'stretch'];

/** Validate gap value and return default if invalid. */
export function resolveGap(gap: IoGridGap | undefined): IoGridGap {
  if (!gap || !(VALID_GAPS as readonly string[]).includes(gap)) return 'md';
  return gap;
}

/** Validate align value and return default if invalid. */
export function resolveAlign(align: IoGridAlign | undefined): IoGridAlign {
  if (!align || !(VALID_ALIGNS as readonly string[]).includes(align)) return 'start';
  return align;
}

/** Validate justify value and return default if invalid. */
export function resolveJustify(justify: IoGridJustify | undefined): IoGridJustify {
  if (!justify || !(VALID_JUSTIFIES as readonly string[]).includes(justify)) return 'stretch';
  return justify;
}

/**
 * Resolve a columns number to a valid 1–12 range.
 * Clamps the value and falls back to 12 on invalid input.
 */
export function resolveColumns(columns: number | undefined): number {
  if (typeof columns !== 'number' || isNaN(columns)) return 12;
  return Math.max(1, Math.min(12, Math.round(columns)));
}

/**
 * Resolve a col-span number to a valid 1–12 range.
 */
export function resolveColSpan(colSpan: number | undefined): number | undefined {
  if (colSpan === undefined || colSpan === null) return undefined;
  if (typeof colSpan !== 'number' || isNaN(colSpan)) return undefined;
  return Math.max(1, Math.min(12, Math.round(colSpan)));
}
