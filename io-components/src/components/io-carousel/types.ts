/** A single slide in the carousel */
export interface IoCarouselItem {
  /** Category/type label shown in the image area pill and body */
  type: string;
  /** Slide title */
  title: string;
  /** Background color for the image area (CSS color string) */
  imageBackground?: string;
  /** CTA link label */
  ctaLabel?: string;
  /** CTA link href */
  ctaHref?: string;
}
