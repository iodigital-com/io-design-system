/**
 * io-progress utilities.
 *
 * Pure functions for clamping values and building CSS class strings.
 * No side effects — safe to use in both component render and unit tests.
 */

export function clampValue(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function getProgressWrapperClass(size: string): string {
  return `progress-wrapper progress-wrapper--${size}`;
}

export function getProgressFillClass(color: string, animated: boolean): string {
  return ['progress-fill', `progress-fill--${color}`, !animated && 'progress-fill--static']
    .filter(Boolean)
    .join(' ');
}
