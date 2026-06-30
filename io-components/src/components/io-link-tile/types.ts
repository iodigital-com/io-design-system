/**
 * io-link-tile / io-button-tile shared type unions.
 */

/** Media aspect ratio presets. */
export type IoTileAspectRatio = '1/1' | '4/3' | '3/4' | '16/9';

/** Text alignment within the tile overlay. */
export type IoTileAlign = 'top' | 'bottom';

/** Label/description text size preset. */
export type IoTileSize = 'sm' | 'md' | 'lg';

/** Font weight of the tile label. */
export type IoTileWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export const IO_TILE_ASPECT_RATIO_VALUES: IoTileAspectRatio[] = ['1/1', '4/3', '3/4', '16/9'];
export const IO_TILE_ALIGN_VALUES: IoTileAlign[] = ['top', 'bottom'];
export const IO_TILE_SIZE_VALUES: IoTileSize[] = ['sm', 'md', 'lg'];
export const IO_TILE_WEIGHT_VALUES: IoTileWeight[] = ['regular', 'medium', 'semibold', 'bold'];

/** io-button-tile click event detail. */
export interface IoButtonTileClickDetail {
  originalEvent: MouseEvent | KeyboardEvent;
}
