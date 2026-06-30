/**
 * Shared dialog utilities for overlay components.
 *
 * Re-exported from a single entry point so components can import from one place:
 *   import { lockBodyScroll, attachFocusTrap, ... } from '../../utils/dialog';
 */

export { lockBodyScroll, unlockBodyScroll } from './scroll-lock';
export { attachFocusTrap } from './focus-trap';
export type { FocusTrap } from './focus-trap';
export { isBackdropClick } from './backdrop-click';
export { applyBackgroundInert, removeBackgroundInert } from './inert';
export { attachTransitionEnd } from './transition-end';
export type { TransitionEndHandle } from './transition-end';
