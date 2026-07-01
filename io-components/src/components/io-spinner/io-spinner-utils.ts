import type { IoSpinnerColor, IoSpinnerSize } from './types';

export function getSpinnerClassName(size: IoSpinnerSize, color: IoSpinnerColor): string {
  return `spinner spinner--${size} spinner--${color}`;
}

export function normalizeSpinnerLabel(label: unknown): string {
  const normalizedLabel = typeof label === 'string' ? label : '';
  const trimmed = normalizedLabel.trim();
  return trimmed.length > 0 ? trimmed : 'Loading';
}

/**
 * Returns the SVG circle radius and circumference for a given spinner size.
 * The SVG viewBox is always 24×24. Stroke-width is set via CSS vars per size.
 * We use a slightly inset radius to avoid clipping the stroke at the SVG edge.
 */
export function getSpinnerCircleRadius(size: IoSpinnerSize): { r: number; circumference: number } {
  // stroke-width varies by size; we compute an appropriate inset radius
  // xs: stroke 1.5 → r=10.25  sm: stroke 2 → r=10  md: stroke 2.5 → r=9.75  lg: stroke 3 → r=9.5  xl: stroke 3.5 → r=9.25  inherit: stroke 2 → r=10
  const strokeWidths: Record<IoSpinnerSize, number> = {
    xs: 1.5,
    sm: 2,
    md: 2.5,
    lg: 3,
    xl: 3.5,
    inherit: 2,
  };
  const strokeWidth = strokeWidths[size] ?? 2.5;
  const r = 12 - strokeWidth / 2;
  const circumference = 2 * Math.PI * r;
  return { r, circumference };
}
