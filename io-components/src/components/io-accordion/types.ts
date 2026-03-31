/** Emitted when an accordion item is opened or closed */
export interface IoAccordionChangeDetail {
  /** Index of the accordion item that changed */
  index: number;
  /** Whether the item is now open */
  open: boolean;
}
