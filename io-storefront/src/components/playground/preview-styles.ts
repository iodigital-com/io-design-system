/**
 * Shared preview-canvas class for form-field components (io-input,
 * io-input-date, io-input-password, io-input-search, io-multi-select,
 * io-select, io-textarea) so every form field previews at one consistent,
 * intentional width instead of stretching edge-to-edge across the canvas.
 *
 * Unlike a preview-wrapper style override, this targets the component
 * instance itself via a child selector — the Playground preview canvas
 * stays full width and centered (`flex items-center justify-center`); only
 * the field inside it is bounded to a natural form-control width.
 */
export const FORM_PREVIEW_CLASSNAME =
  '[&_io-input]:w-full [&_io-input]:max-w-sm ' +
  '[&_io-input-date]:w-full [&_io-input-date]:max-w-sm ' +
  '[&_io-input-password]:w-full [&_io-input-password]:max-w-sm ' +
  '[&_io-input-search]:w-full [&_io-input-search]:max-w-sm ' +
  '[&_io-multi-select]:w-full [&_io-multi-select]:max-w-sm ' +
  '[&_io-select]:w-full [&_io-select]:max-w-sm ' +
  '[&_io-textarea]:w-full [&_io-textarea]:max-w-sm';

/**
 * Shared preview-canvas class for io-button-tile / io-link-tile.
 *
 * Both components render `:host { display: block }` with every visible
 * child absolutely positioned (media, overlay), so the host has no
 * intrinsic size. Inside the Playground's flex preview canvas this
 * collapses the host to 0×0. Give each tile instance an explicit width so
 * `aspect-ratio` on the host has something to resolve against.
 */
export const TILE_PREVIEW_CLASSNAME = '[&_io-button-tile]:w-64 [&_io-link-tile]:w-64';
