/**
 * io-scroller utilities.
 *
 * Pure functions for building CSS class strings.
 * No side effects — safe to use in both component render and unit tests.
 */

import type { IoScrollerOrientation } from './types';

export function getScrollerClass(
  orientation: IoScrollerOrientation,
  showScrollbar: boolean,
): string {
  return [
    'scroller',
    `scroller--${orientation}`,
    showScrollbar ? 'scroller--show-scrollbar' : 'scroller--hide-scrollbar',
  ]
    .filter(Boolean)
    .join(' ');
}
