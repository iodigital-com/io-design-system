'use client';

import { inputStory, inputPropDefinitions } from '../io-input.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoInputConfiguratorPage() {
  return (
    <Configurator
      tagName="io-input"
      story={inputStory}
      propDefinitions={inputPropDefinitions}
      previewStyle={{ flexDirection: 'column', alignItems: 'stretch' }}
    />
  );
}
