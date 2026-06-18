/** Visual variant — controls fill style */
export type IoButtonVariant = 'solid' | 'ghost' | 'link';

/**
 * Color theme for the button.
 * Each color maps to CSS class selectors in io-button-styles.ts.
 * Note: 'grey' is only meaningful with variant='ghost'.
 */
export type IoButtonColor =
  | 'blue'
  | 'white'
  | 'black'
  | 'antraciet'
  | 'orange'
  | 'pink'
  | 'rouge'
  | 'yellow'
  | 'beige'
  | 'grey';

/** Size preset — controls padding and minimum height */
export type IoButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/** HTML button type */
export type IoButtonType = 'button' | 'submit' | 'reset';

/** Direction of the optional animated arrow icon. Omit the prop to hide the arrow. */
export type IoButtonArrow = 'forward' | 'back' | 'down';

/** Side on which the arrow icon is rendered. Defaults to 'right'. */
export type IoButtonArrowPlacement = 'left' | 'right';

/**
 * ARIA attributes that are semantically meaningful for a button or link-button.
 * Used to type the `aria` escape-hatch prop so TypeScript consumers get compile-time guidance.
 */
export const IO_BUTTON_ARIA_ATTRIBUTES = [
  'aria-label',
  'aria-description',
  'aria-expanded',
  'aria-pressed',
  'aria-haspopup',
  'aria-controls',
  'aria-labelledby',
  'aria-describedby',
] as const;

export type IoButtonAriaAttribute = (typeof IO_BUTTON_ARIA_ATTRIBUTES)[number];
