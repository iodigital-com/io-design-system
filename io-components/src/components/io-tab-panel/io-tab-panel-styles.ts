/**
 * io-tab-panel CSS-in-JS style generator.
 *
 * Returns a <style> string for the tab-panel component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 */
export function getTabPanelStyles(): string {
  return `
    :host {
      display: block;
    }

    :host([hidden]) {
      display: none !important;
    }

    .tab-panel {
      outline: none;
    }

    .tab-panel:focus-visible {
      box-shadow: var(--io-focus-ring-active);
      border-radius: var(--io-border-radius-xs);
    }
  `;
}
