import type { IoBadgeVariant } from './types';

export function getBadgeClassName(variant: IoBadgeVariant): string {
  return `badge badge--${variant}`;
}
