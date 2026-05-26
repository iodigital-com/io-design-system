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
  atStart: boolean,
  atEnd: boolean,
): string {
  return [
    'scroller',
    `scroller--${orientation}`,
    showScrollbar ? 'scroller--show-scrollbar' : 'scroller--hide-scrollbar',
    !atStart ? 'scroller--fade-start' : '',
    !atEnd ? 'scroller--fade-end' : '',
  ]
    .filter(Boolean)
    .join(' ');
}
