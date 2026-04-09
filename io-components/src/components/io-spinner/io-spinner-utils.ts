import type { IoSpinnerColor, IoSpinnerSize } from './types';

export function getSpinnerClassName(size: IoSpinnerSize, color: IoSpinnerColor): string {
  return `spinner spinner--${size} spinner--${color}`;
}

export function normalizeSpinnerLabel(label: string): string {
  const trimmed = label.trim();
  return trimmed.length > 0 ? trimmed : 'Loading';
}
