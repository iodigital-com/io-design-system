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
            Circular arrow buttons attempt to scroll to the computed target slide boundary using the current <C>slidesPerPage</C> step (with <C>auto</C> mapped to step size 1). If no distinct target boundary is available, the component falls back to smooth scrolling by roughly 90% of the track width (minimum 120px).
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

      <section id="slides-per-page" className="space-y-6">
        <SectionHeader
          title="Slides per page"
          description="Control how many slides are visible and how far the carousel advances per button click."
        />
        <div className="space-y-3">
          <RuleCard label="auto (default)">
            The component scrolls by roughly 90% of the track width per click. Use this when child widths vary or you want free-form scrolling.
          </RuleCard>
          <RuleCard label="Numeric value (1–n)">
            Set <C>slidesPerPage</C> to an integer to advance exactly that many slides per click. Combine with fixed-width children for a predictable paged experience.
          </RuleCard>
          <RuleCard label="Responsive sizing">
            Apply a CSS class to the carousel host that adjusts child widths at different breakpoints. The carousel does not need to be re-initialised — it recalculates step size on each button click.
          </RuleCard>
        </div>
      </section>

      <section id="performance" className="space-y-6">
        <SectionHeader
          title="Performance"
          description="The carousel renders all slotted children immediately — there is no lazy loading built in."
        />
        <div className="space-y-3">
          <RuleCard label="Limit item count">
            For best scroll performance keep the item count under 20. If you need to display hundreds of items, implement virtual scrolling outside the carousel and slot only the visible window of items.
          </RuleCard>
          <RuleCard label="Optimise images">
            If items contain images, apply <C>loading=&quot;lazy&quot;</C> on <C>{'<img>'}</C> elements and specify explicit <C>width</C> and <C>height</C> attributes to avoid layout shift as the page loads.
          </RuleCard>
          <RuleCard label="Avoid heavy DOM inside slides">
            Each slotted child is rendered in the light DOM. Avoid placing deeply nested component trees or canvas-heavy visualisations inside slides — they are always mounted, even when scrolled off-screen.
          </RuleCard>
        </div>
      </section>

      <section id="mobile-and-touch" className="space-y-6">
        <SectionHeader
          title="Mobile and touch"
          description="The carousel works on touch devices through native CSS overflow scroll — no custom touch handling is needed."
        />
        <div className="space-y-3">
          <RuleCard label="Touch scrolling">
            On mobile the track scrolls natively via <C>overflow-x: auto</C> with <C>-webkit-overflow-scrolling: touch</C>. Users can swipe freely.
          </RuleCard>
          <RuleCard label="Prev / Next buttons on mobile">
            The prev and next buttons remain fully functional on touch devices. Consider hiding them on small screens via CSS if the touch swipe behaviour alone is sufficient.
          </RuleCard>
          <RuleCard label="Min touch target">
            Both control buttons meet the WCAG 2.5.8 minimum 24×24px target. The default icon size is 1.25rem inside a 2.5rem button — well within the target.
          </RuleCard>
        </div>
      </section>

      <section id="keyboard-access" className="space-y-6">
        <SectionHeader
          title="Keyboard access"
          description="The carousel itself is not a roving-tabindex widget — keyboard users navigate through slotted content normally."
        />
        <div className="space-y-3">
          <RuleCard label="Tab order">
            Focus enters the Prev button, advances through all focusable children in DOM order, then exits at the Next button. The carousel does not trap focus.
          </RuleCard>
          <RuleCard label="Ensure every slide has a focusable element">
            If a slide is purely decorative (e.g. an image with no link), add a visually hidden caption or a descriptive <C>aria-label</C> to the containing element so screen reader users are aware of the slide content.
          </RuleCard>
          <RuleCard label="Live region announcement">
            When the user navigates using Prev/Next buttons, the current slide position is announced via an <C>aria-live=&quot;polite&quot;</C> region (e.g. &ldquo;Slide 2 of 5&rdquo;). This is automatic.
          </RuleCard>
        </div>
      </section>
    </div>
  );
}
