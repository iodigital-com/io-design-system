/**
 * io-pin-code type unions
 *
 * All exported types follow the naming convention:
 *   IoPinCode{PropName}
 */

/** Number of digit slots in the PIN code input. */
export type IoPinCodeLength = 3 | 4 | 5 | 6;

/** Input mode — 'number' shows digits visibly; 'password' masks them. */
export type IoPinCodeType = 'number' | 'password';

/** Visual validation state aligned with other io form-field components. */
export type IoPinCodeState = 'none' | 'error' | 'success' | 'warning';

/** Detail payload emitted by the `change` event. */
export interface IoPinCodeChangeDetail {
  value: string;
  isComplete: boolean;
}
