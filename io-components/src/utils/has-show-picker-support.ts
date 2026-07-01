/**
 * Detects whether the browser supports HTMLInputElement.showPicker().
 *
 * showPicker() is available in Chromium 99+, Safari 16+, Firefox 101+.
 * Falls back gracefully: callers render a decorative icon instead of an
 * interactive trigger button when support is absent.
 *
 * Guard: `typeof HTMLInputElement !== 'undefined'` prevents crashes in
 * Node.js / jsdom environments during SSG (Next.js static build).
 */
export function hasShowPickerSupport(): boolean {
  return typeof HTMLInputElement !== 'undefined' && 'showPicker' in HTMLInputElement.prototype;
}
