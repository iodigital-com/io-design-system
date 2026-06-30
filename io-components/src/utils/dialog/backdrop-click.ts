/**
 * Backdrop-click detection for overlay components.
 *
 * When an overlay uses `show()` (non-top-layer mode), a wrapper div acts as the
 * backdrop. Clicks on the wrapper that do NOT hit the dialog panel should close.
 */

/**
 * Returns true when the click hit outside the dialog panel rect.
 * Used for `<dialog>` elements that use `show()` (non-showModal path) where
 * the ::backdrop pseudo-element is unavailable.
 */
export function isBackdropClick(
  rect: DOMRect,
  clientX: number,
  clientY: number,
): boolean {
  return (
    clientX < rect.left ||
    clientX > rect.right ||
    clientY < rect.top ||
    clientY > rect.bottom
  );
}
