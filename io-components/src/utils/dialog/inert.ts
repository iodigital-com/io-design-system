/**
 * Inert-management utilities for overlay components.
 *
 * Applies the `inert` attribute to sibling elements when an overlay opens,
 * preventing screen-reader navigation outside the modal region.
 * Restores the attribute on close.
 */

/**
 * Apply `inert` to all siblings of `overlayEl` in its parent.
 * Returns the list of elements that were inerted so they can be restored.
 */
export function applyBackgroundInert(overlayEl: HTMLElement): HTMLElement[] {
  const parent = overlayEl.parentElement;
  if (!parent) return [];

  const inerted: HTMLElement[] = [];
  Array.from(parent.children).forEach((child) => {
    if (child === overlayEl) return;
    if (['SCRIPT', 'STYLE'].includes(child.tagName)) return;
    const el = child as HTMLElement;
    if (!el.hasAttribute('inert')) {
      el.setAttribute('inert', '');
      inerted.push(el);
    }
  });
  return inerted;
}

/**
 * Remove `inert` from the elements returned by `applyBackgroundInert`.
 */
export function removeBackgroundInert(inerted: HTMLElement[]): void {
  inerted.forEach((el) => el.removeAttribute('inert'));
}
