'use client';

import { dividerStory, dividerPropDefinitions } from '../io-divider.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoDividerConfiguratorPage() {
  return (
    <Configurator
      tagName="io-divider"
      story={dividerStory}
      propDefinitions={dividerPropDefinitions}
      previewStyle={{ backgroundImage: 'none', backgroundColor: 'var(--io-bg-raised)' }}
    />
  );
}
