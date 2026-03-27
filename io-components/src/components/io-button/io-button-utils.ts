import type { IoButtonVariant, IoButtonColor, IoButtonSize } from './types';

/**
 * Returns ARIA attributes for the button host element.
 * Handles disabled + loading states, and role for non-button elements.
 */
export function getButtonAriaAttrs(options: {
  disabled: boolean;
  loading: boolean;
  href: string | undefined;
}): Record<string, string | boolean | undefined> {
  const { disabled, loading, href } = options;
  const attrs: Record<string, string | boolean | undefined> = {};

  if (!href) {
    // <button> natively handles role
  } else {
    attrs['role'] = 'button';
  }

  if (disabled || loading) {
    attrs['aria-disabled'] = 'true';
    if (loading) {
      attrs['aria-busy'] = 'true';
    }
  }

  return attrs;
}

/**
 * Maps (variant, color, size) to CSS class names applied to the inner element.
 * Used as a shorthand for the component's host element class list.
 */
export function getButtonClassList(options: {
  variant: IoButtonVariant;
  color: IoButtonColor;
  size: IoButtonSize;
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
}): string {
  const { variant, color, size, disabled, loading, fullWidth } = options;
  const classes = [
    `io-button--${variant}`,
    `io-button--${color}`,
    `io-button--${size}`,
  ];

  if (disabled) classes.push('io-button--disabled');
  if (loading)  classes.push('io-button--loading');
  if (fullWidth) classes.push('io-button--full-width');

  return classes.join(' ');
}
