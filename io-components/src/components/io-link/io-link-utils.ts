import type { IoLinkColor, IoLinkVariant } from './types';

export function shouldBlockLinkClick(disabled: boolean): boolean {
  return disabled;
}

export function resolveLinkTarget(target: string | undefined, external: boolean): string | undefined {
  return external ? '_blank' : target;
}

export function resolveLinkRel(rel: string | undefined, target: string | undefined, external: boolean): string | undefined {
  // Security: auto-inject 'noopener noreferrer' for target="_blank"
  // This prevents reverse tabnapping attacks
  if (external || target === '_blank') {
    if (rel) {
      // If user provided rel, ensure we have security properties and preserve their intent
      const hasNoopener = /\bnoopener\b/.test(rel);
      const hasNoreferrer = /\bnoreferrer\b/.test(rel);
      
      if (hasNoopener && hasNoreferrer) {
        // Already has security properties
        return rel;
      } else if (hasNoopener) {
        // Add noreferrer to existing rel
        return `${rel} noreferrer`;
      } else if (hasNoreferrer) {
        // Add noopener to existing rel
        return `noopener ${rel}`;
      } else {
        // Prepend security properties to user's rel
        return `noopener noreferrer ${rel}`;
      }
    }
    // No rel provided - inject security defaults
    return 'noopener noreferrer';
  }

  // Default behavior for other targets
  return rel;
}

export function getLinkClassName(variant: IoLinkVariant, color: IoLinkColor, disabled: boolean): string {
  return `link link--${variant} link--${color}${disabled ? ' link--disabled' : ''}`;
}
