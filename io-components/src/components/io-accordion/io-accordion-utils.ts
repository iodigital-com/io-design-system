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

/**
 * Returns all sibling `io-accordion` elements sharing the same parent element
 * as the given host. Used for ArrowUp/Down/Home/End keyboard navigation.
 *
 * @param host - The `io-accordion` element to find siblings for.
 * @returns Array of sibling `io-accordion` elements in DOM order, including `host`.
 */
export function getSiblingTriggers(host: HTMLElement): HTMLElement[] {
  const parent = host.parentElement;
  if (!parent) return [];
  return Array.from(parent.querySelectorAll<HTMLElement>(':scope > io-accordion'));
}
