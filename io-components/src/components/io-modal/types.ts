export type IoModalSize = 'sm' | 'md' | 'lg';

/**
 * Background surface level for the io-modal panel.
 * - canvas:   var(--io-bg-page) — default page background
 * - surface:  var(--io-bg-surface) — slightly elevated surface
 * - elevated: var(--io-bg-raised) + var(--io-shadow-xl) — floating overlay level
 */
export type IoModalBackground = 'canvas' | 'surface' | 'elevated';

/**
 * Allowed ARIA attribute keys for the io-modal `aria` prop.
 * Restricted to attributes that are meaningful on a `<dialog>` element.
 * Consumers who need other aria attributes should use the host element directly.
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
