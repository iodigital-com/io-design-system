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
