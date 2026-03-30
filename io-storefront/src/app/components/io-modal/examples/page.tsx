'use client';

import type { ReactNode } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import {
  modalStoryDefault,
  modalStorySm,
  modalStoryLg,
  modalStoryNoHeading,
} from '../io-modal.stories';

function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <ExamplesSectionHeader title={title} description={description} />
      {children}
    </section>
  );
}

export default function IoModalExamplesPage() {
  return (
    <div className="space-y-2">
      <Section
        title="Default"
        description="A standard modal with heading, body text, and footer action buttons. Dismiss via the × button, Escape key, or clicking the backdrop."
      >
        <ComponentStory story={modalStoryDefault} />
      </Section>

      <Section
        title="Small (sm)"
        description="A compact modal suited for confirmations and short focused interactions."
      >
        <ComponentStory story={modalStorySm} />
      </Section>

      <Section
        title="Large (lg)"
        description="A wider modal for forms, tables, or any content that benefits from extra horizontal space."
      >
        <ComponentStory story={modalStoryLg} />
      </Section>

      <Section
        title="Custom header slot"
        description="Override the heading prop with the header slot to render custom heading markup — useful for sub-titles or badge labels."
      >
        <ComponentStory story={modalStoryNoHeading} />
      </Section>
    </div>
  );
}
