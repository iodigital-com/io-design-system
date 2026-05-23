'use client';

import { C, DoOrDontCard, RuleCard, SectionHeader, SubsectionTitle } from '@/components/usage/UsagePrimitives';

export default function IoSkeletonUsagePage() {
  return (
    <div className="space-y-16">

      {/* ── When to use ──────────────────────────────────────────── */}
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-skeleton communicates that content is being fetched before it is ready to display. It reduces perceived latency and prevents layout shift when content loads."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <SubsectionTitle>Do</SubsectionTitle>
            <DoOrDontCard type="do">
              Use while async data is being fetched — API responses, image loading, database queries — to fill the space the real content will occupy.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Match the skeleton shape and size to the content it replaces. A rectangular skeleton for an image, circular for an avatar, text for a headline.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Compose multiple skeletons inside a container with <C>aria-busy=&quot;true&quot;</C> and <C>aria-label</C> to communicate the loading region as a unit to screen readers.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Provide a meaningful <C>label</C> prop when the generic <C>&apos;Loading&apos;</C> would be ambiguous — e.g. <C>&apos;Loading article image&apos;</C>.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <SubsectionTitle>Don&apos;t</SubsectionTitle>
            <DoOrDontCard type="dont">
              Use skeleton and spinner simultaneously in the same region. Choose one loading indicator per loading zone.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use skeleton for operations that complete in under 300 ms — the flash of skeleton content is more disorienting than no placeholder at all.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Leave skeletons visible after data has loaded. Always replace them with real content promptly once the fetch resolves.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Use skeleton for interactive loading states like button pending. Use io-spinner inside the button instead — skeleton is for content placeholders, not action feedback.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      {/* ── Variant guidelines ───────────────────────────────────── */}
      <section id="variant-guidelines" className="space-y-6">
        <SectionHeader
          title="Variant guidelines"
          description="Choose a variant that mirrors the shape of the content it represents. Visual fidelity reduces cognitive load during load."
        />
        <div className="space-y-3">
          <RuleCard label="text — for typography and short inline content">
            The default variant. Renders a thin rounded-rectangle bar at line height. Use for headings, body copy, labels, and any short text element. Chain multiple text skeletons vertically with varying widths to simulate a paragraph.
          </RuleCard>
          <RuleCard label="circular — for avatars, icons, and badges">
            Renders a perfect circle. Always set both <C>width</C> and <C>height</C> to the same value to match the intended avatar or icon size — for example <C>48px</C> / <C>48px</C>. Omitting one dimension will collapse the element.
          </RuleCard>
          <RuleCard label="rectangular — for images, charts, and media blocks">
            A plain rectangle with no border radius. Use for hero images, thumbnails, video frames, and chart placeholders where a sharp edge is appropriate. Set explicit <C>width</C> and <C>height</C> or use percentage widths with a fixed height.
          </RuleCard>
          <RuleCard label="rounded — for cards and panel containers">
            A rectangle with medium border radius (<C>--io-border-radius-md</C>). Use for card-shaped containers, panels, and tiles where the real content will have rounded corners.
          </RuleCard>
        </div>
      </section>

      {/* ── Sizing ───────────────────────────────────────────────── */}
      <section id="sizing" className="space-y-6">
        <SectionHeader
          title="Sizing"
          description="Skeleton dimensions should approximate the real content to minimise layout shift when content loads."
        />
        <div className="space-y-3">
          <RuleCard label="Use explicit width and height for fixed-size elements">
            For avatars and icons, set both <C>width</C> and <C>height</C> to the exact pixel size of the real element. For media blocks, mirror the aspect ratio of the image.
          </RuleCard>
          <RuleCard label="Use percentage widths for responsive text placeholders">
            Varying the width of text skeletons — <C>60%</C>, <C>80%</C>, <C>45%</C> — creates a more natural-looking paragraph simulation than uniform 100% bars.
          </RuleCard>
          <RuleCard label="Omit width and height to use variant defaults">
            When <C>width</C> and <C>height</C> are not set, the skeleton fills its containing block using the variant&apos;s default CSS dimensions. This works well for text skeletons placed in flex or grid layouts.
          </RuleCard>
        </div>
      </section>

      {/* ── Animation ────────────────────────────────────────────── */}
      <section id="animation" className="space-y-6">
        <SectionHeader
          title="Animation"
          description="The shimmer animation communicates activity passively. It can be disabled for static mocks or reduced-motion environments."
        />
        <div className="space-y-3">
          <RuleCard label="prefers-reduced-motion is handled automatically">
            io-skeleton respects the OS-level reduced-motion preference via a CSS media query. The shimmer animation is automatically removed when the user has enabled reduced motion — you do not need to handle this in application code.
          </RuleCard>
          <RuleCard label="Use animated=false for static mocks and Storybook snapshots">
            Set <C>animated=&quot;false&quot;</C> when rendering skeletons in unit tests, snapshot tests, or Storybook stories where animation introduces non-determinism. The static background colour is still visible so the placeholder layout remains testable.
          </RuleCard>
        </div>
      </section>

      {/* ── Composition ──────────────────────────────────────────── */}
      <section id="composition" className="space-y-6">
        <SectionHeader
          title="Composition"
          description="Combine multiple io-skeleton instances to build realistic loading states that mirror the structure of the real content."
        />
        <div className="space-y-3">
          <RuleCard label="Wrap compositions in aria-busy='true'">
            When multiple skeletons represent a single logical region, wrap them in a container with <C>aria-busy=&quot;true&quot;</C> and a descriptive <C>aria-label</C>. This communicates the entire section is loading as a unit rather than announcing each skeleton individually.
          </RuleCard>
          <RuleCard label="Mirror the real content structure">
            Build skeleton layouts that match the grid, flex, spacing, and proportions of the actual component. The closer the skeleton matches the final layout, the less jarring the transition when content appears.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
