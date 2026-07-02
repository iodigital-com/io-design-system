/**
 * io-product-tile — pure utility functions
 */

/** Heart icon SVG for the like button — filled vs outlined */
export function getHeartIcon(filled: boolean): string {
  if (filled) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
}

/**
 * Validate href + slotted anchor combination.
 * Providing both an `href` prop and a slotted `<a>` is ambiguous and disallowed.
 */
export function validateProductTileUsage(
  href: string | undefined,
  hasSlottedAnchor: boolean,
): void {
  if (href && hasSlottedAnchor) {
    console.error(
      '[io-product-tile] Ambiguous usage: provide either the `href` prop or a slotted <a> element — not both.',
    );
  }
}
