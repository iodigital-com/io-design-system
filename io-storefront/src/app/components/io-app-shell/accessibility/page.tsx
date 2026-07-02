'use client';

import { SectionHeader, RuleCard, KeyboardTable, Kbd, A11yCheck } from '@/components/accessibility/AccessibilityPrimitives';

export default function IoAppShellAccessibilityPage() {
  return (
    <div className="space-y-16">

      <section id="skip-link" className="space-y-6">
        <SectionHeader
          title="Skip to main content"
          description="The shell renders a skip link as the first focusable element, allowing keyboard and screen reader users to bypass the navigation sidebar (WCAG 2.4.1)."
        />
        <A11yCheck status="pass">
          The skip link is visible on keyboard focus and navigates directly to the main content area. Never remove or hide it permanently.
        </A11yCheck>
      </section>

      <section id="keyboard" className="space-y-6">
        <SectionHeader
          title="Keyboard interaction"
          description="All interactive shell controls are keyboard accessible."
        />
        <KeyboardTable
          rows={[
            { key: <Kbd>Tab</Kbd>, action: 'Moves focus through the header controls, then into the sidebar or main content.' },
            { key: <Kbd>Escape</Kbd>, action: 'Closes the sidebar-start overlay (mobile) or sidebar-end panel when open.' },
          ]}
        />
      </section>

      <section id="focus-trap" className="space-y-6">
        <SectionHeader
          title="Focus management"
          description="When the sidebar-start opens as a mobile overlay, focus is trapped inside the panel."
        />
        <A11yCheck status="pass">
          Focus trap uses document.activeElement (not shadowRoot.activeElement) to support both shadow DOM and slotted light DOM children correctly.
        </A11yCheck>
        <A11yCheck status="pass">
          Previous focus is restored when the sidebar closes — the element that opened the panel receives focus again.
        </A11yCheck>
        <A11yCheck status="pass">
          Scroll lock (body overflow: hidden) is applied while the mobile sidebar is open to prevent background scrolling.
        </A11yCheck>
      </section>

      <section id="landmarks" className="space-y-6">
        <SectionHeader
          title="ARIA landmarks"
          description="The shell establishes correct landmark regions for screen reader navigation."
        />
        <div className="space-y-3">
          <RuleCard label="banner (header)">
            The header element uses role=banner. Place brand identity and primary site controls here.
          </RuleCard>
          <RuleCard label="navigation (sidebar-start)">
            The sidebar-start uses an aside with aria-label=&quot;Primary navigation&quot;. Add a matching aria-label to any nav element you slot in.
          </RuleCard>
          <RuleCard label="main">
            The default slot renders inside a main element with the id connected to the skip link.
          </RuleCard>
          <RuleCard label="contentinfo (footer)">
            The footer element uses the semantic footer landmark.
          </RuleCard>
        </div>
      </section>

    </div>
  );
}
