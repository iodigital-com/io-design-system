/**
 * swipe-to-dismiss.ts
 * ===================
 * Shared utility for attaching / detaching vertical swipe-to-dismiss gesture
 * listeners on an element. Used by io-drawer (placement=bottom) and io-sheet.
 *
 * The gesture fires `onDismiss` when the user swipes downward by at least
 * `threshold` pixels from the start of the touch.
 */

export const SWIPE_CLOSE_THRESHOLD = 80;

export interface SwipeToDismissOptions {
  /** Element to attach touch listeners to (typically the drag handle) */
  el: HTMLElement;
  /** Called when swipe distance exceeds the threshold */
  onDismiss: () => void;
  /** Minimum Y-delta (px) to trigger dismiss. Defaults to SWIPE_CLOSE_THRESHOLD */
  threshold?: number;
}

export interface SwipeToDismissHandlers {
  touchstart: (ev: TouchEvent) => void;
  touchmove: (ev: TouchEvent) => void;
  touchend: (ev: TouchEvent) => void;
}

/**
 * Attach swipe-to-dismiss listeners to `options.el`.
 * Returns the handlers object so the caller can later pass it to `detachSwipeToDismiss`.
 */
export function attachSwipeToDismiss(options: SwipeToDismissOptions): SwipeToDismissHandlers {
  const { el, onDismiss, threshold = SWIPE_CLOSE_THRESHOLD } = options;
  let startY = 0;

  const handlers: SwipeToDismissHandlers = {
    touchstart: (ev: TouchEvent) => {
      startY = ev.touches[0]?.clientY ?? 0;
    },
    touchmove: () => {
      // Reserved for future drag-feedback visual
    },
    touchend: (ev: TouchEvent) => {
      const endY = ev.changedTouches[0]?.clientY ?? 0;
      if (endY - startY >= threshold) {
        onDismiss();
      }
    },
  };

  el.addEventListener('touchstart', handlers.touchstart, { passive: true });
  el.addEventListener('touchmove', handlers.touchmove, { passive: true });
  el.addEventListener('touchend', handlers.touchend, { passive: true });

  return handlers;
}

/**
 * Remove swipe-to-dismiss listeners previously attached via `attachSwipeToDismiss`.
 */
export function detachSwipeToDismiss(el: HTMLElement, handlers: SwipeToDismissHandlers): void {
  el.removeEventListener('touchstart', handlers.touchstart);
  el.removeEventListener('touchmove', handlers.touchmove);
  el.removeEventListener('touchend', handlers.touchend);
}
