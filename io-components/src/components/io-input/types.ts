/** HTML input type for io-input */
export type IoInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'number'
  | 'date'
  | 'time';

/** Visual size scale aligned with io-button sizing tokens */
export type IoInputSize = 'sm' | 'md' | 'lg';

/** Native inputmode values — hints the virtual keyboard type on mobile */
export type IoInputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';
