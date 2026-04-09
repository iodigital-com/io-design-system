import type { IoLinkColor, IoLinkVariant } from './types';

export function shouldBlockLinkClick(disabled: boolean): boolean {
  return disabled;
}

export function resolveLinkTarget(target: string | undefined, external: boolean): string | undefined {
  return external ? '_blank' : target;
}

export function resolveLinkRel(rel: string | undefined, external: boolean): string | undefined {
  return external ? 'noopener noreferrer' : rel;
}

export function getLinkClassName(variant: IoLinkVariant, color: IoLinkColor, disabled: boolean): string {
  return `link link--${variant} link--${color}${disabled ? ' link--disabled' : ''}`;
}
