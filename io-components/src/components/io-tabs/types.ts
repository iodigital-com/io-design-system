export interface IoTabsUpdateDetail {
  /** The 0-based index of the newly activated tab. */
  activeTabIndex: number;
}

/** Detail emitted by the io-tabs `tabClose` event. */
export interface IoTabsCloseDetail {
  /** The 0-based index of the tab that was closed. */
  index: number;
}

export type IoTabsSize = 'small' | 'medium' | 'compact';
