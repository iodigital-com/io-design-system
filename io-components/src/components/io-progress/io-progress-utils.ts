/**
 * io-progress utilities.
 *
 * Pure functions for clamping values and building CSS class strings.
 * No side effects — safe to use in both component render and unit tests.
 */

export function clampValue(value: number): number {
  return Math.min(100, Math.max(0, value));
}

/**
 * Compute normalized fill percentage using min/max range.
 * @param value — Current value
 * @param min — Minimum of range
 * @param max — Maximum of range
 * @returns Percentage (0-100)
 */
export function computePercentage(value: number, min: number, max: number): number {
  if (max <= min) return 0;
  const normalized = (value - min) / (max - min) * 100;
  return clampValue(normalized);
}

export function getProgressWrapperClass(size: string, indeterminate = false): string {
  return [
    'progress-wrapper',
    `progress-wrapper--${size}`,
    indeterminate && 'progress-wrapper--indeterminate',
  ]
    .filter(Boolean)
    .join(' ');
}

export function getProgressFillClass(color: string, animated: boolean, indeterminate = false): string {
  return [
    'progress-fill',
    `progress-fill--${color}`,
    !animated && 'progress-fill--static',
    indeterminate && 'progress-fill--indeterminate',
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * Compute SVG circle parameters for the circular progress variant.
 *
 * Returns the `strokeDashoffset` to achieve the given fill percentage for a
 * circle with the provided `radius`. The circumference is 2πr.
 *
 * @param radius — SVG circle radius in SVG user-units
 * @param percentage — fill percentage 0-100
 */
export function computeCircleDashoffset(radius: number, percentage: number): number {
  const circumference = 2 * Math.PI * radius;
  return circumference * (1 - percentage / 100);
}

/**
 * Compute the total circumference for the given radius.
 */
export function computeCircleCircumference(radius: number): number {
  return 2 * Math.PI * radius;
}

/**
 * Derive the number of completed segments for the step variant.
 *
 * @param value — current value
 * @param min — range minimum
 * @param max — range maximum (also the total number of steps)
 * @returns number of filled segments (0-max)
 */
export function computeStepsFilled(value: number, min: number, max: number): number {
  if (max <= min) return 0;
  const clamped = Math.min(max, Math.max(min, value));
  return clamped - min;
}
