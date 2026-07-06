import type React from 'react';

/**
 * Shared preview-canvas style for Category B form-field components
 * (io-input, io-textarea, io-select, io-multi-select, io-input-date,
 * io-input-search, io-input-password, io-pin-code, io-switch, io-checkbox,
 * io-radio) so every form field previews at one consistent, intentional
 * width instead of stretching to fill the full canvas.
 *
 * Stretches the field to a natural form-control width, then centers that
 * fixed-width block within the (full-bleed) Playground preview container.
 */
export const FORM_FIELD_PREVIEW_STYLE: React.CSSProperties = {
  flexDirection: 'column',
  alignItems: 'stretch',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
};

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
