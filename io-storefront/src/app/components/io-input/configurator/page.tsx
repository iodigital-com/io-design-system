'use client';

import { Configurator } from '@/components/playground/Configurator';
import { inputStory, inputPropDefinitions } from '../io-input.stories';

export default function IoInputConfiguratorPage() {
  return (
    <Configurator
      tagName="io-input"
      story={inputStory}
      propDefinitions={inputPropDefinitions}
    />
  );
}
