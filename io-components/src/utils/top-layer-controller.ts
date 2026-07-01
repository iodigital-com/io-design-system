/**
 * Top-layer controller — defer overlay close until exit transition completes.
 *
 * When a `<dialog>` is closed or `hidePopover()` is called, the browser
 * removes the element from the CSS top-layer immediately, cutting off any
 * CSS exit animation. This controller delays the actual close call until
 * the transition finishes.
 *
 * Two strategies are used:
 *  1. Chromium (supports `transition-behavior: allow-discrete`): CSS handles
 *     keeping the element on #top-layer through `overlay` transitions.
 *  2. Safari / Firefox (no allow-discrete): reads the longest computed
 *     transition-duration / animation-duration and waits that long before
 *     calling the close callback.
 *
 * The `prefers-reduced-motion` path is respected automatically — if the
 * computed duration is 0ms the close is synchronous.
 *
 * Usage:
 *
 *   const ctrl = createTopLayerController(dialogEl, {
 *     onHide: () => dialogEl.close(),
 *   });
 *
 *   // Open:
 *   ctrl.requestShow();
 *
 *   // Close (runs transition first, then calls onHide):
 *   ctrl.requestHide();
 *
 *   // Cleanup when component unmounts:
 *   ctrl.destroy();
 */

export interface TopLayerControllerOptions {
  /** Called when it is safe to actually close/hide the element. */
  onHide: () => void;
  /** Called immediately when show is requested (before transitions). */
  onShow?: () => void;
}

export interface TopLayerController {
  /** Trigger the show sequence. Calls options.onShow() immediately. */
  requestShow(): void;
  /**
   * Trigger the hide sequence.
   * On browsers with allow-discrete support, adds a CSS class to start
   * the exit transition; the browser keeps the element on #top-layer
   * until overlay transitions finish.
   * On other browsers, waits for the computed transition/animation
   * duration before calling onHide().
   */
  requestHide(): void;
  /** Clean up pending timers. */
  destroy(): void;
}

/** Feature-detect `transition-behavior: allow-discrete` support. */
export function supportsAllowDiscrete(): boolean {
  if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') return false;
  return CSS.supports('transition-behavior', 'allow-discrete');
}

/**
 * Return the longest transition or animation duration (in ms) for `el`.
 * Returns 0 if durations cannot be read (e.g. in jsdom).
 */
export function getMaxTransitionDurationMs(el: Element): number {
  if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') return 0;
  try {
    const style = window.getComputedStyle(el);
    const parseMs = (s: string): number => {
      const values = s.split(',').map((v) => {
        const trimmed = v.trim();
        if (trimmed.endsWith('ms')) return parseFloat(trimmed);
        if (trimmed.endsWith('s')) return parseFloat(trimmed) * 1000;
        return 0;
      });
      return Math.max(0, ...values);
    };
    const transitionMs = parseMs(style.transitionDuration || '0s');
    const animationMs = parseMs(style.animationDuration || '0s');
    return Math.max(transitionMs, animationMs);
  } catch {
    return 0;
  }
}

const ALLOW_DISCRETE_CLASS = 'top-layer--closing';

/**
 * Create a top-layer controller for the given overlay element.
 *
 * @param el - The overlay element (`<dialog>` or popover element).
 * @param options - Callbacks for show/hide lifecycle.
 */
export function createTopLayerController(
  el: Element,
  options: TopLayerControllerOptions,
): TopLayerController {
  let hideTimer: ReturnType<typeof setTimeout> | null = null;

  function clearTimer(): void {
    if (hideTimer !== null) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  function requestShow(): void {
    clearTimer();
    el.classList.remove(ALLOW_DISCRETE_CLASS);
    options.onShow?.();
  }

  function requestHide(): void {
    clearTimer();

    if (supportsAllowDiscrete()) {
      // Add closing class — CSS handles transition-behavior: allow-discrete
      // for `overlay` and `display` so the element stays on #top-layer.
      el.classList.add(ALLOW_DISCRETE_CLASS);
      // We listen for transitionend/animationend to call onHide.
      // If no transitions fire we call synchronously after a microtask.
      const duration = getMaxTransitionDurationMs(el);
      if (duration <= 0) {
        el.classList.remove(ALLOW_DISCRETE_CLASS);
        options.onHide();
        return;
      }

      let settled = false;
      const settle = (): void => {
        if (settled) return;
        settled = true;
        clearTimer();
        el.classList.remove(ALLOW_DISCRETE_CLASS);
        el.removeEventListener('transitionend', settle);
        el.removeEventListener('animationend', settle);
        options.onHide();
      };

      el.addEventListener('transitionend', settle, { once: true });
      el.addEventListener('animationend', settle, { once: true });
      // Fallback: if the event never fires, clean up after duration + 100ms
      hideTimer = setTimeout(settle, duration + 100);
    } else {
      // Safari / Firefox fallback: wait for computed duration then close
      const duration = getMaxTransitionDurationMs(el);
      if (duration <= 0) {
        options.onHide();
        return;
      }
      hideTimer = setTimeout(() => {
        hideTimer = null;
        options.onHide();
      }, duration + 50);
    }
  }

  function destroy(): void {
    clearTimer();
    el.classList.remove(ALLOW_DISCRETE_CLASS);
  }

  return { requestShow, requestHide, destroy };
}
