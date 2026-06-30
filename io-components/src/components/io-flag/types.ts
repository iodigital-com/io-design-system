import type { IoIconSize } from '../io-icon/types';

/** ISO 3166-1 alpha-2 country codes for the shipped flag set. */
export type IoFlagName =
  // EU member states
  | 'at' | 'be' | 'bg' | 'cy' | 'cz' | 'de' | 'dk' | 'ee' | 'es'
  | 'fi' | 'fr' | 'gr' | 'hr' | 'hu' | 'ie' | 'it' | 'lt' | 'lu'
  | 'lv' | 'mt' | 'nl' | 'pl' | 'pt' | 'ro' | 'se' | 'si' | 'sk'
  // Key client / iO presence regions
  | 'gb' | 'us' | 'tr' | 'no' | 'ch' | 'au' | 'ca' | 'jp' | 'cn'
  | 'in' | 'br' | 'za' | 'ae';

/** Re-export so consumers can use the same scale as io-icon. */
export type IoFlagSize = IoIconSize;
