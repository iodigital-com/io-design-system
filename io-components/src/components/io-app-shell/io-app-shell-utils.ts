/**
 * io-app-shell utilities.
 *
 * Pure functions — unit-testable with no DOM dependencies.
 */

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Returns all focusable elements within the given container, including
 * elements in slotted light DOM.
 */
export function getShellFocusableElements(container: HTMLElement): HTMLElement[] {
  const shadowFocusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));

  const slots = Array.from(container.querySelectorAll('slot')) as HTMLSlotElement[];
  const slottedFocusable = slots.flatMap(slot =>
    Array.from(slot.assignedElements({ flatten: true })).flatMap(el => {
      const matches: HTMLElement[] = [];
      if ((el as HTMLElement).matches?.(FOCUSABLE_SELECTORS)) matches.push(el as HTMLElement);
      matches.push(...Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)));
      return matches;
    }),
  );

  return [...shadowFocusable, ...slottedFocusable];
}
