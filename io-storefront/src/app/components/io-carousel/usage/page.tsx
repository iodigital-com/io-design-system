'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoCarouselUsagePage() {
  return (
    <div className="space-y-16">
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Use carousel for horizontally browsable content sets where items share a consistent card format."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use for related-content sections such as blog posts, webinars, or case studies that share the same card layout.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Provide a CTA link on each slide so users can navigate to the full content.
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
            Arrow buttons scroll the track by one slide width (card width + gap). Buttons remain available at all scroll positions.
          </RuleCard>
          <RuleCard label="Drag to scroll">
            On pointer devices, users can click and drag the track to scroll freely. The cursor changes to <C>grabbing</C> during drag.
          </RuleCard>
          <RuleCard label="No snap">
            Slides do not snap to a grid position after scrolling. The track uses native smooth scrolling behaviour.
          </RuleCard>
          <RuleCard label="Overflow">
            Content that overflows the track is hidden; the custom scrollbar is not rendered — navigation relies solely on the prev/next buttons and drag interaction.
          </RuleCard>
        </div>
      </section>

      <section id="content-guidelines" className="space-y-6">
        <SectionHeader
          title="Content guidelines"
          description="Each slide maps to one IoCarouselItem. Keep content concise and consistently structured."
        />
        <div className="space-y-3">
          <RuleCard label="Type label">
            Use a short category label (1–2 words): Blog, Webinar, Event, White paper.
          </RuleCard>
          <RuleCard label="Title">
            Keep titles to one sentence and under 80 characters so they fit comfortably within the card body.
          </RuleCard>
          <RuleCard label="CTA">
            Provide a clear action verb paired with the content type: &quot;Read more&quot;, &quot;Watch now&quot;, &quot;Download&quot;, &quot;Register&quot;.
          </RuleCard>
          <RuleCard label="Image background">
            Use <C>imageBackground</C> for a solid or gradient CSS colour string. Do not embed complex images — the area is a coloured backdrop with a pill badge overlay.
          </RuleCard>
        </div>
      </section>
    </div>
  );
}
