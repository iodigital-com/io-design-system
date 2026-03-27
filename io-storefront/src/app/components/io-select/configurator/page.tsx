'use client';

import { Configurator } from '@/components/playground/Configurator';
import { selectStory, selectPropDefinitions } from '../io-select.stories';

export default function IoSelectConfiguratorPage() {
  return (
    <Configurator
      tagName="io-select"
      story={selectStory}
      propDefinitions={selectPropDefinitions}
    />
  );
}
