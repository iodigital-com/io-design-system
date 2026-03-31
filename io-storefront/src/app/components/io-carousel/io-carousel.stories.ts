import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';

type IoCarouselItem = {
  type: string;
  title: string;
  imageBackground?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const SLIDES_SHORT: IoCarouselItem[] = [
  {
    type: 'Blog',
    title: 'Is AI taking over the customer journey?',
    ctaLabel: 'Read more',
    ctaHref: '#',
  },
  {
    type: 'Webinar',
    title: 'Cloud costs are skyrocketing - how to maintain control?',
    ctaLabel: 'Watch now',
    ctaHref: '#',
  },
  {
    type: 'Event',
    title: "Workshop: Together we'll make Drupal voor Overheden better",
    ctaLabel: 'Register',
    ctaHref: '#',
  },
  {
    type: 'Webinar',
    title: 'Beyond conversion rates: how digital experiences drive revenue',
    ctaLabel: 'Watch now',
    ctaHref: '#',
  },
];

const SLIDES_FULL: IoCarouselItem[] = [
  ...SLIDES_SHORT,
  {
    type: 'White paper',
    title: 'Patient journey mapping in healthcare',
    ctaLabel: 'Download',
    ctaHref: '#',
  },
  {
    type: 'White paper',
    title: '7 strategic considerations for building powerful platforms',
    ctaLabel: 'Download',
    ctaHref: '#',
  },
  {
    type: 'Webinar',
    title: 'From mass marketing to audience of one: AI & data',
    ctaLabel: 'Watch now',
    ctaHref: '#',
  },
  {
    type: 'Blog',
    title: 'Pinterest ads: a channel worthy of discovery',
    ctaLabel: 'Read more',
    ctaHref: '#',
  },
];

export const carouselStory: Story<'io-carousel'> = {
  generator: () => [
    {
      tag: 'io-carousel' as const,
      properties: {
        items: SLIDES_SHORT,
      },
    },
  ],
};

export const carouselStoryMore: Story<'io-carousel'> = {
  generator: () => [
    {
      tag: 'io-carousel' as const,
      properties: {
        items: SLIDES_FULL,
      },
    },
  ],
};

export const carouselPropDefinitions: PropDefinition[] = [];
