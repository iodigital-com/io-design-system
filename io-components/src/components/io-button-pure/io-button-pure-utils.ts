import type { IoButtonPureAlignLabel } from './types';

/**
 * Build the CSS class list for the inner button/anchor element.
 */
export function getButtonPureClassList(opts: {
  disabled: boolean;
  active: boolean;
  underline: boolean;
  stretch: boolean;
  alignLabel: IoButtonPureAlignLabel;
}): string {
  const classes = ['btn-pure'];
  if (opts.disabled) classes.push('btn-pure--disabled');
  if (opts.active) classes.push('btn-pure--active');
  if (opts.underline) classes.push('btn-pure--underline');
  if (opts.stretch) classes.push('btn-pure--stretch');
  classes.push(`btn-pure--align-${opts.alignLabel}`);
  return classes.join(' ');
}
