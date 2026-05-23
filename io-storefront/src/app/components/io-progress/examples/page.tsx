'use client';

import {
  progressStoryDefault,
  progressStoryColors,
  progressStorySizes,
  progressStoryWithLabel,
  progressStoryEmpty,
  progressStorySuccess,
  progressStoryWarning,
  progressStoryError,
} from '../io-progress.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoProgressExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader title="Default — blue fill at 60%" />
        <ComponentStory
          story={progressStoryDefault}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch', minWidth: '300px' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader title="Orange — brand accent colour for creative or media progress" />
        <ComponentStory
          story={progressStoryColors}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch', minWidth: '300px' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader title="Success — green fill at 100% to indicate completion" />
        <ComponentStory
          story={progressStorySuccess}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch', minWidth: '300px' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader title="Warning — amber fill for operations nearing a limit" />
        <ComponentStory
          story={progressStoryWarning}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch', minWidth: '300px' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader title="Error — red fill for failed or blocked progress" />
        <ComponentStory
          story={progressStoryError}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch', minWidth: '300px' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader title="Small track (sm=4px) — compact, suitable for table rows or tight layouts" />
        <ComponentStory
          story={progressStorySizes}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch', minWidth: '300px' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader title="With visible percentage label — show-label renders the % below the track" />
        <ComponentStory
          story={progressStoryWithLabel}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch', minWidth: '300px' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader title="Empty state — value=0 for a freshly started operation" />
        <ComponentStory
          story={progressStoryEmpty}
          previewStyle={{ flexDirection: 'column', alignItems: 'stretch', minWidth: '300px' }}
        />
      </section>

      <section>
        <ExamplesSectionHeader title="Multi-step form — three progress bars with labels at different stages" />
        <div
          className="rounded-lg p-6 space-y-4"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', maxWidth: '480px' }}
        >
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--io-text-secondary)' }}>Step 1: Personal details</p>
            <io-progress value={100} color="success" size="md" show-label label="Step 1 complete" />
          </div>
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--io-text-secondary)' }}>Step 2: Contact information</p>
            <io-progress value={66} color="blue" size="md" show-label label="Step 2 in progress" />
          </div>
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--io-text-secondary)' }}>Step 3: Review and submit</p>
            <io-progress value={0} color="blue" size="md" label="Step 3 not started" />
          </div>
        </div>
      </section>

    </div>
  );
}
