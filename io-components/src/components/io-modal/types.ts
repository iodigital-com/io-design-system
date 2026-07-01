export type IoModalSize = 'sm' | 'md' | 'lg';

/**
 * When true, the modal expands to fill the full viewport at or below
 * --io-modal-fullscreen-breakpoint (default 640px), while remaining
 * centered at larger breakpoints.
 */
export type IoModalFullscreen = boolean;

/**
 * Background surface level for the io-modal panel.
 * - canvas:   var(--io-bg-page) — default page background
 * - surface:  var(--io-bg-surface) — slightly elevated surface
 * - elevated: var(--io-bg-raised) + var(--io-shadow-xl) — floating overlay level
 */
export type IoModalBackground = 'canvas' | 'surface' | 'elevated';

/**
 * Backdrop treatment behind the modal panel.
 * - blur:    var(--io-backdrop-blur) backdrop-filter — use when the user explicitly opened the modal (default).
 * - shading: solid var(--io-bg-overlay) with no backdrop-filter — use for auto-appearing dialogs (e.g. cookie consent)
 *            where the blur GPU cost is undesirable on low-end devices.
 */
export type IoModalAriaProps = Partial<
  Record<'aria-label' | 'aria-labelledby' | 'aria-describedby', string>
>;

/**
 * Backdrop visual treatment for io-modal.
 * - blur:    backdrop-filter blur (default) — for user-initiated dialogs
 * - shading: solid overlay color without backdrop-filter — for auto-appearing dialogs
 *            (e.g. cookie consent), avoids expensive GPU compositing on low-end devices
 */
export type IoModalBackdrop = 'blur' | 'shading';
