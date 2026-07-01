import type { IoLinkPureAlignLabel, IoLinkPureSize } from './types';

export function shouldBlockLinkPureClick(disabled: boolean): boolean {
  return disabled;
}

export function resolveLinkPureTarget(target: string | undefined, external: boolean): string | undefined {
  return external ? '_blank' : target;
}

export function resolveLinkPureRel(
  rel: string | undefined,
  target: string | undefined,
  external: boolean,
): string | undefined {
  if (external || target === '_blank') {
    if (rel) {
      const hasNoopener = /\bnoopener\b/.test(rel);
      const hasNoreferrer = /\bnoreferrer\b/.test(rel);
      if (hasNoopener && hasNoreferrer) return rel;
      if (hasNoopener) return `${rel} noreferrer`;
      if (hasNoreferrer) return `noopener ${rel}`;
      return `noopener noreferrer ${rel}`;
    }
    return 'noopener noreferrer';
  }
  return rel;
}

export function getLinkPureClassName(
  size: IoLinkPureSize,
  alignLabel: IoLinkPureAlignLabel,
  disabled: boolean,
  active: boolean,
  stretch: boolean,
): string {
  const classes = [
    'link-pure',
    `link-pure--${size}`,
    `link-pure--align-${alignLabel}`,
  ];
  if (disabled) classes.push('link-pure--disabled');
  if (active) classes.push('link-pure--active');
  if (stretch) classes.push('link-pure--stretch');
  return classes.join(' ');
}
