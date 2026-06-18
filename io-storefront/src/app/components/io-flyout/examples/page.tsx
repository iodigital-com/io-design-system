'use client';

import {
  flyoutStoryDefault,
  flyoutStoryLeft,
  flyoutStoryNoHeading,
} from '../io-flyout.stories';

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

export default function IoFlyoutExamplesPage() {
  return (
    <div className="space-y-2">
      <Section
        title="Default (right)"
        description="A right-anchored flyout panel with heading, body content, and footer close button. Dismiss via the close button, Escape key, or clicking the backdrop."
      >
        <ComponentStory story={flyoutStoryDefault} interactive />
      </Section>

      <Section
        title="Left position"
        description="A left-anchored flyout suited for navigation menus and side panels."
      >
        <ComponentStory story={flyoutStoryLeft} interactive />
      </Section>

      <Section
        title="Without heading"
        description="A flyout without the heading prop. The close button is always rendered in the header."
      >
        <ComponentStory story={flyoutStoryNoHeading} interactive />
      </Section>
    </div>
  );
}
