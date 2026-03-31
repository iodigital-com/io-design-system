'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoCarouselUsagePage() {
  return (
    <div className="space-y-16">
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Use carousel for horizontally browsable content sets where items benefit from scroll-and-browse navigation."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for related-content sections such as blog posts, webinars, or case studies that share a consistent card layout.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Slot any content you need — cards, images, tiles, or custom layouts. The carousel does not dictate child structure.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Keep slide counts manageable (4–8 items). For larger data sets, consider pagination or filtering instead.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use carousel for primary navigation or critical content that must be visible immediately.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use carousel for hero banners or auto-rotating marketing slides — users rarely engage with auto-play carousels.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Nest carousels or place them inside accordion panels.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="behaviour" className="space-y-6">
        <SectionHeader
          title="Behaviour"
          description="Carousel scrolls horizontally via button clicks and mouse drag. No auto-play, no snap-to-slide."
        />
        <div className="space-y-3">
          <RuleCard label="Prev / Next buttons">
            Circular arrow buttons scroll the track by one child-element width plus gap. Buttons remain available at all scroll positions.
          </RuleCard>
          <RuleCard label="Drag to scroll">
            On pointer devices, users can click and drag the track to scroll freely. The cursor changes to <C>grabbing</C> during drag.
          </RuleCard>
          <RuleCard label="Custom scrollbar">
            A 4px scrollbar in <C>var(--io-color-primary)</C> appears below the track, giving a visual cue that more content exists.
          </RuleCard>
          <RuleCard label="No snap">
            Slides do not snap to a grid position after scrolling. The track uses native smooth scrolling behaviour.
          </RuleCard>
          <RuleCard label="Slot-based content">
            The carousel renders a <C>{'<slot />'}</C> inside its scrollable track. Any HTML elements placed as children become the scrolling items. The component applies <C>{'flex: 0 0 auto'}</C> to slotted children so they don&apos;t shrink.
          </RuleCard>
        </div>
      </section>

      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Since the carousel accepts any slotted content, follow these general patterns for best results."
        />
        <div className="space-y-3">
          <RuleCard label="Consistent sizing">
            Give each child element an explicit width (e.g. <C>width: 23.5rem</C>). The carousel track uses flexbox with <C>gap: var(--io-space-4)</C> between children.
          </RuleCard>
          <RuleCard label="Interactive children">
            Include focusable elements (links, buttons) inside each slide so keyboard users can Tab through the full carousel content.
          </RuleCard>
          <RuleCard label="Background colour">
            Use <C>var(--io-bg-card)</C> or brand palette colours on children — the carousel itself provides no card background.
          </RuleCard>
        </div>
      </section>
    </div>
  );
}
