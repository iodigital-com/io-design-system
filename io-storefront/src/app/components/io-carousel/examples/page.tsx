'use client';

import { carouselStory, carouselStoryMore } from '../io-carousel.stories';

import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { C, RuleCard, SectionHeader } from '@/components/usage/UsagePrimitives';

function productCard(
  name: string,
  price: string,
  category: string,
): ElementConfig<HTMLTagOrComponent> {
  return {
    tag: 'div' as const,
    properties: {
      style: {
        flex: '0 0 auto',
        width: '220px',
        borderRadius: 'var(--io-border-radius-sm)',
        border: '1px solid var(--io-border)',
        background: 'var(--io-bg-card)',
        overflow: 'hidden',
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
            color: 'var(--io-text-muted)',
            fontSize: '0.75rem',
            fontStyle: 'italic',
          },
        },
        children: ['Product image'],
      },
      {
        tag: 'div' as const,
        properties: {
          style: {
            padding: 'var(--io-space-3, 12px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--io-space-2, 8px)',
          },
        },
        children: [
          {
            tag: 'io-tag' as const,
            properties: { size: 'sm' },
            children: [category],
          },
          {
            tag: 'div' as const,
            properties: {
              style: {
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--io-text-primary)',
                lineHeight: 1.3,
              },
            },
            children: [name],
          },
          {
            tag: 'div' as const,
            properties: {
              style: {
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--io-color-primary)',
              },
            },
            children: [price],
          },
        ],
      },
    ],
  };
}

const productCarouselStory: Story<'io-carousel'> = {
  state: { properties: { slidesPerPage: 1, rewind: false, activeSlideIndex: 0 } },
  generator: () => [
    {
      tag: 'io-carousel' as const,
      properties: { slidesPerPage: 1, rewind: false, activeSlideIndex: 0 },
      children: [
        productCard('Merino Wool Sweater', '€ 89,00', 'Clothing'),
        productCard('Leather Crossbody Bag', '€ 129,00', 'Accessories'),
        productCard('Running Shoes Pro', '€ 149,00', 'Footwear'),
        productCard('Polarised Sunglasses', '€ 74,00', 'Accessories'),
        productCard('Linen Shirt', '€ 59,00', 'Clothing'),
      ],
    },
  ],
};

function testimonialCard(
  quote: string,
  author: string,
  role: string,
): ElementConfig<HTMLTagOrComponent> {
  return {
    tag: 'div' as const,
    properties: {
      style: {
        flex: '0 0 auto',
        width: '340px',
        maxWidth: '80vw',
        borderRadius: 'var(--io-border-radius-sm)',
        border: '1px solid var(--io-border)',
        background: 'var(--io-bg-card)',
        padding: 'var(--io-space-4, 16px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--io-space-3, 12px)',
      },
    },
    children: [
      {
        tag: 'p' as const,
        properties: {
          style: {
            fontSize: '0.9375rem',
            lineHeight: 1.65,
            color: 'var(--io-text-primary)',
            fontStyle: 'italic',
          },
        },
        children: [`"${quote}"`],
      },
      {
        tag: 'div' as const,
        properties: {
          style: { height: '1px', background: 'var(--io-border)' },
        },
        children: [],
      },
      {
        tag: 'div' as const,
        properties: {},
        children: [
          {
            tag: 'div' as const,
            properties: {
              style: {
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--io-text-primary)',
              },
            },
            children: [author],
          },
          {
            tag: 'div' as const,
            properties: {
              style: {
                fontSize: '0.8125rem',
                color: 'var(--io-text-secondary)',
              },
            },
            children: [role],
          },
        ],
      },
    ],
  };
}

