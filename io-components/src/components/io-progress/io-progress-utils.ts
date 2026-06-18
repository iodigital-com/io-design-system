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
