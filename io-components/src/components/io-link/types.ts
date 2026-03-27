/** Underline animation behaviour */
export type IoLinkVariant =
  | 'standalone'  // no underline at rest → grows from left on hover (CTA use)
  | 'inline';     // underline at rest → slides out on hover (body text use)

/** Text colour theme */
export type IoLinkColor = 'blue' | 'black' | 'white';
