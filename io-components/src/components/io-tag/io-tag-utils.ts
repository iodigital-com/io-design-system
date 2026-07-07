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
): string {
  return [
    'tag',
    `tag--${size}`,
    `tag--${variant}`,
    `tag--${appearance}`,
    selected ? 'tag--selected' : '',
    disabled ? 'tag--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

