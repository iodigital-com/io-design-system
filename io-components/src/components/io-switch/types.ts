/** Payload emitted by the change event */
export type IoSwitchChangeDetail = {
  checked: boolean;
  value: string;
};

/** Label alignment relative to the toggle */
export type IoSwitchAlignLabel = 'start' | 'end';
