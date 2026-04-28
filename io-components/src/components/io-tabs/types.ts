export interface IoTabItem {
  label: string;
  value: string;
  disabled?: boolean;
  /**
   * ID of the associated `role="tabpanel"` element in the host document.
   * When provided, `aria-controls` on the tab button is set to this value,
   * correctly linking the tab to its panel across the shadow-DOM boundary.
   * When omitted, `aria-controls` is not rendered (no dangling IDREFs).
   */
  panelId?: string;
}
