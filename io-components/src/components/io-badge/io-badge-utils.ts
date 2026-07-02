import type { IoBadgeVariant, IoBadgeAppearance, IoBadgeSize } from './types';

export function getBadgeClassName(variant: IoBadgeVariant, appearance: IoBadgeAppearance, size: IoBadgeSize): string {
  return `badge badge--${variant} badge--${appearance} badge--${size}`;
}
