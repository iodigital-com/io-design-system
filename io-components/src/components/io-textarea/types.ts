/** Controls how the textarea can be resized by the user */
export type IoTextareaResize =
  | 'none'      // not resizable
  | 'vertical'  // user can drag vertically
  | 'auto';     // grows automatically with content (JS-driven)
