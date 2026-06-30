'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge } from '@/components/api/ApiPrimitives';

export default function IoLinkTileApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-link-tile Stencil component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Type', width: '240px' },
            { label: 'Default', width: '120px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">href</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              '—',
              'Navigation destination (required).',
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              '—',
              'Tile label (required). Becomes the accessible name of the embedded anchor.',
            ],
            [
              <InlineCode key="n">description</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Supporting description text shown below the label.',
            ],
            [
              <span key="n"><InlineCode>aspectRatio</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;1/1&apos; | &apos;4/3&apos; | &apos;3/4&apos; | &apos;16/9&apos;</InlineCode>,
              <InlineCode key="d">&apos;4/3&apos;</InlineCode>,
              'Media aspect ratio preset.',
            ],
            [
              <span key="n"><InlineCode>align</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;top&apos; | &apos;bottom&apos;</InlineCode>,
              <InlineCode key="d">&apos;bottom&apos;</InlineCode>,
              'Overlay content alignment.',
            ],
            [
              <span key="n"><InlineCode>size</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</InlineCode>,
              <InlineCode key="d">&apos;md&apos;</InlineCode>,
              'Label text size preset.',
            ],
            [
              <span key="n"><InlineCode>weight</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;regular&apos; | &apos;medium&apos; | &apos;semibold&apos; | &apos;bold&apos;</InlineCode>,
              <InlineCode key="d">&apos;semibold&apos;</InlineCode>,
              'Label font weight.',
            ],
            [
              <span key="n"><InlineCode>gradient</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">true</InlineCode>,
              'Show gradient overlay behind the label and description.',
            ],
            [
              <InlineCode key="n">target</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">&apos;_self&apos;</InlineCode>,
              'Link target. Automatically adds noopener noreferrer when set to _blank.',
            ],
            [
              <InlineCode key="n">rel</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Rel attribute.',
            ],
            [
              <InlineCode key="n">download</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              '—',
              'Download attribute for the link.',
            ],
          ]}
        />
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Named slots for composing additional content in the tile overlay."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              '(default)',
              'Primary media slot. Accepts img, picture, or video elements.',
            ],
            [
              <InlineCode key="n">header</InlineCode>,
              'Tag chips, badges, or other header-area overlay content.',
            ],
            [
              <InlineCode key="n">footer</InlineCode>,
              'Additional metadata rendered below the label and description.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
