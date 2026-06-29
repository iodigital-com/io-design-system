/**
 * Returns true when the browser supports `transition-behavior: allow-discrete`
 * (Chromium 117+). In supported browsers, the top-layer exit transition plays
 * fully before the dialog is removed — no deferred close needed.
 *
 * In unsupported browsers (Safari, Firefox) `dialog.close()` removes the
 * element from the top-layer synchronously, cutting off CSS exit animations.
 * Use this flag to decide whether to defer `close()` until `transitionend`.
 */
let _cached: boolean | undefined;

export function supportsOverlayTransition(): boolean {
  if (typeof CSS === 'undefined') return false;
  if (_cached === undefined) {
    _cached = CSS.supports('transition-behavior', 'allow-discrete');
  }
  return _cached;
}

/** Exposed for testing only — clears the cached result. */
export function _resetSupportsCache(): void {
  _cached = undefined;
}
