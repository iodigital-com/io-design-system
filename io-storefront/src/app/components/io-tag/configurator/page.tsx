'use client';

import { Configurator } from '@/components/playground/Configurator';
import { tagStory, tagPropDefinitions } from '../io-tag.stories';

export default function IoTagConfiguratorPage() {
  return (
    <Configurator
      tagName="io-tag"
      story={tagStory}
      propDefinitions={tagPropDefinitions}
    />
  );
}
