/** Orientation of the separator line */
export type IoDividerOrientation = 'horizontal' | 'vertical';

/**
 * Responsive orientation — accepts either a fixed scalar string or a breakpoint
 * object for responsive layouts.
 *
 * @example
 * orientation="horizontal"
 * :orientation="{ base: 'horizontal', l: 'vertical' }"
 * orientation='{"base":"horizontal","l":"vertical"}'
 */
export type IoDividerOrientationBreakpoint = IoDividerOrientation | Record<string, IoDividerOrientation>;

/**
 * Color contrast level for the divider.
 *
 * - `subtle`  — 50% opacity of the standard border color; very light separation.
 * - `default` — `var(--io-border)` (standard decorative border token).
 * - `strong`  — `var(--io-border-hover)` (more prominent separation).
 */
export type IoDividerColor = 'subtle' | 'default' | 'strong';
