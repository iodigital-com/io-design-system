import type { IoSpinnerColor, IoSpinnerSize } from './types';

export function getSpinnerClassName(size: IoSpinnerSize, color: IoSpinnerColor): string {
  return `spinner spinner--${size} spinner--${color}`;
}

export function normalizeSpinnerLabel(label: unknown): string {
  const normalizedLabel = typeof label === 'string' ? label : '';
  const trimmed = normalizedLabel.trim();
  return trimmed.length > 0 ? trimmed : 'Loading';
}
