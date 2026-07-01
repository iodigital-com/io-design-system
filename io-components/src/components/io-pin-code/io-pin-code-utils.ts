/**
 * io-pin-code pure utility functions.
 * Kept separate from the component class so they can be unit-tested in isolation.
 */

/**
 * Splits a raw string into an array of single-character strings, stripping
 * disallowed characters, up to `length` entries.
 *
 * When `alphanumeric` is true, letters and digits are accepted.
 * Otherwise only digits are accepted (the default).
 */
export function splitDigits(raw: string, length: number, alphanumeric = false): string[] {
  const sanitized = alphanumeric ? raw.replace(/[^A-Za-z0-9]/g, '') : raw.replace(/\D/g, '');
  const digits = sanitized.slice(0, length).split('');
  while (digits.length < length) digits.push('');
  return digits;
}

/**
 * Joins a digits array back into a concatenated PIN string.
 * Trailing empty strings are NOT included — the value only contains filled slots.
 */
export function joinDigits(digits: string[]): string {
  return digits.join('');
}

/**
 * Generates an aria-label for a single digit input slot.
 * Example: "Digit 2 of 4"
 */
export function buildDigitLabel(index: number, total: number): string {
  return `Digit ${index + 1} of ${total}`;
}

/**
 * Returns true when every slot in the digits array contains a single character.
 */
export function isPinComplete(digits: string[]): boolean {
  return digits.every((d) => d.length === 1);
}
