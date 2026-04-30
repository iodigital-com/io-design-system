import type { IoBadgeVariant, IoBadgeSize } from './types';

export function getBadgeClassName(variant: IoBadgeVariant, size: IoBadgeSize): string {
  return `badge badge--${variant} badge--${size}`;
}
