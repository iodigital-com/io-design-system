/**
 * Returns a stable base ID for the accordion, preferring the host's
 * existing `id` attribute over a random fallback.
 */
export function getAccordionBaseId(hostId: string): string {
  return hostId || `io-accordion-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Builds the CSS class string for `.accordion-item`.
 */
export function getAccordionItemClass(options: {
  open: boolean;
  disabled: boolean;
}): string {
  const { open, disabled } = options;
  const classes = ['accordion-item', 'accordion-item--first'];
  if (open) classes.push('accordion-item--open');
  if (disabled) classes.push('accordion-item--disabled');
  return classes.join(' ');
}
