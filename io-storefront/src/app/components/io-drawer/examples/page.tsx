'use client';

import {
  drawerStoryDefault,
  drawerStoryLeft,
  drawerStoryBottom,
  drawerStorySm,
} from '../io-drawer.stories';

import type { ReactNode } from 'react';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <ExamplesSectionHeader title={title} description={description} />
      {children}
    </section>
  );
}

export default function IoDrawerExamplesPage() {
  return (
    <div className="space-y-2">
      <Section
        title="Default (right)"
        description="A right-edge drawer with heading, body content, and footer action buttons. Dismiss via the close button, Escape key, or clicking the backdrop."
      >
        <ComponentStory story={drawerStoryDefault} interactive />
      </Section>

      <Section
        title="Left placement"
        description="A left-edge drawer suited for navigation panels and side menus."
      >
        <ComponentStory story={drawerStoryLeft} interactive />
      </Section>

      <Section
        title="Bottom sheet"
        description="A bottom-attached drawer that slides up from the bottom edge. Ideal for mobile-first action sheets and quick pickers."
      >
        <ComponentStory story={drawerStoryBottom} interactive />
      </Section>

      <Section
        title="Small (sm)"
        description="A compact drawer for focused, narrow interactions where a full-width panel would feel disproportionate."
      >
        <ComponentStory story={drawerStorySm} interactive />
      </Section>
    </div>
  );
}
