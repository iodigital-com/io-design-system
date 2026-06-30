/**
 * Scroll-lock utilities for overlay components (modal, drawer, flyout, sheet).
 *
 * Saves and restores body overflow so concurrent overlays restore correctly.
 */

let lockCount = 0;
let savedOverflow = '';

/**
 * Prevent body from scrolling. Call once per overlay open.
 * Ref-counted — only the first call actually sets overflow.
 */
export function lockBodyScroll(): void {
  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount++;
}

/**
 * Restore body scroll. Call once per overlay close.
 * Ref-counted — only the last call actually restores overflow.
 */
export function unlockBodyScroll(): void {
  if (lockCount <= 0) return;
  lockCount--;
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow;
    savedOverflow = '';
  }
}
