import type { Story } from '@/models/story';
import type { PropDefinition } from '@/models/propDefinition';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

/** Helper — build a single demo card suitable for slotting into io-carousel. */
function slideCard(type: string, title: string, cta: string): ElementConfig<'div'> {
  return {
    tag: 'div' as const,
    properties: {
      style: {
        flex: '0 0 auto',
        width: '23.5rem',
        maxWidth: '80vw',
        background: 'var(--io-bg-card)',
        border: '1px solid var(--io-border)',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    children: [
      {
        tag: 'div' as const,
        properties: {
          style: {
            width: '100%',
            aspectRatio: '4 / 3',
            background: 'var(--io-bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--io-color-primary)',
            position: 'relative',
          },
        },
        children: [
          {
            tag: 'span' as const,
            properties: {
              style: {
                position: 'absolute',
                left: '1rem',
                top: '1rem',
                borderRadius: '9999px',
                background: 'var(--io-color-off-white)',
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                color: 'var(--io-text-primary)',
              },
            },
            children: [type],
          },
        ],
      },
      {
        tag: 'div' as const,
        properties: { style: { padding: '0 1.5rem', flex: '1', display: 'flex', flexDirection: 'column' } },
        children: [
          {
            tag: 'div' as const,
            properties: {
              style: { fontSize: '0.875rem', fontWeight: '500', color: 'var(--io-text-secondary)', margin: '1.25rem 0 0.75rem' },
            },
            children: [type],
          },
          {
            tag: 'div' as const,
            properties: {
              style: { fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.25', color: 'var(--io-text-primary)', marginBottom: '1.5rem' },
            },
            children: [title],
          },
          {
            tag: 'div' as const,
            properties: { style: { marginTop: 'auto', paddingBottom: '1.5rem' } },
            children: [
              {
                tag: 'a' as const,
                properties: {
                  href: '#',
                  style: {
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--io-text-primary)',
                    textDecoration: 'none',
                    fontWeight: '600',
                  },
                },
                children: [`${cta} →`],
              },
            ],
          },
        ],
      },
    ],
  };
}

const SLIDES_SHORT: ElementConfig<HTMLTagOrComponent>[] = [
  slideCard('Blog', 'Is AI taking over the customer journey?', 'Read more'),
  slideCard('Webinar', 'Cloud costs are skyrocketing — how to maintain control?', 'Watch now'),
  slideCard('Event', "Workshop: Together we'll make Drupal voor Overheden better", 'Register'),
  slideCard('Webinar', 'Beyond conversion rates: how digital experiences drive revenue', 'Watch now'),
];

const SLIDES_FULL: ElementConfig<HTMLTagOrComponent>[] = [
  ...SLIDES_SHORT,
  slideCard('White paper', 'Patient journey mapping in healthcare', 'Download'),
  slideCard('White paper', '7 strategic considerations for building powerful platforms', 'Download'),
  slideCard('Webinar', 'From mass marketing to audience of one: AI & data', 'Watch now'),
  slideCard('Blog', 'Pinterest ads: a channel worthy of discovery', 'Read more'),
];

export const carouselStory: Story<'io-carousel'> = {
  generator: () => [
    {
      tag: 'io-carousel' as const,
      children: SLIDES_SHORT,
    },
  ],
};

export const carouselStoryMore: Story<'io-carousel'> = {
  generator: () => [
    {
      tag: 'io-carousel' as const,
      children: SLIDES_FULL,
    },
  ],
};

export const carouselPropDefinitions: PropDefinition[] = [];
