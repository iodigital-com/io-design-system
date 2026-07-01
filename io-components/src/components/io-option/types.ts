export type IoOptionSelectDetail = { value: string; label: string };

/**
 * Detail of the `optionConnect` event dispatched by io-option in connectedCallback.
 * Enables parent io-select / io-multi-select to self-register options
 * without relying on a setTimeout polling hack.
 */
export type IoOptionConnectDetail = {
  value: string;
  label: string;
  disabled: boolean;
  /** Optional icon name forwarded from the `icon` prop. */
  icon?: string;
};
