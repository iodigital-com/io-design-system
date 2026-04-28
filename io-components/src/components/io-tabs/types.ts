export interface IoTabItem {
  label: string;
  value: string;
  disabled?: boolean;
  /**
   * Optional external panel linkage for backward compatibility.
   * io-tabs does not manage panel rendering; consumers may still wire aria-controls.
   */
  panelId?: string;
}

export interface IoTabsUpdateDetail {
  activeTab: string;
  activeTabIndex: number;
}
