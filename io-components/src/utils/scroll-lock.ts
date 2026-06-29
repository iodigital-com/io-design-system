/**
 * Refcounted scroll lock — prevents body scroll while overlays are open.
 *
 * Multiple overlays can be stacked (modal on top of flyout). Each overlay calls
 * acquireScrollLock() on open and releaseScrollLock() on close. The body
 * overflow is only restored when the last overlay releases the lock.
 *
 * SSR-safe: all functions are no-ops when `document` is not available.
 */

let lockCount = 0;
let savedOverflow = '';

export function acquireScrollLock(): void {
  if (typeof document === 'undefined') return;
  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount++;
}

export function releaseScrollLock(): void {
  if (typeof document === 'undefined') return;
  if (lockCount <= 0) return;
  lockCount--;
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow;
    savedOverflow = '';
  }
}

/** Exposed for testing only — resets module-level state between test runs. */
export function _resetScrollLock(): void {
  lockCount = 0;
  savedOverflow = '';
}
