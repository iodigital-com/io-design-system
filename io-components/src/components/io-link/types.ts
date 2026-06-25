/** Underline animation behaviour */
export type IoLinkVariant =
  | 'standalone'  // no underline at rest → grows from left on hover (CTA use)
  | 'inline';     // underline at rest → slides out on hover (body text use)

/** Text colour theme */
export type IoLinkColor = 'blue' | 'black' | 'white';

/** Valid aria-current attribute values for navigation links */
export type IoLinkAriaCurrent = 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
