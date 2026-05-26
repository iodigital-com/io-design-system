/** Controls how the textarea can be resized by the user */
export type IoTextareaResize =
  | 'none'      // not resizable
  | 'vertical'  // user can drag vertically
  | 'auto';     // grows automatically with content (JS-driven)

/** Visual size scale aligned with io-button sizing tokens */
export type IoTextareaSize = 'sm' | 'md' | 'lg';

/** Native wrap attribute for textarea — controls how newlines are submitted */
export type IoTextareaWrap = 'soft' | 'hard' | 'off';
