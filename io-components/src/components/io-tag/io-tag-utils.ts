import type { IoTagColor, IoTagSize } from './types';

export function shouldBlockTagInteraction(disabled: boolean): boolean {
  return disabled;
}

export function getTagClassName(size: IoTagSize, color: IoTagColor, selected: boolean, disabled: boolean, compact?: boolean): string {
  return [
    'tag',
    `tag--${size}`,
    `tag--${color}`,
    selected ? 'tag--selected' : '',
    disabled ? 'tag--disabled' : '',
    compact ? 'tag--compact' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function getTagGroupClassName(size: IoTagSize, color: IoTagColor, selected: boolean, disabled: boolean): string {
  return [
    'tag-group',
    `tag-group--${size}`,
    `tag-group--${color}`,
    selected ? 'tag-group--selected' : '',
    disabled ? 'tag-group--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
}
