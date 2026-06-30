'use client';

import { SectionHeader, RuleCard, DoOrDontCard } from '@/components/usage/UsagePrimitives';

export default function IoAppShellUsagePage() {
  return (
    <div className="space-y-16">

      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="io-app-shell provides a consistent, accessible application layout for dashboards, tools, and complex multi-panel interfaces."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <DoOrDontCard type="do">
              Use io-app-shell as the root layout wrapper for single-page applications and dashboards.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Place navigation in the sidebar-start slot and control its visibility with the sidebarStartOpen prop.
            </DoOrDontCard>
            <DoOrDontCard type="do">
              Use the header-start slot for brand logo/wordmark, title slot for page title, and header-end for user actions.
            </DoOrDontCard>
          </div>
          <div className="space-y-3">
            <DoOrDontCard type="dont">
              Do not use io-app-shell for simple marketing pages — it is designed for complex app layouts with persistent navigation.
            </DoOrDontCard>
            <DoOrDontCard type="dont">
              Do not remove the skip link — it is required for WCAG 2.4.1 Bypass Blocks compliance.
            </DoOrDontCard>
          </div>
        </div>
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Available slots"
          description="io-app-shell composes a complete application frame via named slots."
        />
        <div className="space-y-3">
          <RuleCard title="header-start">
            Brand logo, wordmark, or hamburger menu toggle. Fixed to the left of the header.
          </RuleCard>
          <RuleCard title="title">
            Application or page title displayed in the header centre area.
          </RuleCard>
          <RuleCard title="header-end">
            Right-aligned header actions: user menu, notifications, theme toggle.
          </RuleCard>
          <RuleCard title="sidebar-start">
            Primary navigation. Automatically becomes a mobile overlay below the lg breakpoint. Includes focus trap and scroll lock when open.
          </RuleCard>
          <RuleCard title="(default)">
            Main content area. Connected to the skip link anchor for keyboard accessibility.
          </RuleCard>
          <RuleCard title="sidebar-end">
            Optional secondary panel (properties inspector, filter panel). Controlled by sidebarEndOpen.
          </RuleCard>
          <RuleCard title="footer">
            Sticky footer rendered below the body layout.
          </RuleCard>
          <RuleCard title="background">
            Fixed background media (hero images, gradient canvases). Rendered behind all other content with z-index: -1.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
