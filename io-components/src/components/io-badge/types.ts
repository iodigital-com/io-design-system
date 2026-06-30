/**
 * Semantic variant — replaces raw brand-colour names.
 * Use these in new code — they survive brand palette changes.
 */
export type IoBadgeVariant =
  | 'neutral'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'subtle'
  // deprecated brand-colour aliases — kept for backwards compatibility
  | 'beige'
  | 'blue'
  | 'dark'
  | 'orange'
  | 'rouge'
  | 'outline';

/**
 * Appearance modifier — controls the fill/blend style.
 * - solid: fully-filled background
 * - soft: translucent tinted background (default)
 * - frosted: backdrop-filter blur over a semi-transparent fill
 */
export type IoBadgeAppearance = 'solid' | 'soft' | 'frosted';

/** Badge size scale: sm (compact), md (default), lg (prominent) */
export type IoBadgeSize = 'sm' | 'md' | 'lg';
