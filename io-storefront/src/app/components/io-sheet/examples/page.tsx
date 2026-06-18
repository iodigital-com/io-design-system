'use client';

import {
  sheetStoryDefault,
  sheetStoryWithFooter,
  sheetStoryNonDismissible,
} from '../io-sheet.stories';

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

export default function IoSheetExamplesPage() {
  return (
    <div className="space-y-2">
      <Section
        title="Default"
        description="A bottom sheet with a heading and body content. Dismiss via the close button, Escape key, or clicking the backdrop."
      >
        <ComponentStory story={sheetStoryDefault} interactive />
      </Section>

      <Section
        title="With footer actions"
        description="A sheet with a primary action and a ghost cancel button in the footer slot. This provides a second prominent dismissal route for keyboard users."
      >
        <ComponentStory story={sheetStoryWithFooter} interactive />
      </Section>

      <Section
        title="Non-dismissible"
        description="A sheet with dismissible=false. The close button is hidden and backdrop click / Escape key are disabled. The footer must provide a complete or cancel action."
      >
        <ComponentStory story={sheetStoryNonDismissible} interactive />
      </Section>
    </div>
  );
}
