/** Orientation of the separator line */
export type IoDividerOrientation = 'horizontal' | 'vertical';

/**
 * Color contrast level for the divider.
 *
 * - `subtle`  — 50% opacity of the standard border color; very light separation.
 * - `default` — `var(--io-border)` (standard decorative border token).
 * - `strong`  — `var(--io-border-hover)` (more prominent separation).
 */
export type IoDividerColor = 'subtle' | 'default' | 'strong';
