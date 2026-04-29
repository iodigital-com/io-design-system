'use client';

import { selectStory, selectPropDefinitions } from '../io-select.stories';

import { Configurator } from '@/components/playground/Configurator';

export default function IoSelectConfiguratorPage() {
  return (
    <Configurator
      tagName="io-select"
      story={selectStory}
      propDefinitions={selectPropDefinitions}
    />
  );
}
