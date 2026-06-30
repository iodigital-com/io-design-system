/**
 * animateBar — shared JS-driven marker / indicator animation helper.
 *
 * Animates a "bar" element (tab underline indicator, segmented-control thumb,
 * stepper progress fill, etc.) from one anchor element's position to another
 * using the Web Animations API.
 *
 * All motion is JS-driven so positions are read from the DOM at animation
 * time (no stale layout values). The marker element only needs `position:
 * absolute` and `pointer-events: none` — the rest is handled here.
 *
 * Reduced-motion: when `prefers-reduced-motion: reduce` is active the
 * animation duration is forced to 0, resulting in an instant repositioning.
 *
 * Usage:
 *
 *   animateBar(markerEl, fromAnchorEl, toAnchorEl, {
 *     dimension: 'horizontal',   // 'horizontal' | 'vertical'
 *     duration: 300,             // ms (default: 300)
 *     easing: 'ease-in-out',     // CSS easing (default: ease-in-out)
 *   });
 *
 * The marker will be positioned relative to its nearest positioned ancestor.
 * Typically this is a flex container wrapping all anchor elements.
 *
 * @param marker    - The indicator element to animate.
 * @param fromAnchor - The element the marker is moving FROM.
 * @param toAnchor   - The element the marker is moving TO.
 * @param options    - Animation options.
 */

export interface AnimateBarOptions {
  /**
   * Whether the bar slides horizontally (tab underline, segmented thumb)
   * or vertically (vertical tabs). Defaults to 'horizontal'.
   */
  dimension?: 'horizontal' | 'vertical';
  /** Animation duration in ms. Defaults to 300. */
  duration?: number;
  /** CSS easing function. Defaults to 'ease-in-out'. */
  easing?: string;
}

/**
 * Returns true when the user has requested reduced motion.
 * Guards against SSG/Node environments where window is unavailable.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animate `marker` from its current position to the position of `toAnchor`.
 * The `fromAnchor` is used for the initial position when the bar has not yet
 * been positioned (e.g. on first render). Pass the same element as both
 * `fromAnchor` and `toAnchor` to skip animation and snap to position.
 */
export function animateBar(
  marker: HTMLElement,
  fromAnchor: Element,
  toAnchor: Element,
  options: AnimateBarOptions = {},
): void {
  const { dimension = 'horizontal', easing = 'ease-in-out' } = options;
  const duration = prefersReducedMotion() ? 0 : (options.duration ?? 300);

  // Cancel any in-flight animation to prevent jank
  marker.getAnimations().forEach((anim) => anim.cancel());

  const markerParent = marker.offsetParent ?? marker.parentElement;
  if (!markerParent) return;

  const parentRect = markerParent.getBoundingClientRect();
  const fromRect = fromAnchor.getBoundingClientRect();
  const toRect = toAnchor.getBoundingClientRect();

  const fromOffset =
    dimension === 'horizontal' ? fromRect.left - parentRect.left : fromRect.top - parentRect.top;
  const toOffset =
    dimension === 'horizontal' ? toRect.left - parentRect.left : toRect.top - parentRect.top;

  const fromSize = dimension === 'horizontal' ? fromRect.width : fromRect.height;
  const toSize = dimension === 'horizontal' ? toRect.width : toRect.height;

  const translateProp = dimension === 'horizontal' ? 'translateX' : 'translateY';
  const sizeProp = dimension === 'horizontal' ? 'width' : 'height';

  if (duration === 0) {
    // Instant snap — no animation
    marker.style[sizeProp] = `${toSize}px`;
    marker.style.transform = `${translateProp}(${toOffset}px)`;
    return;
  }

  marker.animate(
    [
      {
        transform: `${translateProp}(${fromOffset}px)`,
        [sizeProp]: `${fromSize}px`,
      },
      {
        transform: `${translateProp}(${toOffset}px)`,
        [sizeProp]: `${toSize}px`,
      },
    ],
    {
      duration,
      easing,
      fill: 'forwards',
    },
  );
}