const testimonialCarouselStory: Story<'io-carousel'> = {
  state: { properties: { slidesPerPage: 1, rewind: true, activeSlideIndex: 0 } },
  generator: () => [
    {
      tag: 'io-carousel' as const,
      properties: { slidesPerPage: 1, rewind: true, activeSlideIndex: 0 },
      children: [
        testimonialCard(
          'The team delivered a design system that scaled across 12 product teams without friction. The component quality is exceptional.',
          'Sarah de Vries',
          'Head of Product, FinTech Co.',
        ),
        testimonialCard(
          'Shipping velocity doubled once we adopted the shared component library. Our designers and engineers finally speak the same language.',
          'Marco Janssen',
          'Engineering Lead, Scale-up NL',
        ),
        testimonialCard(
          'Accessibility was built in from day one — not bolted on. That alone saved us months of remediation work.',
          'Aisha Okonkwo',
          'Digital Director, Healthcare Group',
        ),
        testimonialCard(
          'The dark mode support and design tokens made white-labelling trivial. We launched three brands in one sprint.',
          'Thomas Huber',
          'CTO, Media Platform',
        ),
      ],
    },
  ],
};

export default function IoCarouselExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader
          title="Related articles (4 slides)"
          description="A compact carousel with four slotted content cards. Prev/Next buttons scroll one slide at a time; drag to scroll is available on pointer devices."
        />
        <ComponentStory story={carouselStory} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Extended set (8 slides)"
          description="A longer carousel demonstrating how the component handles overflow with many slotted children. Content remains accessible via button navigation and drag scrolling."
        />
        <ComponentStory story={carouselStoryMore} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Product card carousel"
          description="E-commerce pattern: compact product cards with price and category badge. Each card is independently focusable, and io-tag communicates the product type at a glance."
        />
        <ComponentStory story={productCarouselStory} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Testimonial carousel"
          description="Quote-based content with rewind=true so navigation wraps from the last slide back to the first, creating a seamless looping experience."
        />
        <ComponentStory story={testimonialCarouselStory} />
      </section>

      <section>
        <SectionHeader
          title="Keyboard and screen reader navigation"
          description="The carousel is fully operable without a pointer device."
        />
        <div className="space-y-3">
          <RuleCard label="Arrow key navigation">
            Once the Prev or Next button receives focus, users can press{' '}
            <C>Enter</C> or <C>Space</C> to advance slides without reaching for the mouse. The
            active slide index is reflected on the component via the{' '}
            <C>activeSlideIndex</C> property so assistive technology can report the current
            position.
          </RuleCard>
          <RuleCard label="Screen reader announcements">
            Each slide is a discrete slot child with its own DOM content. Screen readers traverse
            the carousel&rsquo;s slotted children in document order, so meaningful heading or
            landmark structure inside each slide improves orientation. Provide visible, descriptive
            text inside every slide — avoid image-only slides without an accessible label.
          </RuleCard>
          <RuleCard label="Touch and drag">
            On pointer and touch devices, the slide track can be dragged horizontally. The Prev/Next
            buttons remain visible at all times so keyboard and switch-access users are never
            blocked.
          </RuleCard>
        </div>
      </section>

      <section>
        <SectionHeader
          title="Auto-play and WCAG 2.1 SC 2.2.2"
          description="Moving content must be pausable. Plan carefully before enabling auto-play."
        />
        <div className="space-y-3">
          <RuleCard label="Pause control is mandatory for auto-play">
            WCAG 2.1 Success Criterion 2.2.2 (Pause, Stop, Hide) requires that any automatically
            moving content lasting more than five seconds can be paused by the user. If you enable
            the <C>auto-play</C> prop, ensure a visible pause control is present — either provided
            by the host application or via a future built-in control. The{' '}
            <C>pause-on-hover</C> behaviour pauses rotation while the pointer rests over the
            carousel, but this alone does not satisfy the criterion for keyboard-only users.
          </RuleCard>
          <RuleCard label="Prefer manual navigation for content carousels">
            For carousels containing meaningful content — articles, testimonials, products — manual
            navigation gives users control over pacing. Reserve auto-play for purely decorative
            sequences where no information is lost if a slide is missed.
          </RuleCard>
        </div>
      </section>
    </div>
  );
}
