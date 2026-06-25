import type { IoTextListColor, IoTextListSize } from './types';

export function resolveTextListColor(color: IoTextListColor): string {
  switch (color) {
    case 'success':
      return 'var(--io-color-success)';
    case 'warning':
      return 'var(--io-color-warning)';
    case 'error':
      return 'var(--io-color-error)';
    case 'info':
      return 'var(--io-color-info)';
    case 'inherit':
      return 'inherit';
    default:
      return `var(--io-text-${color})`;
  }
}

export function resolveTextListFontSize(size: IoTextListSize): string {
  return size === 'inherit' ? 'inherit' : `var(--io-font-size-${size})`;
}
