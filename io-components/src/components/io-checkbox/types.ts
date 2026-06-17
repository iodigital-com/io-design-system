/** Payload emitted by the change event */
export type IoCheckboxChangeDetail = {
  checked: boolean;
  value: string;
};

/** Payload emitted by the blur event — the native FocusEvent from the inner input */
export type IoCheckboxBlurEventDetail = FocusEvent;
