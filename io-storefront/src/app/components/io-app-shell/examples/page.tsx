'use client';

import { appShellStory } from '../io-app-shell.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoAppShellExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader
          title="Default shell"
          description="Shell with sidebar-start open, showing the header, sidebar, and main content layout."
        />
        <ComponentStory story={appShellStory} />
      </section>

    </div>
  );
}
