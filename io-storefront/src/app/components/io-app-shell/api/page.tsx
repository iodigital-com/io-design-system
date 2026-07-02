'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge } from '@/components/api/ApiPrimitives';

export default function IoAppShellApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-app-shell Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '200px' },
            { label: 'Type', width: '160px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>sidebarStartOpen</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Whether the sidebar-start panel is visible.',
            ],
            [
              <span key="n"><InlineCode>sidebarEndOpen</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Whether the sidebar-end panel is visible.',
            ],
            [
              <InlineCode key="n">headerHeight</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Override the sticky header height. Accepts any CSS length value. Defaults to --io-header-height (72px).',
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-app-shell."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '200px' },
            { label: 'Detail Type', width: '280px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="e">sidebarStartUpdate</InlineCode>,
              <InlineCode key="d">{'{ open: boolean }'}</InlineCode>,
              'Emitted when the sidebar-start open state changes due to user interaction.',
            ],
            [
              <InlineCode key="e">sidebarEndDismiss</InlineCode>,
              <InlineCode key="d">{'{ reason: "close-button" | "backdrop" | "escape" }'}</InlineCode>,
              'Emitted when the sidebar-end is dismissed.',
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named slots for composing the application shell layout."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [<InlineCode key="n">header-start</InlineCode>, 'Brand logo, wordmark, hamburger toggle.'],
            [<InlineCode key="n">title</InlineCode>, 'Page or application title in the header centre.'],
            [<InlineCode key="n">header-end</InlineCode>, 'Right-aligned header actions: user menu, notifications, theme toggle.'],
            [<InlineCode key="n">sidebar-start</InlineCode>, 'Primary navigation sidebar.'],
            ['(default)', 'Main content area.'],
            [<InlineCode key="n">sidebar-end</InlineCode>, 'Optional secondary panel.'],
            [<InlineCode key="n">footer</InlineCode>, 'Sticky footer.'],
            [<InlineCode key="n">background</InlineCode>, 'Fixed background media (hero images, gradient canvases).'],
          ]}
        />
      </section>

      <section id="css-tokens" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="Public override points for the shell dimensions."
        />
        <ApiTable
          columns={[
            { label: 'Token', width: '300px' },
            { label: 'Default', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="t">--io-app-shell-header-height</InlineCode>,
              <InlineCode key="d">var(--io-header-height)</InlineCode>,
              'Height of the sticky header bar.',
            ],
            [
              <InlineCode key="t">--io-app-shell-sidebar-start-width</InlineCode>,
              <InlineCode key="d">320px</InlineCode>,
              'Width of the sidebar-start panel.',
            ],
            [
              <InlineCode key="t">--io-app-shell-sidebar-end-width</InlineCode>,
              <InlineCode key="d">320px</InlineCode>,
              'Width of the sidebar-end panel.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
