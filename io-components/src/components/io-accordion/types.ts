/** Emitted when an accordion item is opened or closed */
export interface IoAccordionChangeDetail {
  /** Index of the accordion item that changed */
  index: number;
  /** Whether the item is now open */
  open: boolean;
}

/** Emitted when a single accordion item is toggled */
export interface IoAccordionUpdateDetail {
  /** Whether the accordion is now open */
  open: boolean;
}

/** Allowed heading tag names in single-item mode */
export type IoAccordionHeadingTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
