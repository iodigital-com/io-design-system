import type { IoBadgeVariant, IoBadgeAppearance, IoBadgeSize } from './types';

/**
 * Maps deprecated brand-colour badge variant values to semantic equivalents.
 */
export const DEPRECATED_BADGE_COLOR_MAP: Record<string, IoBadgeVariant> = {
  blue: 'primary',
  beige: 'subtle',
  dark: 'neutral',
  orange: 'warning',
  rouge: 'error',
  outline: 'neutral',
};

export function getBadgeClassName(variant: IoBadgeVariant, appearance: IoBadgeAppearance, size: IoBadgeSize): string {
  return `badge badge--${variant} badge--${appearance} badge--${size}`;
}
