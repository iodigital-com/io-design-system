/**
 * transitionend listener helper for overlay components.
 *
 * Emits `motionVisibleEnd` / `motionHiddenEnd` events when CSS transitions
 * on the dialog panel complete.
 */

export interface TransitionEndHandle {
  /** Remove the listener and clean up. */
  detach(): void;
}

/**
 * Attach a transitionend listener to `dialogEl`.
 *
 * @param dialogEl - The `<dialog>` element.
 * @param getOpen  - Returns the current open state (called on each event).
 * @param onVisible - Called when transition ends and the overlay is open.
 * @param onHidden  - Called when transition ends and the overlay is closed.
 */
export function attachTransitionEnd(
  dialogEl: HTMLElement,
  getOpen: () => boolean,
  onVisible: () => void,
  onHidden: () => void,
): TransitionEndHandle {
  const handler = () => {
    if (getOpen()) {
      onVisible();
    } else {
      onHidden();
    }
  };
  dialogEl.addEventListener('transitionend', handler);
  return {
    detach() {
      dialogEl.removeEventListener('transitionend', handler);
    },
  };
}
