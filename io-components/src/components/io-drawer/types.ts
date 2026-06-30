export type IoDrawerPlacement = 'left' | 'right' | 'bottom';
export type IoDrawerSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * Background surface level for the io-drawer panel.
 * - canvas:   var(--io-bg-page) — default page background
 * - surface:  var(--io-bg-surface) — slightly elevated surface
 * - elevated: var(--io-bg-raised) + var(--io-shadow-xl) — floating overlay level
 */
export type IoDrawerBackground = 'canvas' | 'surface' | 'elevated';

/**
 * Allowed ARIA attribute keys for the io-drawer `aria` prop.
 * Restricted to attributes that are meaningful on a `<dialog>` element.
 */
export type IoDrawerAriaProps = Partial<
  Record<'aria-label' | 'aria-labelledby' | 'aria-describedby', string>
>;
