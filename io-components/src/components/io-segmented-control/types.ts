export interface IoSegmentedControlChangeDetail {
  value: string;
}

/**
 * Number of equal-width columns for the segmented-control bar.
 * `'auto'` (default) uses flex layout (content-sized items).
 * A numeric value switches to a CSS grid with that many equal-width tracks.
 * #1063
 */
export type IoSegmentedControlColumns = 'auto' | number;
