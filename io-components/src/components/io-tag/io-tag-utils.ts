import type { IoTagColor, IoTagSize, IoTagVariant, IoTagAppearance } from './types';

export function shouldBlockTagInteraction(disabled: boolean): boolean {
  return disabled;
}

/**
 * Maps deprecated brand-colour `color` values to semantic `variant` equivalents.
 * Used to provide backwards compatibility while emitting deprecation warnings.
 */
export const DEPRECATED_COLOR_MAP: Record<string, IoTagVariant> = {
  blue: 'primary',
  beige: 'subtle',
  dark: 'neutral',
  orange: 'warning',
  rouge: 'error',
  success: 'success',
  warning: 'warning',
  error: 'error',
  outline: 'neutral',
  default: 'neutral',
};

/**
 * Resolves the effective variant from the new `variant` prop or the deprecated `color` prop.
 * `variant` takes precedence when it has been changed from its default ('neutral').
 * Falls back to mapping the `color` value.
 */
export function resolveTagVariant(variant: IoTagVariant, color: IoTagColor): IoTagVariant {
  // If variant has a meaningful semantic value (non-default), prefer it
  if (variant !== 'neutral') return variant;
  // Fall back to color mapping
  const mapped = DEPRECATED_COLOR_MAP[color];
  return mapped ?? 'neutral';
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
