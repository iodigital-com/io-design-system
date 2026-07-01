import type { IoTagSize, IoTagVariant, IoTagAppearance } from './types';

export function shouldBlockTagInteraction(disabled: boolean): boolean {
  return disabled;
}

export function getTagClassName(
  size: IoTagSize,
  variant: IoTagVariant,
  appearance: IoTagAppearance,
  selected: boolean,
  disabled: boolean,
  compact?: boolean,
): string {
  return [
    'tag',
    `tag--${size}`,
    `tag--${variant}`,
    `tag--${appearance}`,
    selected ? 'tag--selected' : '',
    disabled ? 'tag--disabled' : '',
    compact ? 'tag--compact' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function getTagGroupClassName(
  size: IoTagSize,
  variant: IoTagVariant,
  appearance: IoTagAppearance,
  selected: boolean,
  disabled: boolean,
): string {
  return [
    'tag-group',
    `tag-group--${size}`,
    `tag-group--${variant}`,
    `tag-group--${appearance}`,
    selected ? 'tag-group--selected' : '',
    disabled ? 'tag-group--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
}
