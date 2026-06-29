/**
 * Motion composition helpers.
 *
 * These helpers build CSS transition/animation strings that:
 * 1. Compose the separate duration and easing scales explicitly.
 * 2. Wrap durations with --io-transition-duration / --io-animation-duration
 *    override hooks so consumers (and test setups) can collapse all motion
 *    to 0s in one place without touching component styles.
 *
 * Usage:
 *   import { getTransition, getAnimation } from '../../utils/motion';
 *
 *   // In a -styles.ts file:
 *   transition: ${getTransition('color', 'sm', 'out')};
 *   // → color var(--io-transition-duration, var(--io-duration-sm)) var(--io-ease-out)
 *
 *   animation: ${getAnimation('io-spin', 'lg', 'in')};
 *   // → io-spin var(--io-animation-duration, var(--io-duration-lg)) var(--io-ease-in) linear infinite
 *
 * Override hooks (public-api tokens):
 *   --io-transition-duration  Set to 0s to disable all transitions globally.
 *   --io-animation-duration   Set to 0s to disable all animations globally.
 *
 * Vitest setup injects both as 0s for deterministic specs — see
 *   io-components/tests/unit/config/vitest.setup.ts
 */

/** Valid duration tier names (maps to --io-duration-{tier}) */
export type DurationTier = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Valid easing names (maps to --io-ease-{easing}) */
export type EasingName = 'in' | 'out' | 'in-out';

/**
 * Returns a CSS transition value string for a single property.
 *
 * The duration is wrapped with the global --io-transition-duration override
 * hook so consumers and test environments can collapse motion atomically.
 *
 * @param prop     CSS property to transition (e.g. 'color', 'opacity').
 * @param duration Duration tier key ('xs' | 'sm' | 'md' | 'lg' | 'xl').
 * @param easing   Easing key ('in' | 'out' | 'in-out').
 * @param delay    Optional delay string (e.g. '50ms'). Omit for no delay.
 *
 * @example
 *   getTransition('color', 'sm', 'out')
 *   // → 'color var(--io-transition-duration, var(--io-duration-sm)) var(--io-ease-out)'
 *
 *   getTransition('opacity', 'md', 'in-out', '50ms')
 *   // → 'opacity var(--io-transition-duration, var(--io-duration-md)) var(--io-ease-in-out) 50ms'
 */
export function getTransition(
  prop: string,
  duration: DurationTier,
  easing: EasingName,
  delay?: string
): string {
  const dur = `var(--io-transition-duration, var(--io-duration-${duration}))`;
  const ease = `var(--io-ease-${easing})`;
  return delay
    ? `${prop} ${dur} ${ease} ${delay}`
    : `${prop} ${dur} ${ease}`;
}

/**
 * Returns a CSS animation value string for keyframe-driven animations.
 *
 * The duration is wrapped with the global --io-animation-duration override
 * hook. Use `iteration` and `fill` for timing function / play state control.
 *
 * @param name      @keyframes animation name (e.g. 'io-spin', 'io-modal-in').
 * @param duration  Duration tier key ('xs' | 'sm' | 'md' | 'lg' | 'xl').
 * @param easing    Easing key ('in' | 'out' | 'in-out').
 * @param iteration Iteration count (default: 'infinite').
 * @param fill      Fill mode (default: 'none').
 *
 * @example
 *   getAnimation('io-spin', 'lg', 'in')
 *   // → 'io-spin var(--io-animation-duration, var(--io-duration-lg)) var(--io-ease-in) infinite'
 *
 *   getAnimation('io-modal-in', 'md', 'out', '1', 'both')
 *   // → 'io-modal-in var(--io-animation-duration, var(--io-duration-md)) var(--io-ease-out) 1 both'
 */
export function getAnimation(
  name: string,
  duration: DurationTier,
  easing: EasingName,
  iteration: string | number = 'infinite',
  fill: string = 'none'
): string {
  const dur = `var(--io-animation-duration, var(--io-duration-${duration}))`;
  const ease = `var(--io-ease-${easing})`;
  const fillStr = fill !== 'none' ? ` ${fill}` : '';
  return `${name} ${dur} ${ease} ${iteration}${fillStr}`;
}

/**
 * Returns the correct translate3d() expression for an overlay entrance
 * direction, referencing the appropriate directional offset token.
 *
 * @param direction  'up' | 'down' | 'start' | 'end'
 *
 * @example
 *   getEnterTransform('up')
 *   // → 'translate3d(0, var(--io-motion-entrance-offset-up), 0)'
 *
 *   getEnterTransform('start')
 *   // → 'translate3d(calc(-1 * var(--io-motion-entrance-offset-start)), 0, 0)'
 */
export function getEnterTransform(direction: 'up' | 'down' | 'start' | 'end'): string {
  switch (direction) {
    case 'up':
      return 'translate3d(0, var(--io-motion-entrance-offset-up), 0)';
    case 'down':
      return 'translate3d(0, calc(-1 * var(--io-motion-entrance-offset-down)), 0)';
    case 'start':
      return 'translate3d(calc(-1 * var(--io-motion-entrance-offset-start)), 0, 0)';
    case 'end':
      return 'translate3d(var(--io-motion-entrance-offset-end), 0, 0)';
  }
}
