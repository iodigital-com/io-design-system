/** Payload emitted by the change event */
export type IoSwitchChangeDetail = {
  checked: boolean;
  value: string;
};

/** Label alignment relative to the toggle */
export type IoSwitchAlignLabel = 'start' | 'end';

/** All valid IoSwitchAlignLabel values — used by the storefront configurator */
export const IoSwitchAlignLabelValues = ['start', 'end'] as const;
