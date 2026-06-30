/**
 * io-link-tile / io-button-tile utilities.
 *
 * Pure functions — unit-testable with no DOM dependencies.
 */

import type { IoTileAspectRatio, IoTileAlign, IoTileSize, IoTileWeight } from './types';

const VALID_ASPECT_RATIOS: readonly IoTileAspectRatio[] = ['1/1', '4/3', '3/4', '16/9'];
const VALID_ALIGNS: readonly IoTileAlign[] = ['top', 'bottom'];
const VALID_SIZES: readonly IoTileSize[] = ['sm', 'md', 'lg'];
const VALID_WEIGHTS: readonly IoTileWeight[] = ['regular', 'medium', 'semibold', 'bold'];

/** Resolve aspect ratio to a valid value. */
export function resolveAspectRatio(ratio: IoTileAspectRatio | undefined): IoTileAspectRatio {
  if (!ratio || !(VALID_ASPECT_RATIOS as readonly string[]).includes(ratio)) return '4/3';
  return ratio;
}

/** Resolve align to a valid value. */
export function resolveAlign(align: IoTileAlign | undefined): IoTileAlign {
  if (!align || !(VALID_ALIGNS as readonly string[]).includes(align)) return 'bottom';
  return align;
}

/** Resolve size to a valid value. */
export function resolveSize(size: IoTileSize | undefined): IoTileSize {
  if (!size || !(VALID_SIZES as readonly string[]).includes(size)) return 'md';
  return size;
}

/** Resolve weight to a valid value. */
export function resolveWeight(weight: IoTileWeight | undefined): IoTileWeight {
  if (!weight || !(VALID_WEIGHTS as readonly string[]).includes(weight)) return 'semibold';
  return weight;
}

/** Build rel attribute for tile link — always noopener noreferrer when target is _blank. */
export function resolveTileRel(
  rel: string | undefined,
  target: string | undefined,
): string | undefined {
  if (target === '_blank') {
    const base = rel ? rel.split(' ') : [];
    if (!base.includes('noopener')) base.push('noopener');
    if (!base.includes('noreferrer')) base.push('noreferrer');
    return base.join(' ');
  }
  return rel;
}
