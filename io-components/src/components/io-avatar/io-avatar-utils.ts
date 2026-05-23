/**
 * Derives 1–2 letter initials from a full name.
 * - Two or more words: first letter of first word + first letter of last word.
 * - Single word: first two characters.
 * Result is always upper-cased.
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);

  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  return parts[0].slice(0, 2).toUpperCase();
}

/**
 * Builds the BEM class string for the avatar container div.
 * When `hasImage` is true the colour modifier is omitted — the image
 * itself provides the visual, so background colour is irrelevant.
 */
export function getAvatarClass(
  size: string,
  shape: string,
  color: string,
  hasImage: boolean,
): string {
  return [
    'avatar',
    `avatar--${size}`,
    `avatar--${shape}`,
    !hasImage && `avatar--${color}`,
  ]
    .filter(Boolean)
    .join(' ');
}
