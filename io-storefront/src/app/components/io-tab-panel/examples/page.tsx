'use client';

import { tabPanelStoryDefault, tabPanelStoryHidden } from '../io-tab-panel.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoTabPanelExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={tabPanelStoryDefault} />
      </section>

      <section>
        <ExamplesSectionHeader title="Hidden panel" />
        <ComponentStory story={tabPanelStoryHidden} />
      </section>
    </div>
  );
}
