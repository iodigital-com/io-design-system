/**
 * io-file-upload pure utility functions.
 * All functions are stateless and side-effect free.
 */

const UNITS = ['B', 'KB', 'MB', 'GB'] as const;
const BYTES_PER_UNIT = 1024;

/**
 * Formats a file size in bytes into a human-readable string.
 * e.g. 1024 → "1 KB", 1048576 → "1 MB"
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  let value = bytes;
  let unitIndex = 0;

  while (value >= BYTES_PER_UNIT && unitIndex < UNITS.length - 1) {
    value /= BYTES_PER_UNIT;
    unitIndex++;
  }

  const formatted = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
  return `${formatted} ${UNITS[unitIndex]}`;
}

/**
 * Validates a file against an accept string and optional maxFileSize.
 *
 * @param file         - The File to validate
 * @param accept       - Comma-separated list of MIME types or extensions (e.g. ".pdf,image/*")
 * @param maxFileSize  - Maximum allowed size in bytes (undefined = no limit)
 * @returns 'ok' | 'size' | 'type'
 */
export function validateFile(
  file: File,
  accept: string,
  maxFileSize: number | undefined,
): 'ok' | 'size' | 'type' {
  if (maxFileSize !== undefined && file.size > maxFileSize) {
    return 'size';
  }

  if (!isTypeAccepted(file, accept)) {
    return 'type';
  }

  return 'ok';
}

/**
 * Checks whether a file matches the accept string.
 * Handles wildcard MIME types (e.g. "image/*") and extensions (e.g. ".pdf").
 */
export function isTypeAccepted(file: File, accept: string): boolean {
  if (!accept || accept === '*') return true;

  const tokens = accept
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  return tokens.some((token) => {
    if (token.startsWith('.')) {
      // Extension match — compare against filename
      return file.name.toLowerCase().endsWith(token);
    }

    if (token.endsWith('/*')) {
      // Wildcard MIME type, e.g. "image/*"
      const baseType = token.slice(0, token.length - 2);
      return file.type.toLowerCase().startsWith(baseType + '/');
    }

    // Exact MIME type match
    return file.type.toLowerCase() === token;
  });
}
